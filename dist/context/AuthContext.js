'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import { Session } from '@armoyu/core';
import { useArmoyu } from './ArmoyuContext';
const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
    const { api } = useArmoyu();
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
                    if (me) {
                        setUser(me);
                        setSession(new Session({ user: me, token }));
                        console.log('[AuthContext] Session restored for:', me.username);
                    }
                    else {
                        // Token might be expired or invalid
                        localStorage.removeItem('armoyu_token');
                        api.setToken(null);
                    }
                }
                catch (e) {
                    console.error('[AuthContext] Failed to restore session:', e);
                    localStorage.removeItem('armoyu_token');
                    api.setToken(null);
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
            setUser(loggedInUser);
            setSession(newSession);
            // Store token in localStorage since Core library is now stateless
            if (newSession.token) {
                localStorage.setItem('armoyu_token', newSession.token);
            }
            console.log('[AuthContext] Login successful for:', loggedInUser.username);
            setIsLoginModalOpen(false);
        }
        catch (error) {
            console.error('[AuthContext] Login failed:', error);
            throw error; // Let the component handle the error UI
        }
    };
    const logout = () => {
        api.auth.logout(); // Clears internal state and localStorage
        setUser(null);
        setSession(null);
    };
    const updateUser = (updatedUser) => {
        setUser(updatedUser);
        if (session) {
            setSession(new Session({ ...session, user: updatedUser }));
        }
    };
    const updateSession = (updatedSession) => {
        setSession(updatedSession);
        if (updatedSession.token) {
            api.setToken(updatedSession.token);
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