import React from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { TicketInfoWidget } from './TicketInfoWidget';
import { TicketMessagesWidget, TicketMessage } from './TicketMessagesWidget';
import { TicketReplyWidget } from './TicketReplyWidget';

export interface SupportDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    ticketId: string;
    ticketInfo: {
        status: string;
        priority: string;
        category: string;
        subject: string;
        date: string;
    };
    messages: TicketMessage[];
    replyValue: string;
    onReplyChange: (value: string) => void;
    onReplySubmit: () => void;
    isSubmitting?: boolean;
}

export function SupportDetailModal({ 
    isOpen, 
    onClose, 
    ticketId, 
    ticketInfo,
    messages,
    replyValue,
    onReplyChange,
    onReplySubmit,
    isSubmitting 
}: SupportDetailModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
            
            <div className="relative w-full h-full md:h-[90vh] md:max-w-6xl bg-armoyu-bg md:rounded-[40px] shadow-2xl border border-armoyu-card-border overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
                
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-armoyu-card-border bg-black/5 dark:bg-white/5 shrink-0">
                    <div className="flex items-center gap-4">
                        <button onClick={onClose} className="md:hidden p-2 bg-black/5 dark:bg-white/5 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 text-armoyu-text">
                            <ArrowLeft size={20} />
                        </button>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-3 mb-1">
                                <span className="text-[10px] font-black uppercase tracking-widest bg-armoyu-primary/10 text-armoyu-primary px-2 py-1 rounded-md">{ticketId}</span>
                                <h2 className="text-xl font-black text-armoyu-text uppercase tracking-tighter italic line-clamp-1">{ticketInfo.subject}</h2>
                            </div>
                            <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest">{ticketInfo.category}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="hidden md:flex p-3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-armoyu-text-muted hover:text-armoyu-text rounded-2xl transition-all">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
                    
                    {/* Sidebar / Info */}
                    <div className="lg:w-80 border-b lg:border-b-0 lg:border-r border-armoyu-card-border bg-black/5 dark:bg-white/5 shrink-0 overflow-y-auto p-8">
                        <TicketInfoWidget 
                            id={ticketId}
                            createdAt={ticketInfo.date}
                            updatedAt={ticketInfo.date}
                            status={ticketInfo.status}
                            priority={ticketInfo.priority}
                            category={ticketInfo.category}
                        />
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 flex flex-col relative h-full bg-armoyu-bg overflow-hidden">
                        
                        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar pb-32">
                            <TicketMessagesWidget messages={messages} />
                        </div>
                        
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-armoyu-bg/80 backdrop-blur-xl border-t border-armoyu-card-border z-10">
                            <TicketReplyWidget 
                                value={replyValue}
                                onChange={onReplyChange}
                                onSubmit={onReplySubmit}
                                isSubmitting={isSubmitting}
                            />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
