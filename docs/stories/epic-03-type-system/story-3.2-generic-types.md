# Story 3.2: Generic 타입 시스템 구축

## 📋 Story 카드
**Title**: Generic 타입 시스템 구축  
**Epic**: Type System Enhancement  
**Priority**: P1 (High)  
**Points**: 4점  
**Assignee**: TBD  
**Sprint**: TBD

## 📝 User Story
```
As a 개발자
I want 재사용 가능한 Generic 타입 시스템을 구축하여
So that 타입 안전성을 유지하면서 코드 중복을 줄일 수 있다
```

## ✅ Acceptance Criteria
- [ ] Card, Section, Hook에서 공통으로 사용할 Generic 타입들이 정의된다
- [ ] API 응답, Props, State에 대한 Generic 인터페이스가 구축된다
- [ ] 타입 추론이 올바르게 작동한다
- [ ] 기존 컴포넌트들이 새로운 Generic 타입을 활용한다
- [ ] 타입 에러 없이 컴파일된다
- [ ] IDE에서 자동완성과 타입 힌트가 정상 작동한다

## 🔧 세분화된 Technical Tasks (4점)

### Task 1: 기본 Generic 타입 인프라 구축 (1점)
- [ ] Generic Props 인터페이스 정의
  ```typescript
  interface BaseProps<T = {}> {
    className?: string;
    children?: React.ReactNode;
    data?: T;
    onAction?: (data: T) => void;
  }
  ```
- [ ] Generic Component 타입 정의
- [ ] Generic Hook 타입 정의
- [ ] 유틸리티 타입 정의 (Partial, Pick, Omit 확장)

### Task 2: API 및 데이터 Generic 타입 (1점)
- [ ] API 응답 Generic 인터페이스
  ```typescript
  interface ApiResponse<T> {
    data: T;
    status: 'success' | 'error';
    message?: string;
    pagination?: PaginationInfo;
  }
  ```
- [ ] Product 관련 Generic 타입
- [ ] 리스트/그리드 Generic 타입
- [ ] 폼 데이터 Generic 타입

### Task 3: 컴포넌트별 Generic 타입 적용 (1.5점)
- [ ] Card 컴포넌트들에 Generic 적용
  ```typescript
  interface CardProps<T> extends BaseProps<T> {
    title: string;
    data: T;
    renderContent: (data: T) => React.ReactNode;
  }
  ```
- [ ] Section 컴포넌트들에 Generic 적용
- [ ] Layout 컴포넌트에 Generic 적용
- [ ] UI 컴포넌트들에 Generic 적용

### Task 4: Hook Generic 타입 및 최적화 (0.5점)
- [ ] Custom Hook Generic 인터페이스
- [ ] State 관리 Generic 타입
- [ ] 이벤트 핸들러 Generic 타입
- [ ] 타입 추론 최적화 및 검증

## 🏗️ Implementation Details

### 기본 Generic 타입 구조

#### `src/types/generics.ts`
```typescript
// 기본 Generic Props
export interface BaseProps<T = any> {
  className?: string;
  children?: React.ReactNode;
  data?: T;
  testId?: string;
}

// 액션 가능한 컴포넌트
export interface ActionableProps<T = any> extends BaseProps<T> {
  onAction?: (data: T) => void;
  onSelect?: (item: T) => void;
  disabled?: boolean;
}

// 리스트 컴포넌트
export interface ListProps<T = any> extends BaseProps<T[]> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor?: (item: T, index: number) => string | number;
  emptyText?: string;
}

// 폼 컴포넌트
export interface FormProps<T = any> extends BaseProps<T> {
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  validation?: (values: T) => Record<keyof T, string | undefined>;
}

// API 응답
export interface ApiResponse<T = any> {
  data: T;
  status: 'success' | 'error' | 'loading';
  message?: string;
  errors?: Record<string, string>;
}

// 페이지네이션
export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

### Product 관련 Generic 타입

#### `src/types/product.ts`
```typescript
import { BaseProps, ActionableProps } from './generics';

// 기본 Product 인터페이스
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

// 색상 변경 가능한 Product
export interface ColorChangeableProduct extends Product {
  colors: Array<{
    name: string;
    value: string;
    image: string;
  }>;
  selectedColor?: string;
}

// Category
export interface Category {
  id: string;
  name: string;
  image: string;
  productCount?: number;
}

// Product Card Generic Props
export interface ProductCardProps<T extends Product = Product> 
  extends ActionableProps<T> {
  product: T;
  showPrice?: boolean;
  showDescription?: boolean;
  imageSize?: 'sm' | 'md' | 'lg';
}

// Product Grid Generic Props
export interface ProductGridProps<T extends Product = Product> 
  extends BaseProps<T[]> {
  products: T[];
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  renderCard?: (product: T) => React.ReactNode;
}
```

### Hook Generic 타입

#### `src/types/hooks.ts`
```typescript
// 기본 Hook 상태
export interface HookState<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// API Hook 반환 타입
export interface ApiHookReturn<T = any> extends HookState<T> {
  refetch: () => Promise<void>;
  reset: () => void;
}

// Form Hook 반환 타입
export interface FormHookReturn<T = any> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  handleChange: (field: keyof T) => (value: any) => void;
  handleSubmit: () => Promise<void>;
  reset: () => void;
  isValid: boolean;
  isSubmitting: boolean;
}

// Toggle Hook 반환 타입
export interface ToggleHookReturn {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}
```

### 컴포넌트별 Generic 적용

#### Card 컴포넌트 Generic 적용
```typescript
// src/components/cards/ProductCard.tsx
interface ProductCardProps<T extends Product = Product> 
  extends ProductCardProps<T> {
  // 추가 props
}

export default function ProductCard<T extends Product = Product>({
  product,
  onAction,
  showPrice = true,
  showDescription = false,
  ...props
}: ProductCardProps<T>) {
  const handleClick = () => {
    onAction?.(product);
  };

  return (
    // 구현
  );
}
```

#### Section 컴포넌트 Generic 적용  
```typescript
// src/components/sections/ProductGrid.tsx
interface ProductGridProps<T extends Product = Product> 
  extends ProductGridProps<T> {
  // 추가 props
}

export default function ProductGrid<T extends Product = Product>({
  products,
  columns = 3,
  renderCard,
  ...props
}: ProductGridProps<T>) {
  return (
    <div className={`grid grid-cols-${columns} gap-4`}>
      {products.map((product, index) => (
        renderCard ? renderCard(product) : (
          <ProductCard key={product.id} product={product} />
        )
      ))}
    </div>
  );
}
```

## 🧪 Testing Strategy

### Generic 타입 테스트
```typescript
// src/types/__tests__/generics.test.ts
describe('Generic Types', () => {
  test('BaseProps 인터페이스가 올바르게 확장된다', () => {
    interface TestProps extends BaseProps<string> {
      title: string;
    }
    
    const props: TestProps = {
      title: 'Test',
      data: 'test data',
      className: 'test-class'
    };
    
    expect(props.data).toBe('test data');
  });

  test('ApiResponse 타입이 올바르게 추론된다', () => {
    const response: ApiResponse<Product[]> = {
      data: [{ id: '1', name: 'Test', price: 100, image: 'test.jpg' }],
      status: 'success'
    };
    
    // TypeScript 컴파일 시점에서 타입 검증
    expect(response.data[0].name).toBe('Test');
  });
});
```

### 컴포넌트 Generic 테스트
```typescript
// src/components/__tests__/generic-components.test.tsx
describe('Generic Components', () => {
  test('ProductCard가 Generic 타입과 함께 작동한다', () => {
    const mockProduct: ColorChangeableProduct = {
      id: '1',
      name: 'Test Product',
      price: 100,
      image: 'test.jpg',
      colors: [{ name: 'Red', value: '#ff0000', image: 'red.jpg' }]
    };

    render(
      <ProductCard<ColorChangeableProduct>
        product={mockProduct}
        onAction={(product) => {
          // 타입이 올바르게 추론되는지 확인
          expect(product.colors).toBeDefined();
        }}
      />
    );
  });
});
```

## 📊 Definition of Done Checklist
- [ ] 모든 기본 Generic 타입 인터페이스 정의 완료
- [ ] Product, Category 관련 Generic 타입 완성
- [ ] API 응답 Generic 타입 구축 완료
- [ ] Hook Generic 타입 정의 완료
- [ ] 주요 컴포넌트들에 Generic 타입 적용
- [ ] TypeScript 컴파일 에러 없음
- [ ] 타입 추론이 올바르게 작동 확인
- [ ] IDE 자동완성 및 타입 힌트 정상 작동
- [ ] Generic 타입 테스트 통과

## 🚨 Potential Blockers & Mitigations

### Blocker 1: 복잡한 Generic 타입으로 인한 컴파일 성능 저하
**Risk**: 너무 복잡한 Generic 구조로 TypeScript 컴파일 시간 증가  
**Mitigation**: 단순하고 직관적인 Generic 구조 설계, 필요 시 타입 분할

### Blocker 2: 기존 코드와의 호환성 문제
**Risk**: 기존 컴포넌트들이 새로운 Generic 타입과 충돌  
**Mitigation**: 점진적 적용, 기본값 제공으로 backward compatibility 확보

### Blocker 3: 타입 추론 실패
**Risk**: 복잡한 Generic에서 타입 추론이 올바르게 작동하지 않을 수 있음  
**Mitigation**: 명시적 타입 제공 옵션, 타입 가드 함수 활용

## 🔗 Related Stories
- **Depends on**: Story 3.1 (타입 정의 중앙화) ✅ 필수
- **Blocks**: Story 3.3 (Strict TypeScript 설정)
- **Related**: Epic 4 (Custom Hooks에서 Generic 활용)

## 📝 Generic 타입 사용 가이드라인

### 기본 사용법
```typescript
// 1. 기본 Generic 컴포넌트
<ProductCard<Product> product={product} />

// 2. 확장된 타입과 함께
<ProductCard<ColorChangeableProduct> product={colorProduct} />

// 3. API Hook과 함께
const { data, loading } = useApi<Product[]>('/api/products');

// 4. Form과 함께
const form = useForm<ProductFormData>({
  initialValues: { name: '', price: 0 }
});
```

### 권장 사항
- Generic 타입은 최대 2-3개의 타입 파라미터까지만 사용
- 복잡한 Generic은 유틸리티 타입으로 분할
- 기본값 제공으로 사용성 향상
- 타입 제약조건(constraints) 적극 활용

---

*작성일: 2025-01-28*  
*최종 수정일: 2025-01-28*