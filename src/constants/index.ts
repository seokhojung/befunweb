/**
 * Central export for all constants
 * This provides a single import point for all application constants
 */

// Design system constants
export * from './breakpoints';
export * from './dimensions';
export * from './images';

// Re-export commonly used constants for convenience
export { 
  BREAKPOINTS,
  MEDIA_QUERIES,
  type Breakpoint,
  type MediaQuery 
} from './breakpoints';

export { 
  SPACING,
  Z_INDEX,
  COMPONENT_SIZES,
  ANIMATION,
  INTERACTION,
  type SpacingKey,
  type ZIndexKey,
  type ComponentSize,
  type AnimationDuration
} from './dimensions';

export { 
  IMAGE_SIZES,
  IMAGE_QUALITY,
  IMAGE_FORMATS,
  IMAGE_LOADING,
  IMAGE_PLACEHOLDER,
  BLUR_DATA_URLS,
  type ImageSize,
  type ImageQuality,
  type ImageFormat,
  type ImageLoading,
  type BlurDataUrl
} from './images';