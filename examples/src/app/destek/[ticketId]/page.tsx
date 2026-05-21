'use client';

import React, { useState } from 'react';
import { SupportDetailPage } from '@armoyu/ui';
import { useParams } from 'next/navigation';

// Mock ticket detail data
const TICKET_DETAIL = {
  id: 'T-1024',
  subject: 'Test Destek Talebi',
  category: 'Genel',
  status: 'Açık',
  priority: 'Normal',
  createdAt: '22.03.2024 14:20',
  updatedAt: 'Az önce',
  messages: [
    {
      id: 'm1',
      sender: 'Kullanıcı',
      role: 'Kullanıcı',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
      content: 'Bu bir test destek talebidir.',
      time: '22.03.2024 14:20',
      isStaff: false
    }
  ]
};

export default function TicketDetailPage() {
  const params = useParams();
  const ticketId = params?.ticketId as string;
  const [newMessage, setNewMessage] = useState('');
  const [ticket, setTicket] = useState({
    ...TICKET_DETAIL,
    id: ticketId || TICKET_DETAIL.id
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReply = () => {
    if (!newMessage.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      const newMsg = {
        id: `m_${Date.now()}`,
        sender: 'Kullanıcı',
        role: 'Kullanıcı',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
        content: newMessage,
        time: 'Şimdi',
        isStaff: false
      };
      setTicket((prev) => ({
        ...prev,
        messages: [...prev.messages, newMsg]
      }));
      setNewMessage('');
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <SupportDetailPage
      ticket={ticket}
      newMessage={newMessage}
      onChangeNewMessage={setNewMessage}
      onSubmitReply={handleSubmitReply}
      onCloseTicket={() => setTicket(prev => ({ ...prev, status: 'Kapalı' }))}
      isSubmitting={isSubmitting}
    />
  );
}
