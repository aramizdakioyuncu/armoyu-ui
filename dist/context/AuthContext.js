'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import { Session, armoyu } from '@armoyu/core';
const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
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
                    armoyu.setToken(token);
                    // Request current user profile from real API
                    const me = await armoyu.auth.me();
                    if (me) {
                        setUser(me);
                        setSession(new Session({ user: me, token }));
                        console.log('[AuthContext] Session restored for:', me.username);
                    }
                    else {
                        // Token might be expired or invalid
                        localStorage.removeItem('armoyu_token');
                        armoyu.setToken(null);
                    }
                }
                catch (e) {
                    console.error('[AuthContext] Failed to restore session:', e);
                    localStorage.removeItem('armoyu_token');
                    armoyu.setToken(null);
                }
            }
            setIsLoading(false);
        }
        restoreSession();
    }, []);
    const login = async (username, password) => {
        try {
            // Real API login via core library
            const { user: loggedInUser, session: newSession } = await armoyu.auth.login(username, password);
            setUser(loggedInUser);
            setSession(newSession);
            // Token is automatically stored in localStorage by armoyu.auth.login()
            // but we ensure it matches our expectations
            console.log('[AuthContext] Login successful for:', loggedInUser.username);
            setIsLoginModalOpen(false);
        }
        catch (error) {
            console.error('[AuthContext] Login failed:', error);
            throw error; // Let the component handle the error UI
        }
    };
    const logout = () => {
        armoyu.auth.logout(); // Clears internal state and localStorage
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
            armoyu.setToken(updatedSession.token);
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