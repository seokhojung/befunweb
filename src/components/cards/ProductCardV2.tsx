'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { ProductV2 } from '@/types/productsV2';
import { ColorSwatchGrid, ImageTransition, ProductBadges, ConfigureButton } from '@/components/ui';
import { convertAndFormatPrice, calculateDiscountRate } from '@/utils/currency';

interface ProductCardV2Props {
  product: ProductV2;
  priority?: boolean;
  onColorChange?: (colorId: string) => void;
}

export const ProductCardV2 = React.memo(function ProductCardV2({ product, priority = false }: ProductCardV2Props) {
  // 기본 색상 변형 선택 (첫 번째 또는 기본으로 설정된 변형)
  const defaultVariant = useMemo(
    () => product.colorVariants.find(v => v.isDefault) || product.colorVariants[0],
    [product.colorVariants]
  );
  
  // 선택된 색상 상태 관리
  const [selectedVariantId, setSelectedVariantId] = useState(defaultVariant?.id || '');
  const selectedVariant = useMemo(
    () => product.colorVariants.find(v => v.id === selectedVariantId) || defaultVariant,
    [product.colorVariants, selectedVariantId, defaultVariant]
  );
  
  // 호버 상태 관리
  const [isHovered, setIsHovered] = useState(false);
  
  // 모바일 감지
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleColorChange = (variantId: string, event?: React.MouseEvent) => {
    // 링크 클릭 방지
    event?.stopPropagation();
    event?.preventDefault();
    
    setSelectedVariantId(variantId);
    // 이미지 프리로딩을 위해 새로운 이미지 미리 로드
    const newVariant = product.colorVariants.find(v => v.id === variantId);
    if (newVariant && typeof window !== 'undefined') {
      const img = new window.Image();
      img.src = newVariant.mainImage;
    }
  };

  // selectedVariant가 없으면 렌더링하지 않음
  if (!selectedVariant) {
    return null;
  }

  return (
    <Link 
      href={`/products/${product.slug}?color=${selectedVariant?.id || defaultVariant?.id || ''}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <article className="bg-white hover:shadow-plp-product-card transition-all duration-300 h-full flex flex-col">
        {/* 이미지 컨테이너 */}
        <div className="aspect-square bg-gray-50 overflow-hidden relative">
          <ImageTransition
            mainImage={selectedVariant.mainImage}
            hoverImage={selectedVariant.hoverImage}
            alt={`${product.name} - ${selectedVariant.name}`}
            priority={priority}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="w-full h-full"
          />
          
          {/* 제품 배지 */}
          {product.badges && product.badges.length > 0 && (
            <ProductBadges 
              badges={product.badges}
              position="top-left"
              size="sm"
              maxDisplay={2}
            />
          )}

          {/* Configure 버튼 */}
          <ConfigureButton
            productId={product.id}
            productSlug={product.slug || product.id}
            selectedColorId={selectedVariant.id}
            isVisible={isHovered}
          />

        </div>

        {/* 제품 정보 섹션 */}
        <div className="p-3 md:p-4 lg:p-6 flex flex-col flex-grow">
          {/* 제품명 */}
          <h3 className="font-semibold text-sm md:text-base text-gray-900 mb-2 line-clamp-4 group-hover:text-gray-700 transition-colors h-16 md:h-20 flex items-start" title={`${product.name} - ${selectedVariant.name}`}>
            {product.name} - {selectedVariant.name}
          </h3>
          
          {/* 가구 타입 */}
          <p className="text-xs md:text-sm text-gray-500 mb-1 capitalize">
            {product.furnitureType || product.category}
          </p>
          
          {/* 정확한 치수 */}
          <p className="text-xs md:text-sm text-gray-500 mb-2 md:mb-3">
            {product.exactDimensions}
          </p>
          
          {/* 색상 스와치 그리드 */}
          <div className="mb-3 md:mb-4 min-h-[32px] md:min-h-[40px] flex items-start" onClick={(e) => e.stopPropagation()}>
            {product.colorVariants.length > 1 && (
              <ColorSwatchGrid
                variants={product.colorVariants}
                selectedId={selectedVariantId}
                onSelect={handleColorChange}
                maxDisplay={isMobile ? 4 : 8}
                size="sm"
              />
            )}
          </div>

          {/* 가격 섹션 - 하단 고정 */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mt-auto gap-2">
            <div className="flex flex-col gap-1">
              {product.originalPrice && product.originalPrice.amount > product.price.amount && (
                <span className="text-xs md:text-sm text-gray-400 line-through">
                  {convertAndFormatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-base md:text-lg font-bold text-gray-900">
                {convertAndFormatPrice(product.price)}
              </span>
            </div>
            
            {/* 할인율 표시 */}
            {product.originalPrice && product.originalPrice.amount > product.price.amount && (
              <span className="text-xs md:text-sm font-medium text-red-600 bg-red-50 px-2 py-1 rounded self-start sm:self-auto">
                -{calculateDiscountRate(product.originalPrice, product.price)}%
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
});