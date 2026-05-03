// Contexts
export { ArmoyuProvider, useArmoyu } from './context/ArmoyuContext';
export type { ArmoyuNavigationConfig, ArmoyuProviderProps } from './context/ArmoyuContext';
export { AuthProvider, useAuth } from './context/AuthContext';
export { CartProvider, useCart } from './context/CartContext';
export { ChatProvider, useChat } from './context/ChatContext';
export { LayoutProvider, useLayout } from './context/LayoutContext';
export { SocketProvider, useSocket } from './context/SocketContext';
export { ThemeProvider, useTheme } from './context/ThemeContext';

// Core Classes
export { ArmoyuUI } from './lib/ArmoyuUI';

// Models
export { User } from './models/auth/User';
export { Role } from './models/auth/Role';
export { RankedUser } from './models/auth/RankedUser';
export { Session } from './models/auth/Session';
export { UserBadge } from './models/auth/UserBadge';

// Management Module
export { ManagementLayout } from './components/modules/management/ManagementLayout';
export { ManagementSidebar } from './components/modules/management/ManagementSidebar';
export { ManagementAccessDenied } from './components/modules/management/ManagementAccessDenied';
export { ManagementMobileToggle } from './components/modules/management/ManagementMobileToggle';

// Export everything else as before
export * from './components/Button';
export * from './components/Slider';
export * from './components/RollingNumber';
export * from './components/ViewModeToggle';
export * from './components/GenderStatsBar';
export * from './components/modules/auth/widgets/LoginWidget';
export * from './components/modules/auth/widgets/RegisterWidget';
export * from './components/shared/FilterTabs';
export * from './components/StatsGrid';
export * from './types';
export * from './lib/constants/seedData';
export * from './lib/constants/educationData';
export * from './lib/constants/punishmentData';
export * from './lib/constants/stationData';
export * from './lib/constants/surveyData';
export * from './lib/constants/teamData';
export * from './lib/constants/config';
export * from './models/auth/StaffApplication';
export * from './models/auth/TeamMember';
export * from './models/community/Group';
export * from './models/community/Team';
export * from './models/community/Station';
export * from './models/community/School';
export * from './models/community/Faculty';
export * from './models/community/Classroom';
export * from './models/community/SchoolTeam';
export * from './models/community/Survey';
export * from './models/community/ArmoyuEvent';
export * from './models/social/feed/Post';
export * from './models/social/feed/Comment';
export * from './models/social/feed/Story';
export * from './lib/utils/odpUtils';
export * from './lib/utils/postUtils';
export { PlatformStats } from './models/core/PlatformStats';
export { mockGlobalStats } from './lib/constants/seedData';
export { SystemSettings } from './models/core/SystemSettings';

// Shared Components
export { Header } from './components/shared/Header';
export { Footer } from './components/shared/Footer';
export { LoginModal } from './components/shared/LoginModal';
export { FloatingChatButton } from './components/shared/FloatingChatButton';
export { MainLayoutWrapper } from './components/shared/MainLayoutWrapper';
export { PageWidth } from './components/shared/PageWidth';
export { NotFound } from './components/shared/NotFound';
export { SearchBar } from './components/shared/SearchBar';
export { ListToolbar } from './components/shared/ListToolbar';
export { SearchSpotlight } from './components/shared/SearchSpotlight';
export * from './components/shared/Icons';

// Posts & Social Modules
export { SocialLayout } from './components/modules/social/SocialLayout';
export { SocialSidebar } from './components/modules/social/widgets/SocialSidebar';
export { NewMembersWidget } from './components/modules/social/widgets/NewMembersWidget';
export { TrendingWidget } from './components/modules/social/widgets/TrendingWidget';
export { EconomyWidget } from './components/modules/social/widgets/EconomyWidget';
export { LeagueWidget } from './components/modules/social/widgets/LeagueWidget';
export { MinecraftWidget } from './components/modules/social/widgets/MinecraftWidget';
export { RankingWidget } from './components/modules/social/widgets/RankingWidget';
export { PostComposer } from './components/modules/social/widgets/PostComposer';
export { PostCard } from './components/modules/posts/widgets/PostCard';
export { PostInteractionsModal } from './components/modules/posts/widgets/PostInteractionsModal';
export { RepostModal } from './components/modules/posts/widgets/RepostModal';
export { Stories } from './components/modules/stories/widgets/Stories';
export { StoryOverlay as StoryViewer } from './components/modules/stories/widgets/StoryOverlay';
export { ReelCard } from './components/modules/posts/widgets/reels/ReelCard';
export { ReelsContainer } from './components/modules/posts/widgets/reels/ReelsContainer';
export { MediaLightbox, type PostMedia } from './components/modules/posts/widgets/MediaLightbox';
export { SocialFeed, type SocialFeedProps, type SocialFeedRef } from './components/modules/posts/widgets/SocialFeed';

// Chat Module
export { ChatLayout } from './components/modules/chat/ChatLayout';
export { ChatInput } from './components/modules/chat/widgets/ChatInput';
export { ChatList } from './components/modules/chat/widgets/ChatList';
export { ChatMessage } from './components/modules/chat/widgets/ChatMessage';
export { ChatNotes } from './components/modules/chat/widgets/ChatNotes';

// Community Module
export { CommunityLayout } from './components/modules/community/CommunityLayout';
export { GroupHeader } from './components/modules/community/widgets/GroupHeader';
export { GroupMenu } from './components/modules/community/widgets/GroupMenu';
export { GroupStatsGrid } from './components/modules/community/widgets/GroupStatsGrid';
export { GroupAboutCard } from './components/modules/community/widgets/GroupAboutCard';
export * from './components/modules/events';
export { GroupFeedSection } from './components/modules/community/widgets/GroupFeedSection';
export { GroupTopMembers } from './components/modules/community/widgets/GroupTopMembers';
export { GroupPermissions } from './components/modules/community/widgets/GroupPermissions';
export { SchoolCard } from './components/modules/community/widgets/SchoolCard';
export { SurveyCard } from './components/modules/community/widgets/SurveyCard';

// Forum Module
export { ForumBoard } from './components/modules/forum/widgets/ForumBoard';
export { ForumPost } from './components/modules/forum/widgets/ForumPost';
export { NewTopicModal } from './components/modules/forum/widgets/NewTopicModal';
export { TopicItem } from './components/modules/forum/widgets/TopicItem';
export { ForumHeaderWidget } from './components/modules/forum/widgets/ForumHeaderWidget';
export { ForumSidebar } from './components/modules/forum/widgets/ForumSidebar';
export { ForumCategoryList } from './components/modules/forum/widgets/ForumCategoryList';

// Galleries Module
export { GalleryCard } from './components/modules/galleries/widgets/GalleryCard';
export { GalleryHeaderWidget } from './components/modules/galleries/widgets/GalleryHeaderWidget';
export { GalleryFilterBar } from './components/modules/galleries/widgets/GalleryFilterBar';
export { GalleryMasonryGrid } from './components/modules/galleries/widgets/GalleryMasonryGrid';

// Giveaways Module
export { GiveawayCard } from './components/modules/giveaways/widgets/GiveawayCard';

// Groups Module
export { GroupCard } from './components/modules/groups/widgets/GroupCard';
export { ApplicationModal as GroupApplicationModal } from './components/modules/groups/widgets/ApplicationModal';

// Guest Module
export { Introduction } from './components/modules/guest/widgets/Introduction';

// Shop Module
export { StoreLayout } from './components/modules/shop/StoreLayout';
export { DetailLayout } from './components/modules/shop/DetailLayout';
export { CartLayout } from './components/modules/shop/CartLayout';
export { CheckoutLayout } from './components/modules/shop/CheckoutLayout';
export { OrdersLayout } from './components/modules/shop/OrdersLayout';
export { BackToStore } from './components/modules/shop/widgets/BackToStore';
export { StoreHeader } from './components/modules/shop/widgets/StoreHeader';
export { ProductCard } from './components/modules/shop/widgets/ProductCard';
export { StoreSidebar } from './components/modules/shop/widgets/StoreSidebar';
export { StoreTrustBadges } from './components/modules/shop/widgets/StoreTrustBadges';
export { StoreProductGrid } from './components/modules/shop/widgets/StoreProductGrid';
export { StoreSearchBar } from './components/modules/shop/widgets/StoreSearchBar';

// News Module
export * from './components/modules/news';

// Profile Module
export { ProfileLayout } from './components/modules/profile/ProfileLayout';
export { ProfileHeader } from './components/modules/profile/widgets/ProfileHeader';
export { ProfileStats } from './components/modules/profile/widgets/ProfileStats';
export { ProfileSidebar } from './components/modules/profile/widgets/ProfileSidebar';
export { ProfileInfoWidget } from './components/modules/profile/widgets/ProfileInfoWidget';
export { ProfileTabsArea } from './components/modules/profile/widgets/ProfileTabsArea';
export { EditProfileModal } from './components/modules/profile/widgets/EditProfileModal';
export { TeamSelectorModal } from './components/modules/profile/widgets/TeamSelectorModal';

// Cloud Module
export { CloudModal } from './components/modules/cloud/CloudModal';
export { CloudWidget } from './components/modules/cloud/CloudWidget';

// Stations Module
export { StationCard } from './components/modules/stations/widgets/StationCard';
export { StationQRModal } from './components/modules/stations/widgets/StationQRModal';

// Pages / Module Widgets
export { EducationPage } from './components/modules/education/pages/EducationPage';
export { SchoolDetailPage } from './components/modules/education/pages/SchoolDetailPage';
export { GiveawaysPage } from './components/modules/giveaways/pages/GiveawaysPage';
export { GiveawayDetailPage } from './components/modules/giveaways/pages/GiveawayDetailPage';
export { PollsPage } from './components/modules/poll/pages/PollsPage';
export { MyArticlesPage } from './components/modules/blog/pages/MyArticlesPage';
export { ForumPage } from './components/modules/forum/pages/ForumPage';
export { ForumBoardPage } from './components/modules/forum/pages/ForumBoardPage';
export { ForumTopicPage } from './components/modules/forum/pages/ForumTopicPage';
export { ModsPage } from './components/modules/mods/pages/ModsPage';
export { ModDetailPage } from './components/modules/mods/pages/ModDetailPage';
export { SupportPage } from './components/modules/support/pages/SupportPage';
export * from './components/shared/AnimatedStat';

// Management Dashboard Components
export * from './components/modules/management/widgets/dashboard/ManagementHeader';
export * from './components/modules/management/widgets/dashboard/ManagementStatsGrid';
export * from './components/modules/management/widgets/dashboard/ManagementActivityFeed';
export * from './components/modules/management/widgets/dashboard/ManagementQuickActions';
export * from './components/modules/management/widgets/dashboard/ManagementDashboard';
export * from './components/modules/management/widgets/dashboard/ManagementCharts';
export * from './components/modules/management/widgets/dashboard/ManagementOverview';
export * from './components/modules/management/widgets/dashboard/StatisticsManagement';
export * from './components/modules/management/widgets/dashboard/ManagementWidgetCreator';
export * from './components/modules/management/widgets/dashboard/RegistryManagement';
export * from './components/modules/management/widgets/dashboard/GameOfficialManagement';
export * from './components/modules/management/widgets/dashboard/SystemSettings';

// Management Business Units
export * from './components/modules/management/widgets/users/MemberManagement';
export * from './components/modules/management/widgets/users/MemberSummaryWidget';
export * from './components/modules/management/widgets/support/SupportManagement';
export * from './components/modules/management/widgets/support/SupportSummaryWidget';
export * from './components/modules/management/widgets/events/EventManagement';
export * from './components/modules/management/widgets/events/EventSummaryWidget';
export * from './components/modules/management/widgets/editor/NewsManagement';
export * from './components/modules/management/widgets/editor/GroupsManagement';
export * from './components/modules/management/widgets/editor/SchoolsManagement';
export * from './components/modules/management/widgets/editor/StationsManagement';
export * from './components/modules/management/widgets/editor/GiveawaysManagement';

export type { ManagementDashboardProps, ManagementTab } from './components/modules/management/widgets/dashboard/ManagementDashboard';
export type { ChartDataPoint } from './components/modules/management/widgets/dashboard/ManagementCharts';
export type { Member } from './components/modules/management/widgets/users/MemberManagement';

export { ArmoyuPlayer } from './components/shared/ArmoyuPlayer';
