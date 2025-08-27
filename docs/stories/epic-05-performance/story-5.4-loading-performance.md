# Story 5.4: 로딩 성능 개선

## 📋 Story 카드
**Title**: 로딩 성능 개선  
**Epic**: Performance Optimization  
**Priority**: P0 (Critical)  
**Points**: 4점  
**Assignee**: TBD  
**Sprint**: TBD

## 📝 User Story
```
As a 사용자
I want 모든 페이지가 빠르게 로드되고 부드럽게 상호작용되어
So that 쾌적한 웹 경험을 할 수 있다
```

## ✅ Acceptance Criteria
- [ ] 모든 페이지의 FCP가 1.8초 이하가 된다
- [ ] LCP가 2.5초 이하로 개선된다
- [ ] TTI가 3.8초 이하로 단축된다
- [ ] 스켈레톤 로딩과 프리로딩이 구현된다
- [ ] 서비스 워커 캐싱이 적용된다
- [ ] Core Web Vitals 점수가 모두 Green 상태가 된다
- [ ] 네트워크 지연 시나리오에서도 안정적으로 작동한다

## 🔧 세분화된 Technical Tasks (4점)

### Task 1: 스켈레톤 로딩 및 로딩 상태 개선 (1점)
- [ ] 주요 컴포넌트별 스켈레톤 UI 구현
- [ ] 로딩 상태 통합 관리
- [ ] 스켈레톤 애니메이션 최적화
- [ ] 점진적 로딩 패턴 적용

### Task 2: 리소스 프리로딩 및 우선순위화 (1점)
- [ ] Critical resources preloading
- [ ] DNS prefetch 최적화
- [ ] Resource hints 적용
- [ ] 폰트 로딩 최적화

### Task 3: 캐싱 전략 및 서비스 워커 (1점)
- [ ] Next.js SWR 캐싱 최적화
- [ ] 브라우저 캐싱 전략
- [ ] Service Worker 구현 (선택)
- [ ] Stale-While-Revalidate 패턴

### Task 4: 성능 모니터링 및 최적화 (1점)
- [ ] Real User Monitoring 구현
- [ ] Core Web Vitals 추적
- [ ] 성능 대시보드 구축
- [ ] 자동 성능 회귀 감지

## 🏗️ Implementation Details

### 스켈레톤 로딩 시스템

#### `src/components/loading/SkeletonComponents.tsx`
```typescript
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  animate?: boolean;
}

export function Skeleton({ className, animate = true }: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-gray-200 rounded-md',
        animate && 'animate-pulse',
        className
      )}
    />
  );
}

// 컴포넌트별 스켈레톤
export function ProductCardSkeleton() {
  return (
    <div className="space-y-3 p-4 border border-gray-200 rounded-lg">
      <Skeleton className="aspect-square w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-6 w-1/3" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function BrandHighlightsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="aspect-square w-full" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </div>
      ))}
    </div>
  );
}

export function HeroSectionSkeleton() {
  return (
    <div className="relative h-[60vh] bg-gray-200 flex items-center justify-center">
      <div className="text-center space-y-4">
        <Skeleton className="h-12 w-80 mx-auto" />
        <Skeleton className="h-6 w-96 mx-auto" />
        <Skeleton className="h-10 w-32 mx-auto" />
      </div>
    </div>
  );
}
```

### 리소스 프리로딩

#### `src/components/Head/ResourcePreloader.tsx`
```typescript
import Head from 'next/head';

interface ResourcePreloaderProps {
  criticalImages?: string[];
  fonts?: string[];
  criticalCSS?: string[];
}

export default function ResourcePreloader({
  criticalImages = [],
  fonts = [],
  criticalCSS = []
}: ResourcePreloaderProps) {
  return (
    <Head>
      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//images.unsplash.com" />
      
      {/* Preconnect for critical third-party origins */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      
      {/* Critical font preloading */}
      {fonts.map((font) => (
        <link
          key={font}
          rel="preload"
          href={font}
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
      ))}
      
      {/* Critical image preloading */}
      {criticalImages.map((image) => (
        <link
          key={image}
          rel="preload"
          href={image}
          as="image"
        />
      ))}
      
      {/* Critical CSS preloading */}
      {criticalCSS.map((css) => (
        <link
          key={css}
          rel="preload"
          href={css}
          as="style"
        />
      ))}
    </Head>
  );
}
```

#### `src/pages/_document.tsx` 최적화
```typescript
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          {/* Critical CSS inlining */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
                /* Critical above-the-fold styles */
                .hero-section { min-height: 60vh; }
                .skeleton { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
                @keyframes pulse {
                  0%, 100% { opacity: 1; }
                  50% { opacity: .5; }
                }
              `
            }}
          />
          
          {/* Font optimization */}
          <link
            rel="preload"
            href="/fonts/inter-var.woff2"
            as="font"
            type="font/woff2"
            crossOrigin=""
          />
          
          {/* Resource hints */}
          <link rel="dns-prefetch" href="//api.example.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          
          {/* Critical images */}
          <link rel="preload" href="/images/hero-bg.webp" as="image" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

### 로딩 상태 관리

#### `src/hooks/useLoadingState.ts`
```typescript
import { useState, useEffect } from 'react';

interface LoadingState {
  isLoading: boolean;
  progress: number;
  stage: 'initial' | 'fetching' | 'processing' | 'complete';
}

export function useLoadingState(initialState: Partial<LoadingState> = {}) {
  const [state, setState] = useState<LoadingState>({
    isLoading: false,
    progress: 0,
    stage: 'initial',
    ...initialState
  });

  const setLoading = (loading: boolean) => {
    setState(prev => ({
      ...prev,
      isLoading: loading,
      stage: loading ? 'fetching' : 'complete'
    }));
  };

  const setProgress = (progress: number) => {
    setState(prev => ({ ...prev, progress }));
  };

  const setStage = (stage: LoadingState['stage']) => {
    setState(prev => ({ ...prev, stage }));
  };

  return {
    ...state,
    setLoading,
    setProgress,
    setStage
  };
}

// 페이지 로딩을 위한 특화된 Hook
export function usePageLoading() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedComponents, setLoadedComponents] = useState<Set<string>>(new Set());

  const markComponentLoaded = (componentName: string) => {
    setLoadedComponents(prev => new Set(prev).add(componentName));
  };

  useEffect(() => {
    // 필수 컴포넌트들이 모두 로드되면 페이지 로딩 완료
    const requiredComponents = ['hero', 'navigation', 'footer'];
    const allLoaded = requiredComponents.every(component => 
      loadedComponents.has(component)
    );

    if (allLoaded) {
      setIsLoading(false);
    }
  }, [loadedComponents]);

  return {
    isLoading,
    markComponentLoaded,
    loadProgress: (loadedComponents.size / 3) * 100 // 필수 컴포넌트 3개 기준
  };
}
```

### 캐싱 전략

#### `src/lib/cache-strategy.ts`
```typescript
// SWR을 활용한 데이터 캐싱 최적화
export const cacheConfig = {
  // 제품 데이터 (자주 변경되지 않음)
  products: {
    refreshInterval: 5 * 60 * 1000, // 5분
    dedupingInterval: 2 * 1000, // 2초
    revalidateOnFocus: false,
    revalidateOnReconnect: true
  },
  
  // 사용자 데이터 (실시간 반영 필요)
  user: {
    refreshInterval: 30 * 1000, // 30초
    dedupingInterval: 1000, // 1초
    revalidateOnFocus: true,
    revalidateOnReconnect: true
  },
  
  // 정적 콘텐츠 (거의 변경되지 않음)
  static: {
    refreshInterval: 24 * 60 * 60 * 1000, // 24시간
    dedupingInterval: 60 * 1000, // 1분
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  }
};

// 브라우저 캐싱 헤더 설정
export const setCacheHeaders = (maxAge: number, swr: number = maxAge / 10) => {
  return {
    'Cache-Control': `public, max-age=${maxAge}, stale-while-revalidate=${swr}`,
    'CDN-Cache-Control': `public, max-age=${maxAge}`,
    'Vary': 'Accept-Encoding'
  };
};
```

### 성능 모니터링

#### `src/lib/performance-monitor.ts`
```typescript
// Core Web Vitals 측정
export class PerformanceMonitor {
  private metrics: Map<string, number> = new Map();
  
  constructor() {
    this.initializeObservers();
  }

  private initializeObservers() {
    if (typeof window === 'undefined') return;

    // LCP 측정
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      this.metrics.set('LCP', lastEntry.startTime);
      this.reportMetric('LCP', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // FID 측정
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        const fid = entry.processingStart - entry.startTime;
        this.metrics.set('FID', fid);
        this.reportMetric('FID', fid);
      });
    }).observe({ entryTypes: ['first-input'] });

    // CLS 측정
    new PerformanceObserver((list) => {
      let cls = 0;
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          cls += entry.value;
        }
      });
      this.metrics.set('CLS', cls);
      this.reportMetric('CLS', cls);
    }).observe({ entryTypes: ['layout-shift'] });
  }

  private reportMetric(name: string, value: number) {
    // 개발 환경에서는 콘솔 출력
    if (process.env.NODE_ENV === 'development') {
      console.log(`${name}: ${value}`);
    }

    // 프로덕션에서는 분석 서비스에 전송
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(name, value);
    }
  }

  private sendToAnalytics(name: string, value: number) {
    // Google Analytics 4 측정
    if (typeof gtag !== 'undefined') {
      gtag('event', name, {
        value: Math.round(value),
        custom_map: { metric_name: name }
      });
    }

    // 커스텀 분석 엔드포인트
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        metric: name,
        value,
        url: window.location.href,
        timestamp: Date.now()
      })
    }).catch(() => {
      // 에러 무시 (분석 데이터는 필수가 아님)
    });
  }

  getMetrics() {
    return Object.fromEntries(this.metrics);
  }
}

// 글로벌 성능 모니터 인스턴스
export const performanceMonitor = new PerformanceMonitor();
```

### 페이지별 최적화

#### `src/pages/index.tsx` (홈페이지 최적화)
```typescript
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { GetStaticProps } from 'next';

// Critical components (즉시 로드)
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import ResourcePreloader from '@/components/Head/ResourcePreloader';

// Non-critical components (lazy load)
const ProductGrid = dynamic(
  () => import('@/components/sections/ProductGrid'),
  {
    loading: () => <ProductGridSkeleton />,
    ssr: true
  }
);

const BrandHighlights = dynamic(
  () => import('@/components/sections/BrandHighlights'),
  {
    loading: () => <BrandHighlightsSkeleton />,
    ssr: false // Above-the-fold가 아니므로 SSR 비활성화
  }
);

interface HomePageProps {
  initialData: {
    products: Product[];
    highlights: Highlight[];
  };
}

export default function HomePage({ initialData }: HomePageProps) {
  const { markComponentLoaded, isLoading, loadProgress } = usePageLoading();

  useEffect(() => {
    // 컴포넌트 로딩 완료 마킹
    markComponentLoaded('hero');
    markComponentLoaded('navigation');
  }, [markComponentLoaded]);

  return (
    <>
      <ResourcePreloader
        criticalImages={['/images/hero-bg.webp']}
        fonts={['/fonts/inter-var.woff2']}
      />
      
      <Layout>
        {/* Critical content - 즉시 렌더링 */}
        <HeroSection priority />
        
        {/* Progressive loading indicator */}
        {isLoading && (
          <div className="fixed top-0 left-0 w-full h-1 bg-blue-600 z-50"
               style={{ width: `${loadProgress}%` }} />
        )}
        
        {/* Non-critical content - 지연 로드 */}
        <ProductGrid 
          products={initialData.products}
          onLoad={() => markComponentLoaded('products')}
        />
        
        <BrandHighlights 
          highlights={initialData.highlights}
          onLoad={() => markComponentLoaded('highlights')}
        />
      </Layout>
    </>
  );
}

// ISR로 성능과 SEO 모두 확보
export const getStaticProps: GetStaticProps = async () => {
  const [products, highlights] = await Promise.all([
    fetchProducts({ limit: 6 }),
    fetchBrandHighlights()
  ]);

  return {
    props: {
      initialData: { products, highlights }
    },
    revalidate: 3600 // 1시간마다 재생성
  };
};
```

## 🧪 Testing Strategy

### 성능 테스트 자동화
```typescript
// src/__tests__/performance.test.ts
import { chromium } from 'playwright';

describe('Loading Performance', () => {
  test('페이지 로딩 시간이 목표치 이하', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    const startTime = Date.now();
    await page.goto('http://localhost:3000');
    
    // FCP 대기
    await page.waitForLoadState('domcontentloaded');
    const fcpTime = Date.now() - startTime;
    expect(fcpTime).toBeLessThan(1800); // 1.8초 이하
    
    // LCP 대기
    await page.waitForSelector('[data-testid="main-content"]');
    const lcpTime = Date.now() - startTime;
    expect(lcpTime).toBeLessThan(2500); // 2.5초 이하
    
    await browser.close();
  });

  test('스켈레톤 로딩이 표시된다', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    // 느린 네트워크 시뮬레이션
    await page.route('**/*', route => {
      setTimeout(() => route.continue(), 1000);
    });
    
    await page.goto('http://localhost:3000');
    
    // 스켈레톤이 보이는지 확인
    const skeleton = await page.locator('.animate-pulse');
    expect(await skeleton.count()).toBeGreaterThan(0);
    
    await browser.close();
  });
});
```

## 📊 Definition of Done Checklist
- [ ] 모든 주요 컴포넌트 스켈레톤 UI 구현
- [ ] Critical resources preloading 설정 완료
- [ ] Font loading 최적화 적용
- [ ] SWR 캐싱 전략 구현
- [ ] Core Web Vitals 모니터링 구현
- [ ] FCP 1.8초 이하 달성
- [ ] LCP 2.5초 이하 달성
- [ ] TTI 3.8초 이하 달성
- [ ] 성능 자동 테스트 구현
- [ ] 실제 사용자 성능 모니터링 설정

## 🚨 Potential Blockers & Mitigations

### Blocker 1: 스켈레톤 UI 디자인 복잡도
**Risk**: 실제 컴포넌트와 일치하는 스켈레톤 제작의 어려움  
**Mitigation**: 컴포넌트별 간단한 형태 우선 적용, 점진적 개선

### Blocker 2: 캐싱 전략 복잡도
**Risk**: 다양한 데이터 특성에 맞는 캐싱 전략 설정의 복잡함  
**Mitigation**: 데이터 특성별 분류 후 단계적 적용, A/B 테스트

### Blocker 3: 성능 측정 환경 차이
**Risk**: 개발 환경과 실제 사용자 환경의 성능 차이  
**Mitigation**: 다양한 네트워크/디바이스에서 테스트, RUM 데이터 활용

### Blocker 4: 리소스 프리로딩 오버헤드
**Risk**: 과도한 프리로딩으로 인한 초기 로딩 부담 증가  
**Mitigation**: Critical resources만 선별적 프리로딩, 우선순위 기반 적용

## 🔗 Related Stories
- **Depends on**: Story 5.1, 5.2, 5.3 (모든 최적화의 종합)
- **Blocks**: 없음 (Epic 5의 마지막 Story)
- **Related**: Epic 6 (Configuration에서 성능 설정 관리)

## 📈 성능 목표

### Core Web Vitals 목표
- **LCP**: 2.5초 → 1.8초 (28% 개선)
- **FID**: 100ms → 50ms (50% 개선)  
- **CLS**: 0.25 → 0.1 (60% 개선)

### 로딩 성능 목표
- **FCP**: 3초 → 1.5초 (50% 개선)
- **TTI**: 5초 → 3초 (40% 개선)
- **Speed Index**: 4초 → 2.5초 (38% 개선)

---

*작성일: 2025-01-28*  
*최종 수정일: 2025-01-28*