import { BaseProduct, Money } from './products';

// V2 전용 확장 타입들
export interface ColorVariantV2 {
  id: string;
  name: string;                // "White", "Grey", "Brown" 등
  
  // 각 색상별 이미지 세트
  thumbnail: string;           // 스와치용 썸네일
  mainImage: string;           // 해당 색상의 메인 이미지
  hoverImage: string;          // 해당 색상의 호버 이미지
  
  // 상태 및 메타데이터
  isSelected?: boolean;
  isDefault?: boolean;
  sku?: string;
  price?: Money;
  
  // 상품 정보 (색상별 다를 수 있음)
  colorDescription?: string;   // "Bookcase in White with Doors"
  availability?: 'in_stock' | 'out_of_stock' | 'pre_order';
}

export interface ProductBadgeStyle {
  backgroundColor?: string;
  color?: string;
  border?: string;
}

export interface ProductBadge {
  type: 'discount' | 'delivery' | 'label' | 'new' | 'bestseller';
  text: string;
  style: ProductBadgeStyle;
  priority: number;            // 표시 우선순위 (1이 가장 높음)
}

export interface ProductLabel {
  text: string;
  color: string;
  backgroundColor?: string;
}

// 확장된 ProductV2 인터페이스
export interface ProductV2 extends BaseProduct {
  // 기본 이미지 (기존 호환성)
  mainImage: string;
  hoverImage: string;
  
  // 색상 변형 (각 색상마다 완전한 이미지 세트)
  colorVariants: ColorVariantV2[];
  selectedVariant?: string;
  defaultVariant: string;
  
  // 상세 정보 (V2 전용)
  furnitureType: string;        // "Original Modern", "Edge", "Original Classic"
  exactDimensions: string;      // "103 x 243 cm"
  colorName: string;           // "White with Doors"
  
  // 라벨 및 배지
  labels?: ProductLabel[];
  badges: ProductBadge[];
}

// 이미지 세트 유틸리티 타입
export interface ImageSet {
  main: string;
  instagram: string;
  thumbnail: string;
}

// 색상별 이미지 매핑
export interface ColorImageMapping {
  [colorId: string]: ImageSet;
}

// 상품별 이미지 구조
export interface ProductImages {
  default: ImageSet;
  variants: ColorImageMapping;
}

// 타입 가드 함수들
export function isProductV2(product: unknown): product is ProductV2 {
  return Boolean(
    product && 
    typeof product === 'object' &&
    'colorVariants' in product &&
    Array.isArray((product as Record<string, unknown>).colorVariants) &&
    'furnitureType' in product &&
    'exactDimensions' in product &&
    'badges' in product
  );
}

export function hasColorVariants(product: ProductV2): boolean {
  return product.colorVariants && product.colorVariants.length > 0;
}

export function getSelectedVariant(product: ProductV2): ColorVariantV2 | undefined {
  if (!product.selectedVariant) {
    return product.colorVariants.find(v => v.isDefault) || product.colorVariants[0];
  }
  return product.colorVariants.find(v => v.id === product.selectedVariant);
}

export function getDefaultVariant(product: ProductV2): ColorVariantV2 {
  return product.colorVariants.find(v => v.id === product.defaultVariant) || 
         product.colorVariants.find(v => v.isDefault) || 
         product.colorVariants[0]!;
}

// 배지 관련 유틸리티
export function getBadgesByPriority(badges: ProductBadge[]): ProductBadge[] {
  return [...badges].sort((a, b) => a.priority - b.priority);
}

export function hasDiscount(product: ProductV2): boolean {
  return product.badges.some(badge => badge.type === 'discount');
}

export function isTopSeller(product: ProductV2): boolean {
  return product.badges.some(badge => badge.type === 'bestseller') ||
         product.labels?.some(label => label.text.toLowerCase().includes('top seller')) || false;
}

// 가격 관련 유틸리티
export function getDiscountPercentage(product: ProductV2): number | null {
  if (!product.originalPrice || !product.discount) return null;
  return product.discount;
}

export function getFormattedPrice(money: Money): string {
  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: money.currency
  });
  return formatter.format(money.amount);
}

// 색상 관련 유틸리티
export function getColorCount(product: ProductV2): number {
  return product.colorVariants.length;
}

export function getAvailableColors(product: ProductV2): string[] {
  return product.colorVariants.map(variant => variant.name);
}

export function selectColor(product: ProductV2, colorId: string): ProductV2 {
  return {
    ...product,
    selectedVariant: colorId,
    colorVariants: product.colorVariants.map(variant => ({
      ...variant,
      isSelected: variant.id === colorId
    }))
  };
}

// Export all types
export type {
  ColorVariantV2 as ColorVariant,
  ProductV2 as Product
} from './productsV2';