// 임시 이미지 매핑 시스템 - product-v2-example.txt 기반
// 실제 이미지 제공 전까지 사용할 더미 이미지 시스템

export interface ImageSet {
  main: string;
  instagram: string;
  thumbnail: string;
}

export interface ColorImageMapping {
  [color: string]: ImageSet;
}

// bookcase 카테고리의 색상별 이미지 매핑
export const BOOKCASE_COLOR_MAPPINGS: ColorImageMapping = {
  // 기본 색상들
  white: {
    main: '/images/temp/bookcase-white-main.webp',
    instagram: '/images/temp/bookcase-white-lifestyle.webp',
    thumbnail: '/images/temp/bookcase-white-thumb.webp'
  },
  grey: {
    main: '/images/temp/bookcase-grey-main.webp',
    instagram: '/images/temp/bookcase-grey-lifestyle.webp',
    thumbnail: '/images/temp/bookcase-grey-thumb.webp'
  },
  brown: {
    main: '/images/temp/bookcase-brown-main.webp',
    instagram: '/images/temp/bookcase-brown-lifestyle.webp',
    thumbnail: '/images/temp/bookcase-brown-thumb.webp'
  },
  black: {
    main: '/images/temp/bookcase-black-main.webp',
    instagram: '/images/temp/bookcase-black-lifestyle.webp',
    thumbnail: '/images/temp/bookcase-black-thumb.webp'
  },
  green: {
    main: '/images/temp/bookcase-green-main.webp',
    instagram: '/images/temp/bookcase-green-lifestyle.webp',
    thumbnail: '/images/temp/bookcase-green-thumb.webp'
  },
  
  // 특별한 색상들
  'moss-green': {
    main: '/images/temp/bookcase-moss-green-main.webp',
    instagram: '/images/temp/bookcase-moss-green-lifestyle.webp',
    thumbnail: '/images/temp/bookcase-moss-green-thumb.webp'
  },
  'light-wood': {
    main: '/images/temp/bookcase-light-wood-main.webp',
    instagram: '/images/temp/bookcase-light-wood-lifestyle.webp',
    thumbnail: '/images/temp/bookcase-light-wood-thumb.webp'
  },
  'dark-wood': {
    main: '/images/temp/bookcase-dark-wood-main.webp',
    instagram: '/images/temp/bookcase-dark-wood-lifestyle.webp',
    thumbnail: '/images/temp/bookcase-dark-wood-thumb.webp'
  },
  burgundy: {
    main: '/images/temp/bookcase-burgundy-main.webp',
    instagram: '/images/temp/bookcase-burgundy-lifestyle.webp',
    thumbnail: '/images/temp/bookcase-burgundy-thumb.webp'
  },
  beige: {
    main: '/images/temp/bookcase-beige-main.webp',
    instagram: '/images/temp/bookcase-beige-lifestyle.webp',
    thumbnail: '/images/temp/bookcase-beige-thumb.webp'
  },
  sand: {
    main: '/images/temp/bookcase-sand-main.webp',
    instagram: '/images/temp/bookcase-sand-lifestyle.webp',
    thumbnail: '/images/temp/bookcase-sand-thumb.webp'
  },
  pink: {
    main: '/images/temp/bookcase-pink-main.webp',
    instagram: '/images/temp/bookcase-pink-lifestyle.webp',
    thumbnail: '/images/temp/bookcase-pink-thumb.webp'
  },
  blue: {
    main: '/images/temp/bookcase-blue-main.webp',
    instagram: '/images/temp/bookcase-blue-lifestyle.webp',
    thumbnail: '/images/temp/bookcase-blue-thumb.webp'
  }
};

// 전체 카테고리별 이미지 매핑
export const CATEGORY_IMAGE_MAPPINGS = {
  bookcase: BOOKCASE_COLOR_MAPPINGS,
  // 추후 다른 카테고리 추가 시 사용
  furniture: BOOKCASE_COLOR_MAPPINGS, // 기본값으로 bookcase 사용
};

// 이미지 URL 생성 함수
export function getImageSet(category: string, color: string): ImageSet {
  const normalizedColor = color.toLowerCase().replace(/\s+/g, '-');
  const categoryMappings = CATEGORY_IMAGE_MAPPINGS[category as keyof typeof CATEGORY_IMAGE_MAPPINGS];
  
  if (categoryMappings && categoryMappings[normalizedColor]) {
    return categoryMappings[normalizedColor];
  }
  
  // V2용 로컬 이미지 경로 사용 (placeholder SVG)
  return {
    main: `/images/products/v2/main/bookcase-01-main.svg`,
    instagram: `/images/products/v2/hover/bookcase-01-hover.svg`,
    thumbnail: `/images/products/v2/thumbnail/swatch-${normalizedColor}.svg`
  };
}

// ProductV2용 개선된 이미지 세트 생성
export function getImageSetV2(productId: string, colorName: string): ImageSet {
  const normalizedColor = colorName.toLowerCase().replace(/\s+/g, '-');
  const productIndex = productId.replace('bookcase-', '').padStart(2, '0');
  
  return {
    main: `/images/products/v2/main/bookcase-${productIndex}-main.svg`,
    instagram: `/images/products/v2/hover/bookcase-${productIndex}-hover.svg`,
    thumbnail: `/images/products/v2/thumbnail/swatch-${normalizedColor}.svg`
  };
}

// 특정 제품에 대한 모든 색상 이미지 생성
export function generateProductImages(category: string, colors: string[]): ColorImageMapping {
  const imageMapping: ColorImageMapping = {};
  
  colors.forEach(color => {
    imageMapping[color] = getImageSet(category, color);
  });
  
  return imageMapping;
}

// 이미지 존재 여부 확인 (실제 구현에서는 서버 API 호출)
export function checkImageExists(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

// 폴백 이미지 URLs
export const FALLBACK_IMAGES = {
  main: '/images/temp/bookcase-default-main.webp',
  instagram: '/images/temp/bookcase-default-lifestyle.webp', 
  thumbnail: '/images/temp/bookcase-default-thumb.webp',
  placeholder: '/images/placeholder.jpg'
};

// 이미지 URL 유효성 검증 및 폴백 적용
export async function getValidImageSet(category: string, color: string): Promise<ImageSet> {
  const imageSet = getImageSet(category, color);
  
  // 실제 구현에서는 이미지 존재 여부를 확인하고 폴백 적용
  const mainExists = await checkImageExists(imageSet.main);
  const instagramExists = await checkImageExists(imageSet.instagram);
  const thumbnailExists = await checkImageExists(imageSet.thumbnail);
  
  return {
    main: mainExists ? imageSet.main : FALLBACK_IMAGES.main,
    instagram: instagramExists ? imageSet.instagram : FALLBACK_IMAGES.instagram,
    thumbnail: thumbnailExists ? imageSet.thumbnail : FALLBACK_IMAGES.thumbnail
  };
}

// 임시 이미지 디렉토리 구조
export const TEMP_IMAGE_STRUCTURE = `
/images/temp/
├── bookcase-white-main.webp
├── bookcase-white-lifestyle.webp  
├── bookcase-white-thumb.webp
├── bookcase-grey-main.webp
├── bookcase-grey-lifestyle.webp
├── bookcase-grey-thumb.webp
├── bookcase-brown-main.webp
├── bookcase-brown-lifestyle.webp
├── bookcase-brown-thumb.webp
├── bookcase-black-main.webp
├── bookcase-black-lifestyle.webp
├── bookcase-black-thumb.webp
├── bookcase-green-main.webp
├── bookcase-green-lifestyle.webp
├── bookcase-green-thumb.webp
├── bookcase-moss-green-main.webp
├── bookcase-moss-green-lifestyle.webp
├── bookcase-moss-green-thumb.webp
├── bookcase-light-wood-main.webp
├── bookcase-light-wood-lifestyle.webp
├── bookcase-light-wood-thumb.webp
├── bookcase-dark-wood-main.webp
├── bookcase-dark-wood-lifestyle.webp
├── bookcase-dark-wood-thumb.webp
├── bookcase-burgundy-main.webp
├── bookcase-burgundy-lifestyle.webp
├── bookcase-burgundy-thumb.webp
├── bookcase-beige-main.webp
├── bookcase-beige-lifestyle.webp
├── bookcase-beige-thumb.webp
├── bookcase-sand-main.webp
├── bookcase-sand-lifestyle.webp
├── bookcase-sand-thumb.webp
├── bookcase-pink-main.webp
├── bookcase-pink-lifestyle.webp
├── bookcase-pink-thumb.webp
├── bookcase-blue-main.webp
├── bookcase-blue-lifestyle.webp
├── bookcase-blue-thumb.webp
├── bookcase-default-main.webp    (폴백)
├── bookcase-default-lifestyle.webp (폴백)
└── bookcase-default-thumb.webp   (폴백)
`;

// 개발용 이미지 생성 도우미 (실제로는 더미 이미지 생성기에서 사용)
export const IMAGE_GENERATION_CONFIG = {
  sizes: {
    main: { width: 800, height: 800 },
    lifestyle: { width: 800, height: 800 },
    thumbnail: { width: 68, height: 68 }
  },
  colors: {
    white: '#FFFFFF',
    grey: '#9CA3AF', 
    brown: '#8B4513',
    black: '#000000',
    green: '#22C55E',
    'moss-green': '#4ADE80',
    'light-wood': '#D2B48C',
    'dark-wood': '#8B4513',
    burgundy: '#800020',
    beige: '#F5F5DC',
    sand: '#F4A460',
    pink: '#FFC0CB',
    blue: '#3B82F6'
  }
};