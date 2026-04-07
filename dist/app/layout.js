import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Inter } from 'next/font/google';
import "../globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { LayoutProvider } from "../context/LayoutContext";
import { AuthProvider } from "../context/AuthContext";
import { SocketProvider } from "../context/SocketContext";
import { CartProvider } from "../context/CartContext";
import { ChatProvider } from "../context/ChatContext";
const inter = Inter({ subsets: ['latin'] });
export const metadata = {
    title: "ARMOYU UI Showcase",
    description: "Visual component gallery for Armoyu UI Library",
};
export default function RootLayout({ children, }) {
    return (_jsxs("html", { lang: "tr", className: "scroll-smooth dark", suppressHydrationWarning: true, children: [_jsx("head", { children: _jsx("script", { dangerouslySetInnerHTML: {
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
                    } }) }), _jsx("body", { className: `${inter.className} bg-armoyu-bg text-armoyu-text min-h-screen flex flex-col antialiased relative transition-colors duration-500`, children: _jsx(ThemeProvider, { children: _jsx(AuthProvider, { children: _jsx(SocketProvider, { children: _jsx(LayoutProvider, { children: _jsx(CartProvider, { children: _jsxs(ChatProvider, { children: [_jsxs("div", { className: "fixed inset-0 pointer-events-none z-[-1]", children: [_jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" }), _jsx("div", { className: "absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" })] }), children] }) }) }) }) }) }) })] }));
}
//# sourceMappingURL=layout.js.map