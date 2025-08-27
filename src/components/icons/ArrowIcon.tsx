import React from 'react';
import { BaseIconProps, ICON_SIZES } from './types';

export interface ArrowIconProps extends BaseIconProps {
  direction?: 'left' | 'right' | 'up' | 'down';
}

export default function ArrowIcon({ 
  size = 'md', 
  color = 'currentColor',
  className = '',
  direction = 'right',
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
  ...props 
}: ArrowIconProps) {
  const iconSize = typeof size === 'string' ? ICON_SIZES[size] : size;
  
  const defaultAriaLabel = ariaLabel || `Arrow ${direction}`;
  
  const getArrowPath = () => {
    switch (direction) {
      case 'left':
        return <path d="m15 18-6-6 6-6"></path>;
      case 'up':
        return <path d="m18 15-6-6-6 6"></path>;
      case 'down':
        return <path d="m6 9 6 6 6-6"></path>;
      default: // right
        return <path d="m9 18 6-6-6-6"></path>;
    }
  };
  
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label={defaultAriaLabel}
      aria-hidden={ariaHidden}
      role={ariaHidden ? undefined : 'img'}
      {...props}
    >
      {getArrowPath()}
    </svg>
  );
}