import React from 'react';
import { RankingWidget } from './RankingWidget';
import { EconomyWidget } from './EconomyWidget';
import { LeagueWidget } from './LeagueWidget';
import { MinecraftWidget } from './MinecraftWidget';

export function SocialSidebar() {
  return (
    <div className="hidden lg:flex w-[280px] flex-col gap-6 animate-in fade-in slide-in-from-left-8 duration-700">
      <RankingWidget />
      <EconomyWidget />
      <LeagueWidget />
      <MinecraftWidget />
    </div>
  );
}
