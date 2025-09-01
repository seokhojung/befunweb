# 🔄 Product V2 Migration Strategy

## 📋 마이그레이션 개요

기존 BaseProduct 시스템에서 ProductV2로의 안전하고 효율적인 전환 전략을 정의합니다.

**목표**: 기존 V1 시스템을 유지하면서 V2 시스템을 점진적으로 도입

---

## 🎯 마이그레이션 원칙

### 1. **Zero Downtime** 🚫⏰
- 기존 `/products` 페이지는 완전히 유지
- 새로운 `/products-v2` 페이지는 별도 운영
- 사용자 경험에 영향 없음

### 2. **Backward Compatibility** ↩️
- 기존 `BaseProduct` 타입 완전 호환
- API 엔드포인트 변경 없음
- 기존 컴포넌트 영향 없음

### 3. **Progressive Enhancement** 📈
- 단계별 기능 추가
- A/B 테스트 가능
- 롤백 계획 보장

---

## 🔧 기술적 마이그레이션 전략

### 1. **데이터 변환 시스템**

#### 1.1 변환 함수 구조
```typescript
// src/data/migration/baseToV2.ts
export interface MigrationConfig {
  useRealImages: boolean;          // 실제 이미지 사용 여부
  generateMissingVariants: boolean; // 누락 변형 생성 여부
  fallbackCategory: string;        // 기본 카테고리
}

export function migrateToV2(
  products: BaseProduct[], 
  config: MigrationConfig = DEFAULT_CONFIG
): ProductV2[] {
  return products.map(product => convertSingleProduct(product, config));
}

function convertSingleProduct(base: BaseProduct, config: MigrationConfig): ProductV2 {
  return {
    ...base,
    // V2 전용 필드 추가
    mainImage: extractMainImage(base, config),
    instagramImage: extractInstagramImage(base, config),
    colorVariants: generateColorVariants(base, config),
    defaultVariant: selectDefaultVariant(base),
    furnitureType: mapFurnitureType(base.category),
    exactDimensions: generateDimensions(base.category),
    colorName: extractColorName(base),
    badges: generateBadges(base),
    labels: generateLabels(base)
  };
}
```

#### 1.2 이미지 매핑 전략
```typescript
// src/data/migration/imageMapping.ts
export interface ImageMapping {
  category: string;
  colorMappings: {
    [color: string]: {
      main: string;
      instagram: string;
      thumbnail: string;
    };
  };
}

export const IMAGE_MAPPINGS: ImageMapping[] = [
  {
    category: 'furniture',
    colorMappings: {
      white: {
        main: '/images/temp/furniture-white-main.webp',
        instagram: '/images/temp/furniture-white-lifestyle.webp',
        thumbnail: '/images/temp/furniture-white-thumb.webp'
      },
      brown: {
        main: '/images/temp/furniture-brown-main.webp',
        instagram: '/images/temp/furniture-brown-lifestyle.webp',
        thumbnail: '/images/temp/furniture-brown-thumb.webp'
      }
      // ... 더 많은 색상들
    }
  }
  // ... 더 많은 카테고리들
];

export function getImageSet(category: string, color: string): ImageSet {
  const mapping = IMAGE_MAPPINGS.find(m => m.category === category);
  
  if (mapping && mapping.colorMappings[color]) {
    return mapping.colorMappings[color];
  }
  
  // 폴백: 패턴 기반 생성
  return {
    main: `/images/temp/${category}-${color}-main.webp`,
    instagram: `/images/temp/${category}-${color}-lifestyle.webp`,
    thumbnail: `/images/temp/${category}-${color}-thumb.webp`
  };
}
```

### 2. **점진적 배포 전략**

#### 2.1 Feature Flag 시스템
```typescript
// src/config/features.ts (기존 파일 확장)
export const FEATURE_FLAGS = {
  ...existingFlags,
  
  // V2 기능 플래그들
  ENABLE_PRODUCT_V2: process.env.NEXT_PUBLIC_ENABLE_PRODUCT_V2 === 'true',
  V2_IMAGE_SYSTEM: process.env.NEXT_PUBLIC_V2_IMAGE_SYSTEM === 'true',
  V2_COLOR_VARIANTS: process.env.NEXT_PUBLIC_V2_COLOR_VARIANTS === 'true',
  V2_DETAIL_PAGE: process.env.NEXT_PUBLIC_V2_DETAIL_PAGE === 'true'
};

// 조건부 라우팅
export function getProductPageRoute(useV2: boolean = false): string {
  return useV2 && FEATURE_FLAGS.ENABLE_PRODUCT_V2 ? '/products-v2' : '/products';
}
```

#### 2.2 A/B 테스트 설정
```typescript
// src/utils/abTest.ts
export interface ABTestConfig {
  testName: string;
  variants: ('v1' | 'v2')[];
  trafficSplit: number; // 0-100 (V2 트래픽 비율)
}

export const PRODUCT_PAGE_AB_TEST: ABTestConfig = {
  testName: 'product_page_v2',
  variants: ['v1', 'v2'],
  trafficSplit: 10 // 10%만 V2로 라우팅
};

export function shouldUseV2(): boolean {
  if (!FEATURE_FLAGS.ENABLE_PRODUCT_V2) return false;
  
  const userId = getCurrentUserId();
  const hash = hashUserId(userId);
  
  return (hash % 100) < PRODUCT_PAGE_AB_TEST.trafficSplit;
}
```

---

## 📊 단계별 마이그레이션 계획

### Phase 0: 준비 단계 (Day 1)
```bash
✅ 목표: 마이그레이션 인프라 구축
```

#### 작업 항목:
- [ ] **타입 정의**: ProductV2, ColorVariantV2 인터페이스
- [ ] **변환 함수**: baseToV2.ts, imageMapping.ts 
- [ ] **임시 이미지**: 카테고리별 더미 이미지 준비
- [ ] **테스트**: 변환 함수 단위 테스트

#### 검증 기준:
```typescript
// 테스트 예시
describe('BaseProduct to ProductV2 Migration', () => {
  test('converts basic product correctly', () => {
    const baseProduct: BaseProduct = { /* 테스트 데이터 */ };
    const productV2 = convertToProductV2(baseProduct);
    
    expect(productV2.colorVariants).toBeDefined();
    expect(productV2.furnitureType).toBeDefined();
    expect(productV2.exactDimensions).toBeDefined();
  });
  
  test('generates color variants from base variants', () => {
    const baseProduct = createBaseProductWithVariants(3);
    const productV2 = convertToProductV2(baseProduct);
    
    expect(productV2.colorVariants).toHaveLength(3);
    expect(productV2.colorVariants[0].mainImage).toMatch(/\/images\/temp\//);
  });
});
```

### Phase 1: 기본 V2 페이지 (Day 2-3)
```bash
✅ 목표: /products-v2 페이지 기본 동작
```

#### 작업 항목:
- [ ] **페이지 생성**: `/app/products-v2/page.tsx`
- [ ] **데이터 연동**: 변환된 ProductV2 데이터 사용
- [ ] **기본 렌더링**: ProductCardV2 기본 구조
- [ ] **라우팅**: V1과 독립적인 라우팅

#### 검증 기준:
- `/products-v2` 접속 시 변환된 데이터로 카드 렌더링
- 기존 `/products` 페이지 정상 동작 유지
- 콘솔 에러 없음

### Phase 2: 색상 시스템 (Day 4-6)
```bash
✅ 목표: 색상 변형 및 이미지 전환 완성
```

#### 작업 항목:
- [ ] **ColorSwatchGrid**: 썸네일 기반 색상 선택
- [ ] **ImageTransition**: 색상별 이미지 전환
- [ ] **상태 관리**: 색상 선택 상태 관리
- [ ] **이미지 최적화**: Lazy loading, 프리로딩

#### 검증 기준:
- 색상 선택 시 메인 이미지 즉시 변경
- 호버 시 인스타그리드 이미지로 전환
- 모든 색상 변형에 대한 이미지 정상 로딩

### Phase 3: 상세 페이지 연동 (Day 7-9)
```bash
✅ 목표: 카드 → 상세 페이지 완전 연동
```

#### 작업 항목:
- [ ] **상세 페이지**: `/products-v2/[id]/page.tsx`
- [ ] **URL 파라미터**: `?color=` 지원
- [ ] **상태 동기화**: 선택 색상 전달
- [ ] **이미지 갤러리**: 색상별 이미지 표시

#### 검증 기준:
- 카드에서 선택한 색상이 상세 페이지에 반영
- URL 직접 접속 시 올바른 색상 표시
- 브라우저 뒤로가기 정상 동작

---

## 🔍 품질 보증 전략

### 1. **테스트 전략**

#### 1.1 단위 테스트
```bash
# 테스트 커버리지 목표: 85%
src/data/migration/     # 변환 함수 테스트
src/components/v2/      # V2 컴포넌트 테스트
src/hooks/v2/          # V2 훅 테스트
```

#### 1.2 통합 테스트
```typescript
// 페이지 수준 테스트
describe('Products V2 Page Integration', () => {
  test('renders converted products correctly', async () => {
    render(<ProductsV2Page />);
    
    // 변환된 데이터 검증
    expect(await screen.findByText('Original Modern')).toBeInTheDocument();
    expect(await screen.findByText('103 x 243 cm')).toBeInTheDocument();
  });
  
  test('color selection updates images', async () => {
    render(<ProductCardV2 product={mockProductV2} />);
    
    const colorSwatch = screen.getByLabelText('Brown color option');
    fireEvent.click(colorSwatch);
    
    // 이미지 변경 검증
    expect(screen.getByAltText(/brown/i)).toBeInTheDocument();
  });
});
```

#### 1.3 E2E 테스트
```typescript
// Playwright 테스트
test('full user journey v1 to v2', async ({ page }) => {
  // V1 페이지 정상 동작 확인
  await page.goto('/products');
  await expect(page.locator('[data-testid="product-card"]')).toBeVisible();
  
  // V2 페이지 독립 동작 확인  
  await page.goto('/products-v2');
  await expect(page.locator('[data-testid="product-card-v2"]')).toBeVisible();
  
  // 색상 변경 시나리오
  await page.click('[data-testid="color-swatch"]:nth-child(2)');
  await expect(page.locator('[data-testid="main-image"]')).toHaveAttribute('src', /brown/);
  
  // 상세 페이지 이동
  await page.click('[data-testid="product-card-v2"]');
  await expect(page.url()).toContain('/products-v2/');
  await expect(page.url()).toContain('color=');
});
```

### 2. **성능 모니터링**

#### 2.1 Core Web Vitals
```javascript
// 성능 측정 스크립트
const measureV2Performance = () => {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'largest-contentful-paint') {
        analytics.track('LCP_V2', { value: entry.startTime });
      }
      
      if (entry.entryType === 'layout-shift') {
        analytics.track('CLS_V2', { value: entry.value });
      }
    });
  });
  
  observer.observe({ entryTypes: ['largest-contentful-paint', 'layout-shift'] });
};
```

#### 2.2 번들 사이즈 모니터링
```json
// package.json scripts
{
  "analyze": "cross-env ANALYZE=true next build",
  "bundle:compare": "npm run analyze && bundlewatch"
}
```

---

## 🚨 리스크 관리

### 1. **기술적 리스크**

#### 1.1 데이터 변환 실패
**위험도**: 🔴 High  
**영향**: 잘못된 상품 정보 표시

**대응 방안**:
```typescript
// 안전한 변환 함수
export function safeConvertToV2(product: BaseProduct): ProductV2 | null {
  try {
    const converted = convertToProductV2(product);
    return validateProductV2(converted) ? converted : null;
  } catch (error) {
    console.error('Migration failed for product:', product.id, error);
    return null;
  }
}

// 유효성 검증
function validateProductV2(product: ProductV2): boolean {
  return Boolean(
    product.id &&
    product.colorVariants?.length > 0 &&
    product.furnitureType &&
    product.exactDimensions
  );
}
```

#### 1.2 이미지 로딩 실패
**위험도**: 🟡 Medium  
**영향**: 빈 이미지 표시

**대응 방안**:
```typescript
// 폴백 이미지 시스템
const ImageWithFallback = ({ src, fallback, alt, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  
  const handleError = () => {
    setImgSrc(fallback || '/images/placeholder.jpg');
  };
  
  return <img src={imgSrc} onError={handleError} alt={alt} {...props} />;
};
```

### 2. **비즈니스 리스크**

#### 2.1 사용자 혼란
**위험도**: 🟡 Medium  
**영향**: 사용자 경험 저하

**대응 방안**:
- A/B 테스트로 점진적 도입
- 명확한 브랜딩 (V1/V2 구분)
- 사용자 피드백 수집

#### 2.2 SEO 영향
**위험도**: 🟢 Low  
**영향**: 검색 엔진 최적화

**대응 방안**:
```typescript
// 동일한 메타데이터 유지
export function generateProductMetadata(product: ProductV2) {
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [product.mainImage]
    }
  };
}
```

---

## 📈 성공 메트릭

### 1. **기술적 메트릭**
- **변환 성공률**: 99%+ (BaseProduct → ProductV2)
- **이미지 로딩 성공률**: 95%+
- **페이지 로딩 시간**: < 2.5s (LCP)
- **런타임 에러**: 0개

### 2. **비즈니스 메트릭**
- **V2 페이지 방문율**: 목표에 따라 조정
- **색상 변경 인터랙션**: 평균 2회/세션
- **상세 페이지 전환율**: V1 대비 동등 이상
- **사용자 만족도**: 4.0/5.0 이상

### 3. **모니터링 설정**
```typescript
// 분석 이벤트 설정
analytics.track('product_v2_view', {
  product_id: product.id,
  color_variants_count: product.colorVariants.length,
  migration_version: 'v2.0'
});

analytics.track('color_selection_v2', {
  product_id: product.id,
  from_color: previousColor,
  to_color: selectedColor,
  selection_time: Date.now() - startTime
});
```

---

## 🔄 롤백 계획

### 1. **즉시 롤백** (긴급 상황)
```bash
# Feature Flag로 즉시 V2 비활성화
export NEXT_PUBLIC_ENABLE_PRODUCT_V2=false
npm run build && npm run start
```

### 2. **점진적 롤백** (부분 문제)
```typescript
// 특정 기능만 비활성화
export const FEATURE_FLAGS = {
  ENABLE_PRODUCT_V2: true,
  V2_IMAGE_SYSTEM: false,    // 이미지 시스템만 롤백
  V2_COLOR_VARIANTS: true,
  V2_DETAIL_PAGE: true
};
```

### 3. **데이터 무결성 보장**
- V1 데이터는 절대 수정하지 않음
- V2 마이그레이션은 읽기 전용 변환
- 원본 데이터 항상 유지

---

## ✅ 마이그레이션 체크리스트

### 사전 준비
- [ ] 현재 시스템 백업 완료
- [ ] 테스트 환경 구성
- [ ] 모니터링 도구 설정
- [ ] 팀 교육 완료

### Phase 0 (데이터 마이그레이션)
- [ ] ProductV2 타입 정의 완료
- [ ] 변환 함수 구현 완료
- [ ] 단위 테스트 통과 (커버리지 85%+)
- [ ] 임시 이미지 시스템 동작 확인

### Phase 1 (기본 페이지)
- [ ] /products-v2 페이지 생성
- [ ] 기본 데이터 렌더링 확인
- [ ] V1 페이지 영향 없음 확인
- [ ] 라우팅 독립성 확인

### Phase 2 (색상 시스템)
- [ ] 색상 스와치 정상 동작
- [ ] 이미지 전환 부드러운 애니메이션
- [ ] 모든 색상 변형 이미지 로딩 확인
- [ ] 성능 지표 목표 달성

### Phase 3 (상세 페이지)
- [ ] 상세 페이지 완전 연동
- [ ] URL 파라미터 정상 동작
- [ ] 상태 동기화 완벽 동작
- [ ] E2E 테스트 모두 통과

### 최종 검증
- [ ] 모든 테스트 통과
- [ ] 성능 메트릭 목표 달성
- [ ] 사용자 수용 테스트 완료
- [ ] 문서화 완료

---

*📅 문서 작성일: 2025-08-28*  
*📝 마지막 업데이트: 2025-08-28*  
*🔄 다음 리뷰: Phase 0 완료 후 (2025-08-29)*