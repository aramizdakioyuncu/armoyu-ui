import React from 'react';
import { Paperclip, Send } from 'lucide-react';

export interface TicketReplyWidgetProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export function TicketReplyWidget({ value, onChange, onSubmit, isSubmitting }: TicketReplyWidgetProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isSubmitting) {
        onSubmit();
      }
    }
  };

  return (
    <div className="flex items-end gap-2 sm:gap-4 p-2 bg-armoyu-card-bg/50 border border-armoyu-card-border rounded-3xl transition-all focus-within:border-armoyu-primary shadow-sm">
      <button className="shrink-0 p-3 text-armoyu-text-muted hover:text-armoyu-primary transition-colors rounded-xl hover:bg-armoyu-primary/10">
        <Paperclip size={20} />
      </button>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isSubmitting}
        rows={1}
        className="flex-1 max-h-32 min-h-[44px] py-3 bg-transparent text-sm font-medium text-armoyu-text placeholder-armoyu-text-muted outline-none resize-none hide-scrollbar"
        placeholder="Mesajınızı yazın..."
      />

      <button
        onClick={onSubmit}
        disabled={isSubmitting || !value.trim()}
        className="shrink-0 p-3 bg-armoyu-primary text-white rounded-xl shadow-lg shadow-armoyu-primary/20 disabled:opacity-50 disabled:pointer-events-none hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
      >
        <Send size={20} className={isSubmitting ? "opacity-50" : ""} />
      </button>
    </div>
  );
}
