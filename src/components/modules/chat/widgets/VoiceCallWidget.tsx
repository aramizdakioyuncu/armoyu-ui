'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

export interface CallUser {
  username: string;
  displayName: string;
  avatar: string;
}

export interface VoiceCallWidgetProps {
  caller: CallUser;
  recipient: CallUser;
  isIncoming: boolean;
  status: 'ringing' | 'connected' | 'rejected' | 'hung_up' | 'busy';
  onAccept: () => void;
  onDecline: () => void;
  onHangUp: () => void;
}

export function VoiceCallWidget({
  caller,
  recipient,
  isIncoming,
  status,
  onAccept,
  onDecline,
  onHangUp,
}: VoiceCallWidgetProps) {
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Active call duration timer
  useEffect(() => {
    if (status === 'connected') {
      setDuration(0);
      timerRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [status]);

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const targetUser = isIncoming ? caller : recipient;

  return (
    <div className="absolute inset-0 z-[100] flex flex-col items-center justify-between p-8 bg-zinc-950/95 backdrop-blur-2xl text-white animate-in fade-in duration-300">
      {/* Top Banner - Call Status */}
      <div className="text-center mt-8 space-y-2">
        <span className="text-[10px] font-black text-armoyu-primary uppercase tracking-[0.3em] bg-armoyu-primary/10 px-3 py-1 rounded-full border border-armoyu-primary/20">
          SESLİ ARAMA
        </span>
        <h3 className="text-sm font-bold text-zinc-400 mt-2 uppercase tracking-widest">
          {status === 'ringing' && (isIncoming ? 'Gelen Arama' : 'Aranıyor...')}
          {status === 'connected' && 'Görüşme Devam Ediyor'}
          {status === 'rejected' && 'Arama Reddedildi'}
          {status === 'hung_up' && 'Arama Sonlandırıldı'}
          {status === 'busy' && 'Kullanıcı Meşgul'}
        </h3>
      </div>

      {/* Center - Pulsing Avatar and User Info */}
      <div className="flex flex-col items-center justify-center my-auto space-y-6">
        <div className="relative flex items-center justify-center">
          {/* Wave Ripple Rings */}
          {status === 'ringing' && (
            <>
              <div className="absolute w-36 h-36 rounded-full bg-armoyu-primary/20 border border-armoyu-primary/30 animate-ping [animation-duration:2s]" />
              <div className="absolute w-48 h-48 rounded-full bg-armoyu-primary/10 border border-armoyu-primary/10 animate-ping [animation-duration:3s] [animation-delay:0.5s]" />
            </>
          )}
          {status === 'connected' && (
            <div className="absolute w-36 h-36 rounded-full bg-emerald-500/20 border border-emerald-500/30 animate-pulse [animation-duration:1.5s]" />
          )}

          {/* Actual Avatar */}
          <div className="relative z-10 w-28 h-28 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl bg-zinc-900">
            <img
              src={targetUser.avatar || 'https://api.dicebear.com/7.x/avataaars/svg'}
              alt={targetUser.displayName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="text-center space-y-1 z-10">
          <h2 className="text-xl font-black tracking-tight text-white">{targetUser.displayName}</h2>
          <p className="text-xs text-zinc-400 font-bold">@{targetUser.username}</p>
          {status === 'connected' && (
            <p className="text-lg font-mono font-black text-emerald-400 mt-2 tracking-widest">
              {formatDuration(duration)}
            </p>
          )}
        </div>
      </div>

      {/* Bottom - Controls */}
      <div className="w-full max-w-xs mb-8 z-10">
        {/* Calling Options */}
        {status === 'ringing' && isIncoming && (
          <div className="flex justify-around items-center">
            {/* Reject Button */}
            <button
              onClick={onDecline}
              className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.4)] group"
              title="Reddet"
            >
              <PhoneOff className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            </button>

            {/* Accept Button */}
            <button
              onClick={onAccept}
              className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] group"
              title="Kabul Et"
            >
              <Phone className="w-6 h-6 text-white animate-bounce" />
            </button>
          </div>
        )}

        {/* Ringing (Outgoing) Options */}
        {status === 'ringing' && !isIncoming && (
          <div className="flex justify-center">
            <button
              onClick={onHangUp}
              className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.4)] group"
              title="Kapat"
            >
              <PhoneOff className="w-6 h-6 text-white" />
            </button>
          </div>
        )}

        {/* Connected Options */}
        {status === 'connected' && (
          <div className="space-y-6">
            {/* Audio settings */}
            <div className="flex justify-center gap-8 text-zinc-400">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3 rounded-full hover:bg-white/5 transition-all ${isMuted ? 'text-red-400 bg-red-500/10' : ''}`}
                title={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                className={`p-3 rounded-full hover:bg-white/5 transition-all ${!isSpeakerOn ? 'text-zinc-500' : 'text-emerald-400 bg-emerald-500/10'}`}
                title={isSpeakerOn ? 'Hoparlörü Kapat' : 'Hoparlörü Aç'}
              >
                {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
            </div>

            {/* Hangup Button */}
            <div className="flex justify-center">
              <button
                onClick={onHangUp}
                className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                title="Görüşmeyi Sonlandır"
              >
                <PhoneOff className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Ending statuses */}
        {(status === 'rejected' || status === 'hung_up' || status === 'busy') && (
          <div className="text-center text-zinc-500 font-bold text-xs uppercase tracking-widest animate-pulse">
            Görüşme sonlandırılıyor...
          </div>
        )}
      </div>
    </div>
  );
}
