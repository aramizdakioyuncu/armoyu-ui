'use client';

import React, { useEffect, useState } from 'react';

interface RollingNumberProps {
  value: number | string;
  className?: string;
}

export function RollingNumber({ value, className = "" }: RollingNumberProps) {
  const [digits, setDigits] = useState<string[]>([]);

  useEffect(() => {
    setDigits(value.toString().split(''));
  }, [value]);

  return (
    <div className={`flex items-center overflow-hidden h-[1.2em] leading-[1.2em] ${className}`}>
      {digits.map((digit, idx) => (
        <Digit key={`${idx}-${digit}`} char={digit} />
      ))}
    </div>
  );
}

function Digit({ char }: { char: string }) {
  const isNumber = !isNaN(parseInt(char));
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (isNumber) {
      setOffset(parseInt(char) * 100);
    }
  }, [char, isNumber]);

  if (!isNumber) {
    return <span className="inline-block transition-all duration-500">{char}</span>;
  }

  return (
    <div className="relative w-[0.6em] h-[1.2em] flex flex-col transition-transform duration-500 ease-out" 
         style={{ transform: `translateY(-${offset}%)` }}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
        <span key={n} className="h-[1.2em] flex items-center justify-center shrink-0">
          {n}
        </span>
      ))}
    </div>
  );
}
