'use client';

import { ThumbsUp, MessageCircle, Send, Smile, Paperclip, MoreHorizontal } from 'lucide-react';

export function NewsComments({ comments = [] }: { comments?: any[] }) {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/5">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-armoyu-primary/10 rounded-2xl text-armoyu-primary">
              <MessageCircle size={20} />
           </div>
           <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter italic leading-none">Tartışmaya Katıl</h3>
              <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest mt-1 opacity-60">
                 {comments.length} TOPLULUK FİKRİ
              </p>
           </div>
        </div>
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
            <button className="px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest bg-armoyu-primary text-white shadow-lg shadow-armoyu-primary/20 transition-all">En Yeni</button>
            <button className="px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest text-armoyu-text-muted hover:text-white transition-all">Popüler</button>
        </div>
      </div>

      {/* Yorum Yap */}
      <div className="relative group">
         <div className="absolute -inset-0.5 bg-gradient-to-r from-armoyu-primary/20 to-transparent rounded-[32px] blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
         <div className="relative glass-panel p-6 rounded-[32px] border border-white/5 bg-zinc-900/50 backdrop-blur-xl">
            <div className="flex gap-5">
               <div className="relative">
                  <img 
                     src="https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay" 
                     className="w-12 h-12 rounded-2xl object-cover shrink-0 shadow-2xl border-2 border-armoyu-primary/20" 
                     alt="Sen" 
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-zinc-900 rounded-full"></div>
               </div>
               <div className="flex-1 space-y-4">
                  <textarea 
                     rows={3}
                     placeholder="Düşüncelerini toplulukla paylaş..."
                     className="w-full bg-transparent border-none outline-none text-white placeholder:text-armoyu-text-muted/30 font-medium resize-none text-sm leading-relaxed"
                  />
                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                     <div className="flex gap-1">
                        <button className="p-2.5 text-armoyu-text-muted hover:text-armoyu-primary hover:bg-armoyu-primary/10 rounded-xl transition-all">
                           <Smile size={18} />
                        </button>
                        <button className="p-2.5 text-armoyu-text-muted hover:text-armoyu-primary hover:bg-armoyu-primary/10 rounded-xl transition-all">
                           <Paperclip size={18} />
                        </button>
                     </div>
                     <button className="group/btn flex items-center gap-2 bg-armoyu-primary hover:bg-armoyu-primary text-white px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-armoyu-primary/30 transition-all active:scale-95">
                        GÖNDER
                        <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Yorum Listesi */}
      <div className="space-y-8">
        {comments.length > 0 ? comments.map((comment, i) => (
          <div key={i} className="flex gap-5 group animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="shrink-0 pt-1">
               <div className="relative">
                  <img src={comment.author.avatar} className="w-11 h-11 rounded-2xl object-cover border border-white/10" alt="" />
                  {i === 0 && <div className="absolute -top-2 -right-2 p-1 bg-yellow-500 rounded-lg text-black"><MoreHorizontal size={8} strokeWidth={4} /></div>}
               </div>
            </div>
            <div className="flex-1 space-y-3">
              <div className="relative glass-panel p-5 rounded-[24px] rounded-tl-none border border-white/5 bg-white/5 group-hover:bg-white/[0.07] transition-all shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-white uppercase tracking-tight italic">{comment.author.displayName}</span>
                    <span className="text-[9px] font-bold text-armoyu-primary/60 uppercase tracking-widest">@{comment.author.username}</span>
                  </div>
                  <span className="text-[9px] font-bold text-armoyu-text-muted opacity-40 uppercase tracking-tighter italic">{comment.date}</span>
                </div>
                <p className="text-[13px] text-armoyu-text leading-relaxed font-medium opacity-80">
                  {comment.content}
                </p>
              </div>
              
              <div className="flex items-center gap-6 ml-2">
                 <button className="flex items-center gap-1.5 text-[9px] font-black text-armoyu-text-muted hover:text-emerald-500 transition-all uppercase tracking-widest group/action">
                    <div className="p-1.5 rounded-lg group-hover/action:bg-emerald-500/10 transition-all">
                       <ThumbsUp size={12} />
                    </div>
                    <span>BEĞEN ({comment.likes})</span>
                 </button>
                 <button className="flex items-center gap-1.5 text-[9px] font-black text-armoyu-text-muted hover:text-armoyu-primary transition-all uppercase tracking-widest group/action">
                    <div className="p-1.5 rounded-lg group-hover/action:bg-armoyu-primary/10 transition-all">
                       <MessageCircle size={12} />
                    </div>
                    <span>YANITLA</span>
                 </button>
              </div>
            </div>
          </div>
        )) : (
          <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[40px] opacity-30">
             <MessageCircle size={40} className="mx-auto mb-4 text-armoyu-text-muted" />
             <p className="text-sm font-black text-armoyu-text uppercase tracking-widest italic">Henüz yorum yapılmamış. <br /> İlk yorumu sen yap!</p>
          </div>
        )}
      </div>
    </div>
  );
}
