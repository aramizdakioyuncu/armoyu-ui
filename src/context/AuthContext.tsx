'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@armoyu/core';

import { userList, MOCK_SESSION } from '../lib/constants/seedData';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  login: (userData: User) => void;
  logout: () => void;
  isLoading: boolean;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  updateUser: (updatedUser: User) => void;
  updateSession: (updatedSession: Session) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
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
        const foundUser = userList.find((u: any) => u.username === username);
        
        if (foundUser) {
          setUser(foundUser);
          // If it's Berkay, use the mock session with notifications
          if (username === 'berkaytikenoglu') {
            setSession(MOCK_SESSION);
          } else {
            setSession(new Session({ user: foundUser, token: 'mock-token' }));
          }
        }
      } catch (e) {
        console.error('Failed to restore session', e);
        localStorage.removeItem('armoyu_user');
      }
    }
    
    // Explicitly set loading to false AFTER the check
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    
    // Handle session initialization
    if (userData.username === 'berkaytikenoglu') {
      setSession(MOCK_SESSION);
    } else {
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

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    if (session) {
      setSession(new Session({ ...session, user: updatedUser }));
    }
  };

  const updateSession = (updatedSession: Session) => {
    setSession(updatedSession);
  };

  return (
    <AuthContext.Provider value={{ user, session, login, logout, isLoading, isLoginModalOpen, setIsLoginModalOpen, updateUser, updateSession }}>
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

