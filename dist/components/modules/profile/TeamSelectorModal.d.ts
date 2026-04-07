import { Team } from '@armoyu/core';
interface TeamSelectorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (team: Team | null, zodiac: string) => void;
    initialTeam?: Team | null;
    initialZodiac?: string;
}
export declare function TeamSelectorModal({ isOpen, onClose, onSelect, initialTeam, initialZodiac }: TeamSelectorModalProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=TeamSelectorModal.d.ts.map