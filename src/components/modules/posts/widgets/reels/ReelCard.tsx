'use client';

import React, { useState, useRef, useEffect } from 'react';
import { User } from '../../../../../models/auth/User';

import { Heart, MessageSquare, Share2, MoreVertical, Music, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { RollingNumber } from '../../../../RollingNumber';

export interface ReelCardProps {
  id: string;
  author: User;
  videoUrl: string;
  description?: string;
  songName?: string;
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
  isActive?: boolean;
}

export function ReelCard({ id, author, videoUrl, description, songName, stats, isActive }: ReelCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showHeartAnim, setShowHeartAnim] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle Play/Pause
  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {
          // Auto-play might be blocked by browser until interaction
          setIsPlaying(false);
        });
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (!isLiked) {
      setIsLiked(true);
    }
    setShowHeartAnim(true);
    setTimeout(() => setShowHeartAnim(false), 800);
  };

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">

      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover cursor-pointer"
        loop
        muted={isMuted}
        onClick={togglePlay}
        onDoubleClick={handleDoubleClick}
        onTimeUpdate={handleTimeUpdate}
        playsInline
      />

      {/* Heart Pop Animation on Double Click */}
      {showHeartAnim && (
        <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
          <Heart fill="#3b82f6" className="text-blue-500 w-24 h-24 animate-ping opacity-75" />
        </div>
      )}

      {/* Play/Pause UI Indicator (Fades out) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/10 transition-opacity">
          <div className="p-5 bg-black/20 backdrop-blur-md rounded-full text-white/80">
            <Play size={48} fill="currentColor" />
          </div>
        </div>
      )}

      {/* Interactions Overlay (Right Side) */}
      <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-6 animate-in slide-in-from-right-4 duration-500">

        {/* Like */}
        <div className="flex flex-col items-center gap-1 group">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-3 rounded-full backdrop-blur-md transition-all active:scale-90 ${isLiked ? 'bg-blue-600 text-white' : 'bg-black/20 text-white hover:bg-black/40'}`}
          >
            <Heart size={28} fill={isLiked ? "currentColor" : "none"} />
          </button>
          <span className="text-xs font-black text-white shadow-sm uppercase tracking-tighter">
            <RollingNumber value={isLiked ? stats.likes + 1 : stats.likes} />
          </span>
        </div>

        {/* Comment */}
        <div className="flex flex-col items-center gap-1 group">
          <button className="p-3 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-all active:scale-90">
            <MessageSquare size={28} />
          </button>
          <span className="text-xs font-black text-white shadow-sm uppercase tracking-tighter">{stats.comments}</span>
        </div>

        {/* Share */}
        <div className="flex flex-col items-center gap-1 group">
          <button className="p-3 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-all active:scale-90">
            <Share2 size={28} />
          </button>
          <span className="text-xs font-black text-white shadow-sm uppercase tracking-tighter">{stats.shares}</span>
        </div>

        {/* More */}
        <button className="p-3 text-white hover:text-blue-400 transition-colors">
          <MoreVertical size={24} />
        </button>

        {/* Volume Toggle */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-3 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-all"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>

      {/* Bottom Info Overlay */}
      <div className="absolute bottom-0 left-0 right-16 z-10 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="flex flex-col gap-3 animate-in slide-in-from-bottom-4 duration-500">

          {/* User Info */}
          <div className="flex items-center gap-3">
            <img
              src={author.avatar}
              className="w-10 h-10 rounded-full border-2 border-white/50 shadow-md object-cover"
              alt={author.displayName}
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-white font-black whitespace-nowrap uppercase tracking-tight italic">
                  {author.displayName}
                </span>
                {author.verified && (
                  <div className="bg-blue-500 text-white rounded-full p-0.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  </div>
                )}
              </div>
              <span className="text-white/70 text-xs font-bold">@{author.username}</span>
            </div>
            <button className="ml-2 px-4 py-1.5 bg-white text-black text-[10px] font-black rounded-full hover:bg-blue-500 hover:text-white transition-all uppercase tracking-widest shadow-lg active:scale-95">
              TAKİP ET
            </button>
          </div>

          {/* Description */}
          {description && (
            <p className="text-white/90 text-sm font-medium line-clamp-2 leading-tight">
              {description}
            </p>
          )}

          {/* Music info */}
          <div className="flex items-center gap-2 text-white/80">
            <div className="animate-spin-slow">
              <Music size={14} />
            </div>
            <div className="overflow-hidden whitespace-nowrap w-[200px]">
              <p className="text-xs font-black uppercase tracking-widest animate-marquee inline-block italic">
                {songName || 'Orijinal Ses - ARMOYU'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Global Progress Bar at the very bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
        <div
          className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

    </div>
  );
}
