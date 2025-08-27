# Configuration System Documentation

## Overview

The BEFUN web application uses a comprehensive configuration system that provides type-safe environment variable management, feature flags, and external service configuration.

## Structure

```
src/config/
├── index.ts          # Main configuration with environment validation
├── api.ts            # API endpoints and request configuration
├── database.ts       # Database connection settings
├── features.ts       # Feature flags and A/B testing
└── validation.ts     # Configuration validation utilities
```

## Environment Variables

### Required Variables

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `NODE_ENV` | string | `development` | Application environment |
| `PORT` | number | `3000` | Server port |

### Optional Variables

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | string | - | Google Analytics measurement ID |
| `NEXT_PUBLIC_API_URL` | string | `/api` | API base URL |
| `NEXT_PUBLIC_CONFIGURATOR_URL` | string | `https://befun241204.netlify.app/` | Configurator service URL |
| `NEXT_PUBLIC_COMPANY_WEBSITE` | string | `https://uable.co.kr` | Company website URL |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | boolean | `false` | Enable analytics tracking |
| `NEXT_PUBLIC_DEBUG_MODE` | boolean | `false` | Enable debug mode |

## Configuration Usage

### Basic Configuration

```typescript
import { config } from '@/config';

// Environment info
console.log(config.env); // 'development' | 'test' | 'production'
console.log(config.isDevelopment); // boolean

// External services
const configuratorUrl = config.external.configurator.url;
const companyWebsite = config.external.company.website;

// Analytics
if (config.analytics.enabled) {
  // Initialize analytics
}
```

### Feature Flags

```typescript
import { featureFlags, isFeatureEnabled } from '@/config';

// Check if feature is enabled
if (isFeatureEnabled('ui', 'newProductCard')) {
  // Render new product card
}

// Access feature flags directly
if (featureFlags.performance.lazyLoading) {
  // Implement lazy loading
}
```

### A/B Testing

```typescript
import { getAbTestVariant } from '@/config';

const heroVariant = getAbTestVariant('heroSection');
switch (heroVariant) {
  case 'variant-a':
    // Render variant A
    break;
  case 'variant-b':
    // Render variant B
    break;
  default:
    // Render original
}
```

### API Configuration

```typescript
import { apiConfig, apiEndpoints } from '@/config';

// Make API request
const response = await fetch(apiEndpoints.products.list, {
  ...apiConfig.headers,
  timeout: apiConfig.timeout,
});
```

## Validation System

The configuration system includes comprehensive validation:

### Manual Validation

```typescript
import { validateConfiguration, logValidationResults } from '@/config';

const results = await validateConfiguration();
logValidationResults(results);

if (!results.isValid) {
  console.error('Configuration errors:', results.errors);
}
```

### Automatic Validation

Validation runs automatically in development mode:

```typescript
import { initializeConfigValidation } from '@/config';

// In your app initialization
await initializeConfigValidation();
```

### Health Check

```typescript
import { getConfigHealthCheck } from '@/config';

const healthData = await getConfigHealthCheck();
console.log('Configuration health:', healthData);
```

## Environment-Specific Settings

### Development

- Debug mode enabled
- Console logging enabled
- No caching
- Local API endpoints

### Production

- Analytics enabled
- Caching enabled
- Security features enabled
- External API endpoints

### Testing

- Silent logging
- No caching
- Mock configurations

## Best Practices

### 1. Type Safety

Always use the centralized configuration instead of direct `process.env` access:

```typescript
// ✅ Good
import { config } from '@/config';
const apiUrl = config.api.baseUrl;

// ❌ Bad
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

### 2. Feature Flags

Use feature flags for gradual rollouts:

```typescript
// ✅ Good
if (featureFlags.ui.newProductCard) {
  return <NewProductCard />;
}
return <LegacyProductCard />;
```

### 3. Environment Checks

Use environment helpers for conditional logic:

```typescript
// ✅ Good
if (config.isDevelopment) {
  console.log('Debug info');
}

// ❌ Bad
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info');
}
```

### 4. Validation

Always validate configuration in critical paths:

```typescript
const validation = await validateConfiguration();
if (!validation.isValid) {
  throw new Error('Invalid configuration');
}
```

## Migration Guide

### From Direct Environment Variables

1. Replace direct `process.env` usage with config imports
2. Update component imports to use centralized configuration
3. Add validation for critical configuration values

### Example Migration

```typescript
// Before
const configuratorUrl = process.env.NEXT_PUBLIC_CONFIGURATOR_URL || 'https://befun241204.netlify.app/';

// After
import { config } from '@/config';
const configuratorUrl = config.external.configurator.url;
```

## Troubleshooting

### Common Issues

1. **Missing Environment Variables**
   - Check `.env.local` file exists
   - Verify variable names match schema
   - Restart development server

2. **Type Errors**
   - Ensure all required variables are defined
   - Check Zod schema matches your needs

3. **Validation Failures**
   - Check console for validation errors
   - Verify URL formats are valid
   - Ensure boolean values are 'true'/'false'

### Debug Configuration

Enable debug mode to see detailed configuration info:

```bash
NEXT_PUBLIC_DEBUG_MODE=true npm run dev
```

## Security Considerations

1. **Environment Variables**
   - Never commit `.env.local` to git
   - Use `NEXT_PUBLIC_` prefix for client-side variables only
   - Keep sensitive data server-side only

2. **External URLs**
   - Validate all external URLs
   - Use HTTPS in production
   - Implement CSP headers

3. **Feature Flags**
   - Regularly audit enabled features
   - Remove unused flags
   - Document flag purposes

---

*Last updated: 2025-01-28*
*Version: 1.0*