import React from 'react';
import { BaseIconProps, ICON_SIZES } from './types';

export type UserIconProps = BaseIconProps;

export default function UserIcon({ 
  size = 'md', 
  color = 'currentColor',
  className = '',
  'aria-label': ariaLabel = 'User Profile',
  'aria-hidden': ariaHidden,
  ...props 
}: UserIconProps) {
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
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}