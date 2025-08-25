export type Product = {
  id: string;
  name: string;
  slug: string;
  images: string[];
  image?: string; // 단일 이미지 (기존 images와 호환)
  variants: Variant[];
  price: Money;
  originalPrice?: Money; // 할인 전 가격
  discount?: number; // 할인율 (%)
  materials?: MaterialRef[];
  description?: string;
  category?: string;
  isNew?: boolean; // 신상품 여부
  freeDelivery?: boolean; // 무료배송 여부
};

export type Variant = {
  id: string;
  options: Record<string, string>;
  sku?: string;
  price?: Money;
};

export type Money = {
  currency: 'KRW' | 'USD';
  amount: number;
};

export type MaterialRef = {
  id: string;
  name: string;
  color?: string;
  texture?: string;
};

export type Configuration = {
  productId: string;
  selections: Record<string, string>;
  price: Money;
  timestamp: Date;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
};

export type HeroSection = {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
};
