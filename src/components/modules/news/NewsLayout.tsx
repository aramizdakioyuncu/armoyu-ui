'use client';

import React from 'react';
import { NewsHero } from './widgets/NewsHero';

interface NewsLayoutProps {
    children: React.ReactNode;
}

export function NewsLayout({ children }: NewsLayoutProps) {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header / Hero Section */}
            <NewsHero />

            {/* Main Content Area */}
            <div className="relative">
                {children}
            </div>
        </div>
    );
}
