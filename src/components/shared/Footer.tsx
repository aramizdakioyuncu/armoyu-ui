import React from 'react';

export function Footer() {
  const latestPosts = [
    { title: "Yeni Minecraft Sunucu Altyapımız Yayında!", date: "18 Mart 2026", link: "#" },
    { title: "Valorant Kış Turnuvası Kayıtları Başladı, Yerini Ayırt", date: "15 Mart 2026", link: "#" },
    { title: "ARMOYU Çekiliş Sonuçları Açıklandı", date: "10 Mart 2026", link: "#" },
  ];

  return (
    <footer className="w-full mt-24 border-t border-armoyu-card-border bg-armoyu-bg py-12 px-6 md:px-8 relative z-20 text-center md:text-left">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Hakkımızda */}
        <div className="space-y-4 flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-white dark:to-gray-300 tracking-tight">ARMOYU</h2>
          <p className="text-armoyu-text-muted text-sm leading-relaxed max-w-sm font-medium">
            Türkiye'nin en aktif ve yenilikçi oyuncu topluluğu. Oyun dünyasındaki gelişmeleri takip et, arkadaşlarınla ekipler kur ve rekabete katıl.
          </p>
          {/* Sosyal Medya İkonları */}
          <div className="flex gap-3 pt-4 justify-center md:justify-start">
            <a href="#" className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-armoyu-text-muted hover:text-indigo-500 hover:bg-black/10 dark:hover:bg-white/10 transition-colors border border-black/5 dark:border-white/5" title="Discord">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M8 8a9 9 0 0 0-4 3c-1.3 4-1.5 6-.5 8 1 2 4 1 6-1h4c2 2 5 3 6 1 1-2 .8-4-.5-8a9 9 0 0 0-4-3 7 7 0 0 0-6 0z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-armoyu-text-muted hover:text-pink-500 hover:bg-black/10 dark:hover:bg-white/10 transition-colors border border-black/5 dark:border-white/5" title="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-armoyu-text-muted hover:text-red-500 hover:bg-black/10 dark:hover:bg-white/10 transition-colors border border-black/5 dark:border-white/5" title="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-armoyu-text-muted hover:text-blue-500 hover:bg-black/10 dark:hover:bg-white/10 transition-colors border border-black/5 dark:border-white/5" title="X (Twitter)">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
            </a>
          </div>
        </div>

        {/* Hızlı Bağlantılar */}
        <div className="space-y-4 lg:pl-8 flex flex-col items-center md:items-start">
          <h3 className="text-lg font-bold text-armoyu-text tracking-wide">Hızlı Bağlantılar</h3>
          <ul className="space-y-3 text-sm text-armoyu-text-muted font-bold w-full md:w-auto flex flex-col items-center md:items-start">
            <li><a href="#" className="hover:text-blue-500 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 hidden md:block"></span> Ana Sayfa</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 hidden md:block"></span> Gruplar</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 hidden md:block"></span> Forum</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 hidden md:block"></span> Mağaza</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 hidden md:block"></span> Destek Talebi</a></li>
          </ul>
        </div>

        {/* Son Yazılar */}
        <div className="space-y-4 lg:col-span-2">
          <h3 className="text-lg font-bold text-armoyu-text tracking-wide">Son Paylaşımlar</h3>
          <div className="space-y-3">
            {latestPosts.map((post, idx) => (
              <a key={idx} href={post.link} className="block group text-left">
                <div className="bg-black/5 dark:bg-white/5 p-4 rounded-xl border border-black/5 dark:border-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 group-hover:border-blue-500/30 transition-all cursor-pointer flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-4 shadow-sm">
                  <h4 className="text-armoyu-text text-sm font-bold group-hover:text-blue-500 transition-colors line-clamp-2 md:line-clamp-1 flex-1">{post.title}</h4>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-extrabold whitespace-nowrap sm:bg-blue-500/10 sm:px-2.5 sm:py-1 rounded-md">{post.date}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Alt Karartma (Copyright) */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-armoyu-card-border flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-bold text-armoyu-text-muted">
        <p>© 2026 Aramızdaki Oyuncu. Tüm hakları saklıdır.</p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <a href="#" className="hover:text-armoyu-text transition-colors">Gizlilik Politikası</a>
          <a href="#" className="hover:text-armoyu-text transition-colors">Hizmet Şartları</a>
          <a href="#" className="hover:text-armoyu-text transition-colors">Kurallar</a>
        </div>
      </div>
    </footer>
  );
}
