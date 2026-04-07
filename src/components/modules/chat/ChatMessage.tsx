import React from 'react';

export interface ChatMessageProps {
  id: string;
  sender: {
    name: string;
    avatar: string;
    isSelf: boolean;
  };
  content: string;
  timestamp: string;
}

export function ChatMessage({ sender, content, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex w-full ${sender.isSelf ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex gap-3 items-end max-w-[85%] md:max-w-[70%] ${sender.isSelf ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <img 
          src={sender.avatar} 
          alt={sender.name} 
          className="w-8 h-8 rounded-full border border-white/10 shadow-sm shrink-0"
        />
        
        {/* Balon & İsim */}
        <div className={`flex flex-col ${sender.isSelf ? 'items-end' : 'items-start'} gap-1.5`}>
          <span className="text-xs text-gray-500 font-bold tracking-wide dark:text-gray-400">
            {sender.name} <span className="opacity-50 mx-1">•</span> {timestamp}
          </span>
          <div className={`p-3.5 rounded-2xl text-sm shadow-lg leading-relaxed font-medium ${
            sender.isSelf 
              ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-br-sm shadow-[0_4px_15px_rgba(37,99,235,0.3)]' 
              : 'bg-black/5 dark:bg-[#1a1a24] text-armoyu-text rounded-bl-sm border border-black/5 dark:border-white/5'
          }`}>
            {content}
          </div>
        </div>

      </div>
    </div>
  );
}
