import { ArmoyuEvent } from '../../models/community/ArmoyuEvent';
import { Game } from '../../models/social/gaming/Game';
import { Station, StationProduct, WorkstationEquipment, StationCoupon } from '../../models/community/Station';


/**
 * GAMES (gameList)
 */
export const gameList: Game[] = [
  new Game({ id: '1', title: 'Counter Strike 2', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80' }),
  new Game({ id: '2', title: 'Valorant', logo: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80' }),
  new Game({ id: '3', title: 'League of Legends', logo: 'https://images.unsplash.com/photo-1542751163-44203649479e?w=800&q=80' }),
  new Game({ id: '4', title: 'Minecraft', logo: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80' }),
  new Game({ id: '5', title: 'Euro Truck Simulator 2', logo: 'https://images.unsplash.com/photo-1601584115167-0effcb193f0c?w=800&q=80' }),
  new Game({ id: '6', title: 'GTA V', logo: 'https://images.unsplash.com/photo-1605898399783-1820b7f53631?w=800&q=80' }),
  new Game({ id: '7', title: 'Assetto Corsa', logo: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80' }),
  new Game({ id: '8', title: 'PUBG', logo: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80' }),
  new Game({ id: '9', title: 'Dota 2', logo: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80' }),
  new Game({ id: '10', title: 'Rocket League', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80' }),
];

/**
 * EVENTS (eventList)
 */
export const eventList: ArmoyuEvent[] = [
  new ArmoyuEvent({
    id: 1,
    name: 'CS2 Wingman Turnuvası',
    gameName: 'Counter Strike 2',
    status: 1,
    type: 'BOTH',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80',
    date: '20 Nisan 2026, 20:00',
    location: 'ARMOYU Sunucuları',
    participantLimit: 16,
    currentParticipants: 8,
    description: 'Yoldaşını al gel, CS2 sahalarında en iyi ikili kim belli olsun!',
  }),
  new ArmoyuEvent({
    id: 2,
    name: 'ARMOYU LoL: Pro League Sezon 4',
    gameName: 'League of Legends',
    status: 1,
    type: 'GROUP',
    thumbnail: 'https://images.unsplash.com/photo-1542751163-44203649479e?q=80&w=1600',
    date: '04 Nisan 2026, 21:00',
    location: 'ARMOYU Arena / Online',
    participantLimit: 16,
    currentParticipants: 16,
    description: 'Türkiye\'nin en iyi 16 e-spor takımının kıran kırana mücadelesi! Sezonun son haftasına girilirken şampiyonluk yarışı kızışıyor. MVP ödülü için Berkay ve MythX arasındaki çekişme tüm hızıyla devam ediyor!',
  }),
  new ArmoyuEvent({
    id: 3,
    name: 'Valorant Bahar Kupası',
    gameName: 'Valorant',
    status: 1,
    type: 'BOTH',
    thumbnail: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1600&q=80',
    date: '15 Mayıs 2026, 19:00',
    location: 'ARMOYU Discord Sahnesi',
    participantLimit: 100,
    currentParticipants: 0,
    description: 'Baharın gelişini harika bir Valorant şöleni ile kutluyoruz.',
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
