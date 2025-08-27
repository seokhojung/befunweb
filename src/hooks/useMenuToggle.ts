import { useState, useRef, useEffect, useCallback } from 'react';

// 옵션 인터페이스 정의
export interface UseMenuToggleOptions {
  initialOpen?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  trapFocus?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

// 메뉴 Props 타입 정의  
export interface MenuProps {
  ref: React.RefObject<HTMLDivElement | null>;
  role: string;
  'aria-hidden': boolean;
  'data-menu-overlay': boolean;
  tabIndex: number;
}

// 버튼 Props 타입 정의
export interface ButtonProps {
  ref: React.RefObject<HTMLButtonElement | null>;
  'aria-expanded': boolean;
  'aria-haspopup': 'menu';
  'data-menu-button': boolean;
  onClick: () => void;
}

// Hook 반환 타입 정의
export interface UseMenuToggleReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  getMenuProps: () => MenuProps;
  getButtonProps: () => ButtonProps;
}

/**
 * 메뉴 토글 기능을 제공하는 Custom Hook
 * @param options - Hook 설정 옵션
 * @returns 메뉴 상태 및 제어 함수들
 */
export function useMenuToggle(options: UseMenuToggleOptions = {}): UseMenuToggleReturn {
  const {
    initialOpen = false,
    closeOnOutsideClick = true,
    closeOnEscape = true,
    trapFocus = false,
    onOpen,
    onClose,
  } = options;

  // 상태 및 ref 관리
  const [isOpen, setIsOpen] = useState(initialOpen);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // 메뉴 열기 함수
  const open = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  // 메뉴 닫기 함수
  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
    // 메뉴 닫을 때 버튼으로 포커스 이동
    buttonRef.current?.focus();
  }, [onClose]);

  // 메뉴 토글 함수
  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

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

    // 이벤트 리스너 등록
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    // 클린업
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen, closeOnOutsideClick, close]);

  // ESC 키로 메뉴 닫기
  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEscape, close]);

  // 포커스 트랩 구현 (선택사항)
  useEffect(() => {
    if (!trapFocus || !isOpen || !menuRef.current) return;

    const menu = menuRef.current;
    const focusableElements = menu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), ' +
      'input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        // Shift + Tab: 역방향 탐색
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab: 정방향 탐색
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    menu.addEventListener('keydown', handleTabKey);
    
    // 메뉴 열릴 때 첫 번째 요소에 포커스
    // setTimeout으로 렌더링 완료 후 포커스 이동
    const focusTimer = setTimeout(() => {
      firstElement?.focus();
    }, 0);

    return () => {
      menu.removeEventListener('keydown', handleTabKey);
      clearTimeout(focusTimer);
    };
  }, [isOpen, trapFocus]);

  // 메뉴 Props 생성 함수
  const getMenuProps = useCallback((): MenuProps => ({
    ref: menuRef,
    role: 'menu',
    'aria-hidden': !isOpen,
    'data-menu-overlay': true,
    tabIndex: isOpen ? 0 : -1,
  }), [isOpen]);

  // 버튼 Props 생성 함수
  const getButtonProps = useCallback((): ButtonProps => ({
    ref: buttonRef,
    'aria-expanded': isOpen,
    'aria-haspopup': 'menu',
    'data-menu-button': true,
    onClick: toggle,
  }), [isOpen, toggle]);

  return {
    isOpen,
    open,
    close,
    toggle,
    menuRef,
    buttonRef,
    getMenuProps,
    getButtonProps,
  };
}