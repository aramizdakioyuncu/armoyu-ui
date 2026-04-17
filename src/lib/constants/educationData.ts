import { School } from '../../models/community/School';
import { Faculty } from '../../models/community/Faculty';
import { Classroom } from '../../models/community/Classroom';
import { SchoolTeam } from '../../models/community/SchoolTeam';


export const MOCK_EDUCATION_DATA = (userList: any[]) => {
  // 1. School Teams (Traditional & Esports)
  const teams = [
    new SchoolTeam({
      id: 'st1',
      name: 'ARMOYU CS2 Team',
      gameOrSport: 'Counter-Strike 2',
      type: 'ESPORTS',
      schoolId: 'sch1',
      captain: userList[0]
    }),
    new SchoolTeam({
      id: 'st2',
      name: 'UAV Football Varsity',
      gameOrSport: 'Football',
      type: 'TRADITIONAL_SPORTS',
      schoolId: 'sch1',
      captain: userList[11]
    }),
    new SchoolTeam({
      id: 'st3',
      name: 'Code Masters LoL',
      gameOrSport: 'League of Legends',
      type: 'ESPORTS',
      schoolId: 'sch2',
      captain: userList[1]
    })
  ];

  // 2. Faculties
  const faculties = [
    new Faculty({ id: 'f1', name: 'Mühendislik Fakültesi', schoolId: 'sch1', representative: userList[14] }),
    new Faculty({ id: 'f2', name: 'İktisadi ve İdari Bilimler Fakültesi', schoolId: 'sch1', representative: userList[12] }),
    new Faculty({ id: 'f3', name: 'Fen Edebiyat Fakültesi', schoolId: 'sch2', representative: userList[3] })
  ];

  // 3. Classrooms
  const classrooms = [
    new Classroom({ id: 'c1', name: 'Web Geliştirme 101', schoolId: 'sch1', teacher: userList[0], password: 'armoyu_learn' }),
    new Classroom({ id: 'c2', name: 'Algoritma ve Veri Yapıları', schoolId: 'sch1', teacher: userList[14] }),
    new Classroom({ id: 'c3', name: 'Dijital Tasarım', schoolId: 'sch2', teacher: userList[1] })
  ];

  // 4. Schools
  const schools = [
    new School({
      id: 'sch1',
      name: 'İstanbul Teknik Üniversitesi',
      slug: 'itu',
      logo: 'https://upload.wikimedia.org/wikipedia/tr/a/ae/%C4%B0T%C3%9C_Logo.png',
      representative: userList[0],
      faculties: faculties.filter(f => f.schoolId === 'sch1'),
      teams: teams.filter(t => t.schoolId === 'sch1'),
      classrooms: classrooms.filter(cl => cl.schoolId === 'sch1'),
      memberCount: 1250
    }),
    new School({
      id: 'sch2',
      name: 'Boğaziçi Üniversitesi',
      slug: 'bogazici',
      logo: 'https://upload.wikimedia.org/wikipedia/tr/b/b3/Bo%C4%9Fazi%C3%A7i_%C3%9Cniversitesi_Logosu.png',
      representative: userList[1],
      faculties: faculties.filter(f => f.schoolId === 'sch2'),
      teams: teams.filter(t => t.schoolId === 'sch2'),
      classrooms: classrooms.filter(cl => cl.schoolId === 'sch2'),
      memberCount: 890
    }),
    new School({
      id: 'sch3',
      name: 'Sivas Cumhuriyet Üniversitesi',
      slug: 'cumhuriyet',
      logo: 'https://upload.wikimedia.org/wikipedia/tr/a/ac/Cumhuriyet_%C3%9Cniversitesi_Logosu.png',
      representative: userList[2],
      faculties: [
        new Faculty({ id: 'f4', name: 'Tıp Fakültesi', schoolId: 'sch3', representative: userList[4] }),
        new Faculty({ id: 'f5', name: 'Eğitim Fakültesi', schoolId: 'sch3', representative: userList[5] })
      ],
      teams: [
        new SchoolTeam({ id: 'st4', name: 'CU Eagles Volleyball', gameOrSport: 'Volleyball', type: 'TRADITIONAL_SPORTS', schoolId: 'sch3', captain: userList[2] }),
        new SchoolTeam({ id: 'st5', name: 'CU Valorant', gameOrSport: 'Valorant', type: 'ESPORTS', schoolId: 'sch3', captain: userList[4] })
      ],
      classrooms: [
        new Classroom({ id: 'c4', name: 'Temel Programlama', schoolId: 'sch3', teacher: userList[2] })
      ],
      memberCount: 2100
    }),
    new School({
      id: 'sch4',
      name: 'Tokat Gaziosmanpaşa Üniversitesi',
      slug: 'gop',
      logo: 'https://upload.wikimedia.org/wikipedia/tr/5/5e/Tokat_Gaziosmanpa%C5%9Fa_%C3%9Cniversitesi_Logosu.png',
      representative: userList[3],
      faculties: [
        new Faculty({ id: 'f6', name: 'Ziraat Fakültesi', schoolId: 'sch4', representative: userList[3] })
      ],
      teams: [
        new SchoolTeam({ id: 'st6', name: 'GOP Football', gameOrSport: 'Football', type: 'TRADITIONAL_SPORTS', schoolId: 'sch4', captain: userList[3] })
      ],
      classrooms: [],
      memberCount: 1450
    }),
    new School({
      id: 'sch5',
      name: 'Samsun Ondokuz Mayıs Üniversitesi',
      slug: 'omu',
      logo: 'https://upload.wikimedia.org/wikipedia/tr/6/6d/Ondokuz_May%C4%B1s_%C3%9Cniversitesi_Logosu.png',
      representative: userList[10],
      faculties: [
        new Faculty({ id: 'f7', name: 'Hukuk Fakültesi', schoolId: 'sch5', representative: userList[10] })
      ],
      teams: [
        new SchoolTeam({ id: 'st7', name: 'OMU Cyber Sports', gameOrSport: 'DotA 2', type: 'ESPORTS', schoolId: 'sch5', captain: userList[11] })
      ],
      classrooms: [],
      memberCount: 3200
    })
  ];

  return { schools, faculties, teams, classrooms };
};

