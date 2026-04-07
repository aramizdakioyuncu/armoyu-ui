import React from 'react';
import { 
  ForumBoard, 
  GroupCard, 
  groupList, 
  MOCK_FORUM_CATEGORIES 
} from '../../index';

export function CommunityTab() {
  return (
    <div className="space-y-12">
       <h3 className="text-2xl font-black italic uppercase tracking-tighter border-l-4 border-orange-500 pl-4">Topluluk & Forum</h3>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2">
             <ForumBoard {...MOCK_FORUM_CATEGORIES[1].boards[0]} />
          </div>
          <GroupCard {...groupList[0]} />
          <GroupCard {...groupList[1]} />
       </div>
    </div>
  );
}
