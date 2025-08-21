export type Product = {
  id: string;
  name: string;
  slug: string;
  images: string[];
  variants: Variant[];
  price: Money;
  materials?: MaterialRef[];
  description?: string;
  category?: string;
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
  videoUrl: string;
  placeholderImage: string;
  ctaText: string;
  ctaLink: string;
};
