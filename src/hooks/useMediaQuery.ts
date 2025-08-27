import { useState, useEffect, useCallback } from 'react';

// 미디어 쿼리 Hook 옵션
export interface UseMediaQueryOptions {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
  onMatch?: (matches: boolean) => void;
}

// Hook 반환 타입
export interface UseMediaQueryReturn {
  matches: boolean;
  media: string;
  isSupported: boolean;
}

/**
 * CSS 미디어 쿼리 상태를 추적하는 Custom Hook
 * @param query - CSS 미디어 쿼리 문자열
 * @param options - Hook 옵션
 * @returns 미디어 쿼리 매치 상태
 */
export function useMediaQuery(
  query: string,
  options: UseMediaQueryOptions = {}
): UseMediaQueryReturn {
  const {
    defaultValue = false,
    initializeWithValue = true,
    onMatch,
  } = options;

  // 브라우저 지원 여부 확인
  const isSupported = typeof window !== 'undefined' && 'matchMedia' in window;

  // 초기값 계산
  const getInitialValue = useCallback(() => {
    if (!isSupported) {
      return defaultValue;
    }

    if (!initializeWithValue) {
      return defaultValue;
    }

    return window.matchMedia(query).matches;
  }, [query, defaultValue, isSupported, initializeWithValue]);

  const [matches, setMatches] = useState<boolean>(getInitialValue);

  // 미디어 쿼리 변화 감지
  useEffect(() => {
    if (!isSupported) {
      return;
    }

    const mediaQueryList = window.matchMedia(query);
    
    // 초기값 설정 (중복 방지)
    if (initializeWithValue) {
      const initialMatches = mediaQueryList.matches;
      setMatches(initialMatches);
      onMatch?.(initialMatches);
    }

    // 변화 감지 핸들러
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
      onMatch?.(event.matches);
    };

    // 브라우저 호환성을 위한 이벤트 리스너 등록
    if (mediaQueryList.addEventListener) {
      // 최신 브라우저
      mediaQueryList.addEventListener('change', handleChange);
    } else if (mediaQueryList.addListener) {
      // 구형 브라우저 (Safari < 14, Chrome < 45)
      mediaQueryList.addListener(handleChange);
    }

    // 클린업
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', handleChange);
      } else if (mediaQueryList.removeListener) {
        mediaQueryList.removeListener(handleChange);
      }
    };
  }, [query, isSupported, initializeWithValue, onMatch]);

  return {
    matches,
    media: query,
    isSupported,
  };
}

// 자주 사용되는 미디어 쿼리들을 위한 편의 Hook들
export const useIsDesktop = (options?: UseMediaQueryOptions) => 
  useMediaQuery('(min-width: 1024px)', options);

export const useIsTablet = (options?: UseMediaQueryOptions) => 
  useMediaQuery('(min-width: 768px) and (max-width: 1023px)', options);

export const useIsMobile = (options?: UseMediaQueryOptions) => 
  useMediaQuery('(max-width: 767px)', options);

export const useIsLargeScreen = (options?: UseMediaQueryOptions) => 
  useMediaQuery('(min-width: 1280px)', options);

export const usePrefersReducedMotion = (options?: UseMediaQueryOptions) => 
  useMediaQuery('(prefers-reduced-motion: reduce)', options);

export const usePrefersDarkMode = (options?: UseMediaQueryOptions) => 
  useMediaQuery('(prefers-color-scheme: dark)', options);

export const useIsPortrait = (options?: UseMediaQueryOptions) => 
  useMediaQuery('(orientation: portrait)', options);

export const useIsLandscape = (options?: UseMediaQueryOptions) => 
  useMediaQuery('(orientation: landscape)', options);

// Tailwind CSS 브레이크포인트와 일치하는 Hook들
export const useTailwindSm = (options?: UseMediaQueryOptions) => 
  useMediaQuery('(min-width: 640px)', options);

export const useTailwindMd = (options?: UseMediaQueryOptions) => 
  useMediaQuery('(min-width: 768px)', options);

export const useTailwindLg = (options?: UseMediaQueryOptions) => 
  useMediaQuery('(min-width: 1024px)', options);

export const useTailwindXl = (options?: UseMediaQueryOptions) => 
  useMediaQuery('(min-width: 1280px)', options);

export const useTailwind2xl = (options?: UseMediaQueryOptions) => 
  useMediaQuery('(min-width: 1536px)', options);