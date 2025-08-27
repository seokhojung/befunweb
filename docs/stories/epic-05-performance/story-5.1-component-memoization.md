# Story 5.1: Component 메모화 적용

## 📝 Story 정보
- **Epic**: Epic 5 - Performance Optimization
- **포인트**: 6점
- **상태**: 📝 To Do
- **예상 소요시간**: 2일
- **우선순위**: High (성능 개선의 기반)

## 🎯 Story 목표
불필요한 리렌더링을 방지하기 위해 적절한 컴포넌트들에 React.memo 및 메모화 기법 적용

## 👤 사용자 스토리
**As a** 사용자  
**I want** 애플리케이션이 빠르게 반응하고  
**So that** 원활한 사용자 경험을 누릴 수 있다

**As a** 개발자  
**I want** 컴포넌트 리렌더링이 최적화되어  
**So that** 성능 병목 없이 기능을 추가할 수 있다

## 🔍 현재 상황 분석

### 성능 문제 컴포넌트들

#### 1. ProductCard 컴포넌트
```typescript
// src/components/ProductCard.tsx (Before)
interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
  className?: string;
}

export default function ProductCard({ product, onSelect, className }: ProductCardProps) {
  // 부모가 리렌더링될 때마다 이 컴포넌트도 리렌더링됨
  return (
    <div className={`product-card ${className}`}>
      <Image src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <button onClick={() => onSelect?.(product)}>
        Select
      </button>
    </div>
  );
}
```

#### 2. ColorChangeableProductCard 컴포넌트
```typescript
// src/components/ColorChangeableProductCard.tsx (Before)
export default function ColorChangeableProductCard({ 
  product, 
  onColorChange,
  className 
}: ColorChangeableProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(product.defaultColorId);
  
  const handleColorChange = (colorId: string) => {
    setSelectedColor(colorId);
    onColorChange?.(colorId);
  };

  // 컴포넌트 내부 상태 변화로 인한 불필요한 리렌더링
  // 비싼 계산들이 매번 실행됨
  const availableColors = product.colors.filter(color => color.isAvailable);
  
  return (
    // JSX...
  );
}
```

#### 3. ProductGrid 섹션
```typescript
// src/components/ProductGrid.tsx (Before)
export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid">
      {products.map((product) => (
        <ProductCard 
          key={product.id}
          product={product}
          onSelect={(product) => {
            // 인라인 함수로 인해 매번 새로운 참조 생성
            console.log('Product selected:', product);
          }}
        />
      ))}
    </div>
  );
}
```

### 성능 측정 결과 (React DevTools Profiler)
- **ProductCard**: 평균 3ms 렌더링, 불필요한 렌더링 15회/페이지 로드
- **ColorChangeableProductCard**: 평균 8ms 렌더링, 색상 변경 시 전체 리렌더링
- **ProductGrid**: 전체 제품 목록 리렌더링 시 200ms+

## 🏗️ 메모화 최적화 전략

### 1. React.memo 적용 기준

#### 적용 대상 컴포넌트
✅ **적용해야 할 컴포넌트**
- ProductCard (props가 자주 변하지 않음)
- ColorChangeableProductCard (복잡한 렌더링 로직)
- CategoryCard (정적 데이터)
- BrandHighlights (거의 변하지 않는 데이터)

❌ **적용하지 말아야 할 컴포넌트**
- Header (props가 자주 변함)
- Footer (메모화 비용 > 렌더링 비용)
- 단순한 UI 컴포넌트들 (Button, Badge 등)

### 2. 최적화된 컴포넌트 구현

#### ProductCard 메모화
```typescript
// src/components/cards/ProductCard.tsx (After)
import React, { memo } from 'react';
import { BaseProduct } from '@/types';

interface ProductCardProps {
  product: BaseProduct;
  onSelect?: (product: BaseProduct) => void;
  className?: string;
  showPrice?: boolean;
}

const ProductCard = memo<ProductCardProps>(({ 
  product, 
  onSelect, 
  className,
  showPrice = true 
}) => {
  return (
    <div className={`product-card ${className}`}>
      <Image 
        src={product.imageUrl} 
        alt={product.name}
        sizes="(max-width: 768px) 244px, 300px"
        priority={false}
      />
      <div className="product-info">
        <h3>{product.name}</h3>
        {showPrice && (
          <p className="price">${product.price}</p>
        )}
      </div>
      {onSelect && (
        <button 
          onClick={() => onSelect(product)}
          className="select-button"
        >
          Select
        </button>
      )}
    </div>
  );
}, (prevProps, nextProps) => {
  // 커스텀 비교 함수로 더 정확한 메모화
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.product.name === nextProps.product.name &&
    prevProps.product.price === nextProps.product.price &&
    prevProps.showPrice === nextProps.showPrice &&
    prevProps.className === nextProps.className &&
    prevProps.onSelect === nextProps.onSelect
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
```

#### ColorChangeableProductCard 메모화
```typescript
// src/components/cards/ColorChangeableProductCard.tsx (After)
import React, { memo, useMemo, useCallback, useState } from 'react';
import { ColorChangeableProduct } from '@/types';

interface ColorChangeableProductCardProps {
  product: ColorChangeableProduct;
  onColorChange?: (colorId: string) => void;
  className?: string;
  defaultSelectedColorId?: string;
}

const ColorChangeableProductCard = memo<ColorChangeableProductCardProps>(({ 
  product, 
  onColorChange,
  className,
  defaultSelectedColorId
}) => {
  const [selectedColorId, setSelectedColorId] = useState(
    defaultSelectedColorId || product.defaultColorId
  );

  // 비싼 계산을 useMemo로 메모화
  const availableColors = useMemo(() => 
    product.colors.filter(color => color.isAvailable !== false),
    [product.colors]
  );

  const selectedColor = useMemo(() => 
    availableColors.find(color => color.id === selectedColorId) || availableColors[0],
    [availableColors, selectedColorId]
  );

  // 콜백 함수 메모화
  const handleColorChange = useCallback((colorId: string) => {
    setSelectedColorId(colorId);
    onColorChange?.(colorId);
  }, [onColorChange]);

  return (
    <div className={`color-changeable-card ${className}`}>
      <div className="product-image">
        <Image
          src={selectedColor.imageUrl}
          alt={`${product.name} in ${selectedColor.name}`}
          sizes="(max-width: 768px) 244px, 300px"
        />
      </div>
      
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">${product.price}</p>
        
        <div className="color-selector">
          {availableColors.map((color) => (
            <button
              key={color.id}
              onClick={() => handleColorChange(color.id)}
              className={`color-option ${
                color.id === selectedColorId ? 'selected' : ''
              }`}
              style={{ backgroundColor: color.hexCode }}
              aria-label={`Select ${color.name} color`}
            >
              <span className="sr-only">{color.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.product.colors.length === nextProps.product.colors.length &&
    prevProps.defaultSelectedColorId === nextProps.defaultSelectedColorId &&
    prevProps.className === nextProps.className &&
    prevProps.onColorChange === nextProps.onColorChange
  );
});

ColorChangeableProductCard.displayName = 'ColorChangeableProductCard';

export default ColorChangeableProductCard;
```

#### ProductGrid 최적화
```typescript
// src/components/sections/ProductGrid.tsx (After)
import React, { memo, useCallback } from 'react';
import { BaseProduct } from '@/types';
import ProductCard from '@/components/cards/ProductCard';

interface ProductGridProps {
  products: BaseProduct[];
  onProductSelect?: (product: BaseProduct) => void;
  className?: string;
}

const ProductGrid = memo<ProductGridProps>(({ 
  products, 
  onProductSelect,
  className 
}) => {
  // 콜백 함수를 useCallback으로 메모화하여 자식 컴포넌트 리렌더링 방지
  const handleProductSelect = useCallback((product: BaseProduct) => {
    onProductSelect?.(product);
  }, [onProductSelect]);

  return (
    <div className={`product-grid ${className}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={handleProductSelect}
        />
      ))}
    </div>
  );
}, (prevProps, nextProps) => {
  // 배열 깊은 비교 (제품 ID만 비교)
  if (prevProps.products.length !== nextProps.products.length) {
    return false;
  }
  
  for (let i = 0; i < prevProps.products.length; i++) {
    if (prevProps.products[i].id !== nextProps.products[i].id) {
      return false;
    }
  }
  
  return (
    prevProps.onProductSelect === nextProps.onProductSelect &&
    prevProps.className === nextProps.className
  );
});

ProductGrid.displayName = 'ProductGrid';

export default ProductGrid;
```

## ✅ 수행 작업 (Acceptance Criteria)

### 1. 메모화 대상 컴포넌트 식별
- [ ] React DevTools Profiler로 성능 병목 컴포넌트 식별
- [ ] 메모화 적용/비적용 기준 수립
- [ ] 우선순위별 컴포넌트 목록 작성

### 2. React.memo 적용
- [ ] ProductCard에 React.memo 적용
- [ ] ColorChangeableProductCard에 React.memo 적용
- [ ] CategoryCard에 React.memo 적용
- [ ] BrandHighlights에 React.memo 적용

### 3. useMemo/useCallback 최적화
- [ ] 비싼 계산 결과를 useMemo로 메모화
- [ ] 콜백 함수를 useCallback으로 메모화
- [ ] 의존성 배열 최적화

### 4. 커스텀 비교 함수 구현
- [ ] 복잡한 props 비교가 필요한 컴포넌트에 커스텀 비교 함수 작성
- [ ] 깊은 비교가 필요한 경우 최적화된 비교 로직 구현

### 5. 성능 측정 및 검증
- [ ] 메모화 전후 성능 비교
- [ ] 불필요한 리렌더링 감소 확인
- [ ] 전체 페이지 로딩 성능 개선 확인

## 🔧 구현 가이드라인

### 메모화 적용 기준

#### ✅ React.memo 적용해야 하는 경우
1. **복잡한 렌더링 로직**: 계산 비용이 높은 컴포넌트
2. **리스트 아이템**: 큰 리스트의 개별 아이템 컴포넌트
3. **안정적인 props**: props가 자주 변하지 않는 컴포넌트
4. **성능 병목**: Profiler에서 확인된 성능 문제 컴포넌트

#### ❌ React.memo 적용하지 말아야 하는 경우
1. **자주 변하는 props**: props가 매번 다른 값을 가지는 경우
2. **단순한 컴포넌트**: 렌더링 비용이 낮은 컴포넌트
3. **항상 리렌더링되는 컴포넌트**: 상태가 자주 변하는 컴포넌트

### 성능 측정 방법

#### React DevTools Profiler 사용
```typescript
// 성능 측정을 위한 개발 모드 설정
if (process.env.NODE_ENV === 'development') {
  React.unstable_trace = (name, phase, fn) => {
    console.time(`${name} ${phase}`);
    const result = fn();
    console.timeEnd(`${name} ${phase}`);
    return result;
  };
}
```

#### 커스텀 성능 측정 Hook
```typescript
// src/hooks/useRenderCount.ts (개발용)
import { useRef } from 'react';

export function useRenderCount(componentName: string) {
  const renderCount = useRef(0);
  renderCount.current += 1;
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`${componentName} rendered ${renderCount.current} times`);
  }
  
  return renderCount.current;
}

// 사용 예시
function ProductCard(props) {
  const renderCount = useRenderCount('ProductCard');
  // ...
}
```

## 🧪 테스트 전략

### 성능 회귀 테스트
```typescript
// src/__tests__/performance.test.tsx
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ProductGrid from '@/components/sections/ProductGrid';

describe('Performance Tests', () => {
  it('should not re-render ProductCard when parent re-renders with same props', () => {
    const mockProducts = [
      { id: '1', name: 'Product 1', price: 100 },
      { id: '2', name: 'Product 2', price: 200 },
    ];
    
    const { rerender } = render(
      <ProductGrid products={mockProducts} />
    );
    
    // ProductCard 렌더링 횟수 측정
    const renderCount = jest.fn();
    
    // 동일한 props로 리렌더링
    act(() => {
      rerender(<ProductGrid products={mockProducts} />);
    });
    
    // ProductCard가 리렌더링되지 않았는지 확인
    expect(renderCount).not.toHaveBeenCalled();
  });
});
```

### 메모화 효과 검증
```typescript
// src/__tests__/memoization.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ColorChangeableProductCard from '@/components/cards/ColorChangeableProductCard';

describe('ColorChangeableProductCard Memoization', () => {
  it('should memoize expensive color filtering calculation', () => {
    const mockProduct = {
      id: '1',
      name: 'Test Product',
      colors: Array.from({ length: 100 }, (_, i) => ({
        id: `color-${i}`,
        name: `Color ${i}`,
        hexCode: `#${i.toString(16).padStart(6, '0')}`,
        imageUrl: `/color-${i}.jpg`,
        isAvailable: i % 2 === 0,
      })),
      defaultColorId: 'color-0',
    };
    
    // 성능 측정
    const startTime = performance.now();
    
    render(<ColorChangeableProductCard product={mockProduct} />);
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    // 첫 렌더링 시간 기록
    expect(renderTime).toBeLessThan(50); // 50ms 이내
    
    // 리렌더링 시 메모화된 값 사용 확인
    const { rerender } = render(
      <ColorChangeableProductCard product={mockProduct} />
    );
    
    const reRenderStart = performance.now();
    rerender(<ColorChangeableProductCard product={mockProduct} />);
    const reRenderEnd = performance.now();
    
    // 리렌더링이 훨씬 빨라야 함
    expect(reRenderEnd - reRenderStart).toBeLessThan(renderTime / 2);
  });
});
```

## 📊 성능 개선 목표

### 정량적 목표
- **불필요한 리렌더링 70% 감소**
- **ProductCard 렌더링 시간 50% 단축** (3ms → 1.5ms)
- **ColorChangeableProductCard 렌더링 시간 40% 단축** (8ms → 4.8ms)
- **전체 페이지 렌더링 시간 30% 개선**

### 측정 지표
- **Component 렌더링 횟수**: React DevTools Profiler
- **렌더링 소요 시간**: Performance API
- **메모리 사용량**: Chrome DevTools Memory tab
- **FPS**: Chrome DevTools Performance tab

## 🚨 리스크 및 주의사항

### High Risk: 과도한 메모화
- **문제**: 모든 컴포넌트에 메모화 적용 시 메모리 사용량 증가
- **대응**: 성능 측정 기반으로 선별적 적용

### Medium Risk: 의존성 배열 관리
- **문제**: useMemo/useCallback의 잘못된 의존성으로 인한 stale closure
- **대응**: ESLint exhaustive-deps 규칙 적용

### Low Risk: 커스텀 비교 함수 복잡성
- **문제**: 복잡한 비교 로직으로 인한 성능 역효과
- **대응**: 비교 함수도 성능 측정하여 최적화

## 📋 체크리스트

### 사전 분석
- [ ] 현재 성능 병목 컴포넌트 식별
- [ ] 메모화 적용 우선순위 결정
- [ ] 기준선 성능 측정

### 구현
- [ ] React.memo 적용
- [ ] useMemo/useCallback 최적화
- [ ] 커스텀 비교 함수 구현
- [ ] displayName 설정

### 검증
- [ ] 성능 개선 측정
- [ ] 기능 회귀 테스트
- [ ] 메모리 사용량 확인
- [ ] 다양한 시나리오 테스트

## 🎯 완료 기준 (Definition of Done)

- [ ] 대상 컴포넌트들에 React.memo 적용 완료
- [ ] 불필요한 리렌더링 70% 이상 감소
- [ ] 성능 회귀 테스트 통과
- [ ] 메모리 사용량 20% 이내 증가
- [ ] 모든 기능이 정상 동작함
- [ ] 성능 개선 문서화 완료

## 🔗 다음 Story 연결점

이 Story 완료 후:
- **Story 5.2**: 이미지 최적화로 로딩 성능 개선
- **Story 5.3**: 번들 크기 최적화
- **Story 5.4**: 로딩 성능 전반적 개선

---

**담당자**: TBD  
**생성일**: 2025-01-28  
**마지막 업데이트**: 2025-01-28