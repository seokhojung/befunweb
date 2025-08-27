// Common types
export * from './common';

// Generic types (새로 추가)
export * from './generics';

// Hook types (새로 추가) 
export * from './hooks';

// Domain types
export * from './products';
export * from './categories';
export * from './navigation';

// Component types
export * from './components';

// API types
export * from './api';

// 전역으로 자주 사용되는 타입들의 별칭 (하위 호환성 유지)
export type {
  BaseProduct,
  ColorChangeableProduct,
  Product,
  ColorOption,
  ProductVariant,
  Configuration,
  Money,
  MaterialRef,
} from './products';

export type {
  Category,
} from './categories';

export type {
  NavItem,
} from './navigation';

export type {
  ComponentProps,
} from './common';

export type {
  HeroSection,
  LayoutProps,
  ProductCardProps,
  ColorChangeableProductCardProps,
  CategoryCardProps,
  GenericCardProps,
  SectionProps,
} from './components';

// Generic 타입들의 별칭
export type {
  BaseProps,
  ActionableProps,
  ListProps,
  GridProps,
  FormProps,
  ModalProps,
  ApiHookReturn,
  FormHookReturn,
  ToggleHookReturn,
} from './generics';

// API Generic 타입들
export type {
  ApiResult,
  SuccessResponse,
  ErrorResponse,
  LoadingResponse,
  ListApiResponse,
  CrudEndpoints,
} from './api';

// 기존 타입들과의 하위 호환성을 위한 별칭들
export type { ProductVariant as Variant } from './products';
