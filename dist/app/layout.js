import { jsx as _jsx } from "react/jsx-runtime";
import "../globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { LayoutProvider } from "../context/LayoutContext";
import { AuthProvider } from "../context/AuthContext";
import { SocketProvider } from "../context/SocketContext";
import { CartProvider } from "../context/CartContext";
import { ChatProvider } from "../context/ChatContext";
export const metadata = {
    title: "ARMOYU UI Showcase",
    description: "Visual component gallery for Armoyu UI Library",
};
export default function RootLayout({ children, }) {
    return (_jsx("html", { lang: "en", className: "dark", children: _jsx("body", { className: "bg-armoyu-bg text-armoyu-text antialiased", children: _jsx(ThemeProvider, { children: _jsx(AuthProvider, { children: _jsx(SocketProvider, { children: _jsx(LayoutProvider, { children: _jsx(CartProvider, { children: _jsx(ChatProvider, { children: children }) }) }) }) }) }) }) }));
}
//# sourceMappingURL=layout.js.map