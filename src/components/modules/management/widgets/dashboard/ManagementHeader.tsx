import React from 'react';

export interface ManagementHeaderProps {
  title: string | React.ReactNode;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const ManagementHeader = ({ 
  title, 
  subtitle,
  actions 
}: ManagementHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
         <h1 className="text-3xl font-black tracking-tight text-armoyu-text mb-1 uppercase italic leading-none">{title}</h1>
         {subtitle && <p className="text-armoyu-text-muted font-medium">{subtitle}</p>}
      </div>
      {actions && (
        <div className="flex gap-2">
           {actions}
        </div>
      )}
    </div>
  );
};
