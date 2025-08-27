import React from 'react';
import { BaseIconProps, ICON_SIZES } from './types';

export type SearchIconProps = BaseIconProps;

export default function SearchIcon({ 
  size = 'md', 
  color = 'currentColor',
  className = '',
  'aria-label': ariaLabel = 'Search',
  'aria-hidden': ariaHidden,
  ...props 
}: SearchIconProps) {
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
      <circle cx="11" cy="11" r="8"></circle>
      <path d="M21 21L16.65 16.65"></path>
    </svg>
  );
}