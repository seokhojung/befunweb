import React from 'react';
import { BaseIconProps, ICON_SIZES } from './types';

export type MenuIconProps = BaseIconProps;

export default function MenuIcon({ 
  size = 'md', 
  color = 'currentColor',
  className = '',
  'aria-label': ariaLabel = 'Menu',
  'aria-hidden': ariaHidden,
  ...props 
}: MenuIconProps) {
  const iconSize = typeof size === 'string' ? ICON_SIZES[size] : size;
  
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
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      role={ariaHidden ? undefined : 'img'}
      {...props}
    >
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  );
}