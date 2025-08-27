/**
 * Image optimization constants
 */

/**
 * Responsive image sizes for different use cases
 */
export const IMAGE_SIZES = {
  /** Product card images */
  productCard: "(max-width: 768px) 244px, (max-width: 1024px) 300px, 350px",
  
  /** Hero section images */
  hero: "100vw",
  
  /** Avatar images */
  avatar: "(max-width: 768px) 32px, (max-width: 1024px) 40px, 48px",
  
  /** Thumbnail images */
  thumbnail: "(max-width: 768px) 64px, (max-width: 1024px) 80px, 96px",
  
  /** Gallery images */
  gallery: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  
  /** Card images */
  card: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
  
  /** Banner images */
  banner: "(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw",
} as const;

/**
 * Image quality settings
 */
export const IMAGE_QUALITY = {
  /** Low quality for thumbnails */
  low: 60,
  /** Medium quality for cards */
  medium: 75,
  /** High quality for hero images */
  high: 85,
  /** Maximum quality for critical images */
  max: 95,
} as const;

/**
 * Supported image formats in order of preference
 */
export const IMAGE_FORMATS = {
  /** Modern formats */
  modern: ['avif', 'webp'] as const,
  /** Fallback formats */
  fallback: ['jpg', 'png'] as const,
  /** All supported formats */
  all: ['avif', 'webp', 'jpg', 'png'] as const,
} as const;

/**
 * Image loading strategies
 */
export const IMAGE_LOADING = {
  /** Load immediately (above the fold) */
  eager: 'eager',
  /** Load when needed (below the fold) */
  lazy: 'lazy',
} as const;

/**
 * Placeholder strategies
 */
export const IMAGE_PLACEHOLDER = {
  /** No placeholder */
  none: 'empty',
  /** Blur placeholder */
  blur: 'blur',
  /** Color placeholder */
  color: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+',
} as const;

/**
 * Common blur data URLs for different aspect ratios
 */
export const BLUR_DATA_URLS = {
  /** Square aspect ratio (1:1) */
  square: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli+kgV5xNvLMB5TqWPGz0GGGmn5K7Ws0dqwquZKOh4MKFrPX7XQpgsWoqLEePkP8AFvV6BaKnelAkNXY6/AeG9mEXoNS3lnA8p1LHjZ6DVqJhwp/aJ/U/FWUbhWCgf8A/9k=",
  
  /** Landscape aspect ratio (16:9) */
  landscape: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAJABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli+kgV5xNvLMB5TqWPGz0GGGmn5K7Ws0dqwquZKOh4MKFrPX7XQpgsWoqLEePkP8AFvV6BaKnelAkNXY6/AeG9mEXoNS3lnA8p1LHjZ6DVqJhwp/aJ/U/FWUbhWCgf8A/9k=",
  
  /** Portrait aspect ratio (3:4) */
  portrait: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAEAAMDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli+kgV5xNvLMB5TqWPGz0GGGmn5K7Ws0dqwquZKOh4MKFrPX7XQpgsWoqLEePkP8AFvV6BaKnelAkNXY6/AeG9mEXoNS3lnA8p1LHjZ6DVqJhwp/aJ/U/FWUbhWCgf8A/9k=",
} as const;

/**
 * Type helpers
 */
export type ImageSize = keyof typeof IMAGE_SIZES;
export type ImageQuality = keyof typeof IMAGE_QUALITY;
export type ImageFormat = typeof IMAGE_FORMATS.all[number];
export type ImageLoading = typeof IMAGE_LOADING[keyof typeof IMAGE_LOADING];
export type BlurDataUrl = keyof typeof BLUR_DATA_URLS;