import React from 'react';
import { BaseIconProps, ICON_SIZES } from './types';

export type CloseIconProps = BaseIconProps;

export default function CloseIcon({ 
  size = 'md', 
  color = 'currentColor',
  className = '',
  'aria-label': ariaLabel = 'Close',
  'aria-hidden': ariaHidden,
  ...props 
}: CloseIconProps) {
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
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}