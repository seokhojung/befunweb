# Story 3.1: 타입 정의 중앙화

## 📝 Story 정보
- **Epic**: Epic 3 - Type System Enhancement
- **포인트**: 7점
- **상태**: 📝 To Do
- **예상 소요시간**: 2일
- **우선순위**: High (타입 시스템의 기반)

## 🎯 Story 목표
분산된 TypeScript 타입 정의들을 중앙의 types 폴더로 통합하여 일관성과 재사용성 확보

## 👤 사용자 스토리
**As a** 개발자  
**I want** 모든 타입 정의가 중앙에서 관리되어  
**So that** 타입 중복을 제거하고 일관된 타입 인터페이스를 사용할 수 있다

## 🔍 현재 상황 분석

### 분산된 타입 정의 현황

#### ProductCard.tsx의 타입들
```typescript
// src/components/ProductCard.tsx
interface Product {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}
```

#### ColorChangeableProductCard.tsx의 타입들
```typescript
// src/components/ColorChangeableProductCard.tsx
interface ColorOption {
  id: string;
  name: string;
  hexCode: string;
  imageUrl: string;
}

interface ColorChangeableProduct {
  id: string;
  name: string;
  slug: string;
  colors: ColorOption[];
  defaultColorId: string;
  price: number;
}

interface ColorChangeableProductCardProps {
  product: ColorChangeableProduct;
  className?: string;
}
```

#### CategoryCard.tsx의 타입들
```typescript
// src/components/CategoryCard.tsx
interface Category {
  id: string;
  name: string;
  imageUrl: string;
  productCount: number;
}

interface CategoryCardProps {
  category: Category;
  className?: string;
}
```

#### Header.tsx의 타입들
```typescript
// src/components/Header.tsx
interface NavItem {
  name: string;
  href: string;
}
```

### 문제점 분석
1. **중복된 기본 속성들**: `id`, `name`, `slug`, `imageUrl` 등이 여러 곳에서 반복
2. **일관성 부족**: 같은 의미의 속성이 다른 타입으로 정의됨
3. **확장 어려움**: 새로운 속성 추가 시 여러 곳을 수정해야 함
4. **Import 복잡성**: 타입이 필요한 곳마다 다른 경로에서 import

## 🏗️ 중앙화된 타입 구조 설계

### 타입 폴더 구조
```
src/types/
├── index.ts              # 메인 export
├── common.ts             # 공통 기본 타입
├── products.ts           # 제품 관련 타입
├── categories.ts         # 카테고리 관련 타입
├── components.ts         # 컴포넌트 Props 타입
├── navigation.ts         # 네비게이션 관련 타입
└── api.ts               # API 응답 타입 (향후 추가)
```

### 중앙화된 타입 정의

#### `src/types/common.ts`
```typescript
// 기본 엔티티 인터페이스
export interface BaseEntity {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// 이름을 가진 엔티티
export interface NamedEntity extends BaseEntity {
  name: string;
  slug?: string;
}

// 이미지를 가진 엔티티
export interface ImageEntity {
  imageUrl: string;
  alt?: string;
}

// 가격 정보
export interface PricedEntity {
  price: number;
  currency?: string;
  originalPrice?: number;
}

// 기본 컴포넌트 Props
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// 선택 가능한 아이템
export interface SelectableItem<T> {
  item: T;
  onSelect?: (item: T) => void;
}
```

#### `src/types/products.ts`
```typescript
import { BaseEntity, NamedEntity, ImageEntity, PricedEntity } from './common';

// 색상 옵션
export interface ColorOption extends BaseEntity, NamedEntity, ImageEntity {
  hexCode: string;
  isDefault?: boolean;
}

// 기본 제품 타입
export interface BaseProduct extends NamedEntity, ImageEntity, PricedEntity {
  description: string;
  category: string;
  tags?: string[];
  isAvailable?: boolean;
}

// 색상 변경 가능한 제품
export interface ColorChangeableProduct extends BaseProduct {
  colors: ColorOption[];
  defaultColorId: string;
}

// 제품 타입 유니온
export type Product = BaseProduct | ColorChangeableProduct;

// 타입 가드 함수들
export function isColorChangeableProduct(product: Product): product is ColorChangeableProduct {
  return 'colors' in product && Array.isArray(product.colors);
}

export function hasColors(product: Product): product is ColorChangeableProduct {
  return isColorChangeableProduct(product);
}
```

#### `src/types/categories.ts`
```typescript
import { NamedEntity, ImageEntity } from './common';

// 카테고리 타입
export interface Category extends NamedEntity, ImageEntity {
  description?: string;
  productCount: number;
  isActive?: boolean;
  parentCategoryId?: string;
}

// 카테고리 계층 구조
export interface CategoryHierarchy extends Category {
  children?: CategoryHierarchy[];
  level: number;
}
```

#### `src/types/components.ts`
```typescript
import { ComponentProps, SelectableItem } from './common';
import { BaseProduct, ColorChangeableProduct, Product } from './products';
import { Category } from './categories';

// 제품 카드 Props
export interface ProductCardProps extends ComponentProps, SelectableItem<BaseProduct> {
  product: BaseProduct;
  showPrice?: boolean;
  size?: 'small' | 'medium' | 'large';
}

// 색상 변경 가능한 제품 카드 Props
export interface ColorChangeableProductCardProps extends ComponentProps, SelectableItem<ColorChangeableProduct> {
  product: ColorChangeableProduct;
  showColorSelector?: boolean;
  defaultSelectedColorId?: string;
  onColorChange?: (colorId: string) => void;
}

// 카테고리 카드 Props
export interface CategoryCardProps extends ComponentProps, SelectableItem<Category> {
  category: Category;
  showProductCount?: boolean;
  layout?: 'horizontal' | 'vertical';
}

// 카드 Props 유니온 타입
export type CardProps = ProductCardProps | ColorChangeableProductCardProps | CategoryCardProps;

// Generic 카드 Props
export type GenericCardProps<T> = ComponentProps & SelectableItem<T> & {
  data: T;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'outlined' | 'elevated';
};
```

#### `src/types/navigation.ts`
```typescript
import { BaseEntity } from './common';

// 네비게이션 아이템
export interface NavItem extends BaseEntity {
  name: string;
  href: string;
  isExternal?: boolean;
  icon?: string;
  badge?: string;
  isActive?: boolean;
}

// 메뉴 구조
export interface MenuItem extends NavItem {
  children?: MenuItem[];
  level: number;
}

// 네비게이션 Props
export interface NavigationProps {
  items: NavItem[];
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'pills' | 'underline';
}
```

#### `src/types/index.ts`
```typescript
// Common types
export * from './common';

// Domain types
export * from './products';
export * from './categories';
export * from './navigation';

// Component types
export * from './components';

// API types (향후 추가 예정)
// export * from './api';

// 전역으로 자주 사용되는 타입들의 별칭
export type {
  BaseProduct,
  ColorChangeableProduct,
  Product,
  Category,
  NavItem,
  ComponentProps,
} from './products';
```

## ✅ 수행 작업 (Acceptance Criteria)

### 1. 타입 폴더 구조 생성
- [ ] `src/types/` 폴더 생성
- [ ] 각 도메인별 타입 파일 생성
- [ ] 메인 index.ts 파일 생성

### 2. 기본 타입 정의
- [ ] `common.ts`에 재사용 가능한 기본 타입들 정의
- [ ] Generic 타입과 유틸리티 타입 설계
- [ ] 컴포넌트 Props 기본 인터페이스 정의

### 3. 도메인별 타입 정의
- [ ] 제품 관련 타입들 중앙화
- [ ] 카테고리 관련 타입들 중앙화
- [ ] 네비게이션 관련 타입들 중앙화

### 4. 타입 가드 함수 작성
- [ ] 런타임 타입 체크를 위한 타입 가드 함수들
- [ ] 유니온 타입 구분을 위한 헬퍼 함수들

### 5. 기존 코드와의 호환성 확보
- [ ] 기존 컴포넌트에서 사용하던 타입과 호환되도록 설계
- [ ] 점진적 마이그레이션 가능하도록 별칭 타입 제공

## 🔧 구현 상세사항

### 타입 설계 원칙

#### 1. 합성(Composition) 우선
```typescript
// ❌ 상속 기반 (권장하지 않음)
interface ColorProduct extends Product {
  colors: ColorOption[];
}

// ✅ 합성 기반 (권장)
interface ColorChangeableProduct extends BaseProduct {
  colors: ColorOption[];
}
```

#### 2. Generic 활용
```typescript
// 재사용 가능한 Generic 타입
export type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
};
```

#### 3. 타입 안전성 보장
```typescript
// 런타임 타입 체크
export function isColorChangeableProduct(product: any): product is ColorChangeableProduct {
  return (
    typeof product === 'object' &&
    product !== null &&
    'colors' in product &&
    Array.isArray(product.colors) &&
    'defaultColorId' in product &&
    typeof product.defaultColorId === 'string'
  );
}
```

### Import/Export 전략

#### 컴포넌트에서의 사용
```typescript
// Before: 각 컴포넌트에서 로컬 타입 정의
// ProductCard.tsx
interface Product { ... }

// After: 중앙 타입 import
import { BaseProduct, ProductCardProps } from '@/types';

export default function ProductCard({ product, ...props }: ProductCardProps) {
  // ...
}
```

#### 배럴 export 활용
```typescript
// types/index.ts
export * from './common';
export * from './products';
export * from './categories';

// 자주 사용되는 타입들의 직접 export
export type {
  Product,
  Category,
  ComponentProps,
} from './products';
```

## 📊 마이그레이션 계획

### Phase 1: 중앙 타입 생성 (Day 1)
1. 기존 타입들 분석 및 카테고리화
2. types 폴더 및 기본 파일 생성
3. 공통 타입들 먼저 정의

### Phase 2: 도메인별 타입 완성 (Day 1-2)
1. 제품 관련 타입들 통합
2. 카테고리 타입들 정의
3. 컴포넌트 Props 타입들 정리

### Phase 3: 호환성 및 검증 (Day 2)
1. 기존 컴포넌트와의 호환성 확인
2. 타입 가드 함수 테스트
3. TypeScript 컴파일 오류 해결

## 🧪 검증 방법

### 타입 정확성 검증
```typescript
// types/__tests__/type-tests.ts
import { expectType, expectError } from 'tsd';
import { BaseProduct, ColorChangeableProduct, isColorChangeableProduct } from '../products';

// 타입이 올바르게 정의되었는지 검증
expectType<BaseProduct>({
  id: '1',
  name: 'Product',
  slug: 'product',
  imageUrl: '/image.jpg',
  price: 100,
  description: 'Description',
  category: 'furniture',
});

// 타입 가드 함수 검증
declare const product: BaseProduct | ColorChangeableProduct;
if (isColorChangeableProduct(product)) {
  expectType<ColorChangeableProduct>(product);
  expectType<string>(product.defaultColorId); // 타입 좁히기 확인
}
```

### 컴파일 시간 검증
```bash
# 타입 정의가 컴파일 에러 없이 작동하는지 확인
npx tsc --noEmit --project tsconfig.json

# 타입 커버리지 확인 (typescript-coverage-report 사용)
npx typescript-coverage-report
```

## 🚨 리스크 및 대응방안

### High Risk: 기존 코드 호환성
- **문제**: 기존 컴포넌트에서 사용하던 로컬 타입과 충돌
- **대응**: 점진적 마이그레이션을 위한 타입 별칭 제공

### Medium Risk: 순환 참조
- **문제**: 타입 파일들 간의 순환 import 발생 가능
- **대응**: 의존성 그래프 분석 및 계층적 구조 설계

### Low Risk: 타입 복잡도
- **문제**: Generic 타입이 너무 복잡해질 수 있음
- **대응**: 적절한 추상화 레벨 유지 및 문서화

## 📋 체크리스트

### 사전 준비
- [ ] 기존 모든 타입 정의 수집 및 분류
- [ ] 중복 타입들 식별
- [ ] 타입 간 의존 관계 분석

### 구현
- [ ] types 폴더 구조 생성
- [ ] 공통 타입들 정의
- [ ] 도메인별 타입들 정의
- [ ] 타입 가드 함수 작성
- [ ] Export 구조 설정

### 검증
- [ ] TypeScript 컴파일 성공
- [ ] 타입 가드 함수 테스트
- [ ] 기존 컴포넌트와의 호환성 확인
- [ ] 성능 영향 검증

## 🎯 완료 기준 (Definition of Done)

- [ ] 모든 중복 타입이 중앙 타입으로 통합됨
- [ ] 타입 가드 함수가 올바르게 동작함
- [ ] TypeScript strict 모드에서 컴파일 성공
- [ ] 기존 컴포넌트들이 새로운 타입으로 정상 동작
- [ ] 타입 커버리지 95% 이상 달성
- [ ] 타입 문서화 완료

## 🔗 다음 Story 연결점

이 Story 완료 후:
- **Story 3.2**: Generic 타입 시스템으로 확장
- **Story 3.3**: TypeScript Strict 모드 적용

---

**담당자**: TBD  
**생성일**: 2025-01-28  
**마지막 업데이트**: 2025-01-28