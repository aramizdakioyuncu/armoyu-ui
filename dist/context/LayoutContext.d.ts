import { ReactNode } from 'react';
type LayoutContextType = {
    pageWidth: string;
    setPageWidth: (width: string) => void;
};
export declare function LayoutProvider({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useLayout(): LayoutContextType;
export {};
//# sourceMappingURL=LayoutContext.d.ts.map