'use client';

import React, { createContext, useContext, ReactNode, useState, useCallback, useEffect } from 'react';
import { ArmoyuUI } from '../lib/ArmoyuUI';
import { ARMOYUCore } from '@armoyu/core';

export interface ArmoyuNavigationConfig {
  profilePrefix?: string;    // varsayılan: '/oyuncular'
  groupPrefix?: string;      // varsayılan: '/gruplar'
  forumPrefix?: string;      // varsayılan: '/forum'
  educationPrefix?: string;  // varsayılan: '/egitim'
  newsPrefix?: string;       // varsayılan: '/haberler'
  galleryPrefix?: string;    // varsayılan: '/galeriler'
  giveawayPrefix?: string;   // varsayılan: '/cekilisler'
  projectPrefix?: string;     // varsayılan: '/projeler' 
  storePrefix?: string;       // varsayılan: '/magaza'
  managementPrefix?: string;  // varsayılan: '/yonetim-paneli'
  myArticlesPrefix?: string;  // varsayılan: '/yazilarim'
  pollPrefix?: string;        // varsayılan: '/anketler'
  supportPrefix?: string;     // varsayılan: '/destek'
}

interface ArmoyuContextType {
  ui: ArmoyuUI;
  api: ARMOYUCore;
  apiKey: string | null;
  token: string;
  isMockEnabled: boolean;
  navigation: Required<ArmoyuNavigationConfig>;
  setGlobalApiKey: (key: string | null) => void;
  setGlobalToken: (token: string) => void;
  setMockEnabled: (enabled: boolean) => void;
}

const ArmoyuContext = createContext<ArmoyuContextType | undefined>(undefined);

export interface ArmoyuProviderProps {
  children: ReactNode;
  ui: ArmoyuUI;
  navigation?: ArmoyuNavigationConfig;
}

/**
 * ArmoyuProvider provides the global ArmoyuUI instance to all UI components.
 * This is required for any component that interacts with the ARMOYU backend.
 */
export function ArmoyuProvider({ children, ui, navigation }: ArmoyuProviderProps) {
  const [apiKey, setApiKey] = useState(() => {
    const current = ui.api.getApiKey();
    return current === undefined ? 'armoyu_showcase_key' : current;
  });
  const [token, setAuthToken] = useState((ui.api as any).token || '');
  const [isMockEnabled, setIsMockEnabled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Sadece istemci tarafında localStorage'dan yükle
  useEffect(() => {
    setIsMounted(true);
    const savedApiKey = localStorage.getItem('armoyu_showcase_apiKey');
    const savedToken = localStorage.getItem('armoyu_token');
    const savedMock = localStorage.getItem('armoyu_use_mock');

    if (savedApiKey && ui.api.getApiKey() !== null) {
      setApiKey(savedApiKey);
      ui.api.setApiKey(savedApiKey);
    }
    if (savedToken) {
      setAuthToken(savedToken);
      ui.api.setAuthToken(savedToken);
    }
    
    // Force mock mode to false if we have a real API key (anything other than showcase)
    if ((ui.api as any).apiKey !== 'armoyu_showcase_key') {
       setIsMockEnabled(false);
       localStorage.setItem('armoyu_use_mock', 'false');
    } else if (savedMock !== null) {
       setIsMockEnabled(savedMock === 'true');
    }
  }, [ui]);

  const setGlobalApiKey = useCallback((key: string | null) => {
    setApiKey(key);
    ui.api.setApiKey(key);
    if (key === null) {
      localStorage.removeItem('armoyu_showcase_apiKey');
    } else {
      localStorage.setItem('armoyu_showcase_apiKey', key);
    }
  }, [ui]);

  const setGlobalToken = useCallback((t: string) => {
    setAuthToken(t);
    ui.api.setAuthToken(t);
    localStorage.setItem('armoyu_token', t);
  }, [ui]);

  const setMockEnabled = useCallback((enabled: boolean) => {
    setIsMockEnabled(enabled);
    localStorage.setItem('armoyu_use_mock', enabled ? 'true' : 'false');
  }, []);

  if (!isMounted || !ui) {
    return null;
  }

  const defaultNavigation: Required<ArmoyuNavigationConfig> = {
    profilePrefix: '/players',
    groupPrefix: '/groups',
    forumPrefix: '/forum',
    educationPrefix: '/education',
    newsPrefix: '/news',
    galleryPrefix: '/galleries',
    giveawayPrefix: '/giveaways',
    projectPrefix: '/projects',
    storePrefix: '/store',
    managementPrefix: '/management-panel',
    myArticlesPrefix: '/my-articles',
    pollPrefix: '/polls',
    supportPrefix: '/support',
    ...navigation
  };

  return (
    <ArmoyuContext.Provider value={{
      ui,
      api: ui.api,
      apiKey,
      token,
      isMockEnabled,
      navigation: defaultNavigation,
      setGlobalApiKey,
      setGlobalToken,
      setMockEnabled
    }}>
      {children}
    </ArmoyuContext.Provider>
  );
}

/**
 * Custom hook to access the ARMOYUCore instance.
 */
export function useArmoyu() {
  const context = useContext(ArmoyuContext);
  if (context === undefined) {
    throw new Error('useArmoyu must be used within an ArmoyuProvider');
  }
  return context;
}
