import { ComponentProps, SelectableItem, SizeVariant, Orientation, Variant } from './common';
import { BaseProduct, ColorChangeableProduct, Product } from './products';
import { Category } from './categories';
import { BaseProps, ActionableProps, ListProps, GridProps, FormProps, ModalProps } from './generics';

// Generic 제품 카드 Props
export interface ProductCardProps<T extends BaseProduct = BaseProduct> extends ActionableProps<T> {
  product: T;
  showPrice?: boolean;
  showDescription?: boolean;
  size?: SizeVariant;
  variant?: Variant;
  imageSize?: 'sm' | 'md' | 'lg';
}

// Generic 색상 변경 가능한 제품 카드 Props  
export interface ColorChangeableProductCardProps<T extends ColorChangeableProduct = ColorChangeableProduct> extends ProductCardProps<T> {
  product: T;
  showColorSelector?: boolean;
  defaultSelectedColorId?: string;
  onColorChange?: (colorId: string) => void;
}

// Generic 카테고리 카드 Props
export interface CategoryCardProps<T extends Category = Category> extends ActionableProps<T> {
  category?: T; // Generic용
  // 기존 호환성을 위한 props들
  name: string;
  imageUrl?: string;
  href?: string;
  onSale?: boolean;
  iconType?: 'storage' | 'shelf' | 'modern';
}

// Generic 제품 그리드 Props
export interface ProductGridProps<T extends Product = Product> extends GridProps<T> {
  products: T[];
  title: string;
  subtitle?: string;
  renderCard?: (product: T) => React.ReactNode;
}

// Generic 리스트 컴포넌트 Props
export interface GenericListProps<T> extends ListProps<T> {
  title?: string;
  subtitle?: string;
  emptyState?: React.ReactNode;
}

// 히어로 섹션 Props
export interface HeroSectionProps<T extends HeroSection = HeroSection> extends BaseProps<T> {
  hero: T;
}

// 히어로 섹션 데이터 타입 (Generic 확장 가능)
export interface HeroSection {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

// Generic 애니메이션 카드 Props
export interface AnimatedCardProps<T = unknown> extends BaseProps<T> {
  children: React.ReactNode;
  isActive?: boolean;
  isTransitioning?: boolean;
  onClick?: () => void;
}

// Generic 레이아웃 Props
export interface LayoutProps<T = unknown> extends BaseProps<T> {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

// Generic 카드 Props (Enhanced)
export interface GenericCardProps<T> extends ActionableProps<T> {
  data: T;
  title?: string;
  description?: string;
  size?: SizeVariant;
  variant?: Variant | 'outlined' | 'elevated';
  orientation?: Orientation;
  renderContent?: (data: T) => React.ReactNode;
  renderActions?: (data: T) => React.ReactNode;
}

// Section Props
export interface SectionProps<T = unknown> extends BaseProps<T[]> {
  title?: string;
  subtitle?: string;
  data: T[];
  loading?: boolean;
  error?: string;
  emptyState?: React.ReactNode;
}

// Generic 모달 Props  
export interface GenericModalProps<T = unknown> extends ModalProps<T> {
  content: T;
  renderContent: (content: T) => React.ReactNode;
  actions?: Array<{
    label: string;
    onClick: (content: T) => void;
    variant?: Variant;
  }>;
}

// 카드 Props 유니온 타입 (Generic 포함)
export type CardProps<T = unknown> = 
  | ProductCardProps<T extends BaseProduct ? T : BaseProduct>
  | ColorChangeableProductCardProps<T extends ColorChangeableProduct ? T : ColorChangeableProduct>
  | CategoryCardProps<T extends Category ? T : Category>
  | GenericCardProps<T>;