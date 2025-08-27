/**
 * Responsive breakpoints following Tailwind CSS standards
 * @see https://tailwindcss.com/docs/responsive-design
 */
export const BREAKPOINTS = {
  /** Extra small devices (portrait phones) */
  xs: 480,
  /** Small devices (landscape phones) */
  sm: 640,
  /** Medium devices (tablets) */
  md: 768,
  /** Large devices (desktops) */
  lg: 1024,
  /** Extra large devices (large desktops) */
  xl: 1280,
  /** 2x extra large devices (larger desktops) */
  '2xl': 1536,
} as const;

/**
 * Media query strings for breakpoints
 */
export const MEDIA_QUERIES = {
  xs: `(min-width: ${BREAKPOINTS.xs}px)`,
  sm: `(min-width: ${BREAKPOINTS.sm}px)`,
  md: `(min-width: ${BREAKPOINTS.md}px)`,
  lg: `(min-width: ${BREAKPOINTS.lg}px)`,
  xl: `(min-width: ${BREAKPOINTS.xl}px)`,
  '2xl': `(min-width: ${BREAKPOINTS['2xl']}px)`,
  
  // Range queries
  'sm-only': `(min-width: ${BREAKPOINTS.sm}px) and (max-width: ${BREAKPOINTS.md - 1}px)`,
  'md-only': `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`,
  'lg-only': `(min-width: ${BREAKPOINTS.lg}px) and (max-width: ${BREAKPOINTS.xl - 1}px)`,
  
  // Mobile-first
  'mobile': `(max-width: ${BREAKPOINTS.md - 1}px)`,
  'tablet': `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`,
  'desktop': `(min-width: ${BREAKPOINTS.lg}px)`,
  
  // Orientation
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',
  
  // Preferences
  'prefers-reduced-motion': '(prefers-reduced-motion: reduce)',
  'prefers-dark': '(prefers-color-scheme: dark)',
  'prefers-light': '(prefers-color-scheme: light)',
} as const;

/**
 * Type helpers for breakpoint values
 */
export type Breakpoint = keyof typeof BREAKPOINTS;
export type MediaQuery = keyof typeof MEDIA_QUERIES;