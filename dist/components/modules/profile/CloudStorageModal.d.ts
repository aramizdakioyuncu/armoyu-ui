import React from 'react';
interface CloudStorageModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectMedia?: (url: string, type: 'image' | 'video') => void;
}
export declare function CloudStorageModal({ isOpen, onClose, onSelectMedia }: CloudStorageModalProps): React.ReactPortal | null;
export {};
//# sourceMappingURL=CloudStorageModal.d.ts.map