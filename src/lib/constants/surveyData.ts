import { Survey } from '../../models/community/Survey';
import { SurveyAnswer } from '../../models/community/SurveyAnswer';


// Assuming we need userList from seedData, but let's define some IDs locally 
// to avoid circular dependencies if we move it. 
// For now, let's just use the existing author objects from what we know.

export const MOCK_SURVEYS_DATA = (userList: any[]): Survey[] => [
  new Survey({
    id: 's1',
    question: 'Bir sonraki turnuva hangi oyunda olmalı?',
    description: 'Topluluk haftalık turnuvaları için oyun seçimi yapıyoruz. Oyununuzu kullanın!',
    createdAt: '2 gün önce',
    expiresAt: '2024-05-10',
    author: userList[0],
    options: [
      new SurveyAnswer({ id: 'o1', text: 'Counter-Strike 2', votes: 145 }),
      new SurveyAnswer({ id: 'o2', text: 'League of Legends', votes: 89 }),
      new SurveyAnswer({ id: 'o3', text: 'Valorant', votes: 210 }),
      new SurveyAnswer({ id: 'o4', text: 'Rocket League', votes: 42 }),
    ],
    hasVoted: true,
    myVoteId: 'o3'
  }),
  new Survey({
    id: 's2',
    question: 'ARMOYU V3 tasarımı hakkında ne düşünüyorsunuz?',
    description: 'Yeni nesil arayüzümüz hakkındaki görüşleriniz bizim için çok değerli. Lütfen puan verin!',
    createdAt: '5 saat önce',
    author: userList[0],
    options: [
      new SurveyAnswer({ id: 'o1', text: 'Mükemmel, çok modern!', votes: 450 }),
      new SurveyAnswer({ id: 'o2', text: 'Güzel ama gelişmesi gereken yerler var.', votes: 65 }),
      new SurveyAnswer({ id: 'o3', text: 'Eskisi daha iyiydi.', votes: 12 }),
    ],
    hasVoted: false
  }),
  new Survey({
    id: 's3',
    question: 'Yazılım ekibimize yeni üyeler katılmalı mı?',
    description: 'Genişleyen projelerimiz için yeni yetenekler arıyoruz.',
    createdAt: '1 gün önce',
    expiresAt: '2024-04-30',
    author: userList[1],
    options: [
      new SurveyAnswer({ id: 'o1', text: 'Evet, daha hızlı ilerleriz.', votes: 210 }),
      new SurveyAnswer({ id: 'o2', text: 'Hayır, şu anki ekip yeterli.', votes: 45 }),
    ],
    hasVoted: true,
    myVoteId: 'o1'
  })
];

