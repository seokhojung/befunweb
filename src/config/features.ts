/**
 * Feature flags and toggles
 * Centralized feature management system
 */

// Remove circular dependency
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
const enableAnalytics = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true';
const debugMode = process.env.NEXT_PUBLIC_DEBUG_MODE === 'true';

/**
 * Feature flag definitions
 */
export const featureFlags = {
  // UI Features
  ui: {
    newProductCard: isDevelopment || debugMode,
    advancedFilters: true,
    infiniteScroll: true,
    wishlistFeature: true,
    compareFeature: isProduction,
    reviewSystem: true,
  },
  
  // Performance Features
  performance: {
    lazyLoading: true,
    imageOptimization: isProduction,
    caching: isProduction,
    compressionEnabled: isProduction,
    serviceWorker: isProduction,
  },
  
  // Analytics Features
  analytics: {
    enabled: enableAnalytics,
    detailedTracking: isProduction,
    heatmapTracking: isProduction && enableAnalytics,
    conversionTracking: isProduction,
  },
  
  // Experimental Features
  experimental: {
    aiRecommendations: isDevelopment,
    voiceSearch: false,
    arViewer: false,
    darkMode: isDevelopment,
    betaFeatures: isDevelopment || debugMode,
  },
  
  // Integration Features
  integrations: {
    socialLogin: true,
    paymentGateway: isProduction,
    chatSupport: isProduction,
    emailNotifications: true,
    pushNotifications: isProduction,
  },
  
  // Security Features
  security: {
    twoFactorAuth: isProduction,
    captcha: isProduction,
    rateLimiting: isProduction,
    encryptionEnabled: isProduction,
  },
} as const;

/**
 * A/B Test configurations
 */
export const abTestConfig = {
  // Test variants
  variants: {
    heroSection: {
      enabled: isDevelopment,
      variants: ['original', 'variant-a', 'variant-b'] as const,
      defaultVariant: 'original' as const,
      distribution: { original: 60, 'variant-a': 20, 'variant-b': 20 },
    },
    
    productCardLayout: {
      enabled: false,
      variants: ['grid', 'list', 'masonry'] as const,
      defaultVariant: 'grid' as const,
      distribution: { grid: 70, list: 20, masonry: 10 },
    },
    
    checkoutFlow: {
      enabled: isProduction,
      variants: ['single-page', 'multi-step'] as const,
      defaultVariant: 'multi-step' as const,
      distribution: { 'single-page': 50, 'multi-step': 50 },
    },
  },
  
  // Test configuration
  config: {
    enabled: isProduction,
    persistVariant: true,
    cookieExpiry: 30, // days
  },
} as const;

/**
 * Feature flag helper functions
 */
export const isFeatureEnabled = (
  category: keyof typeof featureFlags,
  feature: string
): boolean => {
  const categoryFeatures = featureFlags[category] as Record<string, boolean>;
  return categoryFeatures[feature] ?? false;
};

/**
 * Get A/B test variant
 */
export const getAbTestVariant = (
  testName: keyof typeof abTestConfig.variants
): string => {
  const test = abTestConfig.variants[testName];
  
  if (!test.enabled || !abTestConfig.config.enabled) {
    return test.defaultVariant;
  }
  
  // Simple random distribution (in production, this would use a proper A/B testing service)
  const random = Math.random() * 100;
  let cumulative = 0;
  
  for (const [variant, percentage] of Object.entries(test.distribution)) {
    cumulative += percentage;
    if (random <= cumulative) {
      return variant;
    }
  }
  
  return test.defaultVariant;
};

/**
 * Feature flag context for React components
 */
export const createFeatureContext = () => ({
  flags: featureFlags,
  isEnabled: isFeatureEnabled,
  getVariant: getAbTestVariant,
});

export type FeatureFlags = typeof featureFlags;
export type AbTestConfig = typeof abTestConfig;
export type FeatureContext = ReturnType<typeof createFeatureContext>;