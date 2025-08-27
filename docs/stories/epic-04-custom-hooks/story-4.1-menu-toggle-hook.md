# Story 4.1: useMenuToggle Hook 생성

## 📝 Story 정보
- **Epic**: Epic 4 - Custom Hooks & Logic Abstraction
- **포인트**: 5점
- **상태**: 📝 To Do
- **예상 소요시간**: 1.5일
- **우선순위**: High (Header 컴포넌트 간소화 필요)

## 🎯 Story 목표
Header 컴포넌트에 하드코딩된 메뉴 토글 로직을 재사용 가능한 Custom Hook으로 추출

## 👤 사용자 스토리
**As a** 개발자  
**I want** 메뉴 토글 기능이 재사용 가능한 Hook으로 분리되어  
**So that** Header 컴포넌트가 간소해지고 다른 컴포넌트에서도 같은 로직을 사용할 수 있다

## 🔍 현재 상황 분석

### Header.tsx의 기존 로직
```typescript
// src/components/Header.tsx
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 복잡한 외부 클릭 감지 로직
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen) {
        const target = event.target as HTMLElement;
        const menuButton = document.querySelector('[data-menu-button]');
        const menuOverlay = document.querySelector('[data-menu-overlay]');
        
        if (menuButton && !menuButton.contains(target) && 
            menuOverlay && !menuOverlay.contains(target)) {
          setIsMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // ESC 키 처리 (현재 없지만 추가 필요)
  // 포커스 트랩 (현재 없지만 추가 필요)
  
  return (
    // JSX...
  );
}
```

### 문제점 분석
1. **복잡성**: Header 컴포넌트가 메뉴 로직으로 인해 복잡해짐
2. **재사용 불가**: 다른 컴포넌트에서 동일한 메뉴 기능 필요 시 코드 중복
3. **접근성 부족**: 키보드 네비게이션 및 포커스 관리 미흡
4. **테스트 어려움**: 컴포넌트와 로직이 밀접하게 결합되어 단위 테스트 어려움

## 🏗️ useMenuToggle Hook 설계

### Hook 인터페이스
```typescript
interface UseMenuToggleOptions {
  initialOpen?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  trapFocus?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

interface UseMenuToggleReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  menuRef: React.RefObject<HTMLElement>;
  buttonRef: React.RefObject<HTMLElement>;
  getMenuProps: () => MenuProps;
  getButtonProps: () => ButtonProps;
}

function useMenuToggle(options?: UseMenuToggleOptions): UseMenuToggleReturn;
```

### 구현 계획

#### 1. 기본 상태 관리
```typescript
// src/hooks/useMenuToggle.ts
import { useState, useRef, useEffect, useCallback } from 'react';

export function useMenuToggle(options: UseMenuToggleOptions = {}) {
  const {
    initialOpen = false,
    closeOnOutsideClick = true,
    closeOnEscape = true,
    trapFocus = false,
    onOpen,
    onClose,
  } = options;

  const [isOpen, setIsOpen] = useState(initialOpen);
  const menuRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLElement>(null);

  const open = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const toggle = useCallback(() => {
    isOpen ? close() : open();
  }, [isOpen, open, close]);

  // ... 추가 로직들
}
```

#### 2. 외부 클릭 감지
```typescript
// 외부 클릭 감지 로직
useEffect(() => {
  if (!closeOnOutsideClick || !isOpen) return;

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    const target = event.target as Node;
    
    // 메뉴나 버튼 내부 클릭이 아닌 경우에만 닫기
    if (
      menuRef.current &&
      buttonRef.current &&
      !menuRef.current.contains(target) &&
      !buttonRef.current.contains(target)
    ) {
      close();
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  document.addEventListener('touchstart', handleClickOutside);
  
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
    document.removeEventListener('touchstart', handleClickOutside);
  };
}, [isOpen, closeOnOutsideClick, close]);
```

#### 3. 키보드 접근성
```typescript
// ESC 키로 메뉴 닫기
useEffect(() => {
  if (!closeOnEscape || !isOpen) return;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      // 포커스를 버튼으로 되돌리기
      buttonRef.current?.focus();
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, [isOpen, closeOnEscape, close]);
```

#### 4. 포커스 트랩 (선택사항)
```typescript
// 포커스 트랩 구현
useEffect(() => {
  if (!trapFocus || !isOpen || !menuRef.current) return;

  const menu = menuRef.current;
  const focusableElements = menu.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  const handleTabKey = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }
  };

  menu.addEventListener('keydown', handleTabKey);
  firstElement?.focus(); // 메뉴 열릴 때 첫 번째 요소에 포커스

  return () => {
    menu.removeEventListener('keydown', handleTabKey);
  };
}, [isOpen, trapFocus]);
```

#### 5. Props 생성기
```typescript
const getMenuProps = useCallback(() => ({
  ref: menuRef,
  role: 'menu',
  'aria-hidden': !isOpen,
  'data-menu-overlay': true,
  tabIndex: isOpen ? 0 : -1,
}), [isOpen]);

const getButtonProps = useCallback(() => ({
  ref: buttonRef,
  'aria-expanded': isOpen,
  'aria-haspopup': 'menu' as const,
  'data-menu-button': true,
  onClick: toggle,
}), [isOpen, toggle]);
```

## ✅ 수행 작업 (Acceptance Criteria)

### 1. Hook 기본 구조 구현
- [ ] `src/hooks/useMenuToggle.ts` 파일 생성
- [ ] 기본 상태 관리 로직 구현
- [ ] open, close, toggle 함수 구현

### 2. 접근성 기능 구현
- [ ] 외부 클릭으로 메뉴 닫기
- [ ] ESC 키로 메뉴 닫기
- [ ] ARIA 속성 자동 설정
- [ ] 포커스 관리 (선택사항)

### 3. 옵션 시스템 구현
- [ ] 설정 가능한 옵션들 정의
- [ ] 기본값 설정
- [ ] 콜백 함수 지원

### 4. TypeScript 타입 정의
- [ ] Hook 인터페이스 정의
- [ ] 옵션 타입 정의
- [ ] 반환 값 타입 정의

### 5. Header 컴포넌트 리팩토링
- [ ] 기존 메뉴 로직 제거
- [ ] useMenuToggle Hook 적용
- [ ] 동일한 기능 보장

## 🔧 구현 상세사항

### 완전한 Hook 구현
```typescript
// src/hooks/useMenuToggle.ts
import { useState, useRef, useEffect, useCallback } from 'react';

export interface UseMenuToggleOptions {
  initialOpen?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  trapFocus?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export interface MenuProps {
  ref: React.RefObject<HTMLElement>;
  role: string;
  'aria-hidden': boolean;
  'data-menu-overlay': boolean;
  tabIndex: number;
}

export interface ButtonProps {
  ref: React.RefObject<HTMLElement>;
  'aria-expanded': boolean;
  'aria-haspopup': 'menu';
  'data-menu-button': boolean;
  onClick: () => void;
}

export interface UseMenuToggleReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  menuRef: React.RefObject<HTMLElement>;
  buttonRef: React.RefObject<HTMLElement>;
  getMenuProps: () => MenuProps;
  getButtonProps: () => ButtonProps;
}

export function useMenuToggle(options: UseMenuToggleOptions = {}): UseMenuToggleReturn {
  // 구현 내용...
}
```

### Header 컴포넌트 적용 예시
```typescript
// src/components/Header.tsx (After)
import { useMenuToggle } from '@/hooks/useMenuToggle';

export default function Header() {
  const { isOpen, getMenuProps, getButtonProps } = useMenuToggle({
    closeOnOutsideClick: true,
    closeOnEscape: true,
    onClose: () => console.log('Menu closed'),
  });

  return (
    <header className="...">
      {/* 햄버거 메뉴 버튼 */}
      <button
        {...getButtonProps()}
        className="md:hidden"
      >
        <MenuIcon />
      </button>

      {/* 모바일 메뉴 */}
      {isOpen && (
        <div
          {...getMenuProps()}
          className="fixed inset-0 top-20 bg-white z-40"
        >
          <nav className="p-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
```

## 🧪 테스트 전략

### Unit 테스트
```typescript
// src/hooks/__tests__/useMenuToggle.test.ts
import { renderHook, act } from '@testing-library/react';
import { useMenuToggle } from '../useMenuToggle';

describe('useMenuToggle', () => {
  it('should initialize with closed state', () => {
    const { result } = renderHook(() => useMenuToggle());
    expect(result.current.isOpen).toBe(false);
  });

  it('should toggle menu state', () => {
    const { result } = renderHook(() => useMenuToggle());
    
    act(() => {
      result.current.toggle();
    });
    
    expect(result.current.isOpen).toBe(true);
    
    act(() => {
      result.current.toggle();
    });
    
    expect(result.current.isOpen).toBe(false);
  });

  it('should call onOpen callback when opening', () => {
    const onOpen = jest.fn();
    const { result } = renderHook(() => useMenuToggle({ onOpen }));
    
    act(() => {
      result.current.open();
    });
    
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('should close menu on outside click', () => {
    const { result } = renderHook(() => useMenuToggle({ 
      closeOnOutsideClick: true 
    }));
    
    act(() => {
      result.current.open();
    });
    
    expect(result.current.isOpen).toBe(true);
    
    // 외부 클릭 시뮬레이션
    act(() => {
      const event = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
      });
      document.dispatchEvent(event);
    });
    
    expect(result.current.isOpen).toBe(false);
  });
});
```

### 통합 테스트
```typescript
// src/components/__tests__/Header.integration.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';

describe('Header with useMenuToggle', () => {
  it('should open and close menu on button click', () => {
    render(<Header />);
    
    const menuButton = screen.getByRole('button', { 
      name: /menu/i 
    });
    
    // 메뉴 열기
    fireEvent.click(menuButton);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    // 메뉴 닫기
    fireEvent.click(menuButton);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('should close menu on ESC key', () => {
    render(<Header />);
    
    const menuButton = screen.getByRole('button', { 
      name: /menu/i 
    });
    
    fireEvent.click(menuButton);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
```

## 📊 성능 고려사항

### 메모리 누수 방지
- 이벤트 리스너 적절한 정리
- useCallback으로 불필요한 함수 재생성 방지
- useEffect cleanup 함수 철저한 구현

### 리렌더링 최적화
```typescript
// 함수들을 useCallback으로 메모화
const open = useCallback(() => {
  setIsOpen(true);
  onOpen?.();
}, [onOpen]);

// Props 객체를 useMemo로 메모화 (추가 최적화)
const menuProps = useMemo(() => ({
  ref: menuRef,
  role: 'menu',
  'aria-hidden': !isOpen,
  'data-menu-overlay': true,
  tabIndex: isOpen ? 0 : -1,
}), [isOpen]);
```

## 🚨 리스크 및 대응방안

### Medium Risk: 브라우저 호환성
- **문제**: 터치 이벤트나 포커스 관리가 일부 브라우저에서 다르게 동작
- **대응**: 브라우저별 테스트 및 폴리필 적용

### Low Risk: 성능 영향
- **문제**: 다수의 이벤트 리스너 등록으로 인한 성능 저하
- **대응**: 메뉴가 열려있을 때만 리스너 등록, 쓰로틀링 적용

## 📋 체크리스트

### 구현
- [ ] useMenuToggle Hook 기본 구조
- [ ] 외부 클릭 감지 로직
- [ ] 키보드 접근성 구현
- [ ] TypeScript 타입 정의
- [ ] Props 생성기 구현

### 테스트
- [ ] Unit 테스트 작성
- [ ] 통합 테스트 작성
- [ ] 접근성 테스트
- [ ] 브라우저 호환성 테스트

### 적용
- [ ] Header 컴포넌트 리팩토링
- [ ] 기능 동일성 확인
- [ ] 성능 측정 및 비교

## 🎯 완료 기준 (Definition of Done)

- [ ] useMenuToggle Hook이 완전히 구현됨
- [ ] 모든 접근성 기능이 정상 동작함
- [ ] Header 컴포넌트가 성공적으로 리팩토링됨
- [ ] 기존 기능과 100% 동일한 동작 보장
- [ ] 테스트 커버리지 90% 이상 달성
- [ ] 성능 회귀 없음 확인

## 🔗 다음 Story 연결점

이 Story 완료 후:
- **Story 4.2**: useScrollDirection Hook으로 스크롤 감지 로직 추출
- **Story 4.3**: 기타 공통 Hook들 (useLocalStorage, useMediaQuery 등) 구현

---

**담당자**: TBD  
**생성일**: 2025-01-28  
**마지막 업데이트**: 2025-01-28