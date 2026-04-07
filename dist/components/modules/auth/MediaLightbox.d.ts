import React from 'react';
export interface PostMedia {
    type: 'image' | 'video';
    url: string;
}
interface MediaLightboxProps {
    isOpen: boolean;
    onClose: () => void;
    media: PostMedia[];
    initialIndex?: number;
}
export declare function MediaLightbox({ isOpen, onClose, media, initialIndex }: MediaLightboxProps): React.ReactPortal | null;
export {};
//# sourceMappingURL=MediaLightbox.d.ts.map