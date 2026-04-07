import React from 'react';
import { 
  ChatNotes, 
  ChatList, 
  ChatContainer, 
  MOCK_SESSION 
} from '../../index';

export function MessagesTab() {
  return (
    <div className="space-y-12">
       <h3 className="text-2xl font-black italic uppercase tracking-tighter border-l-4 border-emerald-500 pl-4">Mesajlaşma Sistemi</h3>
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[700px]">
          <div className="lg:col-span-4 glass-panel rounded-[40px] overflow-hidden flex flex-col">
             <ChatNotes />
             <div className="flex-1 overflow-hidden p-2">
                <ChatList contacts={MOCK_SESSION.chatList} activeId="c1" onSelect={() => {}} />
             </div>
          </div>
          <div className="lg:col-span-8 glass-panel rounded-[40px] overflow-hidden">
             <ChatContainer />
          </div>
       </div>
    </div>
  );
}
