import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Inter } from 'next/font/google';
import Script from 'next/script';
import "../globals.css";
import { Providers } from './Providers';
import { ShowcaseNavigation } from '../components/showcase/ShowcaseNavigation';
import React from 'react';
const inter = Inter({ subsets: ['latin'] });
export const metadata = {
    title: "ARMOYU UI Showcase",
    description: "Visual component gallery for Armoyu UI Library",
};
export default function RootLayout({ children, }) {
    return (_jsxs("html", { lang: "tr", className: "scroll-smooth dark", suppressHydrationWarning: true, children: [_jsx("head", { children: _jsx(Script, { id: "theme-initializer", strategy: "beforeInteractive", dangerouslySetInnerHTML: {
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
                    } }) }), _jsx("body", { className: `${inter.className} bg-armoyu-bg text-armoyu-text min-h-screen flex flex-col antialiased relative transition-colors duration-500`, children: _jsxs(Providers, { children: [_jsx(React.Suspense, { fallback: _jsx("div", { className: "h-16 bg-black/20 backdrop-blur-2xl border-b border-white/5" }), children: _jsx(ShowcaseNavigation, {}) }), children, _jsx("footer", { className: "py-8 border-t border-white/5 text-center mt-auto", children: _jsx("p", { className: "text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.4em] opacity-30 italic", children: "\u00A9 2024 ARMOYU DEVELOPER EXPERIENCE \u2022 VITRIN MODU" }) })] }) })] }));
}
//# sourceMappingURL=layout.js.map