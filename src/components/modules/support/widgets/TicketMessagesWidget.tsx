import React from 'react';

export interface TicketMessage {
  id: string;
  sender: string;
  role: string;
  avatar: string;
  content: string;
  time: string;
  isStaff?: boolean;
}

export interface TicketMessagesWidgetProps {
  messages: TicketMessage[];
}

export function TicketMessagesWidget({ messages }: TicketMessagesWidgetProps) {
  return (
    <div className="space-y-8">
      {messages.map((msg, i) => (
        <div
          key={msg.id}
          className={`flex gap-6 ${
            msg.isStaff ? 'flex-row-reverse' : ''
          } animate-in fade-in slide-in-from-bottom-2 duration-500`}
          style={{ animationDelay: `${i * 150}ms` }}
        >
          <img
            src={msg.avatar}
            className={`w-14 h-14 rounded-[22px] border-2 shadow-lg object-cover bg-white/5 ${
              msg.isStaff
                ? 'border-emerald-500/30 shadow-emerald-500/10'
                : 'border-armoyu-primary/30 shadow-armoyu-primary/10'
            }`}
            alt="Avatar"
          />
          <div className={`flex-1 space-y-2 ${msg.isStaff ? 'text-right' : ''}`}>
            <div className={`flex items-center gap-3 mb-1 ${msg.isStaff ? 'justify-end' : ''}`}>
              <span
                className={`text-sm font-black uppercase italic ${
                  msg.isStaff ? 'text-emerald-500 order-2' : 'text-armoyu-primary'
                }`}
              >
                {msg.sender}
              </span>
              <span
                className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest ${
                  msg.isStaff
                    ? 'bg-emerald-500/10 text-emerald-500 order-1'
                    : 'bg-black/5 dark:bg-white/5 text-armoyu-text-muted'
                }`}
              >
                {msg.role}
              </span>
            </div>
            <div
              className={`glass-panel p-6 md:p-8 rounded-[40px] border shadow-sm inline-block max-w-[90%] text-left ${
                msg.isStaff
                  ? 'bg-emerald-500/5 border-emerald-500/20 rounded-tr-sm'
                  : 'bg-armoyu-card-bg border-armoyu-card-border rounded-tl-sm'
              }`}
            >
              <p className="text-armoyu-text font-medium leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              <p className="text-[10px] font-bold text-armoyu-text-muted mt-6 opacity-40 uppercase tracking-widest">
                {msg.time}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
