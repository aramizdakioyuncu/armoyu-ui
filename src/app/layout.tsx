import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import "../globals.css";
import { Providers } from './Providers';
import { ShowcaseNavigation } from '../components/showcase/ShowcaseNavigation';
import React from 'react';

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
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
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
        <Providers>
          <React.Suspense fallback={<div className="h-16 bg-black/20 backdrop-blur-2xl border-b border-white/5" />}>
            <ShowcaseNavigation />
          </React.Suspense>
          {children}
          <footer className="py-8 border-t border-armoyu-header-border text-center mt-auto">
             <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.4em] opacity-30 italic">
                © 2024 ARMOYU DEVELOPER EXPERIENCE • VITRIN MODU
             </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
