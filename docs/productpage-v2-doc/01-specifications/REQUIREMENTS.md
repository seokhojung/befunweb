# 🛍️ BEFUN Product Page V2 - Requirements Specification

## 📋 프로젝트 개요

**목표**: 기존 Product 페이지를 유지하면서 새로운 V2 페이지를 개발하여 고급 전자상거래 경험 제공

**접근 방식**: 기존 `/products` 페이지는 유지하고, 새로운 `/products-v2` 페이지를 별도 개발

---

## 🎯 핵심 기능 요구사항

### 1. **고급 상품 카드 시스템**

#### 1.1 이미지 시스템 ⚠️ **[업데이트: 데이터 연동 필수]**
- **색상별 이미지 세트**: 각 색상마다 독립적인 메인/호버 이미지
  - `colorVariants[].mainImage`: 색상별 기본 이미지
  - `colorVariants[].instagramImage`: 색상별 호버 이미지
  - `colorVariants[].thumbnail`: 색상 선택용 썸네일
- **이미지 전환 효과**: 
  - 호버 시 scale(1.04) + opacity 전환
  - 500ms ease-in-out 애니메이션  
  - aspect-square 고정 비율
- **동적 이미지 변경**: 색상 선택 시 메인/호버 이미지 실시간 변경
- **이미지 프리로딩**: 색상 선택 전 해당 이미지 미리 로딩

#### 1.2 색상 스와치 시스템 ⚠️ **[업데이트: 완전 재설계]**
- **실제 상품 썸네일**: 색상별 실제 상품 이미지 기반 썸네일
- **선택 상태 관리**: 
  - 선택된 색상에 체크마크 아이콘
  - 선택 시 메인 카드 이미지 즉시 변경
  - 상태 동기화 (카드 ↔ 상세 페이지)
- **스크롤 가능**: 최대 12개 색상 옵션 지원
- **반응형 크기**: 
  - 모바일: 40x50px
  - 데스크톱: 54x68px
- **데이터 연결**: `colorVariants[]` 배열과 완전 연동

#### 1.3 인터랙티브 버튼
- **Configure Yours 버튼**:
  - 호버 시에만 나타나는 편집 버튼
  - 편집 아이콘 + 텍스트
  - 위치: 이미지 하단 중앙
  - 모바일에서는 항상 표시

### 2. **배지 및 라벨 시스템**

#### 2.1 할인 배지
- **복합 배지 지원**: "-40% & Free delivery"
- **색상**: 배경 #FF3C00, 텍스트 #FFFF66
- **위치**: 좌상단 고정
- **반응형**: 모바일/데스크톱 다른 여백

#### 2.2 상품 라벨
- **Top seller**: 상품 하단 정보 영역
- **색상 표시**: #BE7958 브랜드 컬러
- **타이포그래피**: semibold-12 uppercase

### 3. **상품 정보 구조**

#### 3.1 정보 계층
1. **상품 라벨** (Top seller, New 등)
2. **가구 타입** (Original Modern, Edge 등)
3. **상품 설명** (Bookcase in White with Doors)
4. **정확한 치수** (103 x 243 cm)
5. **가격 정보** (할인가 + 원가)

#### 3.2 가격 표시
- **할인가**: 오렌지색 강조 (semibold-16)
- **원가**: 취소선 표시 (normal-16)
- **통화**: 유로(€) 표시

---

## 🏗️ 기술적 요구사항

### 1. **컴포넌트 아키텍처**

```
src/
├── app/
│   └── products-v2/           # 새로운 V2 페이지
│       └── page.tsx
├── components/
│   ├── cards/
│   │   └── ProductCardV2.tsx  # V2 전용 상품 카드
│   ├── ui/
│   │   ├── ImageSwitch.tsx    # 이미지 전환 컴포넌트
│   │   ├── ColorSwatch.tsx    # 색상 스와치
│   │   └── BadgeSystem.tsx    # 배지 시스템
│   └── sections/
│       └── ProductGridV2.tsx  # V2 그리드 레이아웃
```

### 2. **데이터 구조**

#### 2.1 확장된 ProductV2 타입 ⚠️ **[업데이트: 완전 재설계]**
```typescript
interface ProductV2 extends BaseProduct {
  // 기본 이미지 (기존 호환성)
  mainImage: string;
  instagramImage: string;
  
  // 색상 변형 (각 색상마다 완전한 이미지 세트)
  colorVariants: ColorVariantV2[];
  selectedVariant?: string;
  defaultVariant: string;
  
  // 상세 정보 (V2 전용)
  furnitureType: string;        // "Original Modern", "Edge"
  exactDimensions: string;      // "103 x 243 cm"
  colorName: string;           // "White with Doors"
  
  // 라벨 및 배지
  labels?: ProductLabel[];
  badges: ProductBadge[];
}

// 확장된 색상 변형 (이미지 세트 포함)
interface ColorVariantV2 {
  id: string;
  name: string;                // "White", "Grey", "Brown"
  
  // 각 색상별 이미지 세트
  thumbnail: string;           // 스와치용 썸네일
  mainImage: string;           // 해당 색상의 메인 이미지
  instagramImage: string;      // 해당 색상의 호버 이미지
  
  // 상태 및 메타데이터
  isSelected?: boolean;
  isDefault?: boolean;
  sku?: string;
  price?: Money;
  
  // 상품 정보 (색상별 다를 수 있음)
  colorDescription?: string;   // "Bookcase in White with Doors"
  availability?: 'in_stock' | 'out_of_stock' | 'pre_order';
}

interface ProductBadge {
  type: 'discount' | 'delivery' | 'label' | 'new' | 'bestseller';
  text: string;
  style: BadgeStyle;
  priority: number;            // 표시 우선순위
}
```

### 3. **상태 관리** ⚠️ **[업데이트: 상세 페이지 연동 추가]**
- **색상 선택**: 각 카드별 독립적인 상태 + 전역 동기화
- **호버 상태**: CSS transition 활용
- **이미지 로딩**: lazy loading + progressive loading + 색상별 프리로딩
- **상세 페이지 연동**: 
  - URL 파라미터: `/products-v2/[id]?color=[colorId]`
  - 선택 상태 전달: 카드 → 상세 페이지
  - 뒤로가기 지원: 브라우저 히스토리 관리

### 4. **데이터 마이그레이션** ⚠️ **[신규 추가]**
- **BaseProduct → ProductV2 변환**: 자동 변환 함수
- **임시 이미지 시스템**: 실제 이미지 제공 전까지 사용
- **점진적 마이그레이션**: V1과 V2 동시 운영

---

## 📱 반응형 디자인

### 1. **Breakpoint 전략**
- **Mobile**: `< 768px` - 2열 그리드
- **Tablet**: `768px - 1024px` - 3열 그리드  
- **Desktop**: `> 1024px` - 4열 그리드

### 2. **컴포넌트 반응형**
- **색상 스와치**: 크기 자동 조정
- **버튼**: 모바일에서 항상 표시
- **이미지**: aspect-ratio 유지
- **타이포그래피**: 반응형 폰트 크기

---

## 🚀 성능 요구사항

### 1. **이미지 최적화**
- **Lazy Loading**: 뷰포트 진입 시 로딩
- **Progressive Loading**: 썸네일 → 고해상도
- **WebP 지원**: 모던 브라우저 대응
- **이미지 캐싱**: 색상 변형 이미지 사전 로딩

### 2. **컴포넌트 최적화**
- **React.memo**: 불필요한 리렌더링 방지
- **useMemo**: 계산 결과 캐싱
- **Virtual Scrolling**: 대량 상품 지원

---

## 🧪 테스트 전략

### 1. **단위 테스트**
- ProductCardV2 컴포넌트 테스트
- 색상 스와치 상호작용 테스트
- 배지 시스템 렌더링 테스트

### 2. **통합 테스트**
- 페이지 전체 렌더링 테스트
- 반응형 동작 테스트
- 접근성 테스트

### 3. **E2E 테스트**
- 상품 카드 호버 인터랙션
- 색상 변경 동작
- 모바일 터치 인터랙션

---

## 📈 단계별 개발 계획

### Phase 1: 기반 구조 (1-2일)
- [ ] ProductV2 타입 정의
- [ ] 기본 페이지 구조 생성
- [ ] ProductCardV2 기본 레이아웃

### Phase 2: 핵심 기능 (2-3일)
- [ ] 이미지 전환 시스템
- [ ] 색상 스와치 구현
- [ ] 배지 시스템 개발

### Phase 3: 고급 기능 (2-3일)
- [ ] Configure 버튼 인터랙션
- [ ] 상태 관리 최적화
- [ ] 반응형 완성

### Phase 4: 최적화 & 테스트 (1-2일)
- [ ] 성능 최적화
- [ ] 접근성 개선
- [ ] 테스트 작성

---

## ✅ 완료 기준

- [ ] 기존 `/products` 페이지 기능 유지
- [ ] `/products-v2` 페이지 완전 동작
- [ ] 모든 반응형 breakpoint 지원
- [ ] 색상 변형 완벽 동작
- [ ] 성능 기준 만족 (LCP < 2.5s)
- [ ] 접근성 AA 등급 준수
- [ ] 테스트 커버리지 > 80%

---

*📅 작성일: 2025-08-28*  
*📝 작성자: Claude Code*  
*🔄 마지막 업데이트: 2025-08-28*