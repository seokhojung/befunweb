# 📝 Story 3.1: 배지 시스템 구현

## 📊 스토리 정보
- **Epic**: Advanced Features  
- **Priority**: P2 (High)
- **예상 소요시간**: 2-3시간
- **담당**: Frontend Developer
- **상태**: ❌ 미구현

## 🎯 사용자 스토리
**As a** 사용자  
**I want** 할인, 베스트셀러 등의 배지를 보고  
**So that** 중요한 상품 정보를 빠르게 파악할 수 있다

## 📋 Acceptance Criteria
- [ ] 할인 배지가 좌상단에 표시된다
- [ ] 복합 배지 텍스트가 지원된다 (-40% & Free delivery)
- [ ] Top seller 라벨이 표시된다
- [ ] 배지 우선순위 시스템이 작동한다
- [ ] 배지 색상과 스타일이 정확하게 표시된다
- [ ] 여러 배지가 중첩되지 않는다

## ⚙️ Technical Tasks
- [ ] `components/ui/ProductBadge.tsx` 생성
- [ ] Props 인터페이스 정의
  ```typescript
  interface ProductBadgeProps {
    badge: ProductBadge;
    position?: 'top-left' | 'top-right' | 'bottom-left';
    size?: 'sm' | 'md' | 'lg';
  }
  ```
- [ ] 배지 타입별 스타일링 구현
  ```typescript
  const badgeStyles = {
    discount: {
      backgroundColor: '#FF3C00',
      color: '#FFFF66'
    },
    bestseller: {
      color: '#BE7958'
    }
  };
  ```
- [ ] 배지 우선순위 로직 구현
  ```typescript
  const sortedBadges = badges.sort((a, b) => a.priority - b.priority);
  ```
- [ ] 동적 배지 생성 시스템
- [ ] 배지 위치 조정 로직
- [ ] 복합 텍스트 렌더링 (&amp; → &)
- [ ] 반응형 크기 조정

## 🎯 Definition of Done
- [ ] 모든 배지 타입 정상 표시
- [ ] 우선순위 시스템 동작
- [ ] 디자인 스펙 100% 준수
- [ ] 반응형 크기 지원
- [ ] 재사용 가능한 컴포넌트
- [ ] Storybook 스토리 작성

## 📝 구현 노트
- 배지 데이터는 ProductV2에 이미 포함됨
- CSS absolute positioning 활용
- z-index 관리 주의
- 텍스트 overflow 처리

## 🔗 관련 파일
- `src/types/productsV2.ts` - ProductBadge 타입
- `src/data/productsV2.ts` - 배지 데이터
- `components/cards/ProductCardV2.tsx` - 통합 대상

## 📅 예상 완료일
- 2025-08-29 (Day 2)