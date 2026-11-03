import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../models/auth/User';
import { Session } from '../models/auth/Session';
import { useArmoyu } from './ArmoyuContext';
import { clearCache, readCache, writeCache } from '../lib/cache';

const REFRESH_TOKEN_KEY = 'armoyu_refresh_token';

// Önbelleğe yalnızca ekranda herkese görünen alanlar yazılır; e-posta, telefon gibi kişisel veriler yazılmaz
const PUBLIC_PROFILE_FIELDS = ['id', 'username', 'displayName', 'avatar', 'banner', 'wallpaper', 'level', 'role', 'rank'];
const publicProfile = (user: Record<string, any>) =>
  Object.fromEntries(PUBLIC_PROFILE_FIELDS.filter((key) => user[key] !== undefined).map((key) => [key, user[key]]));

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
  const { api, setGlobalToken, apiKey, isMockEnabled } = useArmoyu();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    // shortcut: yayınlanan @armoyu/core tiplerinde yok; yeni sürüm çıkınca cast kalkacak
    const core = api as any;
    if (core.version !== 'current') return;

    core.setRefreshToken(localStorage.getItem(REFRESH_TOKEN_KEY));
    core.setSessionHandlers({
      onRefreshed: (accessToken: string, refreshToken: string) => {
        setGlobalToken(accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        setSession((current) => current && new Session({ ...current, token: accessToken }));
      },
      onExpired: () => {
        clearCache();
        setGlobalToken('');
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        setUser(null);
        setSession(null);
        setIsLoginModalOpen(true);
      },
    });

    // Başka sekme yenilediğinde ya da çıkış yaptığında bu sekme eski token'la kalmasın
    const syncTabs = (event: StorageEvent) => {
      if (event.key === REFRESH_TOKEN_KEY) core.setRefreshToken(event.newValue);
      if (event.key !== 'armoyu_token') return;
      core.setAuthToken(event.newValue);
      if (!event.newValue) {
        clearCache();
        setUser(null);
        setSession(null);
      }
    };
    window.addEventListener('storage', syncTabs);
    return () => {
      window.removeEventListener('storage', syncTabs);
      core.setSessionHandlers({});
    };
  }, [api, setGlobalToken]);

  useEffect(() => {
    async function restoreSession() {
      // Check local storage for persistent token
      const token = typeof window !== 'undefined' ? localStorage.getItem('armoyu_token') : null;

      if (token) {
        try {
          // Set token in core API client
          api.setAuthToken(token);

          // Son bilinen kullanıcı anında gösterilir; aşağıda API ile tazelenir
          const cached = readCache<any>('me');
          if (cached) {
            const cachedUser = User.fromAPI(cached);
            setUser(cachedUser);
            setSession(new Session({ user: cachedUser, token }));
            setIsLoading(false);
          }

          // Request current user profile from real API
          const response = await api.auth.me();

          if (response.durum === 1 && response.icerik) {
            writeCache('me', publicProfile(response.icerik));
            const richUser = User.fromAPI(response.icerik);
            setUser(richUser);
            setSession(new Session({ user: richUser, token }));
            console.log('[AuthContext] Session restored for:', richUser.username);
          } else {
            throw new Error(response.aciklama || 'Geçersiz oturum verisi.');
          }
        } catch (e: any) {
          // Ağ ya da sunucu hatasında oturum silinmez; geçersiz token'ı core yenilemeyi deneyip onExpired ile kapatır
          console.warn('[AuthContext] Session restoration failed:', e.message);

          // Eski API'de yenileme akışı yok; oturum burada kapanır
          if ((api as any).version !== 'current') {
            localStorage.removeItem('armoyu_token');
            localStorage.removeItem(REFRESH_TOKEN_KEY);
            clearCache();
            api.setAuthToken(null);
            setUser(null);
            setSession(null);
          }
        }
      } else if (isMockEnabled) {
        // FALLBACK TO MOCK SESSION ONLY IF EXPLICITLY ENABLED
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
      console.log('[AuthContext] API Cevabı:', response);

      if (Number(response.durum) !== 1 || !response.icerik) {
        console.error('[AuthContext] Giriş başarısız, cevap durum 1 değil veya içerik yok!');
        throw new Error(response.aciklama || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
      }

      const { user: userResponse, token: sessionToken, refreshToken } = response.icerik as any;

      const richUser = User.fromAPI(userResponse);

      if (!richUser.id || Number(richUser.id) === 0) {
        console.error('[AuthContext] Geçersiz kullanıcı verisi (ID 0):', richUser);
        throw new Error('Kullanıcı adı veya şifre hatalı! (Eşleşme sağlanamadı)');
      }

      // Başka hesabın önbelleği kalmasın
      clearCache();
      // Girişten sonraki ilk yenilemede de ad ve avatar beklemeden görünsün
      writeCache('me', publicProfile(userResponse));
      const newSession = new Session({ user: richUser, token: sessionToken });

      setUser(richUser);
      setSession(newSession);

      // Store token in localStorage and sync with ArmoyuContext
      if (sessionToken) {
        setGlobalToken(sessionToken);
      }
      if (refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
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
        lastName: data.lastName,
        inviteCode: data.inviteCode
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
    clearCache();
    setGlobalToken('');
    localStorage.removeItem(REFRESH_TOKEN_KEY);
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

