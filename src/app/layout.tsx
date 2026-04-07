import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import "../globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { LayoutProvider } from "../context/LayoutContext";
import { AuthProvider } from "../context/AuthContext";
import { SocketProvider } from "../context/SocketContext";
import { CartProvider } from "../context/CartContext";
import { ChatProvider } from "../context/ChatContext";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "ARMOYU UI Showcase",
  description: "Visual component gallery for Armoyu UI Library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('armoyu_theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-armoyu-bg text-armoyu-text min-h-screen flex flex-col antialiased relative transition-colors duration-500`}>
        <ThemeProvider>
          <AuthProvider>
            <SocketProvider>
              <LayoutProvider>
                <CartProvider>
                  <ChatProvider>
                    <div className="fixed inset-0 pointer-events-none z-[-1]">
                      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
                      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
                    </div>
                    {children}
                  </ChatProvider>
                </CartProvider>
              </LayoutProvider>
            </SocketProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
