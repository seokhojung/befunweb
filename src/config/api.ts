/**
 * API configuration and endpoint definitions
 */

// Remove circular dependency
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

/**
 * API endpoint configurations
 */
export const apiEndpoints = {
  // Product endpoints
  products: {
    list: '/api/products',
    detail: (id: string) => `/api/products/${id}`,
    categories: '/api/products/categories',
    search: '/api/products/search',
  },
  
  // User endpoints
  user: {
    profile: '/api/user/profile',
    preferences: '/api/user/preferences',
    orders: '/api/user/orders',
    wishlist: '/api/user/wishlist',
  },
  
  // Analytics endpoints
  analytics: {
    events: '/api/analytics/events',
    pageviews: '/api/analytics/pageviews',
  },
  
  // Content endpoints
  content: {
    pages: '/api/content/pages',
    banners: '/api/content/banners',
    testimonials: '/api/content/testimonials',
  },
} as const;

/**
 * API configuration settings
 */
export const apiConfig = {
  // Base configuration
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: isProduction ? 10000 : 5000,
  
  // Request configuration
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Client-Version': '1.0.0',
  },
  
  // Retry configuration
  retry: {
    attempts: isDevelopment ? 2 : 3,
    delay: 1000,
    backoff: 2,
  },
  
  // Cache configuration
  cache: {
    enabled: isProduction,
    ttl: isProduction ? 300000 : 60000, // 5min prod, 1min dev
  },
  
  // Rate limiting
  rateLimit: {
    enabled: isProduction,
    maxRequests: 100,
    windowMs: 60000, // 1 minute
  },
} as const;

/**
 * Request interceptor configuration
 */
export const interceptorConfig = {
  request: {
    enableLogging: isDevelopment,
    enableTiming: isDevelopment,
    enableAuth: true,
  },
  
  response: {
    enableLogging: isDevelopment,
    enableErrorHandling: true,
    enableRetry: true,
  },
} as const;

export type ApiEndpoints = typeof apiEndpoints;
export type ApiConfig = typeof apiConfig;
export type InterceptorConfig = typeof interceptorConfig;