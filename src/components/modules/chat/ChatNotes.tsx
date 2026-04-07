'use client';

import { useAuth } from '../../../context/AuthContext';
import { MOCK_NOTES } from '../../../lib/constants/seedData';
import { Note } from '@armoyu/core';

export function ChatNotes() {
  return (
    <div className="w-full px-4 py-6 border-b border-black/5 dark:border-white/5">
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1 px-1">
        {MOCK_NOTES.map((note: any) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}

function NoteItem({ note }: { note: Note }) {
  return (
    <div className="flex flex-col items-center shrink-0 cursor-pointer group relative">
      <div className="relative mb-3 flex flex-col items-center">

        {/* Thought Bubble Box */}
        <div className={`relative px-3 py-1.5 rounded-2xl text-[10px] font-bold max-w-[85px] transition-all group-hover:-translate-y-1 shadow-sm border border-black/5 dark:border-white/10 ${note.isMe
            ? 'bg-white dark:bg-white/10 text-armoyu-text-muted italic'
            : 'bg-white dark:bg-white/20 text-armoyu-text animate-in zoom-in duration-500'
          }`}>
          <p className="truncate line-clamp-2 text-center leading-tight">
            {note.note}
          </p>

          {/* Bubble Tail (Little Triangle) */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-r border-b border-black/5 dark:border-white/10 bg-inherit" />
        </div>

        {/* Avatar Area */}
        <div className="mt-1 relative">
          <img
            src={note.user?.avatar}
            alt={note.user?.username}
            className="w-11 h-11 md:w-12 md:h-12 rounded-full border-2 border-white dark:border-white/10 shadow-sm"
          />
          {note.isMe && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-200 dark:bg-zinc-800 rounded-full border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[10px] font-bold text-gray-600 dark:text-gray-400">
              +
            </div>
          )}
        </div>
      </div>

      <span className={`text-[10px] text-armoyu-text-muted font-medium truncate w-14 text-center ${note.isMe ? 'italic' : ''}`}>
        {note.isMe ? 'Hikayen' : note.user?.displayName || note.user?.username}
      </span>
    </div>
  );
}

