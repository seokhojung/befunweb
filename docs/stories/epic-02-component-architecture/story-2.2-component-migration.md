# Story 2.2: 컴포넌트 파일 이동

## 📋 Story 카드
**Title**: 컴포넌트 파일 이동  
**Epic**: Component Architecture Restructuring  
**Priority**: P0 (Critical)  
**Points**: 6점  
**Assignee**: TBD  
**Sprint**: TBD

## 📝 User Story
```
As a 개발자
I want 컴포넌트들이 기능별로 정리된 폴더에 위치하여
So that 관련된 컴포넌트들을 쉽게 찾고 관리할 수 있다
```

## ✅ Acceptance Criteria
- [ ] 16개 컴포넌트가 새로운 폴더 구조로 이동된다
- [ ] 각 컴포넌트의 기능이 손상되지 않는다
- [ ] 파일 이동 후 TypeScript 컴파일이 성공한다
- [ ] 모든 index.ts 파일이 적절한 export를 제공한다
- [ ] UI 컴포넌트들의 네이밍이 PascalCase로 통일된다

## 🔧 세분화된 Technical Tasks (6점)

### Task 1: Layout Components Migration (1점)
- [ ] `Header.tsx` → `src/components/layout/Header.tsx`
- [ ] `Footer.tsx` → `src/components/layout/Footer.tsx`
- [ ] `layout/index.ts` 파일에 export 추가
```typescript
export { default as Header } from './Header';
export { default as Footer } from './Footer';
export { default as Layout } from './Layout'; // Story 1.1에서 생성
```

### Task 2: Section Components Migration (2점)
- [ ] `HeroSection.tsx` → `src/components/sections/HeroSection.tsx`
- [ ] `ProductColorSection.tsx` → `src/components/sections/ProductColorSection.tsx`
- [ ] `ProductGrid.tsx` → `src/components/sections/ProductGrid.tsx`
- [ ] `BrandHighlights.tsx` → `src/components/sections/BrandHighlights.tsx`
- [ ] `Sustainability.tsx` → `src/components/sections/Sustainability.tsx`
- [ ] `PromoBanner.tsx` → `src/components/sections/PromoBanner.tsx`
- [ ] `sections/index.ts` 파일 생성 및 export 설정

### Task 3: Card Components Migration (1점)
- [ ] `ProductCard.tsx` → `src/components/cards/ProductCard.tsx`
- [ ] `ColorChangeableProductCard.tsx` → `src/components/cards/ColorChangeableProductCard.tsx`
- [ ] `CategoryCard.tsx` → `src/components/cards/CategoryCard.tsx`
- [ ] `cards/index.ts` 파일 생성 및 export 설정

### Task 4: UI Components Cleanup (1점)
- [ ] `ui/button.tsx` → `ui/Button.tsx` (PascalCase 변경)
- [ ] `ui/card.tsx` → `ui/Card.tsx`
- [ ] `ui/badge.tsx` → `ui/Badge.tsx`
- [ ] `ui/animated-card.tsx` → `ui/AnimatedCard.tsx`
- [ ] `ui/index.ts` 파일 업데이트

### Task 5: Icons Migration & Expansion (0.5점)
- [ ] `icons/StorageIcon.tsx` 유지 (이미 적절한 위치)
- [ ] `icons/index.ts` 파일 생성
- [ ] 향후 아이콘 추가를 위한 구조 준비

### Task 6: Main Index File & Validation (0.5점)
- [ ] `src/components/index.ts` 메인 export 파일 생성
- [ ] TypeScript 컴파일 검증
- [ ] 모든 컴포넌트 import/export 테스트

## 🏗️ Implementation Details

### 파일 이동 매트릭스

| 현재 위치 | 새 위치 | 분류 | 이동 후 크기 |
|-----------|---------|------|-------------|
| `Header.tsx` | `layout/Header.tsx` | Layout | 동일 |
| `Footer.tsx` | `layout/Footer.tsx` | Layout | 동일 |
| `HeroSection.tsx` | `sections/HeroSection.tsx` | Section | 동일 |
| `ProductColorSection.tsx` | `sections/ProductColorSection.tsx` | Section | 동일 |
| `ProductGrid.tsx` | `sections/ProductGrid.tsx` | Section | 동일 |
| `BrandHighlights.tsx` | `sections/BrandHighlights.tsx` | Section | 동일 |
| `Sustainability.tsx` | `sections/Sustainability.tsx` | Section | 동일 |
| `PromoBanner.tsx` | `sections/PromoBanner.tsx` | Section | 동일 |
| `ProductCard.tsx` | `cards/ProductCard.tsx` | Card | 동일 |
| `ColorChangeableProductCard.tsx` | `cards/ColorChangeableProductCard.tsx` | Card | 동일 |
| `CategoryCard.tsx` | `cards/CategoryCard.tsx` | Card | 동일 |
| `ui/button.tsx` | `ui/Button.tsx` | UI | 네이밍만 변경 |
| `ui/card.tsx` | `ui/Card.tsx` | UI | 네이밍만 변경 |
| `ui/badge.tsx` | `ui/Badge.tsx` | UI | 네이밍만 변경 |
| `ui/animated-card.tsx` | `ui/AnimatedCard.tsx` | UI | 네이밍만 변경 |
| `icons/StorageIcon.tsx` | `icons/StorageIcon.tsx` | Icon | 변경 없음 |

### Index 파일 구조

#### `src/components/sections/index.ts`
```typescript
export { default as HeroSection } from './HeroSection';
export { default as ProductColorSection } from './ProductColorSection';
export { default as ProductGrid } from './ProductGrid';
export { default as BrandHighlights } from './BrandHighlights';
export { default as Sustainability } from './Sustainability';
export { default as PromoBanner } from './PromoBanner';

// 타입 export (있는 경우)
export type { ProductGridProps } from './ProductGrid';
export type { BrandHighlightsProps } from './BrandHighlights';
```

#### `src/components/cards/index.ts`
```typescript
export { default as ProductCard } from './ProductCard';
export { default as ColorChangeableProductCard } from './ColorChangeableProductCard';
export { default as CategoryCard } from './CategoryCard';

// 타입 export
export type { ProductCardProps } from './ProductCard';
export type { ColorChangeableProductCardProps } from './ColorChangeableProductCard';
export type { CategoryCardProps } from './CategoryCard';
```

#### `src/components/ui/index.ts`
```typescript
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Badge } from './Badge';
export { default as AnimatedCard } from './AnimatedCard';

// 타입 export
export type { ButtonProps } from './Button';
export type { CardProps } from './Card';
export type { BadgeProps } from './Badge';
export type { AnimatedCardProps } from './AnimatedCard';
```

#### `src/components/index.ts` (메인)
```typescript
// Layout components
export * from './layout';

// Section components  
export * from './sections';

// Card components
export * from './cards';

// UI components
export * from './ui';

// Icon components
export * from './icons';
```

## 🧪 Testing Strategy

### 파일 이동 검증
```bash
# 1. 폴더 구조 검증
find src/components -type f -name "*.tsx" | sort

# 2. TypeScript 컴파일 검증
npx tsc --noEmit

# 3. Export/Import 검증
node -e "
const components = require('./src/components');
console.log('Available components:', Object.keys(components));
"
```

### 컴포넌트별 기능 테스트
```typescript
describe('Component Migration Tests', () => {
  test('Layout components export correctly', () => {
    const { Header, Footer, Layout } = require('@/components/layout');
    expect(Header).toBeDefined();
    expect(Footer).toBeDefined();
    expect(Layout).toBeDefined();
  });

  test('Section components render without errors', () => {
    const { HeroSection, ProductGrid } = require('@/components/sections');
    expect(() => render(<HeroSection />)).not.toThrow();
    expect(() => render(<ProductGrid />)).not.toThrow();
  });

  test('Card components maintain functionality', () => {
    const { ProductCard, CategoryCard } = require('@/components/cards');
    expect(() => render(<ProductCard />)).not.toThrow();
    expect(() => render(<CategoryCard />)).not.toThrow();
  });
});
```

## 📊 Definition of Done Checklist
- [ ] 모든 16개 컴포넌트가 새 위치로 이동 완료
- [ ] UI 컴포넌트들의 PascalCase 네이밍 완료
- [ ] 모든 폴더에 적절한 index.ts 파일 존재
- [ ] 메인 components/index.ts 파일 생성 완료
- [ ] TypeScript 컴파일 에러 없음
- [ ] 모든 컴포넌트가 새 경로에서 import 가능
- [ ] 기존 컴포넌트 기능 손상 없음
- [ ] ESLint/Prettier 규칙 준수

## 🚨 Potential Blockers & Mitigations

### Blocker 1: 파일 이동 중 참조 경로 손실
**Risk**: Git에서 파일 이동 시 히스토리 손실 가능  
**Mitigation**: `git mv` 명령어 사용, 단계적 이동으로 추적 가능성 유지

### Blocker 2: TypeScript 타입 참조 에러
**Risk**: 컴포넌트 이동 후 타입 import 경로 에러 발생  
**Mitigation**: index.ts 파일에 타입도 함께 export, 단계별 검증

### Blocker 3: UI 컴포넌트 네이밍 변경으로 인한 충돌
**Risk**: button.tsx → Button.tsx 변경 시 케이스 센시티브 시스템에서 충돌  
**Mitigation**: 임시 이름으로 변경 후 최종 이름으로 다시 변경

## 🔗 Related Stories
- **Depends on**: Story 2.1 (폴더 구조 재설계) ✅ 필수
- **Blocks**: Story 2.3 (Import 경로 대량 업데이트) 
- **Related**: Story 2.4 (아이콘 시스템 통합)

## 📝 Migration Commands

### 파일 이동 명령어
```bash
# Layout components
git mv src/components/Header.tsx src/components/layout/
git mv src/components/Footer.tsx src/components/layout/

# Section components  
git mv src/components/HeroSection.tsx src/components/sections/
git mv src/components/ProductColorSection.tsx src/components/sections/
git mv src/components/ProductGrid.tsx src/components/sections/
git mv src/components/BrandHighlights.tsx src/components/sections/
git mv src/components/Sustainability.tsx src/components/sections/
git mv src/components/PromoBanner.tsx src/components/sections/

# Card components
git mv src/components/ProductCard.tsx src/components/cards/
git mv src/components/ColorChangeableProductCard.tsx src/components/cards/
git mv src/components/CategoryCard.tsx src/components/cards/

# UI components renaming
git mv src/components/ui/button.tsx src/components/ui/Button.tsx
git mv src/components/ui/card.tsx src/components/ui/Card.tsx
git mv src/components/ui/badge.tsx src/components/ui/Badge.tsx
git mv src/components/ui/animated-card.tsx src/components/ui/AnimatedCard.tsx
```

## 📈 Progress Tracking

### Migration Progress
- [ ] **Layout (2/3)**: Header ✅, Footer ✅, Layout (Story 1.1 대기)
- [ ] **Sections (0/6)**: HeroSection, ProductColorSection, ProductGrid, BrandHighlights, Sustainability, PromoBanner  
- [ ] **Cards (0/3)**: ProductCard, ColorChangeableProductCard, CategoryCard
- [ ] **UI (0/4)**: Button, Card, Badge, AnimatedCard
- [ ] **Icons (1/1)**: StorageIcon ✅ (이미 위치 적절)

---

*작성일: 2025-01-28*  
*최종 수정일: 2025-01-28*