# Story 2.1: 폴더 구조 재설계 및 생성

## 📝 Story 정보
- **Epic**: Epic 2 - Component Architecture Restructuring
- **포인트**: 8점
- **상태**: 📝 To Do
- **예상 소요시간**: 1.5일
- **우선순위**: Critical (Epic의 기반)

## 🎯 Story 목표
컴포넌트를 기능별/도메인별로 체계적으로 분류할 새로운 폴더 구조를 설계하고 생성

## 👤 사용자 스토리
**As a** 개발자  
**I want** 컴포넌트가 기능별로 체계적으로 정리된 폴더 구조를 가지고  
**So that** 원하는 컴포넌트를 빠르게 찾고 새 컴포넌트를 적절한 위치에 추가할 수 있다

## 🔍 현재 상황 분석

### Before (현재 구조)
```
src/components/
├── Header.tsx                    # 레이아웃 컴포넌트
├── Footer.tsx                    # 레이아웃 컴포넌트
├── ProductCard.tsx               # 카드 컴포넌트
├── ColorChangeableProductCard.tsx # 카드 컴포넌트
├── CategoryCard.tsx              # 카드 컴포넌트
├── HeroSection.tsx               # 섹션 컴포넌트
├── ProductGrid.tsx               # 섹션 컴포넌트
├── BrandHighlights.tsx           # 섹션 컴포넌트
├── Sustainability.tsx            # 섹션 컴포넌트
├── PromoBanner.tsx               # 배너 컴포넌트
├── ui/                          # UI 기본 컴포넌트
│   ├── button.tsx
│   ├── card.tsx
│   ├── badge.tsx
│   └── animated-card.tsx
└── icons/                       # 아이콘 컴포넌트
    └── StorageIcon.tsx
```

### 문제점
1. **평면적 구조**: 20개 컴포넌트가 한 폴더에 나열
2. **기능별 구분 없음**: 레이아웃, 카드, 섹션이 섞여있음
3. **확장성 부족**: 새 컴포넌트 추가 시 적절한 위치 파악 어려움
4. **네이밍 일관성 없음**: ui 폴더는 소문자, 메인 컴포넌트는 PascalCase

## 🏗️ 새로운 폴더 구조 설계

### After (목표 구조)
```
src/components/
├── layout/                      # 레이아웃 관련
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Layout.tsx              # 새로 생성
│   └── index.ts
├── sections/                    # 페이지 섹션들
│   ├── HeroSection.tsx
│   ├── ProductColorSection.tsx
│   ├── ProductGrid.tsx
│   ├── BrandHighlights.tsx
│   ├── Sustainability.tsx
│   ├── PromoBanner.tsx         # 배너도 섹션으로 분류
│   └── index.ts
├── cards/                       # 카드 컴포넌트들
│   ├── ProductCard.tsx
│   ├── ColorChangeableProductCard.tsx
│   ├── CategoryCard.tsx
│   └── index.ts
├── ui/                          # 기본 UI 컴포넌트
│   ├── Button.tsx              # 대문자로 변경
│   ├── Card.tsx                # 대문자로 변경
│   ├── Badge.tsx               # 대문자로 변경
│   ├── AnimatedCard.tsx        # 대문자로 변경
│   └── index.ts
├── icons/                       # 아이콘 컴포넌트
│   ├── StorageIcon.tsx
│   ├── MenuIcon.tsx            # 새로 생성 예정
│   ├── SearchIcon.tsx          # 새로 생성 예정
│   └── index.ts
└── index.ts                     # 전체 컴포넌트 export
```

## ✅ 수행 작업 (Acceptance Criteria)

### 1. 폴더 구조 생성
- [ ] `src/components/layout/` 폴더 생성
- [ ] `src/components/sections/` 폴더 생성
- [ ] `src/components/cards/` 폴더 생성
- [ ] 기존 `ui/` 폴더 유지 (내용 정리 예정)
- [ ] 기존 `icons/` 폴더 유지 (내용 정리 예정)

### 2. Index 파일 생성
- [ ] 각 폴더별로 `index.ts` 파일 생성
- [ ] 깔끔한 export 구조 설정
- [ ] 메인 `src/components/index.ts` 파일 생성

### 3. 네이밍 컨벤션 확립
- [ ] 모든 컴포넌트 파일명 PascalCase 확인
- [ ] 폴더명은 소문자 + 케밥케이스 사용
- [ ] Export/Import 네이밍 일관성 확보

### 4. 문서화
- [ ] 새로운 폴더 구조 기준 문서 작성
- [ ] 각 폴더의 역할과 책임 정의
- [ ] 새 컴포넌트 추가 시 가이드라인 작성

## 🔧 구현 상세사항

### Index 파일 구조 예시

#### `src/components/layout/index.ts`
```typescript
export { default as Header } from './Header';
export { default as Footer } from './Footer';
export { default as Layout } from './Layout';

// 타입 export (있는 경우)
export type { LayoutProps } from './Layout';
```

#### `src/components/cards/index.ts`
```typescript
export { default as ProductCard } from './ProductCard';
export { default as ColorChangeableProductCard } from './ColorChangeableProductCard';
export { default as CategoryCard } from './CategoryCard';

// 타입들도 함께 export
export type { ProductCardProps } from './ProductCard';
export type { ColorChangeableProductCardProps } from './ColorChangeableProductCard';
export type { CategoryCardProps } from './CategoryCard';
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

### 폴더별 역할 정의

#### `/layout` (3개 파일)
- **역할**: 전체 레이아웃 구조를 담당하는 컴포넌트
- **포함**: Header, Footer, Layout wrapper
- **특징**: 모든 페이지에서 재사용되는 구조적 컴포넌트

#### `/sections` (6개 파일)  
- **역할**: 페이지의 특정 섹션을 구성하는 컴포넌트
- **포함**: Hero, ProductGrid, BrandHighlights 등
- **특징**: 비즈니스 도메인 로직이 포함된 큰 단위 컴포넌트

#### `/cards` (3개 파일)
- **역할**: 카드 형태의 UI를 제공하는 컴포넌트
- **포함**: ProductCard, CategoryCard 등
- **특징**: 재사용 가능한 카드 레이아웃 컴포넌트

#### `/ui` (4개 파일)
- **역할**: 기본적인 UI 요소들
- **포함**: Button, Badge, Card 등
- **특징**: 디자인 시스템의 기본 구성 요소

#### `/icons` (3개+ 파일)
- **역할**: SVG 아이콘 컴포넌트들
- **포함**: StorageIcon, MenuIcon 등
- **특징**: 벡터 아이콘의 React 컴포넌트 래핑

## 📊 예상 영향도

### 장점
- **개발 생산성**: 파일 탐색 시간 50% 단축
- **유지보수성**: 관련 컴포넌트들이 함께 위치
- **확장성**: 새 컴포넌트 추가 시 명확한 위치 선택
- **협업 효율성**: 팀원들이 파일을 쉽게 찾을 수 있음

### 리스크
- **단기적 혼란**: 기존 import 경로가 모두 변경됨
- **IDE 인덱싱**: 새로운 구조에 대한 IDE 적응 시간 필요

## 🧪 검증 방법

### 폴더 구조 검증
```bash
# 폴더 구조가 올바르게 생성되었는지 확인
find src/components -type d | sort

# 각 폴더의 파일 개수 확인
find src/components -name "*.tsx" -o -name "*.ts" | wc -l
```

### Index 파일 검증
```bash
# 모든 index.ts 파일이 생성되었는지 확인
find src/components -name "index.ts"

# Export 구문이 올바른지 검증 (TypeScript 컴파일)
npx tsc --noEmit
```

## 📋 체크리스트

### 사전 준비
- [ ] 현재 컴포넌트 파일 목록 정리
- [ ] 각 컴포넌트의 성격과 용도 분석
- [ ] 새로운 폴더 구조 최종 확인

### 실행
- [ ] 폴더 구조 생성
- [ ] Index 파일 작성
- [ ] 문서화 업데이트
- [ ] 구조 검증

### 사후 확인
- [ ] TypeScript 컴파일 오류 없음
- [ ] 모든 폴더에 index.ts 파일 존재
- [ ] 폴더별 컴포넌트 분류 적절성 확인

## 🔗 다음 Story 연결점

이 Story 완료 후:
- **Story 2.2**: 실제 컴포넌트 파일들을 새로운 폴더로 이동
- **Story 2.3**: 모든 import 경로를 새로운 구조에 맞게 업데이트
- **Story 2.4**: 아이콘 시스템 통합 및 정리

## 🎯 완료 기준 (Definition of Done)

- [ ] 모든 폴더가 계획된 구조대로 생성됨
- [ ] 각 폴더에 적절한 index.ts 파일 존재
- [ ] 폴더별 역할과 책임이 명확하게 정의됨
- [ ] 네이밍 컨벤션이 일관되게 적용됨
- [ ] 새로운 구조에 대한 문서 완료
- [ ] TypeScript 컴파일 성공

---

**담당자**: TBD  
**생성일**: 2025-01-28  
**마지막 업데이트**: 2025-01-28