'use client';

import React, { useRef } from 'react';

export interface SearchBarProps {
  /** Placeholder metni */
  placeholder?: string;
  /** Mevcut değer */
  value: string;
  /** Değer değiştiğinde tetiklenir */
  onChange: (value: string) => void;
  /** Boyut varyantı */
  size?: 'sm' | 'md' | 'lg';
  /** Ek CSS sınıfları */
  className?: string;
}

const sizeClasses = {
  sm: 'px-4 py-2 text-xs rounded-xl',
  md: 'px-5 py-3 text-sm rounded-2xl',
  lg: 'px-6 py-3.5 text-sm rounded-2xl',
};

const iconSizes = {
  sm: 14,
  md: 18,
  lg: 20,
};

export function SearchBar({
  placeholder = 'Ara...',
  value,
  onChange,
  size = 'md',
  className = '',
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={`relative w-full md:w-80 group ${className}`}>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-armoyu-text focus:outline-none focus:border-armoyu-primary focus:ring-1 focus:ring-armoyu-primary transition-all font-medium placeholder:text-armoyu-text-muted/40 ${sizeClasses[size]} ${value ? 'pr-16' : 'pr-10'}`}
      />

      {/* Temizle butonu */}
      {value && (
        <button
          onClick={() => {
            onChange('');
            inputRef.current?.focus();
          }}
          className="absolute right-10 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/20 dark:hover:bg-white/20 transition-all"
          title="Temizle"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      {/* Büyüteç ikonu */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={iconSizes[size]}
        height={iconSizes[size]}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-armoyu-text-muted opacity-40 group-focus-within:opacity-70 group-focus-within:text-armoyu-primary transition-all"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </div>
  );
}
