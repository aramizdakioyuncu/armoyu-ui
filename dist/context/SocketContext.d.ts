import React from 'react';
import { SocketEvent } from '@armoyu/core';
interface SocketContextType {
    isConnected: boolean;
    emit: (event: SocketEvent, data: any) => void;
    on: (event: SocketEvent, callback: (data: any) => void) => () => void;
}
export declare function SocketProvider({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useSocket(): SocketContextType;
export {};
//# sourceMappingURL=SocketContext.d.ts.map