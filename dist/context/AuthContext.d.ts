import React from 'react';
import { User, Session } from '@armoyu/core';
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
export declare function AuthProvider({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useAuth(): AuthContextType;
export {};
//# sourceMappingURL=AuthContext.d.ts.map