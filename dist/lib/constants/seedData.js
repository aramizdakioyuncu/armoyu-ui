import { User, Post, Role, Group, Notification, NotificationSender, Product, Note, Story, News, Mod, Forum, Giveaway, Project, Chat, ChatMessage, Session } from '@armoyu/core';
import { SUPER_LEAGUE_TEAMS } from './teamData';
// Modular data imports
export * from './stationData';
export * from './surveyData';
export * from './educationData';
/**
 * Common Roles
 */
export const roles = {
    admin: new Role({ id: 'admin', name: 'Kurucu', color: '#ff4d4d' }),
    memberMgmt: new Role({ id: 'member_mgmt', name: 'Üye Yönetim', color: '#ff4d4d' }),
    discipline: new Role({ id: 'discipline', name: 'Düzen Ve Disiplin Yönetim', color: '#ff4d4d' }),
    eventMgmt: new Role({ id: 'event_mgmt', name: 'Etkinlik Yönetim', color: '#ff4d4d' }),
    assettoOfficial: new Role({ id: 'assetto_official', name: 'Oyun Yetkilisi (Assetto Corsa)', color: '#3b82f6' }),
    mcOfficial: new Role({ id: 'mc_official', name: 'Oyun Yetkilisi (Minecraft)', color: '#3b82f6' }),
    responsible: new Role({ id: 'responsible', name: 'Sorumlu', color: '#3b82f6' }),
    gameDev: new Role({ id: 'game_dev', name: 'Oyun Geliştiricisi', color: '#10b981' }),
    softwareDev: new Role({ id: 'software_dev', name: 'Yazılım Geliştirici', color: '#10b981' }),
    frontendDev: new Role({ id: 'frontend_dev', name: 'Frontend Developer', color: '#10b981' }),
    backendDev: new Role({ id: 'backend_dev', name: 'Backend Developer', color: '#10b981' }),
    fullstackDev: new Role({ id: 'fullstack_dev', name: 'Full Stack Developer', color: '#10b981' }),
    streamerContent: new Role({ id: 'streamer_content', name: 'Streamer / Content', color: '#a855f7' }),
    streamerGaming: new Role({ id: 'streamer_gaming', name: 'Streamer / Gaming', color: '#a855f7' }),
    streamer: new Role({ id: 'streamer', name: 'Yayıncı', color: '#a855f7' }),
    esports: new Role({ id: 'esports', name: 'E-Sporcu', color: '#f97316' }),
    user: new Role({ id: 'user', name: 'Kullanıcı', color: '#808080' }),
    qualified: new Role({ id: 'qualified', name: 'Nitelikli Oyuncu', color: '#4ade80' }),
};
/**
 * Community Room Constant (Plain data for constructor)
 */
const TOPLULUK_ODASI_DATA = {
    id: 'community-room',
    name: 'Topluluk Odası',
    avatar: 'https://cdn.pixabay.com/photo/2017/02/13/11/44/community-2062409_1280.png',
    time: 'Canlı',
    unreadCount: 42,
    isOnline: true,
    lastSeen: 'Şu an aktif',
    participants: [],
    messages: [
        new ChatMessage({ id: 'c1', sender: new User({ displayName: 'Sistem', avatar: 'https://cdn.pixabay.com/photo/2017/02/13/11/44/community-2062409_1280.png' }), content: 'Topluluk Odası Sohbetine Hoş Geldiniz!', timestamp: 'Hep', isSystem: true }),
        new ChatMessage({ id: 'c2', sender: new User({ displayName: 'Alperen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alperen' }), content: 'Selamlar herkese!', timestamp: '10:00', isSystem: false }),
        new ChatMessage({ id: 'c3', sender: new User({ displayName: 'Berkay', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay' }), content: 'V3 yakında yayında!', timestamp: '10:05', isSystem: false })
    ]
};
// Add lastMessage dynamically
const TOPLULUK_ODASI = new Chat({
    ...TOPLULUK_ODASI_DATA,
    lastMessage: TOPLULUK_ODASI_DATA.messages[2],
    updatedAt: Date.now(),
    isGroup: true
});
/**
 * Seed data for Groups (Guilds/Communities)
 */
export const groupList = [
    new Group({
        name: 'RIHTIM',
        shortName: 'RTM',
        description: 'Denizin verdiği huzur ile içinizi ferahlatacak bir yaşam sizi bekliyor. Topluluğumuzda huzur ve eğlence bir arada.',
        recruitment: '16 Alım Açık',
        date: '13.03.2022',
        category: 'E-Spor/Takım',
        tag: 'Minecraft',
        banner: 'https://images.unsplash.com/photo-1587573089734-09cb6960951b?q=80&w=2672&auto=format&fit=crop',
        logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Rihtim'
    }),
    new Group({
        name: 'CODE MASTERS',
        shortName: 'CODE',
        description: 'Yazılım geliştirme tutkunlarının bir araya geldiği, projelerin havada uçuştuğu dinamik bir topluluk.',
        recruitment: '5 Alım Açık',
        date: '01.01.2023',
        category: 'Yazılım',
        tag: 'Next.js',
        banner: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop',
        logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Code'
    }),
    new Group({
        name: 'FAST FIVE',
        shortName: 'F5',
        description: 'Valorant rekabetçi dünyasında zirveyi hedefleyen, disiplinli ve yetenekli oyuncuların buluşma noktası.',
        recruitment: '2 Alım Açık',
        date: '15.05.2023',
        category: 'E-Spor/Takım',
        tag: 'Valorant',
        banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop',
        logo: 'https://api.dicebear.com/7.x/bottts/svg?seed=Fast'
    }),
    new Group({
        name: 'GREEN COURT',
        shortName: 'GRN',
        description: 'Tenis ve açık hava sporlarını sevenler için haftalık turnuvalar ve antrenman grupları düzenliyoruz.',
        recruitment: 'Sınırsız',
        date: '10.10.2022',
        category: 'Spor',
        tag: 'Tenis',
        banner: 'https://images.unsplash.com/photo-1595435064212-c441821ac9ac?q=80&w=2670&auto=format&fit=crop',
        logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Green'
    }),
    new Group({
        name: 'İttihat ve Terakki',
        shortName: 'İttihat',
        description: 'İttihat Ruhu! Köklü geçmişimizle sahalarda ve her alanda mücadeleye devam ediyoruz.',
        recruitment: '25 Alım Açık',
        date: '22.05.2024',
        category: 'Spor/Takım',
        tag: 'Futbol',
        banner: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2670&auto=format&fit=crop',
        logo: 'https://api.dicebear.com/7.x/initials/svg?seed=IT'
    }),
    new Group({
        name: 'CZAL Hack Team',
        shortName: 'CZAL HT',
        description: 'Türk Yazılımcı ve Robotikciler ile toplandık Kendimizi Geliştirmek için çaba gösteriyoruz Biz Fatsa Cahit Zarifoğlu Anadolu Lisesinde kurulduk ve çalışmalarımıza devam ediyoruz sende bize katılmak istersen bize mail atabilirsin Okulumuzu İnternette araştırabilirsiniz.',
        recruitment: '19 Alım Kapalı',
        date: '14.10.2018',
        category: 'Yazılım',
        tag: 'Robotik Kodlama',
        banner: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2669&auto=format&fit=crop',
        logo: 'https://api.dicebear.com/7.x/bottts/svg?seed=CZAL'
    })
];
/**
 * Seed data for users (Team Members)
 */
export const userList = [
    // YÖNETİM EKİBİ
    new User({ displayName: 'Berkay Tikenoğlu', role: roles.admin, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay', username: 'berkaytikenoglu', verified: true, bio: 'ARMOYU Kurucusu & Yazılım Geliştirici', level: 99, xp: 5000, popScore: 15000, groups: [groupList[0], groupList[1], groupList[5]], favoriteTeam: SUPER_LEAGUE_TEAMS[1], zodiac: 'Akrep', punishmentCount: 0, distrustScore: 1.0, odp: 90 }),
    new User({ displayName: 'MythX', role: roles.memberMgmt, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MythX', username: 'mythx', verified: true, level: 85, xp: 3200, popScore: 12500, groups: [groupList[1], groupList[2]], punishmentCount: 2, distrustScore: 1.2, odp: 75 }),
    new User({ displayName: 'Barış Müftüoğlu', role: roles.discipline, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Baris', username: 'barismuftuoglu', verified: true, level: 82, xp: 2800, popScore: 11000, groups: [groupList[3]], punishmentCount: 5, distrustScore: 1.5, odp: 45 }),
    new User({ displayName: 'Bey Ev', role: roles.eventMgmt, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Beytullah', username: 'beyev', verified: true, level: 80, xp: 2500, popScore: 10500, punishmentCount: 0, odp: 80 }),
    // SORUMLULAR
    new User({ displayName: 'Yılmaz Akşahin', role: roles.assettoOfficial, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yilmaz', username: 'yilmazaksahin', level: 65, popScore: 8500, punishmentCount: 0 }),
    new User({ displayName: 'Orkun Atılgan', role: roles.mcOfficial, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Orkun', username: 'orkunatilgan', level: 68, popScore: 9200, punishmentCount: 0 }),
    new User({ displayName: 'Furkan Sarıdiken', role: roles.responsible, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Furkan', username: 'furkansaridiken', level: 60, popScore: 7800, punishmentCount: 9, distrustScore: 3.0 }),
    new User({ displayName: 'Burakcan TOPAL', role: roles.responsible, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Burakcan', username: 'burakcantopal', level: 58, popScore: 7500 }),
    // YAZILIM VE GELİŞTİRME
    new User({ displayName: 'Burak Erel', role: roles.gameDev, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Burak', username: 'burakerel', level: 75, popScore: 9800, groups: [groupList[0]] }),
    new User({ displayName: 'Engin Kuşkovan', role: roles.softwareDev, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Engin', username: 'enginkuskovan', level: 72, popScore: 9400 }),
    new User({ displayName: 'Nariman Rustamli', role: roles.softwareDev, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nariman', username: 'narimanrustamli', level: 70, popScore: 9000 }),
    new User({ displayName: 'Ersan Güvenç', role: roles.qualified, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ersan', username: 'ersanguvenc', level: 70, popScore: 8900 }),
    new User({ displayName: 'Oğuzhan Seslikaya', role: roles.qualified, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Oguzhan', username: 'oguzhanseslikaya', level: 70, popScore: 8850 }),
    new User({ displayName: 'Ömer Efe Dikici', role: roles.frontendDev, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Efe', username: 'omerefedikici', level: 78, popScore: 10200 }),
    new User({ displayName: 'Ömer Faruk Sayın', role: roles.backendDev, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Faruk', username: 'omerfaruksayin', level: 77, popScore: 10100 }),
    new User({ displayName: 'Emre Sandal', role: roles.fullstackDev, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emre', username: 'emresandal', level: 79, popScore: 10300 }),
    // YAYINCILAR
    new User({ displayName: 'Metehan Çakır', role: roles.streamerContent, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Metehan', username: 'metehancakir', level: 88, popScore: 13500 }),
    new User({ displayName: 'Bartu Başaran', role: roles.streamerGaming, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bartu', username: 'bartubasaran', level: 86, popScore: 12800 }),
    new User({ displayName: 'Erhan', role: roles.streamer, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Erhan', username: 'erhan', level: 84, popScore: 12200 }),
    // E-SPOR LİSANSLI OYUNCULAR
    new User({ displayName: 'Gabriel Eren Gümüşdal', role: roles.esports, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gabriel', username: 'gabrieleren', level: 92, popScore: 14200 }),
    // Nitelikli Oyuncular
    new User({ displayName: 'Emir K.', role: roles.esports, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EmirK', username: 'emir', level: 92, popScore: 14200 }),
    new User({ displayName: 'Tugra', role: roles.esports, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tugra', username: 'tugra', level: 92, popScore: 14200 })
];
// Generate 100 additional mock users
const firstNames = ['Ahmet', 'Mehmet', 'Can', 'Deniz', 'Selin', 'Elif', 'Burak', 'Oğuz', 'Hakan', 'Ayşe', 'Fatma', 'Gökhan', 'Emre', 'Zeynep', 'Kaan'];
const lastNames = ['Yılmaz', 'Kaya', 'Demir', 'Çelik', 'Şahin', 'Yıldız', 'Öztürk', 'Aydın', 'Özkan', 'Arslan', 'Bulut', 'Yavuz', 'Koç', 'Kurt', 'Aksoy'];
for (let i = 0; i < 100; i++) {
    const fName = firstNames[i % firstNames.length];
    const lName = lastNames[i % lastNames.length];
    userList.push(new User({
        id: `u-${i + 200}`,
        username: `${fName.toLowerCase()}${lName.toLowerCase()}${i}`,
        displayName: `${fName} ${lName}`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${fName}${lName}${i}`,
        role: roles.user,
        verified: false,
        level: Math.floor(Math.random() * 50) + 1,
        xp: Math.floor(Math.random() * 1000),
        popScore: Math.floor(Math.random() * 5000),
        bio: `Ben ${fName}, aramizdakioyuncu.com topluluğunun bir üyesiyim! Herkese selamlar. 👋`,
        groups: [],
        friends: [],
        punishmentCount: i % 10 === 0 ? Math.floor(Math.random() * 10) : 0,
        distrustScore: 1.0,
        odp: Math.floor(Math.random() * 100)
    }));
}
/**
 * Mock Surveys Data
 */
import { MOCK_SURVEYS_DATA } from './surveyData';
export const MOCK_SURVEYS = MOCK_SURVEYS_DATA(userList);
export const surveyList = MOCK_SURVEYS;
import { MOCK_EDUCATION_DATA } from './educationData';
const edu = MOCK_EDUCATION_DATA(userList);
export const schoolList = edu.schools;
export const facultyList = edu.faculties;
export const schoolTeamList = edu.teams;
export const classroomList = edu.classrooms;
// Global Networking (Friends & Chats)
const possibleMessages = [
    'Sunucuya reset atıyorum...',
    'Akşam CS2 giriyor muyuz?',
    'Bildiriminiz çözüme ulaştı.',
    'Yeni güncellemeyi gördün mü?',
    'Selam, müsait misin?',
    'Harika bir paylaşım olmuş!',
    'Grupta bekliyoruz seni.',
    'Sıralamada yükselmişsin tebrikler!',
    'Discord adresini atar mısın?',
    'V4 için heyecanlıyız!'
];
// Specific conversation for Berkay & MythX (Raw data for processing)
const BERKAY_MYTHX_MESSAGES_DATA = [
    { id: 'bm1', senderName: 'MythX', senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MythX', content: 'Dostum selam, discord botunda ufak bir arıza var sanırım. Rolleri vermiyor.', timestamp: '10:30' },
    { id: 'bm2', senderName: 'Berkay', senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay', content: 'Selam. Evet fark ettim, V3 güncellemesi sırasında API token süresi dolmuş.', timestamp: '10:35' },
    { id: 'bm3', senderName: 'Berkay', senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay', content: 'Tokeni yeniledim, şimdi tekrar test eder misin? Sunucuya da reset atıyorum emin olmak için.', timestamp: '10:36' },
    { id: 'bm4', senderName: 'MythX', senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MythX', content: 'Tamamdır deniyorum.', timestamp: '10:40' },
    { id: 'bm5', senderName: 'MythX', senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MythX', content: 'Sunucuya reset atıyorum...', timestamp: '10:42' }
];
// ---------------------------------------------------------
// STEP 1: Basic Community & Initial Groups
// ---------------------------------------------------------
userList.forEach((user) => {
    // Sync group memberships
    user.groups.forEach((group) => {
        if (!group.members.some(m => m.username === user.username)) {
            group.members.push(user);
            group.memberCount = group.members.length;
        }
        if (group.permissions.length === 0) {
            group.permissions = ['GÖNDERİ_PAYLAŞ', 'YORUM_YAP', 'ETKİNLİK_GÖR', 'MESAJ_GÖNDER'];
        }
    });
});
// ---------------------------------------------------------
// STEP 2: Bidirectional Friendships
// ---------------------------------------------------------
userList.forEach((user, index) => {
    // Add 5 random FRIENDS for everyone (bidirectional)
    const targetFriendCount = 5;
    for (let i = 0; user.friends.length < targetFriendCount && i < 20; i++) {
        const randomFriend = userList[(index + 10 + i * 13) % userList.length];
        if (randomFriend.username !== user.username) {
            if (!user.friends.some(f => f.username === randomFriend.username))
                user.friends.push(randomFriend);
            if (!randomFriend.friends.some(f => f.username === user.username))
                randomFriend.friends.push(user);
        }
    }
    // Ensure Berkay & MythX are friends
    if (user.username === 'berkaytikenoglu') {
        const myth = userList.find(u => u.username === 'mythx');
        if (myth) {
            if (!user.friends.some(f => f.username === 'mythx'))
                user.friends.push(myth);
            if (!myth.friends.some(f => f.username === 'berkaytikenoglu'))
                myth.friends.push(user);
        }
    }
});
/**
 * Seed data for posts
 */
export const postList = [
    new Post({
        id: 'p1',
        author: userList[0],
        content: 'ARMOYU V3 sistemleri üzerinde çalışmaya devam ediyoruz! Çok yakında yeni özelliklerle karşınızda olacağız. #ARMOYU #V3 #Development',
        createdAt: '2 saat önce',
        stats: { likes: 124, comments: 2, reposts: 5, shares: 8 },
        hashtags: ['ARMOYU', 'V3', 'Development'],
        likeList: [userList[1], userList[2], userList[5], userList[8], userList[15]],
        repostList: [userList[3], userList[10]],
        commentList: [
            { id: 'c1', author: userList[4], content: 'Büyük merakla bekliyoruz! Elinize sağlık.', createdAt: '1 saat önce' },
            {
                id: 'c2', author: userList[12], content: 'Dashboard tasarımı çok temiz olmuş.', createdAt: '30 dk önce', replies: [
                    { id: 'c2-1', author: userList[0], content: 'Teşekkürler hocam! 🙏', createdAt: '10 dk önce' }
                ]
            }
        ]
    }),
    new Post({
        id: 'p2',
        author: userList[1],
        content: 'Bu akşam saat 20:00\'de büyük bir çekilişimiz var, sakın kaçırmayın! 🔥',
        createdAt: '5 saat önce',
        stats: { likes: 85, comments: 1, reposts: 12, shares: 20 },
        media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop' }],
        likeList: [userList[0], userList[10], userList[22], userList[45], userList[12], userList[5], userList[8]],
        repostList: [userList[5], userList[8], userList[14], userList[16]],
        commentList: [
            { id: 'p2-c1', author: userList[5], content: 'Yine efsane bir çekiliş bizi bekliyor!', createdAt: '4 saat önce' }
        ]
    }),
    new Post({
        id: 'p3',
        author: userList[2],
        content: 'Bugün harika bir day! Herkese iyi oyunlar dilerim. 🤍',
        createdAt: '1 gün önce',
        stats: { likes: 56, comments: 0, reposts: 1, shares: 2 },
        likeList: [userList[1], userList[15], userList[18], userList[0], userList[5], userList[10]],
        repostList: [userList[1]]
    }),
    new Post({
        id: 'p4',
        author: userList[0], // Berkay
        content: 'Yeni bir blog yazısı paylaştım! "Modern Web Geliştirme Trendleri" hakkındaki düşüncelerimi okuyabilirsiniz. #Blog #WebDev',
        createdAt: '3 saat önce',
        stats: { likes: 210, comments: 0, reposts: 8, shares: 12 },
        likeList: [userList[2], userList[14], userList[50], userList[60], userList[1], userList[5], userList[10], userList[11], userList[12]],
        repostList: [userList[14], userList[5], userList[2]]
    }),
    new Post({
        id: 'p5',
        author: userList[14], // Engin
        content: 'Kod yazarken kahve olmazsa olmaz diyenler? ☕️⌨️',
        createdAt: '6 saat önce',
        stats: { likes: 45, comments: 0, reposts: 2, shares: 1 },
        media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2670&auto=format&fit=crop' }],
        likeList: [userList[0], userList[12], userList[1], userList[2], userList[3], userList[4]]
    }),
    new Post({
        id: 'p6',
        author: userList[16], // Metehan
        content: 'Birazdan yayındayız! Minecraft Survival serisinin yeni bölümü geliyor. Kaçırmayın! 🔴',
        createdAt: '10 dk önce',
        stats: { likes: 890, comments: 0, reposts: 50, shares: 30 },
        likeList: [userList[1], userList[2], userList[3], userList[10], userList[11], userList[12], userList[14], userList[0], userList[5]],
        repostList: [userList[0], userList[1], userList[14]]
    })
];
// Final synchronization: link posts to users' myPosts list
postList.forEach(post => {
    if (post.author) {
        const user = userList.find(u => u.username === post.author?.username);
        if (user) {
            if (!user.myPosts.some(p => p.id === post.id)) {
                user.myPosts.push(post);
            }
        }
    }
});
/**
 * Mock Session for Auto-Login
 * notifications and chatList live on Session, not User.
 */
export const MOCK_SESSION = new Session({
    user: userList[0],
    token: 'mock-jwt-token-berkay',
    notifications: [
        new Notification({
            id: 'n1',
            type: 'POST_LIKE',
            category: 'SOCIAL',
            title: 'Yeni Beğeni',
            message: `${userList[5].displayName} bir gönderini beğendi.`,
            post: postList[0],
            sender: userList[5].toNotificationSender(),
            createdAt: '2024-03-29T10:00:00Z',
            isRead: false
        }),
        new Notification({
            id: 'n2',
            type: 'POST_COMMENT',
            category: 'SOCIAL',
            title: 'Yeni Yorum',
            sender: userList[4].toNotificationSender(),
            createdAt: '1 saat önce',
            isRead: false
        }),
        new Notification({
            id: 'n3',
            type: 'GROUP_INVITE',
            category: 'GROUP',
            group: groupList[1],
            sender: groupList[1].toNotificationSender(),
            createdAt: '3 saat önce',
            isRead: true
        }),
        new Notification({
            id: 'n4',
            type: 'SYSTEM_UPDATE',
            category: 'SYSTEM',
            title: 'Sistem Güncellemesi',
            message: 'ARMOYU V3 Beta 1.2 sürümüne güncellendi.',
            sender: NotificationSender.system(),
            createdAt: '1 gün önce',
            isRead: true
        })
    ],
    chatList: [
        new Chat({
            id: 'c1',
            name: userList[1].displayName,
            avatar: userList[1].avatar,
            participants: [userList[0], userList[1]],
            lastMessage: new ChatMessage({ content: 'V3 sistemleri efsane oldu!', timestamp: '10:45' }),
            time: '10:45',
            unreadCount: 1,
            isOnline: true
        }),
        new Chat({
            id: 'c2',
            name: userList[14].displayName,
            avatar: userList[14].avatar,
            participants: [userList[0], userList[14]],
            lastMessage: new ChatMessage({ content: 'Aksam turnuva var mi?', timestamp: 'Dun' }),
            time: 'Dun',
            unreadCount: 0,
            isOnline: false
        }),
        new Chat({
            id: 'c3',
            name: 'ARMOYU Yonetim',
            avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=Admin',
            isGroup: true,
            participants: [userList[0], userList[1], userList[2]],
            lastMessage: new ChatMessage({ content: 'Yeni istasyonlar eklendi.', timestamp: '2 gun once' }),
            time: '2 gun once',
            unreadCount: 5,
            isOnline: true
        })
    ]
});
/**
 * Shop & News Mock Data (Migrated from mockData.ts)
 */
export const MOCK_PRODUCTS = [
    new Product({
        id: '1',
        name: 'Premium VIP Üyelik',
        category: 'Üyelik',
        description: 'ARMOYU platformunda en üst düzey deneyim için tasarlanmıştır. Özel rozetler, öncelikli destek ve %20 daha fazla TP kazanırsınız.',
        price: 149.90,
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
        isFeatured: true,
        badge: 'EN POPÜLER',
        stock: 999
    }),
    new Product({
        id: '2',
        name: '1000 ARMOYU Coin',
        category: 'Oyun İçi',
        description: 'Market alışverişlerinde ve özel etkinliklerde kullanabileceğiniz dijital para birimidir.',
        price: 49.00,
        image: 'https://images.unsplash.com/photo-1621416848469-8c2033bc699b?w=800&q=80',
        stock: 9999
    }),
    new Product({
        id: '3',
        name: 'Elite Minecraft Paketi',
        category: 'Oyun İçi',
        description: 'Minecraft sunucularımızda kullanabileceğiniz efsanevi ekipmanlar ve özel bloklar içerir.',
        price: 89.90,
        image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80',
        stock: 50
    }),
    new Product({
        id: '4',
        name: 'ARMOYU Kapşonlu (Siyah)',
        category: 'Giyim',
        description: 'Yüksek kaliteli pamuklu kumaş, şık ARMOYU nakışı ile günlük giyimde fark yaratın.',
        price: 599.00,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
        stock: 25
    }),
    new Product({
        id: '5',
        name: 'Efsanevi Kasa Anahtarı',
        category: 'Oyun İçi',
        price: 25.00,
        image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80',
        stock: 500
    }),
    new Product({
        id: '6',
        name: 'Discord Özel Rolü',
        category: 'Üyelik',
        price: 19.90,
        image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80',
        stock: 1000
    })
];
export const MOCK_NEWS = [
    new News({
        slug: 'armoyu-v3-yayinda',
        title: 'ARMOYU V3 Sistemleri Yayına Girdi!',
        excerpt: 'Uzun süredir beklenen ARMOYU V3 sistemlerimiz artık yayında. Yepyeni bir dashboard konsepti sizi bekliyor.',
        content: `
      <p>ARMOYU topluluğu için heyecan verici bir dönemin kapılarını aralıyoruz. Uzun süredir üzerinde çalıştığımız V3 güncellemesi artık tüm sunucularımızda ve web platformumuzda yayında. Bu güncelleme sadece görsel bir değişim değil, aynı zamanda altyapısal bir devrimi de beraberinde getiriyor.</p>
      <h2>Yepyeni Bir Kullanıcı Deneyimi</h2>
      <p>Modern web teknolojilerini kullanarak baştan aşağı yenilediğimiz arayüzümüzle artık çok daha hızlı ve akıcı bir deneyim sunuyoruz. Glassmorphism tasarım dilini benimseyerek hem estetik hem de işlevsel bir yapı oluşturduk.</p>
      <blockquote>"Bu güncellemenin temel odağı kullanıcılarımızın birbiriyle daha kolay etkileşim kurabilmesi ve içeriklere saniyeler içinde ulaşabilmesiydi."</blockquote>
      <h2>Öne Çıkan Yeni Özellikler</h2>
      <ul>
        <li><strong>Yeni Dashboard:</strong> Tamamen özelleştirilebilir bileşenlerle dolu ana sayfanız.</li>
        <li><strong>Hızlı Profil Yükleme:</strong> Profil sayfaları artık %40 daha hızlı açılıyor.</li>
        <li><strong>Gelişmiş Grup Sistemi:</strong> Klan ve takım yönetimleri artık çok daha detaylı.</li>
      </ul>
    `,
        author: userList[0], // Berkay
        date: '31 Mart 2024',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80',
        category: 'Güncelleme'
    }),
    new News({
        slug: 'yeni-donem-basliyor',
        title: 'Toplulukta Yeni Bir Dönem Başlıyor',
        excerpt: 'ARMOYU olarak topluluğumuzu bir üst seviyeye taşımak için yeni stratejilerimizi açıklıyoruz.',
        content: `
      <p>ARMOYU olarak topluluğumuzu bir üst seviyeye taşımak için yeni stratejilerimizi açıklıyoruz. Gelecek vizyonumuzda daha fazla oyun sunucusu ve daha geniş bir etkinlik takvimi yer alıyor.</p>
      <p>Yeni yılda yapacağımız turnuvalar ve özel buluşmalar ile Türkiye'nin en aktif oyun topluluğu olma yolunda ilerliyoruz.</p>
    `,
        author: userList[1], // Alperen -> MythX'i admin olarak kullanabiliriz veya index 1
        date: '30 Mart 2024',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80',
        category: 'Duyuru'
    })
];
export const newsList = MOCK_NEWS;
export const MOCK_NOTES = [
    new Note({
        id: 'note-1',
        user: userList[0], // Berkay
        note: 'Not bırak...',
        isMe: true
    }),
    new Note({
        id: 'note-2',
        user: userList[1], // MythX
        note: 'V3 sistemleri efsane oldu! 🚀',
        isMe: false
    }),
    new Note({
        id: 'note-3',
        user: userList[14], // Efe
        note: 'Akşam turnuva var, hazır mısınız? 🏆',
        isMe: false
    }),
    new Note({
        id: 'note-4',
        user: userList[9], // Engin
        note: 'Kahve & Kod keyfi... ☕️⌨️',
        isMe: false
    }),
    new Note({
        id: 'note-5',
        user: userList[13], // Metehan
        note: 'Birazdan yayındayız! 🔴',
        isMe: false
    })
];
/**
 * Global Statistics (Migrated from mockData.ts)
 */
export const mockGlobalStats = {
    totalPlayers: 15420,
    malePlayers: 8950,
    femalePlayers: 6470,
    totalForums: 1245,
    totalPolls: 452,
    activeUsers24h: 3120,
    totalMatchesPlayed: 85600,
    totalGuilds: 342,
    monthlyVisitors: 45000,
    totalNews: 156
};
/**
 * Rankings (Derived from userList)
 */
export const MOCK_RANKING_LEVEL = [...userList]
    .sort((a, b) => (b.level || 0) - (a.level || 0))
    .slice(0, 10);
export const MOCK_RANKING_POPULARITY = [...userList]
    .sort((a, b) => (b.popScore || 0) - (a.popScore || 0))
    .slice(0, 10);
/**
 * Stories Mock Data (Migrated and Reconstructed)
 */
export const MOCK_STORIES = [
    new Story({ id: 's1', user: userList[0], hasUnseen: false, isMe: true }),
    new Story({ id: 's2', user: userList[1], hasUnseen: true, media: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670' }),
    new Story({ id: 's3', user: userList[14], hasUnseen: true, media: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200' }),
    new Story({ id: 's4', user: userList[9], hasUnseen: false, media: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800' }),
    new Story({ id: 's5', user: userList[13], hasUnseen: true, media: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2670' }),
    new Story({ id: 's6', user: userList[5], hasUnseen: false }),
    new Story({ id: 's7', user: userList[10], hasUnseen: true }),
];
/**
 * Game Mods Mock Data
 */
export const MOCK_MODS = [
    new Mod({ id: '1', name: 'ARMOYU Realistic Minecraft Pack', game: 'Minecraft', version: '1.20.1', author: userList[0], downloads: '1.2k', image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80', isFeatured: true, description: 'Minecraft görselliğini kökünden değiştiren, en gerçekçi shader ve doku paketleriyle entegre edilmiş ARMOYU özel mod paketi. Su yansımalarından, güneş ışınlarına kadar her detayı hisset.' }),
    new Mod({ id: '2', name: 'Tofaş Doğan SLX Drift Mod', game: 'Assetto Corsa', version: 'v2.4', author: userList[2], downloads: '4.5k', image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80', description: 'Gelişmiş fizikler, ayarlanabilir süspansiyon ve tam uyumlu direksiyon hasasiyeti ile Tofaş Doğan SLX keyfini Assetto Corsa\'da yaşayın.' }),
    new Mod({ id: '3', name: 'Medieval Kingdom Pack', game: 'Minecraft', version: '1.19.2', author: userList[3], downloads: '850', image: 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=800&q=80', description: 'Orta Çağ Krallığı temasına sahip bu devasa mod paketi, yeni silahlar, şatolar ve yepyeni düşmanlarla dolu zorlu bir hayatta kalma macerası.' }),
    new Mod({ id: '4', name: 'Nürburgring Night Edition', game: 'Assetto Corsa', version: '1.0', author: userList[5], downloads: '2.1k', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80', description: 'Efsanevi Nürburgring pistini karanlık çöktüğünde gece aydınlatmalarıyla oynamak için optimize edilmiş yüksek kaliteli harita modu.' }),
    new Mod({ id: '5', name: 'ARMOYU Voice Chat Integration', game: 'Minecraft', version: 'v1.5', author: userList[4], downloads: '3.2k', image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&q=80', description: 'Oyuncuların 3D ses konumu sistemiyle oyun içinde Discord olmadan direkt iletişim kurmasını sağlayan eşsiz ARMOYU plugini.' }),
    new Mod({ id: '6', name: 'Ultra Shader Pack V2', game: 'Genel', version: 'v5.0', author: userList[11], downloads: '12k', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80', description: 'Işın izleme (Ray Tracing) teknolojisine benzeyen özel gölgelendirmeleri ile en çok tercih edilen ultra gerçekçi grafik motoru pakedi.' })
];
/**
 * Forum Categories Mock Data
 */
export const MOCK_FORUM_CATEGORIES = [
    {
        title: 'ARMOYU TOPLULUĞU',
        boards: [
            new Forum({ id: 'duyurular', name: 'Duyurular & Haberler', desc: 'ARMOYU hakkında en güncel haberler ve resmi duyurular.', topicCount: 124, postCount: 2540 }),
            new Forum({ id: 'kurallar', name: 'Kurallar & Rehberler', desc: 'Topluluğumuzda uymanız gereken kurallar ve kullanım rehberleri.', topicCount: 12, postCount: 150 })
        ]
    },
    {
        title: 'OYUN DÜNYASI',
        boards: [
            new Forum({ id: 'minecraft', name: 'Minecraft', desc: 'Minecraft sunucularımız, buildler ve teknik destek.', topicCount: 540, postCount: 8400, lastPost: { topicTitle: 'Sunucuya nasıl girerim?', author: 'MinecraftMaster', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MC', time: '10 dk önce' } }),
            new Forum({ id: 'csgo', name: 'Counter-Strike', desc: 'CS2 taktikleri, skin piyasası ve topluluk maçları.', topicCount: 320, postCount: 4200 }),
            new Forum({ id: 'assetto', name: 'Assetto Corsa', desc: 'Simülasyon dünyası, modlar ve drift etkinlikleri.', topicCount: 210, postCount: 1800 })
        ]
    },
    {
        title: 'YAZILIM VE TEKNOLOJİ',
        boards: [
            new Forum({ id: 'web-dev', name: 'Web Geliştirme', desc: 'React, Next.js, CSS ve Web teknolojileri üzerine tartışmalar.', topicCount: 85, postCount: 740 }),
            new Forum({ id: 'python', name: 'Python & AI', desc: 'Python projeleri, veri bilimi ve yapay zeka.', topicCount: 42, postCount: 320 })
        ]
    }
];
/**
 * Giveaways Mock Data
 */
export const MOCK_GIVEAWAYS = [
    new Giveaway({ id: 'g1', title: 'Aylık ARMOYU Plus Aboneliği', prize: '1 Aylık Plus + Discord Rolü', status: 'active', participants: 450, timeLeft: '3 Gün Kaldı', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80' }),
    new Giveaway({ id: 'g2', title: '500 ARMOYU Coin (Oyun İçi)', prize: '500 AC', status: 'active', participants: 210, timeLeft: '10 Saat Kaldı', image: 'https://images.unsplash.com/photo-1621416848469-8c2033bc699b?w=800&q=80' }),
    new Giveaway({ id: 'g3', title: 'Steam $10 Cüzdan Kodu', prize: '$10 Cüzdan', status: 'ended', participants: 1200, timeLeft: 'Sona Erdi', image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80' })
];
export const giveawayList = MOCK_GIVEAWAYS;
/**
 * Mock Projects Data
 */
export const MOCK_PROJECTS = [
    new Project({
        id: 'p1',
        name: 'ARMOYU V3 Dashboard',
        description: 'Yeni nesil ARMOYU topluluk yönetim platformu. Glassmorphism tasarımı, gerçek zamanlı bildirimler ve optimize edilmiş kullanıcı deneyimi sunar.',
        status: 'Geliştiriliyor',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Socket.io'],
        authors: [
            { user: userList[0], role: 'Proje Lideri' },
            { user: userList[1], role: 'UI/UX Tasarımcı' }
        ],
        group: groupList[1], // CODE MASTERS
        url: 'https://v3.armoyu.com',
        githubUrl: 'https://github.com/armoyu/v3-dashboard'
    }),
    new Project({
        id: 'p2',
        name: 'Realistic Minecraft Launcher',
        description: 'Modlu Minecraft oyuncuları için özel olarak geliştirilmiş, performans odaklı ve otomatik güncelleme özellikli launcher.',
        status: 'Tamamlandı',
        image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1200&q=80',
        techStack: ['Electron', 'React', 'Node.js'],
        authors: [
            { user: userList[14], role: 'Baş Geliştirici' }
        ],
        group: groupList[0], // RIHTIM
        url: 'https://launcher.armoyu.com'
    }),
    new Project({
        id: 'p3',
        name: 'ARMOYU Mobile App',
        description: 'Toplulukla her zaman bağlantıda kalmanızı sağlayan, Flutter ile geliştirilen modern mobil uygulama projesi.',
        status: 'Geliştiriliyor',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
        techStack: ['Flutter', 'Dart', 'Firebase'],
        authors: [
            { user: userList[11], role: 'Mobile Dev' },
            { user: userList[0], role: 'API Architect' }
        ],
        group: groupList[1],
        githubUrl: 'https://github.com/armoyu/mobile-app'
    })
];
export const projectList = MOCK_PROJECTS;
export const sessionList = [];
export const armoyuProjects = MOCK_PROJECTS;
export const armoyuGiveaways = giveawayList;
/**
 * Forum Topics Mock Data
 */
export const MOCK_FORUM_TOPICS = [
    // Minecraft Board Topics
    { id: '1', boardId: 'minecraft', title: 'Sunucuya nasıl girerim?', author: 'MinecraftMaster', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MC', replies: 12, views: 240, lastActivity: '10 dk önce', lastAuthor: 'Berkay Tikenoğlu', isPinned: true, isHot: true },
    { id: '2', boardId: 'minecraft', title: 'Hala whitelist bekliyorum!', author: 'Oyuncu42', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=42', replies: 4, views: 80, lastActivity: '2 saat önce', lastAuthor: 'Admin_Bey', isSolved: true },
    { id: '3', boardId: 'minecraft', title: 'Server lag sorunu yaşayan var mı?', author: 'GamerX', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=X', replies: 42, views: 1200, lastActivity: 'Dün 22:30', lastAuthor: 'Barış M.', isHot: true },
    { id: '4', boardId: 'minecraft', title: 'Modlar ne zaman güncellenecek?', author: 'ModluServer', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mod', replies: 2, views: 45, lastActivity: '3 gün önce', lastAuthor: 'Bey Ev' },
    { id: '5', boardId: 'minecraft', title: 'Minecraft build yarışması hakkında', author: 'BuilderGözü', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Build', replies: 15, views: 310, lastActivity: '5 gün önce', lastAuthor: 'MythX', isPinned: true },
    // Duyurular Board Topics
    { id: '6', boardId: 'duyurular', title: 'ARMOYU V3 Geliyor! Yenilikler Neler?', author: 'Armoyu Ekibi', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Armoyu', replies: 254, views: 5600, lastActivity: '2 dk önce', lastAuthor: 'Berkay Tikenoğlu', isPinned: true, isHot: true },
    { id: '7', boardId: 'duyurular', title: 'Topluluk Yöneticisi Alımları Başladı', author: 'Armoyu Ekibi', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Armoyu', replies: 45, views: 1200, lastActivity: '1 gün önce', lastAuthor: 'Admin_Bey', isPinned: true },
    { id: '8', boardId: 'duyurular', title: 'Sunucu Bakımı (12 Nisan)', author: 'Sistem Yöneticisi', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sys', replies: 12, views: 450, lastActivity: '5 gün önce', lastAuthor: 'Ahmet Y.', isSolved: true },
    // CSGO Board Topics
    { id: '9', boardId: 'csgo', title: 'CS2 Dust 2 Yeni Smoke Taktikleri', author: 'GlobalElite', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CS', replies: 34, views: 890, lastActivity: '1 saat önce', lastAuthor: 'KralSlayer', isHot: true },
    { id: '10', boardId: 'csgo', title: 'Prime fiyatları çok arttı', author: 'SilverGamer', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Silver', replies: 56, views: 1400, lastActivity: '3 saat önce', lastAuthor: 'TraderPro' },
    { id: '11', boardId: 'csgo', title: 'Kelebek bıçak takaslamak isteyen var mı?', author: 'SkinCollector', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Skin', replies: 8, views: 210, lastActivity: 'Dün', lastAuthor: 'ScammerNo1' },
    // Assetto Board Topics
    { id: '12', boardId: 'assetto', title: 'Tofaş modu nereden iner?', author: 'DriftKralı_34', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=34', replies: 5, views: 120, lastActivity: '15 dk önce', lastAuthor: 'ModDeveloper', isSolved: true },
    { id: '13', boardId: 'assetto', title: 'Direksiyon seti önerisi (Logitech G29 vs Thrustmaster)', author: 'RacerBoi', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Race', replies: 28, views: 650, lastActivity: '2 gün önce', lastAuthor: 'SimSim' },
    // Web Dev Board Topics
    { id: '14', boardId: 'web-dev', title: 'Next.js App Router Sorunsalı', author: 'Frontend_Ninja', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FE', replies: 18, views: 400, lastActivity: '45 dk önce', lastAuthor: 'FullstackG', isHot: true },
    { id: '15', boardId: 'web-dev', title: 'Tailwind CSS ile karanlık mod yapımı', author: 'CSS_Büyücüsü', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CSS', replies: 7, views: 180, lastActivity: 'Dün', lastAuthor: 'Berkay Tikenoğlu', isSolved: true }
];
//# sourceMappingURL=seedData.js.map