# Story 5.2: 이미지 최적화

## 📋 Story 카드
**Title**: 이미지 최적화  
**Epic**: Performance Optimization  
**Priority**: P0 (Critical)  
**Points**: 5점 (수정됨: 기존 3점)  
**Assignee**: TBD  
**Sprint**: TBD

## 📝 User Story
```
As a 사용자
I want 이미지가 빠르게 로드되고 적절한 해상도로 표시되어
So that 페이지 로딩 속도가 빠르고 데이터 사용량이 최적화된다
```

## ✅ Acceptance Criteria
- [ ] Next.js Image 컴포넌트로 모든 이미지가 교체된다
- [ ] WebP/AVIF 형식 자동 변환이 적용된다
- [ ] 반응형 이미지 크기가 구현된다
- [ ] Lazy loading이 모든 이미지에 적용된다
- [ ] 이미지 압축 설정이 최적화된다
- [ ] LCP(Largest Contentful Paint) 점수가 개선된다
- [ ] 전체 이미지 로딩 속도가 50% 이상 향상된다

## 🔧 세분화된 Technical Tasks (5점)

### Task 1: Next.js Image 컴포넌트 마이그레이션 (1.5점)
- [ ] 기존 `<img>` 태그를 `<Image>` 컴포넌트로 교체
  - ProductCard 이미지들 (5개)
  - HeroSection 이미지 (1개)
  - BrandHighlights 이미지들 (4개)
  - CategoryCard 이미지들 (3개)
- [ ] 이미지 크기 및 속성 최적화
- [ ] alt 텍스트 접근성 개선
- [ ] priority 설정 (above-the-fold 이미지)

### Task 2: 이미지 형식 최적화 설정 (1점)
- [ ] next.config.js 이미지 최적화 설정
  ```javascript
  const nextConfig = {
    images: {
      formats: ['image/avif', 'image/webp'],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      quality: 80
    }
  }
  ```
- [ ] 도메인 허용 목록 설정
- [ ] 이미지 압축 품질 최적화

### Task 3: 반응형 이미지 시스템 (1.5점)
- [ ] 브레이크포인트별 이미지 크기 정의
  ```typescript
  const responsiveImageSizes = {
    mobile: { width: 320, height: 240 },
    tablet: { width: 640, height: 480 },
    desktop: { width: 1200, height: 800 }
  }
  ```
- [ ] sizes 속성 최적화
- [ ] 고밀도 디스플레이(Retina) 대응
- [ ] 컴포넌트별 최적 크기 설정

### Task 4: 로딩 최적화 및 성능 향상 (1점)
- [ ] Lazy loading 전략 구현
- [ ] 이미지 placeholder/blur 설정
- [ ] 중요 이미지 preload 설정
- [ ] 이미지 로딩 에러 핸들링

## 🏗️ Implementation Details

### Next.js Image 컴포넌트 설정

#### `next.config.js` 최적화
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 최신 이미지 형식 지원
    formats: ['image/avif', 'image/webp'],
    
    // 디바이스별 최적 크기
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // 아이콘/썸네일용 크기
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // 압축 품질 (80이 성능/품질 균형점)
    quality: 80,
    
    // 외부 이미지 도메인 (필요시)
    domains: ['example.com', 'cdn.example.com'],
    
    // 이미지 최적화 비활성화 (개발 시 빠른 빌드)
    unoptimized: process.env.NODE_ENV === 'development' ? false : false
  }
}

module.exports = nextConfig;
```

### 컴포넌트별 이미지 최적화

#### 1. ProductCard 이미지 최적화
```typescript
// Before
function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover"
      />
    </div>
  );
}

// After
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  priority?: boolean; // above-the-fold 이미지인지
  sizes?: string; // 반응형 크기
}

function ProductCard({ 
  product, 
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
}: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="relative aspect-square">
        <Image 
          src={product.image}
          alt={product.name}
          fill
          className="object-cover rounded-lg"
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..." // 작은 blur 이미지
        />
      </div>
    </div>
  );
}
```

#### 2. HeroSection 이미지 최적화
```typescript
// Hero 이미지는 항상 priority=true
function HeroSection() {
  return (
    <section className="relative h-screen">
      <Image
        src="/images/hero-background.jpg"
        alt="Hero Background"
        fill
        className="object-cover"
        priority={true} // LCP 최적화
        sizes="100vw"
        quality={90} // Hero 이미지는 높은 품질
      />
      <div className="relative z-10">
        {/* Hero 콘텐츠 */}
      </div>
    </section>
  );
}
```

#### 3. BrandHighlights 이미지 최적화
```typescript
function BrandHighlights() {
  const highlights = [
    { id: 1, image: '/images/highlight-1.jpg', title: '품질' },
    { id: 2, image: '/images/highlight-2.jpg', title: '디자인' },
    { id: 3, image: '/images/highlight-3.jpg', title: '혁신' },
    { id: 4, image: '/images/highlight-4.jpg', title: '지속가능성' }
  ];

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {highlights.map((highlight, index) => (
        <div key={highlight.id} className="relative aspect-square">
          <Image
            src={highlight.image}
            alt={highlight.title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 50vw, 25vw"
            // 첫 2개는 우선 로딩 (모바일 기준 above-the-fold)
            priority={index < 2}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <h3 className="text-white font-semibold">{highlight.title}</h3>
          </div>
        </div>
      ))}
    </section>
  );
}
```

### 반응형 이미지 유틸리티

#### `src/lib/image-utils.ts`
```typescript
// 반응형 sizes 문자열 생성 유틸리티
export function createResponsiveSizes(config: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
  default: string;
}) {
  const { mobile = '100vw', tablet = '50vw', desktop = '33vw', default: defaultSize } = config;
  
  return [
    `(max-width: 768px) ${mobile}`,
    `(max-width: 1200px) ${tablet}`,
    `(min-width: 1201px) ${desktop}`,
    defaultSize
  ].join(', ');
}

// 이미지 크기별 최적화 설정
export const IMAGE_CONFIGS = {
  hero: {
    sizes: '100vw',
    quality: 90,
    priority: true
  },
  productCard: {
    sizes: createResponsiveSizes({
      mobile: '100vw',
      tablet: '50vw', 
      desktop: '33vw',
      default: '33vw'
    }),
    quality: 80,
    priority: false
  },
  thumbnail: {
    sizes: '128px',
    quality: 75,
    priority: false
  },
  brandHighlight: {
    sizes: createResponsiveSizes({
      mobile: '50vw',
      tablet: '25vw',
      desktop: '25vw', 
      default: '25vw'
    }),
    quality: 80,
    priority: false
  }
} as const;

// Blur placeholder 생성
export function generateBlurDataURL(width = 8, height = 8) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL();
}
```

### 이미지 최적화 컴포넌트

#### `src/components/ui/OptimizedImage.tsx`
```typescript
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string;
  showLoadingSpinner?: boolean;
}

export default function OptimizedImage({
  fallbackSrc = '/images/placeholder.jpg',
  showLoadingSpinner = false,
  className = '',
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <Image
        {...props}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        src={hasError ? fallbackSrc : props.src}
      />
      
      {isLoading && showLoadingSpinner && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      )}
    </div>
  );
}
```

## 🧪 Testing Strategy

### 성능 테스트
```typescript
// src/__tests__/image-performance.test.ts
describe('Image Performance', () => {
  test('Next.js Image 컴포넌트가 올바른 props를 가진다', () => {
    render(<ProductCard product={mockProduct} priority={true} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('loading', 'eager'); // priority=true일 때
    expect(image).toHaveAttribute('sizes');
  });

  test('lazy loading이 기본적으로 적용된다', () => {
    render(<ProductCard product={mockProduct} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  test('이미지 에러 시 fallback이 표시된다', async () => {
    render(
      <OptimizedImage 
        src="/invalid-image.jpg" 
        alt="Test"
        fallbackSrc="/placeholder.jpg"
        width={200}
        height={200}
      />
    );

    // 이미지 로드 에러 시뮬레이션
    const image = screen.getByRole('img');
    fireEvent.error(image);

    expect(image).toHaveAttribute('src', expect.stringContaining('placeholder.jpg'));
  });
});
```

### Lighthouse 성능 측정
```bash
# 이미지 최적화 전후 비교
npm run lighthouse:before
npm run lighthouse:after

# 성능 스크립트 추가 (package.json)
{
  "scripts": {
    "lighthouse": "lighthouse http://localhost:3000 --output=json --output-path=./reports/lighthouse.json",
    "lighthouse:ci": "lhci autorun"
  }
}
```

## 📊 Definition of Done Checklist
- [ ] 모든 `<img>` 태그가 Next.js `<Image>`로 교체됨
- [ ] next.config.js 이미지 최적화 설정 완료
- [ ] WebP/AVIF 자동 변환 작동 확인
- [ ] 반응형 이미지 크기 모든 컴포넌트 적용
- [ ] Lazy loading 모든 이미지 적용 (priority 제외)
- [ ] Hero 이미지 priority 설정 완료
- [ ] 이미지 에러 핸들링 구현 완료
- [ ] Lighthouse LCP 점수 20% 이상 개선
- [ ] 전체 이미지 로딩 속도 50% 이상 향상
- [ ] 모든 이미지에 적절한 alt 텍스트 적용

## 🚨 Potential Blockers & Mitigations

### Blocker 1: 기존 이미지 경로 및 크기 이슈
**Risk**: 기존 이미지들이 최적화되지 않은 크기/형식으로 저장되어 있을 수 있음  
**Mitigation**: 이미지 audit 수행, 필요 시 이미지 리사이징 및 압축 처리

### Blocker 2: Layout Shift 문제
**Risk**: 이미지 로딩 중 레이아웃이 밀리는 현상 (CLS 저하)  
**Mitigation**: 적절한 aspect-ratio 설정, placeholder 사용, width/height 명시

### Blocker 3: Next.js Image 설정 복잡도
**Risk**: 다양한 이미지 크기와 용도에 맞는 최적 설정 찾기 어려움  
**Mitigation**: 단계적 적용, A/B 테스트를 통한 최적 설정 도출

### Blocker 4: 외부 이미지 도메인 이슈
**Risk**: CDN이나 외부 이미지 서비스 사용 시 도메인 설정 필요  
**Mitigation**: next.config.js에 허용 도메인 추가, 보안 정책 검토

## 🔗 Related Stories
- **Depends on**: 없음 (독립적 실행 가능)
- **Blocks**: Story 5.4 (로딩 성능 개선)
- **Related**: Story 5.1 (컴포넌트 메모화), Story 5.3 (번들 최적화)

## 📈 성능 개선 목표

### Before (현재 상태)
- **이미지 형식**: JPG/PNG 원본
- **Lazy Loading**: 없음
- **압축**: 최적화되지 않음
- **반응형**: CSS만으로 처리

### After (최적화 후)
- **이미지 형식**: WebP/AVIF 자동 변환
- **Lazy Loading**: 모든 이미지 적용
- **압축**: 80% 품질로 최적화
- **반응형**: 디바이스별 최적 크기

### 예상 성능 향상
- **이미지 용량**: 60-80% 감소
- **LCP 점수**: 20-30% 개선  
- **로딩 속도**: 50% 이상 향상
- **데이터 사용량**: 70% 감소

---

*작성일: 2025-01-28*  
*최종 수정일: 2025-01-28*