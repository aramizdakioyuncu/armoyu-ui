'use client';

import React, { useEffect, useState } from 'react';

interface RollingNumberProps {
  value: number | string;
  className?: string;
  suffix?: string;
}

export function RollingNumber({ value, className = "", suffix = "" }: RollingNumberProps) {
  const [digits, setDigits] = useState<string[]>([]);

  useEffect(() => {
    setDigits(value.toString().split(''));
  }, [value]);

  return (
    <div className={`inline-flex items-baseline select-none tabular-nums ${className}`}>
      <div className="flex items-center overflow-hidden h-[1.1em] leading-none">
        {digits.map((digit, idx) => (
          <Digit key={`${idx}-${digit}`} char={digit} />
        ))}
      </div>
      {suffix && (
        <span className="ml-0.5 leading-none">{suffix}</span>
      )}
    </div>
  );
}

function Digit({ char }: { char: string }) {
  const isNumber = !isNaN(parseInt(char));
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (isNumber) {
      // Small delay to ensure initial render is caught
      const timer = setTimeout(() => {
        setOffset(parseInt(char));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [char, isNumber]);

  if (!isNumber) {
    return <span className="inline-block px-0.5">{char}</span>;
  }

  return (
    <div className="relative w-[0.6em] h-[1.1em] flex flex-col items-center">
      <div 
        className="flex flex-col transition-transform duration-1000 cubic-bezier(0.16, 1, 0.3, 1)" 
        style={{ transform: `translateY(-${offset * 10}%)` }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} className="h-[1.1em] flex items-center justify-center shrink-0">
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}
