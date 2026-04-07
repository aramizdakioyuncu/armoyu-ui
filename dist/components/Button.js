import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
const Button = React.forwardRef(({ className = '', variant = 'primary', isLoading, children, ...props }, ref) => {
    // Core aesthetic premium styling (Glassmorphism & Modern UI)
    const baseStyles = "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 cursor-pointer";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] border border-transparent",
        secondary: "bg-white/5 text-white hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]",
        danger: "bg-red-500/80 text-white hover:bg-red-600 border border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]",
        ghost: "hover:bg-white/10 hover:text-white text-gray-300"
    };
    return (_jsxs("button", { ref: ref, className: `${baseStyles} ${variants[variant]} ${className}`, disabled: isLoading || props.disabled, ...props, children: [isLoading ? (_jsxs("span", { className: "mr-2 relative flex h-4 w-4", children: [_jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" }), _jsx("span", { className: "relative inline-flex rounded-full h-4 w-4 bg-white/50 border-2 border-white border-t-transparent animate-spin" })] })) : null, children] }));
});
Button.displayName = "Button";
export { Button };
//# sourceMappingURL=Button.js.map