'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import { useArmoyu } from './ArmoyuContext';
const SocketContext = createContext(undefined);
export function SocketProvider({ children }) {
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
    return (_jsx(SocketContext.Provider, { value: {
            isConnected,
            emit: api.socket.emit.bind(api.socket),
            on: api.socket.on.bind(api.socket)
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