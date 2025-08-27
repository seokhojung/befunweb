import { ApiState, ApiHookReturn, FormHookReturn, ToggleHookReturn, SelectionHookReturn, StateHook } from './generics';

// Hook 타입들을 재export (generics.ts에 정의된 것들)
export type {
  ApiState,
  ApiHookReturn, 
  FormHookReturn,
  ToggleHookReturn,
  SelectionHookReturn,
  StateHook
} from './generics';

// 추가적인 Hook 전용 타입들

// Local Storage Hook
export interface LocalStorageHookReturn<T> {
  value: T | null;
  setValue: (value: T) => void;
  removeValue: () => void;
}

// Async Hook 상태
export interface AsyncHookState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  success: boolean;
}

// Async Hook 반환 타입  
export interface AsyncHookReturn<T, P = unknown> extends AsyncHookState<T> {
  execute: (params?: P) => Promise<void>;
  reset: () => void;
}

// Debounced Hook 반환 타입
export interface DebouncedHookReturn<T> {
  debouncedValue: T;
  isDebouncing: boolean;
  cancel: () => void;
}

// Pagination Hook 상태
export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Pagination Hook 반환 타입
export interface PaginationHookReturn extends PaginationState {
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  setLimit: (limit: number) => void;
  hasNext: boolean;
  hasPrev: boolean;
}

// 검색 Hook 반환 타입
export interface SearchHookReturn<T> {
  query: string;
  setQuery: (query: string) => void;
  results: T[];
  loading: boolean;
  error: string | null;
  clear: () => void;
}

// Infinite Scroll Hook 반환 타입
export interface InfiniteScrollHookReturn<T> {
  items: T[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  reset: () => void;
}

// Sort Hook 상태
export interface SortState<T> {
  key: keyof T | null;
  direction: 'asc' | 'desc';
}

// Sort Hook 반환 타입
export interface SortHookReturn<T> extends SortState<T> {
  sortBy: (key: keyof T) => void;
  sortedData: T[];
  reset: () => void;
}