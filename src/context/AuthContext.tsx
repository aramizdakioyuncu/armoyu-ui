'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@armoyu/core';
import { useArmoyu } from './ArmoyuContext';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  updateUser: (updatedUser: User) => void;
  updateSession: (updatedSession: Session) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { api, setGlobalToken } = useArmoyu();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    async function restoreSession() {
      // Check local storage for persistent token
      const token = typeof window !== 'undefined' ? localStorage.getItem('armoyu_token') : null;

      if (token) {
        try {
          // Set token in core API client
          api.setToken(token);

          // Request current user profile from real API
          const response = await api.auth.me();

          // VALIDATION: Ensure 'me' call returned a valid user with an ID
          if (response.durum === 1 && response.icerik && response.icerik.id) {
            setUser(response.icerik);
            setSession(new Session({ user: response.icerik, token }));
            console.log('[AuthContext] Session restored for:', response.icerik.username);
          } else {
            // Token might be expired, invalid, or returned a "blank" user
            throw new Error(response.aciklama || 'Geçersiz oturum verisi.');
          }
        } catch (e: any) {
          console.warn('[AuthContext] Session restoration failed:', e.message);
          
          // CRITICAL: If the error is an Auth Error, we MUST clear the token
          if (typeof window !== 'undefined') {
            localStorage.removeItem('armoyu_token');
          }
          api.setToken(null);
          setUser(null);
          setSession(null);
        }
      }

      setIsLoading(false);
    }

    restoreSession();
  }, [api]);

  const login = async (username: string, password: string) => {
    try {
      // Real API login via core library
      const response = await api.auth.login(username, password);

      if (response.durum !== 1 || !response.icerik) {
        throw new Error(response.aciklama || 'Giriş başarısız.');
      }

      const { user: loggedInUser, session: newSession } = response.icerik;

      // DOUBLE CHECK: Ensure the core library returned a user with an ID
      if (!loggedInUser || !loggedInUser.id) {
        throw new Error('Giriş başarısız: Geçersiz kullanıcı verisi.');
      }

      setUser(loggedInUser);
      setSession(newSession);

      // Store token in localStorage and sync with ArmoyuContext
      if (newSession.token) {
        setGlobalToken(newSession.token);
      }

      console.log('[AuthContext] Login successful for:', loggedInUser.username);

      setIsLoginModalOpen(false);
    } catch (error) {
      console.error('[AuthContext] Login failed:', error);
      // Ensure state is cleared on failed login attempt
      setUser(null);
      setSession(null);
      throw error; // Let the component handle the error UI
    }
  };

  const logout = () => {
    api.auth.logout(); // Clears internal state and localStorage
    setGlobalToken('');
    setUser(null);
    setSession(null);
  };

  const updateUser = (updatedUser: User) => {
    if (!updatedUser) return;
    setUser(updatedUser);
    if (session) {
      setSession(new Session({ ...session, user: updatedUser }));
    }
  };

  const updateSession = (updatedSession: Session) => {
    if (!updatedSession) return;
    setSession(updatedSession);
    if (updatedSession.token) {
      setGlobalToken(updatedSession.token);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      login,
      logout,
      isLoading,
      isLoginModalOpen,
      setIsLoginModalOpen,
      updateUser,
      updateSession
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

