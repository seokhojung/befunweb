// Common types
export * from './common';

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
} from './components';

// 기존 타입들과의 하위 호환성을 위한 별칭들
export type { ProductVariant as Variant } from './products';
