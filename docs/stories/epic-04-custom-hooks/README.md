# Epic 4: Custom Hooks & Logic Abstraction

## 🎯 Epic 목표
반복되는 로직을 Custom Hook으로 추출하여 코드 재사용성과 테스트 가능성 극대화

## 📊 Epic 정보
- **포인트**: 12점 (수정됨: 기존 5점)
- **예상 기간**: 1.5주
- **우선순위**: P2 (Medium)
- **의존성**: Epic 1 (Layout System) 완료 필요

## 📋 Story 목록

### Story 4.1: useMenuToggle Hook 생성
- **포인트**: 5점
- **상태**: 📝 To Do
- **담당자**: TBD
- **파일**: `story-4.1-menu-toggle-hook.md`

### Story 4.2: useScrollDirection Hook 생성
- **포인트**: 4점
- **상태**: 📝 To Do
- **담당자**: TBD
- **파일**: `story-4.2-scroll-direction-hook.md`

### Story 4.3: 기타 공통 Hook들 생성
- **포인트**: 3점
- **상태**: 📝 To Do
- **담당자**: TBD
- **파일**: `story-4.3-common-hooks.md`

## 🔗 의존성 관계
```
Epic 1 (Layout System) ✅ (Header 로직 필요)
    ↓
Story 4.1 (useMenuToggle) → Story 4.2 (useScrollDirection)
    ↓
Story 4.3 (기타 Hook들)
    ↓
Epic 5 (Performance) 📝 (Hook 최적화 필요)
```

## 🎣 추출할 로직 분석

### 현재 중복/복잡한 로직들

#### 1. 메뉴 토글 로직 (Header.tsx)
```typescript
// 현재: Header 컴포넌트에 하드코딩
const [isMenuOpen, setIsMenuOpen] = useState(false);

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    // 복잡한 외부 클릭 감지 로직
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, [isMenuOpen]);
```

#### 2. 스크롤 방향 감지 (Header.tsx)
```typescript  
// 현재: Header에 복잡한 스크롤 로직
const [isHeaderVisible, setIsHeaderVisible] = useState(true);
const [lastScrollY, setLastScrollY] = useState(0);

useEffect(() => {
  const handleScroll = () => {
    // 복잡한 스크롤 방향 감지 로직
  };
  // 스크롤 이벤트 리스너 등록/해제
}, [lastScrollY]);
```

#### 3. 기타 반복되는 패턴들
- **로컬 스토리지 관리**: 테마, 언어 설정 등
- **API 상태 관리**: 로딩, 에러 상태
- **폼 상태 관리**: 유효성 검사, 제출 상태
- **미디어 쿼리**: 반응형 상태 감지

## 🏗️ Hook 아키텍처 설계

### After (목표 구조)
```
src/hooks/
├── index.ts              # 모든 Hook export
├── useMenuToggle.ts      # 메뉴 토글 로직
├── useScrollDirection.ts # 스크롤 감지 로직
├── useLocalStorage.ts    # 로컬 스토리지 관리
├── useMediaQuery.ts      # 미디어 쿼리 감지
├── useApi.ts            # API 호출 상태 관리
└── __tests__/           # Hook 테스트
    ├── useMenuToggle.test.ts
    ├── useScrollDirection.test.ts
    └── ...
```

### 사용법 예시
```typescript
// Before: Header.tsx에서 복잡한 로직
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // ... 복잡한 useEffect 로직들
}

// After: 간결한 Hook 사용
function Header() {
  const { isOpen, toggle, close } = useMenuToggle();
  const { isVisible } = useScrollDirection();
  
  return (
    <header className={isVisible ? 'visible' : 'hidden'}>
      <button onClick={toggle}>Menu</button>
      {isOpen && <MobileMenu onClose={close} />}
    </header>
  );
}
```

## 📊 복잡도 분석

### Hook별 복잡도 요인

#### useMenuToggle (5점)
- **외부 클릭 감지**: DOM 이벤트 리스너 관리
- **키보드 접근성**: ESC 키, 포커스 트랩
- **모바일 지원**: 터치 이벤트 처리
- **성능 최적화**: 불필요한 리렌더링 방지

#### useScrollDirection (4점)
- **스크롤 이벤트 최적화**: 쓰로틀링/디바운싱
- **방향 감지 알고리즘**: 스크롤 방향 및 속도 계산
- **임계값 설정**: 헤더 숨김/표시 조건
- **메모리 누수 방지**: 이벤트 리스너 정리

#### 기타 Hook들 (3점)
- **useLocalStorage**: 직렬화/역직렬화, 에러 처리
- **useMediaQuery**: 브라우저 호환성, SSR 대응
- **useApi**: 로딩 상태, 에러 처리, 캐싱

## 🎯 완료 조건 (Epic Definition of Done)
- [ ] 모든 반복 로직이 재사용 가능한 Hook으로 추출
- [ ] Hook별로 95% 이상의 테스트 커버리지
- [ ] Header 컴포넌트 복잡도 50% 감소
- [ ] 성능 최적화 (메모화, 이벤트 최적화) 적용
- [ ] TypeScript 타입 안전성 100% 보장
- [ ] 접근성(a11y) 기준 준수
- [ ] 브라우저 호환성 확보
- [ ] Hook 사용법 문서화 완료

## 🚨 리스크 요소

### High Risk
- **성능 영향**: 잘못된 Hook 설계로 인한 성능 저하
- **Mitigation**: React DevTools Profiler 활용한 성능 측정

### Medium Risk
- **브라우저 호환성**: 이벤트 API 차이로 인한 크로스 브라우저 이슈
- **Mitigation**: 폴리필 적용 + 철저한 브라우저 테스트

### Low Risk
- **테스트 복잡도**: DOM 이벤트 테스트의 복잡성
- **Mitigation**: @testing-library/react-hooks + jsdom 활용

## 📈 성공 지표
- **코드 재사용성**: Hook 재사용률 80% 이상
- **컴포넌트 복잡도**: Header 코드 라인 수 50% 감소
- **개발 생산성**: 유사 기능 개발 시간 60% 단축
- **버그 발생률**: 이벤트 관련 버그 70% 감소
- **테스트 커버리지**: Hook 로직 95% 이상

## 🧪 테스트 전략

### Hook 테스트 방법론
```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import { useMenuToggle } from '../useMenuToggle';

describe('useMenuToggle', () => {
  it('should toggle menu state', () => {
    const { result } = renderHook(() => useMenuToggle());
    
    expect(result.current.isOpen).toBe(false);
    
    act(() => {
      result.current.toggle();
    });
    
    expect(result.current.isOpen).toBe(true);
  });
  
  it('should close menu on outside click', () => {
    // DOM 이벤트 시뮬레이션 테스트
  });
});
```

### 통합 테스트
- **실제 컴포넌트와 함께 테스트**
- **E2E 테스트로 사용자 시나리오 검증**
- **성능 회귀 테스트**

## 🔧 개발 가이드라인

### Hook 설계 원칙
1. **Single Responsibility**: 한 Hook은 하나의 책임만
2. **Custom Hook Rules**: use 접두사, Hook 규칙 준수  
3. **Return Object**: 명확한 반환 인터페이스
4. **Memoization**: 필요한 곳에 적절한 메모화

### 성능 최적화 체크리스트
- [ ] **useCallback**: 함수 메모화
- [ ] **useMemo**: 계산 비용이 높은 값 메모화
- [ ] **의존성 배열**: 정확한 dependencies 설정
- [ ] **이벤트 리스너**: 적절한 등록/해제

### 접근성 고려사항
- **키보드 네비게이션**: Tab, Enter, ESC 키 지원
- **포커스 관리**: 메뉴 열기/닫기 시 포커스 이동
- **ARIA 레이블**: 스크린 리더 지원

## 🔄 다른 Epic과의 연관성

### Epic 5 (Performance)와 연계
- Hook 성능 최적화
- 메모화 전략 수립
- 렌더링 최적화

### Epic 3 (Type System)과 연계
- Hook 타입 정의
- Generic Hook 인터페이스
- 타입 안전한 Hook 사용

## 📚 학습 리소스
- **React Hooks 공식 문서**
- **Custom Hooks 패턴 모음**
- **Testing Library Hooks 가이드**
- **성능 최적화 Best Practices**

---

*마지막 업데이트: 2025-01-28*  
*다음 리뷰: Epic 1 완료 후*