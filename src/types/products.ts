import { BaseEntity, NamedEntity, ImageEntity, PricedEntity, Money } from './common';

// Money 타입을 다시 export (common에서 가져온 것)
export type { Money } from './common';

// 기본 제품 타입 (기존 Product와 호환)
export interface BaseProduct extends NamedEntity, ImageEntity, PricedEntity {
  description?: string;
  category?: string;
  images?: string[];
  image?: string; // 단일 이미지 (기존 images와 호환)
  variants?: ProductVariant[];
  materials?: MaterialRef[];
  tags?: string[];
  isNew?: boolean; // 신상품 여부
  isAvailable?: boolean;
  freeDelivery?: boolean; // 무료배송 여부
}

// 제품 변형 옵션
export interface ProductVariant {
  id: string;
  options: Record<string, string>;
  sku?: string;
  price?: Money;
}

// 재료 참조
export interface MaterialRef {
  id: string;
  name: string;
  color?: string;
  texture?: string;
}

// 색상 옵션 (ColorChangeableProduct용)
export interface ColorOption extends BaseEntity, NamedEntity, ImageEntity {
  color: string; // hex 색상 코드
  swatchUrl: string; // 컬러 스와치 이미지
  isDefault?: boolean;
}

// 색상 변경 가능한 제품 (BaseProduct를 확장)
export interface ColorChangeableProduct extends BaseProduct {
  colors: ColorOption[];
  defaultColorId: string;
}

// 제품 타입 유니온
export type Product = BaseProduct | ColorChangeableProduct;

// 타입 가드 함수들
export function isColorChangeableProduct(product: Product): product is ColorChangeableProduct {
  return 'colors' in product && Array.isArray(product.colors);
}

export function hasColors(product: Product): product is ColorChangeableProduct {
  return isColorChangeableProduct(product);
}

export function isBaseProduct(product: Product): product is BaseProduct {
  return !isColorChangeableProduct(product);
}

// Configuration 타입 (기존과 동일)
export interface Configuration {
  productId: string;
  selections: Record<string, string>;
  price: Money;
  timestamp: Date;
}