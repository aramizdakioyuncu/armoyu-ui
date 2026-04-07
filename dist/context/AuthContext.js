'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import { Session } from '@armoyu/core';
import { userList, MOCK_SESSION } from '../lib/constants/seedData';
const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    useEffect(() => {
        // Check local storage for persistent login
        const savedUserStr = localStorage.getItem('armoyu_user');
        if (savedUserStr) {
            try {
                const savedData = JSON.parse(savedUserStr);
                const username = savedData.username;
                // Find user in seedData to maintain all object references
                const foundUser = userList.find((u) => u.username === username);
                if (foundUser) {
                    setUser(foundUser);
                    // If it's Berkay, use the mock session with notifications
                    if (username === 'berkaytikenoglu') {
                        setSession(MOCK_SESSION);
                    }
                    else {
                        setSession(new Session({ user: foundUser, token: 'mock-token' }));
                    }
                }
            }
            catch (e) {
                console.error('Failed to restore session', e);
                localStorage.removeItem('armoyu_user');
            }
        }
        // Explicitly set loading to false AFTER the check
        setIsLoading(false);
    }, []);
    const login = (userData) => {
        setUser(userData);
        // Handle session initialization
        if (userData.username === 'berkaytikenoglu') {
            setSession(MOCK_SESSION);
        }
        else {
            setSession(new Session({ user: userData, token: 'mock-token' }));
        }
        localStorage.setItem('armoyu_user', JSON.stringify({ username: userData.username }));
        setIsLoginModalOpen(false); // Close modal on success
    };
    const logout = () => {
        setUser(null);
        setSession(null);
        localStorage.removeItem('armoyu_user');
    };
    const updateUser = (updatedUser) => {
        setUser(updatedUser);
        if (session) {
            setSession(new Session({ ...session, user: updatedUser }));
        }
    };
    const updateSession = (updatedSession) => {
        setSession(updatedSession);
    };
    return (_jsx(AuthContext.Provider, { value: { user, session, login, logout, isLoading, isLoginModalOpen, setIsLoginModalOpen, updateUser, updateSession }, children: children }));
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
//# sourceMappingURL=AuthContext.js.map