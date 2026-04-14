'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import { Session } from '@armoyu/core';
import { useArmoyu } from './ArmoyuContext';
const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
    const { api, setGlobalToken } = useArmoyu();
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    useEffect(() => {
        async function restoreSession() {
            // Check local storage for persistent token
            const token = localStorage.getItem('armoyu_token');
            if (token) {
                try {
                    // Set token in core API client
                    api.setToken(token);
                    // Request current user profile from real API
                    const me = await api.auth.me();
                    // VALIDATION: Ensure 'me' call returned a valid user with an ID
                    if (me && me.id) {
                        setUser(me);
                        setSession(new Session({ user: me, token }));
                        console.log('[AuthContext] Session restored for:', me.username);
                    }
                    else {
                        // Token might be expired, invalid, or returned a "blank" user
                        console.warn('[AuthContext] Invalid session detected during restoration, clearing...');
                        localStorage.removeItem('armoyu_token');
                        api.setToken(null);
                        setUser(null);
                        setSession(null);
                    }
                }
                catch (e) {
                    console.error('[AuthContext] Failed to restore session:', e);
                    localStorage.removeItem('armoyu_token');
                    api.setToken(null);
                    setUser(null);
                    setSession(null);
                }
            }
            setIsLoading(false);
        }
        restoreSession();
    }, []);
    const login = async (username, password) => {
        try {
            // Real API login via core library
            const { user: loggedInUser, session: newSession } = await api.auth.login(username, password);
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
        }
        catch (error) {
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
    const updateUser = (updatedUser) => {
        if (!updatedUser)
            return;
        setUser(updatedUser);
        if (session) {
            setSession(new Session({ ...session, user: updatedUser }));
        }
    };
    const updateSession = (updatedSession) => {
        if (!updatedSession)
            return;
        setSession(updatedSession);
        if (updatedSession.token) {
            setGlobalToken(updatedSession.token);
        }
    };
    return (_jsx(AuthContext.Provider, { value: {
            user,
            session,
            login,
            logout,
            isLoading,
            isLoginModalOpen,
            setIsLoginModalOpen,
            updateUser,
            updateSession
        }, children: children }));
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
//# sourceMappingURL=AuthContext.js.map