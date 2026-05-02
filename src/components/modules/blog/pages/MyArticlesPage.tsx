'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { PageWidth } from '../../../shared/PageWidth';
import { useAuth } from '../../../../context/AuthContext';
import { 
  PenSquare, 
  FileText, 
  Plus, 
  Trash2, 
  Eye, 
  ThumbsUp, 
  MessageSquare,
  Clock,
  Send,
  AlertCircle
} from 'lucide-react';

type ArticleStatus = 'Taslak' | 'Onay Bekliyor' | 'Yayında';

interface Article {
  id: string;
  title: string;
  category: string;
  coverUrl: string;
  summary: string;
  content: string;
  status: ArticleStatus;
  views: number;
  likes: number;
  comments: number;
  allowComments: boolean;
  createdAt: number;
}

const STORAGE_KEY = 'armoyu_my_articles';

// Default mock articles to show if empty
const DEFAULT_MOCK_ARTICLES: Article[] = [
  {
    id: 'a1',
    title: 'Yeni Başlayanlar İçin Valorant Taktikleri',
    category: 'Rehber',
    coverUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    summary: 'Valorant\'ta hızlıca rank atlamak için bilmeniz gereken en temel 5 taktik...',
    content: 'Valorant oynarken dikkat etmeniz gereken en önemli hususlar...',
    status: 'Yayında',
    views: 1250,
    likes: 340,
    comments: 42,
    allowComments: true,
    createdAt: Date.now() - 86400000 * 5, // 5 days ago
  },
  {
    id: 'a2',
    title: 'Assetto Corsa V3 Mod Paketi Çıktı!',
    category: 'Haber',
    coverUrl: 'https://images.unsplash.com/photo-1614204424926-196a80bf0be8?w=800&q=80',
    summary: 'Uzun süredir beklenen V3 Mod paketi sonunda yayınlandı. İşte detaylar.',
    content: 'Yeni mod paketi ile oyuna eklenen muazzam detaylar...',
    status: 'Onay Bekliyor',
    views: 0,
    likes: 0,
    comments: 0,
    allowComments: true,
    createdAt: Date.now() - 3600000 * 12, // 12 hours ago
  },
  {
    id: 'a3',
    title: 'Unreal Engine 5 İncelemesi',
    category: 'İnceleme',
    coverUrl: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&q=80',
    summary: 'Yeni nesil grafik motoru UE5 projelerinde ne gibi avantajlar sunuyor?',
    content: 'Grafik motorlarının geldiği son nokta...',
    status: 'Taslak',
    views: 0,
    likes: 0,
    comments: 0,
    allowComments: false,
    createdAt: Date.now() - 3600000 * 2, // 2 hours ago
  }
];

export function MyArticlesPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'list' | 'new'>('list');
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Haber',
    coverUrl: '',
    summary: '',
    content: '',
    allowComments: true
  });
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    // Load from local storage on mount
    const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setArticles(parsed.length > 0 ? parsed : DEFAULT_MOCK_ARTICLES);
      } catch (e) {
        setArticles(DEFAULT_MOCK_ARTICLES);
      }
    } else {
      setArticles(DEFAULT_MOCK_ARTICLES);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    }
  }, [articles, isLoaded]);

  const handleCreateOrUpdate = (status: ArticleStatus) => {
    if (!formData.title.trim()) return alert('Lütfen yazıya bir başlık ekleyin!');
    
    if (editingId) {
      // Update
      setArticles(prev => prev.map(a => 
        a.id === editingId ? { ...a, ...formData, status, createdAt: Date.now() } : a
      ));
    } else {
      // Create
      const newArticle: Article = {
        id: Math.random().toString(36).substring(2, 9),
        ...formData,
        status,
        views: 0,
        likes: 0,
        comments: 0,
        createdAt: Date.now()
      };
      setArticles([newArticle, ...articles]);
    }

    setFormData({ title: '', category: 'Haber', coverUrl: '', summary: '', content: '', allowComments: true });
    setEditingId(null);
    setActiveTab('list');
    setIsPreview(false);
  };

  const handleEdit = (article: Article) => {
    setFormData({
      title: article.title,
      category: article.category,
      coverUrl: article.coverUrl,
      summary: article.summary || '',
      content: article.content,
      allowComments: article.allowComments !== undefined ? article.allowComments : true
    });
    setEditingId(article.id);
    setActiveTab('new');
    setIsPreview(false);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Bu yazıyı silmek istediğinize emin misiniz?')) {
      setArticles(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleRequestPublish = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setArticles(prev => prev.map(a => 
      a.id === id ? { ...a, status: 'Onay Bekliyor' } : a
    ));
  };
  
  const resetForm = () => {
     setFormData({ title: '', category: 'Haber', coverUrl: '', summary: '', content: '', allowComments: true });
     setEditingId(null);
     setIsPreview(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
       const reader = new FileReader();
       reader.onloadend = () => {
          setFormData({ ...formData, coverUrl: reader.result as string });
       };
       reader.readAsDataURL(file);
    }
  };

  const stats = useMemo(() => {
    let totalViews = 0;
    let totalLikes = 0;
    let totalComments = 0;
    let publishedCount = 0;

    articles.forEach(a => {
      totalViews += a.views;
      totalLikes += a.likes;
      totalComments += a.comments;
      if (a.status === 'Yayında') publishedCount++;
    });

    return { totalViews, totalLikes, totalComments, publishedCount, total: articles.length };
  }, [articles]);

  const renderMarkdownPreview = (text: string) => {
    if (!text.trim()) return <span className="text-armoyu-text-muted opacity-50 italic">Önizleme yapılacak içerik yok...</span>;
    
    // Satıriçi biçimlendirmeler
    let processed = text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-black text-armoyu-text">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic opacity-90 text-armoyu-text">$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-armoyu-primary hover:text-armoyu-primary font-bold transition-colors" target="_blank">$1</a>');

    // Satır bazlı blok ayrıştırma
    const lines = processed.split('\n');
    let inList = false;
    let htmlLines = lines.map((line, index) => {
       const trimmed = line.trim();
       
       // Liste mantığı (Çok temel)
       if (trimmed.startsWith('- ')) {
          const li = `<li class="ml-6 mb-1 list-disc text-armoyu-text-muted leading-relaxed">${trimmed.substring(2)}</li>`;
          if (!inList) {
             inList = true;
             return `<ul class="my-3 block">` + li;
          }
          if (inList && index === lines.length - 1) {
             return li + `</ul>`;
          }
          return li;
       } else if (inList) {
          inList = false;
          // Listeyi kapatıp yeni satırı işle (bu satır boş değilse altındaki if'lere girmez mecburen baştan kontrol etmeliyiz, ama basitlik adına böyle bırakabiliriz)
       }

       if (trimmed.startsWith('### ')) {
          return `${!inList && index>0?'</ul>':''}<h3 class="text-lg md:text-xl font-black mt-6 mb-3 text-armoyu-text uppercase tracking-tight">${trimmed.substring(4)}</h3>`;
       } else if (trimmed.startsWith('## ')) {
          return `${!inList && index>0?'</ul>':''}<h2 class="text-xl md:text-2xl font-black mt-8 mb-4 text-armoyu-text uppercase tracking-tight">${trimmed.substring(3)}</h2>`;
       } else if (trimmed.startsWith('# ')) {
          return `${!inList && index>0?'</ul>':''}<h1 class="text-2xl md:text-3xl font-black mt-8 mb-5 text-armoyu-text uppercase tracking-tighter">${trimmed.substring(2)}</h1>`;
       } else if (trimmed === '') {
          return '<div class="h-3 md:h-4 w-full"></div>';
       } else {
          return `<p class="mb-2 text-armoyu-text-muted leading-relaxed font-medium break-words">${trimmed}</p>`;
       }
    });

    if (inList) htmlLines.push('</ul>');

    const html = htmlLines.join('');
    return <div dangerouslySetInnerHTML={{ __html: html }} className="w-full text-base" />;
  };

  if (!user) {
    return (
       <div className="min-h-[60vh] flex flex-col items-center justify-center animate-in fade-in duration-1000">
          <AlertCircle size={48} className="text-armoyu-text-muted mb-4 opacity-50" />
          <h2 className="text-2xl font-black text-armoyu-text mb-2 tracking-tighter uppercase">Giriş Yapılması Gerekiyor</h2>
          <p className="text-armoyu-text-muted font-medium text-center">Yazılarınızı yönetmek için giriş yapmalısınız.</p>
       </div>
    );
  }

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1280px]" />
      
      {/* Header */}
      <div className="mb-10 mt-10">
         <h1 className="text-4xl md:text-5xl font-black text-armoyu-text mb-4 uppercase tracking-tighter italic drop-shadow-lg flex items-center gap-4">
            <PenSquare className="text-armoyu-primary" size={40} /> YAZILARIM
         </h1>
         <p className="text-armoyu-text-muted text-lg font-medium opacity-80 max-w-2xl">
           Kendi içeriklerinizi oluşturun, yönetin ve ARMOYU topluluğu ile paylaşın.
         </p>
      </div>

      {/* Permanent Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
         <div className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-armoyu-card-border relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 text-black/5 dark:text-white/5 group-hover:scale-110 transition-transform"><FileText size={80} /></div>
            <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1 relative z-10">Toplam Yazı</p>
            <p className="text-3xl font-black text-armoyu-text relative z-10">{stats.total}</p>
         </div>
         
         <div className="p-5 rounded-2xl bg-armoyu-primary/10 border border-armoyu-primary/20 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 text-armoyu-primary/10 group-hover:scale-110 transition-transform"><Eye size={80} /></div>
            <p className="text-[10px] font-black text-armoyu-primary uppercase tracking-widest mb-1 relative z-10">Toplam Okunma</p>
            <p className="text-3xl font-black text-armoyu-text relative z-10">{stats.totalViews}</p>
         </div>
         
         <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 text-emerald-500/10 group-hover:scale-110 transition-transform"><ThumbsUp size={80} /></div>
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1 relative z-10">Toplam Beğeni</p>
            <p className="text-3xl font-black text-armoyu-text relative z-10">{stats.totalLikes}</p>
         </div>
         
         <div className="p-5 rounded-2xl bg-orange-500/10 border border-orange-500/20 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 text-orange-500/10 group-hover:scale-110 transition-transform"><MessageSquare size={80} /></div>
            <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1 relative z-10">Toplam Yorum</p>
            <p className="text-3xl font-black text-armoyu-text relative z-10">{stats.totalComments}</p>
         </div>
      </div>

      {/* Tabs */}
      <div className="glass-panel p-2 rounded-2xl border border-armoyu-card-border mb-8 inline-flex flex-wrap gap-2">
         <button 
           onClick={() => { setActiveTab('list'); resetForm(); }}
           className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
             activeTab === 'list' 
               ? 'bg-armoyu-primary text-white shadow-lg shadow-armoyu-primary/30' 
               : 'text-armoyu-text-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-armoyu-text'
           }`}
         >
           <FileText size={16} /> Yazı Lİstesİ
         </button>
         <button 
           onClick={() => setActiveTab('new')}
           className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
             activeTab === 'new' 
               ? 'bg-armoyu-primary text-white shadow-lg shadow-armoyu-primary/30' 
               : 'text-armoyu-text-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-armoyu-text'
           }`}
         >
           <Plus size={16} /> {editingId ? 'YAZIYI DÜZENLE' : 'YENİ YAZI'}
         </button>
      </div>

      {/* Content Area */}
      <div className="glass-panel rounded-[30px] border border-armoyu-card-border p-6 md:p-10 shadow-xl bg-armoyu-card-bg">
         
         {/* Tab: LIST */}
         {activeTab === 'list' && (
           <div className="animate-in fade-in duration-500">
             {articles.length === 0 ? (
                <div className="text-center py-20">
                   <div className="w-16 h-16 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                     <FileText size={24} className="text-armoyu-text-muted" />
                   </div>
                   <h3 className="text-xl font-black text-armoyu-text mb-2 uppercase">Henüz Yazınız Yok</h3>
                   <p className="text-sm text-armoyu-text-muted font-medium mb-6">İlk yazınızı oluşturarak topluluğa katkı sağlayın.</p>
                   <button onClick={() => setActiveTab('new')} className="px-6 py-3 bg-armoyu-primary text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-armoyu-primary transition-colors">
                     Yazı Oluştur
                   </button>
                </div>
             ) : (
                <div className="space-y-4">
                   {articles.map((article) => (
                      <div key={article.id} onClick={() => handleEdit(article)} className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-armoyu-card-border cursor-pointer transition-all hover:bg-black/10 dark:hover:bg-white/10 group">
                         <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 border border-armoyu-card-border">
                            {article.coverUrl ? (
                               <img src={article.coverUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                               <div className="w-full h-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-xs text-armoyu-text-muted uppercase font-bold tracking-widest">
                                  Resim Yok
                               </div>
                            )}
                         </div>
                         
                         <div className="flex-1 w-full">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                               <span className="text-[10px] font-black uppercase tracking-widest bg-armoyu-primary/10 text-armoyu-primary px-3 py-1 rounded-lg">
                                  {article.category}
                               </span>
                               <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg text-white ${
                                  article.status === 'Yayında' ? 'bg-emerald-500/90' : 
                                  article.status === 'Onay Bekliyor' ? 'bg-orange-500/90' : 
                                  'bg-gray-500/90'
                               }`}>
                                  {article.status}
                               </span>
                               <span className="text-xs text-armoyu-text-muted font-medium flex items-center gap-1 ml-auto">
                                 <Clock size={12} />
                                 {new Date(article.createdAt).toLocaleDateString('tr-TR')}
                               </span>
                            </div>
                            
                            <h3 className="text-lg font-black text-armoyu-text uppercase tracking-tight mb-2 line-clamp-1 group-hover:text-armoyu-primary transition-colors">
                               {article.title}
                            </h3>
                            
                            <div className="flex items-center gap-6 mt-4 opacity-70">
                               <div className="flex items-center gap-1.5 text-xs font-bold text-armoyu-text-muted"><Eye size={14} /> {article.views}</div>
                               <div className="flex items-center gap-1.5 text-xs font-bold text-armoyu-text-muted"><ThumbsUp size={14} /> {article.likes}</div>
                               <div className="flex items-center gap-1.5 text-xs font-bold text-armoyu-text-muted"><MessageSquare size={14} /> {article.comments}</div>
                            </div>
                         </div>
                         
                         <div className="flex md:flex-col gap-2 w-full md:w-auto mt-4 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            {article.status === 'Taslak' && (
                               <button 
                                 onClick={(e) => handleRequestPublish(article.id, e)}
                                 className="flex items-center justify-center gap-2 px-4 py-2 bg-armoyu-primary hover:bg-armoyu-primary text-white text-[10px] font-black uppercase tracking-widest rounded-lg flex-1"
                               >
                                  <Send size={14} /> Onay İste
                               </button>
                            )}
                            <button 
                              onClick={(e) => handleDelete(article.id, e)}
                              className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-lg flex-1 transition-colors"
                            >
                               <Trash2 size={14} /> Sil
                            </button>
                         </div>
                      </div>
                   ))}
                </div>
             )}
           </div>
         )}

         {/* Tab: NEW / EDIT */}
         {activeTab === 'new' && (
           <div className="animate-in fade-in duration-500 max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
              
              {/* Sol Kolon - Ana İçerik */}
              <div className="flex-[2] space-y-6 flex flex-col">
                 <div className="bg-black/5 dark:bg-white/5 border border-armoyu-card-border rounded-2xl p-6">
                    <label className="block text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-3">Yazı Başlığı</label>
                    <input 
                      type="text" 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-black/5 dark:bg-white/5 border border-armoyu-card-border focus:border-armoyu-primary rounded-xl px-4 py-3 text-lg font-black text-armoyu-text uppercase placeholder:normal-case placeholder:font-medium placeholder:text-armoyu-text-muted/50 transition-colors outline-none"
                      placeholder="İlgi çekici bir başlık girin..."
                    />
                 </div>

                 <div className="bg-black/5 dark:bg-white/5 border border-armoyu-card-border rounded-2xl p-6">
                    <label className="block text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-3">Yazı Özeti (Kısa Açıklama)</label>
                    <textarea 
                      value={formData.summary}
                      onChange={(e) => setFormData({...formData, summary: e.target.value})}
                      className="w-full bg-black/5 dark:bg-white/5 border border-armoyu-card-border focus:border-armoyu-primary rounded-xl px-4 py-3 text-sm font-medium text-armoyu-text placeholder:text-armoyu-text-muted/50 transition-colors outline-none resize-none h-24"
                      placeholder="Ana sayfada ve listelerde görünecek kısa ve etkileyici bir özet..."
                    />
                 </div>

                 <div className="flex-1 flex flex-col min-h-[400px] bg-black/5 dark:bg-white/5 border border-armoyu-card-border rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                       <label className="block text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">Yazı İçeriği (Markdown destekli)</label>
                       <div className="flex bg-black/5 dark:bg-white/5 rounded-lg p-1">
                          <button 
                             onClick={() => setIsPreview(false)}
                             className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded transition-colors ${!isPreview ? 'bg-armoyu-primary text-white shadow-md' : 'text-armoyu-text-muted hover:text-armoyu-text'}`}
                          >
                             Düzenle
                          </button>
                          <button 
                             onClick={() => setIsPreview(true)}
                             className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded transition-colors ${isPreview ? 'bg-emerald-600 text-white shadow-md' : 'text-armoyu-text-muted hover:text-armoyu-text'}`}
                          >
                             Göz At (Mini)
                          </button>
                       </div>
                    </div>

                    {!isPreview ? (
                       <textarea 
                         value={formData.content}
                         onChange={(e) => setFormData({...formData, content: e.target.value})}
                         className="w-full flex-1 min-h-[400px] bg-black/5 dark:bg-white/5 border border-armoyu-card-border focus:border-armoyu-primary rounded-xl px-5 py-4 text-sm font-medium text-armoyu-text placeholder:text-armoyu-text-muted/50 transition-colors outline-none resize-y hide-scrollbar leading-relaxed"
                         placeholder="Harika fikirlerinizi buraya yazın... (*italik*, **kalın**, # Başlık)"
                       />
                    ) : (
                       <div className="w-full flex-1 min-h-[400px] bg-black/5 dark:bg-white/5 border border-emerald-500/30 rounded-xl px-5 py-4 overflow-y-auto">
                          {renderMarkdownPreview(formData.content)}
                       </div>
                    )}
                 </div>
              </div>

              {/* Sağ Kolon - Sidebar */}
              <div className="flex-1 space-y-6">
                 
                 <div className="bg-black/5 dark:bg-white/5 border border-armoyu-card-border rounded-2xl p-6">
                    <label className="block text-xs font-black text-armoyu-text uppercase tracking-widest mb-6 flex items-center gap-2">
                       Ayar Panosu
                    </label>
                    <div className="space-y-6">
                       
                       <div>
                         <label className="block text-[10px] font-bold text-armoyu-text-muted uppercase tracking-wide mb-2">Kapak Fotoğrafı</label>
                         {formData.coverUrl ? (
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-2 border border-armoyu-card-border group">
                               <img src={formData.coverUrl} className="w-full h-full object-cover" />
                               <button 
                                 onClick={() => setFormData({...formData, coverUrl: ''})}
                                 className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                               >
                                  <Trash2 size={16} />
                               </button>
                            </div>
                         ) : (
                            <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-armoyu-card-border hover:border-armoyu-primary rounded-xl cursor-pointer transition-colors text-armoyu-text-muted hover:text-armoyu-primary bg-black/5 dark:bg-white/5">
                               <Plus size={24} className="mb-2" />
                               <span className="text-[10px] font-black uppercase tracking-widest">Resim Yükle</span>
                               <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                            </label>
                         )}
                       </div>

                       <div>
                         <label className="block text-[10px] font-bold text-armoyu-text-muted uppercase tracking-wide mb-2">Kategori Seçimi</label>
                         <select 
                           value={formData.category}
                           onChange={(e) => setFormData({...formData, category: e.target.value})}
                           className="w-full bg-black/5 dark:bg-white/5 border border-armoyu-card-border focus:border-armoyu-primary rounded-xl px-4 py-3 text-sm font-bold text-armoyu-text transition-colors outline-none cursor-pointer"
                         >
                            <option value="Haber">Haber</option>
                            <option value="İnceleme">İnceleme</option>
                            <option value="Rehber">Rehber</option>
                            <option value="Röportaj">Röportaj</option>
                         </select>
                       </div>

                       <div className="pt-2">
                         <label className="flex items-center gap-3 p-3 bg-black/5 dark:bg-white/5 border border-armoyu-card-border rounded-xl cursor-pointer hover:border-armoyu-primary transition-colors">
                            <input 
                              type="checkbox" 
                              checked={formData.allowComments}
                              onChange={(e) => setFormData({...formData, allowComments: e.target.checked})}
                              className="w-5 h-5 rounded border-armoyu-card-border text-armoyu-primary cursor-pointer"
                            />
                            <span className="text-[10px] font-black text-armoyu-text uppercase tracking-widest">Yorumlara Açık Kalsın</span>
                         </label>
                       </div>
                    </div>
                 </div>

                 <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => handleCreateOrUpdate('Onay Bekliyor')}
                      className="w-full py-4 text-[10px] font-black uppercase tracking-widest bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Send size={14} /> Yayına Al / İste
                    </button>
                    
                    <button 
                      onClick={() => handleCreateOrUpdate('Taslak')}
                      className="w-full py-4 text-[10px] font-black uppercase tracking-widest bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-armoyu-text border border-armoyu-card-border hover:border-transparent rounded-xl transition-all"
                    >
                      Taslak Olarak Kaydet
                    </button>
                    
                    <button 
                      onClick={() => setActiveTab('list')}
                      className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted hover:text-armoyu-text transition-colors mt-2"
                    >
                      İptal Et
                    </button>
                 </div>

              </div>
           </div>
         )}

      </div>
    </div>
  );
}
