# Story 4.2: useScrollDirection Hook 생성

## 📋 Story 카드
**Title**: useScrollDirection Hook 생성  
**Epic**: Custom Hooks Implementation  
**Priority**: P1 (High)  
**Points**: 4점 (수정됨: 기존 2점)  
**Assignee**: TBD  
**Sprint**: TBD

## 📝 User Story
```
As a 개발자
I want 스크롤 방향을 감지하는 재사용 가능한 Hook을 만들어
So that Header 숨김/보임 로직을 여러 컴포넌트에서 재사용할 수 있다
```

## ✅ Acceptance Criteria
- [ ] 스크롤 방향 (up, down)을 정확히 감지한다
- [ ] 성능 최적화 (쓰로틀링/디바운싱)가 적용된다
- [ ] 메모리 누수를 방지한다
- [ ] TypeScript로 타입이 안전하게 정의된다
- [ ] 다양한 브라우저에서 동작한다
- [ ] Header 컴포넌트에서 기존 로직을 대체한다

## 🔧 세분화된 Technical Tasks (4점)

### Task 1: 기본 useScrollDirection Hook 구현 (1점)
- [ ] Hook 기본 구조 생성
  ```typescript
  interface ScrollDirection {
    direction: 'up' | 'down' | 'idle';
    scrollY: number;
    isAtTop: boolean;
  }

  function useScrollDirection(threshold?: number): ScrollDirection
  ```
- [ ] 스크롤 이벤트 리스너 등록/해제
- [ ] 방향 감지 로직 구현
- [ ] 초기값 설정

### Task 2: 성능 최적화 및 쓰로틀링 (1점)
- [ ] 쓰로틀링 구현 (기본 100ms)
  ```typescript
  const useThrottledScrollDirection = (delay = 100) => {
    // 쓰로틀링 로직
  }
  ```
- [ ] requestAnimationFrame 활용
- [ ] 불필요한 리렌더링 방지
- [ ] 성능 측정 및 최적화

### Task 3: 고급 기능 및 옵션 (1점)
- [ ] 임계값(threshold) 설정 가능
- [ ] 스크롤 위치 추적
- [ ] 페이지 최상단 감지
- [ ] 커스텀 설정 옵션
  ```typescript
  interface UseScrollDirectionOptions {
    threshold?: number;
    throttleMs?: number;
    element?: Element | null;
  }
  ```

### Task 4: Header 통합 및 테스트 (1점)
- [ ] 기존 Header 컴포넌트 리팩토링
- [ ] Hook 단위 테스트 작성
- [ ] 통합 테스트 작성
- [ ] 브라우저 호환성 테스트

## 🏗️ Implementation Details

### Hook 구현

#### `src/hooks/useScrollDirection.ts`
```typescript
import { useState, useEffect, useCallback, useRef } from 'react';

export interface ScrollDirectionState {
  direction: 'up' | 'down' | 'idle';
  scrollY: number;
  isAtTop: boolean;
  previousScrollY: number;
}

export interface UseScrollDirectionOptions {
  threshold?: number;
  throttleMs?: number;
  element?: Element | null;
  initialDirection?: 'up' | 'down' | 'idle';
}

export function useScrollDirection(options: UseScrollDirectionOptions = {}) {
  const {
    threshold = 10,
    throttleMs = 100,
    element = null,
    initialDirection = 'idle'
  } = options;

  const [scrollState, setScrollState] = useState<ScrollDirectionState>({
    direction: initialDirection,
    scrollY: 0,
    isAtTop: true,
    previousScrollY: 0
  });

  const lastScrollTime = useRef<number>(0);
  const requestRef = useRef<number>();

  const updateScrollDirection = useCallback(() => {
    const target = element || window;
    const scrollY = element 
      ? element.scrollTop 
      : window.pageYOffset;

    const isAtTop = scrollY < threshold;
    const scrollDifference = Math.abs(scrollY - scrollState.previousScrollY);

    // 임계값보다 작은 스크롤은 무시
    if (scrollDifference < threshold) {
      return;
    }

    let direction: 'up' | 'down' | 'idle' = 'idle';
    
    if (scrollY > scrollState.previousScrollY && scrollY > threshold) {
      direction = 'down';
    } else if (scrollY < scrollState.previousScrollY) {
      direction = 'up';
    }

    setScrollState(prev => ({
      ...prev,
      direction,
      scrollY,
      isAtTop,
      previousScrollY: scrollY
    }));
  }, [element, threshold, scrollState.previousScrollY]);

  const throttledUpdateScrollDirection = useCallback(() => {
    const now = Date.now();
    
    if (now - lastScrollTime.current >= throttleMs) {
      lastScrollTime.current = now;
      updateScrollDirection();
    } else {
      // 쓰로틀링 중이면 requestAnimationFrame으로 다음 프레임에 실행
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      requestRef.current = requestAnimationFrame(() => {
        if (Date.now() - lastScrollTime.current >= throttleMs) {
          updateScrollDirection();
        }
      });
    }
  }, [updateScrollDirection, throttleMs]);

  useEffect(() => {
    const target = element || window;
    
    // 초기 스크롤 위치 설정
    const initialScrollY = element 
      ? element.scrollTop 
      : window.pageYOffset;
      
    setScrollState(prev => ({
      ...prev,
      scrollY: initialScrollY,
      isAtTop: initialScrollY < threshold,
      previousScrollY: initialScrollY
    }));

    target.addEventListener('scroll', throttledUpdateScrollDirection, { passive: true });

    return () => {
      target.removeEventListener('scroll', throttledUpdateScrollDirection);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [element, throttledUpdateScrollDirection, threshold]);

  return scrollState;
}

// 편의성을 위한 단순화된 Hook
export function useSimpleScrollDirection(threshold = 10) {
  const { direction } = useScrollDirection({ threshold });
  return direction;
}
```

### Header 컴포넌트 리팩토링

#### `src/components/layout/Header.tsx` (기존 로직 대체)
```typescript
import { useScrollDirection } from '@/hooks/useScrollDirection';

export default function Header() {
  const { direction, isAtTop } = useScrollDirection({
    threshold: 10,
    throttleMs: 100
  });

  // Header 표시/숨김 로직
  const isVisible = direction === 'up' || isAtTop;

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 
        transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      {/* Header 내용 */}
    </header>
  );
}
```

### 사용 예제

#### 다양한 사용 패턴
```typescript
// 1. 기본 사용 (Header에서)
function Header() {
  const { direction, isAtTop } = useScrollDirection();
  const showHeader = direction === 'up' || isAtTop;
  
  return (
    <header className={showHeader ? 'visible' : 'hidden'}>
      Header Content
    </header>
  );
}

// 2. 커스텀 옵션과 함께
function FloatingButton() {
  const { direction, scrollY } = useScrollDirection({
    threshold: 50,
    throttleMs: 150
  });
  
  const showButton = direction === 'down' && scrollY > 200;
  
  return showButton ? <button>Top으로</button> : null;
}

// 3. 특정 엘리먼트의 스크롤 감지
function ScrollableArea() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { direction } = useScrollDirection({
    element: scrollRef.current,
    threshold: 20
  });
  
  return (
    <div ref={scrollRef} className="overflow-auto h-96">
      <div className="h-[1000px]">Long content...</div>
      {direction === 'down' && <div>스크롤 중...</div>}
    </div>
  );
}

// 4. 단순한 방향만 필요한 경우
function SimpleComponent() {
  const direction = useSimpleScrollDirection(15);
  
  return (
    <div>
      현재 스크롤 방향: {direction}
    </div>
  );
}
```

## 🧪 Testing Strategy

### Hook 단위 테스트
```typescript
// src/hooks/__tests__/useScrollDirection.test.ts
import { renderHook, act } from '@testing-library/react';
import { useScrollDirection } from '../useScrollDirection';

describe('useScrollDirection Hook', () => {
  beforeEach(() => {
    // 스크롤 위치 초기화
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      value: 0
    });
  });

  test('초기값이 올바르게 설정된다', () => {
    const { result } = renderHook(() => useScrollDirection());
    
    expect(result.current.direction).toBe('idle');
    expect(result.current.scrollY).toBe(0);
    expect(result.current.isAtTop).toBe(true);
  });

  test('아래쪽 스크롤을 감지한다', () => {
    const { result } = renderHook(() => useScrollDirection({ threshold: 10 }));
    
    act(() => {
      // 스크롤 이벤트 시뮬레이션
      Object.defineProperty(window, 'pageYOffset', {
        writable: true,
        value: 100
      });
      
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.direction).toBe('down');
    expect(result.current.isAtTop).toBe(false);
  });

  test('위쪽 스크롤을 감지한다', () => {
    const { result } = renderHook(() => useScrollDirection({ threshold: 10 }));
    
    // 먼저 아래로 스크롤
    act(() => {
      Object.defineProperty(window, 'pageYOffset', { value: 100 });
      window.dispatchEvent(new Event('scroll'));
    });

    // 다시 위로 스크롤
    act(() => {
      Object.defineProperty(window, 'pageYOffset', { value: 50 });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.direction).toBe('up');
  });

  test('임계값보다 작은 스크롤은 무시한다', () => {
    const { result } = renderHook(() => useScrollDirection({ threshold: 20 }));
    
    act(() => {
      Object.defineProperty(window, 'pageYOffset', { value: 5 });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.direction).toBe('idle');
  });

  test('쓰로틀링이 올바르게 작동한다', async () => {
    const { result } = renderHook(() => 
      useScrollDirection({ throttleMs: 100 })
    );

    // 짧은 시간 내에 여러 스크롤 이벤트 발생
    act(() => {
      for (let i = 1; i <= 5; i++) {
        Object.defineProperty(window, 'pageYOffset', { value: i * 10 });
        window.dispatchEvent(new Event('scroll'));
      }
    });

    // 쓰로틀링으로 인해 마지막 값만 반영
    await new Promise(resolve => setTimeout(resolve, 150));
    expect(result.current.scrollY).toBe(50);
  });
});
```

### 통합 테스트
```typescript
// src/components/__tests__/Header-scroll.test.tsx
import { render, fireEvent } from '@testing-library/react';
import Header from '../layout/Header';

describe('Header Scroll Integration', () => {
  test('스크롤 다운 시 Header가 숨겨진다', async () => {
    render(<Header />);
    
    // 스크롤 다운 시뮬레이션
    act(() => {
      Object.defineProperty(window, 'pageYOffset', { value: 100 });
      fireEvent.scroll(window);
    });

    await waitFor(() => {
      const header = screen.getByRole('banner');
      expect(header).toHaveClass('-translate-y-full');
    });
  });

  test('스크롤 업 시 Header가 나타난다', async () => {
    render(<Header />);
    
    // 먼저 아래로 스크롤
    act(() => {
      Object.defineProperty(window, 'pageYOffset', { value: 100 });
      fireEvent.scroll(window);
    });

    // 다시 위로 스크롤
    act(() => {
      Object.defineProperty(window, 'pageYOffset', { value: 50 });
      fireEvent.scroll(window);
    });

    await waitFor(() => {
      const header = screen.getByRole('banner');
      expect(header).toHaveClass('translate-y-0');
    });
  });
});
```

## 📊 Definition of Done Checklist
- [ ] useScrollDirection Hook 구현 완료
- [ ] 성능 최적화 (쓰로틀링) 적용 완료
- [ ] TypeScript 타입 정의 완료
- [ ] Header 컴포넌트 리팩토링 완료
- [ ] Hook 단위 테스트 작성 완료
- [ ] 통합 테스트 작성 완료
- [ ] 메모리 누수 방지 로직 구현 완료
- [ ] 브라우저 호환성 테스트 통과
- [ ] 성능 회귀 없음 확인

## 🚨 Potential Blockers & Mitigations

### Blocker 1: 쓰로틀링 성능 최적화 복잡도
**Risk**: 적절한 쓰로틀링 간격 설정의 어려움, 너무 빠르면 성능 저하, 너무 느리면 반응성 저하  
**Mitigation**: A/B 테스트를 통한 최적 간격 도출, requestAnimationFrame 활용

### Blocker 2: 메모리 누수 위험
**Risk**: 이벤트 리스너 정리 누락으로 인한 메모리 누수  
**Mitigation**: useEffect cleanup function 철저한 구현, 테스트 환경에서 메모리 사용량 모니터링

### Blocker 3: 브라우저 호환성 이슈
**Risk**: 구형 브라우저에서 스크롤 이벤트 처리 방식 차이  
**Mitigation**: polyfill 적용, passive event listener 사용, fallback 로직 구현

## 🔗 Related Stories
- **Depends on**: Story 4.1 (useMenuToggle Hook) - Hook 구조 참조
- **Blocks**: 없음 (독립적 실행 가능)
- **Related**: Story 1.1 (Layout 컴포넌트), Header 컴포넌트 개선

## 📝 성능 최적화 가이드라인

### 최적화 포인트
1. **쓰로틀링**: 기본 100ms, 성능 우선 시 150ms
2. **Passive 이벤트**: 스크롤 블로킹 방지
3. **RequestAnimationFrame**: 부드러운 애니메이션
4. **메모리 관리**: 컴포넌트 언마운트 시 정리

### 사용 권장사항
- Header 숨김/보임: `threshold: 10, throttleMs: 100`
- Floating Button: `threshold: 50, throttleMs: 150` 
- 실시간 스크롤 표시: `threshold: 5, throttleMs: 50`

---

*작성일: 2025-01-28*  
*최종 수정일: 2025-01-28*