/**
 * Design system dimensions and spacing values
 */

export const SPACING = {
  /** 2px */
  px: '0.125rem',
  /** 4px */
  1: '0.25rem',
  /** 8px */
  2: '0.5rem',
  /** 12px */
  3: '0.75rem',
  /** 16px */
  4: '1rem',
  /** 20px */
  5: '1.25rem',
  /** 24px */
  6: '1.5rem',
  /** 28px */
  7: '1.75rem',
  /** 32px */
  8: '2rem',
  /** 36px */
  9: '2.25rem',
  /** 40px */
  10: '2.5rem',
  /** 44px */
  11: '2.75rem',
  /** 48px */
  12: '3rem',
  /** 56px */
  14: '3.5rem',
  /** 64px */
  16: '4rem',
  /** 80px */
  20: '5rem',
  /** 96px */
  24: '6rem',
  /** 128px */
  32: '8rem',
  /** 160px */
  40: '10rem',
  /** 192px */
  48: '12rem',
  /** 224px */
  56: '14rem',
  /** 256px */
  64: '16rem',
} as const;

/**
 * Z-index layering system
 */
export const Z_INDEX = {
  /** Base layer */
  base: 0,
  /** Raised elements */
  raised: 1,
  /** Dropdown menus */
  dropdown: 10,
  /** Sticky elements */
  sticky: 20,
  /** Fixed elements */
  fixed: 30,
  /** Modal backdrop */
  backdrop: 40,
  /** Modal content */
  modal: 50,
  /** Popover content */
  popover: 60,
  /** Tooltip content */
  tooltip: 70,
  /** Toast notifications */
  toast: 80,
  /** Skip navigation links */
  skipNav: 90,
  /** Maximum z-index */
  max: 99,
} as const;

/**
 * Common component dimensions
 */
export const COMPONENT_SIZES = {
  /** Header heights */
  header: {
    mobile: SPACING[20], // 80px
    desktop: SPACING[24], // 96px
  },
  
  /** Button heights */
  button: {
    sm: SPACING[8], // 32px
    md: SPACING[10], // 40px
    lg: SPACING[12], // 48px
    xl: SPACING[14], // 56px
  },
  
  /** Input heights */
  input: {
    sm: SPACING[8], // 32px
    md: SPACING[10], // 40px
    lg: SPACING[12], // 48px
  },
  
  /** Avatar sizes */
  avatar: {
    xs: SPACING[6], // 24px
    sm: SPACING[8], // 32px
    md: SPACING[10], // 40px
    lg: SPACING[12], // 48px
    xl: SPACING[16], // 64px
    '2xl': SPACING[20], // 80px
  },
  
  /** Icon sizes */
  icon: {
    xs: SPACING[3], // 12px
    sm: SPACING[4], // 16px
    md: SPACING[5], // 20px
    lg: SPACING[6], // 24px
    xl: SPACING[8], // 32px
  },
} as const;

/**
 * Animation and interaction constants
 */
export const ANIMATION = {
  /** Transition durations */
  duration: {
    /** 75ms */
    fast: 75,
    /** 150ms */
    normal: 150,
    /** 200ms */
    slow: 200,
    /** 300ms */
    slower: 300,
    /** 500ms */
    slowest: 500,
  },
  
  /** Easing functions */
  easing: {
    linear: 'linear',
    ease: 'ease',
    'ease-in': 'ease-in',
    'ease-out': 'ease-out',
    'ease-in-out': 'ease-in-out',
    'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  /** Common delays */
  delay: {
    none: 0,
    short: 75,
    normal: 150,
    long: 300,
  },
} as const;

/**
 * Scroll and interaction thresholds
 */
export const INTERACTION = {
  /** Scroll thresholds */
  scroll: {
    /** Header hide/show threshold */
    headerThreshold: 100,
    /** Minimum scroll delta for direction change */
    minDelta: 3,
    /** Smooth scroll offset */
    offset: 80,
  },
  
  /** Touch and mouse thresholds */
  touch: {
    /** Minimum swipe distance */
    swipeThreshold: 50,
    /** Maximum tap duration */
    tapDuration: 200,
  },
  
  /** Keyboard interaction */
  keyboard: {
    /** Debounce delay for search */
    searchDelay: 300,
    /** Repeat delay */
    repeatDelay: 500,
  },
} as const;

/**
 * Type helpers
 */
export type SpacingKey = keyof typeof SPACING;
export type ZIndexKey = keyof typeof Z_INDEX;
export type ComponentSize = keyof typeof COMPONENT_SIZES;
export type AnimationDuration = keyof typeof ANIMATION.duration;