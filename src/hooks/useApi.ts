import { useState, useEffect, useRef, useCallback } from 'react';

// API 상태 타입
export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

// API 함수 타입
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiFunction<T> = (...args: any[]) => Promise<T>;

// API 옵션
export interface UseApiOptions<T> {
  immediate?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  retry?: {
    attempts: number;
    delay: number;
  };
  cache?: boolean;
  cacheTime?: number;
}

// Hook 반환 타입
export interface UseApiReturn<T> {
  data: T | null;
  error: Error | null;
  status: ApiStatus;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
  cancel: () => void;
}

// 간단한 캐시 구현
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cache = new Map<string, { data: any; timestamp: number }>();

/**
 * API 호출을 관리하는 Custom Hook
 * @param apiFunction - API 호출 함수
 * @param options - Hook 옵션
 * @returns API 상태 및 제어 함수들
 */
export function useApi<T>(
  apiFunction: ApiFunction<T>,
  options: UseApiOptions<T> = {}
): UseApiReturn<T> {
  const {
    immediate = false,
    onSuccess,
    onError,
    retry = { attempts: 0, delay: 1000 },
    cache: enableCache = false,
    cacheTime = 5 * 60 * 1000, // 5분
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<ApiStatus>('idle');

  const abortControllerRef = useRef<AbortController | null>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // 파생 상태들
  const isLoading = status === 'loading';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  // 캐시 키 생성
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getCacheKey = useCallback((args: any[] = []) => {
    return `${apiFunction.toString()}_${JSON.stringify(args)}`;
  }, [apiFunction]);

  // 캐시에서 데이터 가져오기
  const getFromCache = useCallback((cacheKey: string): T | null => {
    if (!enableCache) return null;

    const cached = cache.get(cacheKey);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > cacheTime;
    if (isExpired) {
      cache.delete(cacheKey);
      return null;
    }

    return cached.data as T;
  }, [enableCache, cacheTime]);

  // 캐시에 데이터 저장
  const saveToCache = useCallback((cacheKey: string, data: T) => {
    if (!enableCache) return;

    cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });
  }, [enableCache]);

  // API 실행 함수 (재시도 로직 포함)
  const executeWithRetry = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (args: any[], attempt = 0): Promise<T | null> => {
      try {
        // 이전 요청 취소
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        // 새 AbortController 생성
        abortControllerRef.current = new AbortController();

        setStatus('loading');
        setError(null);

        // 캐시 확인
        const cacheKey = getCacheKey(args);
        const cachedData = getFromCache(cacheKey);
        if (cachedData) {
          setData(cachedData);
          setStatus('success');
          onSuccess?.(cachedData);
          return cachedData;
        }

        // API 호출
        const result = await apiFunction(...args);

        // 요청이 취소되지 않았다면 상태 업데이트
        if (!abortControllerRef.current?.signal.aborted) {
          setData(result);
          setStatus('success');
          saveToCache(cacheKey, result);
          onSuccess?.(result);
          return result;
        }

        return null;
      } catch (err) {
        // 요청이 취소된 경우 무시
        if (abortControllerRef.current?.signal.aborted) {
          return null;
        }

        const error = err instanceof Error ? err : new Error('API call failed');

        // 재시도 로직
        if (attempt < retry.attempts) {
          return new Promise((resolve) => {
            retryTimeoutRef.current = setTimeout(() => {
              resolve(executeWithRetry(args, attempt + 1));
            }, retry.delay * Math.pow(2, attempt)); // 지수 백오프
          });
        }

        setError(error);
        setStatus('error');
        onError?.(error);
        return null;
      }
    },
    [apiFunction, getCacheKey, getFromCache, saveToCache, retry, onSuccess, onError]
  );

  // 메인 실행 함수
  const execute = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (...args: any[]): Promise<T | null> => {
      return executeWithRetry(args);
    },
    [executeWithRetry]
  );

  // 상태 리셋
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setStatus('idle');
  }, []);

  // 요청 취소
  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = undefined;
    }
    setStatus('idle');
  }, []);

  // 즉시 실행 (컴포넌트 마운트 시)
  useEffect(() => {
    if (immediate) {
      void execute();
    }
  }, [immediate, execute]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  return {
    data,
    error,
    status,
    isLoading,
    isSuccess,
    isError,
    execute,
    reset,
    cancel,
  };
}

// GET 요청을 위한 편의 Hook
export function useGet<T>(
  url: string,
  options: Omit<UseApiOptions<T>, 'immediate'> & { immediate?: boolean } = {}
): UseApiReturn<T> {
  const apiFunction = useCallback(async (): Promise<T> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json() as Promise<T>;
  }, [url]);

  return useApi(apiFunction, { immediate: true, ...options });
}

// POST 요청을 위한 편의 Hook
export function usePost<T, D = unknown>(
  url: string,
  options: UseApiOptions<T> = {}
): UseApiReturn<T> {
  const apiFunction = useCallback(async (data: D): Promise<T> => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json() as Promise<T>;
  }, [url]);

  return useApi(apiFunction, options);
}

// PUT 요청을 위한 편의 Hook
export function usePut<T, D = unknown>(
  url: string,
  options: UseApiOptions<T> = {}
): UseApiReturn<T> {
  const apiFunction = useCallback(async (data: D): Promise<T> => {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json() as Promise<T>;
  }, [url]);

  return useApi(apiFunction, options);
}

// DELETE 요청을 위한 편의 Hook
export function useDelete<T>(
  url: string,
  options: UseApiOptions<T> = {}
): UseApiReturn<T> {
  const apiFunction = useCallback(async (): Promise<T> => {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json() as Promise<T>;
  }, [url]);

  return useApi(apiFunction, options);
}