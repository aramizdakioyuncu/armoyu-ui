'use client';

import React, { useState, useEffect } from 'react';
import { useArmoyu } from '../../context/ArmoyuContext';
import { Key, ShieldCheck, Settings2, X, RotateCcw, Save, Server, Database, CheckCircle2, FlaskConical } from 'lucide-react';

export function DevTools() {
  const { apiKey, token, isMockEnabled, setGlobalApiKey, setGlobalToken, setMockEnabled } = useArmoyu();
  const [isOpen, setIsOpen] = useState(false);
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [localToken, setLocalToken] = useState(token);
  const [isSaved, setIsSaved] = useState(false);

  // Global state değiştiğinde yerel state'i güncelle
  useEffect(() => {
    setLocalApiKey(apiKey);
    setLocalToken(token);
  }, [apiKey, token]);

  const handleApply = () => {
    setGlobalApiKey(localApiKey.trim());
    setGlobalToken(localToken.trim());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleReset = () => {
    const defaultKey = 'armoyu_showcase_key';
    setLocalApiKey(defaultKey);
    setLocalToken('');
    setGlobalApiKey(defaultKey);
    setGlobalToken('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-4">
      
      {/* Settings Panel */}
      {isOpen && (
        <div className="w-[320px] bg-white/80 dark:bg-zinc-900/90 backdrop-blur-3xl border border-armoyu-primary/20 rounded-[32px] shadow-2xl p-6 animate-in slide-in-from-bottom-8 fade-in duration-500">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-armoyu-primary flex items-center justify-center shadow-lg shadow-armoyu-primary/20">
                <Settings2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-[10px] font-black text-armoyu-primary dark:text-armoyu-primary uppercase tracking-widest leading-none">DEVTOOLS</h4>
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter opacity-60">Sistem Denetimi</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Mock Toggle */}
            <div className="flex items-center justify-between p-3 bg-armoyu-primary/5 border border-armoyu-primary/10 rounded-2xl group transition-all">
              <div className="flex items-center gap-3">
                {isMockEnabled ? <Database className="w-4 h-4 text-armoyu-primary" /> : <Server className="w-4 h-4 text-emerald-500" />}
                <span className="text-[10px] font-black uppercase tracking-tight text-gray-700 dark:text-gray-300">
                  {isMockEnabled ? 'MOCK VERİ AKTİF' : 'CANLI API AKTİF'}
                </span>
              </div>
              <button 
                onClick={() => setMockEnabled(!isMockEnabled)}
                className={`w-10 h-5 rounded-full transition-all relative ${isMockEnabled ? 'bg-armoyu-primary' : 'bg-emerald-500'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isMockEnabled ? 'right-1' : 'left-1'}`} />
              </button>
            </div>

            {/* Inputs */}
            <div className="space-y-2">
               <div className="relative group">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-armoyu-primary/40 group-focus-within:text-armoyu-primary transition-colors" />
                  <input
                    type="password"
                    value={localApiKey}
                    onChange={(e) => setLocalApiKey(e.target.value)}
                    placeholder="API Key..."
                    className="w-full bg-gray-50 dark:bg-black/40 border border-armoyu-primary/5 focus:border-armoyu-primary/40 rounded-xl pl-10 pr-4 py-2.5 text-[10px] outline-none transition-all font-mono"
                  />
               </div>
               <div className="relative group">
                  <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-500/40 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    type="password"
                    value={localToken}
                    onChange={(e) => setLocalToken(e.target.value)}
                    placeholder="Auth Token..."
                    className="w-full bg-gray-50 dark:bg-black/40 border border-emerald-500/5 focus:border-emerald-500/40 rounded-xl pl-10 pr-4 py-2.5 text-[10px] outline-none transition-all font-mono"
                  />
               </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={handleApply}
                  className={`flex-1 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 text-white ${isSaved ? 'bg-emerald-500' : 'bg-armoyu-primary hover:bg-armoyu-primary shadow-lg shadow-armoyu-primary/20'}`}
                >
                  {isSaved ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                  {isSaved ? 'KAYDEDİLDİ' : 'UYGULA'}
                </button>
                <button
                  onClick={handleReset}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-white/5 rounded-xl text-gray-500 hover:text-armoyu-primary transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
            </div>
          </div>
        </div>
      )}

      {/* Trigger FAB */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 active:scale-90 group relative ${isOpen ? 'bg-zinc-800 rotate-90 scale-0' : 'bg-armoyu-primary scale-100'}`}
      >
        <div className="absolute inset-0 rounded-full bg-armoyu-primary animate-ping opacity-20 group-hover:opacity-40 transition-opacity" />
        <FlaskConical className="w-6 h-6 text-white" />
        
        {/* Active Mode Badge */}
        {!isOpen && (
          <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-zinc-900 flex items-center justify-center shadow-lg ${isMockEnabled ? 'bg-armoyu-primary' : 'bg-emerald-500'}`}>
            {isMockEnabled ? <Database className="w-2.5 h-2.5 text-white" /> : <Server className="w-2.5 h-2.5 text-white" />}
          </div>
        )}
      </button>

    </div>
  );
}
