// API 응답을 위한 공통 타입들

// 기본 API 응답 구조
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  status: 'success' | 'error';
  timestamp: string;
}

// 페이지네이션 정보
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// 페이지네이션된 API 응답
export interface PaginatedApiResponse<T = unknown> extends ApiResponse<T[]> {
  pagination: PaginationInfo;
}

// API 에러 응답
export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  status: 'error';
  timestamp: string;
}

// 검색 파라미터
export interface SearchParams {
  query?: string;
  category?: string;
  tags?: string[];
  priceMin?: number;
  priceMax?: number;
  sortBy?: 'name' | 'price' | 'created' | 'updated';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// 필터 옵션
export interface FilterOptions {
  categories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  availableTags: string[];
}