# 📝 Story 2.2: 색상 스와치 시스템 구현

## 📊 스토리 정보
- **Epic**: Core UI Components
- **Priority**: P2 (High)
- **예상 소요시간**: 3-4시간
- **담당**: Frontend Developer
- **상태**: ❌ 미구현

## 🎯 사용자 스토리
**As a** 사용자  
**I want** 제품의 다양한 색상을 선택하여  
**So that** 원하는 색상의 제품을 확인할 수 있다

## 📋 Acceptance Criteria
- [ ] 색상 썸네일이 그리드로 표시된다
- [ ] 선택된 색상에 체크마크가 표시된다
- [ ] 색상 선택 시 메인 이미지가 변경된다
- [ ] 최대 12개 색상을 지원한다
- [ ] 호버 시 색상명이 툴팁으로 표시된다
- [ ] 키보드 네비게이션을 지원한다

## ⚙️ Technical Tasks
- [ ] `components/ui/ColorSwatchGrid.tsx` 생성
- [ ] Props 인터페이스 정의
  ```typescript
  interface ColorSwatchGridProps {
    variants: ColorVariantV2[];
    selectedId?: string;
    onSelect: (variantId: string) => void;
    maxDisplay?: number;
  }
  ```
- [ ] 색상 선택 상태 관리 (useState)
- [ ] 썸네일 이미지 표시 로직
  - 68x54px 크기 (데스크톱)
  - 50x40px 크기 (모바일)
- [ ] 선택 상태 UI 구현
  - 체크마크 아이콘 오버레이
  - 선택된 색상 테두리 강조
- [ ] 색상 변경 이벤트 핸들링
  ```typescript
  const handleColorSelect = (variantId: string) => {
    onSelect(variantId);
    // 이미지 프리로딩 트리거
  };
  ```
- [ ] 툴팁 컴포넌트 구현
- [ ] 스크롤 가능한 컨테이너 구현
- [ ] 접근성 구현 (ARIA attributes)

## 🎯 Definition of Done
- [ ] 색상 선택 기능 완전 동작
- [ ] 선택 상태 시각적 피드백 제공
- [ ] 최대 12개 색상 표시 및 스크롤
- [ ] 키보드 네비게이션 지원
- [ ] 툴팁 정상 표시
- [ ] 성능 최적화 적용 (React.memo)

## 📝 구현 노트
- 이미지 레이지 로딩 적용
- 색상 이름 i18n 대응 고려
- 재사용 가능한 컴포넌트로 설계
- Headless UI 또는 Radix UI 활용 가능

## 🔗 관련 파일
- `src/types/productsV2.ts` - ColorVariantV2 타입
- `src/data/productsV2.ts` - 색상 데이터
- `components/cards/ProductCardV2.tsx` - 통합 대상

## 📅 예상 완료일
- 2025-08-30 (Day 3)