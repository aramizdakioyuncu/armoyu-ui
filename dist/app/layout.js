import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Inter } from 'next/font/google';
import Script from 'next/script';
import "../globals.css";
import { Providers } from './Providers';
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
                    } }) }), _jsx("body", { className: `${inter.className} bg-armoyu-bg text-armoyu-text min-h-screen flex flex-col antialiased relative transition-colors duration-500`, children: _jsx(Providers, { children: children }) })] }));
}
//# sourceMappingURL=layout.js.map