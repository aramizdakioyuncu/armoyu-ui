import { User, Post, Role, Group, Product, Note, Story, News, Mod, Forum, Giveaway, Project, Survey, School, Faculty, Classroom, SchoolTeam, Session } from '@armoyu/core';
import { GlobalStats } from '../../types';
export * from './stationData';
export * from './surveyData';
export * from './educationData';
/**
 * Common Roles
 */
export declare const roles: {
    admin: Role;
    memberMgmt: Role;
    discipline: Role;
    eventMgmt: Role;
    assettoOfficial: Role;
    mcOfficial: Role;
    responsible: Role;
    gameDev: Role;
    softwareDev: Role;
    frontendDev: Role;
    backendDev: Role;
    fullstackDev: Role;
    streamerContent: Role;
    streamerGaming: Role;
    streamer: Role;
    esports: Role;
    user: Role;
    qualified: Role;
};
/**
 * Seed data for Groups (Guilds/Communities)
 */
export declare const groupList: Group[];
/**
 * Seed data for users (Team Members)
 */
export declare const userList: User[];
export declare const MOCK_SURVEYS: Survey[];
export declare const surveyList: Survey[];
export declare const schoolList: School[];
export declare const facultyList: Faculty[];
export declare const schoolTeamList: SchoolTeam[];
export declare const classroomList: Classroom[];
/**
 * Seed data for posts
 */
export declare const postList: Post[];
/**
 * Mock Session for Auto-Login
 * notifications and chatList live on Session, not User.
 */
export declare const MOCK_SESSION: Session;
/**
 * Shop & News Mock Data (Migrated from mockData.ts)
 */
export declare const MOCK_PRODUCTS: Product[];
export declare const MOCK_NEWS: News[];
export declare const newsList: News[];
export declare const MOCK_NOTES: Note[];
/**
 * Global Statistics (Migrated from mockData.ts)
 */
export declare const mockGlobalStats: GlobalStats;
/**
 * Rankings (Derived from userList)
 */
export declare const MOCK_RANKING_LEVEL: User[];
export declare const MOCK_RANKING_POPULARITY: User[];
/**
 * Stories Mock Data (Migrated and Reconstructed)
 */
export declare const MOCK_STORIES: Story[];
/**
 * Game Mods Mock Data
 */
export declare const MOCK_MODS: Mod[];
/**
 * Forum Categories Mock Data
 */
export declare const MOCK_FORUM_CATEGORIES: {
    title: string;
    boards: Forum[];
}[];
/**
 * Giveaways Mock Data
 */
export declare const MOCK_GIVEAWAYS: Giveaway[];
export declare const giveawayList: Giveaway[];
/**
 * Mock Projects Data
 */
export declare const MOCK_PROJECTS: Project[];
export declare const projectList: Project[];
export declare const sessionList: Session[];
export declare const armoyuProjects: Project[];
export declare const armoyuGiveaways: Giveaway[];
/**
 * Forum Topics Mock Data
 */
export declare const MOCK_FORUM_TOPICS: ({
    id: string;
    boardId: string;
    title: string;
    author: string;
    authorAvatar: string;
    replies: number;
    views: number;
    lastActivity: string;
    lastAuthor: string;
    isPinned: boolean;
    isHot: boolean;
    isSolved?: undefined;
} | {
    id: string;
    boardId: string;
    title: string;
    author: string;
    authorAvatar: string;
    replies: number;
    views: number;
    lastActivity: string;
    lastAuthor: string;
    isSolved: boolean;
    isPinned?: undefined;
    isHot?: undefined;
} | {
    id: string;
    boardId: string;
    title: string;
    author: string;
    authorAvatar: string;
    replies: number;
    views: number;
    lastActivity: string;
    lastAuthor: string;
    isHot: boolean;
    isPinned?: undefined;
    isSolved?: undefined;
} | {
    id: string;
    boardId: string;
    title: string;
    author: string;
    authorAvatar: string;
    replies: number;
    views: number;
    lastActivity: string;
    lastAuthor: string;
    isPinned?: undefined;
    isHot?: undefined;
    isSolved?: undefined;
} | {
    id: string;
    boardId: string;
    title: string;
    author: string;
    authorAvatar: string;
    replies: number;
    views: number;
    lastActivity: string;
    lastAuthor: string;
    isPinned: boolean;
    isHot?: undefined;
    isSolved?: undefined;
})[];
//# sourceMappingURL=seedData.d.ts.map