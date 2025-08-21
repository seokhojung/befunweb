module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run dev',
      url: [
        'http://localhost:3000',
        'http://localhost:3000/products',
        'http://localhost:3000/products/1',
        'http://localhost:3000/configurator'
      ],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        skipAudits: ['uses-http2', 'redirects-http'],
      },
    },
    assert: {
      assertions: {
        // 성능 목표 (Core Web Vitals)
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        'categories:seo': ['warn', { minScore: 0.8 }],
        
        // LCP (Largest Contentful Paint)
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        
        // FID (First Input Delay) / INP (Interaction to Next Paint)
        'max-potential-fid': ['warn', { maxNumericValue: 200 }],
        'interaction-to-next-paint': ['warn', { maxNumericValue: 200 }],
        
        // CLS (Cumulative Layout Shift)
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        
        // 접근성 필수 항목
        'color-contrast': 'error',
        'document-title': 'error',
        'html-has-lang': 'error',
        'image-alt': 'error',
        'label': 'error',
        'link-name': 'error',
        'list': 'error',
        'listitem': 'error',
        'main': 'error',
        'region': 'error',
        'tabindex': 'error',
        'valid-lang': 'error',
        
        // SEO 필수 항목
        'canonical': 'error',
        'meta-description': 'error',
        'robots-txt': 'error',
        'structured-data': 'warn',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
