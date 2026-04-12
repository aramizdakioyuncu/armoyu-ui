'use client';

import React, { useState, useEffect } from 'react';
import { useArmoyu } from '../../context/ArmoyuContext';
import { Key, ShieldCheck, Settings2, X, RotateCcw, Save, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

export function DevTools() {
  const { apiKey, token, setGlobalApiKey, setGlobalToken } = useArmoyu();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [localToken, setLocalToken] = useState(token);
  const [isSaved, setIsSaved] = useState(false);

  // Global state değiştiğinde (örn: localStorage'dan yüklendiğinde) yerel state'i güncelle
  useEffect(() => {
    setLocalApiKey(apiKey);
  }, [apiKey]);

  useEffect(() => {
    setLocalToken(token);
  }, [token]);

  const handleApply = () => {
    setGlobalApiKey(localApiKey.trim());
    setGlobalToken(localToken.trim());
    
    // Görsel geri bildirim
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
    
    console.log("[ARMOYU] API Ayarları Güncellendi:", { 
      apiKey: localApiKey.trim() ? "OK" : "Empty", 
      token: localToken.trim() ? "OK" : "Empty" 
    });
  };

  const handleReset = () => {
    const defaultKey = 'armoyu_showcase_key';
    setLocalApiKey(defaultKey);
    setLocalToken('');
    setGlobalApiKey(defaultKey);
    setGlobalToken('');
  };

  return (
    <div className={`fixed top-16 left-1/2 -translate-x-1/2 z-[900] w-full max-w-7xl px-4 transition-all duration-500 ${isCollapsed ? 'pointer-events-none' : 'pointer-events-auto'}`}>
      {/* Background with Blur */}
      <div className={`w-full bg-white/90 dark:bg-zinc-900/95 backdrop-blur-2xl border border-blue-500/20 dark:border-white/10 px-6 py-2.5 rounded-b-3xl shadow-2xl transition-all duration-500 ${isCollapsed ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'}`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Label */}
          <div className="flex items-center gap-3 shrink-0">
             <div className="bg-blue-600 p-1.5 rounded-xl shadow-lg shadow-blue-600/20">
                <Settings2 className="w-4 h-4 text-white" />
             </div>
             <div>
                <h4 className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] leading-none mb-1">API DEBUGGER</h4>
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter opacity-60">Global Konfigürasyon</p>
             </div>
          </div>

          {/* Inputs Panel */}
          <div className="flex flex-1 items-center gap-3 w-full max-w-3xl">
            <div className="relative flex-1 group">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-blue-500/50 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="password"
                value={localApiKey}
                onChange={(e) => setLocalApiKey(e.target.value)}
                placeholder="API Key..."
                className="w-full bg-zinc-100 dark:bg-black/40 border border-blue-500/10 focus:border-blue-500/50 rounded-2xl pl-10 pr-4 py-2 text-[11px] text-zinc-900 dark:text-white outline-none transition-all font-mono"
              />
            </div>

            <div className="relative flex-1 group">
              <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-500/50 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="password"
                value={localToken}
                onChange={(e) => setLocalToken(e.target.value)}
                placeholder="Token..."
                className="w-full bg-zinc-100 dark:bg-black/40 border border-emerald-500/10 focus:border-emerald-500/50 rounded-2xl pl-10 pr-4 py-2 text-[11px] text-zinc-900 dark:text-white outline-none transition-all font-mono"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleApply}
                className={`min-w-[120px] ${isSaved ? 'bg-emerald-500' : 'bg-blue-600 hover:bg-blue-500'} text-white px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95`}
              >
                {isSaved ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    KAYDEDİLDİ
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    KAYDET
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="p-2.5 hover:bg-zinc-200 dark:hover:bg-white/5 rounded-2xl text-zinc-500 transition-colors"
                title="Sıfırla"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button 
            onClick={() => setIsCollapsed(true)}
            className="p-2.5 hover:bg-red-500/10 text-zinc-400 hover:text-red-500 rounded-2xl transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Re-open Trigger */}
      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-auto bg-blue-600/90 backdrop-blur-md text-white px-6 py-1.5 rounded-b-3xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-4 duration-500 active:scale-95 border-x border-b border-blue-400/30"
        >
          <Settings2 className="w-3.5 h-3.5" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">API DEBUGGER</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
