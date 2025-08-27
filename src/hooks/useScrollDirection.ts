import { useState, useEffect, useRef, useCallback } from 'react';

// 스크롤 방향 타입
export type ScrollDirection = 'up' | 'down' | 'none';

// 옵션 인터페이스
export interface UseScrollDirectionOptions {
  threshold?: number;
  throttleMs?: number;
  initialVisible?: boolean;
  disableWhenAtTop?: boolean;
  onDirectionChange?: (direction: ScrollDirection) => void;
  onVisibilityChange?: (isVisible: boolean) => void;
}

// Hook 반환 타입
export interface UseScrollDirectionReturn {
  scrollDirection: ScrollDirection;
  scrollY: number;
  isVisible: boolean;
  isAtTop: boolean;
  previousScrollY: number;
  deltaY: number;
}

/**
 * 스크롤 방향과 헤더 표시 여부를 관리하는 Custom Hook
 * @param options - Hook 설정 옵션
 * @returns 스크롤 상태 및 헤더 표시 상태
 */
export function useScrollDirection(options: UseScrollDirectionOptions = {}): UseScrollDirectionReturn {
  const {
    threshold = 100,
    throttleMs = 16, // ~60fps
    initialVisible = true,
    disableWhenAtTop = true,
    onDirectionChange,
    onVisibilityChange,
  } = options;

  // 상태 관리
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('none');
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(initialVisible);
  const [isAtTop, setIsAtTop] = useState(true);
  const [previousScrollY, setPreviousScrollY] = useState(0);
  const [deltaY, setDeltaY] = useState(0);

  // 쓰로틀링을 위한 ref
  const lastCallTime = useRef<number>(0);
  const rafId = useRef<number | undefined>(undefined);

  // 헤더 표시 상태 업데이트 함수
  const updateVisibility = useCallback((currentScrollY: number, direction: ScrollDirection) => {
    let newIsVisible = isVisible;

    if (disableWhenAtTop && currentScrollY <= 10) {
      // 최상단에서는 항상 표시
      newIsVisible = true;
    } else if (direction === 'up') {
      // 위로 스크롤하면 표시
      newIsVisible = true;
    } else if (direction === 'down' && currentScrollY > threshold) {
      // 아래로 스크롤하고 임계값을 초과하면 숨김
      newIsVisible = false;
    }

    if (newIsVisible !== isVisible) {
      setIsVisible(newIsVisible);
      onVisibilityChange?.(newIsVisible);
    }
  }, [isVisible, disableWhenAtTop, threshold, onVisibilityChange]);

  // 스크롤 핸들러 (최적화된)
  const handleScroll = useCallback(() => {
    // RAF를 취소하고 새로 스케줄링
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      const now = Date.now();
      
      // 쓰로틀링 체크
      if (now - lastCallTime.current < throttleMs) {
        return;
      }

      lastCallTime.current = now;

      const currentScrollY = window.scrollY;
      const delta = currentScrollY - previousScrollY;
      const newIsAtTop = currentScrollY <= 10;

      // 스크롤 방향 결정 (최소 3px 이상 변화 시에만)
      let direction: ScrollDirection = 'none';
      if (Math.abs(delta) >= 3) {
        direction = delta > 0 ? 'down' : 'up';
      } else {
        direction = scrollDirection; // 기존 방향 유지
      }

      // 상태 업데이트
      setScrollY(currentScrollY);
      setPreviousScrollY(currentScrollY);
      setDeltaY(delta);
      setIsAtTop(newIsAtTop);

      // 방향이 실제로 변경된 경우에만 업데이트
      if (direction !== scrollDirection && direction !== 'none') {
        setScrollDirection(direction);
        onDirectionChange?.(direction);
      }

      // 헤더 표시 상태 업데이트
      updateVisibility(currentScrollY, direction);
    });
  }, [previousScrollY, scrollDirection, throttleMs, updateVisibility, onDirectionChange]);

  // 스크롤 이벤트 등록/해제
  useEffect(() => {
    // 초기값 설정
    const initialScrollY = window.scrollY;
    setScrollY(initialScrollY);
    setPreviousScrollY(initialScrollY);
    setIsAtTop(initialScrollY <= 10);

    // 패시브 리스너로 성능 최적화
    const options: AddEventListenerOptions = { 
      passive: true,
      capture: false
    };

    window.addEventListener('scroll', handleScroll, options);

    // 클린업
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll]);

  // 브라우저 resize 시 상태 재계산
  useEffect(() => {
    const handleResize = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsAtTop(currentScrollY <= 10);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    scrollDirection,
    scrollY,
    isVisible,
    isAtTop,
    previousScrollY,
    deltaY,
  };
}