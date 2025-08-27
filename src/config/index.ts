/**
 * Configuration system for environment-specific settings
 * Provides type-safe access to environment variables and configuration
 */

import { z } from 'zod';

/**
 * Environment variable validation schema
 */
const envSchema = z.object({
  // App configuration
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.string().default('3000').transform(val => parseInt(val, 10)),
  
  // Analytics
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  
  // API endpoints
  NEXT_PUBLIC_API_URL: z.string().default('/api'),
  
  // External services
  NEXT_PUBLIC_CONFIGURATOR_URL: z.string().url().default('https://befun241204.netlify.app/'),
  NEXT_PUBLIC_COMPANY_WEBSITE: z.string().url().default('https://uable.co.kr'),
  
  // Feature flags
  NEXT_PUBLIC_ENABLE_ANALYTICS: z.string().default('false').transform(val => val === 'true'),
  NEXT_PUBLIC_DEBUG_MODE: z.string().default('false').transform(val => val === 'true'),
});

/**
 * Validated environment configuration
 */
let envConfig: z.infer<typeof envSchema>;

try {
  envConfig = envSchema.parse(process.env);
} catch (error) {
  console.error('Environment validation failed:', error);
  // Provide fallback configuration
  envConfig = {
    NODE_ENV: 'development',
    PORT: 3000,
    NEXT_PUBLIC_API_URL: '/api',
    NEXT_PUBLIC_CONFIGURATOR_URL: 'https://befun241204.netlify.app/',
    NEXT_PUBLIC_COMPANY_WEBSITE: 'https://uable.co.kr',
    NEXT_PUBLIC_ENABLE_ANALYTICS: false,
    NEXT_PUBLIC_DEBUG_MODE: false,
  };
}

/**
 * Application configuration based on environment
 */
export const config = {
  // Environment info
  env: envConfig.NODE_ENV,
  isDevelopment: envConfig.NODE_ENV === 'development',
  isProduction: envConfig.NODE_ENV === 'production',
  isTest: envConfig.NODE_ENV === 'test',
  
  // Server configuration
  port: envConfig.PORT,
  
  // Analytics configuration
  analytics: {
    enabled: envConfig.NEXT_PUBLIC_ENABLE_ANALYTICS,
    measurementId: envConfig.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  },
  
  // API configuration
  api: {
    baseUrl: envConfig.NEXT_PUBLIC_API_URL,
    timeout: envConfig.NODE_ENV === 'production' ? 10000 : 5000,
  },
  
  // External services configuration
  external: {
    configurator: {
      url: envConfig.NEXT_PUBLIC_CONFIGURATOR_URL,
      enabled: true,
    },
    company: {
      website: envConfig.NEXT_PUBLIC_COMPANY_WEBSITE,
    },
  },
  
  // Feature flags
  features: {
    debugMode: envConfig.NEXT_PUBLIC_DEBUG_MODE,
    analytics: envConfig.NEXT_PUBLIC_ENABLE_ANALYTICS,
  },
  
  // Performance configuration
  performance: {
    enableSWR: true,
    swrRefreshInterval: envConfig.NODE_ENV === 'development' ? 5000 : 30000,
    imageQuality: envConfig.NODE_ENV === 'production' ? 85 : 75,
  },
  
  // Security configuration
  security: {
    enableCSP: envConfig.NODE_ENV === 'production',
    enableHTTPS: envConfig.NODE_ENV === 'production',
  },
} as const;

/**
 * Type-safe environment variable getter
 */
export const getEnv = <K extends keyof typeof envConfig>(key: K): typeof envConfig[K] => {
  return envConfig[key];
};

/**
 * Configuration for different environments
 */
export const environmentConfig = {
  development: {
    logging: {
      level: 'debug',
      enableConsole: true,
    },
    cache: {
      ttl: 0, // No cache in development
    },
  },
  
  production: {
    logging: {
      level: 'error',
      enableConsole: false,
    },
    cache: {
      ttl: 300000, // 5 minutes
    },
  },
  
  test: {
    logging: {
      level: 'silent',
      enableConsole: false,
    },
    cache: {
      ttl: 0,
    },
  },
} as const;

/**
 * Get current environment configuration
 */
export const getCurrentEnvConfig = () => {
  return environmentConfig[config.env];
};

/**
 * Re-export sub-configurations
 */
export { databaseConfig } from './database';
export { apiEndpoints, apiConfig, interceptorConfig } from './api';
export { featureFlags, abTestConfig, isFeatureEnabled, getAbTestVariant, createFeatureContext } from './features';
export { 
  validateConfiguration, 
  validateEnvironment, 
  validateExternalServices,
  logValidationResults,
  initializeConfigValidation,
  getConfigHealthCheck 
} from './validation';

/**
 * Type exports
 */
export type Config = typeof config;
export type EnvConfig = typeof envConfig;
export type EnvironmentConfig = typeof environmentConfig;