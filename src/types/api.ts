// API 응답을 위한 공통 타입들

// 기본 API 응답 구조 (Enhanced Generic)
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  status: 'success' | 'error' | 'loading';
  timestamp: string;
  meta?: Record<string, unknown>;
}

// 성공 응답
export interface SuccessResponse<T = unknown> extends ApiResponse<T> {
  status: 'success';
  data: T;
}

// 에러 응답
export interface ErrorResponse extends ApiResponse<null> {
  status: 'error';
  data: null;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

// 로딩 응답
export interface LoadingResponse extends ApiResponse<null> {
  status: 'loading';
  data: null;
}

// API 응답 유니온 타입
export type ApiResult<T> = SuccessResponse<T> | ErrorResponse | LoadingResponse;

// 페이지네이션 정보 (Enhanced)
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  startIndex: number;
  endIndex: number;
}

// 페이지네이션된 API 응답
export interface PaginatedApiResponse<T = unknown> extends ApiResponse<T[]> {
  pagination: PaginationInfo;
}

// 리스트 API 응답 (검색, 필터링 포함)
export interface ListApiResponse<T = unknown> extends PaginatedApiResponse<T> {
  filters?: Record<string, unknown>;
  sort?: {
    field: string;
    direction: 'asc' | 'desc';
  };
  search?: string;
}

// 레거시 API 에러 (하위 호환성)
export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  status: 'error';
  timestamp: string;
}

// Generic 검색 파라미터
export interface SearchParams<T = unknown> {
  query?: string;
  filters?: Partial<T>;
  sortBy?: keyof T | string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// 제품 특화 검색 파라미터
export interface ProductSearchParams extends SearchParams<{
  category: string;
  tags: string[];
  priceMin: number;
  priceMax: number;
}> {
  category?: string;
  tags?: string[];
  priceMin?: number;
  priceMax?: number;
}

// Generic 필터 옵션
export interface FilterOptions<T = unknown> {
  available: Partial<Record<keyof T, unknown[]>>;
  ranges?: Partial<Record<keyof T, { min: number; max: number }>>;
}

// 제품 특화 필터 옵션  
export interface ProductFilterOptions extends FilterOptions<{
  categories: string[];
  tags: string[];
  price: number;
}> {
  categories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  availableTags: string[];
}

// API 엔드포인트 타입
export type ApiEndpoint<TRequest = unknown, TResponse = unknown> = {
  request: TRequest;
  response: TResponse;
}

// CRUD API 엔드포인트들
export interface CrudEndpoints<T> {
  list: ApiEndpoint<SearchParams<T>, ListApiResponse<T>>;
  get: ApiEndpoint<{ id: string }, ApiResponse<T>>;
  create: ApiEndpoint<Omit<T, 'id'>, ApiResponse<T>>;
  update: ApiEndpoint<T, ApiResponse<T>>;
  delete: ApiEndpoint<{ id: string }, ApiResponse<null>>;
}