import React from 'react';

export interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Toggle({ 
  checked, 
  defaultChecked, 
  onChange, 
  className = '',
  size = 'md' 
}: ToggleProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleChange = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent label click issues if wrapped
    const newValue = !isChecked;
    if (!isControlled) {
      setInternalChecked(newValue);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  const sizes = {
    sm: { width: 'w-8', height: 'h-4', circle: 'h-3 w-3', translate: 'translate-x-4' },
    md: { width: 'w-11', height: 'h-6', circle: 'h-5 w-5', translate: 'translate-x-5' },
    lg: { width: 'w-14', height: 'h-7', circle: 'h-6 w-6', translate: 'translate-x-7' }
  };

  const currentSize = sizes[size];

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      onClick={handleChange}
      className={`relative inline-flex ${currentSize.height} ${currentSize.width} shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-armoyu-primary focus-visible:ring-offset-2 ${
        isChecked ? 'bg-armoyu-primary shadow-[0_0_10px_rgba(var(--armoyu-primary-rgb),0.5)]' : 'bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20'
      } ${className}`}
    >
      <span className="sr-only">Toggle</span>
      <span
        className={`pointer-events-none inline-block ${currentSize.circle} transform rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ease-in-out ${
          isChecked ? currentSize.translate : 'translate-x-0'
        }`}
      />
    </button>
  );
}
