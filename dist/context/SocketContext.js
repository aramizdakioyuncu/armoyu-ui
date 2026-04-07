'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import { socketService } from '@armoyu/core';
const SocketContext = createContext(undefined);
export function SocketProvider({ children }) {
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
    return (_jsx(SocketContext.Provider, { value: {
            isConnected,
            emit: socketService.emit.bind(socketService),
            on: socketService.on.bind(socketService)
        }, children: children }));
}
export function useSocket() {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
}
//# sourceMappingURL=SocketContext.js.map