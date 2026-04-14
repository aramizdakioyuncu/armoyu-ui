'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useLayout } from '../../context/LayoutContext';
export function MainLayoutWrapper({ children, className = '' }) {
    const { pageWidth } = useLayout();
    return (_jsx("main", { className: `flex-grow w-full overflow-x-hidden pt-8 px-4 md:px-8 mx-auto z-10 transition-all duration-700 ${pageWidth} ${className}`, children: children }));
}
//# sourceMappingURL=MainLayoutWrapper.js.map