import React from 'react';
import { RankingWidget } from './widgets/RankingWidget';
import { EconomyWidget } from './widgets/EconomyWidget';
import { LeagueWidget } from './widgets/LeagueWidget';
import { MinecraftWidget } from './widgets/MinecraftWidget';

export function SidebarLeft() {
  return (
    <div className="hidden lg:flex w-[280px] flex-col gap-6 animate-in fade-in slide-in-from-left-8 duration-700">
      <RankingWidget />
      <EconomyWidget />
      <LeagueWidget />
      <MinecraftWidget />
    </div>
  );
}
