'use client';

import React from 'react';
import Link from 'next/link';

interface HashtagLinkProps {
  tag: string;
}

export const HashtagLink: React.FC<HashtagLinkProps> = ({ tag }) => {
  return (
    <Link 
      href={`/?tab=sosyal&tag=${tag}`}
      className="text-armoyu-primary hover:text-armoyu-primary font-bold hover:underline transition-all"
    >
      #{tag}
    </Link>
  );
};
