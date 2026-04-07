module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/context/ThemeContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ThemeProvider({ children }) {
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('dark');
    // Tarayıcı hafızasını okuyarak temayı yükleme (Local Storage)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedTheme = localStorage.getItem('armoyu_theme');
        if (savedTheme === 'light') {
            setTheme('light');
            document.documentElement.classList.remove('dark');
        } else {
            setTheme('dark');
            document.documentElement.classList.add('dark');
            // İlk girişte varsayılan olarak depolanır
            localStorage.setItem('armoyu_theme', 'dark');
        }
    }, []);
    const toggleTheme = ()=>{
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('armoyu_theme', newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme,
            toggleTheme
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/ThemeContext.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
function useTheme() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (!context) throw new Error('useTheme hooks must be used inside ThemeProvider!');
    return context;
}
}),
"[project]/src/context/LayoutContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LayoutProvider",
    ()=>LayoutProvider,
    "useLayout",
    ()=>useLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const LayoutContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function LayoutProvider({ children }) {
    // Varsayılan masaüstü değeri %80 olarak ayarlanmıştır.
    const [pageWidth, setPageWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('max-w-[80%]');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LayoutContext.Provider, {
        value: {
            pageWidth,
            setPageWidth
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/LayoutContext.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
function useLayout() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LayoutContext);
    if (!context) {
        throw new Error('useLayout must be used within a LayoutProvider');
    }
    return context;
}
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[project]/src/lib/constants/teamData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SUPER_LEAGUE_TEAMS",
    ()=>SUPER_LEAGUE_TEAMS,
    "ZODIAC_SIGNS",
    ()=>ZODIAC_SIGNS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@armoyu/core/dist/index.js [app-ssr] (ecmascript)");
;
const SUPER_LEAGUE_TEAMS = [
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Team"]({
        id: 't1',
        name: 'Galatasaray',
        shortName: 'GS',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Galatasaray_Star_Logo.png/600px-Galatasaray_Star_Logo.png',
        primaryColor: '#ef4444'
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Team"]({
        id: 't2',
        name: 'Fenerbahçe',
        shortName: 'FB',
        logo: 'https://upload.wikimedia.org/wikipedia/tr/thumb/8/86/Fenerbah%C3%A7e_SK.png/600px-Fenerbah%C3%A7e_SK.png',
        primaryColor: '#fbbf24'
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Team"]({
        id: 't3',
        name: 'Beşiktaş',
        shortName: 'BJK',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Logo_of_Be%C5%9Fikta%C5%9F_JK.svg/600px-Logo_of_Be%C5%9Fikta%C5%9F_JK.svg.png',
        primaryColor: '#000000'
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Team"]({
        id: 't4',
        name: 'Trabzonspor',
        shortName: 'TS',
        logo: 'https://upload.wikimedia.org/wikipedia/tr/thumb/a/ab/Trabzonspor_Logo.png/600px-Trabzonspor_Logo.png',
        primaryColor: '#9d174d'
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Team"]({
        id: 't5',
        name: 'Başakşehir',
        shortName: 'IBFK',
        logo: 'https://upload.wikimedia.org/wikipedia/tr/thumb/c/c6/Istanbul_Basaksehir_FK.png/600px-Istanbul_Basaksehir_FK.png',
        primaryColor: '#f97316'
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Team"]({
        id: 'none',
        name: 'Takım Tutmuyorum',
        shortName: 'NONE',
        logo: '',
        primaryColor: '#808080'
    })
];
const ZODIAC_SIGNS = [
    {
        name: 'Koç',
        icon: '♈'
    },
    {
        name: 'Boğa',
        icon: '♉'
    },
    {
        name: 'İkizler',
        icon: '♊'
    },
    {
        name: 'Yengeç',
        icon: '♋'
    },
    {
        name: 'Aslan',
        icon: '♌'
    },
    {
        name: 'Başak',
        icon: '♍'
    },
    {
        name: 'Terazi',
        icon: '♎'
    },
    {
        name: 'Akrep',
        icon: '♏'
    },
    {
        name: 'Yay',
        icon: '♐'
    },
    {
        name: 'Oğlak',
        icon: '♑'
    },
    {
        name: 'Kova',
        icon: '♒'
    },
    {
        name: 'Balık',
        icon: '♓'
    }
];
}),
"[project]/src/lib/constants/stationData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "eventList",
    ()=>eventList,
    "gameList",
    ()=>gameList,
    "stationList",
    ()=>stationList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@armoyu/core/dist/index.js [app-ssr] (ecmascript)");
;
const gameList = [
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Game"]({
        id: '1',
        name: 'Counter Strike 2',
        poster: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80'
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Game"]({
        id: '2',
        name: 'Valorant',
        poster: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80'
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Game"]({
        id: '3',
        name: 'League of Legends',
        poster: 'https://images.unsplash.com/photo-1542751163-44203649479e?w=800&q=80'
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Game"]({
        id: '4',
        name: 'Minecraft',
        poster: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80'
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Game"]({
        id: '5',
        name: 'Euro Truck Simulator 2',
        poster: 'https://images.unsplash.com/photo-1601584115167-0effcb193f0c?w=800&q=80'
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Game"]({
        id: '6',
        name: 'GTA V',
        poster: 'https://images.unsplash.com/photo-1605898399783-1820b7f53631?w=800&q=80'
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Game"]({
        id: '7',
        name: 'Assetto Corsa',
        poster: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80'
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Game"]({
        id: '8',
        name: 'PUBG',
        poster: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80'
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Game"]({
        id: '9',
        name: 'Dota 2',
        poster: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80'
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Game"]({
        id: '10',
        name: 'Rocket League',
        poster: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80'
    })
];
const eventList = [
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ArmoyuEvent"]({
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
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ArmoyuEvent"]({
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
            {
                name: 'Berkay Tikenoğlu',
                role: 'Baş Hakem',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay'
            },
            {
                name: 'MythX',
                role: 'Organizasyon Sorumlusu',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MythX'
            }
        ],
        teams: [
            {
                id: 't1',
                name: 'Shadow Ninjas',
                logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Shadow',
                played: 14,
                won: 12,
                lost: 2,
                points: 36,
                streak: [
                    'W',
                    'W',
                    'W',
                    'L',
                    'W'
                ]
            },
            {
                id: 't2',
                name: 'Neon Wizards',
                logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Neon',
                played: 14,
                won: 11,
                lost: 3,
                points: 33,
                streak: [
                    'W',
                    'W',
                    'L',
                    'W',
                    'W'
                ]
            },
            {
                id: 't3',
                name: 'Iron Valkyries',
                logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Iron',
                played: 14,
                won: 10,
                lost: 4,
                points: 30,
                streak: [
                    'L',
                    'W',
                    'W',
                    'W',
                    'L'
                ]
            },
            {
                id: 't4',
                name: 'Cyber Phantoms',
                logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Cyber',
                played: 14,
                won: 9,
                lost: 5,
                points: 27,
                streak: [
                    'W',
                    'L',
                    'W',
                    'L',
                    'W'
                ]
            },
            {
                id: 't5',
                name: 'Runic Storm',
                logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Runic',
                played: 14,
                won: 8,
                lost: 6,
                points: 24,
                streak: [
                    'W',
                    'W',
                    'L',
                    'W',
                    'L'
                ]
            },
            {
                id: 't6',
                name: 'Void Walkers',
                logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Void',
                played: 14,
                won: 8,
                lost: 6,
                points: 24,
                streak: [
                    'L',
                    'L',
                    'W',
                    'W',
                    'W'
                ]
            },
            {
                id: 't7',
                name: 'Solar Flare',
                logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Solar',
                played: 14,
                won: 7,
                lost: 7,
                points: 21,
                streak: [
                    'W',
                    'L',
                    'L',
                    'W',
                    'L'
                ]
            },
            {
                id: 't8',
                name: 'Frost Giants',
                logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Frost',
                played: 14,
                won: 7,
                lost: 7,
                points: 21,
                streak: [
                    'L',
                    'W',
                    'W',
                    'L',
                    'W'
                ]
            },
            {
                id: 't9',
                name: 'Cobra Kai',
                logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Cobra',
                played: 14,
                won: 6,
                lost: 8,
                points: 18,
                streak: [
                    'W',
                    'L',
                    'W',
                    'L',
                    'L'
                ]
            },
            {
                id: 't10',
                name: 'Titan Force',
                logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Titan',
                played: 14,
                won: 6,
                lost: 8,
                points: 18,
                streak: [
                    'L',
                    'W',
                    'L',
                    'L',
                    'W'
                ]
            },
            {
                id: 't11',
                name: 'Phoenix Reborn',
                logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Phoenix',
                played: 14,
                won: 5,
                lost: 9,
                points: 15,
                streak: [
                    'W',
                    'L',
                    'L',
                    'W',
                    'L'
                ]
            },
            {
                id: 't12',
                name: 'Apex Predators',
                logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Apex',
                played: 14,
                won: 5,
                lost: 9,
                points: 15,
                streak: [
                    'L',
                    'L',
                    'W',
                    'L',
                    'W'
                ]
            },
            {
                id: 't13',
                name: 'Inferno Squad',
                logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Inferno',
                played: 14,
                won: 4,
                lost: 10,
                points: 12,
                streak: [
                    'L',
                    'W',
                    'L',
                    'W',
                    'L'
                ]
            },
            {
                id: 't14',
                name: 'Ghost Protocol',
                logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Ghost',
                played: 14,
                won: 4,
                lost: 10,
                points: 12,
                streak: [
                    'W',
                    'L',
                    'L',
                    'L',
                    'L'
                ]
            },
            {
                id: 't15',
                name: 'Vortex Legion',
                logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Vortex',
                played: 14,
                won: 3,
                lost: 11,
                points: 9,
                streak: [
                    'L',
                    'L',
                    'L',
                    'W',
                    'L'
                ]
            },
            {
                id: 't16',
                name: 'Zenith Zero',
                logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Zenith',
                played: 14,
                won: 2,
                lost: 12,
                points: 6,
                streak: [
                    'L',
                    'L',
                    'W',
                    'L',
                    'L'
                ]
            }
        ],
        leaderboard: [
            {
                rank: 1,
                player: 'Berkay Tikenoğlu',
                team: 'Shadow Ninjas',
                kills: 245,
                deaths: 85,
                assists: 120,
                points: 3450,
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay'
            },
            {
                rank: 2,
                player: 'MythX',
                team: 'Neon Wizards',
                kills: 232,
                deaths: 92,
                assists: 145,
                points: 3200,
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MythX'
            },
            {
                rank: 3,
                player: 'GlobalElite',
                team: 'Iron Valkyries',
                kills: 210,
                deaths: 105,
                assists: 88,
                points: 2950,
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Global'
            },
            {
                rank: 4,
                player: 'KralSlayer',
                team: 'Cyber Phantoms',
                kills: 198,
                deaths: 112,
                assists: 65,
                points: 2700,
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kral'
            },
            {
                rank: 5,
                player: 'NinjaX',
                team: 'Void Walkers',
                kills: 185,
                deaths: 98,
                assists: 130,
                points: 2650,
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ninja'
            }
        ]
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ArmoyuEvent"]({
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
const stationList = [
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Station"]({
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
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StationProduct"]({
                id: 'p1',
                name: 'Americano',
                price: 65,
                category: 'Kahve'
            }),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StationProduct"]({
                id: 'p3',
                name: 'Oyuncu Burger',
                price: 185,
                category: 'Yemek',
                isDeal: true,
                discountRate: '%15'
            })
        ],
        coupons: [
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StationCoupon"]({
                code: 'ARMOYU10',
                discount: '%10',
                expiryDate: '01.01.2027',
                description: 'Tüm kahvelerde geçerli!'
            })
        ]
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Station"]({
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
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WorkstationEquipment"]({
                id: 'eq1',
                name: 'VIP Streaming Odası',
                cpu: 'Intel Core i9-14900K',
                gpu: 'NVIDIA RTX 4090',
                ram: '64GB DDR5',
                monitor: 'ASUS ROG 540Hz'
            })
        ],
        pricing: [
            {
                label: 'Saati',
                price: 35,
                unit: 'saat'
            }
        ]
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Station"]({
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
        facilities: [
            'Otopark',
            'Duş',
            'Kantin'
        ],
        pricing: [
            {
                label: 'Gündüz (1 Saat)',
                price: 800,
                unit: 'seans'
            }
        ]
    })
];
}),
"[project]/src/lib/constants/surveyData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MOCK_SURVEYS_DATA",
    ()=>MOCK_SURVEYS_DATA
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@armoyu/core/dist/index.js [app-ssr] (ecmascript)");
;
const MOCK_SURVEYS_DATA = (userList)=>[
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Survey"]({
            id: 's1',
            question: 'Bir sonraki turnuva hangi oyunda olmalı?',
            description: 'Topluluk haftalık turnuvaları için oyun seçimi yapıyoruz. Oyununuzu kullanın!',
            createdAt: '2 gün önce',
            expiresAt: '2024-05-10',
            author: userList[0],
            options: [
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SurveyAnswer"]({
                    id: 'o1',
                    text: 'Counter-Strike 2',
                    votes: 145
                }),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SurveyAnswer"]({
                    id: 'o2',
                    text: 'League of Legends',
                    votes: 89
                }),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SurveyAnswer"]({
                    id: 'o3',
                    text: 'Valorant',
                    votes: 210
                }),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SurveyAnswer"]({
                    id: 'o4',
                    text: 'Rocket League',
                    votes: 42
                })
            ],
            hasVoted: true,
            myVoteId: 'o3'
        }),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Survey"]({
            id: 's2',
            question: 'ARMOYU V3 tasarımı hakkında ne düşünüyorsunuz?',
            description: 'Yeni nesil arayüzümüz hakkındaki görüşleriniz bizim için çok değerli. Lütfen puan verin!',
            createdAt: '5 saat önce',
            author: userList[0],
            options: [
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SurveyAnswer"]({
                    id: 'o1',
                    text: 'Mükemmel, çok modern!',
                    votes: 450
                }),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SurveyAnswer"]({
                    id: 'o2',
                    text: 'Güzel ama gelişmesi gereken yerler var.',
                    votes: 65
                }),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SurveyAnswer"]({
                    id: 'o3',
                    text: 'Eskisi daha iyiydi.',
                    votes: 12
                })
            ],
            hasVoted: false
        }),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Survey"]({
            id: 's3',
            question: 'Yazılım ekibimize yeni üyeler katılmalı mı?',
            description: 'Genişleyen projelerimiz için yeni yetenekler arıyoruz.',
            createdAt: '1 gün önce',
            expiresAt: '2024-04-30',
            author: userList[1],
            options: [
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SurveyAnswer"]({
                    id: 'o1',
                    text: 'Evet, daha hızlı ilerleriz.',
                    votes: 210
                }),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SurveyAnswer"]({
                    id: 'o2',
                    text: 'Hayır, şu anki ekip yeterli.',
                    votes: 45
                })
            ],
            hasVoted: true,
            myVoteId: 'o1'
        })
    ];
}),
"[project]/src/lib/constants/educationData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MOCK_EDUCATION_DATA",
    ()=>MOCK_EDUCATION_DATA
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@armoyu/core/dist/index.js [app-ssr] (ecmascript)");
;
const MOCK_EDUCATION_DATA = (userList)=>{
    // 1. School Teams (Traditional & Esports)
    const teams = [
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchoolTeam"]({
            id: 'st1',
            name: 'ARMOYU CS2 Team',
            gameOrSport: 'Counter-Strike 2',
            type: 'ESPORTS',
            schoolId: 'sch1',
            captain: userList[0]
        }),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchoolTeam"]({
            id: 'st2',
            name: 'UAV Football Varsity',
            gameOrSport: 'Football',
            type: 'TRADITIONAL_SPORTS',
            schoolId: 'sch1',
            captain: userList[11]
        }),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchoolTeam"]({
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
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Faculty"]({
            id: 'f1',
            name: 'Mühendislik Fakültesi',
            schoolId: 'sch1',
            representative: userList[14]
        }),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Faculty"]({
            id: 'f2',
            name: 'İktisadi ve İdari Bilimler Fakültesi',
            schoolId: 'sch1',
            representative: userList[12]
        }),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Faculty"]({
            id: 'f3',
            name: 'Fen Edebiyat Fakültesi',
            schoolId: 'sch2',
            representative: userList[3]
        })
    ];
    // 3. Classrooms
    const classrooms = [
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Classroom"]({
            id: 'c1',
            name: 'Web Geliştirme 101',
            schoolId: 'sch1',
            teacher: userList[0],
            password: 'armoyu_learn'
        }),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Classroom"]({
            id: 'c2',
            name: 'Algoritma ve Veri Yapıları',
            schoolId: 'sch1',
            teacher: userList[14]
        }),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Classroom"]({
            id: 'c3',
            name: 'Dijital Tasarım',
            schoolId: 'sch2',
            teacher: userList[1]
        })
    ];
    // 4. Schools
    const schools = [
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["School"]({
            id: 'sch1',
            name: 'İstanbul Teknik Üniversitesi',
            slug: 'itu',
            logo: 'https://upload.wikimedia.org/wikipedia/tr/a/ae/%C4%B0T%C3%9C_Logo.png',
            representative: userList[0],
            faculties: faculties.filter((f)=>f.schoolId === 'sch1'),
            teams: teams.filter((t)=>t.schoolId === 'sch1'),
            classrooms: classrooms.filter((cl)=>cl.schoolId === 'sch1'),
            memberCount: 1250
        }),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["School"]({
            id: 'sch2',
            name: 'Boğaziçi Üniversitesi',
            slug: 'bogazici',
            logo: 'https://upload.wikimedia.org/wikipedia/tr/b/b3/Bo%C4%9Fazi%C3%A7i_%C3%9Cniversitesi_Logosu.png',
            representative: userList[1],
            faculties: faculties.filter((f)=>f.schoolId === 'sch2'),
            teams: teams.filter((t)=>t.schoolId === 'sch2'),
            classrooms: classrooms.filter((cl)=>cl.schoolId === 'sch2'),
            memberCount: 890
        }),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["School"]({
            id: 'sch3',
            name: 'Sivas Cumhuriyet Üniversitesi',
            slug: 'cumhuriyet',
            logo: 'https://upload.wikimedia.org/wikipedia/tr/a/ac/Cumhuriyet_%C3%9Cniversitesi_Logosu.png',
            representative: userList[2],
            faculties: [
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Faculty"]({
                    id: 'f4',
                    name: 'Tıp Fakültesi',
                    schoolId: 'sch3',
                    representative: userList[4]
                }),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Faculty"]({
                    id: 'f5',
                    name: 'Eğitim Fakültesi',
                    schoolId: 'sch3',
                    representative: userList[5]
                })
            ],
            teams: [
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchoolTeam"]({
                    id: 'st4',
                    name: 'CU Eagles Volleyball',
                    gameOrSport: 'Volleyball',
                    type: 'TRADITIONAL_SPORTS',
                    schoolId: 'sch3',
                    captain: userList[2]
                }),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchoolTeam"]({
                    id: 'st5',
                    name: 'CU Valorant',
                    gameOrSport: 'Valorant',
                    type: 'ESPORTS',
                    schoolId: 'sch3',
                    captain: userList[4]
                })
            ],
            classrooms: [
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Classroom"]({
                    id: 'c4',
                    name: 'Temel Programlama',
                    schoolId: 'sch3',
                    teacher: userList[2]
                })
            ],
            memberCount: 2100
        }),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["School"]({
            id: 'sch4',
            name: 'Tokat Gaziosmanpaşa Üniversitesi',
            slug: 'gop',
            logo: 'https://upload.wikimedia.org/wikipedia/tr/5/5e/Tokat_Gaziosmanpa%C5%9Fa_%C3%9Cniversitesi_Logosu.png',
            representative: userList[3],
            faculties: [
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Faculty"]({
                    id: 'f6',
                    name: 'Ziraat Fakültesi',
                    schoolId: 'sch4',
                    representative: userList[3]
                })
            ],
            teams: [
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchoolTeam"]({
                    id: 'st6',
                    name: 'GOP Football',
                    gameOrSport: 'Football',
                    type: 'TRADITIONAL_SPORTS',
                    schoolId: 'sch4',
                    captain: userList[3]
                })
            ],
            classrooms: [],
            memberCount: 1450
        }),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["School"]({
            id: 'sch5',
            name: 'Samsun Ondokuz Mayıs Üniversitesi',
            slug: 'omu',
            logo: 'https://upload.wikimedia.org/wikipedia/tr/6/6d/Ondokuz_May%C4%B1s_%C3%9Cniversitesi_Logosu.png',
            representative: userList[10],
            faculties: [
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Faculty"]({
                    id: 'f7',
                    name: 'Hukuk Fakültesi',
                    schoolId: 'sch5',
                    representative: userList[10]
                })
            ],
            teams: [
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SchoolTeam"]({
                    id: 'st7',
                    name: 'OMU Cyber Sports',
                    gameOrSport: 'DotA 2',
                    type: 'ESPORTS',
                    schoolId: 'sch5',
                    captain: userList[11]
                })
            ],
            classrooms: [],
            memberCount: 3200
        })
    ];
    return {
        schools,
        faculties,
        teams,
        classrooms
    };
};
}),
"[project]/src/lib/constants/seedData.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MOCK_FORUM_CATEGORIES",
    ()=>MOCK_FORUM_CATEGORIES,
    "MOCK_FORUM_TOPICS",
    ()=>MOCK_FORUM_TOPICS,
    "MOCK_GIVEAWAYS",
    ()=>MOCK_GIVEAWAYS,
    "MOCK_MODS",
    ()=>MOCK_MODS,
    "MOCK_NEWS",
    ()=>MOCK_NEWS,
    "MOCK_NOTES",
    ()=>MOCK_NOTES,
    "MOCK_PRODUCTS",
    ()=>MOCK_PRODUCTS,
    "MOCK_PROJECTS",
    ()=>MOCK_PROJECTS,
    "MOCK_RANKING_LEVEL",
    ()=>MOCK_RANKING_LEVEL,
    "MOCK_RANKING_POPULARITY",
    ()=>MOCK_RANKING_POPULARITY,
    "MOCK_SESSION",
    ()=>MOCK_SESSION,
    "MOCK_STORIES",
    ()=>MOCK_STORIES,
    "MOCK_SURVEYS",
    ()=>MOCK_SURVEYS,
    "armoyuGiveaways",
    ()=>armoyuGiveaways,
    "armoyuProjects",
    ()=>armoyuProjects,
    "classroomList",
    ()=>classroomList,
    "facultyList",
    ()=>facultyList,
    "giveawayList",
    ()=>giveawayList,
    "groupList",
    ()=>groupList,
    "mockGlobalStats",
    ()=>mockGlobalStats,
    "newsList",
    ()=>newsList,
    "postList",
    ()=>postList,
    "projectList",
    ()=>projectList,
    "roles",
    ()=>roles,
    "schoolList",
    ()=>schoolList,
    "schoolTeamList",
    ()=>schoolTeamList,
    "sessionList",
    ()=>sessionList,
    "surveyList",
    ()=>surveyList,
    "userList",
    ()=>userList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@armoyu/core/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$teamData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants/teamData.ts [app-ssr] (ecmascript)");
// Modular data imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$stationData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants/stationData.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$surveyData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants/surveyData.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$educationData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants/educationData.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const roles = {
    admin: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Role"]({
        id: 'admin',
        name: 'Kurucu',
        color: '#ff4d4d'
    }),
    memberMgmt: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Role"]({
        id: 'member_mgmt',
        name: 'Üye Yönetim',
        color: '#ff4d4d'
    }),
    discipline: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Role"]({
        id: 'discipline',
        name: 'Düzen Ve Disiplin Yönetim',
        color: '#ff4d4d'
    }),
    eventMgmt: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Role"]({
        id: 'event_mgmt',
        name: 'Etkinlik Yönetim',
        color: '#ff4d4d'
    }),
    assettoOfficial: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Role"]({
        id: 'assetto_official',
        name: 'Oyun Yetkilisi (Assetto Corsa)',
        color: '#3b82f6'
    }),
    mcOfficial: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Role"]({
        id: 'mc_official',
        name: 'Oyun Yetkilisi (Minecraft)',
        color: '#3b82f6'
    }),
    responsible: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Role"]({
        id: 'responsible',
        name: 'Sorumlu',
        color: '#3b82f6'
    }),
    gameDev: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Role"]({
        id: 'game_dev',
        name: 'Oyun Geliştiricisi',
        color: '#10b981'
    }),
    softwareDev: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Role"]({
        id: 'software_dev',
        name: 'Yazılım Geliştirici',
        color: '#10b981'
    }),
    frontendDev: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Role"]({
        id: 'frontend_dev',
        name: 'Frontend Developer',
        color: '#10b981'
    }),
    backendDev: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Role"]({
        id: 'backend_dev',
        name: 'Backend Developer',
        color: '#10b981'
    }),
    fullstackDev: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Role"]({
        id: 'fullstack_dev',
        name: 'Full Stack Developer',
        color: '#10b981'
    }),
    streamerContent: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Role"]({
        id: 'streamer_content',
        name: 'Streamer / Content',
        color: '#a855f7'
    }),
    streamerGaming: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Role"]({
        id: 'streamer_gaming',
        name: 'Streamer / Gaming',
        color: '#a855f7'
    }),
    streamer: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Role"]({
        id: 'streamer',
        name: 'Yayıncı',
        color: '#a855f7'
    }),
    esports: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Role"]({
        id: 'esports',
        name: 'E-Sporcu',
        color: '#f97316'
    }),
    user: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Role"]({
        id: 'user',
        name: 'Kullanıcı',
        color: '#808080'
    }),
    qualified: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Role"]({
        id: 'qualified',
        name: 'Nitelikli Oyuncu',
        color: '#4ade80'
    })
};
/**
 * Community Room Constant (Plain data for constructor)
 */ const TOPLULUK_ODASI_DATA = {
    id: 'community-room',
    name: 'Topluluk Odası',
    avatar: 'https://cdn.pixabay.com/photo/2017/02/13/11/44/community-2062409_1280.png',
    time: 'Canlı',
    unreadCount: 42,
    isOnline: true,
    lastSeen: 'Şu an aktif',
    participants: [],
    messages: [
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatMessage"]({
            id: 'c1',
            sender: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["User"]({
                displayName: 'Sistem',
                avatar: 'https://cdn.pixabay.com/photo/2017/02/13/11/44/community-2062409_1280.png'
            }),
            content: 'Topluluk Odası Sohbetine Hoş Geldiniz!',
            timestamp: 'Hep',
            isSystem: true
        }),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatMessage"]({
            id: 'c2',
            sender: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["User"]({
                displayName: 'Alperen',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alperen'
            }),
            content: 'Selamlar herkese!',
            timestamp: '10:00',
            isSystem: false
        }),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatMessage"]({
            id: 'c3',
            sender: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["User"]({
                displayName: 'Berkay',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay'
            }),
            content: 'V3 yakında yayında!',
            timestamp: '10:05',
            isSystem: false
        })
    ]
};
// Add lastMessage dynamically
const TOPLULUK_ODASI = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Chat"]({
    ...TOPLULUK_ODASI_DATA,
    lastMessage: TOPLULUK_ODASI_DATA.messages[2],
    updatedAt: Date.now(),
    isGroup: true
});
const groupList = [
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]({
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
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]({
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
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]({
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
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]({
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
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]({
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
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]({
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
const userList = [
    // YÖNETİM EKİBİ
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["User"]({
        displayName: 'Berkay Tikenoğlu',
        role: roles.admin,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay',
        username: 'berkaytikenoglu',
        verified: true,
        bio: 'ARMOYU Kurucusu & Yazılım Geliştirici',
        level: 99,
        xp: 5000,
        popScore: 15000,
        groups: [
            groupList[0],
            groupList[1],
            groupList[5]
        ],
        favoriteTeam: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$teamData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SUPER_LEAGUE_TEAMS"][1],
        zodiac: 'Akrep',
        punishmentCount: 0,
        distrustScore: 1.0,
        odp: 90
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["User"]({
        displayName: 'MythX',
        role: roles.memberMgmt,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MythX',
        username: 'mythx',
        verified: true,
        level: 85,
        xp: 3200,
        popScore: 12500,
        groups: [
            groupList[1],
            groupList[2]
        ],
        punishmentCount: 2,
        distrustScore: 1.2,
        odp: 75
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["User"]({
        displayName: 'Barış Müftüoğlu',
        role: roles.discipline,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Baris',
        username: 'barismuftuoglu',
        verified: true,
        level: 82,
        xp: 2800,
        popScore: 11000,
        groups: [
            groupList[3]
        ],
        punishmentCount: 5,
        distrustScore: 1.5,
        odp: 45
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["User"]({
        displayName: 'Bey Ev',
        role: roles.eventMgmt,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Beytullah',
        username: 'beyev',
        verified: true,
        level: 80,
        xp: 2500,
        popScore: 10500,
        punishmentCount: 0,
        odp: 80
    }),
    // SORUMLULAR
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["User"]({
        displayName: 'Yılmaz Akşahin',
        role: roles.assettoOfficial,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yilmaz',
        username: 'yilmazaksahin',
        level: 65,
        popScore: 8500,
        punishmentCount: 0
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["User"]({
        displayName: 'Orkun Atılgan',
        role: roles.mcOfficial,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Orkun',
        username: 'orkunatilgan',
        level: 68,
        popScore: 9200,
        punishmentCount: 0
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["User"]({
        displayName: 'Furkan Sarıdiken',
        role: roles.responsible,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Furkan',
        username: 'furkansaridiken',
        level: 60,
        popScore: 7800,
        punishmentCount: 9,
        distrustScore: 3.0
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["User"]({
        displayName: 'Burakcan TOPAL',
        role: roles.responsible,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Burakcan',
        username: 'burakcantopal',
        level: 58,
        popScore: 7500
    }),
    // YAZILIM VE GELİŞTİRME
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["User"]({
        displayName: 'Burak Erel',
        role: roles.gameDev,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Burak',
        username: 'burakerel',
        level: 75,
        popScore: 9800,
        groups: [
            groupList[0]
        ]
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["User"]({
        displayName: 'Engin Kuşkovan',
        role: roles.softwareDev,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Engin',
        username: 'enginkuskovan',
        level: 72,
        popScore: 9400
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["User"]({
        displayName: 'Nariman Rustamli',
        role: roles.softwareDev,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nariman',
        username: 'narimanrustamli',
        level: 70,
        popScore: 9000
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["User"]({
        displayName: 'Ersan Güvenç',
        role: roles.qualified,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ersan',
        username: 'ersanguvenc',
        level: 70,
        popScore: 8900
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["User"]({
        displayName: 'Oğuzhan Seslikaya',
        role: roles.qualified,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Oguzhan',
        username: 'oguzhanseslikaya',
        level: 70,
        popScore: 8850
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["User"]({
        displayName: 'Ömer Efe Dikici',
        role: roles.frontendDev,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Efe',
        username: 'omerefedikici',
        level: 78,
        popScore: 10200
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["User"]({
        displayName: 'Ömer Faruk Sayın',
        role: roles.backendDev,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Faruk',
        username: 'omerfaruksayin',
        level: 77,
        popScore: 10100
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["User"]({
        displayName: 'Emre Sandal',
        role: roles.fullstackDev,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emre',
        username: 'emresandal',
        level: 79,
        popScore: 10300
    }),
    // YAYINCILAR
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["User"]({
        displayName: 'Metehan Çakır',
        role: roles.streamerContent,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Metehan',
        username: 'metehancakir',
        level: 88,
        popScore: 13500
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["User"]({
        displayName: 'Bartu Başaran',
        role: roles.streamerGaming,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bartu',
        username: 'bartubasaran',
        level: 86,
        popScore: 12800
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["User"]({
        displayName: 'Erhan',
        role: roles.streamer,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Erhan',
        username: 'erhan',
        level: 84,
        popScore: 12200
    }),
    // E-SPOR LİSANSLI OYUNCULAR
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["User"]({
        displayName: 'Gabriel Eren Gümüşdal',
        role: roles.esports,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gabriel',
        username: 'gabrieleren',
        level: 92,
        popScore: 14200
    }),
    // Nitelikli Oyuncular
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["User"]({
        displayName: 'Emir K.',
        role: roles.esports,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EmirK',
        username: 'emir',
        level: 92,
        popScore: 14200
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["User"]({
        displayName: 'Tugra',
        role: roles.esports,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tugra',
        username: 'tugra',
        level: 92,
        popScore: 14200
    })
];
// Generate 100 additional mock users
const firstNames = [
    'Ahmet',
    'Mehmet',
    'Can',
    'Deniz',
    'Selin',
    'Elif',
    'Burak',
    'Oğuz',
    'Hakan',
    'Ayşe',
    'Fatma',
    'Gökhan',
    'Emre',
    'Zeynep',
    'Kaan'
];
const lastNames = [
    'Yılmaz',
    'Kaya',
    'Demir',
    'Çelik',
    'Şahin',
    'Yıldız',
    'Öztürk',
    'Aydın',
    'Özkan',
    'Arslan',
    'Bulut',
    'Yavuz',
    'Koç',
    'Kurt',
    'Aksoy'
];
for(let i = 0; i < 100; i++){
    const fName = firstNames[i % firstNames.length];
    const lName = lastNames[i % lastNames.length];
    userList.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["User"]({
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
;
const MOCK_SURVEYS = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$surveyData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOCK_SURVEYS_DATA"])(userList);
const surveyList = MOCK_SURVEYS;
;
const edu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$educationData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOCK_EDUCATION_DATA"])(userList);
const schoolList = edu.schools;
const facultyList = edu.faculties;
const schoolTeamList = edu.teams;
const classroomList = edu.classrooms;
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
    {
        id: 'bm1',
        senderName: 'MythX',
        senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MythX',
        content: 'Dostum selam, discord botunda ufak bir arıza var sanırım. Rolleri vermiyor.',
        timestamp: '10:30'
    },
    {
        id: 'bm2',
        senderName: 'Berkay',
        senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay',
        content: 'Selam. Evet fark ettim, V3 güncellemesi sırasında API token süresi dolmuş.',
        timestamp: '10:35'
    },
    {
        id: 'bm3',
        senderName: 'Berkay',
        senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay',
        content: 'Tokeni yeniledim, şimdi tekrar test eder misin? Sunucuya da reset atıyorum emin olmak için.',
        timestamp: '10:36'
    },
    {
        id: 'bm4',
        senderName: 'MythX',
        senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MythX',
        content: 'Tamamdır deniyorum.',
        timestamp: '10:40'
    },
    {
        id: 'bm5',
        senderName: 'MythX',
        senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MythX',
        content: 'Sunucuya reset atıyorum...',
        timestamp: '10:42'
    }
];
// ---------------------------------------------------------
// STEP 1: Basic Community & Initial Groups
// ---------------------------------------------------------
userList.forEach((user)=>{
    // Sync group memberships
    user.groups.forEach((group)=>{
        if (!group.members.some((m)=>m.username === user.username)) {
            group.members.push(user);
            group.memberCount = group.members.length;
        }
        if (group.permissions.length === 0) {
            group.permissions = [
                'GÖNDERİ_PAYLAŞ',
                'YORUM_YAP',
                'ETKİNLİK_GÖR',
                'MESAJ_GÖNDER'
            ];
        }
    });
});
// ---------------------------------------------------------
// STEP 2: Bidirectional Friendships
// ---------------------------------------------------------
userList.forEach((user, index)=>{
    // Add 5 random FRIENDS for everyone (bidirectional)
    const targetFriendCount = 5;
    for(let i = 0; user.friends.length < targetFriendCount && i < 20; i++){
        const randomFriend = userList[(index + 10 + i * 13) % userList.length];
        if (randomFriend.username !== user.username) {
            if (!user.friends.some((f)=>f.username === randomFriend.username)) user.friends.push(randomFriend);
            if (!randomFriend.friends.some((f)=>f.username === user.username)) randomFriend.friends.push(user);
        }
    }
    // Ensure Berkay & MythX are friends
    if (user.username === 'berkaytikenoglu') {
        const myth = userList.find((u)=>u.username === 'mythx');
        if (myth) {
            if (!user.friends.some((f)=>f.username === 'mythx')) user.friends.push(myth);
            if (!myth.friends.some((f)=>f.username === 'berkaytikenoglu')) myth.friends.push(user);
        }
    }
});
const postList = [
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Post"]({
        id: 'p1',
        author: userList[0],
        content: 'ARMOYU V3 sistemleri üzerinde çalışmaya devam ediyoruz! Çok yakında yeni özelliklerle karşınızda olacağız. #ARMOYU #V3 #Development',
        createdAt: '2 saat önce',
        stats: {
            likes: 124,
            comments: 2,
            reposts: 5,
            shares: 8
        },
        hashtags: [
            'ARMOYU',
            'V3',
            'Development'
        ],
        likeList: [
            userList[1],
            userList[2],
            userList[5],
            userList[8],
            userList[15]
        ],
        repostList: [
            userList[3],
            userList[10]
        ],
        commentList: [
            {
                id: 'c1',
                author: userList[4],
                content: 'Büyük merakla bekliyoruz! Elinize sağlık.',
                createdAt: '1 saat önce'
            },
            {
                id: 'c2',
                author: userList[12],
                content: 'Dashboard tasarımı çok temiz olmuş.',
                createdAt: '30 dk önce',
                replies: [
                    {
                        id: 'c2-1',
                        author: userList[0],
                        content: 'Teşekkürler hocam! 🙏',
                        createdAt: '10 dk önce'
                    }
                ]
            }
        ]
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Post"]({
        id: 'p2',
        author: userList[1],
        content: 'Bu akşam saat 20:00\'de büyük bir çekilişimiz var, sakın kaçırmayın! 🔥',
        createdAt: '5 saat önce',
        stats: {
            likes: 85,
            comments: 1,
            reposts: 12,
            shares: 20
        },
        media: [
            {
                type: 'image',
                url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop'
            }
        ],
        likeList: [
            userList[0],
            userList[10],
            userList[22],
            userList[45],
            userList[12],
            userList[5],
            userList[8]
        ],
        repostList: [
            userList[5],
            userList[8],
            userList[14],
            userList[16]
        ],
        commentList: [
            {
                id: 'p2-c1',
                author: userList[5],
                content: 'Yine efsane bir çekiliş bizi bekliyor!',
                createdAt: '4 saat önce'
            }
        ]
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Post"]({
        id: 'p3',
        author: userList[2],
        content: 'Bugün harika bir day! Herkese iyi oyunlar dilerim. 🤍',
        createdAt: '1 gün önce',
        stats: {
            likes: 56,
            comments: 0,
            reposts: 1,
            shares: 2
        },
        likeList: [
            userList[1],
            userList[15],
            userList[18],
            userList[0],
            userList[5],
            userList[10]
        ],
        repostList: [
            userList[1]
        ]
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Post"]({
        id: 'p4',
        author: userList[0],
        content: 'Yeni bir blog yazısı paylaştım! "Modern Web Geliştirme Trendleri" hakkındaki düşüncelerimi okuyabilirsiniz. #Blog #WebDev',
        createdAt: '3 saat önce',
        stats: {
            likes: 210,
            comments: 0,
            reposts: 8,
            shares: 12
        },
        likeList: [
            userList[2],
            userList[14],
            userList[50],
            userList[60],
            userList[1],
            userList[5],
            userList[10],
            userList[11],
            userList[12]
        ],
        repostList: [
            userList[14],
            userList[5],
            userList[2]
        ]
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Post"]({
        id: 'p5',
        author: userList[14],
        content: 'Kod yazarken kahve olmazsa olmaz diyenler? ☕️⌨️',
        createdAt: '6 saat önce',
        stats: {
            likes: 45,
            comments: 0,
            reposts: 2,
            shares: 1
        },
        media: [
            {
                type: 'image',
                url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2670&auto=format&fit=crop'
            }
        ],
        likeList: [
            userList[0],
            userList[12],
            userList[1],
            userList[2],
            userList[3],
            userList[4]
        ]
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Post"]({
        id: 'p6',
        author: userList[16],
        content: 'Birazdan yayındayız! Minecraft Survival serisinin yeni bölümü geliyor. Kaçırmayın! 🔴',
        createdAt: '10 dk önce',
        stats: {
            likes: 890,
            comments: 0,
            reposts: 50,
            shares: 30
        },
        likeList: [
            userList[1],
            userList[2],
            userList[3],
            userList[10],
            userList[11],
            userList[12],
            userList[14],
            userList[0],
            userList[5]
        ],
        repostList: [
            userList[0],
            userList[1],
            userList[14]
        ]
    })
];
// Final synchronization: link posts to users' myPosts list
postList.forEach((post)=>{
    if (post.author) {
        const user = userList.find((u)=>u.username === post.author?.username);
        if (user) {
            if (!user.myPosts.some((p)=>p.id === post.id)) {
                user.myPosts.push(post);
            }
        }
    }
});
const MOCK_SESSION = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Session"]({
    user: userList[0],
    token: 'mock-jwt-token-berkay',
    notifications: [
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Notification"]({
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
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Notification"]({
            id: 'n2',
            type: 'POST_COMMENT',
            category: 'SOCIAL',
            title: 'Yeni Yorum',
            sender: userList[4].toNotificationSender(),
            createdAt: '1 saat önce',
            isRead: false
        }),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Notification"]({
            id: 'n3',
            type: 'GROUP_INVITE',
            category: 'GROUP',
            group: groupList[1],
            sender: groupList[1].toNotificationSender(),
            createdAt: '3 saat önce',
            isRead: true
        }),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Notification"]({
            id: 'n4',
            type: 'SYSTEM_UPDATE',
            category: 'SYSTEM',
            title: 'Sistem Güncellemesi',
            message: 'ARMOYU V3 Beta 1.2 sürümüne güncellendi.',
            sender: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NotificationSender"].system(),
            createdAt: '1 gün önce',
            isRead: true
        })
    ],
    chatList: [
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Chat"]({
            id: 'c1',
            name: userList[1].displayName,
            avatar: userList[1].avatar,
            participants: [
                userList[0],
                userList[1]
            ],
            lastMessage: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatMessage"]({
                content: 'V3 sistemleri efsane oldu!',
                timestamp: '10:45'
            }),
            time: '10:45',
            unreadCount: 1,
            isOnline: true
        }),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Chat"]({
            id: 'c2',
            name: userList[14].displayName,
            avatar: userList[14].avatar,
            participants: [
                userList[0],
                userList[14]
            ],
            lastMessage: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatMessage"]({
                content: 'Aksam turnuva var mi?',
                timestamp: 'Dun'
            }),
            time: 'Dun',
            unreadCount: 0,
            isOnline: false
        }),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Chat"]({
            id: 'c3',
            name: 'ARMOYU Yonetim',
            avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=Admin',
            isGroup: true,
            participants: [
                userList[0],
                userList[1],
                userList[2]
            ],
            lastMessage: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatMessage"]({
                content: 'Yeni istasyonlar eklendi.',
                timestamp: '2 gun once'
            }),
            time: '2 gun once',
            unreadCount: 5,
            isOnline: true
        })
    ]
});
const MOCK_PRODUCTS = [
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Product"]({
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
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Product"]({
        id: '2',
        name: '1000 ARMOYU Coin',
        category: 'Oyun İçi',
        description: 'Market alışverişlerinde ve özel etkinliklerde kullanabileceğiniz dijital para birimidir.',
        price: 49.00,
        image: 'https://images.unsplash.com/photo-1621416848469-8c2033bc699b?w=800&q=80',
        stock: 9999
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Product"]({
        id: '3',
        name: 'Elite Minecraft Paketi',
        category: 'Oyun İçi',
        description: 'Minecraft sunucularımızda kullanabileceğiniz efsanevi ekipmanlar ve özel bloklar içerir.',
        price: 89.90,
        image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80',
        stock: 50
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Product"]({
        id: '4',
        name: 'ARMOYU Kapşonlu (Siyah)',
        category: 'Giyim',
        description: 'Yüksek kaliteli pamuklu kumaş, şık ARMOYU nakışı ile günlük giyimde fark yaratın.',
        price: 599.00,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
        stock: 25
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Product"]({
        id: '5',
        name: 'Efsanevi Kasa Anahtarı',
        category: 'Oyun İçi',
        price: 25.00,
        image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80',
        stock: 500
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Product"]({
        id: '6',
        name: 'Discord Özel Rolü',
        category: 'Üyelik',
        price: 19.90,
        image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80',
        stock: 1000
    })
];
const MOCK_NEWS = [
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["News"]({
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
        author: userList[0],
        date: '31 Mart 2024',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80',
        category: 'Güncelleme'
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["News"]({
        slug: 'yeni-donem-basliyor',
        title: 'Toplulukta Yeni Bir Dönem Başlıyor',
        excerpt: 'ARMOYU olarak topluluğumuzu bir üst seviyeye taşımak için yeni stratejilerimizi açıklıyoruz.',
        content: `
      <p>ARMOYU olarak topluluğumuzu bir üst seviyeye taşımak için yeni stratejilerimizi açıklıyoruz. Gelecek vizyonumuzda daha fazla oyun sunucusu ve daha geniş bir etkinlik takvimi yer alıyor.</p>
      <p>Yeni yılda yapacağımız turnuvalar ve özel buluşmalar ile Türkiye'nin en aktif oyun topluluğu olma yolunda ilerliyoruz.</p>
    `,
        author: userList[1],
        date: '30 Mart 2024',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80',
        category: 'Duyuru'
    })
];
const newsList = MOCK_NEWS;
const MOCK_NOTES = [
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Note"]({
        id: 'note-1',
        user: userList[0],
        note: 'Not bırak...',
        isMe: true
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Note"]({
        id: 'note-2',
        user: userList[1],
        note: 'V3 sistemleri efsane oldu! 🚀',
        isMe: false
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Note"]({
        id: 'note-3',
        user: userList[14],
        note: 'Akşam turnuva var, hazır mısınız? 🏆',
        isMe: false
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Note"]({
        id: 'note-4',
        user: userList[9],
        note: 'Kahve & Kod keyfi... ☕️⌨️',
        isMe: false
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Note"]({
        id: 'note-5',
        user: userList[13],
        note: 'Birazdan yayındayız! 🔴',
        isMe: false
    })
];
const mockGlobalStats = {
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
const MOCK_RANKING_LEVEL = [
    ...userList
].sort((a, b)=>(b.level || 0) - (a.level || 0)).slice(0, 10);
const MOCK_RANKING_POPULARITY = [
    ...userList
].sort((a, b)=>(b.popScore || 0) - (a.popScore || 0)).slice(0, 10);
const MOCK_STORIES = [
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Story"]({
        id: 's1',
        user: userList[0],
        hasUnseen: false,
        isMe: true
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Story"]({
        id: 's2',
        user: userList[1],
        hasUnseen: true,
        media: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670'
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Story"]({
        id: 's3',
        user: userList[14],
        hasUnseen: true,
        media: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200'
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Story"]({
        id: 's4',
        user: userList[9],
        hasUnseen: false,
        media: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800'
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Story"]({
        id: 's5',
        user: userList[13],
        hasUnseen: true,
        media: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2670'
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Story"]({
        id: 's6',
        user: userList[5],
        hasUnseen: false
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Story"]({
        id: 's7',
        user: userList[10],
        hasUnseen: true
    })
];
const MOCK_MODS = [
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mod"]({
        id: '1',
        name: 'ARMOYU Realistic Minecraft Pack',
        game: 'Minecraft',
        version: '1.20.1',
        author: userList[0],
        downloads: '1.2k',
        image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80',
        isFeatured: true,
        description: 'Minecraft görselliğini kökünden değiştiren, en gerçekçi shader ve doku paketleriyle entegre edilmiş ARMOYU özel mod paketi. Su yansımalarından, güneş ışınlarına kadar her detayı hisset.'
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mod"]({
        id: '2',
        name: 'Tofaş Doğan SLX Drift Mod',
        game: 'Assetto Corsa',
        version: 'v2.4',
        author: userList[2],
        downloads: '4.5k',
        image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80',
        description: 'Gelişmiş fizikler, ayarlanabilir süspansiyon ve tam uyumlu direksiyon hasasiyeti ile Tofaş Doğan SLX keyfini Assetto Corsa\'da yaşayın.'
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mod"]({
        id: '3',
        name: 'Medieval Kingdom Pack',
        game: 'Minecraft',
        version: '1.19.2',
        author: userList[3],
        downloads: '850',
        image: 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=800&q=80',
        description: 'Orta Çağ Krallığı temasına sahip bu devasa mod paketi, yeni silahlar, şatolar ve yepyeni düşmanlarla dolu zorlu bir hayatta kalma macerası.'
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mod"]({
        id: '4',
        name: 'Nürburgring Night Edition',
        game: 'Assetto Corsa',
        version: '1.0',
        author: userList[5],
        downloads: '2.1k',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
        description: 'Efsanevi Nürburgring pistini karanlık çöktüğünde gece aydınlatmalarıyla oynamak için optimize edilmiş yüksek kaliteli harita modu.'
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mod"]({
        id: '5',
        name: 'ARMOYU Voice Chat Integration',
        game: 'Minecraft',
        version: 'v1.5',
        author: userList[4],
        downloads: '3.2k',
        image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&q=80',
        description: 'Oyuncuların 3D ses konumu sistemiyle oyun içinde Discord olmadan direkt iletişim kurmasını sağlayan eşsiz ARMOYU plugini.'
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mod"]({
        id: '6',
        name: 'Ultra Shader Pack V2',
        game: 'Genel',
        version: 'v5.0',
        author: userList[11],
        downloads: '12k',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
        description: 'Işın izleme (Ray Tracing) teknolojisine benzeyen özel gölgelendirmeleri ile en çok tercih edilen ultra gerçekçi grafik motoru pakedi.'
    })
];
const MOCK_FORUM_CATEGORIES = [
    {
        title: 'ARMOYU TOPLULUĞU',
        boards: [
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Forum"]({
                id: 'duyurular',
                name: 'Duyurular & Haberler',
                desc: 'ARMOYU hakkında en güncel haberler ve resmi duyurular.',
                topicCount: 124,
                postCount: 2540
            }),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Forum"]({
                id: 'kurallar',
                name: 'Kurallar & Rehberler',
                desc: 'Topluluğumuzda uymanız gereken kurallar ve kullanım rehberleri.',
                topicCount: 12,
                postCount: 150
            })
        ]
    },
    {
        title: 'OYUN DÜNYASI',
        boards: [
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Forum"]({
                id: 'minecraft',
                name: 'Minecraft',
                desc: 'Minecraft sunucularımız, buildler ve teknik destek.',
                topicCount: 540,
                postCount: 8400,
                lastPost: {
                    topicTitle: 'Sunucuya nasıl girerim?',
                    author: 'MinecraftMaster',
                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MC',
                    time: '10 dk önce'
                }
            }),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Forum"]({
                id: 'csgo',
                name: 'Counter-Strike',
                desc: 'CS2 taktikleri, skin piyasası ve topluluk maçları.',
                topicCount: 320,
                postCount: 4200
            }),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Forum"]({
                id: 'assetto',
                name: 'Assetto Corsa',
                desc: 'Simülasyon dünyası, modlar ve drift etkinlikleri.',
                topicCount: 210,
                postCount: 1800
            })
        ]
    },
    {
        title: 'YAZILIM VE TEKNOLOJİ',
        boards: [
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Forum"]({
                id: 'web-dev',
                name: 'Web Geliştirme',
                desc: 'React, Next.js, CSS ve Web teknolojileri üzerine tartışmalar.',
                topicCount: 85,
                postCount: 740
            }),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Forum"]({
                id: 'python',
                name: 'Python & AI',
                desc: 'Python projeleri, veri bilimi ve yapay zeka.',
                topicCount: 42,
                postCount: 320
            })
        ]
    }
];
const MOCK_GIVEAWAYS = [
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Giveaway"]({
        id: 'g1',
        title: 'Aylık ARMOYU Plus Aboneliği',
        prize: '1 Aylık Plus + Discord Rolü',
        status: 'active',
        participants: 450,
        timeLeft: '3 Gün Kaldı',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80'
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Giveaway"]({
        id: 'g2',
        title: '500 ARMOYU Coin (Oyun İçi)',
        prize: '500 AC',
        status: 'active',
        participants: 210,
        timeLeft: '10 Saat Kaldı',
        image: 'https://images.unsplash.com/photo-1621416848469-8c2033bc699b?w=800&q=80'
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Giveaway"]({
        id: 'g3',
        title: 'Steam $10 Cüzdan Kodu',
        prize: '$10 Cüzdan',
        status: 'ended',
        participants: 1200,
        timeLeft: 'Sona Erdi',
        image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80'
    })
];
const giveawayList = MOCK_GIVEAWAYS;
const MOCK_PROJECTS = [
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Project"]({
        id: 'p1',
        name: 'ARMOYU V3 Dashboard',
        description: 'Yeni nesil ARMOYU topluluk yönetim platformu. Glassmorphism tasarımı, gerçek zamanlı bildirimler ve optimize edilmiş kullanıcı deneyimi sunar.',
        status: 'Geliştiriliyor',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80',
        techStack: [
            'Next.js',
            'TypeScript',
            'Tailwind CSS',
            'Socket.io'
        ],
        authors: [
            {
                user: userList[0],
                role: 'Proje Lideri'
            },
            {
                user: userList[1],
                role: 'UI/UX Tasarımcı'
            }
        ],
        group: groupList[1],
        url: 'https://v3.armoyu.com',
        githubUrl: 'https://github.com/armoyu/v3-dashboard'
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Project"]({
        id: 'p2',
        name: 'Realistic Minecraft Launcher',
        description: 'Modlu Minecraft oyuncuları için özel olarak geliştirilmiş, performans odaklı ve otomatik güncelleme özellikli launcher.',
        status: 'Tamamlandı',
        image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1200&q=80',
        techStack: [
            'Electron',
            'React',
            'Node.js'
        ],
        authors: [
            {
                user: userList[14],
                role: 'Baş Geliştirici'
            }
        ],
        group: groupList[0],
        url: 'https://launcher.armoyu.com'
    }),
    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Project"]({
        id: 'p3',
        name: 'ARMOYU Mobile App',
        description: 'Toplulukla her zaman bağlantıda kalmanızı sağlayan, Flutter ile geliştirilen modern mobil uygulama projesi.',
        status: 'Geliştiriliyor',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
        techStack: [
            'Flutter',
            'Dart',
            'Firebase'
        ],
        authors: [
            {
                user: userList[11],
                role: 'Mobile Dev'
            },
            {
                user: userList[0],
                role: 'API Architect'
            }
        ],
        group: groupList[1],
        githubUrl: 'https://github.com/armoyu/mobile-app'
    })
];
const projectList = MOCK_PROJECTS;
const sessionList = [];
const armoyuProjects = MOCK_PROJECTS;
const armoyuGiveaways = giveawayList;
const MOCK_FORUM_TOPICS = [
    // Minecraft Board Topics
    {
        id: '1',
        boardId: 'minecraft',
        title: 'Sunucuya nasıl girerim?',
        author: 'MinecraftMaster',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MC',
        replies: 12,
        views: 240,
        lastActivity: '10 dk önce',
        lastAuthor: 'Berkay Tikenoğlu',
        isPinned: true,
        isHot: true
    },
    {
        id: '2',
        boardId: 'minecraft',
        title: 'Hala whitelist bekliyorum!',
        author: 'Oyuncu42',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=42',
        replies: 4,
        views: 80,
        lastActivity: '2 saat önce',
        lastAuthor: 'Admin_Bey',
        isSolved: true
    },
    {
        id: '3',
        boardId: 'minecraft',
        title: 'Server lag sorunu yaşayan var mı?',
        author: 'GamerX',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=X',
        replies: 42,
        views: 1200,
        lastActivity: 'Dün 22:30',
        lastAuthor: 'Barış M.',
        isHot: true
    },
    {
        id: '4',
        boardId: 'minecraft',
        title: 'Modlar ne zaman güncellenecek?',
        author: 'ModluServer',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mod',
        replies: 2,
        views: 45,
        lastActivity: '3 gün önce',
        lastAuthor: 'Bey Ev'
    },
    {
        id: '5',
        boardId: 'minecraft',
        title: 'Minecraft build yarışması hakkında',
        author: 'BuilderGözü',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Build',
        replies: 15,
        views: 310,
        lastActivity: '5 gün önce',
        lastAuthor: 'MythX',
        isPinned: true
    },
    // Duyurular Board Topics
    {
        id: '6',
        boardId: 'duyurular',
        title: 'ARMOYU V3 Geliyor! Yenilikler Neler?',
        author: 'Armoyu Ekibi',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Armoyu',
        replies: 254,
        views: 5600,
        lastActivity: '2 dk önce',
        lastAuthor: 'Berkay Tikenoğlu',
        isPinned: true,
        isHot: true
    },
    {
        id: '7',
        boardId: 'duyurular',
        title: 'Topluluk Yöneticisi Alımları Başladı',
        author: 'Armoyu Ekibi',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Armoyu',
        replies: 45,
        views: 1200,
        lastActivity: '1 gün önce',
        lastAuthor: 'Admin_Bey',
        isPinned: true
    },
    {
        id: '8',
        boardId: 'duyurular',
        title: 'Sunucu Bakımı (12 Nisan)',
        author: 'Sistem Yöneticisi',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sys',
        replies: 12,
        views: 450,
        lastActivity: '5 gün önce',
        lastAuthor: 'Ahmet Y.',
        isSolved: true
    },
    // CSGO Board Topics
    {
        id: '9',
        boardId: 'csgo',
        title: 'CS2 Dust 2 Yeni Smoke Taktikleri',
        author: 'GlobalElite',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CS',
        replies: 34,
        views: 890,
        lastActivity: '1 saat önce',
        lastAuthor: 'KralSlayer',
        isHot: true
    },
    {
        id: '10',
        boardId: 'csgo',
        title: 'Prime fiyatları çok arttı',
        author: 'SilverGamer',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Silver',
        replies: 56,
        views: 1400,
        lastActivity: '3 saat önce',
        lastAuthor: 'TraderPro'
    },
    {
        id: '11',
        boardId: 'csgo',
        title: 'Kelebek bıçak takaslamak isteyen var mı?',
        author: 'SkinCollector',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Skin',
        replies: 8,
        views: 210,
        lastActivity: 'Dün',
        lastAuthor: 'ScammerNo1'
    },
    // Assetto Board Topics
    {
        id: '12',
        boardId: 'assetto',
        title: 'Tofaş modu nereden iner?',
        author: 'DriftKralı_34',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=34',
        replies: 5,
        views: 120,
        lastActivity: '15 dk önce',
        lastAuthor: 'ModDeveloper',
        isSolved: true
    },
    {
        id: '13',
        boardId: 'assetto',
        title: 'Direksiyon seti önerisi (Logitech G29 vs Thrustmaster)',
        author: 'RacerBoi',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Race',
        replies: 28,
        views: 650,
        lastActivity: '2 gün önce',
        lastAuthor: 'SimSim'
    },
    // Web Dev Board Topics
    {
        id: '14',
        boardId: 'web-dev',
        title: 'Next.js App Router Sorunsalı',
        author: 'Frontend_Ninja',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FE',
        replies: 18,
        views: 400,
        lastActivity: '45 dk önce',
        lastAuthor: 'FullstackG',
        isHot: true
    },
    {
        id: '15',
        boardId: 'web-dev',
        title: 'Tailwind CSS ile karanlık mod yapımı',
        author: 'CSS_Büyücüsü',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CSS',
        replies: 7,
        views: 180,
        lastActivity: 'Dün',
        lastAuthor: 'Berkay Tikenoğlu',
        isSolved: true
    }
];
}),
"[project]/src/context/AuthContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@armoyu/core/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$seedData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/constants/seedData.ts [app-ssr] (ecmascript) <locals>");
'use client';
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [session, setSession] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isLoginModalOpen, setIsLoginModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Check local storage for persistent login
        const savedUserStr = localStorage.getItem('armoyu_user');
        if (savedUserStr) {
            try {
                const savedData = JSON.parse(savedUserStr);
                const username = savedData.username;
                // Find user in seedData to maintain all object references
                const foundUser = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$seedData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["userList"].find((u)=>u.username === username);
                if (foundUser) {
                    setUser(foundUser);
                    // If it's Berkay, use the mock session with notifications
                    if (username === 'berkaytikenoglu') {
                        setSession(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$seedData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MOCK_SESSION"]);
                    } else {
                        setSession(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Session"]({
                            user: foundUser,
                            token: 'mock-token'
                        }));
                    }
                }
            } catch (e) {
                console.error('Failed to restore session', e);
                localStorage.removeItem('armoyu_user');
            }
        }
        // Explicitly set loading to false AFTER the check
        setIsLoading(false);
    }, []);
    const login = (userData)=>{
        setUser(userData);
        // Handle session initialization
        if (userData.username === 'berkaytikenoglu') {
            setSession(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$seedData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MOCK_SESSION"]);
        } else {
            setSession(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Session"]({
                user: userData,
                token: 'mock-token'
            }));
        }
        localStorage.setItem('armoyu_user', JSON.stringify({
            username: userData.username
        }));
        setIsLoginModalOpen(false); // Close modal on success
    };
    const logout = ()=>{
        setUser(null);
        setSession(null);
        localStorage.removeItem('armoyu_user');
    };
    const updateUser = (updatedUser)=>{
        setUser(updatedUser);
        if (session) {
            setSession(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Session"]({
                ...session,
                user: updatedUser
            }));
        }
    };
    const updateSession = (updatedSession)=>{
        setSession(updatedSession);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            session,
            login,
            logout,
            isLoading,
            isLoginModalOpen,
            setIsLoginModalOpen,
            updateUser,
            updateSession
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/AuthContext.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
}),
"[project]/src/context/SocketContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SocketProvider",
    ()=>SocketProvider,
    "useSocket",
    ()=>useSocket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@armoyu/core/dist/index.js [app-ssr] (ecmascript)");
'use client';
;
;
;
const SocketContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function SocketProvider({ children }) {
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["socketService"].isConnected);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleConnect = ()=>setIsConnected(true);
        const handleDisconnect = ()=>setIsConnected(false);
        const offConnect = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["socketService"].on('connect', handleConnect);
        const offDisconnect = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["socketService"].on('disconnect', handleDisconnect);
        return ()=>{
            offConnect();
            offDisconnect();
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SocketContext.Provider, {
        value: {
            isConnected,
            emit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["socketService"].emit.bind(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["socketService"]),
            on: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["socketService"].on.bind(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["socketService"])
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/SocketContext.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
function useSocket() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(SocketContext);
    if (context === undefined) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
}
}),
"[project]/src/context/CartContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartProvider",
    ()=>CartProvider,
    "useCart",
    ()=>useCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@armoyu/core/dist/index.js [app-ssr] (ecmascript)");
'use client';
;
;
;
const CartContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function CartProvider({ children }) {
    const [cart, setCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // Load cart from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedCart = localStorage.getItem('armoyu_cart');
        if (savedCart) {
            try {
                const parsed = JSON.parse(savedCart);
                setCart(parsed.map((i)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartItem"].fromJSON(i)));
            } catch (e) {
                console.error('Failed to parse cart', e);
            }
        }
    }, []);
    // Save cart to localStorage on change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        localStorage.setItem('armoyu_cart', JSON.stringify(cart));
    }, [
        cart
    ]);
    const addToCart = (product, quantity = 1)=>{
        setCart((prev)=>{
            const existing = prev.find((item)=>item.product.id === product.id);
            if (existing) {
                return prev.map((item)=>item.product.id === product.id ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartItem"]({
                        ...item,
                        quantity: item.quantity + quantity
                    }) : item);
            }
            return [
                ...prev,
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartItem"]({
                    product,
                    quantity
                })
            ];
        });
    };
    const removeFromCart = (productId)=>{
        setCart((prev)=>prev.filter((item)=>item.product.id !== productId));
    };
    const updateQuantity = (productId, quantity)=>{
        setCart((prev)=>prev.map((item)=>item.product.id === productId ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartItem"]({
                    ...item,
                    quantity: Math.max(1, quantity)
                }) : item));
    };
    const clearCart = ()=>setCart([]);
    const totalItems = cart.reduce((acc, item)=>acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item)=>acc + item.getTotalPrice(), 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CartContext.Provider, {
        value: {
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            totalPrice
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/CartContext.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
function useCart() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
}),
"[project]/src/context/ChatContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatProvider",
    ()=>ChatProvider,
    "useChat",
    ()=>useChat
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const ChatContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ChatProvider({ children }) {
    const [isChatOpen, setIsChatOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const toggleChat = ()=>setIsChatOpen(!isChatOpen);
    const openChat = ()=>setIsChatOpen(true);
    const closeChat = ()=>setIsChatOpen(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatContext.Provider, {
        value: {
            isChatOpen,
            toggleChat,
            openChat,
            closeChat
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/ChatContext.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
function useChat() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ChatContext);
    if (!context) throw new Error('useChat must be used within ChatProvider');
    return context;
}
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0d.~3to._.js.map