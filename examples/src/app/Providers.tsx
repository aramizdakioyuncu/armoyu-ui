'use client';

import React, { useState } from 'react';
import { ArmoyuApi } from "@armoyu/core";
import { 
  ArmoyuProvider, 
  ThemeProvider, 
  AuthProvider, 
  SocketProvider, 
  LayoutProvider, 
  CartProvider, 
  ChatProvider,
  ArmoyuUI,
  FloatingChatButton
} from "@armoyu/ui";

import { DevTools } from '@armoyu/ui/components/shared/DevTools';

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [ui] = useState(() => {
    try {
      // Use local proxy to avoid CORS issues in development
      const baseUrl = typeof window !== 'undefined' ? `${window.location.origin}/api/proxy` : '/api/proxy';

      const api = new ArmoyuApi("armoyu_showcase_key", {
        baseUrl: baseUrl,
        debugMode: true
      });

      return new ArmoyuUI(api);
    } catch (e) {
      console.error("[ARMOYU] Initialization Error:", e);
      // Fallback
      return new ArmoyuUI(new ArmoyuApi("fallback", { baseUrl: "" }));
    }
  });

  return (
    <ArmoyuProvider ui={ui}>
      <ThemeProvider>
        <AuthProvider>
          <SocketProvider>
            <LayoutProvider>
              <CartProvider>
                <ChatProvider>
                  {/* Global Background UI */}
                  <div className="fixed inset-0 pointer-events-none z-[-1]">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-armoyu-primary/20 blur-[120px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
                  </div>

                  {/* NEW: Developer API Bar at the very top (below Header) */}
                  <DevTools />
                  <FloatingChatButton />

                  {/* App Content */}
                  {children}
                </ChatProvider>
              </CartProvider>
            </LayoutProvider>
          </SocketProvider>
        </AuthProvider>
      </ThemeProvider>
    </ArmoyuProvider>
  );
}
