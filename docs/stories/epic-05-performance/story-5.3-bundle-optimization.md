# Story 5.3: 번들 크기 최적화

## 📋 Story 카드
**Title**: 번들 크기 최적화  
**Epic**: Performance Optimization  
**Priority**: P0 (Critical)  
**Points**: 5점  
**Assignee**: TBD  
**Sprint**: TBD

## 📝 User Story
```
As a 사용자
I want 앱이 빠르게 로드되고 필요한 코드만 다운로드되어
So that 초기 로딩 시간이 최소화되고 네트워크 비용이 절약된다
```

## ✅ Acceptance Criteria
- [ ] Tree-shaking이 모든 라이브러리에 적용된다
- [ ] Code splitting으로 페이지별 번들이 분리된다
- [ ] Dynamic imports가 적절히 사용된다
- [ ] 미사용 코드가 제거된다
- [ ] 번들 크기가 30% 이상 감소한다
- [ ] First Load JS가 250KB 이하로 유지된다
- [ ] Third-party 라이브러리가 최적화된다

## 🔧 세분화된 Technical Tasks (5점)

### Task 1: 번들 분석 및 최적화 설정 (1점)
- [ ] Bundle analyzer 설정 및 현재 상태 분석
- [ ] Webpack 번들 최적화 설정
- [ ] Tree-shaking 최적화
- [ ] 미사용 코드 식별 및 제거

### Task 2: Code Splitting 구현 (1.5점)
- [ ] 페이지별 코드 분리 (App Router 활용)
- [ ] 컴포넌트 레벨 Lazy Loading
- [ ] Dynamic imports 구현
- [ ] Route-based splitting 최적화

### Task 3: Third-party 라이브러리 최적화 (1.5점)
- [ ] 라이브러리별 import 최적화
- [ ] 불필요한 dependencies 제거
- [ ] CDN 활용 검토
- [ ] Polyfill 최적화

### Task 4: 고급 최적화 및 모니터링 (1점)
- [ ] SWC/Turbo 최적화 설정
- [ ] 번들 성능 모니터링 도구 설정
- [ ] CI/CD 번들 크기 체크
- [ ] 성능 회귀 방지 시스템

## 🏗️ Implementation Details

### Bundle Analyzer 설정

#### `next.config.js` 분석 도구 추가
```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  // 기존 설정
  swcMinify: true, // SWC 압축 활성화
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // 프로덕션에서 console.log 제거
  },
  
  // 실험적 기능
  experimental: {
    optimizeCss: true, // CSS 최적화
    scrollRestoration: true,
    legacyBrowsers: false, // 구형 브라우저 지원 비활성화로 번들 크기 감소
  },
  
  webpack: (config, { dev, isServer }) => {
    // 프로덕션에서 소스맵 제거 (번들 크기 감소)
    if (!dev && !isServer) {
      config.devtool = false;
    }
    
    // Tree-shaking 최적화
    config.optimization = {
      ...config.optimization,
      usedExports: true,
      sideEffects: false,
    };
    
    // 번들 분석을 위한 설정
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: true,
        })
      );
    }
    
    return config;
  },
});

module.exports = nextConfig;
```

### Code Splitting 구현

#### 1. 페이지별 Lazy Loading
```typescript
// src/components/lazy/index.ts
import dynamic from 'next/dynamic';

// 무거운 컴포넌트들 Lazy Loading
export const ProductGrid = dynamic(
  () => import('../sections/ProductGrid'),
  {
    loading: () => <ProductGridSkeleton />,
    ssr: true // SEO가 중요한 경우
  }
);

export const BrandHighlights = dynamic(
  () => import('../sections/BrandHighlights'),
  {
    loading: () => <BrandHighlightsSkeleton />,
    ssr: false // Above-the-fold가 아닌 경우
  }
);

export const Sustainability = dynamic(
  () => import('../sections/Sustainability'),
  {
    loading: () => <SustainabilitySkeleton />,
    ssr: false
  }
);

// 사용자 인터랙션 후 로드되는 컴포넌트
export const ProductConfigurator = dynamic(
  () => import('../sections/ProductConfigurator'),
  {
    loading: () => <ConfiguratorSkeleton />,
    ssr: false
  }
);
```

#### 2. 조건부 로딩
```typescript
// src/components/ConditionalComponents.tsx
import dynamic from 'next/dynamic';
import { useBreakpoint } from '@/hooks/useMediaQuery';

// 모바일에서만 필요한 컴포넌트
const MobileMenu = dynamic(
  () => import('./MobileMenu'),
  { ssr: false }
);

// 데스크톱에서만 필요한 컴포넌트  
const DesktopSidebar = dynamic(
  () => import('./DesktopSidebar'),
  { ssr: false }
);

export default function ConditionalComponents() {
  const { isMobile } = useBreakpoint();
  
  return (
    <>
      {isMobile && <MobileMenu />}
      {!isMobile && <DesktopSidebar />}
    </>
  );
}
```

### Third-party 라이브러리 최적화

#### 1. 라이브러리 Import 최적화
```typescript
// Before (전체 라이브러리 import)
import * as Icons from 'lucide-react';
import { format, parseISO, addDays, subDays } from 'date-fns';

// After (필요한 부분만 import)
import { ShoppingCart, Menu, Search, User } from 'lucide-react';
import { format, parseISO } from 'date-fns';

// Swiper 최적화
// Before
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// After (필요한 모듈만)
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/bundle'; // 압축된 CSS
```

#### 2. Package.json 최적화
```json
{
  "dependencies": {
    // 필수 라이브러리만 유지
    "next": "15.5.0",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    
    // UI 라이브러리 (트리셰이킹 지원)
    "lucide-react": "^0.540.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1",
    
    // 기능별 필수
    "swiper": "^11.2.10"
  },
  "devDependencies": {
    // 번들 분석
    "@next/bundle-analyzer": "^15.0.0",
    
    // 개발 도구
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19"
  }
}
```

### 번들 크기 최적화 설정

#### `src/lib/bundle-optimization.ts`
```typescript
// Tree-shaking을 위한 ES 모듈 import 가이드
export const optimizeImports = {
  // Lodash 대신 네이티브 메서드 사용
  debounce: (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  },
  
  // Date-fns 대신 Intl API 사용
  formatDate: (date: Date, locale = 'ko-KR') => {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  },
  
  // 가벼운 유틸리티 함수들
  cn: (...classes: string[]) => classes.filter(Boolean).join(' ')
};

// 동적 import 헬퍼
export const lazyLoad = {
  component: <T extends React.ComponentType<any>>(
    importFn: () => Promise<{ default: T }>
  ) => {
    return dynamic(importFn, {
      loading: () => <div className="animate-pulse bg-gray-200 rounded" />,
      ssr: false
    });
  }
};
```

### 성능 모니터링

#### `src/lib/performance-monitor.ts`
```typescript
// 번들 크기 추적
export const bundleMetrics = {
  // Core Web Vitals 측정
  measureWebVitals: () => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // LCP 측정
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });
      
      // FID 측정
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      }).observe({ entryTypes: ['first-input'] });
    }
  },
  
  // 번들 크기 체크
  checkBundleSize: () => {
    if (process.env.NODE_ENV === 'development') {
      const bundleSize = performance.getEntriesByType('navigation')[0];
      console.log('Bundle loaded:', bundleSize.transferSize, 'bytes');
    }
  }
};

// 런타임에서 사용
export const initPerformanceMonitoring = () => {
  bundleMetrics.measureWebVitals();
  bundleMetrics.checkBundleSize();
};
```

### CI/CD 번들 체크

#### `.github/workflows/bundle-size.yml`
```yaml
name: Bundle Size Check

on: [pull_request]

jobs:
  bundle-size:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build application
        run: npm run build
        
      - name: Analyze bundle size
        run: |
          npm run analyze
          
      - name: Bundle size comment
        uses: andresz1/size-limit-action@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

## 🧪 Testing Strategy

### 번들 크기 테스트
```bash
# 번들 분석 스크립트
npm run analyze

# 특정 페이지 번들 크기 체크
npm run build && npm run start
curl -w "%{size_download}\n" -o /dev/null -s http://localhost:3000/

# Lighthouse CI 번들 성능 체크
npx lhci autorun --budget-path=budget.json
```

### 성능 벤치마크
```javascript
// budget.json - 번들 크기 예산 설정
[
  {
    "path": "/*",
    "resourceSizes": [
      {
        "resourceType": "script",
        "budget": 250000 // 250KB 제한
      },
      {
        "resourceType": "total",
        "budget": 500000 // 500KB 제한
      }
    ]
  }
]
```

## 📊 Definition of Done Checklist
- [ ] Bundle analyzer 설정 및 초기 분석 완료
- [ ] Tree-shaking 모든 라이브러리 적용 확인
- [ ] Code splitting 주요 컴포넌트 적용
- [ ] Dynamic imports 적절한 위치 구현
- [ ] 미사용 dependencies 제거 완료
- [ ] 번들 크기 30% 이상 감소 확인
- [ ] First Load JS 250KB 이하 달성
- [ ] CI/CD 번들 크기 체크 구현
- [ ] Lighthouse 성능 점수 향상 확인

## 🚨 Potential Blockers & Mitigations

### Blocker 1: Tree-shaking이 작동하지 않는 라이브러리
**Risk**: 일부 라이브러리가 ES 모듈을 지원하지 않아 전체 번들 포함  
**Mitigation**: 대체 라이브러리 검토, 필요시 babel 플러그인 활용

### Blocker 2: Code splitting으로 인한 로딩 지연
**Risk**: 과도한 코드 분리로 사용자 경험 저하  
**Mitigation**: 적절한 chunk 크기 유지, 중요 컴포넌트는 prefetch 적용

### Blocker 3: Dynamic import 에러 핸들링
**Risk**: 네트워크 오류 시 동적 로딩 실패  
**Mitigation**: Error boundary 구현, fallback 컴포넌트 제공

### Blocker 4: 번들 분석 복잡도
**Risk**: 어떤 코드를 최적화해야 하는지 파악 어려움  
**Mitigation**: Bundle analyzer 시각화 활용, 단계적 최적화 접근

## 🔗 Related Stories
- **Depends on**: Story 5.2 (이미지 최적화)
- **Blocks**: 없음 (독립적 실행 가능)
- **Related**: Story 5.1 (컴포넌트 메모화), Story 5.4 (로딩 성능)

## 📈 최적화 목표

### Before (현재)
- **First Load JS**: ~400KB
- **페이지별 JS**: 모든 코드 포함
- **Third-party**: 전체 라이브러리 로딩
- **Tree-shaking**: 부분적 적용

### After (최적화 후)
- **First Load JS**: <250KB (38% 감소)
- **페이지별 JS**: 필요한 코드만 로딩
- **Third-party**: 필요한 부분만 import
- **Tree-shaking**: 모든 라이브러리 적용

### 성능 개선 지표
- **번들 크기**: 30-40% 감소
- **초기 로딩**: 2초 → 1.2초
- **Time to Interactive**: 3초 → 2초
- **Network 사용량**: 50% 감소

---

*작성일: 2025-01-28*  
*최종 수정일: 2025-01-28*