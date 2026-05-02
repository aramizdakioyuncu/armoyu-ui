'use client';

import React from 'react';
import { ForumBoard } from './ForumBoard';

interface ForumCategoryListProps {
   categories: any[];
}

export function ForumCategoryList({ categories }: ForumCategoryListProps) {
   return (
      <div className="space-y-8">
         {categories.map((category, idx) => (
           <div key={idx} className="space-y-6">
              <div className="flex items-center gap-4 ml-4">
                 <div className="w-1.5 h-6 bg-armoyu-primary rounded-full" />
                 <h2 className="text-sm font-black text-armoyu-text-muted uppercase tracking-[0.2em]">{category.title}</h2>
              </div>
              
              <div className="space-y-4">
                 {category.boards.map((board: any) => (
                    <ForumBoard key={board.id} {...board} />
                 ))}
              </div>
           </div>
         ))}
      </div>
   );
}
