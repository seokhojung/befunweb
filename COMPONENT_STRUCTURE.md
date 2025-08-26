# BEFUN 프로젝트 컴포넌트 구조 분석

## 📋 목차
1. [컴포넌트 계층 구조](#컴포넌트-계층-구조)
2. [부모-자식 관계](#부모-자식-관계)
3. [독립적 컴포넌트](#독립적-컴포넌트)
4. [재사용 컴포넌트](#재사용-컴포넌트)
5. [페이지별 컴포넌트 사용](#페이지별-컴포넌트-사용)

---

## 🏗️ 컴포넌트 계층 구조

### 레벨 1: 페이지 컴포넌트 (최상위)
```
📄 src/app/
├── page.tsx (홈페이지)
├── products/page.tsx (상품 목록)
├── products/[id]/page.tsx (상품 상세)
├── configurator/page.tsx (구성기)
└── not-found.tsx (404 페이지)
```

### 레벨 2: 레이아웃 컴포넌트
```
🏛️ Layout Components
├── Header.tsx - 네비게이션 헤더
└── Footer.tsx - 사이트 푸터
```

### 레벨 3: 섹션 컴포넌트 (부모)
```
📦 Section Components
├── HeroSection.tsx - 메인 히어로 영역
├── ProductColorSection.tsx - 컬러 변경 가능한 제품 섹션
├── ProductGrid.tsx - 제품 그리드 섹션
├── BrandHighlights.tsx - 브랜드 하이라이트 섹션
├── Sustainability.tsx - 지속가능성 섹션
└── PromoBanner.tsx - 프로모션 배너
```

### 레벨 4: 카드 컴포넌트 (자식)
```
🃏 Card Components
├── ProductCard.tsx - 일반 제품 카드
├── ColorChangeableProductCard.tsx - 색상 변경 가능한 제품 카드
└── CategoryCard.tsx - 카테고리 카드
```

### 레벨 5: UI 컴포넌트 (최하위)
```
🎨 UI Components
├── ui/
│   ├── button.tsx - 버튼 컴포넌트
│   ├── card.tsx - 기본 카드 컴포넌트
│   ├── badge.tsx - 뱃지 컴포넌트
│   └── animated-card.tsx - 애니메이션 카드
└── icons/
    └── StorageIcon.tsx - 스토리지 관련 아이콘들
```

---

## 👥 부모-자식 관계

### 🔗 강한 의존 관계 (Parent → Child)

#### 1. ProductColorSection → ColorChangeableProductCard
```tsx
ProductColorSection (부모)
└── ColorChangeableProductCard (자식)
    ├── 색상 변경 로직
    ├── 제품 이미지 표시
    └── 컬러 스와치 UI
```
**관계**: ProductColorSection이 ColorChangeableProductCard를 배치하고 데이터 전달

#### 2. ProductGrid → ProductCard
```tsx
ProductGrid (부모)
└── ProductCard (자식)
    ├── 제품 정보 표시
    ├── 가격 표시
    └── 링크 기능
```
**관계**: ProductGrid가 여러 ProductCard를 그리드 레이아웃으로 배치

#### 3. BrandHighlights → AnimatedCard + Badge
```tsx
BrandHighlights (부모)
├── AnimatedCard (자식) - 애니메이션 효과
└── Badge (자식) - 뱃지 표시
```
**관계**: BrandHighlights가 UI 컴포넌트들을 조합하여 브랜드 특징 표시

#### 4. HeroSection → Button
```tsx
HeroSection (부모)
└── Button (자식) - CTA 버튼
```
**관계**: HeroSection이 히어로 영역의 액션 버튼으로 사용

---

## 🚀 독립적 컴포넌트

### 레이아웃 컴포넌트
- **Header.tsx** - 모든 페이지에서 독립적으로 사용
- **Footer.tsx** - 모든 페이지에서 독립적으로 사용

### 독립 섹션 컴포넌트  
- **Sustainability.tsx** - 지속가능성 섹션 (외부 의존성 없음)
- **PromoBanner.tsx** - 프로모션 배너 (외부 의존성 없음)

### 독립 카드 컴포넌트
- **CategoryCard.tsx** - 카테고리 표시용 독립 카드

### 아이콘 컴포넌트
- **StorageIcon.tsx** - 3가지 스토리지 아이콘 (StorageIcon, ShelfStorageIcon, ModernStorageIcon)

---

## 🔄 재사용 컴포넌트

### 높은 재사용성 (3곳 이상에서 사용)
```
🔥 Header.tsx
├── 홈페이지 (page.tsx)
├── 상품 페이지 (products/page.tsx)  
├── 상품 상세 (products/[id]/page.tsx)
├── 구성기 (configurator/page.tsx)
└── 404 페이지 (not-found.tsx)

🔥 Footer.tsx  
├── 홈페이지 (page.tsx)
├── 상품 페이지 (products/page.tsx)
├── 구성기 (configurator/page.tsx)
└── 404 페이지 (not-found.tsx)

🔥 ProductCard.tsx
├── 홈페이지 ProductGrid 내부
├── 상품 페이지 (products/page.tsx)
└── 테스트 페이지 (test/page.tsx)
```

### 중간 재사용성 (2곳에서 사용)
```
🔶 Button.tsx (UI)
├── HeroSection에서 CTA 버튼
└── ProductGrid에서 액션 버튼
```

### 단일 사용 (1곳에서만 사용)
```
🔹 ColorChangeableProductCard - ProductColorSection에서만
🔹 AnimatedCard - BrandHighlights에서만  
🔹 Badge - BrandHighlights에서만
🔹 CategoryCard - 상품 페이지에서만
🔹 PromoBanner - 상품 페이지에서만
```

---

## 📄 페이지별 컴포넌트 사용

### 🏠 홈페이지 (src/app/page.tsx)
```tsx
Layout:
├── Header ✅
└── Footer ✅

Content:
├── HeroSection ✅
│   └── Button (UI)
├── ProductColorSection ✅  
│   └── ColorChangeableProductCard
├── BrandHighlights ✅
│   ├── AnimatedCard (UI)
│   └── Badge (UI)
├── ProductGrid ✅
│   ├── ProductCard  
│   └── Button (UI)
└── Sustainability ✅
```

### 🛒 상품 페이지 (src/app/products/page.tsx)
```tsx
Layout:
├── Header ✅
└── Footer ✅

Content:  
├── CategoryCard ✅
├── ProductCard ✅ (직접 사용)
└── PromoBanner ✅
```

### 📱 상품 상세 (src/app/products/[id]/page.tsx)
```tsx  
Layout:
├── Header ✅
└── Footer ❌

Content:
└── ProductDetailClient (커스텀)
```

### ⚙️ 구성기 (src/app/configurator/page.tsx)
```tsx
Layout:
├── Header ✅  
└── Footer ✅

Content:
└── iframe (외부 구성기)
```

### ❌ 404 페이지 (src/app/not-found.tsx)  
```tsx
Layout:
├── Header ✅
└── Footer ✅

Content:
└── 커스텀 404 UI
```

---

## 🔍 컴포넌트 분류

### 🏢 Container Components (데이터 관리)
- ProductGrid - 제품 데이터를 받아서 여러 ProductCard 렌더링
- ProductColorSection - 색상 변경 가능한 제품 데이터 관리
- BrandHighlights - 브랜드 데이터 표시

### 🎨 Presentational Components (UI 표시)
- ProductCard - 제품 정보만 표시
- ColorChangeableProductCard - 제품과 색상 선택 UI
- CategoryCard - 카테고리 정보만 표시
- Header, Footer - 레이아웃 UI

### ⚡ UI Components (재사용 UI)
- Button - 범용 버튼
- Card - 범용 카드  
- Badge - 뱃지 표시
- AnimatedCard - 애니메이션 효과가 있는 카드

### 🎯 Icon Components (아이콘)
- StorageIcon - 스토리지 관련 SVG 아이콘들

---

## 📊 의존성 그래프

```
Pages
├── page.tsx
│   ├── Header
│   ├── HeroSection → Button
│   ├── ProductColorSection → ColorChangeableProductCard  
│   ├── BrandHighlights → AnimatedCard, Badge
│   ├── ProductGrid → ProductCard, Button
│   ├── Sustainability
│   └── Footer
├── products/page.tsx  
│   ├── Header
│   ├── CategoryCard
│   ├── ProductCard
│   ├── PromoBanner
│   └── Footer
└── configurator/page.tsx
    ├── Header  
    └── Footer
```

---

## 🚨 주의사항 및 권장사항

### ✅ 잘 설계된 부분
1. **Header/Footer 재사용** - 모든 페이지에서 일관된 레이아웃
2. **UI 컴포넌트 분리** - Button, Card 등 재사용 가능한 UI
3. **컨테이너/프레젠테이션 분리** - 데이터와 UI 로직 분리

### ⚠️ 개선 가능한 부분  
1. **ProductDetailClient** - Header import하지만 Footer는 빠짐
2. **단일 사용 컴포넌트** - CategoryCard, PromoBanner 등의 재사용성 검토 필요
3. **아이콘 분산** - StorageIcon 외 다른 아이콘들의 정리 필요

### 📈 확장 권장사항
1. **공통 Layout 컴포넌트** 생성으로 Header/Footer 중복 제거  
2. **더 많은 UI 컴포넌트** 생성 (Input, Modal 등)
3. **아이콘 라이브러리** 통합 관리

---

*문서 생성일: 2025-01-28*
*프로젝트: BEFUN 웹사이트*