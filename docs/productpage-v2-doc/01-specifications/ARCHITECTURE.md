# 🏗️ BEFUN Product V2 - Component Architecture

## 📁 폴더 구조 전략

### 1. **V2 전용 구조**
```
src/
├── app/
│   ├── products/              # 기존 V1 유지
│   │   ├── page.tsx
│   │   └── [id]/
│   │       ├── page.tsx       # V1 상세 페이지
│   │       └── ProductDetailClient.tsx
│   └── products-v2/           # 새로운 V2 페이지
│       ├── page.tsx
│       ├── loading.tsx
│       ├── error.tsx
│       └── [id]/              # V2 상세 페이지 ⭐
│           ├── page.tsx       # ?color= 파라미터 지원
│           └── ProductDetailV2Client.tsx
│
├── components/
│   ├── cards/
│   │   ├── ProductCard.tsx           # 기존 V1
│   │   ├── ProductCardV2.tsx         # 새로운 V2 ⭐
│   │   └── index.ts
│   │
│   ├── ui/
│   │   ├── ImageTransition.tsx       # 이미지 전환 ⭐
│   │   ├── ColorSwatchGrid.tsx       # 색상 스와치 ⭐
│   │   ├── ProductBadge.tsx          # 배지 시스템 ⭐
│   │   ├── ConfigureButton.tsx       # Configure 버튼 ⭐
│   │   └── index.ts
│   │
│   └── sections/
│       ├── ProductGrid.tsx           # 기존 V1
│       ├── ProductGridV2.tsx         # 새로운 V2 ⭐
│       └── index.ts
│
├── types/
│   ├── products.ts            # 기존 타입
│   └── productsV2.ts          # V2 확장 타입 ⭐
│
├── hooks/
│   ├── useProductV2.ts        # V2 상품 로직 ⭐
│   ├── useColorSelection.ts   # 색상 선택 로직 ⭐
│   └── useImageTransition.ts  # 이미지 전환 로직 ⭐
│
├── data/
│   ├── products.ts            # 기존 데이터
│   ├── productsV2.ts          # V2 확장 데이터 ⭐
│   └── migration/             # 데이터 변환 ⭐
│       ├── baseToV2.ts        # BaseProduct → ProductV2
│       └── imageMapping.ts    # 임시 이미지 매핑
│
└── utils/
    ├── productV2Utils.ts      # V2 유틸리티 함수 ⭐
    └── imageUtils.ts          # 이미지 최적화 ⭐
```

---

## 🧩 컴포넌트 아키텍처

### 1. **ProductCardV2 - 메인 컴포넌트** ⚠️ **[업데이트: 데이터 연동 강화]**

```typescript
// ProductCardV2.tsx
interface ProductCardV2Props {
  product: ProductV2;
  className?: string;
  initialColorId?: string;         // 초기 선택 색상 ⭐
  onColorChange?: (productId: string, variantId: string) => void;
  onConfigureClick?: (productId: string, selectedColor?: string) => void;
  onCardClick?: (productId: string, selectedColor: string) => void; // ⭐ 상세 페이지 이동
}

// 구조:
// ├── ImageTransition (동적 이미지 전환) ⭐
// ├── ProductBadge (다중 배지 시스템)
// ├── ConfigureButton (호버 버튼)
// ├── ColorSwatchGrid (실제 썸네일 기반) ⭐
// └── ProductInfo (확장된 정보 표시) ⭐
```

### 2. **ImageTransition - 동적 이미지 시스템** ⚠️ **[업데이트: 색상 연동]**

```typescript
// ImageTransition.tsx
interface ImageTransitionProps {
  currentVariant: ColorVariantV2;  // 현재 선택된 색상 변형 ⭐
  alt: string;
  aspectRatio?: 'square' | 'auto';
  onImageLoad?: () => void;
  className?: string;
}

// 기능:
// - 색상별 메인/호버 이미지 동적 전환 ⭐
// - Smooth transition (500ms ease-in-out)
// - Scale 효과 (1.04x)
// - 이미지 프리로딩 (색상 변경 전) ⭐
// - 로딩 상태 표시 ⭐
// - 에러 처리 및 폴백 이미지 ⭐
```

### 3. **ColorSwatchGrid - 색상 스와치**

```typescript
// ColorSwatchGrid.tsx
interface ColorSwatchGridProps {
  variants: ColorVariant[];
  selectedId?: string;
  onColorSelect: (variantId: string) => void;
  maxVisible?: number;
}

// 기능:
// - 썸네일 이미지 기반 색상 표시
// - 선택 상태 체크마크
// - 스크롤 가능한 그리드
// - 반응형 크기 조정
```

### 4. **ConfigureButton - 인터랙티브 버튼**

```typescript
// ConfigureButton.tsx
interface ConfigureButtonProps {
  onConfigure: () => void;
  isVisible: boolean;
  variant?: 'desktop' | 'mobile';
}

// 기능:
// - 호버 시에만 표시 (데스크톱)
// - 항상 표시 (모바일)
// - 편집 아이콘 + 텍스트
// - 부드러운 slide-up 애니메이션
```

---

## 🔄 **데이터 마이그레이션 전략** ⚠️ **[신규 추가]**

### 1. **BaseProduct → ProductV2 변환**

```typescript
// data/migration/baseToV2.ts
export function convertToProductV2(base: BaseProduct): ProductV2 {
  const baseImagePath = `/images/temp/${base.category}`;
  
  return {
    ...base,
    // 기본 이미지 (임시)
    mainImage: base.image || `${baseImagePath}-main.jpg`,
    instagramImage: base.images?.[1] || `${baseImagePath}-hover.jpg`,
    
    // 색상 변형 생성 (variants 기반)
    colorVariants: generateColorVariants(base),
    defaultVariant: base.variants?.[0]?.id || 'default',
    
    // 메타데이터 생성
    furnitureType: generateFurnitureType(base.category),
    exactDimensions: generateDimensions(base.category),
    colorName: extractColorName(base),
    
    // 배지/라벨 생성
    badges: generateBadges(base),
    labels: generateLabels(base)
  };
}

function generateColorVariants(base: BaseProduct): ColorVariantV2[] {
  return base.variants?.map((variant, index) => ({
    id: variant.id,
    name: variant.options.color || `Color ${index + 1}`,
    thumbnail: `/images/temp/${base.category}-${variant.options.color?.toLowerCase()}-thumb.jpg`,
    mainImage: `/images/temp/${base.category}-${variant.options.color?.toLowerCase()}-main.jpg`,
    instagramImage: `/images/temp/${base.category}-${variant.options.color?.toLowerCase()}-hover.jpg`,
    isDefault: index === 0,
    sku: variant.sku,
    price: variant.price,
    availability: 'in_stock'
  })) || [];
}
```

### 2. **임시 이미지 매핑 시스템**

```typescript
// data/migration/imageMapping.ts
export const TEMP_IMAGE_MAPPING = {
  furniture: {
    colors: ['white', 'brown', 'grey', 'black'],
    patterns: {
      main: '/images/temp/{category}-{color}-main.webp',
      hover: '/images/temp/{category}-{color}-hover.webp', 
      thumbnail: '/images/temp/{category}-{color}-thumb.webp'
    }
  }
  // ... 다른 카테고리들
};

export function generateTempImages(category: string, color: string): ImageSet {
  const patterns = TEMP_IMAGE_MAPPING[category]?.patterns || TEMP_IMAGE_MAPPING.furniture.patterns;
  
  return {
    main: patterns.main.replace('{category}', category).replace('{color}', color),
    instagram: patterns.hover.replace('{category}', category).replace('{color}', color),
    thumbnail: patterns.thumbnail.replace('{category}', category).replace('{color}', color)
  };
}
```

---

## 📊 상태 관리 전략

### 1. **Local State (useState)**
```typescript
// ProductCardV2 내부
const [selectedVariant, setSelectedVariant] = useState<string>();
const [isHovered, setIsHovered] = useState(false);
const [imageLoaded, setImageLoaded] = useState(false);
```

### 2. **Custom Hooks**
```typescript
// useColorSelection.ts
export function useColorSelection(variants: ColorVariant[]) {
  const [selected, setSelected] = useState(variants[0]?.id);
  
  const selectColor = (variantId: string) => {
    setSelected(variantId);
    // Analytics tracking
    // Image preloading
  };
  
  return { selected, selectColor };
}

// useImageTransition.ts
export function useImageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const triggerTransition = () => {
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 500);
  };
  
  return { isTransitioning, triggerTransition };
}
```

---

## 🎨 스타일링 전략

### 1. **Tailwind CSS 클래스 체계**
```typescript
// 스타일 상수 분리
const CARD_STYLES = {
  container: 'flex flex-col h-full relative group/plp-product-card transition-all basic-transition hover:shadow-plp-product-card bg-white',
  imageContainer: 'relative w-full overflow-hidden aspect-square',
  imageMain: 'object-cover absolute top-0 left-0 transition-all duration-500 ease-in-out',
  imageHover: 'opacity-0 group-hover:opacity-100 group-hover:scale-100 transform scale-[1.04]',
  badge: 'semibold-12 px-8 py-2 rounded-4 absolute top-8 left-8 md:top-12 md:left-16 z-2',
  configureButton: 'absolute bottom-8 lg:bottom-16 left-1/2 -translate-x-1/2 translate-y-64 group-hover:translate-y-0'
};
```

### 2. **반응형 CSS 변수**
```css
/* globals.css 추가 */
:root {
  --swatch-size-mobile: 40px;
  --swatch-size-desktop: 54px;
  --swatch-height-mobile: 50px;
  --swatch-height-desktop: 68px;
  
  --transition-image: 500ms ease-in-out;
  --transition-button: 300ms ease-out;
}
```

---

## 🔄 데이터 흐름

### 1. **Props Drilling 최소화**
```typescript
// Context API 활용
interface ProductV2ContextValue {
  selectedVariants: Record<string, string>;
  updateVariant: (productId: string, variantId: string) => void;
  preloadImages: (images: string[]) => void;
}

export const ProductV2Provider = ({ children }: { children: ReactNode }) => {
  // 전역 상태 관리
};
```

### 2. **이벤트 처리 흐름**
```typescript
// ProductGridV2.tsx
const handleColorChange = (productId: string, variantId: string) => {
  // 1. 로컬 상태 업데이트
  updateVariant(productId, variantId);
  
  // 2. 이미지 프리로딩
  preloadVariantImages(productId, variantId);
  
  // 3. Analytics 추적
  trackColorSelection(productId, variantId);
};

const handleConfigureClick = (productId: string) => {
  // 1. 설정 페이지로 이동
  router.push(\`/configurator/\${productId}\`);
  
  // 2. Analytics 추적
  trackConfigureClick(productId);
};
```

---

## ⚡ 성능 최적화 전략

### 1. **컴포넌트 최적화**
```typescript
// ProductCardV2.tsx - React.memo 최적화
export const ProductCardV2 = React.memo(function ProductCardV2(props) {
  // 컴포넌트 로직
}, (prevProps, nextProps) => {
  // 커스텀 비교 함수
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.product.selectedVariant === nextProps.product.selectedVariant
  );
});
```

### 2. **이미지 최적화**
```typescript
// ImageTransition.tsx
const ImageTransition = ({ mainImage, hoverImage, alt }) => {
  const [mainLoaded, setMainLoaded] = useState(false);
  const [hoverPreloaded, setHoverPreloaded] = useState(false);
  
  // Intersection Observer로 lazy loading
  const { ref, inView } = useInView({ threshold: 0.1 });
  
  // 호버 이미지 프리로딩
  useEffect(() => {
    if (inView && !hoverPreloaded) {
      const img = new Image();
      img.src = hoverImage;
      img.onload = () => setHoverPreloaded(true);
    }
  }, [inView, hoverImage, hoverPreloaded]);
  
  return (
    <div ref={ref} className="relative">
      {/* 이미지 렌더링 로직 */}
    </div>
  );
};
```

### 3. **번들 사이즈 최적화**
```typescript
// 동적 import 활용
const ProductCardV2 = lazy(() => import('./ProductCardV2'));
const ColorSwatchGrid = lazy(() => import('../ui/ColorSwatchGrid'));

// 조건부 로딩
const ProductGridV2 = () => {
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ProductGrid products={products} />
    </Suspense>
  );
};
```

---

## 🧪 테스트 전략

### 1. **단위 테스트 구조**
```
tests/
├── components/
│   ├── cards/
│   │   └── ProductCardV2.test.tsx
│   └── ui/
│       ├── ImageTransition.test.tsx
│       ├── ColorSwatchGrid.test.tsx
│       └── ConfigureButton.test.tsx
├── hooks/
│   ├── useColorSelection.test.ts
│   └── useImageTransition.test.ts
└── pages/
    └── products-v2.test.tsx
```

### 2. **테스트 케이스**
```typescript
// ProductCardV2.test.tsx
describe('ProductCardV2', () => {
  test('renders product information correctly', () => {});
  test('handles color selection', () => {});
  test('shows configure button on hover', () => {});
  test('transitions images smoothly', () => {});
  test('displays badges correctly', () => {});
});
```

---

## 📋 개발 체크리스트

### Phase 1: 기반 구조
- [ ] 타입 정의 (ProductV2, ColorVariant, ProductBadge)
- [ ] 기본 폴더 구조 생성
- [ ] ProductCardV2 컴포넌트 뼈대

### Phase 2: 핵심 컴포넌트
- [ ] ImageTransition 구현
- [ ] ColorSwatchGrid 구현  
- [ ] ProductBadge 시스템
- [ ] ConfigureButton 구현

### Phase 3: 통합 및 최적화
- [ ] ProductGridV2 페이지 구성
- [ ] 반응형 디자인 완성
- [ ] 성능 최적화 적용
- [ ] 테스트 코드 작성

---

*📅 작성일: 2025-08-28*  
*📝 작성자: Claude Code*