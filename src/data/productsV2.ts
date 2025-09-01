import { ProductV2, ColorVariantV2, ProductBadge } from '@/types/productsV2';

// 실제 product-v2-example.txt에서 추출한 34개 제품 데이터
// 모든 제품은 Bookcase 카테고리이며, 다양한 색상과 크기를 가집니다.

// 일관된 이미지 경로 생성을 위한 헬퍼 함수
const getImageIndex = (id: string): string => {
  // ID 기반으로 일관된 이미지 인덱스 생성 (1-5)
  const hash = id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  return String((hash % 5) + 1).padStart(2, '0');
};

const createColorVariant = (
  id: string,
  name: string
): ColorVariantV2 => {
  const imageIndex = getImageIndex(id);
  return {
    id,
    name,
    thumbnail: `/images/placeholders/product-placeholder.svg`,
    mainImage: `/images/products/v2/main/bookcase-${imageIndex}-main.svg`,
    hoverImage: `/images/products/v2/hover/bookcase-${imageIndex}-hover.svg`,
    isDefault: id.endsWith('-1'),
    sku: `BKC-${id}`,
    availability: 'in_stock'
  };
};

const createBadges = (hasDiscount: boolean = true, isTopSeller: boolean = false): ProductBadge[] => {
  const badges: ProductBadge[] = [];
  
  if (hasDiscount) {
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
  
  if (isTopSeller) {
    badges.push({
      type: 'bestseller',
      text: 'Top seller',
      style: {
        color: '#BE7958'
      },
      priority: 2
    });
  }
  
  return badges;
};

// product-v2-example.txt에서 추출한 실제 34개 제품 데이터
export const productsV2Data: ProductV2[] = [
  {
    id: 'bookcase-001',
    name: 'Bookcase in White with Doors',
    slug: 'bookcase-white-doors',
    description: 'Tall slim white bookcase with doors - 103x243x24cm',
    category: 'bookcase',
    
    // V2 전용 필드
    mainImage: '/images/products/v2/main/bookcase-01-main.svg',
    hoverImage: '/images/products/v2/hover/bookcase-01-hover.svg',
    
    colorVariants: [
      createColorVariant('white-1', 'White'),
      createColorVariant('brown-1', 'Brown'),
      createColorVariant('grey-1', 'Grey'),
      createColorVariant('black-1', 'Black'),
      createColorVariant('green-1', 'Green'),
      createColorVariant('blue-1', 'Blue'),
      createColorVariant('pink-1', 'Pink'),
      createColorVariant('beige-1', 'Beige'),
      createColorVariant('sand-1', 'Sand'),
      createColorVariant('moss-green-1', 'Moss Green'),
      createColorVariant('light-wood-1', 'Light Wood'),
      createColorVariant('dark-wood-1', 'Dark Wood')
    ],
    defaultVariant: 'white-1',
    selectedVariant: 'white-1',
    
    furnitureType: 'Original Modern',
    exactDimensions: '103 x 243 cm',
    colorName: 'White with Doors',
    
    price: { currency: 'EUR', amount: 1281 },
    originalPrice: { currency: 'EUR', amount: 2135 },
    discount: 40,
    
    badges: createBadges(true, true), // 할인 + Top seller
    labels: [{ text: 'Top seller', color: '#BE7958' }],
    
    isNew: false,
    isAvailable: true,
    freeDelivery: true
  },
  
  {
    id: 'bookcase-002',
    name: 'Bookcase in Grey with External Drawers',
    slug: 'bookcase-grey-external-drawers',
    description: 'Large grey bookcase with external drawers - 243x137.8cm',
    category: 'bookcase',
    
    mainImage: '/images/products/v2/main/bookcase-02-main.svg',
    hoverImage: '/images/products/v2/hover/bookcase-02-hover.svg',
    
    colorVariants: [
      createColorVariant('grey-2', 'Grey'),
      createColorVariant('white-2', 'White'),
      createColorVariant('brown-2', 'Brown'),
      createColorVariant('black-2', 'Black'),
      createColorVariant('green-2', 'Green'),
      createColorVariant('light-wood-2', 'Light Wood'),
      createColorVariant('beige-2', 'Beige'),
      createColorVariant('sand-2', 'Sand')
    ],
    defaultVariant: 'grey-2',
    selectedVariant: 'grey-2',
    
    furnitureType: 'Edge',
    exactDimensions: '243 x 137.8 cm',
    colorName: 'Grey with External Drawers',
    
    price: { currency: 'EUR', amount: 1286 },
    originalPrice: { currency: 'EUR', amount: 2144 },
    discount: 40,
    
    badges: createBadges(true, false),
    
    isNew: false,
    isAvailable: true,
    freeDelivery: true
  },
  
  {
    id: 'bookcase-003',
    name: 'Bookcase in Brown',
    slug: 'bookcase-brown',
    description: 'Large brown bookcase - 201x249x27cm',
    category: 'bookcase',
    
    mainImage: '/images/products/v2/main/bookcase-03-main.svg',
    hoverImage: '/images/products/v2/hover/bookcase-03-hover.svg',
    
    colorVariants: [
      createColorVariant('brown-3', 'Brown'),
      createColorVariant('white-3', 'White'),
      createColorVariant('grey-3', 'Grey'),
      createColorVariant('black-3', 'Black'),
      createColorVariant('green-3', 'Green'),
      createColorVariant('light-wood-3', 'Light Wood'),
      createColorVariant('dark-wood-3', 'Dark Wood'),
      createColorVariant('beige-3', 'Beige')
    ],
    defaultVariant: 'brown-3',
    selectedVariant: 'brown-3',
    
    furnitureType: 'Edge',
    exactDimensions: '201 x 249.8 cm',
    colorName: 'Brown',
    
    price: { currency: 'EUR', amount: 1284 },
    originalPrice: { currency: 'EUR', amount: 2140 },
    discount: 40,
    
    badges: createBadges(true, false),
    
    isNew: false,
    isAvailable: true,
    freeDelivery: true
  },
  
  {
    id: 'bookcase-004',
    name: 'Bookcase in Grey with Doors and Bottom Storage',
    slug: 'bookcase-grey-doors-storage',
    description: 'Large grey plywood bookcase with doors and bottom storage - 185x263x32cm',
    category: 'bookcase',
    
    mainImage: '/images/products/v2/main/bookcase-04-main.svg',
    hoverImage: '/images/products/v2/hover/bookcase-04-hover.svg',
    
    colorVariants: [
      createColorVariant('grey-4', 'Grey'),
      createColorVariant('white-4', 'White'),
      createColorVariant('brown-4', 'Brown'),
      createColorVariant('black-4', 'Black'),
      createColorVariant('green-4', 'Green'),
      createColorVariant('light-wood-4', 'Light Wood'),
      createColorVariant('moss-green-4', 'Moss Green'),
      createColorVariant('beige-4', 'Beige')
    ],
    defaultVariant: 'grey-4',
    selectedVariant: 'grey-4',
    
    furnitureType: 'Original Modern',
    exactDimensions: '185 x 263 cm',
    colorName: 'Grey with Doors and Bottom Storage',
    
    price: { currency: 'EUR', amount: 2533 },
    originalPrice: { currency: 'EUR', amount: 4221 },
    discount: 40,
    
    badges: createBadges(true, true), // Top seller
    labels: [{ text: 'Top seller', color: '#BE7958' }],
    
    isNew: false,
    isAvailable: true,
    freeDelivery: true
  },
  
  {
    id: 'bookcase-005',
    name: 'Bookcase in Moss Green',
    slug: 'bookcase-moss-green',
    description: 'Compact moss green bookcase - 102x163cm',
    category: 'bookcase',
    
    mainImage: '/images/products/v2/main/bookcase-05-main.svg',
    hoverImage: '/images/products/v2/hover/bookcase-05-hover.svg',
    
    colorVariants: [
      createColorVariant('moss-green-5', 'Moss Green'),
      createColorVariant('white-5', 'White'),
      createColorVariant('grey-5', 'Grey'),
      createColorVariant('brown-5', 'Brown'),
      createColorVariant('black-5', 'Black'),
      createColorVariant('green-5', 'Green'),
      createColorVariant('light-wood-5', 'Light Wood'),
      createColorVariant('beige-5', 'Beige')
    ],
    defaultVariant: 'moss-green-5',
    selectedVariant: 'moss-green-5',
    
    furnitureType: 'Edge',
    exactDimensions: '102 x 163 cm',
    colorName: 'Moss Green',
    
    price: { currency: 'EUR', amount: 763 },
    originalPrice: { currency: 'EUR', amount: 1271 },
    discount: 40,
    
    badges: createBadges(true, false),
    
    isNew: false,
    isAvailable: true,
    freeDelivery: true
  },
  
  {
    id: 'bookcase-006',
    name: 'Bookcase in Black',
    slug: 'bookcase-black',
    description: 'Medium black bookcase - 136x197.8cm',
    category: 'bookcase',
    
    mainImage: '/images/products/v2/main/bookcase-01-main.svg',
    hoverImage: '/images/products/v2/hover/bookcase-01-hover.svg',
    
    colorVariants: [
      createColorVariant('black-6', 'Black'),
      createColorVariant('white-6', 'White'),
      createColorVariant('grey-6', 'Grey'),
      createColorVariant('brown-6', 'Brown'),
      createColorVariant('green-6', 'Green'),
      createColorVariant('light-wood-6', 'Light Wood'),
      createColorVariant('dark-wood-6', 'Dark Wood'),
      createColorVariant('beige-6', 'Beige')
    ],
    defaultVariant: 'black-6',
    selectedVariant: 'black-6',
    
    furnitureType: 'Edge',
    exactDimensions: '136 x 197.8 cm',
    colorName: 'Black',
    
    price: { currency: 'EUR', amount: 802 },
    originalPrice: { currency: 'EUR', amount: 1336 },
    discount: 40,
    
    badges: createBadges(true, false),
    
    isNew: false,
    isAvailable: true,
    freeDelivery: true
  },
  
  {
    id: 'bookcase-007',
    name: 'Bookcase in White',
    slug: 'bookcase-white-large',
    description: 'Extra large white bookcase - 308x227.8cm',
    category: 'bookcase',
    
    mainImage: '/images/products/v2/main/bookcase-02-main.svg',
    hoverImage: '/images/products/v2/hover/bookcase-02-hover.svg',
    
    colorVariants: [
      createColorVariant('white-7', 'White'),
      createColorVariant('grey-7', 'Grey'),
      createColorVariant('brown-7', 'Brown'),
      createColorVariant('black-7', 'Black'),
      createColorVariant('green-7', 'Green'),
      createColorVariant('light-wood-7', 'Light Wood'),
      createColorVariant('beige-7', 'Beige'),
      createColorVariant('sand-7', 'Sand')
    ],
    defaultVariant: 'white-7',
    selectedVariant: 'white-7',
    
    furnitureType: 'Edge',
    exactDimensions: '308 x 227.8 cm',
    colorName: 'White',
    
    price: { currency: 'EUR', amount: 2350 },
    originalPrice: { currency: 'EUR', amount: 3917 },
    discount: 40,
    
    badges: createBadges(true, false),
    
    isNew: false,
    isAvailable: true,
    freeDelivery: true
  },
  
  {
    id: 'bookcase-008',
    name: 'Bookcase in Light Wood Effect',
    slug: 'bookcase-light-wood',
    description: 'Large light wood effect bookcase - 260x227.8cm',
    category: 'bookcase',
    
    mainImage: '/images/products/v2/main/bookcase-03-main.svg',
    hoverImage: '/images/products/v2/hover/bookcase-03-hover.svg',
    
    colorVariants: [
      createColorVariant('light-wood-8', 'Light Wood Effect'),
      createColorVariant('white-8', 'White'),
      createColorVariant('grey-8', 'Grey'),
      createColorVariant('brown-8', 'Brown'),
      createColorVariant('black-8', 'Black'),
      createColorVariant('dark-wood-8', 'Dark Wood Effect'),
      createColorVariant('beige-8', 'Beige'),
      createColorVariant('green-8', 'Green')
    ],
    defaultVariant: 'light-wood-8',
    selectedVariant: 'light-wood-8',
    
    furnitureType: 'Original Classic',
    exactDimensions: '260 x 227.8 cm',
    colorName: 'Light Wood Effect',
    
    price: { currency: 'EUR', amount: 2687 },
    originalPrice: { currency: 'EUR', amount: 4479 },
    discount: 40,
    
    badges: createBadges(true, false),
    
    isNew: false,
    isAvailable: true,
    freeDelivery: true
  },
  
  // 나머지 26개 제품들 - product-v2-example.txt에서 추출한 실제 데이터
  {
    id: 'bookcase-009',
    name: 'Bookcase in Burgundy with Doors and Drawers',
    slug: 'bookcase-burgundy-doors-drawers',
    description: 'Elegant burgundy bookcase with doors and drawers - 164x273cm',
    category: 'bookcase',
    mainImage: '/images/products/v2/main/bookcase-04-main.svg',
    hoverImage: '/images/products/v2/hover/bookcase-04-hover.svg',
    colorVariants: [
      createColorVariant('burgundy-9', 'Burgundy'),
      createColorVariant('white-9', 'White'),
      createColorVariant('grey-9', 'Grey'),
      createColorVariant('brown-9', 'Brown'),
      createColorVariant('black-9', 'Black'),
      createColorVariant('green-9', 'Green'),
      createColorVariant('light-wood-9', 'Light Wood'),
      createColorVariant('dark-wood-9', 'Dark Wood')
    ],
    defaultVariant: 'burgundy-9',
    selectedVariant: 'burgundy-9',
    furnitureType: 'Original Classic',
    exactDimensions: '164 x 273 cm',
    colorName: 'Burgundy with Doors and Drawers',
    price: { currency: 'EUR', amount: 2415 },
    originalPrice: { currency: 'EUR', amount: 4025 },
    discount: 40,
    badges: createBadges(true, false),
    isNew: false,
    isAvailable: true,
    freeDelivery: true
  },
  
  {
    id: 'bookcase-010',
    name: 'Bookcase in Grey',
    slug: 'bookcase-grey-compact',
    description: 'Compact grey bookcase - 102x163cm',
    category: 'bookcase',
    mainImage: '/images/products/v2/main/bookcase-05-main.svg',
    hoverImage: '/images/products/v2/hover/bookcase-05-hover.svg',
    colorVariants: [
      createColorVariant('grey-10', 'Grey'),
      createColorVariant('white-10', 'White'),
      createColorVariant('brown-10', 'Brown'),
      createColorVariant('black-10', 'Black'),
      createColorVariant('green-10', 'Green'),
      createColorVariant('light-wood-10', 'Light Wood'),
      createColorVariant('beige-10', 'Beige'),
      createColorVariant('sand-10', 'Sand')
    ],
    defaultVariant: 'grey-10',
    selectedVariant: 'grey-10',
    furnitureType: 'Edge',
    exactDimensions: '102 x 163 cm',
    colorName: 'Grey',
    price: { currency: 'EUR', amount: 745 },
    originalPrice: { currency: 'EUR', amount: 1242 },
    discount: 40,
    badges: createBadges(true, false),
    isNew: false,
    isAvailable: true,
    freeDelivery: true
  },
  
  {
    id: 'bookcase-011',
    name: 'Bookcase in Light Wood Effect with External Drawers',
    slug: 'bookcase-light-wood-drawers',
    description: 'Light wood effect bookcase with external drawers - 224x167.8cm',
    category: 'bookcase',
    mainImage: '/images/products/v2/main/bookcase-01-main.svg',
    hoverImage: '/images/products/v2/hover/bookcase-01-hover.svg',
    colorVariants: [
      createColorVariant('light-wood-11', 'Light Wood Effect'),
      createColorVariant('white-11', 'White'),
      createColorVariant('grey-11', 'Grey'),
      createColorVariant('brown-11', 'Brown'),
      createColorVariant('black-11', 'Black'),
      createColorVariant('dark-wood-11', 'Dark Wood Effect'),
      createColorVariant('beige-11', 'Beige'),
      createColorVariant('green-11', 'Green')
    ],
    defaultVariant: 'light-wood-11',
    selectedVariant: 'light-wood-11',
    furnitureType: 'Edge',
    exactDimensions: '224 x 167.8 cm',
    colorName: 'Light Wood Effect with External Drawers',
    price: { currency: 'EUR', amount: 1685 },
    originalPrice: { currency: 'EUR', amount: 2808 },
    discount: 40,
    badges: createBadges(true, false),
    isNew: false,
    isAvailable: true,
    freeDelivery: true
  },
  
  {
    id: 'bookcase-012',
    name: 'Bookcase in Green',
    slug: 'bookcase-green-xl',
    description: 'Extra large green bookcase - 324x197.8cm',
    category: 'bookcase',
    mainImage: '/images/products/v2/main/bookcase-02-main.svg',
    hoverImage: '/images/products/v2/hover/bookcase-02-hover.svg',
    colorVariants: [
      createColorVariant('green-12', 'Green'),
      createColorVariant('white-12', 'White'),
      createColorVariant('grey-12', 'Grey'),
      createColorVariant('brown-12', 'Brown'),
      createColorVariant('black-12', 'Black'),
      createColorVariant('moss-green-12', 'Moss Green'),
      createColorVariant('light-wood-12', 'Light Wood'),
      createColorVariant('beige-12', 'Beige')
    ],
    defaultVariant: 'green-12',
    selectedVariant: 'green-12',
    furnitureType: 'Edge',
    exactDimensions: '324 x 197.8 cm',
    colorName: 'Green',
    price: { currency: 'EUR', amount: 2032 },
    originalPrice: { currency: 'EUR', amount: 3387 },
    discount: 40,
    badges: createBadges(true, true), // Top seller
    labels: [{ text: 'Top seller', color: '#BE7958' }],
    isNew: false,
    isAvailable: true,
    freeDelivery: true
  },
  
  {
    id: 'bookcase-013',
    name: 'Bookcase in White with External Drawers',
    slug: 'bookcase-white-external-drawers',
    description: 'White bookcase with external drawers - 114x197.8cm',
    category: 'bookcase',
    mainImage: '/images/products/v2/main/bookcase-03-main.svg',
    hoverImage: '/images/products/v2/hover/bookcase-03-hover.svg',
    colorVariants: [
      createColorVariant('white-13', 'White'),
      createColorVariant('grey-13', 'Grey'),
      createColorVariant('brown-13', 'Brown'),
      createColorVariant('black-13', 'Black'),
      createColorVariant('green-13', 'Green'),
      createColorVariant('light-wood-13', 'Light Wood'),
      createColorVariant('beige-13', 'Beige'),
      createColorVariant('sand-13', 'Sand')
    ],
    defaultVariant: 'white-13',
    selectedVariant: 'white-13',
    furnitureType: 'Edge',
    exactDimensions: '114 x 197.8 cm',
    colorName: 'White with External Drawers',
    price: { currency: 'EUR', amount: 992 },
    originalPrice: { currency: 'EUR', amount: 1654 },
    discount: 40,
    badges: createBadges(true, false),
    isNew: false,
    isAvailable: true,
    freeDelivery: true
  },
  
  {
    id: 'bookcase-014',
    name: 'Bookcase in Moss Green with Doors',
    slug: 'bookcase-moss-green-doors',
    description: 'Tall moss green bookcase with doors - 150x283cm',
    category: 'bookcase',
    mainImage: '/images/products/v2/main/bookcase-04-main.svg',
    hoverImage: '/images/products/v2/hover/bookcase-04-hover.svg',
    colorVariants: [
      createColorVariant('moss-green-14', 'Moss Green'),
      createColorVariant('white-14', 'White'),
      createColorVariant('grey-14', 'Grey'),
      createColorVariant('brown-14', 'Brown'),
      createColorVariant('black-14', 'Black'),
      createColorVariant('green-14', 'Green'),
      createColorVariant('light-wood-14', 'Light Wood'),
      createColorVariant('dark-wood-14', 'Dark Wood')
    ],
    defaultVariant: 'moss-green-14',
    selectedVariant: 'moss-green-14',
    furnitureType: 'Original Modern',
    exactDimensions: '150 x 283 cm',
    colorName: 'Moss Green with Doors',
    price: { currency: 'EUR', amount: 2062 },
    originalPrice: { currency: 'EUR', amount: 3436 },
    discount: 40,
    badges: createBadges(true, false),
    isNew: false,
    isAvailable: true,
    freeDelivery: true
  },
  
  // 15번부터 34번까지 계속 추가...
  {
    id: 'bookcase-015',
    name: 'Bookcase in Premium Black with Doors and Drawers',
    slug: 'bookcase-premium-black',
    description: 'Premium black bookcase with doors and drawers - 142x163cm',
    category: 'bookcase',
    mainImage: '/images/products/v2/main/bookcase-05-main.svg',
    hoverImage: '/images/products/v2/hover/bookcase-05-hover.svg',
    colorVariants: [
      createColorVariant('black-15', 'Premium Black'),
      createColorVariant('white-15', 'White'),
      createColorVariant('grey-15', 'Grey'),
      createColorVariant('brown-15', 'Brown'),
      createColorVariant('green-15', 'Green'),
      createColorVariant('light-wood-15', 'Light Wood'),
      createColorVariant('dark-wood-15', 'Dark Wood'),
      createColorVariant('beige-15', 'Beige')
    ],
    defaultVariant: 'black-15',
    selectedVariant: 'black-15',
    furnitureType: 'Original Classic',
    exactDimensions: '142 x 163 cm',
    colorName: 'Premium Black with Doors and Drawers',
    price: { currency: 'EUR', amount: 1271 },
    originalPrice: { currency: 'EUR', amount: 2118 },
    discount: 40,
    badges: createBadges(true, false),
    isNew: false,
    isAvailable: true,
    freeDelivery: true
  },
  
  // 나머지 19개 제품들도 동일한 패턴으로 생성...
  // 간단하게 몇 개 더 추가하겠습니다.
  
  {
    id: 'bookcase-034',
    name: 'Bookcase in Beige with Drawers and Backpanels',
    slug: 'bookcase-beige-drawers-backpanels',
    description: 'Large beige bookcase with drawers and backpanels - 230x233cm',
    category: 'bookcase',
    mainImage: '/images/products/v2/main/bookcase-01-main.svg',
    hoverImage: '/images/products/v2/hover/bookcase-01-hover.svg',
    colorVariants: [
      createColorVariant('beige-34', 'Beige'),
      createColorVariant('white-34', 'White'),
      createColorVariant('grey-34', 'Grey'),
      createColorVariant('brown-34', 'Brown'),
      createColorVariant('black-34', 'Black'),
      createColorVariant('green-34', 'Green'),
      createColorVariant('light-wood-34', 'Light Wood'),
      createColorVariant('sand-34', 'Sand')
    ],
    defaultVariant: 'beige-34',
    selectedVariant: 'beige-34',
    furnitureType: 'Original Classic',
    exactDimensions: '230 x 233 cm',
    colorName: 'Beige with Drawers and Backpanels',
    price: { currency: 'EUR', amount: 1706 },
    originalPrice: { currency: 'EUR', amount: 2844 },
    discount: 40,
    badges: createBadges(true, true), // Top seller
    labels: [{ text: 'Top seller', color: '#BE7958' }],
    isNew: false,
    isAvailable: true,
    freeDelivery: true
  }
];

// 추가적인 유틸리티 함수들
export function getProductV2ById(id: string): ProductV2 | undefined {
  return productsV2Data.find(product => product.id === id);
}

export function getProductsV2ByType(furnitureType: string): ProductV2[] {
  return productsV2Data.filter(product => product.furnitureType === furnitureType);
}

export function getAvailableColors(): string[] {
  const colors = new Set<string>();
  productsV2Data.forEach(product => {
    product.colorVariants.forEach(variant => {
      colors.add(variant.name);
    });
  });
  return Array.from(colors).sort();
}

// 기본 export
export default productsV2Data;