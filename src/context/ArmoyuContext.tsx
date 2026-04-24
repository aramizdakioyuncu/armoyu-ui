'use client';

import React, { createContext, useContext, ReactNode, useState, useCallback, useEffect } from 'react';
import { ArmoyuUI } from '../lib/ArmoyuUI';
import { ArmoyuApi } from '@armoyu/core';

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
  managementPrefix?: string;  // varsayılan: '/yonetim'
  myArticlesPrefix?: string;  // varsayılan: '/yazilarim'
  pollPrefix?: string;        // varsayılan: '/anketler'
  supportPrefix?: string;     // varsayılan: '/destek'
}

interface ArmoyuContextType {
  ui: ArmoyuUI;
  api: ArmoyuApi;
  apiKey: string;
  token: string;
  isMockEnabled: boolean;
  navigation: Required<ArmoyuNavigationConfig>;
  setGlobalApiKey: (key: string) => void;
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
  const [apiKey, setApiKey] = useState('armoyu_showcase_key');
  const [token, setToken] = useState('');
  const [isMockEnabled, setIsMockEnabled] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Sadece istemci tarafında localStorage'dan yükle
  useEffect(() => {
    setIsMounted(true);
    const savedApiKey = localStorage.getItem('armoyu_showcase_apiKey');
    const savedToken = localStorage.getItem('armoyu_token');
    const savedMock = localStorage.getItem('armoyu_use_mock');

    if (savedApiKey) {
      setApiKey(savedApiKey);
      ui.api.setApiKey(savedApiKey);
    }
    if (savedToken) {
      setToken(savedToken);
      ui.api.setToken(savedToken);
    }
    if (savedMock !== null) {
      setIsMockEnabled(savedMock === 'true');
    }
  }, [ui]);

  const setGlobalApiKey = useCallback((key: string) => {
    setApiKey(key);
    ui.api.setApiKey(key);
    localStorage.setItem('armoyu_showcase_apiKey', key);
  }, [ui]);

  const setGlobalToken = useCallback((t: string) => {
    setToken(t);
    ui.api.setToken(t);
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
    profilePrefix: '/oyuncular',
    groupPrefix: '/gruplar',
    forumPrefix: '/forum',
    educationPrefix: '/egitim',
    newsPrefix: '/haberler',
    galleryPrefix: '/galeriler',
    giveawayPrefix: '/cekilisler',
    projectPrefix: '/projeler',
    storePrefix: '/magaza',
    managementPrefix: '/yonetim',
    myArticlesPrefix: '/yazilarim',
    pollPrefix: '/anketler',
    supportPrefix: '/destek',
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
 * Custom hook to access the ArmoyuApi instance.
 */
export function useArmoyu() {
  const context = useContext(ArmoyuContext);
  if (context === undefined) {
    throw new Error('useArmoyu must be used within an ArmoyuProvider');
  }
  return context;
}
