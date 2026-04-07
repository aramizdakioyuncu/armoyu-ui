'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { socketService, SocketEvent } from '@armoyu/core';


interface SocketContextType {
  isConnected: boolean;
  emit: (event: SocketEvent, data: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on: (event: SocketEvent, callback: (data: any) => void) => () => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(socketService.isConnected);

  useEffect(() => {
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    const offConnect = socketService.on('connect', handleConnect);
    const offDisconnect = socketService.on('disconnect', handleDisconnect);

    return () => {
      offConnect();
      offDisconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ 
      isConnected, 
      emit: socketService.emit.bind(socketService), 
      on: socketService.on.bind(socketService) 
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

