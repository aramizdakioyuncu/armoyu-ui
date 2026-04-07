import React from 'react';
export interface SlideItem {
    wallpaper: string;
    content: React.ReactNode;
}
export interface SliderProps {
    slides?: SlideItem[];
    durationTime?: number;
}
export declare function Slider({ slides, durationTime }: SliderProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=Slider.d.ts.map