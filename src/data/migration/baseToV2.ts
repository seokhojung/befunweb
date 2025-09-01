import { BaseProduct, Money } from '@/types/products';
import { ProductV2, ColorVariantV2, ProductBadge, ProductLabel } from '@/types/productsV2';
import { getImageSet, getImageSetV2 } from './imageMapping';

// 마이그레이션 설정
export interface MigrationConfig {
  useRealImages: boolean;          // 실제 이미지 사용 여부
  generateMissingVariants: boolean; // 누락 변형 생성 여부
  fallbackCategory: string;        // 기본 카테고리
  maxColorVariants: number;        // 최대 색상 변형 수
}

export const DEFAULT_CONFIG: MigrationConfig = {
  useRealImages: false,
  generateMissingVariants: true,
  fallbackCategory: 'bookcase',
  maxColorVariants: 12
};

// 가구 타입 매핑 (카테고리 → 가구 타입)
const FURNITURE_TYPE_MAPPING: Record<string, string> = {
  bookcase: 'Original Modern',
  furniture: 'Original Modern',
  sofa: 'Smooth',
  chair: 'Classic',
  table: 'Modern',
  storage: 'Original',
  bed: 'Comfort',
  kitchen: 'Contemporary',
  bathroom: 'Minimalist',
  bedroom: 'Comfort',
  office: 'Professional'
};

// 치수 생성 함수 (카테고리 기반)
const DIMENSION_RANGES: Record<string, { width: [number, number], height: [number, number] }> = {
  bookcase: { width: [80, 324], height: [123, 283] },
  furniture: { width: [80, 324], height: [123, 283] },
  sofa: { width: [148, 234], height: [85, 113] },
  chair: { width: [60, 85], height: [85, 95] },
  table: { width: [100, 200], height: [70, 80] },
  storage: { width: [100, 220], height: [80, 220] },
  bed: { width: [140, 200], height: [180, 220] }
};

// 기본 색상 세트 (product-v2-example.txt 기반)
const DEFAULT_COLORS = [
  'White', 'Grey', 'Brown', 'Black', 'Green', 
  'Moss Green', 'Light Wood', 'Dark Wood', 
  'Beige', 'Sand', 'Pink', 'Blue'
];

// BaseProduct에서 ProductV2로 변환하는 메인 함수
export function convertToProductV2(base: BaseProduct, config: MigrationConfig = DEFAULT_CONFIG): ProductV2 {
  const category = base.category || config.fallbackCategory;
  
  return {
    ...base,
    
    // V2 전용 필드 추가
    mainImage: extractMainImage(base, config),
    hoverImage: extractMainImage(base, config), // hover 이미지도 main과 동일하게 설정
    
    // 색상 변형 생성
    colorVariants: generateColorVariants(base, config),
    defaultVariant: selectDefaultVariant(base),
    selectedVariant: selectDefaultVariant(base),
    
    // 메타데이터 생성
    furnitureType: mapFurnitureType(category),
    exactDimensions: generateDimensions(category, base.id),
    colorName: extractColorName(base),
    
    // 배지/라벨 생성
    badges: generateBadges(base),
    labels: generateLabels(base)
  };
}

// 메인 이미지 추출
function extractMainImage(base: BaseProduct, config: MigrationConfig): string {
  if (base.image) {
    return config.useRealImages ? base.image : convertToTempImage(base.image);
  }
  
  if (base.images && base.images.length > 0 && base.images[0]) {
    return config.useRealImages ? base.images[0] : convertToTempImage(base.images[0]);
  }
  
  // 폴백: 카테고리 기반 더미 이미지
  const category = base.category || config.fallbackCategory;
  return `/images/temp/${category}-default-main.webp`;
}


// 이미지 URL을 임시 이미지로 변환
function convertToTempImage(originalUrl: string, type: 'main' | 'lifestyle' | 'thumb' = 'main'): string {
  // 원본 URL에서 색상이나 카테고리 정보 추출 시도
  const urlParts = originalUrl.split('/').pop()?.split('.')[0] || 'default';
  return `/images/temp/bookcase-${urlParts}-${type}.webp`;
}

// 색상 변형 생성
function generateColorVariants(base: BaseProduct, config: MigrationConfig): ColorVariantV2[] {
  const category = base.category || config.fallbackCategory;
  const variants: ColorVariantV2[] = [];
  
  // 기존 variants에서 색상 추출
  const existingColors = base.variants?.map(v => v.options.color).filter(Boolean) || [];
  
  // 기존 색상들을 ColorVariantV2로 변환
  existingColors.forEach((color, index) => {
    if (color) {
      variants.push(createColorVariant(color, index === 0, category, base.variants?.[index] as Record<string, unknown> | undefined, base.id));
    }
  });
  
  // 누락된 색상 변형 생성 (config에 따라)
  if (config.generateMissingVariants && variants.length < config.maxColorVariants) {
    const missingColors = DEFAULT_COLORS.filter(color => 
      !existingColors.some(existing => 
        existing?.toLowerCase() === color.toLowerCase()
      )
    );
    
    const remainingSlots = config.maxColorVariants - variants.length;
    missingColors.slice(0, remainingSlots).forEach(color => {
      variants.push(createColorVariant(color, false, category, undefined, base.id));
    });
  }
  
  return variants;
}

// 개별 색상 변형 생성
function createColorVariant(
  colorName: string, 
  isDefault: boolean, 
  category: string,
  originalVariant?: Record<string, unknown>,
  productId?: string
): ColorVariantV2 {
  // V2 이미지 세트 사용 (productId가 있으면 해당 제품용, 없으면 기본값)
  const imageSet = productId 
    ? getImageSetV2(productId, colorName)
    : getImageSet(category, colorName);
    
  const colorId = `${colorName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
  
  const result: ColorVariantV2 = {
    id: colorId,
    name: colorName,
    thumbnail: imageSet.thumbnail,
    mainImage: imageSet.main,
    hoverImage: imageSet.main, // hover와 main 이미지 동일하게 설정
    isDefault,
    isSelected: isDefault,
    sku: (originalVariant?.sku as string) || `BKC-${colorId}`,
    availability: 'in_stock'
  };

  if (originalVariant?.price) {
    result.price = originalVariant.price as Money;
  }

  return result;
}

// 기본 변형 선택
function selectDefaultVariant(base: BaseProduct): string {
  if (base.variants && base.variants.length > 0) {
    const whiteVariant = base.variants.find(v => 
      v.options.color?.toLowerCase().includes('white')
    );
    return whiteVariant?.id || base.variants?.[0]?.id || 'default-variant';
  }
  
  return 'default-variant';
}

// 가구 타입 매핑
function mapFurnitureType(category: string): string {
  return FURNITURE_TYPE_MAPPING[category.toLowerCase()] || 'Original Modern';
}

// 치수 생성 (카테고리와 ID 기반으로 일관성 있게 생성)
function generateDimensions(category: string, productId: string): string {
  const ranges = DIMENSION_RANGES[category.toLowerCase()] || DIMENSION_RANGES.bookcase;
  
  if (!ranges) {
    return '120 x 180 cm'; // 기본값
  }
  
  // productId 기반으로 일관된 치수 생성
  const hash = hashString(productId);
  const width = ranges.width[0] + (hash % (ranges.width[1] - ranges.width[0]));
  const height = ranges.height[0] + ((hash >> 8) % (ranges.height[1] - ranges.height[0]));
  
  return `${width} x ${height} cm`;
}

// 문자열 해시 함수 (일관된 결과를 위해)
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 32bit integer로 변환
  }
  return Math.abs(hash);
}

// 색상명 추출
function extractColorName(base: BaseProduct): string {
  // 첫 번째 variant에서 색상 추출
  const firstVariantColor = base.variants?.[0]?.options.color;
  if (firstVariantColor) {
    return `${firstVariantColor} ${getProductSuffix(base.name)}`;
  }
  
  // 제품명에서 색상 추출 시도
  const colorPattern = /(white|grey|gray|brown|black|green|blue|red|yellow|pink|beige|sand)/i;
  const match = base.name?.match(colorPattern);
  
  return match ? `${match[1]} ${getProductSuffix(base.name)}` : 'Natural';
}

// 제품 접미사 추출 (예: "with Doors", "with Drawers" 등)
function getProductSuffix(name?: string): string {
  if (!name) return '';
  
  const suffixPatterns = [
    /with\s+doors/i,
    /with\s+drawers/i,
    /with\s+storage/i,
    /with\s+external\s+drawers/i,
    /with\s+doors\s+and\s+drawers/i
  ];
  
  for (const pattern of suffixPatterns) {
    const match = name.match(pattern);
    if (match) {
      return match[0];
    }
  }
  
  return '';
}

// 배지 생성
function generateBadges(base: BaseProduct): ProductBadge[] {
  const badges: ProductBadge[] = [];
  
  // 할인 배지 (모든 제품에 -40% & Free delivery)
  if (base.discount || base.originalPrice) {
    badges.push({
      type: 'discount',
      text: '-40% & Free delivery',
      style: {
        backgroundColor: '#FF3C00',
        color: '#FFFF66'
      },
      priority: 1
    });
  }
  
  // 신상품 배지
  if (base.isNew) {
    badges.push({
      type: 'new',
      text: 'New',
      style: {
        backgroundColor: '#22C55E',
        color: '#FFFFFF'
      },
      priority: 2
    });
  }
  
  // 베스트셀러 배지 (일부 제품에만)
  const isTopSeller = hashString(base.id) % 5 === 0; // 20% 확률
  if (isTopSeller) {
    badges.push({
      type: 'bestseller',
      text: 'Top seller',
      style: {
        color: '#BE7958'
      },
      priority: 3
    });
  }
  
  return badges;
}

// 라벨 생성
function generateLabels(base: BaseProduct): ProductLabel[] {
  const labels: ProductLabel[] = [];
  
  // Top seller 라벨
  const isTopSeller = hashString(base.id) % 5 === 0;
  if (isTopSeller) {
    labels.push({
      text: 'Top seller',
      color: '#BE7958'
    });
  }
  
  return labels;
}

// 여러 제품을 한 번에 변환
export function migrateToV2(
  products: BaseProduct[], 
  config: MigrationConfig = DEFAULT_CONFIG
): ProductV2[] {
  return products.map(product => {
    try {
      return convertToProductV2(product, config);
    } catch (error) {
      console.error('Migration failed for product:', product.id, error);
      // 에러 발생 시 기본값으로 변환 시도
      return convertToProductV2(product, { ...config, generateMissingVariants: false });
    }
  });
}

// 변환 결과 검증
export function validateProductV2(product: ProductV2): boolean {
  return Boolean(
    product.id &&
    product.colorVariants?.length > 0 &&
    product.furnitureType &&
    product.exactDimensions &&
    product.mainImage
  );
}

// 안전한 변환 함수
export function safeConvertToV2(product: BaseProduct): ProductV2 | null {
  try {
    const converted = convertToProductV2(product);
    return validateProductV2(converted) ? converted : null;
  } catch (error) {
    console.error('Migration failed for product:', product.id, error);
    return null;
  }
}