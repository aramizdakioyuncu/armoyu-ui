import { Group } from '@armoyu/core';
interface GroupHeaderProps {
    group: Group;
    isMember: boolean;
    onJoin?: () => void;
    onLeave?: () => void;
    onReport?: () => void;
}
export declare function GroupHeader({ group, isMember, onJoin, onLeave, onReport }: GroupHeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=GroupHeader.d.ts.map