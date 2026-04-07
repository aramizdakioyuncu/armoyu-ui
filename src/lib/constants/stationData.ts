import { ArmoyuEvent, Game, Station, StationProduct, WorkstationEquipment, StationCoupon } from '@armoyu/core';


/**
 * GAMES (gameList)
 */
export const gameList: Game[] = [
  new Game({ id: '1', name: 'Counter Strike 2', poster: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80' }),
  new Game({ id: '2', name: 'Valorant', poster: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80' }),
  new Game({ id: '3', name: 'League of Legends', poster: 'https://images.unsplash.com/photo-1542751163-44203649479e?w=800&q=80' }),
  new Game({ id: '4', name: 'Minecraft', poster: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80' }),
  new Game({ id: '5', name: 'Euro Truck Simulator 2', poster: 'https://images.unsplash.com/photo-1601584115167-0effcb193f0c?w=800&q=80' }),
  new Game({ id: '6', name: 'GTA V', poster: 'https://images.unsplash.com/photo-1605898399783-1820b7f53631?w=800&q=80' }),
  new Game({ id: '7', name: 'Assetto Corsa', poster: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80' }),
  new Game({ id: '8', name: 'PUBG', poster: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80' }),
  new Game({ id: '9', name: 'Dota 2', poster: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80' }),
  new Game({ id: '10', name: 'Rocket League', poster: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80' }),
];

/**
 * EVENTS (eventList)
 */
export const eventList: ArmoyuEvent[] = [
  new ArmoyuEvent({
    id: 'cs2-wingman-tr',
    title: 'CS2 Wingman Turnuvası',
    game: 'Counter Strike 2',
    status: 'Kayıtlar Açık',
    participationType: 'BOTH',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80',
    date: '20 Nisan 2026, 20:00',
    location: 'ARMOYU Sunucuları',
    participantLimit: 16,
    currentParticipants: 8,
    isHot: true,
    rewards: 'AWP | Atheris Skin',
    description: 'Yoldaşını al gel, CS2 sahalarında en iyi ikili kim belli olsun!',
    minODP: 40
  }),
  new ArmoyuEvent({
    id: 'armoyu-pro-league',
    title: 'ARMOYU LoL: Pro League Sezon 4',
    game: 'League of Legends',
    status: 'DEVAM EDİYOR',
    participationType: 'GROUP',
    template: 'TOURNAMENT',
    hasStats: true,
    banner: 'https://images.unsplash.com/photo-1542751163-44203649479e?q=80&w=1600',
    date: '04 Nisan 2026, 21:00',
    location: 'ARMOYU Arena / Online',
    participantLimit: 16,
    currentParticipants: 16,
    isHot: true,
    isLive: true,
    rewards: '50.000 TL Nakit + ARMOYU Pro Lisansı',
    description: 'Türkiye\'nin en iyi 16 e-spor takımının kıran kırana mücadelesi! Sezonun son haftasına girilirken şampiyonluk yarışı kızışıyor. MVP ödülü için Berkay ve MythX arasındaki çekişme tüm hızıyla devam ediyor!',
    minODP: 60,
    admins: [
      { name: 'Berkay Tikenoğlu', role: 'Baş Hakem', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay' },
      { name: 'MythX', role: 'Organizasyon Sorumlusu', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MythX' }
    ],
    teams: [
      { id: 't1', name: 'Shadow Ninjas', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Shadow', played: 14, won: 12, lost: 2, points: 36, streak: ['W', 'W', 'W', 'L', 'W'] },
      { id: 't2', name: 'Neon Wizards', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Neon', played: 14, won: 11, lost: 3, points: 33, streak: ['W', 'W', 'L', 'W', 'W'] },
      { id: 't3', name: 'Iron Valkyries', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Iron', played: 14, won: 10, lost: 4, points: 30, streak: ['L', 'W', 'W', 'W', 'L'] },
      { id: 't4', name: 'Cyber Phantoms', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Cyber', played: 14, won: 9, lost: 5, points: 27, streak: ['W', 'L', 'W', 'L', 'W'] },
      { id: 't5', name: 'Runic Storm', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Runic', played: 14, won: 8, lost: 6, points: 24, streak: ['W', 'W', 'L', 'W', 'L'] },
      { id: 't6', name: 'Void Walkers', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Void', played: 14, won: 8, lost: 6, points: 24, streak: ['L', 'L', 'W', 'W', 'W'] },
      { id: 't7', name: 'Solar Flare', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Solar', played: 14, won: 7, lost: 7, points: 21, streak: ['W', 'L', 'L', 'W', 'L'] },
      { id: 't8', name: 'Frost Giants', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Frost', played: 14, won: 7, lost: 7, points: 21, streak: ['L', 'W', 'W', 'L', 'W'] },
      { id: 't9', name: 'Cobra Kai', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Cobra', played: 14, won: 6, lost: 8, points: 18, streak: ['W', 'L', 'W', 'L', 'L'] },
      { id: 't10', name: 'Titan Force', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Titan', played: 14, won: 6, lost: 8, points: 18, streak: ['L', 'W', 'L', 'L', 'W'] },
      { id: 't11', name: 'Phoenix Reborn', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Phoenix', played: 14, won: 5, lost: 9, points: 15, streak: ['W', 'L', 'L', 'W', 'L'] },
      { id: 't12', name: 'Apex Predators', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Apex', played: 14, won: 5, lost: 9, points: 15, streak: ['L', 'L', 'W', 'L', 'W'] },
      { id: 't13', name: 'Inferno Squad', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Inferno', played: 14, won: 4, lost: 10, points: 12, streak: ['L', 'W', 'L', 'W', 'L'] },
      { id: 't14', name: 'Ghost Protocol', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Ghost', played: 14, won: 4, lost: 10, points: 12, streak: ['W', 'L', 'L', 'L', 'L'] },
      { id: 't15', name: 'Vortex Legion', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Vortex', played: 14, won: 3, lost: 11, points: 9, streak: ['L', 'L', 'L', 'W', 'L'] },
      { id: 't16', name: 'Zenith Zero', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Zenith', played: 14, won: 2, lost: 12, points: 6, streak: ['L', 'L', 'W', 'L', 'L'] }
    ],
    leaderboard: [
      { rank: 1, player: 'Berkay Tikenoğlu', team: 'Shadow Ninjas', kills: 245, deaths: 85, assists: 120, points: 3450, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay' },
      { rank: 2, player: 'MythX', team: 'Neon Wizards', kills: 232, deaths: 92, assists: 145, points: 3200, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MythX' },
      { rank: 3, player: 'GlobalElite', team: 'Iron Valkyries', kills: 210, deaths: 105, assists: 88, points: 2950, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Global' },
      { rank: 4, player: 'KralSlayer', team: 'Cyber Phantoms', kills: 198, deaths: 112, assists: 65, points: 2700, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kral' },
      { rank: 5, player: 'NinjaX', team: 'Void Walkers', kills: 185, deaths: 98, assists: 130, points: 2650, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ninja' }
    ]
  }),
  new ArmoyuEvent({
    id: 'val-bahar-kupasi',
    title: 'Valorant Bahar Kupası',
    game: 'Valorant',
    status: 'Yeni',
    participationType: 'BOTH',
    banner: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1600&q=80',
    date: '15 Mayıs 2026, 19:00',
    location: 'ARMOYU Discord Sahnesi',
    participantLimit: 100,
    currentParticipants: 0,
    isHot: false,
    rewards: '5.000 VP Havuzu',
    description: 'Baharın gelişini harika bir Valorant şöleni ile kutluyoruz.',
    minODP: 20
  })
];

/**
 * STATIONS (stationList)
 */
export const stationList: Station[] = [
  new Station({
    id: '1',
    name: 'Zerdüşt Coffee & Food',
    slug: 'zerdust-coffee',
    type: 'YEMEK',
    description: 'Şehrin en iyi kahvesi ve atıştırmalıkları burada!',
    location: 'Beşiktaş, İstanbul',
    rating: 4.8,
    reviewCount: 156,
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Zerdust',
    banner: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=400',
    products: [
      new StationProduct({ id: 'p1', name: 'Americano', price: 65, category: 'Kahve' }),
      new StationProduct({ id: 'p3', name: 'Oyuncu Burger', price: 185, category: 'Yemek', isDeal: true, discountRate: '%15' }),
    ],
    coupons: [
      new StationCoupon({ code: 'ARMOYU10', discount: '%10', expiryDate: '01.01.2027', description: 'Tüm kahvelerde geçerli!' })
    ]
  }),
  new Station({
    id: '2',
    name: 'ARMOYU Elite Gaming Center',
    slug: 'armoyu-elite-gaming',
    type: 'INTERNET_KAFE',
    description: 'En son teknoloji PCler ve profesyonel ekipmanlar.',
    location: 'Kadıköy, İstanbul',
    rating: 4.9,
    reviewCount: 842,
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=ARMOYU',
    banner: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1200&h=400',
    equipment: [
      new WorkstationEquipment({
        id: 'eq1',
        name: 'VIP Streaming Odası',
        cpu: 'Intel Core i9-14900K',
        gpu: 'NVIDIA RTX 4090',
        ram: '64GB DDR5',
        monitor: 'ASUS ROG 540Hz'
      })
    ],
    pricing: [
      { label: 'Saati', price: 35, unit: 'saat' }
    ]
  }),
  new Station({
    id: '3',
    name: 'Arena Halı Saha',
    slug: 'arena-hali-saha',
    type: 'HALI_SAHA',
    description: 'Yapay çim, duş imkanı ve kantin.',
    location: 'Şişli, İstanbul',
    rating: 4.5,
    reviewCount: 215,
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Arena',
    banner: 'https://images.unsplash.com/photo-1529900903114-93da367104e7?w=1200&h=400',
    facilities: ['Otopark', 'Duş', 'Kantin'],
    pricing: [
      { label: 'Gündüz (1 Saat)', price: 800, unit: 'seans' }
    ]
  })
];
