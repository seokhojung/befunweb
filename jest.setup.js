import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    }
  },
}))

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Mock analytics - conditional mock
try {
  jest.mock('@/lib/analytics', () => ({
    analytics: {
      pageView: jest.fn(),
      heroViewed: jest.fn(),
      viewItemList: jest.fn(),
      selectItem: jest.fn(),
      viewItem: jest.fn(),
      addToCart: jest.fn(),
      configChange: jest.fn(),
    },
  }))
} catch (error) {
  // Analytics mock failed, continuing without it
}

// Mock ReactPlayer
jest.mock('react-player', () => {
  return function MockReactPlayer({ url, playing, loop, muted, width, height, style, fallback }) {
    return fallback || <div data-testid="react-player">Mock ReactPlayer</div>
  }
})

// Global test utilities
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

global.matchMedia = jest.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}))

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: jest.fn(),
})

// Mock environment variables for tests
process.env.NODE_ENV = 'test'
process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TEST123'
process.env.NEXT_PUBLIC_ENABLE_ANALYTICS = 'false'
process.env.NEXT_PUBLIC_DEBUG_MODE = 'true'
process.env.NEXT_PUBLIC_API_URL = '/api'
process.env.NEXT_PUBLIC_CONFIGURATOR_URL = 'https://test.example.com'
process.env.NEXT_PUBLIC_COMPANY_WEBSITE = 'https://company.example.com'
