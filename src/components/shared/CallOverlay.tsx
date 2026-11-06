'use client';

import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff } from 'lucide-react';
import { useCall } from '../../context/CallContext';

const PHASE_TEXT = { outgoing: 'Aranıyor…', incoming: 'Gelen arama', connecting: 'Bağlanıyor…', active: '', ended: '' } as const;

function VideoView({ stream, muted, className }: { stream: MediaStream | null; muted?: boolean; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => { if (ref.current) ref.current.srcObject = stream; }, [stream]);
  return <video ref={ref} autoPlay playsInline muted={muted} className={className} />;
}

/** Gelen aramada kısa çalma sesi (dosya gerekmez) */
function useRingtone(on: boolean) {
  useEffect(() => {
    if (!on) return;
    let ctx: AudioContext | null = null;
    try { ctx = new AudioContext(); } catch { return; }
    const ring = () => {
      if (!ctx) return;
      for (const offset of [0, 0.4]) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = 480;
        gain.gain.value = 0.08;
        osc.connect(gain).connect(ctx.destination);
        osc.start(ctx.currentTime + offset);
        osc.stop(ctx.currentTime + offset + 0.3);
      }
    };
    ring();
    const timer = setInterval(ring, 2500);
    return () => { clearInterval(timer); ctx?.close(); };
  }, [on]);
}

function Duration({ since }: { since?: number }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  if (!since) return null;
  const s = Math.floor((now - since) / 1000);
  return <>{String(Math.floor(s / 60)).padStart(2, '0')}:{String(s % 60).padStart(2, '0')}</>;
}

const roundButton = 'w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-transform active:scale-95';

export function CallOverlay() {
  const ctx = useCall();
  useRingtone(ctx?.call?.phase === 'incoming');
  if (!ctx?.call) return null;

  const { call, localStream, remoteStream, muted, cameraOff, accept, decline, hangUp, toggleMute, toggleCamera } = ctx;
  const isVideo = call.media === 'video';
  const showRemoteVideo = isVideo && !!remoteStream && (call.phase === 'active' || call.phase === 'connecting');

  return (
    <div role="dialog" aria-label="Görüşme" className="fixed inset-0 z-[6000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md aspect-[3/4] max-h-[85vh] rounded-[32px] overflow-hidden bg-gradient-to-b from-slate-800 to-slate-950 shadow-2xl border border-white/10">
        {showRemoteVideo
          ? <VideoView stream={remoteStream} className="absolute inset-0 w-full h-full object-cover" />
          : remoteStream && <VideoView stream={remoteStream} className="hidden" />}

        <div className={`relative h-full flex flex-col items-center justify-between p-8 ${showRemoteVideo ? 'bg-gradient-to-b from-black/50 via-transparent to-black/60' : ''}`}>
          <div className="text-center space-y-3 pt-6">
            {!showRemoteVideo && (
              <div className={`w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-white/20 bg-white/10 ${call.phase === 'incoming' || call.phase === 'outgoing' ? 'animate-pulse' : ''}`}>
                {call.peer.avatar
                  ? <img src={call.peer.avatar} alt="" className="w-full h-full object-cover" />
                  : <span className="w-full h-full flex items-center justify-center text-4xl font-black text-white">{call.peer.name.charAt(0)}</span>}
              </div>
            )}
            <h2 className="text-2xl font-black text-white">{call.peer.name}</h2>
            <p className="text-sm font-bold text-white/70">
              {call.phase === 'ended' ? call.endedText
                : call.phase === 'active' ? <Duration since={call.startedAt} />
                : `${PHASE_TEXT[call.phase]} · ${isVideo ? 'Görüntülü' : 'Sesli'}`}
            </p>
          </div>

          {isVideo && localStream && call.phase !== 'ended' && (
            <VideoView stream={localStream} muted className={`absolute top-4 right-4 w-24 aspect-[3/4] rounded-2xl object-cover border-2 border-white/20 ${cameraOff ? 'opacity-30' : ''}`} />
          )}

          {call.phase === 'incoming' && (
            <div className="flex items-center gap-12">
              <button type="button" onClick={decline} aria-label="Reddet" className={`${roundButton} bg-red-500`}>
                <PhoneOff size={24} />
              </button>
              <button type="button" onClick={accept} aria-label="Cevapla" className={`${roundButton} bg-emerald-500 animate-bounce`}>
                {isVideo ? <Video size={24} /> : <Phone size={24} />}
              </button>
            </div>
          )}

          {(call.phase === 'outgoing' || call.phase === 'connecting' || call.phase === 'active') && (
            <div className="flex items-center gap-5">
              <button type="button" onClick={toggleMute} aria-label={muted ? 'Mikrofonu aç' : 'Sessize al'} aria-pressed={muted} className={`${roundButton} ${muted ? 'bg-white text-slate-900' : 'bg-white/15'}`}>
                {muted ? <MicOff size={22} /> : <Mic size={22} />}
              </button>
              {isVideo && (
                <button type="button" onClick={toggleCamera} aria-label={cameraOff ? 'Kamerayı aç' : 'Kamerayı kapat'} aria-pressed={cameraOff} className={`${roundButton} ${cameraOff ? 'bg-white text-slate-900' : 'bg-white/15'}`}>
                  {cameraOff ? <VideoOff size={22} /> : <Video size={22} />}
                </button>
              )}
              <button type="button" onClick={hangUp} aria-label="Kapat" className={`${roundButton} bg-red-500`}>
                <PhoneOff size={24} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
