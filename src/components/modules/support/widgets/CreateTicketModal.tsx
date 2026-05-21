import React, { useState } from 'react';
import { X, UploadCloud, AlertCircle, Image as ImageIcon } from 'lucide-react';

export interface CreateTicketModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { category: string; subject: string; message: string; priority: string; attachment?: File }) => void;
}

export function CreateTicketModal({ isOpen, onClose, onSubmit }: CreateTicketModalProps) {
    const [category, setCategory] = useState('Hesap İşlemleri');
    const [priority, setPriority] = useState('Normal');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [attachment, setAttachment] = useState<File | null>(null);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!subject.trim() || !message.trim()) return;
        onSubmit({ category, subject, message, priority, attachment: attachment || undefined });
        
        // Reset form
        setCategory('Hesap İşlemleri');
        setPriority('Normal');
        setSubject('');
        setMessage('');
        setAttachment(null);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
            
            <div className="relative w-full max-w-2xl bg-armoyu-bg rounded-[40px] shadow-2xl border border-armoyu-card-border overflow-hidden animate-in zoom-in-95 duration-300">
                
                <div className="flex items-center justify-between p-6 md:p-8 border-b border-armoyu-card-border">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-black text-armoyu-text uppercase tracking-tighter italic">Yeni Destek Talebi</h2>
                        <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-[0.2em] opacity-50">Sorununu detaylıca anlat</p>
                    </div>
                    <button onClick={onClose} className="p-3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-armoyu-text-muted hover:text-armoyu-text rounded-2xl transition-all">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest pl-2">Kategori</label>
                                <select 
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full bg-black/5 dark:bg-white/5 border border-armoyu-card-border focus:border-armoyu-primary rounded-2xl px-5 py-4 text-sm font-bold text-armoyu-text outline-none transition-colors appearance-none cursor-pointer"
                                >
                                    <option value="Hesap İşlemleri">Hesap İşlemleri</option>
                                    <option value="Mağaza">Mağaza ve Ödemeler</option>
                                    <option value="Teknik Destek">Teknik Destek</option>
                                    <option value="Şikayet">Kullanıcı/Grup Şikayeti</option>
                                    <option value="Diğer">Diğer</option>
                                </select>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest pl-2">Öncelik Durumu</label>
                                <select 
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className="w-full bg-black/5 dark:bg-white/5 border border-armoyu-card-border focus:border-armoyu-primary rounded-2xl px-5 py-4 text-sm font-bold text-armoyu-text outline-none transition-colors appearance-none cursor-pointer"
                                >
                                    <option value="Düşük">Düşük</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Yüksek">Yüksek</option>
                                    <option value="Kritik">Kritik</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest pl-2">Konu Başlığı</label>
                            <input 
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Örn: Hesabıma giriş yapamıyorum"
                                className="w-full bg-black/5 dark:bg-white/5 border border-armoyu-card-border focus:border-armoyu-primary rounded-2xl px-5 py-4 text-sm font-bold text-armoyu-text placeholder:text-armoyu-text-muted/50 outline-none transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest pl-2">Detaylı Açıklama</label>
                            <textarea 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={5}
                                placeholder="Yaşadığınız sorunu olabildiğince detaylı anlatın..."
                                className="w-full bg-black/5 dark:bg-white/5 border border-armoyu-card-border focus:border-armoyu-primary rounded-2xl px-5 py-4 text-sm font-bold text-armoyu-text placeholder:text-armoyu-text-muted/50 outline-none transition-colors resize-none hide-scrollbar"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest pl-2">Dosya Veya Ekran Görüntüsü (Opsiyonel)</label>
                            <div className="relative">
                                <input 
                                    type="file" 
                                    id="ticket-attachment"
                                    className="hidden"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setAttachment(e.target.files[0]);
                                        }
                                    }}
                                />
                                <label 
                                    htmlFor="ticket-attachment"
                                    className={`flex items-center gap-4 w-full p-4 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
                                        attachment 
                                        ? 'bg-armoyu-primary/5 border-armoyu-primary text-armoyu-primary' 
                                        : 'bg-black/5 dark:bg-white/5 border-armoyu-card-border hover:border-armoyu-primary hover:text-armoyu-primary text-armoyu-text-muted'
                                    }`}
                                >
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${attachment ? 'bg-armoyu-primary text-white' : 'bg-black/5 dark:bg-white/5'}`}>
                                        {attachment ? <ImageIcon size={20} /> : <UploadCloud size={20} />}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black uppercase tracking-tight">
                                            {attachment ? attachment.name : 'Dosya Yüklemek İçin Tıklayın'}
                                        </span>
                                        <span className="text-[10px] font-bold opacity-60">Maksimum dosya boyutu: 5MB</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                    </form>
                </div>

                <div className="p-6 md:p-8 border-t border-armoyu-card-border flex flex-col sm:flex-row items-center justify-between gap-4 bg-black/5 dark:bg-white/5">
                    <div className="flex items-center gap-2 text-armoyu-text-muted opacity-70">
                        <AlertCircle size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Gereksiz bilet açmak ban sebebidir.</span>
                    </div>
                    <button 
                        onClick={handleSubmit}
                        disabled={!subject.trim() || !message.trim()}
                        className="w-full sm:w-auto px-8 py-4 bg-armoyu-primary hover:bg-armoyu-primary/90 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-armoyu-primary/20 transition-all disabled:opacity-50 disabled:pointer-events-none"
                    >
                        TALEBİ GÖNDER
                    </button>
                </div>
            </div>
        </div>
    );
}
