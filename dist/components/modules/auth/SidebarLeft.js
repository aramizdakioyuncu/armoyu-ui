import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RankingWidget } from './widgets/RankingWidget';
import { EconomyWidget } from './widgets/EconomyWidget';
import { LeagueWidget } from './widgets/LeagueWidget';
import { MinecraftWidget } from './widgets/MinecraftWidget';
export function SidebarLeft() {
    return (_jsxs("div", { className: "hidden lg:flex w-[280px] flex-col gap-6 animate-in fade-in slide-in-from-left-8 duration-700", children: [_jsx(RankingWidget, {}), _jsx(EconomyWidget, {}), _jsx(LeagueWidget, {}), _jsx(MinecraftWidget, {})] }));
}
//# sourceMappingURL=SidebarLeft.js.map