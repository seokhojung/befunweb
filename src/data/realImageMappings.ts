// 🖼️ 실제 이미지 URL 매핑 (product-v2-example.txt에서 추출)
// Tylko.com의 실제 제품 이미지를 사용하여 ProductV2에 적용

export interface RealImageMapping {
  productId: string;
  mainImage: string;
  hoverImage: string;
  thumbnails: {
    [colorName: string]: string;
  };
}

// 🎯 실제 추출된 이미지 URL들을 ProductV2 형태로 매핑
export const REAL_IMAGE_MAPPINGS: RealImageMapping[] = [
  // 📚 Product 1: Bookcase in White with Doors
  {
    productId: 'bookcase-001',
    mainImage: 'https://media.tylko.com/media/gallery/furniture_image/2022/05/Living_room_08_living-room-Bookcase_EAPgDsY.jpg',
    hoverImage: 'https://media.tylko.com/media/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_50.webp',
    thumbnails: {
      white: 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_50_thumbnail.webp',
      brown: 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_22509_thumbnail.webp',
      grey: 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_24177_thumbnail.webp',
      black: 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_16043_thumbnail.webp',
      green: 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_29923_thumbnail.webp',
      'moss-green': 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_29922_thumbnail.webp',
      'light-wood': 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_29921_thumbnail.webp',
      'dark-wood': 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_15643_thumbnail.webp'
    }
  },
  
  // 📚 Product 2: Bookcase in Grey with External Drawers
  {
    productId: 'bookcase-002', 
    mainImage: 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/04/unreal_render_tasks/unreal_1300814.webp',
    hoverImage: 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/04/unreal_render_tasks/unreal_1300813.webp',
    thumbnails: {
      grey: 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/10/unreal_render_tasks/unreal_124137_uCmcm5n_thumbnail.webp',
      white: 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/10/unreal_render_tasks/unreal_124119_NNu2bN7_thumbnail.webp',
      brown: 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/04/unreal_render_tasks/unreal_1300813_thumbnail.webp',
      black: 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/10/unreal_render_tasks/unreal_124127_YH5cTHJ_thumbnail.webp',
      green: 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/10/unreal_render_tasks/unreal_124129_ToHz64F_thumbnail.webp',
      'light-wood': 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/10/unreal_render_tasks/unreal_124133_shhCPyL_thumbnail.webp',
      beige: 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/10/unreal_render_tasks/unreal_124135_4EsNmkR_thumbnail.webp'
    }
  },
  
  // 📚 Product 3: Bookcase in Brown
  {
    productId: 'bookcase-003',
    mainImage: 'https://media.tylko.com/media/catalogue/catalogue_entry/2024/12/unreal_render_tasks/unreal_124420_e5NMLX0.webp',
    hoverImage: 'https://media.tylko.com/media/catalogue/catalogue_entry/2024/10/unreal_render_tasks/unreal_124419_e3k3J6s.webp',
    thumbnails: {
      brown: 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/10/unreal_render_tasks/unreal_124419_e3k3J6s_thumbnail.webp',
      white: 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/10/unreal_render_tasks/unreal_124405_uTjABmn_thumbnail.webp',
      grey: 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/04/unreal_render_tasks/unreal_1300839_thumbnail.webp',
      black: 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/10/unreal_render_tasks/unreal_124413_3EYImuG_thumbnail.webp',
      green: 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/10/unreal_render_tasks/unreal_124415_4CDWl3t_thumbnail.webp',
      'light-wood': 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/10/unreal_render_tasks/unreal_124421_MDG5KaT_thumbnail.webp',
      'dark-wood': 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/10/unreal_render_tasks/unreal_124423_8EbC2hA_thumbnail.webp'
    }
  }
  
  // 더 많은 제품들... (간소화를 위해 3개만 표시)
];

// 🔧 ProductV2 데이터에 실제 이미지 적용하는 함수
export function applyRealImagesToProduct(productId: string): RealImageMapping | null {
  return REAL_IMAGE_MAPPINGS.find(mapping => mapping.productId === productId) || null;
}

// 🏠 로컬 이미지 경로로 변환하는 함수
export function getLocalImagePath(productId: string, type: 'main' | 'hover' | 'thumbnail', colorName?: string): string {
  if (type === 'thumbnail' && colorName) {
    const normalizedColor = colorName.toLowerCase().replace(/\s+/g, '-');
    return `/images/products/v2/thumbnail/swatch-${normalizedColor}.webp`;
  }
  
  const productIndex = productId.replace('bookcase-', '').padStart(2, '0');
  return `/images/products/v2/${type}/bookcase-${productIndex}-${type}.webp`;
}

// 🔄 로컬 이미지를 사용하는 ProductV2 팩토리 함수 (성능 최적화 버전)
export function createProductV2WithLocalImages(baseProductData: Record<string, unknown>): Record<string, unknown> {
  const productIndex = (baseProductData.id as string).replace('bookcase-', '').padStart(2, '0');
  
  return {
    ...baseProductData,
    mainImage: `/images/products/v2/main/bookcase-${productIndex}-main.webp`,
    instagramImage: `/images/products/v2/hover/bookcase-${productIndex}-hover.webp`,
    colorVariants: (baseProductData.colorVariants as Array<Record<string, unknown>>).map((variant: Record<string, unknown>) => ({
      ...variant,
      thumbnail: getLocalImagePath(baseProductData.id as string, 'thumbnail', variant.name as string),
      mainImage: `/images/products/v2/main/bookcase-${productIndex}-main.webp`,
      instagramImage: `/images/products/v2/hover/bookcase-${productIndex}-hover.webp`
    }))
  };
}

// 🎨 색상별 썸네일 이미지 가져오기
export function getRealThumbnail(productId: string, colorName: string): string | null {
  const mapping = applyRealImagesToProduct(productId);
  if (!mapping) return null;
  
  const normalizedColor = colorName.toLowerCase().replace(/\s+/g, '-');
  return mapping.thumbnails[normalizedColor] || null;
}

// 🖼️ 실제 이미지 URL을 사용하는 ProductV2 팩토리 함수
export function createProductV2WithRealImages(baseProductData: Record<string, unknown>): Record<string, unknown> {
  const realImages = applyRealImagesToProduct(baseProductData.id as string);
  
  if (!realImages) {
    // 실제 이미지가 없으면 기본 임시 이미지 사용
    return baseProductData;
  }
  
  // 실제 이미지로 교체
  return {
    ...baseProductData,
    mainImage: realImages.mainImage,
    instagramImage: realImages.hoverImage,
    colorVariants: (baseProductData.colorVariants as Array<Record<string, unknown>>).map((variant: Record<string, unknown>) => ({
      ...variant,
      thumbnail: getRealThumbnail(baseProductData.id as string, variant.name as string) || variant.thumbnail,
      mainImage: realImages.mainImage, // 색상별 메인 이미지 (현재는 동일)
      instagramImage: realImages.hoverImage // 색상별 호버 이미지 (현재는 동일)
    }))
  };
}

// 🎯 모든 색상명을 키로 하는 전체 썸네일 매핑
export const ALL_THUMBNAIL_URLS = {
  // 모든 제품의 모든 색상 썸네일을 플랫 구조로 매핑
  'white-1': 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_50_thumbnail.webp',
  'brown-1': 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_22509_thumbnail.webp',
  'grey-1': 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_24177_thumbnail.webp',
  'black-1': 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_16043_thumbnail.webp',
  'green-1': 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_29923_thumbnail.webp',
  
  // Product 2 색상들
  'grey-2': 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/10/unreal_render_tasks/unreal_124137_uCmcm5n_thumbnail.webp',
  'white-2': 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/10/unreal_render_tasks/unreal_124119_NNu2bN7_thumbnail.webp',
  'brown-2': 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/04/unreal_render_tasks/unreal_1300813_thumbnail.webp',
  
  // Product 3 색상들
  'brown-3': 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/10/unreal_render_tasks/unreal_124419_e3k3J6s_thumbnail.webp',
  'white-3': 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/10/unreal_render_tasks/unreal_124405_uTjABmn_thumbnail.webp',
  'grey-3': 'https://media.tylko.com/media/catalogue/catalogue_entry/2025/04/unreal_render_tasks/unreal_1300839_thumbnail.webp'
  
  // ... 더 많은 색상들
};

// 🚨 주의사항
export const USAGE_NOTES = `
⚠️ 실제 이미지 사용 시 주의사항:

1. 🔒 저작권: Tylko.com의 이미지들은 저작권이 있습니다
2. 🌐 CORS: 브라우저에서 직접 로드 시 CORS 이슈 발생 가능
3. 📱 모바일: 일부 CDN이 모바일에서 차단될 수 있음  
4. 🚀 성능: 외부 CDN 사용으로 로딩 시간 변동 가능
5. 📄 라이선스: 상업적 사용 전 라이선스 확인 필요

💡 권장사항:
- 개발/데모 단계에서만 사용
- 프로덕션 환경에서는 자체 이미지 사용
- 이미지 다운로드 후 로컬에서 호스팅
`;

console.log(USAGE_NOTES);