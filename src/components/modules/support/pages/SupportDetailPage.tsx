'use client';

import React from 'react';
import { PageWidth } from '../../../shared/PageWidth';
import Link from 'next/link';
import { TicketInfoWidget } from '../widgets/TicketInfoWidget';
import { TicketMessagesWidget, TicketMessage } from '../widgets/TicketMessagesWidget';
import { TicketReplyWidget } from '../widgets/TicketReplyWidget';

export interface TicketDetail {
  id: string;
  subject: string;
  category: string;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
}

export interface SupportDetailPageProps {
  ticket: TicketDetail;
  newMessage: string;
  onChangeNewMessage: (value: string) => void;
  onSubmitReply: () => void;
  onCloseTicket?: () => void;
  isSubmitting?: boolean;
}

export function SupportDetailPage({
  ticket,
  newMessage,
  onChangeNewMessage,
  onSubmitReply,
  onCloseTicket,
  isSubmitting
}: SupportDetailPageProps) {
  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1200px]" />

      {/* Breadcrumb & Title Area */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-armoyu-card-border pb-8">
        <div>
          <Link
            href="/destek"
            className="inline-flex items-center gap-2 text-xs font-black text-blue-500 uppercase tracking-widest hover:underline mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            TÜM TALEPLERE DÖN
          </Link>
          <h1 className="text-3xl md:text-4xl font-black text-armoyu-text uppercase tracking-tighter italic flex items-center gap-3">
            #{ticket.id} <span className="text-armoyu-text opacity-40">|</span> {ticket.subject}
          </h1>
        </div>
        <div
          className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest border-2 shadow-lg ${
            ticket.status === 'Cevaplandı' || ticket.status === 'Yanıtlandı'
              ? 'bg-emerald-500 border-emerald-500/20 text-white shadow-emerald-500/20'
              : ticket.status === 'Kapalı' || ticket.status === 'closed'
              ? 'bg-armoyu-secondary border-armoyu-secondary/20 text-white shadow-armoyu-secondary/20'
              : 'bg-amber-500 border-amber-500/20 text-white shadow-amber-500/20'
          }`}
        >
          {ticket.status}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar - Ticket Details */}
        <TicketInfoWidget
          id={ticket.id}
          category={ticket.category}
          priority={ticket.priority}
          createdAt={ticket.createdAt}
          updatedAt={ticket.updatedAt}
          status={ticket.status}
          onClose={onCloseTicket}
        />

        {/* Message History Area */}
        <div className="lg:col-span-3 space-y-10">
          <TicketMessagesWidget messages={ticket.messages} />

          {/* Response Input */}
          {ticket.status !== 'Kapalı' && ticket.status !== 'closed' && (
            <TicketReplyWidget
              value={newMessage}
              onChange={onChangeNewMessage}
              onSubmit={onSubmitReply}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>
    </div>
  );
}
