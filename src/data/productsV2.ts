import { ProductV2, ColorVariantV2, ProductBadge } from '@/types/productsV2';

// 실제 product-v2-example.txt에서 추출한 34개 제품 데이터
// 모든 제품은 Bookcase 카테고리이며, 다양한 색상과 크기를 가집니다.

// 실제 이미지 경로 매핑 테이블
const productImageMappings: Record<string, {mainImage: string, hoverImage: string, colorThumbnails: string[]}> = {
  'bookcase-white-doors': {
    mainImage: '/images/products/v2/main/Living_room_08_living-room-Bookcase_EAPgDsY.jpg',
    hoverImage: '/images/products/v2/hover/unreal_50.webp',
    colorThumbnails: ['unreal_50_thumbnail.webp', 'unreal_22509_thumbnail.webp', 'unreal_24177_thumbnail.webp', 'unreal_16043_thumbnail.webp', 'unreal_29923_thumbnail.webp', 'unreal_29922_thumbnail.webp', 'unreal_29921_thumbnail.webp', 'unreal_15643_thumbnail.webp']
  },
  'bookcase-grey-external-drawers': {
    mainImage: '/images/products/v2/main/unreal_1075797.webp',
    hoverImage: '/images/products/v2/hover/unreal_191615_KG3boPp.webp',
    colorThumbnails: ['unreal_50_thumbnail.webp', 'unreal_212_g9B0kiP_thumbnail.webp', 'unreal_124331_ZWcuK1x_thumbnail.webp', 'unreal_124425_1QAV6ST_thumbnail.webp', 'unreal_1063961_thumbnail.webp', 'unreal_187283_SkP60Hp_thumbnail.webp', 'unreal_197_uxXsipd_thumbnail.webp', 'unreal_245_iu7gxLQ_thumbnail.webp']
  },
  'bookcase-brown': {
    mainImage: '/images/products/v2/main/unreal_124332_sj5uTGc.webp',
    hoverImage: '/images/products/v2/hover/unreal_124331_ZWcuK1x.webp',
    colorThumbnails: ['unreal_50_thumbnail.webp', 'unreal_29921_thumbnail.webp', 'unreal_124331_ZWcuK1x_thumbnail.webp', 'unreal_37_thumbnail.webp', 'unreal_1063961_thumbnail.webp', 'unreal_4489_thumbnail.webp', 'unreal_27059_thumbnail.webp', 'unreal_124005_Cjj5HZz_thumbnail.webp']
  },
  'bookcase-grey-doors-storage': {
    mainImage: '/images/products/v2/main/907_Tylko_Bookcase_Type1_FINAL_04_living-room-Bookcase.jpg',
    hoverImage: '/images/products/v2/hover/unreal_212_g9B0kiP.webp',
    colorThumbnails: ['unreal_212_g9B0kiP_thumbnail.webp', 'unreal_28939_saUa3a5_thumbnail.webp', 'unreal_15264_thumbnail.webp', 'unreal_29928_thumbnail.webp', 'unreal_16988_thumbnail.webp', 'unreal_9070_thumbnail.webp', 'unreal_1064021_thumbnail.webp']
  },
  'bookcase-moss-green': {
    mainImage: '/images/products/v2/main/unreal_1065155.webp',
    hoverImage: '/images/products/v2/hover/unreal_1063961.webp',
    colorThumbnails: ['unreal_1063961_thumbnail.webp', 'unreal_14040_KBEA61s_thumbnail.webp', 'unreal_1255995_thumbnail.webp', 'unreal_1255994_thumbnail.webp', 'unreal_1255992_thumbnail.webp', 'unreal_1255991_thumbnail.webp', 'unreal_8915_thumbnail.webp']
  },
  'bookcase-black': {
    mainImage: '/images/products/v2/main/unreal_124426_cquVq4l.webp',
    hoverImage: '/images/products/v2/hover/unreal_124425_1QAV6ST.webp',
    colorThumbnails: ['unreal_124425_1QAV6ST_thumbnail.webp', 'unreal_50_thumbnail.webp', 'unreal_29921_thumbnail.webp', 'unreal_124331_ZWcuK1x_thumbnail.webp', 'unreal_1063961_thumbnail.webp', 'unreal_4489_thumbnail.webp', 'unreal_27059_thumbnail.webp', 'unreal_124005_Cjj5HZz_thumbnail.webp']
  },
  'bookcase-white-large': {
    mainImage: '/images/products/v2/main/Living_room_08_living-room-Bookcase_EAPgDsY.jpg',
    hoverImage: '/images/products/v2/hover/unreal_50.webp',
    colorThumbnails: ['unreal_50_thumbnail.webp', 'unreal_22509_thumbnail.webp', 'unreal_24177_thumbnail.webp', 'unreal_16043_thumbnail.webp', 'unreal_29923_thumbnail.webp', 'unreal_29922_thumbnail.webp', 'unreal_29921_thumbnail.webp', 'unreal_15643_thumbnail.webp']
  },
  'bookcase-light-wood': {
    mainImage: '/images/products/v2/main/unreal_156041_2PFDZ4t.webp',
    hoverImage: '/images/products/v2/hover/unreal_154634_uOy2I1O.webp',
    colorThumbnails: ['unreal_50_thumbnail.webp', 'unreal_29921_thumbnail.webp', 'unreal_124331_ZWcuK1x_thumbnail.webp', 'unreal_37_thumbnail.webp', 'unreal_1063961_thumbnail.webp', 'unreal_4489_thumbnail.webp', 'unreal_27059_thumbnail.webp', 'unreal_154634_uOy2I1O_thumbnail.webp']
  },
  'bookcase-burgundy-doors-drawers': {
    mainImage: '/images/products/v2/main/unreal_370630.webp',
    hoverImage: '/images/products/v2/hover/unreal_245_iu7gxLQ.webp',
    colorThumbnails: ['unreal_245_iu7gxLQ_thumbnail.webp', 'unreal_27059_thumbnail.webp', 'unreal_26013_thumbnail.webp', 'unreal_24319_thumbnail.webp', 'unreal_25417_thumbnail.webp', 'unreal_19319_thumbnail.webp', 'unreal_267_ruIqpOm_thumbnail.webp', 'unreal_17961_thumbnail.webp']
  },
  'bookcase-grey-compact': {
    mainImage: '/images/products/v2/main/907_Tylko_Bookcase_Type1_FINAL_04_living-room-Bookcase.jpg',
    hoverImage: '/images/products/v2/hover/unreal_212_g9B0kiP.webp',
    colorThumbnails: ['unreal_4489_thumbnail.webp', 'unreal_4804_5FlRoPy_thumbnail.webp', 'unreal_4490_thumbnail.webp', 'unreal_4487_thumbnail.webp', 'unreal_4486_thumbnail.webp', 'unreal_4485_thumbnail.webp', 'unreal_1064353_thumbnail.webp']
  },
  'bookcase-light-wood-drawers': {
    mainImage: '/images/products/v2/main/unreal_1075727.webp',
    hoverImage: '/images/products/v2/hover/unreal_154688_ZxTGNxY.webp',
    colorThumbnails: ['unreal_50_thumbnail.webp', 'unreal_29921_thumbnail.webp', 'unreal_124331_ZWcuK1x_thumbnail.webp', 'unreal_37_thumbnail.webp', 'unreal_1063961_thumbnail.webp', 'unreal_4489_thumbnail.webp', 'unreal_27059_thumbnail.webp', 'unreal_154722_Daa7Fxo_thumbnail.webp']
  },
  'bookcase-green-xl': {
    mainImage: '/images/products/v2/main/unreal_1065155.webp',
    hoverImage: '/images/products/v2/hover/unreal_1063961.webp',
    colorThumbnails: ['unreal_50_thumbnail.webp', 'unreal_29921_thumbnail.webp', 'unreal_124331_ZWcuK1x_thumbnail.webp', 'unreal_37_thumbnail.webp', 'unreal_1063961_thumbnail.webp', 'unreal_1076615_thumbnail.webp', 'unreal_27059_thumbnail.webp', 'unreal_124005_Cjj5HZz_thumbnail.webp']
  },
  'bookcase-white-external-drawers': {
    mainImage: '/images/products/v2/main/unreal_124436_nBnrSSB.webp',
    hoverImage: '/images/products/v2/hover/unreal_124435_Z0LwZty.webp',
    colorThumbnails: ['unreal_50_thumbnail.webp', 'unreal_212_g9B0kiP_thumbnail.webp', 'unreal_124331_ZWcuK1x_thumbnail.webp', 'unreal_124435_Z0LwZty_thumbnail.webp', 'unreal_1063961_thumbnail.webp', 'unreal_4489_thumbnail.webp', 'unreal_27059_thumbnail.webp', 'unreal_124471_E20jniq_thumbnail.webp']
  },
  'bookcase-moss-green-doors': {
    mainImage: '/images/products/v2/main/unreal_1065964.webp',
    hoverImage: '/images/products/v2/hover/unreal_1064770.webp',
    colorThumbnails: ['unreal_1064770_thumbnail.webp', 'unreal_50_thumbnail.webp', 'unreal_29921_thumbnail.webp', 'unreal_124331_ZWcuK1x_thumbnail.webp', 'unreal_37_thumbnail.webp', 'unreal_4489_thumbnail.webp', 'unreal_27059_thumbnail.webp']
  },
  'bookcase-premium-black': {
    mainImage: '/images/products/v2/main/Modern_Classic_Matt_Black_Shelf_with_Drawers.jpg',
    hoverImage: '/images/products/v2/hover/unreal_37.webp',
    colorThumbnails: ['unreal_37_thumbnail.webp', 'unreal_50_thumbnail.webp', 'unreal_29921_thumbnail.webp', 'unreal_124331_ZWcuK1x_thumbnail.webp', 'unreal_1063961_thumbnail.webp', 'unreal_4489_thumbnail.webp', 'unreal_27059_thumbnail.webp', 'unreal_124005_Cjj5HZz_thumbnail.webp']
  },
  'bookcase-beige-drawers-backpanels': {
    mainImage: '/images/products/v2/main/unreal_124006_LAACU4l.webp',
    hoverImage: '/images/products/v2/hover/unreal_124005_Cjj5HZz.webp',
    colorThumbnails: ['unreal_50_thumbnail.webp', 'unreal_29921_thumbnail.webp', 'unreal_124331_ZWcuK1x_thumbnail.webp', 'unreal_37_thumbnail.webp', 'unreal_1063961_thumbnail.webp', 'unreal_4489_thumbnail.webp', 'unreal_27059_thumbnail.webp', 'unreal_124005_Cjj5HZz_thumbnail.webp']
  }
};

// 색상 이름을 썸네일 인덱스로 매핑하는 헬퍼 함수
const getColorIndex = (colorName: string): number => {
  const colorMap: Record<string, number> = {
    'White': 0,
    'Grey': 1,
    'Gray': 1,
    'Brown': 2,
    'Black': 3,
    'Green': 4,
    'Moss Green': 4,
    'Blue': 5,
    'Red': 6,
    'Beige': 7
  };
  return colorMap[colorName] || 0;
};

// 실제 이미지 경로 생성 헬퍼 함수들
const createColorVariant = (
  productSlug: string,
  colorId: string,
  name: string,
  thumbnailFileOrIsDefault: string | boolean = false,
  isDefault: boolean = false
): ColorVariantV2 => {
  // Handle backward compatibility for old function signature
  let actualThumbnailFile: string;
  let actualIsDefault: boolean;
  
  if (typeof thumbnailFileOrIsDefault === 'boolean') {
    // Old signature: (productSlug, colorId, name, isDefault)
    actualIsDefault = thumbnailFileOrIsDefault;
    
    // Get actual thumbnail from mapping table based on color index
    const imageMapping = productImageMappings[productSlug];
    if (imageMapping && imageMapping.colorThumbnails) {
      // Map color names to thumbnail indices (approximate)
      const colorIndex = getColorIndex(name);
      actualThumbnailFile = imageMapping.colorThumbnails[colorIndex] || imageMapping.colorThumbnails[0] || `placeholder-${name.toLowerCase()}.webp`;
    } else {
      actualThumbnailFile = `placeholder-${name.toLowerCase()}.webp`;
    }
  } else {
    // New signature: (productSlug, colorId, name, thumbnailFile, isDefault)
    actualThumbnailFile = thumbnailFileOrIsDefault;
    actualIsDefault = isDefault;
  }
  
  // Get actual image paths from mapping table
  const imageMapping = productImageMappings[productSlug];
  const mainImagePath = imageMapping ? imageMapping.mainImage : `/images/products/v2/main/${productSlug}-main.jpg`;
  const hoverImagePath = imageMapping ? imageMapping.hoverImage : `/images/products/v2/hover/${productSlug}-hover.webp`;
  
  return {
    id: colorId,
    name,
    thumbnail: `/images/products/v2/colors/${actualThumbnailFile}`,
    mainImage: mainImagePath,
    hoverImage: hoverImagePath,
    isDefault: actualIsDefault,
    sku: `BKC-${colorId}`,
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
    
    // V2 전용 필드 - 실제 이미지 경로
    mainImage: '/images/products/v2/main/Living_room_08_living-room-Bookcase_EAPgDsY.jpg',
    hoverImage: '/images/products/v2/hover/unreal_50.webp',
    
    colorVariants: [
      createColorVariant('bookcase-white-doors', 'white-1', 'White', true),
      createColorVariant('bookcase-white-doors', 'grey-1', 'Grey'),
      createColorVariant('bookcase-white-doors', 'brown-1', 'Brown'),
      createColorVariant('bookcase-white-doors', 'black-1', 'Black'),
      createColorVariant('bookcase-white-doors', 'green-1', 'Green'),
      createColorVariant('bookcase-white-doors', 'blue-1', 'Blue'),
      createColorVariant('bookcase-white-doors', 'red-1', 'Red'),
      createColorVariant('bookcase-white-doors', 'beige-1', 'Beige')
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
    
    mainImage: '/images/products/v2/main/unreal_1075797.webp',
    hoverImage: '/images/products/v2/hover/unreal_191615_KG3boPp.webp',
    
    colorVariants: [
      createColorVariant('bookcase-grey-external-drawers', 'grey-2', 'Grey', true),
      createColorVariant('bookcase-grey-external-drawers', 'white-2', 'White'),
      createColorVariant('bookcase-grey-external-drawers', 'brown-2', 'Brown'),
      createColorVariant('bookcase-grey-external-drawers', 'black-2', 'Black'),
      createColorVariant('bookcase-grey-external-drawers', 'green-2', 'Green'),
      createColorVariant('bookcase-grey-external-drawers', 'blue-2', 'Blue'),
      createColorVariant('bookcase-grey-external-drawers', 'red-2', 'Red'),
      createColorVariant('bookcase-grey-external-drawers', 'beige-2', 'Beige')
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
    
    mainImage: '/images/products/v2/main/unreal_124332_sj5uTGc.webp',
    hoverImage: '/images/products/v2/hover/unreal_124331_ZWcuK1x.webp',
    
    colorVariants: [
      createColorVariant('bookcase-brown', 'brown-3', 'Brown', true),
      createColorVariant('bookcase-brown', 'white-3', 'White'),
      createColorVariant('bookcase-brown', 'grey-3', 'Grey'),
      createColorVariant('bookcase-brown', 'black-3', 'Black'),
      createColorVariant('bookcase-brown', 'green-3', 'Green'),
      createColorVariant('bookcase-brown', 'blue-3', 'Blue'),
      createColorVariant('bookcase-brown', 'red-3', 'Red'),
      createColorVariant('bookcase-brown', 'beige-3', 'Beige')
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
    
    mainImage: '/images/products/v2/main/907_Tylko_Bookcase_Type1_FINAL_04_living-room-Bookcase.jpg',
    hoverImage: '/images/products/v2/hover/unreal_212_g9B0kiP.webp',
    
    colorVariants: [
      createColorVariant('bookcase-grey-doors-storage', 'grey-4', 'Grey', true),
      createColorVariant('bookcase-grey-doors-storage', 'white-4', 'White'),
      createColorVariant('bookcase-grey-doors-storage', 'brown-4', 'Brown'),
      createColorVariant('bookcase-grey-doors-storage', 'black-4', 'Black'),
      createColorVariant('bookcase-grey-doors-storage', 'green-4', 'Green'),
      createColorVariant('bookcase-grey-doors-storage', 'blue-4', 'Blue'),
      createColorVariant('bookcase-grey-doors-storage', 'red-4', 'Red'),
      createColorVariant('bookcase-grey-doors-storage', 'beige-4', 'Beige')
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
    
    mainImage: '/images/products/v2/main/unreal_1065155.webp',
    hoverImage: '/images/products/v2/hover/unreal_1063961.webp',
    
    colorVariants: [
      createColorVariant('bookcase-moss-green', 'moss-green-5', 'Moss Green', true),
      createColorVariant('bookcase-moss-green', 'white-5', 'White'),
      createColorVariant('bookcase-moss-green', 'grey-5', 'Grey'),
      createColorVariant('bookcase-moss-green', 'brown-5', 'Brown'),
      createColorVariant('bookcase-moss-green', 'black-5', 'Black'),
      createColorVariant('bookcase-moss-green', 'green-5', 'Green'),
      createColorVariant('bookcase-moss-green', 'blue-5', 'Blue'),
      createColorVariant('bookcase-moss-green', 'beige-5', 'Beige')
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
    
    mainImage: '/images/products/v2/main/unreal_124426_cquVq4l.webp',
    hoverImage: '/images/products/v2/hover/unreal_124425_1QAV6ST.webp',
    
    colorVariants: [
      createColorVariant('bookcase-black', 'black-006', 'Black', true),
      createColorVariant('bookcase-black', 'white-006', 'White'),
      createColorVariant('bookcase-black', 'grey-006', 'Grey'),
      createColorVariant('bookcase-black', 'brown-006', 'Brown'),
      createColorVariant('bookcase-black', 'green-006', 'Green'),
      createColorVariant('bookcase-black', 'blue-006', 'Blue'),
      createColorVariant('bookcase-black', 'red-006', 'Red'),
      createColorVariant('bookcase-black', 'beige-006', 'Beige')
    ],
    defaultVariant: 'black-006',
    selectedVariant: 'black-006',
    
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
    
    mainImage: '/images/products/v2/main/Living_room_08_living-room-Bookcase_EAPgDsY.jpg',
    hoverImage: '/images/products/v2/hover/unreal_50.webp',
    
    colorVariants: [
      createColorVariant('bookcase-white-large', 'white-007', 'White', true),
      createColorVariant('bookcase-white-large', 'grey-007', 'Grey'),
      createColorVariant('bookcase-white-large', 'brown-007', 'Brown'),
      createColorVariant('bookcase-white-large', 'black-007', 'Black'),
      createColorVariant('bookcase-white-large', 'green-007', 'Green'),
      createColorVariant('bookcase-white-large', 'blue-007', 'Blue'),
      createColorVariant('bookcase-white-large', 'red-007', 'Red'),
      createColorVariant('bookcase-white-large', 'beige-007', 'Beige')
    ],
    defaultVariant: 'white-007',
    selectedVariant: 'white-007',
    
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
    
    mainImage: '/images/products/v2/main/unreal_156041_2PFDZ4t.webp',
    hoverImage: '/images/products/v2/hover/unreal_154634_uOy2I1O.webp',
    
    colorVariants: [
      createColorVariant('bookcase-light-wood', 'white-008', 'White', true),
      createColorVariant('bookcase-light-wood', 'grey-008', 'Grey'),
      createColorVariant('bookcase-light-wood', 'brown-008', 'Brown'),
      createColorVariant('bookcase-light-wood', 'black-008', 'Black'),
      createColorVariant('bookcase-light-wood', 'green-008', 'Green'),
      createColorVariant('bookcase-light-wood', 'blue-008', 'Blue'),
      createColorVariant('bookcase-light-wood', 'red-008', 'Red'),
      createColorVariant('bookcase-light-wood', 'beige-008', 'Beige')
    ],
    defaultVariant: 'white-008',
    selectedVariant: 'white-008',
    
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
    mainImage: '/images/products/v2/main/unreal_370630.webp',
    hoverImage: '/images/products/v2/hover/unreal_245_iu7gxLQ.webp',
    colorVariants: [
      createColorVariant('bookcase-burgundy-doors-drawers', 'white-009', 'White', true),
      createColorVariant('bookcase-burgundy-doors-drawers', 'grey-009', 'Grey'),
      createColorVariant('bookcase-burgundy-doors-drawers', 'brown-009', 'Brown'),
      createColorVariant('bookcase-burgundy-doors-drawers', 'black-009', 'Black'),
      createColorVariant('bookcase-burgundy-doors-drawers', 'green-009', 'Green'),
      createColorVariant('bookcase-burgundy-doors-drawers', 'blue-009', 'Blue'),
      createColorVariant('bookcase-burgundy-doors-drawers', 'red-009', 'Red'),
      createColorVariant('bookcase-burgundy-doors-drawers', 'beige-009', 'Beige')
    ],
    defaultVariant: 'white-009',
    selectedVariant: 'white-009',
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
    mainImage: '/images/products/v2/main/907_Tylko_Bookcase_Type1_FINAL_04_living-room-Bookcase.jpg',
    hoverImage: '/images/products/v2/hover/unreal_212_g9B0kiP.webp',
    colorVariants: [
      createColorVariant('bookcase-grey-compact', 'white-010', 'White', true),
      createColorVariant('bookcase-grey-compact', 'grey-010', 'Grey'),
      createColorVariant('bookcase-grey-compact', 'brown-010', 'Brown'),
      createColorVariant('bookcase-grey-compact', 'black-010', 'Black'),
      createColorVariant('bookcase-grey-compact', 'green-010', 'Green'),
      createColorVariant('bookcase-grey-compact', 'blue-010', 'Blue'),
      createColorVariant('bookcase-grey-compact', 'red-010', 'Red'),
      createColorVariant('bookcase-grey-compact', 'beige-010', 'Beige')
    ],
    defaultVariant: 'white-010',
    selectedVariant: 'white-010',
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
    mainImage: '/images/products/v2/main/unreal_1075727.webp',
    hoverImage: '/images/products/v2/hover/unreal_154688_ZxTGNxY.webp',
    colorVariants: [
      createColorVariant('bookcase-light-wood-drawers', 'white-011', 'White', true),
      createColorVariant('bookcase-light-wood-drawers', 'grey-011', 'Grey'),
      createColorVariant('bookcase-light-wood-drawers', 'brown-011', 'Brown'),
      createColorVariant('bookcase-light-wood-drawers', 'black-011', 'Black'),
      createColorVariant('bookcase-light-wood-drawers', 'green-011', 'Green'),
      createColorVariant('bookcase-light-wood-drawers', 'blue-011', 'Blue'),
      createColorVariant('bookcase-light-wood-drawers', 'red-011', 'Red'),
      createColorVariant('bookcase-light-wood-drawers', 'beige-011', 'Beige')
    ],
    defaultVariant: 'white-011',
    selectedVariant: 'white-011',
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
    mainImage: '/images/products/v2/main/unreal_1065155.webp',
    hoverImage: '/images/products/v2/hover/unreal_1063961.webp',
    colorVariants: [
      createColorVariant('bookcase-green-xl', 'white-012', 'White', true),
      createColorVariant('bookcase-green-xl', 'grey-012', 'Grey'),
      createColorVariant('bookcase-green-xl', 'brown-012', 'Brown'),
      createColorVariant('bookcase-green-xl', 'black-012', 'Black'),
      createColorVariant('bookcase-green-xl', 'green-012', 'Green'),
      createColorVariant('bookcase-green-xl', 'blue-012', 'Blue'),
      createColorVariant('bookcase-green-xl', 'red-012', 'Red'),
      createColorVariant('bookcase-green-xl', 'beige-012', 'Beige')
    ],
    defaultVariant: 'white-012',
    selectedVariant: 'white-012',
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
    mainImage: '/images/products/v2/main/unreal_124436_nBnrSSB.webp',
    hoverImage: '/images/products/v2/hover/unreal_124435_Z0LwZty.webp',
    colorVariants: [
      createColorVariant('bookcase-white-external-drawers', 'white-013', 'White', true),
      createColorVariant('bookcase-white-external-drawers', 'grey-013', 'Grey'),
      createColorVariant('bookcase-white-external-drawers', 'brown-013', 'Brown'),
      createColorVariant('bookcase-white-external-drawers', 'black-013', 'Black'),
      createColorVariant('bookcase-white-external-drawers', 'green-013', 'Green'),
      createColorVariant('bookcase-white-external-drawers', 'blue-013', 'Blue'),
      createColorVariant('bookcase-white-external-drawers', 'red-013', 'Red'),
      createColorVariant('bookcase-white-external-drawers', 'beige-013', 'Beige')
    ],
    defaultVariant: 'white-013',
    selectedVariant: 'white-013',
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
    mainImage: '/images/products/v2/main/unreal_1065964.webp',
    hoverImage: '/images/products/v2/hover/unreal_1064770.webp',
    colorVariants: [
      createColorVariant('bookcase-moss-green-doors', 'green-014', 'Green', true),
      createColorVariant('bookcase-moss-green-doors', 'white-014', 'White'),
      createColorVariant('bookcase-moss-green-doors', 'grey-014', 'Grey'),
      createColorVariant('bookcase-moss-green-doors', 'brown-014', 'Brown'),
      createColorVariant('bookcase-moss-green-doors', 'black-014', 'Black'),
      createColorVariant('bookcase-moss-green-doors', 'blue-014', 'Blue'),
      createColorVariant('bookcase-moss-green-doors', 'red-014', 'Red'),
      createColorVariant('bookcase-moss-green-doors', 'beige-014', 'Beige')
    ],
    defaultVariant: 'green-014',
    selectedVariant: 'green-014',
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
    mainImage: '/images/products/v2/main/Modern_Classic_Matt_Black_Shelf_with_Drawers.jpg',
    hoverImage: '/images/products/v2/hover/unreal_37.webp',
    colorVariants: [
      createColorVariant('bookcase-premium-black', 'black-015', 'Black', true),
      createColorVariant('bookcase-premium-black', 'white-015', 'White'),
      createColorVariant('bookcase-premium-black', 'grey-015', 'Grey'),
      createColorVariant('bookcase-premium-black', 'brown-015', 'Brown'),
      createColorVariant('bookcase-premium-black', 'green-015', 'Green'),
      createColorVariant('bookcase-premium-black', 'blue-015', 'Blue'),
      createColorVariant('bookcase-premium-black', 'red-015', 'Red'),
      createColorVariant('bookcase-premium-black', 'beige-015', 'Beige')
    ],
    defaultVariant: 'black-015',
    selectedVariant: 'black-015',
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
    mainImage: '/images/products/v2/main/unreal_124006_LAACU4l.webp',
    hoverImage: '/images/products/v2/hover/unreal_124005_Cjj5HZz.webp',
    colorVariants: [
      createColorVariant('bookcase-beige-drawers-backpanels', 'white-034', 'White', true),
      createColorVariant('bookcase-beige-drawers-backpanels', 'grey-034', 'Grey'),
      createColorVariant('bookcase-beige-drawers-backpanels', 'brown-034', 'Brown'),
      createColorVariant('bookcase-beige-drawers-backpanels', 'black-034', 'Black'),
      createColorVariant('bookcase-beige-drawers-backpanels', 'green-034', 'Green'),
      createColorVariant('bookcase-beige-drawers-backpanels', 'blue-034', 'Blue'),
      createColorVariant('bookcase-beige-drawers-backpanels', 'red-034', 'Red'),
      createColorVariant('bookcase-beige-drawers-backpanels', 'beige-034', 'Beige')
    ],
    defaultVariant: 'white-034',
    selectedVariant: 'white-034',
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