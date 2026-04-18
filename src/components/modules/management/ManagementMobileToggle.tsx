import React from 'react';
import { Menu, X } from 'lucide-react';

export interface ManagementMobileToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

export const ManagementMobileToggle = ({ isOpen, onClick }: ManagementMobileToggleProps) => {
  return (
    <div className="lg:hidden mb-4">
      <button
        onClick={onClick}
        className="p-3 bg-armoyu-header-bg border border-armoyu-header-border rounded-2xl text-armoyu-text shadow-xl"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </div>
  );
};
