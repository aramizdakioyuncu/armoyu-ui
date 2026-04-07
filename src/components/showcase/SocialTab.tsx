import React from 'react';
import { 
  AuthSidebarLeft, 
  Stories, 
  PostCard, 
  postList 
} from '../../index';

export function SocialTab() {
  const samplePosts = postList.slice(0, 3);
  
  return (
    <div className="space-y-12">
       <h3 className="text-2xl font-black italic uppercase tracking-tighter border-l-4 border-purple-500 pl-4">Sosyal Modüller</h3>
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3">
             <AuthSidebarLeft />
          </aside>
          <div className="lg:col-span-9 space-y-8">
             <Stories />
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {samplePosts.map(post => <PostCard key={post.id} {...post} />)}
             </div>
          </div>
       </div>
    </div>
  );
}
