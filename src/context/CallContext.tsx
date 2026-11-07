'use client';

import * as React from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { createClient } from '@phatsa/client';
import { useAuth } from './AuthContext';
import { CallOverlay } from '../components/shared/CallOverlay';
import { timeAgo } from '../lib/timeAgo';

/**
 * P2P sesli / görüntülü arama (Phatsa Görüşmeler eklentisi). Ses ve görüntü tarayıcılar arasında doğrudan (WebRTC) gider;
 * oda, katılım ve sinyaller (offer / answer / ice) Phatsa'da, canlı kanaldan anında gelir. Akış:
 * arayan call_rooms'a ekler → arananın satırı "ringing" → aranan kendi satırını "joined" yapar → oda "active".
 */

export type CallMedia = 'audio' | 'video';
export type CallPeer = { id: string; name: string; avatar?: string };
export type CallPhase = 'outgoing' | 'incoming' | 'connecting' | 'active' | 'ended';

export type CallState = {
  roomId: string | null;
  peer: CallPeer;
  media: CallMedia;
  phase: CallPhase;
  /** Bitiş nedeni: Türkçe, kullanıcıya gösterilir */
  endedText?: string;
  startedAt?: number;
};

type CallContextType = {
  call: CallState | null;
  /** Phatsa adresi ve açık anahtar verilmişse ve yeni API'deyse arama yapılabilir */
  available: boolean;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  muted: boolean;
  cameraOff: boolean;
  startCall: (peer: CallPeer, media: CallMedia) => Promise<void>;
  accept: () => Promise<void>;
  decline: () => Promise<void>;
  hangUp: () => Promise<void>;
  toggleMute: () => void;
  toggleCamera: () => void;
  /** Çevrimiçi kişiler (canlı kanalda olanlar); canlı bağlantı yoksa null */
  presence: Presence | null;
};

export type Presence = {
  isOnline: (userId: string) => boolean;
  /** Bu oturumda çevrimdışı olduğu görüldüyse "az önce", "5 dakika önce"…; görülmediyse boş */
  lastSeen: (userId: string) => string;
};

const CallContext = createContext<CallContextType | undefined>(undefined);

const END_TEXT: Record<string, string> = {
  hangup: 'Görüşme bitti',
  cancelled: 'Arama iptal edildi',
  declined: 'Arama reddedildi',
  missed: 'Cevap verilmedi',
  busy: 'Kişi başka bir görüşmede',
  empty: 'Görüşme bitti',
  timeout: 'Görüşme süresi doldu',
};
const HEARTBEAT_MS = 20_000;
const ENDED_VISIBLE_MS = 2500;
const ONLINE_GRACE_MS = 60_000;


/** Bildirim kutusuna yeni kayıt düşünce yayılan olay; zil dinler */
export const NOTIFICATION_EVENT = 'armoyu:notification';
const STUN_FALLBACK: RTCIceServer[] = [{ urls: 'stun:stun.cloudflare.com:3478' }];

type Row = Record<string, any>;
const first = (data: unknown): Row | null => (Array.isArray(data) ? data[0] : data) as Row | null;

export interface CallProviderProps {
  children: React.ReactNode;
  /** Phatsa panel adresi; boşsa arama kapalı */
  phatsaUrl?: string;
  /** Phatsa açık anahtarı (pk_); izinli adreslerde sitenin alan adı olmalı */
  phatsaKey?: string;
}

export function CallProvider({ children, phatsaUrl, phatsaKey }: CallProviderProps) {
  const { user } = useAuth();
  const me = user?.id ? String(user.id) : null;

  const [call, setCall] = useState<CallState | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);

  const callRef = useRef<CallState | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localRef = useRef<MediaStream | null>(null);
  const pendingIce = useRef<RTCIceCandidateInit[]>([]);
  const pendingOffer = useRef<RTCSessionDescriptionInit | null>(null);
  const roomSub = useRef<{ unsubscribe: () => Promise<unknown> } | null>(null);
  const heartbeat = useRef<ReturnType<typeof setInterval> | null>(null);

  const update = useCallback((next: CallState | null) => {
    callRef.current = next;
    setCall(next);
  }, []);

  // Token her istekte depodan okunur: yenilenen token kendiliğinden kullanılır
  const phatsa = useMemo(() => {
    if (!phatsaUrl || !phatsaKey || !me) return null;
    return createClient(phatsaUrl, {
      key: phatsaKey,
      storage: false,
      autoRefresh: false,
      fetch: async (input, init) => {
        const token = localStorage.getItem('armoyu_token');
        const headers = { ...(init?.headers as Record<string, string>), ...(token ? { authorization: `Bearer ${token}` } : {}) };
        const response = await fetch(input, { ...init, headers });
        // Panel TLS'i sonlandıran bir proxy arkasındaysa canlı kanal adresini http verir (SOCKET_PUBLIC_URL yoksa);
        // https sayfada ws:// engellenir (karışık içerik), bu yüzden adres https'e çevrilir
        if (String(input).endsWith('/realtime/token') && window.location.protocol === 'https:' && response.ok) {
          const body = await response.json();
          if (typeof body?.url === 'string') body.url = body.url.replace(/^http:\/\//, 'https://');
          return new Response(JSON.stringify(body), { status: response.status, headers: { 'content-type': 'application/json' } });
        }
        return response;
      },
    });
  }, [phatsaUrl, phatsaKey, me]);

  const table = useCallback((name: string) => phatsa!.from('calls', name), [phatsa]);

  const sendSignal = useCallback(async (type: string, payload: unknown) => {
    const current = callRef.current;
    if (!current?.roomId) return;
    const res = await table('call_signals').insert({ room_id: current.roomId, to_user: current.peer.id, type, payload });
    if (res.error) console.warn('[Call] Sinyal gönderilemedi:', res.error.message);
  }, [table]);

  const cleanup = useCallback(async (endedText?: string) => {
    if (heartbeat.current) clearInterval(heartbeat.current);
    heartbeat.current = null;
    await roomSub.current?.unsubscribe().catch(() => undefined);
    roomSub.current = null;
    pcRef.current?.close();
    pcRef.current = null;
    localRef.current?.getTracks().forEach((t) => t.stop());
    localRef.current = null;
    pendingIce.current = [];
    pendingOffer.current = null;
    setLocalStream(null);
    setRemoteStream(null);
    setMuted(false);
    setCameraOff(false);

    const current = callRef.current;
    if (!current) return;
    update({ ...current, phase: 'ended', endedText: endedText ?? 'Görüşme bitti' });
    setTimeout(() => { if (callRef.current?.phase === 'ended') update(null); }, ENDED_VISIBLE_MS);
  }, [update]);

  const iceServers = useCallback(async (): Promise<RTCIceServer[]> => {
    try {
      const r = await fetch(`${phatsaUrl}/api/v1/calls/ice-servers`, {
        headers: { apikey: phatsaKey!, authorization: `Bearer ${localStorage.getItem('armoyu_token') ?? ''}` },
      });
      const body = await r.json();
      return Array.isArray(body?.iceServers) && body.iceServers.length ? body.iceServers : STUN_FALLBACK;
    } catch {
      return STUN_FALLBACK;
    }
  }, [phatsaUrl, phatsaKey]);

  /** Mikrofon / kamera ve eş bağlantısı; sinyaller karşı tarafa gider */
  const preparePeer = useCallback(async (media: CallMedia) => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: media === 'video' });
    localRef.current = stream;
    setLocalStream(stream);

    const pc = new RTCPeerConnection({ iceServers: await iceServers() });
    pcRef.current = pc;
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));
    pc.onicecandidate = (e) => { if (e.candidate) sendSignal('ice', e.candidate.toJSON()); };
    pc.ontrack = (e) => setRemoteStream(e.streams[0] ?? new MediaStream([e.track]));
    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'connected') {
        const current = callRef.current;
        if (current && current.phase !== 'active') update({ ...current, phase: 'active', startedAt: Date.now() });
      }
      if (pc.connectionState === 'failed') cleanup('Bağlantı kurulamadı (ağ engelliyor olabilir)');
    };
    return pc;
  }, [iceServers, sendSignal, update, cleanup]);

  const flushIce = useCallback(async () => {
    const pc = pcRef.current;
    if (!pc?.remoteDescription) return;
    for (const c of pendingIce.current.splice(0)) await pc.addIceCandidate(c).catch(() => undefined);
  }, []);

  /** Odayı izler: cevaplanınca "bağlanıyor", bitince temizlik; görüşme sürdükçe kalp atışı */
  const watchRoom = useCallback(async (roomId: string) => {
    if (!phatsa) return;
    const live = phatsa.realtime.changes('calls', 'call_rooms', { filter: `id=eq.${roomId}` });
    live.on(({ row }: { row: Row }) => {
      const current = callRef.current;
      if (!current || current.roomId !== roomId) return;
      if (row.status === 'ended') cleanup(END_TEXT[row.end_reason] ?? 'Görüşme bitti');
      else if (row.status === 'active' && current.phase === 'outgoing') update({ ...current, phase: 'connecting' });
    });
    await live.subscribe();
    roomSub.current = live;
    heartbeat.current = setInterval(() => phatsa.rpc('calls', 'heartbeat', { room_id: roomId }), HEARTBEAT_MS);
  }, [phatsa, cleanup, update]);

  const startCall = useCallback(async (peer: CallPeer, media: CallMedia) => {
    if (!phatsa || callRef.current) return;
    update({ roomId: null, peer, media, phase: 'outgoing' });
    try {
      const pc = await preparePeer(media);
      const res = await table('call_rooms').insert({ kind: 'direct', media, callee_id: peer.id });
      const room = first(res.data);
      if (res.error || !room) return cleanup(res.error?.message ?? 'Arama başlatılamadı');
      if (room.status === 'ended') return cleanup(END_TEXT[room.end_reason] ?? 'Aranamadı');

      update({ ...callRef.current!, roomId: room.id });
      await watchRoom(room.id);
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      await sendSignal('offer', offer);
    } catch (e: any) {
      cleanup(e?.name === 'NotAllowedError' ? 'Mikrofon / kamera izni verilmedi' : (e?.message || 'Arama başlatılamadı'));
    }
  }, [phatsa, preparePeer, table, watchRoom, sendSignal, update, cleanup]);

  const accept = useCallback(async () => {
    const current = callRef.current;
    if (!phatsa || !current?.roomId || current.phase !== 'incoming' || !me) return;
    update({ ...current, phase: 'connecting' });
    try {
      const pc = await preparePeer(current.media);
      const mine = await table('call_participants').select('id').eq('room_id', current.roomId).eq('user_id', me).limit(1);
      const row = first(mine.data);
      const joined = row && await table('call_participants').update(row.id, { state: 'joined' });
      if (!row || joined?.error) return cleanup(joined?.error?.message ?? 'Arama artık yok');
      await watchRoom(current.roomId);

      // Teklif canlı kanaldan kaçtıysa (sayfa sonradan açıldı) tablodan okunur
      if (!pendingOffer.current) {
        const sigs = await table('call_signals').select('type,payload').eq('room_id', current.roomId).eq('to_user', me).order('created_at').limit(200);
        for (const s of (sigs.data ?? []) as Row[]) {
          if (s.type === 'offer') pendingOffer.current = s.payload;
          if (s.type === 'ice') pendingIce.current.push(s.payload);
        }
      }
      if (!pendingOffer.current) return cleanup('Arama bilgisi alınamadı');
      await pc.setRemoteDescription(pendingOffer.current);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      await sendSignal('answer', answer);
      await flushIce();
    } catch (e: any) {
      cleanup(e?.name === 'NotAllowedError' ? 'Mikrofon / kamera izni verilmedi' : (e?.message || 'Bağlanılamadı'));
    }
  }, [phatsa, me, preparePeer, table, watchRoom, sendSignal, flushIce, update, cleanup]);

  const decline = useCallback(async () => {
    const current = callRef.current;
    if (!phatsa || !current?.roomId || !me) return;
    const mine = await table('call_participants').select('id').eq('room_id', current.roomId).eq('user_id', me).limit(1);
    const row = first(mine.data);
    if (row) await table('call_participants').update(row.id, { state: 'declined' });
    update(null);
    pendingIce.current = [];
    pendingOffer.current = null;
  }, [phatsa, me, table, update]);

  const hangUp = useCallback(async () => {
    const current = callRef.current;
    if (current?.roomId && phatsa) await table('call_rooms').update(current.roomId, { status: 'ended' });
    await cleanup(current?.phase === 'outgoing' ? 'Arama iptal edildi' : 'Görüşme bitti');
  }, [phatsa, table, cleanup]);

  // Gelen aramalar ve bana gelen sinyaller: oturum açıkken hep dinlenir
  useEffect(() => {
    if (!phatsa || !me) return;
    const parts = phatsa.realtime.changes('calls', 'call_participants', { filter: `user_id=eq.${me}` });
    parts.on(async ({ row }: { row: Row }) => {
      // Karşı taraf kapatınca, arayan vazgeçince ya da süre dolunca kendi satırım left / missed olur
      const current = callRef.current;
      if (current && current.roomId === row.room_id && current.phase !== 'ended' && ['left', 'missed', 'declined'].includes(row.state)) {
        const ended = await table('call_rooms').select('end_reason').eq('id', row.room_id).limit(1);
        return cleanup(END_TEXT[first(ended.data)?.end_reason] ?? 'Görüşme bitti');
      }
      if (row.state === 'ringing') await showIncoming(row.room_id);
    });

    /** Çalan aramayı ekrana getirir (canlı kanaldan ya da sayfa açılırken bekleyen arama) */
    const showIncoming = async (roomId: string) => {
      if (callRef.current) return;
      const roomRes = await table('call_rooms').select('id,media,status,created_by').eq('id', roomId).limit(1);
      const room = first(roomRes.data);
      if (!room || room.status === 'ended' || callRef.current) return;
      const prof = await phatsa.from('profiles', 'profiles').select('display_name,username,avatar_url').eq('user_id', room.created_by).limit(1);
      const p = first(prof.data);
      pendingIce.current = [];
      pendingOffer.current = null;
      update({
        roomId: room.id,
        media: room.media,
        phase: 'incoming',
        peer: { id: room.created_by, name: p?.display_name || p?.username || 'Bir oyuncu', avatar: p?.avatar_url ?? undefined },
      });
    };

    const sigs = phatsa.realtime.changes('calls', 'call_signals', { filter: `to_user=eq.${me}` });
    sigs.on(async ({ op, row }: { op: string; row: Row }) => {
      if (op !== 'insert' || row.room_id !== callRef.current?.roomId) return;
      const pc = pcRef.current;
      if (row.type === 'offer') pendingOffer.current = row.payload;
      else if (row.type === 'answer' && pc && !pc.currentRemoteDescription) {
        await pc.setRemoteDescription(row.payload);
        await flushIce();
      } else if (row.type === 'ice') {
        pendingIce.current.push(row.payload);
        await flushIce();
      }
    });

    // Arama, sayfa açılmadan / giriş yapılmadan önce başladıysa canlı kanal onu kaçırır: o an çalan arama sorulur
    Promise.all([parts.subscribe(), sigs.subscribe()]).then(async () => {
      const ringing = await table('call_participants').select('room_id').eq('user_id', me).eq('state', 'ringing')
        .order('created_at', { ascending: false }).limit(1);
      const row = first(ringing.data);
      if (row) await showIncoming(row.room_id);
    });
    return () => {
      parts.unsubscribe();
      sigs.unsubscribe();
    };
  }, [phatsa, me, table, update, flushIce, cleanup]);

  // Çıkış yapınca ya da sayfa kapanınca görüşme bitirilir
  useEffect(() => {
    const onUnload = () => {
      const current = callRef.current;
      if (current?.roomId && current.phase !== 'ended' && current.phase !== 'incoming') {
        table('call_rooms').update(current.roomId, { status: 'ended' });
      }
    };
    window.addEventListener('beforeunload', onUnload);
    return () => window.removeEventListener('beforeunload', onUnload);
  }, [table]);
  useEffect(() => { if (!me && callRef.current) cleanup(); }, [me, cleanup]);

  // Çevrimiçi: giriş yapan herkes ortak kanalda; çıkanın saati yalnızca bu oturumda bilinir
  // shortcut: tek kanal herkese tüm listeyi yollar, son görülme kalıcı değil; kullanıcı binleri bulursa ya da kalıcı
  // son görülme gerekirse Phatsa'da profiles.last_seen_at ve kişi bazlı abonelik
  const [onlineIds, setOnlineIds] = useState<Set<string>>(new Set());
  const [leftAt, setLeftAt] = useState<Record<string, number>>({});
  useEffect(() => {
    if (!phatsa || !me) return;
    const room = phatsa.realtime.channel('armoyu:online');
    let previous = new Set<string>();
    room.on('presence', ({ members }) => {
      const now = new Set(members.map((m) => String(m.id)));
      const gone = [...previous].filter((id) => !now.has(id));
      if (gone.length) setLeftAt((old) => ({ ...old, ...Object.fromEntries(gone.map((id) => [id, Date.now()])) }));
      previous = now;
      setOnlineIds(now);
    });
    room.subscribe();
    // shortcut: Bildirimler 1.5.0 kuyruktan yazdığı kayıtları canlı yaymıyor (istem açık); yayınlayınca zil anında yenilenir
    const inbox = phatsa.realtime.changes('onesignal', 'notification_inbox', { filter: `receiver_user=eq.${me}` });
    inbox.on(({ op }) => { if (op === 'insert') window.dispatchEvent(new Event(NOTIFICATION_EVENT)); });
    inbox.subscribe();
    return () => { room.unsubscribe(); inbox.unsubscribe(); setOnlineIds(new Set()); };
  }, [phatsa, me]);

  // Göreli süre ve bekleme payı zamanla değiştiği için yarım dakikada bir yeniden hesaplanır
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!Object.keys(leftAt).length) return;
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, [leftAt]);

  const presence = useMemo<Presence | null>(() => phatsa ? {
    // Sayfa yenileme / sayfa değişimi gibi kısa kopmalarda hemen çevrimdışı görünmesin
    isOnline: (id) => onlineIds.has(String(id)) || (now - (leftAt[String(id)] ?? -Infinity) < ONLINE_GRACE_MS),
    lastSeen: (id) => leftAt[String(id)] ? timeAgo(now - leftAt[String(id)]) : '',
  } : null, [phatsa, onlineIds, leftAt, now]);

  const toggleMute = useCallback(() => {
    const next = !muted;
    localRef.current?.getAudioTracks().forEach((t) => { t.enabled = !next; });
    setMuted(next);
  }, [muted]);

  const toggleCamera = useCallback(() => {
    const next = !cameraOff;
    localRef.current?.getVideoTracks().forEach((t) => { t.enabled = !next; });
    setCameraOff(next);
  }, [cameraOff]);

  const value: CallContextType = {
    call,
    available: !!phatsa,
    localStream,
    remoteStream,
    muted,
    cameraOff,
    startCall,
    accept,
    decline,
    hangUp,
    toggleMute,
    toggleCamera,
    presence,
  };

  return (
    <CallContext.Provider value={value}>
      {children}
      <CallOverlay />
    </CallContext.Provider>
  );
}

/** CallProvider yoksa arama kapalı döner (eski site / testler) */
export function useCall(): CallContextType | null {
  return useContext(CallContext) ?? null;
}

/** Çevrimiçi bilgisi; canlı bağlantı yoksa (eski API, anahtar yok) null: eski alanlar kullanılır */
export function usePresence(): Presence | null {
  return useContext(CallContext)?.presence ?? null;
}
