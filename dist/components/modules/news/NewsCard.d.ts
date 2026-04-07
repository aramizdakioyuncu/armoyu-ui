import { User } from '@armoyu/core';
export interface NewsCardProps {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    image: string;
    author: User | null;
}
export declare function NewsCard({ slug, title, excerpt, date, category, image, author }: NewsCardProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=NewsCard.d.ts.map