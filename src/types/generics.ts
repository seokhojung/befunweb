import React from 'react';

// 기본 Generic Props
export interface BaseProps<T = unknown> {
  className?: string;
  children?: React.ReactNode;
  data?: T;
  testId?: string;
}

// 액션 가능한 컴포넌트 Props
export interface ActionableProps<T = unknown> extends BaseProps<T> {
  onAction?: (data: T) => void;
  onSelect?: (item: T) => void;
  disabled?: boolean;
}

// 리스트 컴포넌트 Props
export interface ListProps<T = unknown> extends BaseProps<T[]> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor?: (item: T, index: number) => string | number;
  emptyText?: string;
  loading?: boolean;
}

// 그리드 컴포넌트 Props
export interface GridProps<T = unknown> extends ListProps<T> {
  columns?: 2 | 3 | 4 | 6;
  gap?: 'sm' | 'md' | 'lg';
  responsive?: boolean;
}

// 폼 컴포넌트 Props
export interface FormProps<T = unknown> extends BaseProps<T> {
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  validation?: (values: T) => Partial<Record<keyof T, string>>;
  resetOnSubmit?: boolean;
}

// 모달/오버레이 컴포넌트 Props
export interface ModalProps<T = unknown> extends BaseProps<T> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// 상태 관리 인터페이스
export interface StateHook<T> {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
  reset: () => void;
}

// API 상태 인터페이스
export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// API Hook 반환 타입
export interface ApiHookReturn<T> extends ApiState<T> {
  refetch: () => Promise<void>;
  reset: () => void;
}

// 폼 필드 상태
export interface FieldState<T> {
  value: T;
  error?: string;
  touched: boolean;
}

// 폼 Hook 반환 타입
export interface FormHookReturn<T extends Record<string, unknown>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  handleChange: <K extends keyof T>(field: K) => (value: T[K]) => void;
  handleSubmit: () => Promise<void>;
  reset: () => void;
  isValid: boolean;
  isSubmitting: boolean;
}

// Toggle Hook 반환 타입
export interface ToggleHookReturn {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

// 선택 상태 Hook
export interface SelectionHookReturn<T> {
  selected: T[];
  isSelected: (item: T) => boolean;
  select: (item: T) => void;
  deselect: (item: T) => void;
  toggle: (item: T) => void;
  clear: () => void;
  selectAll: (items: T[]) => void;
}

// 유틸리티 Generic 타입들
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Required<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type Nullable<T> = T | null;
export type Maybe<T> = T | undefined;
export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;