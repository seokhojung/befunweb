import { ComponentProps, SelectableItem, SizeVariant, Orientation, Variant } from './common';
import { BaseProduct, ColorChangeableProduct, Product } from './products';
import { Category } from './categories';

// 제품 카드 Props
export interface ProductCardProps extends ComponentProps, Partial<SelectableItem<BaseProduct>> {
  product: BaseProduct;
  showPrice?: boolean;
  size?: SizeVariant;
  variant?: Variant;
}

// 색상 변경 가능한 제품 카드 Props
export interface ColorChangeableProductCardProps extends ComponentProps, Partial<SelectableItem<ColorChangeableProduct>> {
  product: ColorChangeableProduct;
  showColorSelector?: boolean;
  defaultSelectedColorId?: string;
  onColorChange?: (colorId: string) => void;
  className?: string;
}

// 카테고리 카드 Props
export interface CategoryCardProps extends ComponentProps, Partial<SelectableItem<Category>> {
  name: string;
  imageUrl?: string;
  href?: string;
  onSale?: boolean;
  iconType?: 'storage' | 'shelf' | 'modern';
}

// 제품 그리드 Props
export interface ProductGridProps extends ComponentProps {
  products: Product[];
  title: string;
  subtitle?: string;
  columns?: number;
  gap?: number;
}

// 히어로 섹션 Props
export interface HeroSectionProps extends ComponentProps {
  hero: HeroSection;
}

// 히어로 섹션 데이터 타입 (기존 HeroSection과 동일)
export interface HeroSection {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

// 애니메이션 카드 Props
export interface AnimatedCardProps extends ComponentProps {
  children: React.ReactNode;
  isActive?: boolean;
  isTransitioning?: boolean;
  onClick?: () => void;
}

// 레이아웃 Props (기존과 동일)
export interface LayoutProps extends ComponentProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

// Generic 카드 Props
export type GenericCardProps<T> = ComponentProps & Partial<SelectableItem<T>> & {
  data: T;
  size?: SizeVariant;
  variant?: Variant | 'outlined' | 'elevated';
  orientation?: Orientation;
};

// 카드 Props 유니온 타입
export type CardProps = 
  | ProductCardProps 
  | ColorChangeableProductCardProps 
  | CategoryCardProps;