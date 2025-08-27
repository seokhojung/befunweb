import { config, validateConfiguration, getConfigHealthCheck } from './index'

// Mock environment variables
const originalEnv = process.env

beforeEach(() => {
  jest.resetModules()
  process.env = {
    ...originalEnv,
    NODE_ENV: 'test',
    NEXT_PUBLIC_GA_MEASUREMENT_ID: 'G-TEST123',
    NEXT_PUBLIC_ENABLE_ANALYTICS: 'false',
    NEXT_PUBLIC_DEBUG_MODE: 'true',
    NEXT_PUBLIC_API_URL: '/api',
    NEXT_PUBLIC_CONFIGURATOR_URL: 'https://test.example.com',
    NEXT_PUBLIC_COMPANY_WEBSITE: 'https://company.example.com',
  }
})

afterEach(() => {
  process.env = originalEnv
})

describe('Configuration System', () => {
  describe('config object', () => {
    it('provides environment information', () => {
      expect(config.env).toBe('test')
      expect(config.isTest).toBe(true)
      expect(config.isDevelopment).toBe(false)
      expect(config.isProduction).toBe(false)
    })

    it('provides analytics configuration', () => {
      expect(config.analytics.enabled).toBe(false)
      expect(config.analytics.measurementId).toBe('G-TEST123')
    })

    it('provides API configuration', () => {
      expect(config.api.baseUrl).toBe('/api')
      expect(config.api.timeout).toBe(5000) // Test environment timeout
    })

    it('provides external services configuration', () => {
      expect(config.external.configurator.url).toBe('https://test.example.com')
      expect(config.external.configurator.enabled).toBe(true)
      expect(config.external.company.website).toBe('https://company.example.com')
    })

    it('provides feature flags', () => {
      expect(config.features.debugMode).toBe(true)
      expect(config.features.analytics).toBe(false)
    })
  })

  describe('validation', () => {
    it('validates configuration successfully with valid URLs', async () => {
      const result = await validateConfiguration()
      
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('detects invalid URLs', async () => {
      // Temporarily override with invalid URL
      const originalConfig = config.external.configurator.url
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(config.external.configurator as any).url = 'invalid-url'
      
      const result = await validateConfiguration()
      
      expect(result.isValid).toBe(false)
      expect(result.errors.some(error => error.includes('Invalid configurator URL'))).toBe(true)
      
      // Restore original config
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(config.external.configurator as any).url = originalConfig
    })

    it('provides warnings for development concerns', async () => {
      // Mock production environment
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(config as any).isProduction = true
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(config.features as any).debugMode = true
      
      const result = await validateConfiguration()
      
      expect(result.warnings.some(warning => 
        warning.includes('Debug mode should be disabled in production')
      )).toBe(true)
      
      // Restore test environment
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(config as any).isProduction = false
    })
  })

  describe('health check', () => {
    it('provides comprehensive health check data', async () => {
      const healthData = await getConfigHealthCheck()
      
      expect(healthData).toHaveProperty('timestamp')
      expect(healthData).toHaveProperty('environment', 'test')
      expect(healthData).toHaveProperty('version')
      expect(healthData).toHaveProperty('configuration')
      expect(healthData).toHaveProperty('validation')
      
      expect(healthData.configuration.analytics.enabled).toBe(false)
      expect(healthData.configuration.analytics.configured).toBe(true)
      expect(healthData.configuration.external.configurator.url).toBe('https://test.example.com')
    })

    it('includes validation results in health check', async () => {
      const healthData = await getConfigHealthCheck()
      
      expect(healthData.validation.isValid).toBe(true)
      expect(healthData.validation.errorCount).toBe(0)
      expect(typeof healthData.validation.warningCount).toBe('number')
    })
  })

  describe('environment-specific behavior', () => {
    it('uses correct timeout for test environment', () => {
      expect(config.api.timeout).toBe(5000)
    })

    it('disables analytics in test environment', () => {
      expect(config.analytics.enabled).toBe(false)
    })

    it('enables debug mode in test environment', () => {
      expect(config.features.debugMode).toBe(true)
    })
  })
})