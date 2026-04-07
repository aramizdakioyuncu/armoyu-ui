'use client';

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import { ChatContainer } from '../../components/modules/chat/ChatContainer';

export interface FloatingChatButtonProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export function FloatingChatButton({ position = 'bottom-right' }: FloatingChatButtonProps) {
  const { user } = useAuth();
  const { isChatOpen, toggleChat } = useChat();

  if (!user) return null;

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6 md:bottom-10 md:right-10',
    'bottom-left': 'bottom-6 left-6 md:bottom-10 md:left-10',
    'top-right': 'top-24 right-6 md:top-24 md:right-10',
    'top-left': 'top-24 left-6 md:top-24 md:left-10',
  };

  return (
    <div key="floating-chat-wrapper">
      {/* Floating Buton (Sadece sohbet KAPALIYKEN görünür) */}
      {!isChatOpen && (
        <div key="floating-trigger" className={`fixed z-[80] animate-in fade-in zoom-in duration-500 ${positionClasses[position]}`}>
          <button 
            onClick={toggleChat}
            className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center border border-blue-400/50 group focus:outline-none"
            title="Sohbeti Aç"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-0.5 transition-transform md:w-7 md:h-7 animate-in spin-in-[-90deg] duration-300">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            {/* Unread Badge */}
            <span className="absolute top-0 right-0 md:top-0.5 md:right-0.5 w-3.5 h-3.5 md:w-4 md:h-4 bg-red-500 rounded-full border-2 border-white dark:border-[#0a0a0e] shadow-sm animate-pulse"></span>
          </button>
        </div>
      )}

      {/* Floating Chat Container - Always mounted to persist state, visibility toggled with CSS */}
      <div 
        key="floating-container"
        className={`fixed bottom-0 right-0 md:bottom-6 md:right-6 z-[70] w-full sm:w-[400px] h-[100dvh] sm:h-[calc(100vh-100px)] md:h-[650px] shadow-[0_0_40px_rgba(0,0,0,0.3)] origin-bottom-right transition-all duration-500 sm:rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 flex flex-col bg-armoyu-card-bg backdrop-blur-xl ${
          isChatOpen 
          ? 'translate-y-0 scale-100 opacity-100 pointer-events-auto' 
          : 'translate-y-10 scale-95 opacity-0 pointer-events-none'
        }`}
      >
        <ChatContainer />
      </div>
    </div>
  );
}
