'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SocketEvent } from '@armoyu/core';
import { useArmoyu } from './ArmoyuContext';


interface SocketContextType {
  isConnected: boolean;
  emit: (event: SocketEvent, data: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on: (event: SocketEvent, callback: (data: any) => void) => () => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { api } = useArmoyu();
  const [isConnected, setIsConnected] = useState(api.socket.isConnected);

  useEffect(() => {
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    const offConnect = api.socket.on('connect', handleConnect);
    const offDisconnect = api.socket.on('disconnect', handleDisconnect);

    return () => {
      offConnect();
      offDisconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ 
      isConnected, 
      emit: api.socket.emit.bind(api.socket), 
      on: api.socket.on.bind(api.socket) 
    }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}

