# Story 6.2: 환경 설정 시스템 구축

## 📋 Story 카드
**Title**: 환경 설정 시스템 구축  
**Epic**: Configuration Management  
**Priority**: P2 (Medium)  
**Points**: 2점  
**Assignee**: TBD  
**Sprint**: TBD

## 📝 User Story
```
As a 개발자
I want 환경별로 다른 설정을 안전하고 체계적으로 관리하여
So that 개발/스테이징/프로덕션 환경에서 적절한 설정이 자동으로 적용된다
```

## ✅ Acceptance Criteria
- [ ] 환경별 설정 파일이 구조화되어 관리된다
- [ ] 민감한 정보(API 키 등)가 안전하게 처리된다
- [ ] 타입 안전한 환경 변수 접근이 가능하다
- [ ] 환경별 빌드 설정이 자동화된다
- [ ] 설정 검증 및 에러 핸들링이 구현된다
- [ ] 개발 환경에서 설정 변경이 즉시 반영된다

## 🔧 세분화된 Technical Tasks (2점)

### Task 1: 환경 변수 시스템 구축 (0.5점)
- [ ] `.env` 파일 구조화
- [ ] 환경 변수 타입 정의
- [ ] 런타임 검증 시스템
- [ ] 기본값 설정

### Task 2: 설정 관리 시스템 (0.75점)
- [ ] 환경별 설정 파일 생성
- [ ] 설정 로더 구현
- [ ] 타입 안전한 설정 접근
- [ ] 설정 유효성 검증

### Task 3: 빌드 환경 최적화 (0.5점)
- [ ] 환경별 빌드 스크립트
- [ ] 환경 변수 주입 자동화
- [ ] 민감 정보 보안 처리
- [ ] 빌드 시간 최적화

### Task 4: 개발 환경 개선 (0.25점)
- [ ] Hot reload 설정 개선
- [ ] 개발 도구 설정
- [ ] 환경 전환 스크립트
- [ ] 설정 문서 자동 생성

## 🏗️ Implementation Details

### 환경 변수 구조

#### `.env.example` (템플릿)
```bash
# Application
NEXT_PUBLIC_APP_NAME=BEFUN
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_URL=http://localhost:3000

# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
API_SECRET_KEY=your-secret-key-here
API_TIMEOUT=30000

# Database (개발용)
DATABASE_URL=postgresql://user:password@localhost:5432/befun_dev

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Third-party Services
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
SENTRY_DSN=https://your-sentry-dsn
VERCEL_URL=

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_PWA=false
NEXT_PUBLIC_ENABLE_DARK_MODE=true

# Development
NODE_ENV=development
ANALYZE_BUNDLE=false
SKIP_TYPE_CHECK=false
```

#### `.env.local` (개발 환경)
```bash
# Local development overrides
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
NEXT_PUBLIC_ENABLE_ANALYTICS=false

# Development tools
ANALYZE_BUNDLE=false
SKIP_TYPE_CHECK=false
```

#### `.env.production` (프로덕션)
```bash
# Production environment
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://befun.com
NEXT_PUBLIC_API_BASE_URL=https://api.befun.com
NEXT_PUBLIC_ENABLE_ANALYTICS=true

# Performance
SKIP_TYPE_CHECK=true
ANALYZE_BUNDLE=false
```

### 타입 안전한 환경 변수

#### `src/lib/env.ts`
```typescript
import { z } from 'zod';

// 환경 변수 스키마 정의
const envSchema = z.object({
  // App Configuration
  NEXT_PUBLIC_APP_NAME: z.string().default('BEFUN'),
  NEXT_PUBLIC_APP_VERSION: z.string().default('1.0.0'),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  
  // API Configuration
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  API_SECRET_KEY: z.string().min(32).optional(),
  API_TIMEOUT: z.string().transform(Number).default('30000'),
  
  // Database
  DATABASE_URL: z.string().url().optional(),
  
  // Authentication
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().min(32).optional(),
  
  // Analytics
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string().optional(),
  SENTRY_DSN: z.string().url().optional(),
  
  // Feature Flags
  NEXT_PUBLIC_ENABLE_ANALYTICS: z.string().transform(Boolean).default('false'),
  NEXT_PUBLIC_ENABLE_PWA: z.string().transform(Boolean).default('false'),
  NEXT_PUBLIC_ENABLE_DARK_MODE: z.string().transform(Boolean).default('true'),
  
  // Environment
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  VERCEL_URL: z.string().optional(),
  
  // Build Configuration
  ANALYZE_BUNDLE: z.string().transform(Boolean).default('false'),
  SKIP_TYPE_CHECK: z.string().transform(Boolean).default('false'),
});

// 환경 변수 파싱 및 검증
function parseEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error('❌ Invalid environment variables:', error);
    process.exit(1);
  }
}

export const env = parseEnv();

// 타입 추출
export type Env = z.infer<typeof envSchema>;

// 환경별 설정 체크
export const isProduction = env.NODE_ENV === 'production';
export const isDevelopment = env.NODE_ENV === 'development';
export const isTest = env.NODE_ENV === 'test';

// 클라이언트 사이드에서 사용할 공개 환경 변수만 추출
export const publicEnv = {
  APP_NAME: env.NEXT_PUBLIC_APP_NAME,
  APP_VERSION: env.NEXT_PUBLIC_APP_VERSION,
  APP_URL: env.NEXT_PUBLIC_APP_URL,
  API_BASE_URL: env.NEXT_PUBLIC_API_BASE_URL,
  GOOGLE_ANALYTICS_ID: env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  ENABLE_ANALYTICS: env.NEXT_PUBLIC_ENABLE_ANALYTICS,
  ENABLE_PWA: env.NEXT_PUBLIC_ENABLE_PWA,
  ENABLE_DARK_MODE: env.NEXT_PUBLIC_ENABLE_DARK_MODE,
} as const;
```

### 설정 관리 시스템

#### `src/config/index.ts`
```typescript
import { env, isProduction, isDevelopment } from '@/lib/env';

// 앱 설정
export const appConfig = {
  name: env.NEXT_PUBLIC_APP_NAME,
  version: env.NEXT_PUBLIC_APP_VERSION,
  url: env.NEXT_PUBLIC_APP_URL,
  description: 'BEFUN - 친환경 가구 커스터마이징 플랫폼',
  
  // SEO 설정
  seo: {
    title: 'BEFUN - 친환경 가구 커스터마이징',
    description: '지속가능한 소재로 만드는 나만의 가구',
    keywords: ['친환경', '가구', '커스터마이징', '지속가능성'],
    author: 'BEFUN Team',
    robots: isProduction ? 'index,follow' : 'noindex,nofollow',
  },
  
  // 소셜 미디어
  social: {
    twitter: '@befun_official',
    instagram: '@befun_official',
    facebook: 'befun.official',
  }
} as const;

// API 설정
export const apiConfig = {
  baseUrl: env.NEXT_PUBLIC_API_BASE_URL,
  timeout: env.API_TIMEOUT,
  retryCount: isProduction ? 3 : 1,
  retryDelay: 1000,
  
  // 엔드포인트
  endpoints: {
    products: '/products',
    categories: '/categories',
    orders: '/orders',
    users: '/users',
    auth: '/auth',
  }
} as const;

// 기능 플래그
export const featureFlags = {
  analytics: env.NEXT_PUBLIC_ENABLE_ANALYTICS,
  pwa: env.NEXT_PUBLIC_ENABLE_PWA,
  darkMode: env.NEXT_PUBLIC_ENABLE_DARK_MODE,
  
  // 개발 환경에서만 활성화
  debugMode: isDevelopment,
  mockApi: isDevelopment,
  showPerformanceMetrics: isDevelopment,
} as const;

// 성능 설정
export const performanceConfig = {
  // 이미지 최적화
  images: {
    quality: isProduction ? 80 : 90,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // 캐싱
  cache: {
    staticFiles: isProduction ? '365d' : '0',
    apiResponses: isProduction ? '5m' : '0',
    images: isProduction ? '30d' : '1h',
  },
  
  // 번들링
  bundle: {
    analyzeBundle: env.ANALYZE_BUNDLE,
    skipTypeCheck: env.SKIP_TYPE_CHECK && isProduction,
    minify: isProduction,
    sourceMaps: !isProduction,
  }
} as const;

// 개발 도구 설정
export const devConfig = {
  showReduxDevTools: isDevelopment,
  enableHotReload: isDevelopment,
  showBundleAnalyzer: env.ANALYZE_BUNDLE,
  enableStrictMode: isDevelopment,
  
  // 로깅
  logLevel: isDevelopment ? 'debug' : 'error',
  enableConsoleLog: isDevelopment,
  enableNetworkLog: isDevelopment,
} as const;

// 전체 설정 통합
export const config = {
  app: appConfig,
  api: apiConfig,
  features: featureFlags,
  performance: performanceConfig,
  dev: devConfig,
  env: {
    isProduction,
    isDevelopment,
    isTest,
    nodeEnv: env.NODE_ENV,
  }
} as const;

// 설정 검증 함수
export function validateConfig() {
  const requiredInProduction = [
    'NEXT_PUBLIC_APP_URL',
    'NEXT_PUBLIC_API_BASE_URL',
  ];

  if (isProduction) {
    const missing = requiredInProduction.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables in production: ${missing.join(', ')}`);
    }
  }

  console.log('✅ Configuration validated successfully');
}
```

### 환경별 빌드 스크립트

#### `scripts/build-config.js`
```javascript
const fs = require('fs');
const path = require('path');

// 환경별 설정 생성
function generateConfig(env) {
  const config = {
    development: {
      API_BASE_URL: 'http://localhost:3001/api',
      ENABLE_ANALYTICS: false,
      ENABLE_DEBUG: true,
    },
    staging: {
      API_BASE_URL: 'https://staging-api.befun.com/api',
      ENABLE_ANALYTICS: false,
      ENABLE_DEBUG: true,
    },
    production: {
      API_BASE_URL: 'https://api.befun.com/api',
      ENABLE_ANALYTICS: true,
      ENABLE_DEBUG: false,
    }
  };

  return config[env] || config.development;
}

// 런타임 설정 파일 생성
function createRuntimeConfig(env) {
  const config = generateConfig(env);
  const configContent = `// Auto-generated config for ${env} environment
export const runtimeConfig = ${JSON.stringify(config, null, 2)};`;

  fs.writeFileSync(
    path.join(__dirname, '../src/config/runtime.ts'),
    configContent
  );

  console.log(`✅ Generated runtime config for ${env} environment`);
}

// CLI 실행
const env = process.argv[2] || 'development';
createRuntimeConfig(env);
```

#### `package.json` 스크립트 업데이트
```json
{
  "scripts": {
    "dev": "node scripts/build-config.js development && next dev",
    "build": "node scripts/build-config.js production && next build",
    "build:staging": "node scripts/build-config.js staging && next build",
    "start": "next start",
    
    "env:check": "node scripts/check-env.js",
    "env:generate": "node scripts/generate-env-example.js",
    "config:validate": "tsx scripts/validate-config.ts"
  }
}
```

### 설정 유틸리티

#### `src/lib/config-utils.ts`
```typescript
import { config } from '@/config';

// 안전한 설정 접근
export function getConfig<T extends keyof typeof config>(
  section: T
): typeof config[T] {
  return config[section];
}

// 기능 플래그 체크
export function isFeatureEnabled(feature: keyof typeof config.features): boolean {
  return config.features[feature];
}

// API URL 생성
export function createApiUrl(endpoint: string): string {
  const baseUrl = config.api.baseUrl.replace(/\/$/, '');
  const cleanEndpoint = endpoint.replace(/^\//, '');
  return `${baseUrl}/${cleanEndpoint}`;
}

// 환경별 로깅
export function log(level: 'debug' | 'info' | 'warn' | 'error', ...args: any[]) {
  if (!config.dev.enableConsoleLog) return;
  
  const logLevel = config.dev.logLevel;
  const levels = { debug: 0, info: 1, warn: 2, error: 3 };
  
  if (levels[level] >= levels[logLevel as keyof typeof levels]) {
    console[level](`[${level.toUpperCase()}]`, ...args);
  }
}

// 조건부 실행
export function runInDev(fn: () => void) {
  if (config.env.isDevelopment) {
    fn();
  }
}

export function runInProd(fn: () => void) {
  if (config.env.isProduction) {
    fn();
  }
}
```

## 🧪 Testing Strategy

### 설정 검증 테스트
```typescript
// src/__tests__/config.test.ts
import { env, config, validateConfig } from '@/lib/env';

describe('Environment Configuration', () => {
  test('환경 변수가 올바르게 파싱된다', () => {
    expect(env.NEXT_PUBLIC_APP_NAME).toBeDefined();
    expect(env.NEXT_PUBLIC_APP_URL).toMatch(/^https?:\/\//);
  });

  test('기능 플래그가 boolean으로 변환된다', () => {
    expect(typeof config.features.analytics).toBe('boolean');
    expect(typeof config.features.darkMode).toBe('boolean');
  });

  test('프로덕션 환경에서 필수 변수가 존재한다', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    
    expect(() => validateConfig()).not.toThrow();
    
    process.env.NODE_ENV = originalEnv;
  });

  test('API URL이 올바르게 생성된다', () => {
    const url = createApiUrl('/products');
    expect(url).toMatch(/\/api\/products$/);
  });
});
```

## 📊 Definition of Done Checklist
- [ ] 환경 변수 스키마 및 검증 시스템 구현
- [ ] 환경별 설정 파일 구조화 완료
- [ ] 타입 안전한 설정 접근 시스템 구현
- [ ] 빌드 시 환경별 설정 주입 자동화
- [ ] 민감 정보 보안 처리 완료
- [ ] 설정 검증 및 에러 핸들링 구현
- [ ] 개발 환경 설정 변경 즉시 반영 확인
- [ ] 설정 시스템 테스트 작성 완료
- [ ] 문서 및 사용 가이드 작성

## 🚨 Potential Blockers & Mitigations

### Blocker 1: 환경 변수 관리 복잡도
**Risk**: 다양한 환경에서 설정 관리가 복잡해질 수 있음  
**Mitigation**: 명확한 네이밍 컨벤션 적용, 템플릿 파일 제공

### Blocker 2: 민감 정보 보안
**Risk**: API 키 등 민감 정보가 클라이언트에 노출될 위험  
**Mitigation**: NEXT_PUBLIC_ 접두사 규칙 엄격히 적용, 서버 사이드 전용 변수 분리

### Blocker 3: 빌드 시간 증가
**Risk**: 환경별 설정 생성으로 빌드 시간 증가  
**Mitigation**: 설정 생성 로직 최적화, 캐싱 활용

### Blocker 4: 타입 안전성 보장
**Risk**: 환경 변수의 런타임 타입 불일치  
**Mitigation**: Zod 스키마 검증, 빌드 시 타입 체크

## 🔗 Related Stories
- **Depends on**: Story 6.1 (상수 중앙화)
- **Blocks**: Story 6.3 (빌드 최적화)
- **Related**: Epic 5 (성능 최적화 설정 연동)

## 📝 환경 설정 가이드

### 새 환경 변수 추가 방법
1. `.env.example`에 변수 추가
2. `src/lib/env.ts`의 스키마에 정의
3. `src/config/index.ts`에서 활용
4. 타입 체크 및 테스트

### 기능 플래그 사용법
```typescript
import { isFeatureEnabled } from '@/lib/config-utils';

if (isFeatureEnabled('analytics')) {
  // Google Analytics 초기화
}

if (isFeatureEnabled('darkMode')) {
  // 다크 모드 토글 표시
}
```

---

*작성일: 2025-01-28*  
*최종 수정일: 2025-01-28*