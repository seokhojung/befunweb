# 📝 Story 4.1: 제품 목록 페이지 통합

## 📊 스토리 정보
- **Epic**: Integration & Testing
- **Priority**: P1 (Critical)
- **예상 소요시간**: 3-4시간
- **담당**: Frontend Developer
- **상태**: ❌ 미구현

## 🎯 사용자 스토리
**As a** 사용자  
**I want** /products-v2 페이지에서 모든 제품을 그리드로 보고  
**So that** 다양한 제품을 비교할 수 있다

## 📋 Acceptance Criteria
- [ ] 34개 실제 제품이 그리드로 표시된다
- [ ] 각 카드의 모든 기능이 정상 동작한다
- [ ] 반응형 그리드 레이아웃이 적용된다
- [ ] 페이지 로딩 성능이 최적화된다
- [ ] 필터링 옵션이 제공된다 (선택적)
- [ ] 정렬 옵션이 제공된다 (선택적)

## ⚙️ Technical Tasks
- [ ] `components/sections/ProductGridV2.tsx` 생성
- [ ] Props 인터페이스 정의
  ```typescript
  interface ProductGridV2Props {
    products: ProductV2[];
    columns?: {
      mobile: number;
      tablet: number;
      desktop: number;
    };
    showFilters?: boolean;
    showSort?: boolean;
  }
  ```
- [ ] ProductV2 데이터 fetch 로직 구현
  ```typescript
  async function getProductsV2(): Promise<ProductV2[]> {
    // productsV2Data를 직접 반환하거나 API 호출
    return productsV2Data;
  }
  ```
- [ ] 그리드 레이아웃 최적화
  ```css
  grid-cols-2 md:grid-cols-3 lg:grid-cols-4
  gap-8 md:gap-16
  ```
- [ ] 이미지 레이지 로딩 구현
  ```typescript
  loading={index < 8 ? 'eager' : 'lazy'}
  fetchPriority={index < 4 ? 'high' : 'auto'}
  ```
- [ ] 에러 처리 및 폴백 UI
- [ ] 스켈레톤 로더 구현
- [ ] 무한 스크롤 구현 (선택적)

## 🎯 Definition of Done
- [ ] 모든 제품 정상 표시
- [ ] 성능 메트릭 기준 충족 (LCP < 2.5s)
- [ ] 에러 상황 대응 완료
- [ ] 반응형 완벽 동작
- [ ] 접근성 기준 충족
- [ ] SEO 최적화 완료

## 📝 구현 노트
- Server Component로 구현 권장
- 초기 8개 제품은 eager loading
- Virtual scrolling 고려
- 이미지 최적화 필수

## 🔗 관련 파일
- `app/products-v2/page.tsx` - 사용 대상
- `components/cards/ProductCardV2.tsx` - 카드 컴포넌트
- `src/data/productsV2.ts` - 데이터 소스

## 📅 예상 완료일
- 2025-09-01 (Day 5)