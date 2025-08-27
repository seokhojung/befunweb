import { useState, useEffect, useCallback } from 'react';

// 직렬화 가능한 값들의 타입
type SerializableValue = string | number | boolean | object | null;

// Hook 옵션
export interface UseLocalStorageOptions<T> {
  serializer?: {
    parse: (value: string) => T;
    stringify: (value: T) => string;
  };
  onError?: (error: Error) => void;
  syncAcrossTabs?: boolean;
}

// Hook 반환 타입
export interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T | ((prevValue: T) => T)) => void;
  removeValue: () => void;
  isLoading: boolean;
  error: Error | null;
}

/**
 * localStorage와 동기화되는 상태를 관리하는 Custom Hook
 * @param key - localStorage 키
 * @param defaultValue - 기본값
 * @param options - Hook 옵션
 * @returns localStorage 상태 및 제어 함수들
 */
export function useLocalStorage<T extends SerializableValue>(
  key: string,
  defaultValue: T,
  options: UseLocalStorageOptions<T> = {}
): UseLocalStorageReturn<T> {
  const {
    serializer = {
      parse: JSON.parse,
      stringify: JSON.stringify,
    },
    onError,
    syncAcrossTabs = true,
  } = options;

  const [value, setValue] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // localStorage에서 값 읽기
  const readFromStorage = useCallback((): T => {
    try {
      if (typeof window === 'undefined') {
        return defaultValue;
      }

      const item = window.localStorage.getItem(key);
      if (item === null) {
        return defaultValue;
      }

      return serializer.parse(item);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to read from localStorage');
      setError(error);
      onError?.(error);
      return defaultValue;
    }
  }, [key, defaultValue, serializer, onError]);

  // localStorage에 값 쓰기
  const writeToStorage = useCallback((newValue: T): void => {
    try {
      if (typeof window === 'undefined') {
        return;
      }

      if (newValue === undefined || newValue === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, serializer.stringify(newValue));
      }

      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to write to localStorage');
      setError(error);
      onError?.(error);
    }
  }, [key, serializer, onError]);

  // 값 설정 함수
  const handleSetValue = useCallback((newValue: T | ((prevValue: T) => T)): void => {
    try {
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);
      writeToStorage(valueToStore);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to set value');
      setError(error);
      onError?.(error);
    }
  }, [value, writeToStorage, onError]);

  // 값 제거 함수
  const removeValue = useCallback((): void => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
      setValue(defaultValue);
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to remove value');
      setError(error);
      onError?.(error);
    }
  }, [key, defaultValue, onError]);

  // 초기값 로드
  useEffect(() => {
    const initialValue = readFromStorage();
    setValue(initialValue);
    setIsLoading(false);
  }, [readFromStorage]);

  // 탭 간 동기화 (storage 이벤트)
  useEffect(() => {
    if (!syncAcrossTabs || typeof window === 'undefined') {
      return;
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.storageArea === localStorage) {
        try {
          const newValue = e.newValue ? serializer.parse(e.newValue) : defaultValue;
          setValue(newValue);
          setError(null);
        } catch (err) {
          const error = err instanceof Error ? err : new Error('Failed to sync storage change');
          setError(error);
          onError?.(error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, defaultValue, serializer, syncAcrossTabs, onError]);

  return {
    value,
    setValue: handleSetValue,
    removeValue,
    isLoading,
    error,
  };
}