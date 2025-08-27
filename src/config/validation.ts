/**
 * Configuration validation utilities
 * Provides runtime validation and health checks for configuration
 */

import { config } from './index';

/**
 * Configuration validation result
 */
interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate external service URLs
 */
export const validateExternalServices = async (): Promise<ValidationResult> => {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
  };

  // Validate configurator URL
  try {
    const configuratorUrl = new URL(config.external.configurator.url);
    if (!configuratorUrl.protocol.startsWith('http')) {
      result.errors.push('Configurator URL must use HTTP or HTTPS protocol');
      result.isValid = false;
    }
  } catch {
    result.errors.push(`Invalid configurator URL: ${config.external.configurator.url}`);
    result.isValid = false;
  }

  // Validate company website URL
  try {
    const companyUrl = new URL(config.external.company.website);
    if (!companyUrl.protocol.startsWith('http')) {
      result.errors.push('Company website URL must use HTTP or HTTPS protocol');
      result.isValid = false;
    }
  } catch {
    result.errors.push(`Invalid company website URL: ${config.external.company.website}`);
    result.isValid = false;
  }

  // Check analytics configuration
  if (config.analytics.enabled && !config.analytics.measurementId) {
    result.warnings.push('Analytics is enabled but measurement ID is not configured');
  }

  // Check API configuration
  if (!config.api.baseUrl) {
    result.errors.push('API base URL is required');
    result.isValid = false;
  }

  return result;
};

/**
 * Validate environment-specific settings
 */
export const validateEnvironment = (): ValidationResult => {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
  };

  // Production-specific validations
  if (config.isProduction) {
    if (!config.analytics.measurementId && config.analytics.enabled) {
      result.warnings.push('Analytics measurement ID should be configured in production');
    }

    if (config.features.debugMode) {
      result.warnings.push('Debug mode should be disabled in production');
    }

    if (!config.security.enableCSP) {
      result.warnings.push('Content Security Policy should be enabled in production');
    }
  }

  // Development-specific validations
  if (config.isDevelopment) {
    if (config.api.baseUrl.includes('localhost')) {
      result.warnings.push('Using localhost API endpoint in development');
    }
  }

  return result;
};

/**
 * Comprehensive configuration validation
 */
export const validateConfiguration = async (): Promise<ValidationResult> => {
  const envValidation = validateEnvironment();
  const serviceValidation = await validateExternalServices();

  return {
    isValid: envValidation.isValid && serviceValidation.isValid,
    errors: [...envValidation.errors, ...serviceValidation.errors],
    warnings: [...envValidation.warnings, ...serviceValidation.warnings],
  };
};

/**
 * Log validation results
 */
export const logValidationResults = (results: ValidationResult): void => {
  if (!results.isValid) {
    console.error('Configuration validation failed:');
    results.errors.forEach(error => console.error(`  ❌ ${error}`));
  }

  if (results.warnings.length > 0) {
    console.warn('Configuration warnings:');
    results.warnings.forEach(warning => console.warn(`  ⚠️  ${warning}`));
  }

  if (results.isValid && results.warnings.length === 0) {
    console.log('✅ Configuration validation passed');
  }
};

/**
 * Initialize configuration validation (run at startup)
 */
export const initializeConfigValidation = async (): Promise<void> => {
  if (config.isDevelopment || config.features.debugMode) {
    console.log('🔧 Validating application configuration...');
    const results = await validateConfiguration();
    logValidationResults(results);
    
    if (!results.isValid) {
      console.error('Configuration validation failed. Please check your environment variables.');
    }
  }
};

/**
 * Health check endpoint data
 */
export const getConfigHealthCheck = async () => {
  const validation = await validateConfiguration();
  
  return {
    timestamp: new Date().toISOString(),
    environment: config.env,
    version: '1.0.0',
    configuration: {
      analytics: {
        enabled: config.analytics.enabled,
        configured: !!config.analytics.measurementId,
      },
      external: {
        configurator: {
          url: config.external.configurator.url,
          enabled: config.external.configurator.enabled,
        },
        company: {
          url: config.external.company.website,
        },
      },
      features: {
        debugMode: config.features.debugMode,
        analytics: config.features.analytics,
      },
    },
    validation: {
      isValid: validation.isValid,
      errorCount: validation.errors.length,
      warningCount: validation.warnings.length,
    },
  };
};