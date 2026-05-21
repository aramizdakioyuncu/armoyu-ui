'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageWidth } from '../../shared/PageWidth';
import { ArmoyuEvent } from '../../../models/community/ArmoyuEvent';
import {
   ChevronLeft,
   Calendar,
   MapPin,
   Users,
   Trophy,
   ShieldCheck,
   Gamepad2,
   Share2,
   Clock,
   AlertCircle,
   LayoutGrid,
   List,
   Award,
   Zap,
   Flame,
   Sword,
   Coins,
   Crown,
   ShieldAlert,
   Compass,
   ArrowUp,
   ArrowDown
} from 'lucide-react';
import { useArmoyu } from '../../../context/ArmoyuContext';
import { eventList } from '../../../lib/constants/stationData';
import { ArmoyuEvent as ArmoyuEventCore } from '@armoyu/core';

// TURNUVA MOCK DATA
const tournamentTeams = [
   { id: 1, name: 'Armada Esports', logo: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=80&h=80&q=80', played: 5, won: 4, drawn: 1, lost: 0, gf: 14, ga: 4, gd: 10, points: 13 },
   { id: 2, name: 'Göztepe Espor', logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&h=80&q=80', played: 5, won: 3, drawn: 1, lost: 1, gf: 11, ga: 6, gd: 5, points: 10 },
   { id: 3, name: 'Anatolia Warriors', logo: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=80&h=80&q=80', played: 5, won: 2, drawn: 2, lost: 1, gf: 9, ga: 7, gd: 2, points: 8 },
   { id: 4, name: 'Kadıköy United', logo: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=80&h=80&q=80', played: 5, won: 2, drawn: 0, lost: 3, gf: 8, ga: 10, gd: -2, points: 6 },
   { id: 5, name: 'Beşiktaş Cyber', logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&h=80&q=80', played: 5, won: 1, drawn: 1, lost: 3, gf: 6, ga: 11, gd: -5, points: 4 },
   { id: 6, name: 'Trakya FC', logo: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=80&h=80&q=80', played: 5, won: 0, drawn: 1, lost: 4, gf: 3, ga: 13, gd: -10, points: 1 }
];

const tournamentPlayers = [
   { id: 1, name: 'Berkay Tiken', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80', team: 'Armada Esports', teamLogo: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=80&h=80&q=80', goals: 8, assists: 4, yellowCards: 1, redCards: 0 },
   { id: 2, name: 'Efe Çelik', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&h=80&q=80', team: 'Göztepe Espor', teamLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&h=80&q=80', goals: 6, assists: 2, yellowCards: 2, redCards: 0 },
   { id: 3, name: 'Yiğit Yılmaz', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80', team: 'Anatolia Warriors', teamLogo: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=80&h=80&q=80', goals: 4, assists: 5, yellowCards: 0, redCards: 1 },
   { id: 4, name: 'Can Demir', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80', team: 'Armada Esports', teamLogo: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=80&h=80&q=80', goals: 3, assists: 6, yellowCards: 1, redCards: 0 },
   { id: 5, name: 'Mert Aksoy', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=80&h=80&q=80', team: 'Kadıköy United', teamLogo: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=80&h=80&q=80', goals: 5, assists: 1, yellowCards: 3, redCards: 0 },
   { id: 6, name: 'Burak Kaya', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80', team: 'Beşiktaş Cyber', teamLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&h=80&q=80', goals: 4, assists: 1, yellowCards: 1, redCards: 0 },
   { id: 7, name: 'Emre Şahin', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=80&h=80&q=80', team: 'Anatolia Warriors', teamLogo: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=80&h=80&q=80', goals: 2, assists: 3, yellowCards: 2, redCards: 0 },
   { id: 8, name: 'Kaan Polat', avatar: 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&w=80&h=80&q=80', team: 'Trakya FC', teamLogo: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=80&h=80&q=80', goals: 3, assists: 0, yellowCards: 0, redCards: 2 },
   { id: 9, name: 'Arda Bulut', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&h=80&q=80', team: 'Beşiktaş Cyber', teamLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&h=80&q=80', goals: 1, assists: 4, yellowCards: 0, redCards: 0 },
   { id: 10, name: 'Volkan Karaca', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=80&h=80&q=80', team: 'Kadıköy United', teamLogo: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=80&h=80&q=80', goals: 2, assists: 2, yellowCards: 1, redCards: 1 }
];

const tournamentMatches = [
   // Hafta 1
   { id: 1, week: 1, homeTeam: 'Armada Esports', homeLogo: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=80&h=80&q=80', awayTeam: 'Göztepe Espor', awayLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&h=80&q=80', homeScore: 3, awayScore: 1, status: 'played', date: '21.05.2026 20:00' },
   { id: 2, week: 1, homeTeam: 'Anatolia Warriors', homeLogo: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=80&h=80&q=80', awayTeam: 'Kadıköy United', awayLogo: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=80&h=80&q=80', homeScore: 2, awayScore: 1, status: 'played', date: '21.05.2026 21:00' },
   { id: 3, week: 1, homeTeam: 'Beşiktaş Cyber', homeLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&h=80&q=80', awayTeam: 'Trakya FC', awayLogo: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=80&h=80&q=80', homeScore: 2, awayScore: 2, status: 'played', date: '21.05.2026 22:00' },
   // Hafta 2
   { id: 4, week: 2, homeTeam: 'Trakya FC', homeLogo: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=80&h=80&q=80', awayTeam: 'Armada Esports', awayLogo: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=80&h=80&q=80', homeScore: 0, awayScore: 4, status: 'played', date: '22.05.2026 20:00' },
   { id: 5, week: 2, homeTeam: 'Göztepe Espor', homeLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&h=80&q=80', awayTeam: 'Anatolia Warriors', awayLogo: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=80&h=80&q=80', homeScore: 2, awayScore: 2, status: 'played', date: '22.05.2026 21:00' },
   { id: 6, week: 2, homeTeam: 'Kadıköy United', homeLogo: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=80&h=80&q=80', awayTeam: 'Beşiktaş Cyber', awayLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&h=80&q=80', homeScore: 3, awayScore: 1, status: 'played', date: '22.05.2026 22:00' },
   // Hafta 3 (Canlı & Gelecek Program)
   { id: 7, week: 3, homeTeam: 'Armada Esports', homeLogo: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=80&h=80&q=80', awayTeam: 'Anatolia Warriors', awayLogo: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=80&h=80&q=80', homeScore: 2, awayScore: 1, status: 'live', date: 'Canlı Yayında' },
   { id: 8, week: 3, homeTeam: 'Göztepe Espor', homeLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&h=80&q=80', awayTeam: 'Beşiktaş Cyber', awayLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&h=80&q=80', status: 'upcoming', date: '23.05.2026 21:00' },
   { id: 9, week: 3, homeTeam: 'Kadıköy United', homeLogo: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=80&h=80&q=80', awayTeam: 'Trakya FC', awayLogo: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=80&h=80&q=80', status: 'upcoming', date: '23.05.2026 22:00' }
];

// LEAGUE OF LEGENDS MOCK DATA
const lolTeams = [
   { id: 1, name: 'SuperMassive', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=80&h=80&q=80', played: 5, won: 5, lost: 0, winRate: 100, kda: 3.4, fb: 4, streak: '5G' },
   { id: 2, name: 'Fenerbahçe Espor', logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&h=80&q=80', played: 5, won: 4, lost: 1, winRate: 80, kda: 2.8, fb: 3, streak: '2G' },
   { id: 3, name: 'Galatasaray Esports', logo: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=80&h=80&q=80', played: 5, won: 3, lost: 2, winRate: 60, kda: 2.1, fb: 3, streak: '1M' },
   { id: 4, name: 'Dark Passage', logo: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=80&h=80&q=80', played: 5, won: 2, lost: 3, winRate: 40, kda: 1.8, fb: 2, streak: '1G' },
   { id: 5, name: 'Futbolist', logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&h=80&q=80', played: 5, won: 1, lost: 4, winRate: 20, kda: 1.4, fb: 2, streak: '3M' },
   { id: 6, name: '5 Ronin', logo: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=80&h=80&q=80', played: 5, won: 0, lost: 5, winRate: 0, kda: 0.9, fb: 1, streak: '5M' }
];

const lolPlayers = [
   { id: 1, name: 'Berkay', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80', team: 'SuperMassive', teamLogo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=80&h=80&q=80', role: 'MID', kills: 42, deaths: 8, assists: 38, csMin: 8.9, kp: 72, champion: 'Ahri' },
   { id: 2, name: 'MythX', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&h=80&q=80', team: 'SuperMassive', teamLogo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=80&h=80&q=80', role: 'ADC', kills: 38, deaths: 5, assists: 40, csMin: 9.2, kp: 70, champion: 'Ezreal' },
   { id: 3, name: 'Thaldrin', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80', team: 'Fenerbahçe Espor', teamLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&h=80&q=80', role: 'TOP', kills: 15, deaths: 12, assists: 35, csMin: 7.8, kp: 55, champion: 'Aatrox' },
   { id: 4, name: 'Elwind', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80', team: 'Galatasaray Esports', teamLogo: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=80&h=80&q=80', role: 'TOP', kills: 22, deaths: 18, assists: 20, csMin: 8.1, kp: 51, champion: 'Jax' },
   { id: 5, name: 'Naru', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=80&h=80&q=80', team: 'Fenerbahçe Espor', teamLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&h=80&q=80', role: 'MID', kills: 30, deaths: 14, assists: 32, csMin: 8.5, kp: 68, champion: 'Azir' },
   { id: 6, name: 'Dumbledoge', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80', team: 'SuperMassive', teamLogo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=80&h=80&q=80', role: 'SUPPORT', kills: 4, deaths: 10, assists: 65, csMin: 1.2, kp: 75, champion: 'Thresh' },
   { id: 7, name: 'Stomaged', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=80&h=80&q=80', team: 'SuperMassive', teamLogo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=80&h=80&q=80', role: 'JUNGLE', kills: 12, deaths: 9, assists: 48, csMin: 5.5, kp: 65, champion: 'Lee Sin' },
   { id: 8, name: 'HolyPhoenix', avatar: 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&w=80&h=80&q=80', team: 'Dark Passage', teamLogo: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=80&h=80&q=80', role: 'ADC', kills: 35, deaths: 15, assists: 22, csMin: 8.8, kp: 62, champion: 'Lucian' },
   { id: 9, name: 'Zeitnot', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&h=80&q=80', team: 'Galatasaray Esports', teamLogo: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=80&h=80&q=80', role: 'ADC', kills: 28, deaths: 16, assists: 24, csMin: 8.6, kp: 59, champion: 'Kai\'Sa' },
   { id: 10, name: 'Rogu', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=80&h=80&q=80', team: 'Dark Passage', teamLogo: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=80&h=80&q=80', role: 'MID', kills: 20, deaths: 19, assists: 25, csMin: 7.9, kp: 57, champion: 'Syndra' }
];

const lolMatches = [
   // Hafta 1
   { id: 1, week: 1, homeTeam: 'SuperMassive', homeLogo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=80&h=80&q=80', awayTeam: 'Fenerbahçe Espor', awayLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&h=80&q=80', homeScore: 1, awayScore: 0, status: 'played', date: '21.05.2026 20:00' },
   { id: 2, week: 1, homeTeam: 'Galatasaray Esports', homeLogo: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=80&h=80&q=80', awayTeam: 'Dark Passage', awayLogo: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=80&h=80&q=80', homeScore: 0, awayScore: 1, status: 'played', date: '21.05.2026 21:00' },
   { id: 3, week: 1, homeTeam: 'Futbolist', homeLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&h=80&q=80', awayTeam: '5 Ronin', awayLogo: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=80&h=80&q=80', homeScore: 1, awayScore: 0, status: 'played', date: '21.05.2026 22:00' },
   // Hafta 2
   { id: 4, week: 2, homeTeam: '5 Ronin', homeLogo: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=80&h=80&q=80', awayTeam: 'SuperMassive', awayLogo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=80&h=80&q=80', homeScore: 0, awayScore: 1, status: 'played', date: '22.05.2026 20:00' },
   { id: 5, week: 2, homeTeam: 'Fenerbahçe Espor', homeLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&h=80&q=80', awayTeam: 'Galatasaray Esports', awayLogo: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=80&h=80&q=80', homeScore: 1, awayScore: 0, status: 'played', date: '22.05.2026 21:00' },
   { id: 6, week: 2, homeTeam: 'Dark Passage', homeLogo: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=80&h=80&q=80', awayTeam: 'Futbolist', awayLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&h=80&q=80', homeScore: 1, awayScore: 0, status: 'played', date: '22.05.2026 22:00' },
   // Hafta 3
   { id: 7, week: 3, homeTeam: 'SuperMassive', homeLogo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=80&h=80&q=80', awayTeam: 'Galatasaray Esports', awayLogo: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=80&h=80&q=80', homeScore: 1, awayScore: 0, status: 'live', date: 'Canlı Yayında' },
   { id: 8, week: 3, homeTeam: 'Fenerbahçe Espor', homeLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&h=80&q=80', awayTeam: 'Futbolist', awayLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&h=80&q=80', status: 'upcoming', date: '23.05.2026 21:00' },
   { id: 9, week: 3, homeTeam: 'Dark Passage', homeLogo: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=80&h=80&q=80', awayTeam: '5 Ronin', awayLogo: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=80&h=80&q=80', status: 'upcoming', date: '23.05.2026 22:00' }
];

interface DetailLayoutProps {
   eventId: string | number;
   initialData?: ArmoyuEvent;
   onBack?: () => void;
}

export function DetailPage({ eventId, initialData, onBack }: DetailLayoutProps) {
   const router = useRouter();
   const { api, apiKey } = useArmoyu();
   const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
   const [event, setEvent] = useState<ArmoyuEvent | null>(initialData || null);
   const [participants, setParticipants] = useState<{ groups: any[], individuals: any[] }>({ groups: [], individuals: [] });
   const [isLoading, setIsLoading] = useState(!initialData);
   const [error, setError] = useState<string | null>(null);

   const [showFullDescription, setShowFullDescription] = useState(false);
   const [showFullRules, setShowFullRules] = useState(false);

   // DEV TEMPLATE STYLES
   const [activeStyle, setActiveStyle] = useState<'standard' | 'tournament' | 'game_special'>('standard');
   const [activeSubTab, setActiveSubTab] = useState<'bracket' | 'fixtures' | 'standings' | 'players'>('bracket');
   const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

   // SORTING STATES & HANDLERS
   const [standingsSortKey, setStandingsSortKey] = useState<string>('points');
   const [standingsSortDir, setStandingsSortDir] = useState<'asc' | 'desc'>('desc');
   const [playersSortKey, setPlayersSortKey] = useState<string>('rating');
   const [playersSortDir, setPlayersSortDir] = useState<'asc' | 'desc'>('desc');

   const handleStandingsSort = (key: string) => {
      if (standingsSortKey === key) {
         setStandingsSortDir(standingsSortDir === 'asc' ? 'desc' : 'asc');
      } else {
         setStandingsSortKey(key);
         setStandingsSortDir('desc');
      }
   };

   const handlePlayersSort = (key: string) => {
      if (playersSortKey === key) {
         setPlayersSortDir(playersSortDir === 'asc' ? 'desc' : 'asc');
      } else {
         setPlayersSortKey(key);
         setPlayersSortDir('desc');
      }
   };

   useEffect(() => {
      const fetchDetail = async () => {
         setIsLoading(true);
         setError(null);
         try {
            const isNumeric = /^\d+$/.test(String(eventId));
            const idNum = isNumeric ? Number(eventId) : NaN;

            const response = await api.events.getEventDetail({
               eventId: isNumeric ? idNum : undefined,
               eventUrl: !isNumeric ? String(eventId) : undefined
            });

            if (response.durum === 1 && response.icerik) {
               const mappedEvent = ArmoyuEvent.fromClass(response.icerik as ArmoyuEventCore);
               setEvent(mappedEvent);

               // Fetch participants if event is found
               try {
                  const partRes = await api.events.getEventParticipants(mappedEvent.id);
                  if (partRes.durum === 1 && partRes.icerik) {
                     setParticipants(partRes.icerik);
                  }
               } catch (partErr) {
                  console.error('[DetailPage] Participants fetch error:', partErr);
               }
            } else if (!apiKey || apiKey === 'armoyu_showcase_key' || response.durum !== 1) {
               // Fallback to mock data
               const mockEvent = eventList.find(e => String(e.id) === String(eventId));
               if (mockEvent) {
                  setEvent(ArmoyuEvent.fromAPI(mockEvent as any));
               } else {
                  setError(response.aciklama || 'Etkinlik bilgisi bulunamadı.');
               }
            }
         } catch (err) {
            console.error('[DetailLayout] Fetch error:', err);
            // Fallback to mock data on catch
            const mockEvent = eventList.find(e => String(e.id) === String(eventId));
            if (mockEvent) {
               setEvent(ArmoyuEvent.fromAPI(mockEvent as any));
            } else {
               setError('Etkinlik yüklenirken bir sorun oluştu.');
            }
         } finally {
            setIsLoading(false);
         }
      };

      fetchDetail();
   }, [eventId, api]);

   useEffect(() => {
      if (event) {
         const gName = (event.gameName || '').toLowerCase();
         const isTournamentGame = 
            gName.includes('counter-strike') || 
            gName.includes('cs') || 
            gName.includes('league of legends') || 
            gName === 'lol' || 
            gName.includes('assetto') || 
            gName.includes('okey') || 
            gName.includes('futbol') || 
            gName.includes('football') || 
            gName.includes('soccer');

         const isSpecialGame = 
            gName.includes('ets') || 
            gName.includes('euro truck') || 
            gName.includes('truck') || 
            gName.includes('simulator') || 
            gName.includes('minecraft') || 
            gName.includes('mc');

         if (isTournamentGame) {
            setActiveStyle('tournament');
         } else if (isSpecialGame) {
            setActiveStyle('game_special');
         } else {
            setActiveStyle('standard');
         }
      }
   }, [event]);

   if (isLoading) {
      return (
         <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <div className="w-12 h-12 border-4 border-armoyu-primary/20 border-t-armoyu-primary rounded-full animate-spin"></div>
            <span className="text-xs font-black uppercase tracking-widest text-armoyu-text-muted animate-pulse">Etkinlik Yükleniyor...</span>
         </div>
      );
   }

   if (error || !event) {
      return (
         <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
            <div className="p-4 bg-red-500/10 rounded-full text-red-500 mb-4">
               <AlertCircle size={40} />
            </div>
            <h2 className="text-2xl font-black text-armoyu-text uppercase tracking-tighter italic mb-2">HATA OLUŞTU</h2>
            <p className="text-armoyu-text-muted font-medium mb-8 max-w-md">{error || 'Beklenmedik bir hata meydana geldi.'}</p>
            <button
               onClick={onBack}
               className="px-8 py-3 bg-white/5 hover:bg-white/10 text-armoyu-text rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
            >
               GERİ DÖN
            </button>
         </div>
      );
   }

   const progressPercentage = event.participantLimit > 0
      ? Math.min(100, (event.currentParticipants / event.participantLimit) * 100)
      : 0;

   const getParticipantTypeLabel = (type: string) => {
      switch (type) {
         case 'bireysel': return 'Bireysel';
         case 'gruplu': return 'Gruplu';
         case 'bireysel_gruplu': return 'Bireysel & Gruplu';
         default: return 'Bireysel';
      }
   };

   // RENDER: STANDARD VIEW (Original Elegancy)
   const renderStandardView = () => {
      return (
         <div className="mx-auto px-4 space-y-8 animate-in fade-in duration-500">
            {/* HERO SECTION */}
            <div className="relative aspect-[21/8] md:aspect-[21/6] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl group">
               <img
                  src={event.image || event.thumbnail}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  alt={event.name}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
               <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end gap-3">
                  <div className="flex flex-wrap gap-2 mb-1">
                     <span className="bg-armoyu-primary text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg">
                        {event.gameName}
                     </span>
                     <span className="bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-white/10">
                        {event.type}
                     </span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic drop-shadow-2xl">
                     {event.name}
                  </h1>
                  <div className="flex items-center gap-6 mt-1 opacity-80">
                     <div className="flex items-center gap-2 shrink-0">
                        <Calendar className="text-armoyu-primary" size={16} />
                        <span className="text-xs font-black text-white uppercase tracking-wider">{event.date}</span>
                     </div>
                     <div className="flex items-center gap-2 shrink-0">
                        <MapPin className="text-armoyu-primary" size={16} />
                        <span className="text-xs font-black text-white uppercase tracking-wider">{event.location}</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* QUICK STATS & JOIN */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
               <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                     { icon: <Clock />, label: 'Durum', value: event.status === 1 ? 'Aktif' : 'Tamamlandı', color: 'text-emerald-500' },
                     { icon: <Users />, label: 'Katılım', value: event.getParticipantProgress(), color: 'text-armoyu-primary' },
                     { icon: <Trophy />, label: 'Tür', value: getParticipantTypeLabel(event.type), color: 'text-purple-500' },
                     { icon: <MapPin />, label: 'Konum', value: event.location || 'Online', color: 'text-orange-500' },
                  ].map((stat, i) => (
                     <div key={i} className="bg-armoyu-card-bg p-4 rounded-2xl border border-white/5 flex items-center gap-4 shadow-xl">
                        <div className={`w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center ${stat.color} shrink-0`}>
                           {React.cloneElement(stat.icon as any, { size: 16 })}
                        </div>
                        <div className="min-w-0">
                           <span className="block text-[7px] font-black text-armoyu-text-muted uppercase tracking-widest mb-0.5">{stat.label}</span>
                           <span className="text-[11px] font-black text-armoyu-text uppercase tracking-tighter truncate block">{stat.value}</span>
                        </div>
                     </div>
                  ))}
               </div>

               <div className="bg-armoyu-card-bg rounded-2xl p-4 border border-white/5 shadow-2xl relative overflow-hidden group flex flex-col gap-4">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-armoyu-primary/5 blur-[40px] -mr-8 -mt-8"></div>
                  <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden border border-white/5">
                     <div
                        className="h-full bg-armoyu-primary rounded-full transition-all duration-1000"
                        style={{ width: `${progressPercentage}%` }}
                     />
                  </div>

                  {event.status === 1 ? (
                     <button className="w-full py-3 bg-armoyu-primary hover:bg-armoyu-primary/90 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 relative z-10">
                        <ShieldCheck size={14} strokeWidth={3} />
                        <span>Hemen Katıl</span>
                        {event.minOdp > 0 && (
                           <span className="text-[7px] opacity-70 bg-black/20 px-1.5 py-0.5 rounded-md font-bold">
                              {event.minOdp} ODP
                           </span>
                        )}
                     </button>
                  ) : (
                     <div className="w-full py-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-2 opacity-50">
                        <ShieldCheck size={14} className="text-armoyu-text-muted" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-armoyu-text-muted">Etkinlik Tamamlandı</span>
                     </div>
                  )}
               </div>
            </div>

            {/* Organizers */}
            <div className="space-y-4">
               <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em] italic border-l-4 border-armoyu-primary pl-4">ETKİNLİK SORUMLULARI</h3>
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {event.organizers && event.organizers.length > 0 ? event.organizers.map((organizer: any) => (
                     <div 
                        key={organizer.id} 
                        onClick={() => router.push(`/oyuncu/${organizer.displayName}`)}
                        className="flex items-center gap-3 p-3 bg-armoyu-card-bg rounded-2xl border border-white/5 hover:border-armoyu-primary/30 transition-all group cursor-pointer active:scale-95 shadow-lg"
                     >
                        <img src={organizer.avatar} className="w-8 h-8 rounded-lg border border-white/10" alt="" />
                        <div className="flex flex-col min-w-0">
                           <span className="text-[10px] font-black text-armoyu-text uppercase tracking-tighter group-hover:text-armoyu-primary transition-colors truncate">{organizer.displayName}</span>
                           <span className="text-[7px] font-black text-armoyu-text-muted uppercase tracking-widest italic opacity-60">Yönetici</span>
                        </div>
                     </div>
                  )) : (
                     <div className="flex items-center gap-3 p-3 bg-armoyu-card-bg rounded-2xl border border-white/5">
                        <div className="w-8 h-8 rounded-lg bg-armoyu-primary/10 flex items-center justify-center text-armoyu-primary">
                           <Gamepad2 size={16} />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black text-armoyu-text uppercase tracking-tighter italic">Platform Ekibi</span>
                           <span className="text-[7px] font-black text-armoyu-text-muted uppercase tracking-widest italic">ARMOYU</span>
                        </div>
                     </div>
                  )}
               </div>
            </div>

            {/* Description & Rules */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-armoyu-card-bg rounded-3xl p-6 border border-white/5 shadow-xl space-y-4">
                  <h3 className="text-[11px] font-black text-white uppercase tracking-[0.2em] italic border-l-4 border-armoyu-primary pl-4">HAKKINDA</h3>
                  <div className="relative">
                     <div className={`text-armoyu-text-muted text-xs leading-relaxed font-medium opacity-80 whitespace-pre-wrap transition-all duration-500 ${!showFullDescription ? 'max-h-[150px] overflow-hidden mask-fade-bottom' : 'max-h-[5000px]'}`}>
                        {event.description || 'Bu etkinlik için henüz bir açıklama girilmemiş.'}
                     </div>
                     {event.description && event.description.split(/\s+/).length > 30 && (
                        <button
                           onClick={() => setShowFullDescription(!showFullDescription)}
                           className="mt-3 text-[8px] font-black text-armoyu-primary hover:text-white uppercase tracking-widest transition-all"
                        >
                           {showFullDescription ? '▲ DAHA AZ GÖR' : '▼ DEVAMINI GÖR'}
                        </button>
                     )}
                  </div>
               </div>
               <div className="bg-armoyu-card-bg rounded-3xl p-6 border border-white/5 shadow-xl space-y-4">
                  <h3 className="text-[11px] font-black text-white uppercase tracking-[0.2em] italic border-l-4 border-red-600 pl-4">KURALLAR</h3>
                  <div className="relative">
                     <div className={`text-armoyu-text-muted text-xs leading-relaxed font-medium opacity-80 whitespace-pre-wrap transition-all duration-500 ${!showFullRules ? 'max-h-[150px] overflow-hidden mask-fade-bottom' : 'max-h-[5000px]'}`}>
                        {event.rules || 'Genel platform kuralları geçerlidir.'}
                     </div>
                     {(event.rules || 'Genel platform kuralları geçerlidir.').split(/\s+/).length > 20 && (
                        <button
                           onClick={() => setShowFullRules(!showFullRules)}
                           className="mt-3 text-[8px] font-black text-red-500 hover:text-white uppercase tracking-widest transition-all"
                        >
                           {showFullRules ? '▲ DAHA AZ GÖR' : '▼ DEVAMINI GÖR'}
                        </button>
                     )}
                  </div>
               </div>
            </div>
         </div>
      );
   };

   const renderTournamentView = () => {
      const gName = (event?.gameName || '').toLowerCase();
      const isTournamentGame = 
         gName.includes('counter-strike') || 
         gName.includes('cs') || 
         gName.includes('league of legends') || 
         gName === 'lol' || 
         gName.includes('assetto') || 
         gName.includes('okey') || 
         gName.includes('futbol') || 
         gName.includes('football') || 
         gName.includes('soccer');

      if (!isTournamentGame) {
         return (
            <div className="max-w-[1280px] mx-auto px-4">
               <div className="bg-armoyu-card-bg border border-white/5 rounded-[32px] p-8 md:p-12 text-center shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
                  <span className="text-4xl mb-4">🚫</span>
                  <h3 className="text-md font-black text-white uppercase tracking-[0.2em] italic">Turnuva Şablonu Yoktur</h3>
                  <p className="text-xs text-gray-400 mt-2 max-w-sm">Bu etkinlik veya oyunda turnuva ağacı ya da lig şablonu kullanılmamaktadır.</p>
               </div>
            </div>
         );
      }

      const isLoL = gName.includes('league of legends') || gName === 'lol';

      const teams = isLoL ? lolTeams : tournamentTeams;
      const matches = isLoL ? lolMatches : tournamentMatches;
      const players = isLoL ? lolPlayers : tournamentPlayers;

      const renderSortHeader = (
         tab: 'standings' | 'players', 
         key: string, 
         label: string, 
         center: boolean = false
      ) => {
         const currentKey = tab === 'standings' ? standingsSortKey : playersSortKey;
         const currentDir = tab === 'standings' ? standingsSortDir : playersSortDir;
         const handler = tab === 'standings' ? handleStandingsSort : handlePlayersSort;
         const isActive = currentKey === key;

         return (
            <th className={`px-3 py-3 text-[8px] font-black uppercase tracking-widest italic select-none ${center ? 'text-center' : 'text-left'}`}>
               <button
                  onClick={() => handler(key)}
                  className={`inline-flex items-center gap-1 hover:text-white transition-all ${
                     isActive ? 'text-amber-500 font-black' : 'text-gray-400'
                  } ${center ? 'justify-center w-full' : ''}`}
               >
                  <span>{label}</span>
                  {isActive && (
                     currentDir === 'asc' ? <ArrowUp size={8} className="shrink-0" /> : <ArrowDown size={8} className="shrink-0" />
                  )}
               </button>
            </th>
         );
      };

      return (
         <div className="mx-auto px-4 space-y-8 animate-in zoom-in-95 duration-500 relative">
            {/* Cyberpunk Tech Background Details */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none -z-20"></div>

            {/* HERO BANNER WITH CORNER BRACKETS */}
            <div className="relative aspect-[21/8] md:aspect-[21/6] rounded-[32px] overflow-hidden border-2 border-amber-500/40 shadow-[0_0_40px_rgba(245,158,11,0.15)] group">
               <img
                  src={event.image || event.thumbnail}
                  className="w-full h-full object-cover saturate-120 group-hover:scale-105 transition-transform duration-1000"
                  alt={event.name}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 to-transparent" />
               
               {/* Glowing corner decors */}
               <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-amber-500"></div>
               <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-amber-500"></div>
               <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-amber-500"></div>
               <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-amber-500"></div>

               <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end gap-3">
                  <div className="flex flex-wrap gap-2 mb-1">
                     <span className="bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(245,158,11,0.4)] flex items-center gap-1.5">
                        <Trophy size={10} /> TURNUVA ETKİNLİĞİ
                     </span>
                     <span className="bg-black/60 backdrop-blur-md text-amber-500 px-3 py-1 rounded-xl text-[8px] font-black uppercase tracking-widest border border-amber-500/20">
                        {event.gameName}
                     </span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] text-shadow-glow">
                     {event.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-6 mt-1 text-gray-300">
                     <div className="flex items-center gap-2 shrink-0 bg-black/40 px-3 py-1.5 rounded-xl border border-white/5">
                        <Calendar className="text-amber-500" size={14} />
                        <span className="text-[10px] font-black uppercase tracking-wider">{event.date}</span>
                     </div>
                     <div className="flex items-center gap-2 shrink-0 bg-black/40 px-3 py-1.5 rounded-xl border border-white/5">
                        <MapPin className="text-amber-500" size={14} />
                        <span className="text-[10px] font-black uppercase tracking-wider">{event.location || 'Discord Arenası'}</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* PRIZE POOL SECTION */}
            <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent rounded-[32px] border border-amber-500/20 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
               <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-amber-500/5 blur-[50px] rounded-full"></div>
               <div className="flex items-center gap-5 relative z-10">
                  <div className="p-4 bg-amber-500/20 rounded-2xl border border-amber-500/30 text-amber-400 animate-bounce">
                     <Trophy size={32} />
                  </div>
                  <div>
                     <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em]">ETKİNLİK ÖDÜL HAVUZU</span>
                     <h2 className="text-2xl font-black text-white uppercase tracking-tight mt-0.5">15,000 ODP + Discord Sponsor Rolü</h2>
                  </div>
               </div>
               <div className="flex gap-3 relative z-10 w-full md:w-auto">
                  <div className="bg-[#0b0b12] border border-amber-500/30 rounded-2xl p-4 text-center flex-1 md:flex-initial min-w-[100px] shadow-lg">
                     <span className="block text-[8px] font-black text-amber-500 uppercase tracking-widest">🏆 1. BİRİNCİ</span>
                     <span className="text-sm font-black text-white block mt-1">8,000 ODP</span>
                  </div>
                  <div className="bg-[#0b0b12] border border-white/10 rounded-2xl p-4 text-center flex-1 md:flex-initial min-w-[100px]">
                     <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest">🥈 2. İKİNCİ</span>
                     <span className="text-sm font-black text-white block mt-1">4,000 ODP</span>
                  </div>
                  <div className="bg-[#0b0b12] border border-white/10 rounded-2xl p-4 text-center flex-1 md:flex-initial min-w-[100px]">
                     <span className="block text-[8px] font-black text-amber-700 uppercase tracking-widest">🥉 3. ÜÇÜNCÜ</span>
                     <span className="text-sm font-black text-white block mt-1">3,000 ODP</span>
                  </div>
               </div>
            </div>

            {/* TOURNAMENT SUB-TABS */}
            <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4">
               {[
                  { id: 'bracket', label: 'Turnuva Ağacı (Düello)', icon: <Trophy size={12} /> },
                  { id: 'fixtures', label: 'Fikstür & Maçlar', icon: <Calendar size={12} /> },
                  { id: 'standings', label: 'Puan Durumu', icon: <List size={12} /> },
                  { id: 'players', label: 'Oyuncu İstatistikleri', icon: <Users size={12} /> },
               ].map((tab) => (
                  <button
                     key={tab.id}
                     onClick={() => setActiveSubTab(tab.id as any)}
                     className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                        activeSubTab === tab.id
                           ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                           : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                     }`}
                  >
                     {tab.icon}
                     <span>{tab.label}</span>
                  </button>
               ))}
            </div>

            {/* TOURNAMENT DETAILS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
               {/* Left Big: Content based on active sub-tab */}
               <div className="lg:col-span-3 space-y-6">
                  
                  {activeSubTab === 'bracket' && (
                     /* Bracket view */
                     <div className="bg-armoyu-card-bg border border-white/5 rounded-[32px] p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[50px] -mr-10 -mt-10 rounded-full"></div>
                        <h3 className="text-[11px] font-black text-white uppercase tracking-[0.3em] italic border-l-4 border-amber-500 pl-4">DÜELLO EŞLEŞMELERİ (TURNUVA AĞACI)</h3>
                        
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 py-8 overflow-x-auto min-w-full">
                           {/* Quarter Final */}
                           <div className="flex flex-col gap-6 w-full lg:w-60 shrink-0">
                              <div className="text-[8px] font-black text-gray-400 uppercase tracking-[0.25em] text-center border-b border-white/5 pb-2">ÇEYREK FİNAL</div>
                              <div className="space-y-4">
                                 <div className="bg-black/40 border border-white/10 p-3.5 rounded-2xl space-y-2 relative">
                                    <div className="flex justify-between items-center text-[10px] font-black text-white"><span className="truncate">Team Alpha</span><span className="text-amber-500">2</span></div>
                                    <div className="flex justify-between items-center text-[10px] font-black text-gray-500"><span className="truncate">Team Beta</span><span>1</span></div>
                                 </div>
                                 <div className="bg-black/40 border border-white/10 p-3.5 rounded-2xl space-y-2">
                                    <div className="flex justify-between items-center text-[10px] font-black text-gray-500"><span className="truncate">Team Delta</span><span>0</span></div>
                                    <div className="flex justify-between items-center text-[10px] font-black text-white"><span className="truncate">Team Gamma</span><span className="text-amber-500">2</span></div>
                                 </div>
                              </div>
                           </div>
                           
                           {/* Semi Final */}
                           <div className="flex flex-col gap-12 w-full lg:w-60 shrink-0">
                              <div className="text-[8px] font-black text-gray-400 uppercase tracking-[0.25em] text-center border-b border-white/5 pb-2">YARI FİNAL</div>
                              <div className="space-y-8">
                                 <div className="bg-black/40 border border-amber-500/20 p-3.5 rounded-2xl space-y-2 shadow-lg shadow-amber-500/5">
                                    <div className="flex justify-between items-center text-[10px] font-black text-white"><span className="truncate">Team Alpha</span><span className="text-amber-500">3</span></div>
                                    <div className="flex justify-between items-center text-[10px] font-black text-gray-400"><span className="truncate">Team Gamma</span><span>2</span></div>
                                 </div>
                              </div>
                           </div>

                           {/* Grand Final */}
                           <div className="flex flex-col gap-6 w-full lg:w-60 shrink-0 items-center justify-center">
                              <div className="text-[8px] font-black text-amber-500 uppercase tracking-[0.25em] text-center border-b border-amber-500/20 pb-2 w-full">BÜYÜK FİNAL</div>
                              <div className="bg-gradient-to-b from-amber-500/20 to-black/80 border-2 border-amber-500 p-6 rounded-3xl text-center w-full shadow-2xl shadow-amber-500/15 relative overflow-hidden">
                                 <Crown className="text-amber-500 mx-auto mb-2 animate-bounce" size={36} />
                                 <h4 className="text-[9px] font-black text-white uppercase tracking-widest">ŞAMPİYONLUK MAÇI</h4>
                                 <div className="mt-4 space-y-1.5 text-center">
                                    <span className="block text-xs font-black text-amber-500 uppercase">Team Alpha</span>
                                    <span className="text-[8px] font-black text-gray-400 uppercase">VS</span>
                                    <span className="block text-[10px] font-black text-gray-300">TBD (Yarı Final 2 Kazananı)</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}

                  {activeSubTab === 'fixtures' && (
                     /* Fixtures and Results view */
                     <div className="bg-armoyu-card-bg border border-white/5 rounded-[32px] p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[50px] -mr-10 -mt-10 rounded-full"></div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-amber-500 pl-4">
                           <h3 className="text-[11px] font-black text-white uppercase tracking-[0.3em] italic">MAÇ PROGRAMI VE SONUÇLAR</h3>
                           
                           {/* Round Selector */}
                           <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/5 self-start">
                              <button
                                 onClick={() => setSelectedWeek(null)}
                                 className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${
                                    selectedWeek === null
                                       ? 'bg-amber-500 text-black font-bold'
                                       : 'text-gray-400 hover:text-white hover:bg-white/5'
                                 }`}
                              >
                                 TÜMÜ
                              </button>
                              {[1, 2, 3].map((weekNum) => (
                                 <button
                                    key={weekNum}
                                    onClick={() => setSelectedWeek(weekNum)}
                                    className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${
                                       selectedWeek === weekNum
                                          ? 'bg-amber-500 text-black font-bold'
                                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                                 >
                                    {weekNum}. Hafta
                                 </button>
                              ))}
                           </div>
                        </div>

                        <div className="space-y-3">
                           {matches.filter(m => selectedWeek === null || m.week === selectedWeek).map((match) => (
                              <div key={match.id} className="bg-black/20 hover:bg-black/35 transition-all border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                                 <div className="flex items-center gap-2 font-mono text-[9px] text-gray-500 uppercase">
                                    <Clock size={12} className="text-amber-500 shrink-0" />
                                    <span>{match.date}</span>
                                 </div>

                                 {/* Teams & Score */}
                                 <div className="flex items-center justify-center gap-6 flex-1 w-full max-w-lg">
                                    {/* Home Team */}
                                    <div className="flex items-center justify-end gap-3 flex-1 text-right min-w-0">
                                       <span className="text-xs font-black text-white uppercase truncate">{match.homeTeam}</span>
                                       <img src={match.homeLogo} alt="" className="w-8 h-8 rounded-lg border border-white/10 shrink-0 bg-white/5 object-cover" />
                                    </div>

                                    {/* Score / VS Display */}
                                    <div className="flex items-center gap-2 bg-black/40 px-4 py-1.5 rounded-xl border border-white/5 font-mono text-sm font-black shrink-0">
                                       {match.status === 'upcoming' ? (
                                          <span className="text-xs text-gray-500 uppercase px-1">VS</span>
                                       ) : (
                                          <div className="flex items-center gap-3">
                                             <span className={match.homeScore! > match.awayScore! ? 'text-amber-400' : 'text-white'}>
                                                {match.homeScore}
                                             </span>
                                             <span className="text-gray-600 font-normal">-</span>
                                             <span className={match.awayScore! > match.homeScore! ? 'text-amber-400' : 'text-white'}>
                                                {match.awayScore}
                                             </span>
                                          </div>
                                       )}
                                    </div>

                                    {/* Away Team */}
                                    <div className="flex items-center gap-3 flex-1 text-left min-w-0">
                                       <img src={match.awayLogo} alt="" className="w-8 h-8 rounded-lg border border-white/10 shrink-0 bg-white/5 object-cover" />
                                       <span className="text-xs font-black text-white uppercase truncate">{match.awayTeam}</span>
                                    </div>
                                 </div>

                                 {/* Status Badge */}
                                 <div className="shrink-0">
                                    {match.status === 'played' && (
                                       <span className="bg-white/5 text-gray-400 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-white/5">
                                          Oynandı
                                       </span>
                                    )}
                                    {match.status === 'live' && (
                                       <span className="bg-red-500/20 text-red-500 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-red-500/30 animate-pulse flex items-center gap-1">
                                          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Canlı
                                       </span>
                                    )}
                                    {match.status === 'upcoming' && (
                                       <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-amber-500/20">
                                          Gelecek Maç
                                       </span>
                                    )}
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {activeSubTab === 'standings' && (
                     /* Football League Standings View */
                     <div className="bg-armoyu-card-bg border border-white/5 rounded-[32px] p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[50px] -mr-10 -mt-10 rounded-full"></div>
                        <h3 className="text-[11px] font-black text-white uppercase tracking-[0.3em] italic border-l-4 border-amber-500 pl-4">ETKİNLİK PUAN DURUMU</h3>

                        <div className="overflow-x-auto">
                           <table className="w-full text-left border-collapse min-w-[600px]">
                              <thead>
                                 {isLoL ? (
                                    <tr className="border-b border-white/5 bg-white/5 text-[8px] font-black text-gray-400 uppercase tracking-widest italic">
                                       <th className="px-4 py-3 text-center w-12 select-none text-gray-500">Sıra</th>
                                       {renderSortHeader('standings', 'name', 'Takım')}
                                       {renderSortHeader('standings', 'played', 'OM', true)}
                                       {renderSortHeader('standings', 'won', 'G', true)}
                                       {renderSortHeader('standings', 'lost', 'M', true)}
                                       {renderSortHeader('standings', 'winRate', 'WR%', true)}
                                       {renderSortHeader('standings', 'kda', 'KDA', true)}
                                       {renderSortHeader('standings', 'fb', 'FB', true)}
                                       {renderSortHeader('standings', 'streak', 'Seri', true)}
                                    </tr>
                                 ) : (
                                    <tr className="border-b border-white/5 bg-white/5 text-[8px] font-black text-gray-400 uppercase tracking-widest italic">
                                       <th className="px-4 py-3 text-center w-12 select-none text-gray-500">Sıra</th>
                                       {renderSortHeader('standings', 'name', 'Takım')}
                                       {renderSortHeader('standings', 'played', 'OM', true)}
                                       {renderSortHeader('standings', 'won', 'G', true)}
                                       {renderSortHeader('standings', 'drawn', 'B', true)}
                                       {renderSortHeader('standings', 'lost', 'M', true)}
                                       {renderSortHeader('standings', 'gf', 'AG', true)}
                                       {renderSortHeader('standings', 'ga', 'YG', true)}
                                       {renderSortHeader('standings', 'gd', 'AV', true)}
                                       {renderSortHeader('standings', 'points', 'Puan', true)}
                                    </tr>
                                 )}
                              </thead>
                              <tbody className="divide-y divide-white/5">
                                 {[...teams]
                                    .sort((a, b) => {
                                       let valA = a[standingsSortKey as keyof typeof a] ?? 0;
                                       let valB = b[standingsSortKey as keyof typeof b] ?? 0;
                                       if (typeof valA === 'string' && typeof valB === 'string') {
                                          return standingsSortDir === 'asc' 
                                             ? valA.localeCompare(valB) 
                                             : valB.localeCompare(valA);
                                       }
                                       return standingsSortDir === 'asc'
                                          ? Number(valA) - Number(valB)
                                          : Number(valB) - Number(valA);
                                    })
                                    .map((team, idx) => {
                                       const tAny = team as any;
                                       return (
                                          <tr key={team.id} className="hover:bg-white/5 transition-all text-xs font-black text-white">
                                             <td className="px-4 py-3 text-center">
                                                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-lg text-[10px] font-black ${
                                                   idx === 0 
                                                      ? 'bg-amber-500 text-black shadow-[0_0_10px_rgba(245,158,11,0.5)]' 
                                                      : idx === 1 
                                                      ? 'bg-gray-300 text-black' 
                                                      : idx === 2 
                                                      ? 'bg-amber-800 text-white border border-amber-700/50' 
                                                      : 'bg-black/40 text-gray-400 border border-white/5'
                                                }`}>
                                                   {idx + 1}
                                                </span>
                                             </td>
                                             <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                   <img src={team.logo} alt="" className="w-8 h-8 rounded-lg border border-white/10 p-0.5 bg-white/5 object-cover" />
                                                   <span className="uppercase tracking-tight">{team.name}</span>
                                                </div>
                                             </td>
                                             {isLoL ? (
                                                <>
                                                   <td className="px-3 py-3 text-center text-gray-400">{tAny.played}</td>
                                                   <td className="px-3 py-3 text-center text-emerald-400">{tAny.won}</td>
                                                   <td className="px-3 py-3 text-center text-red-400">{tAny.lost}</td>
                                                   <td className="px-3 py-3 text-center text-amber-400 font-mono">%{tAny.winRate}</td>
                                                   <td className="px-3 py-3 text-center text-gray-300 font-mono">{tAny.kda}</td>
                                                   <td className="px-3 py-3 text-center text-gray-400">{tAny.fb}</td>
                                                   <td className="px-4 py-3 text-center font-bold text-amber-500">{tAny.streak}</td>
                                                </>
                                             ) : (
                                                <>
                                                   <td className="px-3 py-3 text-center text-gray-400">{tAny.played}</td>
                                                   <td className="px-3 py-3 text-center text-emerald-400">{tAny.won}</td>
                                                   <td className="px-3 py-3 text-center text-gray-400">{tAny.drawn}</td>
                                                   <td className="px-3 py-3 text-center text-red-400">{tAny.lost}</td>
                                                   <td className="px-3 py-3 text-center text-gray-400">{tAny.gf}</td>
                                                   <td className="px-3 py-3 text-center text-gray-400">{tAny.ga}</td>
                                                   <td className="px-3 py-3 text-center text-gray-400">{tAny.gd > 0 ? `+${tAny.gd}` : tAny.gd}</td>
                                                   <td className="px-4 py-3 text-center font-black text-amber-400 bg-amber-500/5">{tAny.points}</td>
                                                </>
                                             )}
                                          </tr>
                                       );
                                    })}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  )}

                  {activeSubTab === 'players' && (
                     /* Player Statistics View with Rating Formula and Medals */
                     <div className="bg-armoyu-card-bg border border-white/5 rounded-[32px] p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[50px] -mr-10 -mt-10 rounded-full"></div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-amber-500 pl-4">
                           <div>
                              <h3 className="text-[11px] font-black text-white uppercase tracking-[0.3em] italic">OYUNCU İSTATİSTİKLERİ & SIRALAMA</h3>
                              <p className="text-[8px] font-bold text-gray-500 uppercase tracking-wider mt-1">
                                 {isLoL 
                                    ? 'Yetenek Puanı = (Kills + Assists) / Deaths formülü (KDA) ile hesaplanır.' 
                                    : 'Yetenek Puanı = (Gol + Asist) / (Kırmızı Kart + 1) formülü ile hesaplanır.'}
                              </p>
                           </div>
                        </div>

                        <div className="overflow-x-auto">
                           <table className="w-full text-left border-collapse min-w-[600px]">
                              <thead>
                                 {isLoL ? (
                                    <tr className="border-b border-white/5 bg-white/5 text-[8px] font-black text-gray-400 uppercase tracking-widest italic">
                                       <th className="px-4 py-3 text-center w-12 select-none text-gray-500">Sıra</th>
                                       {renderSortHeader('players', 'name', 'Oyuncu')}
                                       {renderSortHeader('players', 'team', 'Takım')}
                                       {renderSortHeader('players', 'role', 'Rol', true)}
                                       {renderSortHeader('players', 'kills', 'K', true)}
                                       {renderSortHeader('players', 'deaths', 'D', true)}
                                       {renderSortHeader('players', 'assists', 'A', true)}
                                       {renderSortHeader('players', 'csMin', 'CS/DK', true)}
                                       {renderSortHeader('players', 'kp', 'KP%', true)}
                                       {renderSortHeader('players', 'champion', 'Şampiyon')}
                                       {renderSortHeader('players', 'rating', 'KDA', true)}
                                    </tr>
                                 ) : (
                                    <tr className="border-b border-white/5 bg-white/5 text-[8px] font-black text-gray-400 uppercase tracking-widest italic">
                                       <th className="px-4 py-3 text-center w-12 select-none text-gray-500">Sıra</th>
                                       {renderSortHeader('players', 'name', 'Oyuncu')}
                                       {renderSortHeader('players', 'team', 'Takım')}
                                       {renderSortHeader('players', 'goals', 'Gol', true)}
                                       {renderSortHeader('players', 'assists', 'Asist', true)}
                                       {renderSortHeader('players', 'yellowCards', 'Sarı', true)}
                                       {renderSortHeader('players', 'redCards', 'Kırmızı', true)}
                                       {renderSortHeader('players', 'rating', 'Yetenek Puanı', true)}
                                    </tr>
                                 )}
                              </thead>
                              <tbody className="divide-y divide-white/5">
                                 {players
                                    .map(p => ({
                                       ...p,
                                       rating: isLoL 
                                          ? Number((((p as any).kills! + (p as any).assists!) / Math.max(1, (p as any).deaths!)).toFixed(2))
                                          : Number((((p as any).goals! + (p as any).assists!) / ((p as any).redCards! + 1)).toFixed(2))
                                    }))
                                    .sort((a, b) => {
                                       let valA = a[playersSortKey as keyof typeof a] ?? 0;
                                       let valB = b[playersSortKey as keyof typeof b] ?? 0;
                                       if (typeof valA === 'string' && typeof valB === 'string') {
                                          return playersSortDir === 'asc' 
                                             ? valA.localeCompare(valB) 
                                             : valB.localeCompare(valA);
                                       }
                                       return playersSortDir === 'asc'
                                          ? Number(valA) - Number(valB)
                                          : Number(valB) - Number(valA);
                                    })
                                    .map((player, idx) => {
                                       const pAny = player as any;
                                       return (
                                          <tr 
                                             key={player.id} 
                                             className={`hover:bg-white/5 transition-all text-xs font-black text-white ${
                                                idx === 0 
                                                   ? 'bg-amber-500/5 shadow-[inset_0_0_20px_rgba(245,158,11,0.05)] animate-pulse' 
                                                   : ''
                                             }`}
                                          >
                                             <td className="px-4 py-3 text-center">
                                                {idx === 0 ? (
                                                   <span className="inline-block text-lg" title="Altın Ayakkabı / Lider">👑</span>
                                                ) : idx === 1 ? (
                                                   <span className="inline-block text-lg" title="Gümüş">🥈</span>
                                                ) : idx === 2 ? (
                                                   <span className="inline-block text-lg" title="Bronz">🥉</span>
                                                ) : (
                                                   <span className="text-gray-500 font-bold">{idx + 1}</span>
                                                )}
                                             </td>
                                             <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                   <img src={player.avatar} alt="" className="w-8 h-8 rounded-lg border border-white/10 object-cover" />
                                                   <span className="uppercase tracking-tight">{player.name}</span>
                                                </div>
                                             </td>
                                             <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                   <img src={player.teamLogo} alt="" className="w-5 h-5 rounded-md border border-white/10 object-cover" />
                                                   <span className="text-gray-400 uppercase text-[10px] tracking-tight">{player.team}</span>
                                                </div>
                                             </td>
                                             {isLoL ? (
                                                <>
                                                   <td className="px-3 py-3 text-center">
                                                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                                         pAny.role === 'MID' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                                                         pAny.role === 'ADC' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                         pAny.role === 'TOP' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                                         pAny.role === 'JUNGLE' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                         'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                                                      }`}>
                                                         {pAny.role}
                                                      </span>
                                                   </td>
                                                   <td className="px-3 py-3 text-center text-emerald-400 font-mono">{pAny.kills}</td>
                                                   <td className="px-3 py-3 text-center text-red-400 font-mono">{pAny.deaths}</td>
                                                   <td className="px-3 py-3 text-center text-blue-400 font-mono">{pAny.assists}</td>
                                                   <td className="px-3 py-3 text-center text-gray-400 font-mono">{pAny.csMin}</td>
                                                   <td className="px-3 py-3 text-center text-gray-400 font-mono">%{pAny.kp}</td>
                                                   <td className="px-4 py-3">
                                                      <span className="text-gray-300 font-semibold">{pAny.champion}</span>
                                                   </td>
                                                </>
                                             ) : (
                                                <>
                                                   <td className="px-3 py-3 text-center text-white">{pAny.goals}</td>
                                                   <td className="px-3 py-3 text-center text-gray-400">{pAny.assists}</td>
                                                   <td className="px-3 py-3 text-center text-yellow-500 bg-yellow-500/5">{pAny.yellowCards}</td>
                                                   <td className="px-3 py-3 text-center text-red-500 bg-red-500/5">{pAny.redCards}</td>
                                                </>
                                             )}
                                             <td className="px-4 py-3 text-center">
                                                <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-black ${
                                                   idx === 0 
                                                      ? 'bg-amber-500 text-black shadow-[0_0_10px_rgba(245,158,11,0.4)]' 
                                                      : 'bg-black/40 text-amber-400 border border-amber-500/20'
                                                }`}>
                                                   {player.rating}
                                                </span>
                                             </td>
                                          </tr>
                                       );
                                    })}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  )}
               </div>

               {/* Right Side: Registration status & Limits */}
               <div className="space-y-6">
                  {/* Registration Card */}
                  <div className="bg-[#0b0b12] border-2 border-amber-500/40 rounded-[32px] p-6 shadow-2xl space-y-6 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 blur-[40px] rounded-full -mr-8 -mt-8"></div>
                     <span className="text-[8px] font-black text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full uppercase tracking-widest inline-block">KAYIT AŞAMASI</span>
                     
                     <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-bold text-gray-400">
                           <span>Kayıtlı Oyuncu</span>
                           <span>{event.currentParticipants} / {event.participantLimit > 0 ? event.participantLimit : 'Sınırsız'}</span>
                        </div>
                        <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-white/5 p-0.5">
                           <div 
                             className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)] transition-all duration-1000" 
                             style={{ width: `${progressPercentage}%` }}
                           />
                        </div>
                     </div>

                     <div className="space-y-3">
                        <div className="flex items-center gap-3 text-xs text-gray-300">
                           <Award className="text-amber-500" size={16} />
                           <span>Min ODP Gereksinimi: <strong className="text-white">{event.minOdp}+</strong></span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-300">
                           <Zap className="text-amber-500" size={16} />
                           <span>Katılımcı Türü: <strong className="text-white">{getParticipantTypeLabel(event.type)}</strong></span>
                        </div>
                     </div>

                     {event.status === 1 ? (
                        <button className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-600 hover:brightness-110 text-black font-black rounded-2xl text-[10px] uppercase tracking-[0.25em] transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] active:scale-95 flex items-center justify-center gap-2">
                           <Sword size={14} /> TURNUVAYA KAYDOL
                        </button>
                     ) : (
                        <div className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-2 opacity-50">
                           <ShieldAlert size={14} className="text-gray-400" />
                           <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">TURNUVA KAPANDI</span>
                        </div>
                     )}
                  </div>
               </div>
            </div>

            {/* Description & Rules in Tournament Vibe */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-armoyu-card-bg rounded-[32px] p-6 border border-white/5 shadow-2xl space-y-4">
                  <h3 className="text-[11px] font-black text-amber-500 uppercase tracking-[0.2em] italic border-l-4 border-amber-500 pl-4">DETAYLAR & AÇIKLAMA</h3>
                  <div className="text-gray-300 text-xs leading-relaxed font-medium opacity-90 whitespace-pre-wrap">
                     {event.description || 'Turnuva detayları belirtilmedi.'}
                  </div>
               </div>

               <div className="bg-armoyu-card-bg rounded-[32px] p-6 border border-white/5 shadow-2xl space-y-4">
                  <h3 className="text-[11px] font-black text-red-500 uppercase tracking-[0.2em] italic border-l-4 border-red-500 pl-4">TURNUVA KURALLARI</h3>
                  <div className="text-gray-300 text-xs leading-relaxed font-medium opacity-90 whitespace-pre-wrap">
                     {event.rules || 'Genel rekabetçi turnuva kuralları geçerlidir.'}
                  </div>
               </div>
            </div>
         </div>
      );
   };

   // RENDER: GAME SPECIAL VIEW (Immersive HUD matching Minecraft/CS2/ETS2)
   const renderGameSpecialView = () => {
      const gName = (event.gameName || '').toLowerCase();

      // MINECRAFT SPECIAL LAYOUT (Green voxel style)
      if (gName.includes('minecraft') || gName.includes('mc')) {
         return (
            <div className="mx-auto px-4 space-y-8 animate-in fade-in duration-500 font-mono">
               {/* Minecraft-like header container */}
               <div className="bg-[#3b2d1f] border-4 border-[#2d2116] p-6 rounded-none shadow-[0_0_0_4px_#5c4a37] relative overflow-hidden">
                  <div className="absolute top-2 right-2 px-3 py-1 bg-green-700 text-white border-2 border-green-900 text-[10px] font-bold">
                     MINECRAFT SUNUCUSU
                  </div>
                  <h1 className="text-2xl md:text-4xl font-bold text-yellow-400 drop-shadow-[2px_2px_0px_#000] uppercase tracking-wide">
                     ⛏️ {event.name}
                  </h1>
                  <p className="text-xs text-gray-300 mt-2">Sunucu Buluşması & Macera Etkinliği</p>
                  <div className="flex gap-4 mt-4 text-[10px] text-green-400">
                     <span>[Tarih]: {event.date}</span>
                     <span>[Konum]: {event.location || 'ARMOYU Hub'}</span>
                  </div>
               </div>

               {/* MC Inventory Slots themed participants & Quick stats */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left Column stats */}
                  <div className="md:col-span-2 space-y-6">
                     <div className="bg-[#2e2e2e] border-4 border-[#1c1c1c] p-6 text-xs text-gray-300 space-y-4">
                        <h3 className="text-yellow-400 font-bold uppercase border-b-2 border-[#1c1c1c] pb-2">ETKİNLİK DETAYLARI</h3>
                        <div className="space-y-2">
                           <p><strong className="text-white">Açıklama:</strong></p>
                           <p className="bg-[#181818] p-3 border-2 border-[#101010] text-gray-400 whitespace-pre-wrap">{event.description}</p>
                        </div>
                     </div>
                  </div>

                  {/* MC HUD Register Box */}
                  <div className="bg-[#382b26] border-4 border-[#1f1714] p-6 text-center space-y-4">
                     <span className="text-yellow-400 text-xs font-bold block">KATILIM DURUMU</span>
                     <div className="bg-black/60 p-4 border-2 border-[#1f1714] text-xs">
                        <span className="block text-gray-400 text-[10px]">OYUNCU SAYISI</span>
                        <span className="text-xl font-bold text-white mt-1 block">{event.currentParticipants} / {event.participantLimit > 0 ? event.participantLimit : 'Sınırsız'}</span>
                     </div>
                     <button className="w-full py-3 bg-[#4c8c2b] hover:bg-[#3f7324] border-b-4 border-[#284e18] text-white font-bold text-xs uppercase tracking-widest transition-all active:translate-y-1 active:border-b-0">
                        ETKİNLİĞE KATIL
                     </button>
                  </div>
               </div>
            </div>
         );
      }

      // CS2 SPECIAL LAYOUT (Military Orange & Radar)
      if (gName.includes('counter-strike') || gName.includes('cs')) {
         return (
            <div className="mx-auto px-4 space-y-8 animate-in fade-in duration-500">
               {/* CS2 Tactical HUD */}
               <div className="bg-zinc-950 border border-amber-500/40 p-8 rounded-3xl relative overflow-hidden shadow-2xl">
                  {/* Neon orange stripes */}
                  <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                     <div>
                        <div className="flex items-center gap-2 mb-2">
                           <span className="bg-amber-500 text-black px-2 py-0.5 rounded text-[8px] font-black tracking-widest">TAC_EVENT</span>
                           <span className="text-gray-400 text-[9px] font-bold">MATCHMAKING ACTIVE</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic text-shadow-glow">
                           💥 {event.name}
                        </h1>
                        <p className="text-xs text-gray-400 mt-2 font-mono">BOMBSITE LOC: {event.location || 'Discord Arenası'}</p>
                     </div>
                     <div className="bg-zinc-900 border border-white/5 px-6 py-4 rounded-2xl text-right">
                        <span className="text-[8px] font-black text-gray-500 block uppercase">MATCH_START</span>
                        <span className="text-sm font-black text-amber-500 block mt-1">{event.date}</span>
                     </div>
                  </div>
               </div>

               {/* CS2 Stats Grid */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-6">
                     <div className="bg-zinc-900/60 border border-white/5 rounded-3xl p-6 space-y-4">
                        <h3 className="text-xs font-black text-amber-500 tracking-wider uppercase border-l-4 border-amber-500 pl-3">TAKTIK TALİMATLAR (AÇIKLAMA)</h3>
                        <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">{event.description}</p>
                     </div>
                     <div className="bg-zinc-900/60 border border-white/5 rounded-3xl p-6 space-y-4">
                        <h3 className="text-xs font-black text-red-500 tracking-wider uppercase border-l-4 border-red-500 pl-3">ANGARYA KURALLARI</h3>
                        <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">{event.rules}</p>
                     </div>
                  </div>

                  <div className="bg-zinc-950 border border-white/5 rounded-3xl p-6 space-y-6">
                     <div className="text-center pb-4 border-b border-white/5">
                        <span className="text-[9px] font-black text-gray-500 block uppercase">LOBBY CAPACITY</span>
                        <span className="text-2xl font-black text-white mt-1 block">{event.currentParticipants} / {event.participantLimit > 0 ? event.participantLimit : 'Sınırsız'}</span>
                     </div>
                     
                     <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs font-bold">
                           <span className="text-gray-400">Min ODP:</span>
                           <span className="text-amber-500">{event.minOdp}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-bold">
                           <span className="text-gray-400">Tür:</span>
                           <span className="text-white">{getParticipantTypeLabel(event.type)}</span>
                        </div>
                     </div>

                     <button className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-black font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-lg shadow-amber-500/10 active:scale-95 transition-all">
                        DEPLOY TO SERVER
                     </button>
                  </div>
               </div>
            </div>
         );
      }

      // RACING / ETS2 SPECIAL LAYOUT (Asphalt black & hazard stripes)
      return (
         <div className="mx-auto px-4 space-y-8 animate-in fade-in duration-500">
            {/* ETS2 Dashboard HUD styling */}
            <div className="bg-neutral-900 border-b-8 border-yellow-500 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
               {/* Diagonal striping background */}
               <div className="absolute inset-0 bg-repeat bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_50%,#000_50%,#000_75%,transparent_75%,transparent)] bg-[size:10px_10px] opacity-5 pointer-events-none"></div>
               
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div>
                     <span className="px-3 py-1 bg-yellow-500 text-black text-[9px] font-black uppercase rounded-lg tracking-widest inline-block mb-3">ETS 2 SEFER GÖREVİ</span>
                     <h1 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
                        🚚 {event.name}
                     </h1>
                     <div className="flex gap-4 mt-3 text-xs text-gray-400 font-mono">
                        <span>[Başlangıç]: {event.location || 'Duisburg'}</span>
                        <span>[Tarih]: {event.date}</span>
                     </div>
                  </div>
                  
                  {/* Tachometer gauge mock design */}
                  <div className="w-24 h-24 rounded-full border-4 border-yellow-500/20 border-t-yellow-500 flex flex-col items-center justify-center text-center bg-black/40">
                     <span className="text-[7px] text-gray-500 font-bold uppercase">SPEED</span>
                     <span className="text-md font-black text-white font-mono">90</span>
                     <span className="text-[7px] text-yellow-500 font-bold uppercase">KM/S</span>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="md:col-span-2 space-y-6">
                  <div className="bg-neutral-900/60 border border-white/5 rounded-3xl p-6 space-y-4">
                     <h3 className="text-xs font-black text-yellow-500 tracking-wider uppercase border-l-4 border-yellow-500 pl-3">KONVOY ROTASI VE DETAYLARI</h3>
                     <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">{event.description}</p>
                  </div>
               </div>

               <div className="bg-neutral-950 border border-white/5 rounded-3xl p-6 space-y-6">
                  <div className="text-center pb-4 border-b border-white/5">
                     <span className="text-[9px] font-black text-gray-500 block uppercase">KONVOY KAPASİTESİ</span>
                     <span className="text-2xl font-black text-white mt-1 block">{event.currentParticipants} / {event.participantLimit > 0 ? event.participantLimit : 'Sınırsız'}</span>
                  </div>

                  <button className="w-full py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-black rounded-2xl text-[10px] uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-yellow-500/10">
                     TELSİZE BAĞLAN & KATIL
                  </button>
               </div>
            </div>
         </div>
      );
   };

   return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10 relative">
         {/* Subtle Background Glows */}
         <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-armoyu-primary/5 blur-[100px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[100px] rounded-full" />
         </div>

         {/* Navigation Header - COMPACT */}
         <PageWidth width="max-w-[1280px]" />
         <div className="mx-auto mb-6 px-4">
            <button
               onClick={onBack}
               className="group flex items-center gap-3 text-armoyu-text-muted hover:text-white transition-all bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-2xl border border-white/5"
            >
               <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
               <span className="text-[10px] font-black uppercase tracking-widest">Geri Dön</span>
            </button>
         </div>

         {/* RENDER ACTIVE STYLE SELECTION */}
         {activeStyle === 'standard' && renderStandardView()}
         {activeStyle === 'tournament' && renderTournamentView()}
         {activeStyle === 'game_special' && renderGameSpecialView()}

         {/* Participants - COMMON FOR ALL STYLES (Kept at bottom) */}
         <div className="max-w-[1280px] mx-auto px-4 mt-8">
            <div className="bg-armoyu-card-bg rounded-[32px] p-6 md:p-8 border border-white/5 shadow-2xl space-y-6">
               <div className="flex items-center justify-between gap-4">
                  <h3 className="text-[12px] font-black text-white uppercase tracking-[0.3em] italic border-l-4 border-armoyu-primary pl-4">KATILIMCILAR</h3>
                  <div className="flex items-center gap-3">
                     <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-armoyu-primary/10 rounded-xl border border-armoyu-primary/20 text-armoyu-primary text-[8px] font-black uppercase tracking-widest italic">
                        <Users size={12} />
                        {participants.individuals.length + participants.groups.length} KATILIM
                     </div>
                     <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5 scale-90">
                        <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-armoyu-primary text-white shadow-lg' : 'text-armoyu-text-muted'}`}>
                           <LayoutGrid size={14} />
                        </button>
                        <button onClick={() => setViewMode('table')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'table' ? 'bg-armoyu-primary text-white shadow-lg' : 'text-armoyu-text-muted'}`}>
                           <List size={14} />
                        </button>
                     </div>
                  </div>
               </div>

               <div className="space-y-12">
                  {/* Individuals */}
                  {participants.individuals.length > 0 && (
                     <div className="space-y-4">
                        <h4 className="text-[8px] font-black text-armoyu-text-muted uppercase tracking-[0.4em] opacity-60">OYUNCULAR</h4>
                        {viewMode === 'grid' ? (
                           <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
                              {participants.individuals.map((p: any) => (
                                 <div 
                                    key={p.id} 
                                    onClick={() => router.push(`/oyuncu/${p.username}`)}
                                    className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-2xl border border-white/5 hover:border-armoyu-primary/30 transition-all group text-center cursor-pointer active:scale-95"
                                 >
                                    <img src={p.avatar} className="w-10 h-10 rounded-xl border border-white/5" alt="" />
                                    <span className="text-[9px] font-black text-armoyu-text uppercase tracking-tighter truncate w-full group-hover:text-armoyu-primary transition-colors">{p.name || p.username}</span>
                                 </div>
                              ))}
                           </div>
                        ) : (
                           <div className="bg-black/20 rounded-2xl border border-white/5 overflow-hidden shadow-xl">
                              <table className="w-full text-left">
                                 <thead>
                                    <tr className="border-b border-white/5 bg-white/5">
                                       <th className="px-4 py-3 text-[8px] font-black text-armoyu-text-muted uppercase tracking-widest italic">Oyuncu</th>
                                       <th className="px-4 py-3 text-[8px] font-black text-armoyu-text-muted uppercase tracking-widest italic text-right">Durum</th>
                                    </tr>
                                 </thead>
                                 <tbody className="divide-y divide-white/5">
                                    {participants.individuals.map((p: any) => (
                                       <tr key={p.id} onClick={() => router.push(`/oyuncu/${p.username}`)} className="hover:bg-white/5 transition-all cursor-pointer group">
                                          <td className="px-4 py-2.5">
                                             <div className="flex items-center gap-3">
                                                <img src={p.avatar} className="w-8 h-8 rounded-lg border border-white/5" alt="" />
                                                <div className="flex flex-col">
                                                   <span className="text-[11px] font-black text-white uppercase tracking-tight group-hover:text-armoyu-primary transition-colors">{p.name || p.username}</span>
                                                   <span className="text-[8px] font-bold text-armoyu-text-muted uppercase tracking-widest opacity-60 italic">Bireysel</span>
                                                </div>
                                             </div>
                                          </td>
                                          <td className="px-4 py-2.5 text-right">
                                             <span className="text-[8px] font-black text-armoyu-primary uppercase tracking-widest italic bg-armoyu-primary/10 px-3 py-1 rounded-full border border-armoyu-primary/20">KATILDI</span>
                                          </td>
                                       </tr>
                                    ))}
                                 </tbody>
                              </table>
                           </div>
                        )}
                     </div>
                  )}

                  {/* Groups */}
                  {participants.groups.length > 0 && (
                     <div className="space-y-4">
                        <h4 className="text-[8px] font-black text-armoyu-text-muted uppercase tracking-[0.4em] opacity-60">GRUPLAR</h4>
                        
                        {viewMode === 'grid' ? (
                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {participants.groups.map((g: any) => (
                                 <div key={g.id} onClick={() => router.push(`/grup/${g.shortName}`)} className="group bg-armoyu-card-bg rounded-2xl border border-white/5 overflow-hidden shadow-xl hover:border-armoyu-primary/30 transition-all cursor-pointer active:scale-[0.98]">
                                    <div className="relative h-16 overflow-hidden">
                                       {g.banner ? <img src={g.banner} className="w-full h-full object-cover opacity-20" alt="" /> : <div className="w-full h-full bg-gradient-to-r from-armoyu-primary/20 to-indigo-600/20" />}
                                       <div className="absolute inset-0 bg-gradient-to-t from-armoyu-card-bg to-transparent" />
                                    </div>
                                    <div className="relative px-4 -mt-8 mb-3 flex items-end gap-3">
                                       <img src={g.logo} className="w-10 h-10 rounded-xl bg-armoyu-card-bg p-0.5 border border-white/10 shadow-xl" alt="" />
                                       <div className="pb-0.5 min-w-0">
                                          <h5 className="text-[12px] font-black text-white uppercase italic tracking-tighter leading-none truncate group-hover:text-armoyu-primary transition-colors">{g.name}</h5>
                                          <span className="text-[8px] font-bold text-armoyu-primary uppercase tracking-widest italic">{g.shortName}</span>
                                       </div>
                                    </div>
                                    <div className="px-4 pb-4">
                                       <div className="bg-black/20 rounded-xl border border-white/5 overflow-hidden">
                                          <table className="w-full text-left">
                                             <tbody className="divide-y divide-white/5">
                                                {g.players.slice(0, 3).map((p: any) => (
                                                   <tr 
                                                      key={p.id} 
                                                      onClick={(e) => {
                                                         e.stopPropagation();
                                                         router.push(`/oyuncu/${p.username || p.name}`);
                                                       }}
                                                      className="hover:bg-white/5 cursor-pointer transition-colors group/player"
                                                   >
                                                      <td className="px-3 py-1.5 flex items-center gap-2 text-[9px] font-black text-white/80 uppercase truncate">
                                                         <img src={p.avatar} className="w-5 h-5 rounded-md border border-white/5 object-cover" alt="" />
                                                         <span className="truncate group-hover/player:text-armoyu-primary transition-colors">{p.name}</span>
                                                      </td>
                                                      <td className="px-3 py-1.5 text-right text-[7px] font-black text-armoyu-text-muted uppercase italic opacity-60">{p.role || 'Oyuncu'}</td>
                                                   </tr>
                                                ))}
                                             </tbody>
                                          </table>
                                       </div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        ) : (
                           <div className="bg-black/20 rounded-2xl border border-white/5 overflow-hidden shadow-xl">
                              <table className="w-full text-left">
                                 <thead>
                                    <tr className="border-b border-white/5 bg-white/5">
                                       <th className="px-4 py-3 text-[8px] font-black text-armoyu-text-muted uppercase tracking-widest italic">Grup</th>
                                       <th className="px-4 py-3 text-[8px] font-black text-armoyu-text-muted uppercase tracking-widest italic">Kısaltma</th>
                                       <th className="px-4 py-3 text-[8px] font-black text-armoyu-text-muted uppercase tracking-widest italic text-right">Oyuncu Sayısı</th>
                                    </tr>
                                 </thead>
                                 <tbody className="divide-y divide-white/5">
                                    {participants.groups.map((g: any) => (
                                       <tr key={g.id} onClick={() => router.push(`/grup/${g.shortName}`)} className="hover:bg-white/5 transition-all cursor-pointer group">
                                          <td className="px-4 py-2.5">
                                             <div className="flex items-center gap-3">
                                                <img src={g.logo} className="w-8 h-8 rounded-lg border border-white/5" alt="" />
                                                <span className="text-[11px] font-black text-white uppercase tracking-tight group-hover:text-armoyu-primary transition-colors truncate">{g.name}</span>
                                             </div>
                                          </td>
                                          <td className="px-4 py-2.5">
                                             <span className="text-[9px] font-black text-armoyu-primary uppercase italic">{g.shortName}</span>
                                          </td>
                                          <td className="px-4 py-2.5 text-right">
                                             <span className="text-[10px] font-black text-white uppercase tracking-tighter bg-white/5 px-3 py-1 rounded-full border border-white/5">{g.players.length} OYUNCU</span>
                                          </td>
                                       </tr>
                                    ))}
                                 </tbody>
                              </table>
                           </div>
                        )}
                     </div>
                  )}
               </div>
            </div>
         </div>

         {/* DEV SELECTION CONTROLS */}
         <div className="fixed bottom-6 right-6 z-[500] bg-black/90 border border-white/20 p-4 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col gap-3">
            <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">🛠️ GELİŞTİRİCİ TASARIM SEÇİMİ</span>
            <div className="flex gap-2">
               <button 
                  onClick={() => setActiveStyle('standard')}
                  className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase transition-all ${activeStyle === 'standard' ? 'bg-armoyu-primary text-white shadow-lg' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
               >
                  Standart
               </button>
               {(
                  (event?.gameName || '').toLowerCase().includes('counter-strike') ||
                  (event?.gameName || '').toLowerCase().includes('cs') ||
                  (event?.gameName || '').toLowerCase().includes('league of legends') ||
                  (event?.gameName || '').toLowerCase() === 'lol' ||
                  (event?.gameName || '').toLowerCase().includes('assetto') ||
                  (event?.gameName || '').toLowerCase().includes('okey') ||
                  (event?.gameName || '').toLowerCase().includes('futbol') ||
                  (event?.gameName || '').toLowerCase().includes('football') ||
                  (event?.gameName || '').toLowerCase().includes('soccer')
               ) && (
                  <button 
                     onClick={() => setActiveStyle('tournament')}
                     className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase transition-all ${activeStyle === 'tournament' ? 'bg-amber-500 text-black shadow-lg' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                  >
                     Turnuva
                  </button>
               )}
               <button 
                  onClick={() => setActiveStyle('game_special')}
                  className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase transition-all ${activeStyle === 'game_special' ? 'bg-red-500 text-white shadow-lg' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
               >
                  Oyuna Özel
               </button>
            </div>
         </div>
      </div>
   );
};

export default DetailPage;
