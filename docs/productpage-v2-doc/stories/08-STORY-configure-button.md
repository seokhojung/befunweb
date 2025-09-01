# 📝 Story 3.2: Configure 버튼 구현

## 📊 스토리 정보
- **Epic**: Advanced Features
- **Priority**: P3 (Medium)
- **예상 소요시간**: 2시간
- **담당**: Frontend Developer
- **상태**: ❌ 미구현

## 🎯 사용자 스토리
**As a** 사용자  
**I want** 제품 카드에서 직접 편집 버튼을 클릭하여  
**So that** 제품 상세 페이지로 빠르게 이동할 수 있다

## 📋 Acceptance Criteria
- [ ] 호버 시에만 버튼이 나타난다
- [ ] 버튼 클릭 시 상세 페이지로 이동한다
- [ ] 선택된 색상 정보가 URL에 포함된다
- [ ] 모바일에서는 항상 표시된다
- [ ] 아이콘과 텍스트가 함께 표시된다
- [ ] 애니메이션이 부드럽게 동작한다

## ⚙️ Technical Tasks
- [ ] `components/ui/ConfigureButton.tsx` 생성
- [ ] Props 인터페이스 정의
  ```typescript
  interface ConfigureButtonProps {
    productId: string;
    selectedColorId?: string;
    isVisible?: boolean;
    onClick?: () => void;
  }
  ```
- [ ] 호버 상태별 표시/숨김 로직
  ```typescript
  const buttonClasses = cn(
    'absolute bottom-8 left-1/2 -translate-x-1/2',
    'transition-transform duration-300',
    isHovered ? 'translate-y-0' : 'translate-y-64',
    'md-max:translate-y-0' // 모바일에서는 항상 표시
  );
  ```
- [ ] Next.js router 연동
  ```typescript
  const router = useRouter();
  const handleClick = () => {
    router.push(`/products-v2/${productId}?color=${selectedColorId}`);
  };
  ```
- [ ] URL 파라미터 생성 로직
- [ ] 버튼 스타일링
  - 다크 배경
  - 흰색 텍스트
  - 편집 아이콘
- [ ] 모바일 터치 대응
- [ ] 애니메이션 최적화

## 🎯 Definition of Done
- [ ] 호버 효과 정상 동작
- [ ] 상세 페이지 이동 성공
- [ ] 색상 상태 URL 파라미터 포함
- [ ] 모바일/데스크톱 대응
- [ ] 부드러운 애니메이션
- [ ] 접근성 지원 (키보드 포커스)

## 📝 구현 노트
- group-hover 클래스 활용
- translate 애니메이션 사용
- 버튼은 이미지 컨테이너 내부에 위치
- z-index 관리 필요

## 🔗 관련 파일
- `components/cards/ProductCardV2.tsx` - 통합 대상
- `app/products-v2/[id]/page.tsx` - 이동 대상
- `src/types/productsV2.ts` - 제품 타입

## 📅 예상 완료일
- 2025-09-01 (Day 5)