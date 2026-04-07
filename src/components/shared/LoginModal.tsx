'use client';

import * as React from 'react';
import { Button } from '../Button';
import { useAuth } from '../../context/AuthContext';
import { userList } from '../../lib/constants/seedData';

export function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  // QR Kod State'leri
  const [qrValue, setQrValue] = React.useState('');
  const [qrProgress, setQrProgress] = React.useState(100);

  // Modal açıldığında form verilerinin ve QR kodun yönetimi
  React.useEffect(() => {
    if (!isOpen) {
      setUsername('');
      setPassword('');
      setError('');
      return;
    }

    const generateQR = () => {
      // Gerçek senaryoda bu veri backend'den dönen ve JWT içeren tek kullanımlık bir token olur.
      setQrValue(`armoyu_mobile_auth_${Math.random().toString(36).substring(2, 15)}`);
      setQrProgress(100);
    };

    generateQR();

    const refreshInterval = setInterval(() => {
      generateQR();
    }, 20000); // Her 20 saniyede bir yenilenir

    const progressInterval = setInterval(() => {
      // 20 saniyelik süreci 100 parçaya bölerek her 100ms'de azaltır
      setQrProgress((prev) => Math.max(0, prev - (100 / (20000 / 100)))); 
    }, 100);

    return () => {
      clearInterval(refreshInterval);
      clearInterval(progressInterval);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Search for the user in our seeded userList
      const foundUser = userList.find((u: any) => 
        u.username.toLowerCase() === username.toLowerCase()
      );

      if (foundUser) {
        login(foundUser);
        setIsSubmitting(false);
        onClose();
      } else {
        setError('Kullanıcı bulunamadı! Lütfen listedeki geçerli bir kullanıcı adını deneyin.');
        setIsSubmitting(false);
      }
    }, 800);
  };

  const fillTestAccount = () => {
    setUsername('test');
    setPassword('123456');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative glass-panel bg-[#0a0a0e]/95 w-full max-w-4xl rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,1)] border border-white/10 flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Kapat butonu */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 text-gray-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10 border border-white/5"
          title="Kapat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        {/* Klasik Giriş Alanı (Sol) */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center relative z-10">
          
          <h2 className="text-3xl font-black mb-2 text-white tracking-tight">
            Giriş Yap
          </h2>
          <p className="text-gray-400 text-sm mb-8">Kaldığın yerden oynamaya devam et.</p>

          {/* Test Hesabı Asistanı */}
          <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center shadow-inner flex items-center justify-between gap-4">
            <p className="text-xs text-blue-300 font-medium text-left">Test hesabı ile <br/>arayüzü inceleyin.</p>
            <button 
              type="button" 
              onClick={() => { setUsername('berkaytikenoglu'); setPassword('armo-v3'); }}
              className="text-xs font-bold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white py-2 px-4 rounded-lg transition-all shadow-[0_0_10px_rgba(37,99,235,0.3)] border border-blue-400/50 whitespace-nowrap"
            >
              Kurucu Bilgilerini Gir
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium rounded-xl text-center animate-in slide-in-from-top-2 duration-200">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kullanıcı Adı</label>
              <input 
                required
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 hover:border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                placeholder="••••••"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Şifre</label>
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 hover:border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium tracking-widest"
                placeholder="••••••••"
              />
            </div>
            
            <div className="flex justify-between items-center text-sm px-1 pt-1">
              <label className="flex items-center space-x-2 cursor-pointer text-gray-400 hover:text-gray-300">
                <input type="checkbox" className="rounded bg-transparent border border-white/20 text-blue-500 focus:ring-blue-500 h-4 w-4" />
                <span>Beni Hatırla</span>
              </label>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">Şifremi Unuttum</a>
            </div>

            <Button variant="primary" className="w-full h-12 text-md mt-6 font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)] rounded-xl" isLoading={isSubmitting}>
              Hesabıma Giriş Yap
            </Button>
            
            <p className="text-center text-gray-500 text-sm mt-6 font-medium">
              Henüz ARMOYU&apos;da değil misin? <a href="#" className="text-blue-400 hover:text-blue-300 ml-1">Kayıt Ol</a>
            </p>
          </form>
        </div>

        {/* QR Kod Alanı (Sağ) */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-[#0c101c] to-[#160b24] p-8 lg:p-12 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-white/5 relative">
          
          <div className="text-center space-y-4 mb-8 relative z-10 w-full">
            <h3 className="text-2xl font-bold text-white tracking-tight">Mobil Uygulama İle Gir</h3>
            <p className="text-gray-400 text-sm max-w-[260px] mx-auto leading-relaxed">
              ARMOYU uygulamasından <strong className="text-white font-medium">Ayarlar &gt; QR Okut</strong> menüsüne girerek saniyeler içinde bağlanın.
            </p>
          </div>

          {/* QR Container */}
          <div className="relative p-3 bg-white/10 backdrop-blur-md rounded-[2rem] shadow-2xl overflow-hidden border border-white/10">
             <div className="bg-white p-4 rounded-2xl relative overflow-hidden group">
                {/* QR Resim */}
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${qrValue}`}
                  alt="Login QR Code"
                  className="w-44 h-44 md:w-48 md:h-48 transition-all duration-300 group-hover:scale-105"
                  style={{ opacity: qrProgress > 95 ? 0.3 : 1 }} 
                />
             </div>
          </div>

          {/* Animasyonlu Timer */}
          <div className="mt-10 flex flex-col items-center w-full max-w-[220px]">
             <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden shadow-inner">
               <div 
                 className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                 style={{ width: `${qrProgress}%` }}
               />
             </div>
             <p className="text-xs text-gray-400 mt-3 font-medium flex items-center gap-1.5">
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`${qrProgress < 15 ? 'text-red-400 animate-pulse' : 'text-blue-400'}`}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
               <span className={`${qrProgress < 15 ? 'text-red-400' : 'text-gray-400'}`}>
                 {Math.ceil((qrProgress / 100) * 20)} saniye içinde yenilenecek
               </span>
             </p>
          </div>

        </div>

      </div>
    </div>
  );
}
