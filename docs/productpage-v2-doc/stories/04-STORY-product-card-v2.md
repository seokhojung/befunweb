# 📝 Story 2.1: ProductCardV2 기본 구조 구현

## 📊 스토리 정보
- **Epic**: Core UI Components
- **Priority**: P1 (Critical)
- **예상 소요시간**: 4-5시간
- **담당**: Frontend Developer
- **상태**: ❌ 미구현

## 🎯 사용자 스토리
**As a** 사용자  
**I want** 개선된 제품 카드를 보고  
**So that** 제품 정보를 더 쉽게 파악할 수 있다

## 📋 Acceptance Criteria
- [ ] ProductV2 데이터로 카드가 렌더링된다
- [ ] 메인/호버 이미지가 표시된다
- [ ] 제품명, 가격, 치수가 표시된다
- [ ] 가구 타입이 표시된다
- [ ] 색상 변형 개수가 표시된다
- [ ] 반응형 디자인이 적용된다
- [ ] 클릭 시 상세 페이지로 이동한다

## ⚙️ Technical Tasks
- [ ] `components/cards/ProductCardV2.tsx` 생성
- [ ] ProductV2 props 인터페이스 정의
  ```typescript
  interface ProductCardV2Props {
    product: ProductV2;
    priority?: boolean;
    onColorChange?: (colorId: string) => void;
  }
  ```
- [ ] 기본 카드 레이아웃 구현
  - 이미지 컨테이너 (aspect-square)
  - 정보 섹션 (제품명, 가구타입, 치수)
  - 가격 섹션 (할인가, 원가)
- [ ] 이미지 표시 로직 구현
  - mainImage 기본 표시
  - next/image 최적화
- [ ] Tailwind CSS 스타일링 적용
  - 그림자 효과 (hover:shadow-plp-product-card)
  - 전환 효과 (transition-all basic-transition)
- [ ] 반응형 레이아웃 구현
  - 모바일: 2 columns
  - 태블릿: 3 columns  
  - 데스크톱: 4 columns
- [ ] Link 컴포넌트로 라우팅 구현

## 🎯 Definition of Done
- [ ] ProductV2 데이터 정상 렌더링
- [ ] 모든 필수 정보 표시
- [ ] 모바일/태블릿/데스크톱 반응형 지원
- [ ] 스타일 가이드 준수
- [ ] 접근성 기준 충족 (ARIA labels)
- [ ] 성능 최적화 적용

## 📝 구현 노트
- 기존 ProductCard.tsx 구조 참고
- ColorChangeableProductCard.tsx 색상 로직 참고
- 초기에는 기본 기능만 구현
- 고급 기능은 별도 스토리에서 추가

## 🔗 관련 파일
- `components/cards/ProductCard.tsx` - V1 참조
- `components/cards/ColorChangeableProductCard.tsx` - 색상 변경 참조
- `src/types/productsV2.ts` - 타입 정의

## 📅 예상 완료일
- 2025-08-29 (Day 2)