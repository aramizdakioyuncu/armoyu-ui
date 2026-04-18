import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../models/auth/User';
import { Session } from '../models/auth/Session';
import { useArmoyu } from './ArmoyuContext';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  login: (username: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  isRegisterModalOpen: boolean;
  setIsRegisterModalOpen: (open: boolean) => void;
  updateUser: (updatedUser: User) => void;
  updateSession: (updatedSession: Session) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

import { MOCK_SESSION } from '../lib/constants/seedData';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { api, setGlobalToken, apiKey } = useArmoyu();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    async function restoreSession() {
      // Check local storage for persistent token
      const token = typeof window !== 'undefined' ? localStorage.getItem('armoyu_token') : null;
      const useMock = typeof window !== 'undefined' ? localStorage.getItem('armoyu_use_mock') === 'true' : false;

      if (token) {
        try {
          // Set token in core API client
          api.setToken(token);

          // Request current user profile from real API
          const response = await api.auth.me();

          if (response.durum === 1 && response.icerik) {
            const richUser = User.fromAPI(response.icerik);
            setUser(richUser);
            setSession(new Session({ user: richUser, token }));
            console.log('[AuthContext] Session restored for:', richUser.username);
          } else {
            throw new Error(response.aciklama || 'Geçersiz oturum verisi.');
          }
        } catch (e: any) {
          console.warn('[AuthContext] Session restoration failed:', e.message);
          
          if (typeof window !== 'undefined') {
            localStorage.removeItem('armoyu_token');
          }
          api.setToken(null);
          setUser(null);
          setSession(null);
        }
      } else if (useMock || apiKey === 'armoyu_showcase_key') {
        // FALLBACK TO MOCK SESSION FOR SHOWCASE / DEV
        console.log('[AuthContext] Loading Mock Session...');
        setUser(MOCK_SESSION.user);
        setSession(MOCK_SESSION);
      }

      setIsLoading(false);
    }

    restoreSession();
  }, [api, apiKey]);

  const login = async (username: string, password: string) => {
    try {
      // Real API login via core library
      const response = await api.auth.login(username, password);

      if (response.durum !== 1 || !response.icerik) {
        throw new Error(response.aciklama || 'Giriş başarısız.');
      }

      const { user: userResponse, token: sessionToken } = response.icerik;

      const richUser = User.fromAPI(userResponse);
      const newSession = new Session({ user: richUser, token: sessionToken });

      setUser(richUser);
      setSession(newSession);

      // Store token in localStorage and sync with ArmoyuContext
      if (sessionToken) {
        setGlobalToken(sessionToken);
      }

      console.log('[AuthContext] Login successful for:', richUser.username);

      setIsLoginModalOpen(false);
    } catch (error) {
      console.error('[AuthContext] Login failed:', error);
      setUser(null);
      setSession(null);
      throw error; 
    }
  };

  const register = async (data: any) => {
    try {
      // Real API registration via core library
      const response = await api.auth.register({
        username: data.username,
        password: data.password,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName
      });

      if (response.durum !== 1) {
        throw new Error(response.aciklama || 'Kayıt başarısız.');
      }

      // Automatically login after successful registration
      await login(data.username, data.password);
      setIsRegisterModalOpen(false);
    } catch (error) {
       console.error('[AuthContext] Registration failed:', error);
       throw error;
    }
  };

  const logout = () => {
    api.auth.logout(); 
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
      register,
      logout,
      isLoading,
      isLoginModalOpen,
      setIsLoginModalOpen,
      isRegisterModalOpen,
      setIsRegisterModalOpen,
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

