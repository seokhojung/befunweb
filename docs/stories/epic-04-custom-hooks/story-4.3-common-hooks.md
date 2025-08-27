# Story 4.3: 기타 공통 Hook들 생성

## 📋 Story 카드
**Title**: 기타 공통 Hook들 생성  
**Epic**: Custom Hooks Implementation  
**Priority**: P2 (Medium)  
**Points**: 3점  
**Assignee**: TBD  
**Sprint**: TBD

## 📝 User Story
```
As a 개발자
I want 자주 사용되는 로직들을 재사용 가능한 Hook으로 만들어
So that 코드 중복을 줄이고 개발 효율성을 높일 수 있다
```

## ✅ Acceptance Criteria
- [ ] useLocalStorage Hook이 브라우저 저장소를 안전하게 관리한다
- [ ] useMediaQuery Hook이 반응형 디자인을 지원한다
- [ ] useDebounce Hook이 성능 최적화를 제공한다
- [ ] useApi Hook이 API 호출을 단순화한다
- [ ] 모든 Hook이 TypeScript로 안전하게 타입이 정의된다
- [ ] 에러 처리와 로딩 상태 관리가 포함된다

## 🔧 세분화된 Technical Tasks (3점)

### Task 1: useLocalStorage Hook 구현 (0.75점)
- [ ] 브라우저 localStorage 래핑
- [ ] JSON 직렬화/역직렬화 처리
- [ ] SSR 안전성 확보
- [ ] 에러 처리 및 fallback

### Task 2: useMediaQuery Hook 구현 (0.75점)
- [ ] CSS 미디어 쿼리 감지
- [ ] 반응형 브레이크포인트 지원
- [ ] SSR 호환성
- [ ] 성능 최적화

### Task 3: useDebounce/useApi Hook 구현 (0.75점)
- [ ] useDebounce: 입력 지연 처리
- [ ] useApi: API 호출 상태 관리
- [ ] 에러 상태 처리
- [ ] 로딩/성공/실패 상태

### Task 4: Hook 통합 및 테스트 (0.75점)
- [ ] 모든 Hook 통합 테스트
- [ ] 사용 예제 및 문서 작성
- [ ] 성능 검증
- [ ] 브라우저 호환성 테스트

## 🏗️ Implementation Details

### 1. useLocalStorage Hook

#### `src/hooks/useLocalStorage.ts`
```typescript
import { useState, useEffect, useCallback } from 'react';

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>, () => void] {
  // SSR 안전성을 위한 lazy initial state
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue: SetValue<T> = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // 다른 탭에서의 변경사항 감지
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn('Error parsing stored value:', error);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, [key]);

  return [storedValue, setValue, removeValue];
}

// 편의성을 위한 타입 안전 버전들
export function useLocalStorageString(key: string, initialValue = '') {
  return useLocalStorage<string>(key, initialValue);
}

export function useLocalStorageBoolean(key: string, initialValue = false) {
  return useLocalStorage<boolean>(key, initialValue);
}

export function useLocalStorageObject<T>(key: string, initialValue: T) {
  return useLocalStorage<T>(key, initialValue);
}
```

### 2. useMediaQuery Hook

#### `src/hooks/useMediaQuery.ts`
```typescript
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false; // SSR에서는 기본값 false
    }
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(query);
    
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // 초기 상태 설정
    setMatches(mediaQuery.matches);

    // 이벤트 리스너 등록 (브라우저 호환성 고려)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // 구형 브라우저 지원
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [query]);

  return matches;
}

// 편의성을 위한 브레이크포인트 Hook들
export function useBreakpoint() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isLarge = useMediaQuery('(min-width: 1280px)');

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLarge,
    // 편의 속성들
    isMobileOrTablet: isMobile || isTablet,
    isDesktopOrLarge: isDesktop || isLarge
  };
}

export function useIsMobile() {
  return useMediaQuery('(max-width: 767px)');
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)');
}
```

### 3. useDebounce Hook

#### `src/hooks/useDebounce.ts`
```typescript
import { useState, useEffect, useRef } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// 콜백 함수를 디바운스하는 Hook
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedCallback = ((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }) as T;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

// 검색 입력을 위한 특화된 Hook
export function useSearchDebounce(initialValue = '', delay = 300) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const debouncedSearchTerm = useDebounce(searchTerm, delay);

  return {
    searchTerm,
    debouncedSearchTerm,
    setSearchTerm,
    isSearching: searchTerm !== debouncedSearchTerm
  };
}
```

### 4. useApi Hook

#### `src/hooks/useApi.ts`
```typescript
import { useState, useEffect, useCallback, useRef } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export function useApi<T = any>(
  url: string,
  options: UseApiOptions = {}
) {
  const { immediate = true, onSuccess, onError } = options;
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null
  });

  const cancelRef = useRef<AbortController>();

  const execute = useCallback(async (customUrl?: string) => {
    const targetUrl = customUrl || url;
    
    // 이전 요청 취소
    if (cancelRef.current) {
      cancelRef.current.abort();
    }

    cancelRef.current = new AbortController();

    setState(prev => ({
      ...prev,
      loading: true,
      error: null
    }));

    try {
      const response = await fetch(targetUrl, {
        signal: cancelRef.current.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      setState({
        data,
        loading: false,
        error: null
      });

      onSuccess?.(data);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        // 요청 취소된 경우 상태 업데이트 하지 않음
        return;
      }

      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      
      setState({
        data: null,
        loading: false,
        error: errorMessage
      });

      onError?.(errorMessage);
    }
  }, [url, onSuccess, onError]);

  const reset = useCallback(() => {
    if (cancelRef.current) {
      cancelRef.current.abort();
    }

    setState({
      data: null,
      loading: false,
      error: null
    });
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }

    return () => {
      if (cancelRef.current) {
        cancelRef.current.abort();
      }
    };
  }, [execute, immediate]);

  return {
    ...state,
    execute,
    reset,
    refetch: () => execute()
  };
}

// POST 요청을 위한 Hook
export function useApiPost<TData = any, TResponse = any>(url: string) {
  const [state, setState] = useState<ApiState<TResponse>>({
    data: null,
    loading: false,
    error: null
  });

  const post = useCallback(async (data: TData) => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null
    }));

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      setState({
        data: result,
        loading: false,
        error: null
      });

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      
      setState({
        data: null,
        loading: false,
        error: errorMessage
      });

      throw error;
    }
  }, [url]);

  return {
    ...state,
    post
  };
}
```

### Hook 통합 인덱스

#### `src/hooks/index.ts`
```typescript
// Menu & UI Hooks
export { useMenuToggle } from './useMenuToggle';
export { useScrollDirection, useSimpleScrollDirection } from './useScrollDirection';

// Storage & State Hooks
export { 
  useLocalStorage, 
  useLocalStorageString,
  useLocalStorageBoolean,
  useLocalStorageObject 
} from './useLocalStorage';

// Responsive Hooks
export { 
  useMediaQuery, 
  useBreakpoint, 
  useIsMobile, 
  useIsDesktop 
} from './useMediaQuery';

// Performance Hooks
export { 
  useDebounce, 
  useDebouncedCallback,
  useSearchDebounce 
} from './useDebounce';

// API Hooks
export { useApi, useApiPost } from './useApi';

// Type exports
export type { ScrollDirectionState, UseScrollDirectionOptions } from './useScrollDirection';
export type { ToggleHookReturn } from './useMenuToggle';
```

## 🧪 Testing Strategy

### Hook별 테스트
```typescript
// src/hooks/__tests__/useLocalStorage.test.ts
describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('초기값을 올바르게 설정한다', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial')
    );

    expect(result.current[0]).toBe('initial');
  });

  test('값을 localStorage에 저장한다', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial')
    );

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(localStorage.getItem('test-key')).toBe('"updated"');
  });
});

// src/hooks/__tests__/useMediaQuery.test.ts
describe('useMediaQuery Hook', () => {
  test('미디어 쿼리 변화를 감지한다', () => {
    // matchMedia 모킹
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(min-width: 1024px)',
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });

    const { result } = renderHook(() => 
      useMediaQuery('(min-width: 1024px)')
    );

    expect(result.current).toBe(true);
  });
});
```

## 📊 Definition of Done Checklist
- [ ] useLocalStorage Hook 구현 완료
- [ ] useMediaQuery Hook 구현 완료
- [ ] useDebounce Hook 구현 완료
- [ ] useApi Hook 구현 완료
- [ ] 모든 Hook TypeScript 타입 정의 완료
- [ ] Hook별 단위 테스트 작성 완료
- [ ] SSR 호환성 확보
- [ ] 브라우저 호환성 테스트 통과
- [ ] 성능 최적화 확인
- [ ] 사용 예제 및 문서 작성 완료

## 🚨 Potential Blockers & Mitigations

### Blocker 1: SSR/SSG 호환성 이슈
**Risk**: localStorage, matchMedia 등 브라우저 API가 서버에서 사용할 수 없음  
**Mitigation**: typeof window 체크, 기본값 제공, useEffect에서 클라이언트 로직 실행

### Blocker 2: 메모리 누수 위험
**Risk**: 이벤트 리스너, setTimeout 정리 누락  
**Mitigation**: useEffect cleanup 철저한 구현, ref를 통한 리소스 관리

### Blocker 3: 타입 복잡도
**Risk**: Generic 타입과 함께 사용 시 타입 추론 실패  
**Mitigation**: 명시적 타입 제공, 타입 가드 활용, 단순한 인터페이스 설계

## 🔗 Related Stories
- **Depends on**: Story 4.1, 4.2 (기존 Hook 패턴 참조)
- **Blocks**: 없음 (독립적 실행 가능)
- **Related**: Epic 5 (성능 최적화에서 Hook 활용)

## 📝 사용 예제

### 실제 컴포넌트에서의 활용
```typescript
// 검색 기능이 있는 컴포넌트
function SearchableProductList() {
  const { searchTerm, debouncedSearchTerm, setSearchTerm } = useSearchDebounce('', 300);
  const { data: products, loading } = useApi<Product[]>(
    `/api/products?search=${debouncedSearchTerm}`,
    { immediate: !!debouncedSearchTerm }
  );

  return (
    <div>
      <input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="상품 검색..."
      />
      {loading && <div>검색 중...</div>}
      {products?.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// 반응형 레이아웃 컴포넌트
function ResponsiveLayout() {
  const { isMobile, isDesktop } = useBreakpoint();
  const [sidebarOpen, setSidebarOpen] = useLocalStorageBoolean('sidebar-open', true);

  return (
    <div className="flex">
      {(isDesktop || sidebarOpen) && (
        <aside className="w-64">
          Sidebar Content
        </aside>
      )}
      <main className="flex-1">
        {isMobile && (
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            Toggle Sidebar
          </button>
        )}
        Main Content
      </main>
    </div>
  );
}
```

---

*작성일: 2025-01-28*  
*최종 수정일: 2025-01-28*