import React from 'react';
import { RollingNumber } from '../RollingNumber';
import { formatStatValue } from '../../lib/utils/numberFormat';

interface AnimatedStatProps {
  value: number | string;
  className?: string;
  showAnimation?: boolean;
  prefix?: string;
}

/**
 * A standard component for displaying animated numbers with unit formatting (K, M, B).
 * Uses formatStatValue to determine units and RollingNumber for the animation.
 */
export function AnimatedStat({ value, className = "", showAnimation = true, prefix = "" }: AnimatedStatProps) {
  // If value is not a number, we can't roll it easily with current logic
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
  
  if (isNaN(numericValue)) {
    return <span className={className}>{prefix}{value}</span>;
  }

  const { value: formattedValue, unit } = formatStatValue(numericValue);

  if (!showAnimation) {
    return <span className={className}>{prefix}{formattedValue}{unit}</span>;
  }

  return (
    <div className={`inline-flex items-baseline ${className}`}>
      {prefix && <span className="mr-0.5 leading-none">{prefix}</span>}
      <RollingNumber 
        value={formattedValue} 
        suffix={unit} 
      />
    </div>
  );
}
