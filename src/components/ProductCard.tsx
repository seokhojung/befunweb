'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  className?: string;
}

// 더미 이미지 생성 함수 (Tylko 스타일)
function generateDummyImage(productName: string, category?: string) {
  const colors = {
    sofa: 'from-amber-100 to-amber-200',
    chaise_longue: 'from-blue-100 to-blue-200',
    chair: 'from-green-100 to-green-200',
    table: 'from-purple-100 to-purple-200',
    storage: 'from-pink-100 to-pink-200',
    bookcase: 'from-indigo-100 to-indigo-200',
    sideboard: 'from-gray-100 to-gray-200',
    bed: 'from-red-100 to-red-200',
    default: 'from-gray-100 to-gray-200'
  };

  const icons = {
    sofa: '🛋️',
    chaise_longue: '🛋️',
    chair: '🪑',
    table: '🪑',
    storage: '🗄️',
    bookcase: '📚',
    sideboard: '🗄️',
    bed: '🛏️',
    default: '🪑'
  };

  const categoryKey = category?.toLowerCase() || 'default';
  const colorClass = colors[categoryKey as keyof typeof colors] || colors.default;
  const icon = icons[categoryKey as keyof typeof icons] || icons.default;

  return (
    <div className="relative w-full h-[300px] overflow-hidden">
      {/* 메인 이미지 */}
      <div className={`absolute top-0 w-full h-full bg-gradient-to-br ${colorClass} duration-500 ease-in-out transform transition-transform group-hover:scale-[1.04]`}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-6xl opacity-80">{icon}</div>
        </div>
        
        {/* 미묘한 패턴 효과 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-16 h-16 border border-white/30 rounded-full"></div>
          <div className="absolute bottom-6 left-6 w-8 h-8 bg-white/20 rounded-full"></div>
        </div>
      </div>
      
      {/* 호버 시 인스타그리드 이미지 (투명도 변화) */}
      <div className={`absolute top-0 w-full h-full bg-gradient-to-br ${colorClass} duration-500 ease-in-out opacity-0 transition-all group-hover:opacity-100`}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-6xl opacity-80">✨</div>
        </div>
      </div>
    </div>
  );
}

// 색상 스와치 컴포넌트 (Tylko 스타일)
function ColorSwatches({ colors = 5, additional = 0 }: { colors?: number; additional?: number }) {
  const swatchColors = [
    'bg-amber-800', 'bg-yellow-600', 'bg-gray-600', 'bg-pink-400', 'bg-blue-500',
    'bg-green-600', 'bg-purple-600', 'bg-red-600', 'bg-indigo-600', 'bg-teal-500'
  ];

  return (
    <div className="flex gap-4 flex-1 py-3 lg:py-2 items-center justify-end">
      {swatchColors.slice(0, colors).map((color, index) => (
        <div
          key={index}
          className={`w-4 h-4 block object-cover overflow-hidden rounded-full swatch max-h-4 ${color}`}
        />
      ))}
      {additional > 0 && (
        <span className="normal-14 text-offblack-600">+{additional}</span>
      )}
    </div>
  );
}

export function ProductCard({ product, className }: ProductCardProps) {
  const hasDiscount = product.originalPrice && product.discount;
  const discountPercentage = product.discount ? `-${product.discount}%` : null;

  return (
    <div className={`flex flex-col h-full bg-white group border-0 shadow-none p-0 ${className}`}>
      {/* 제품 링크 */}
      <a
        href={`/products/${product.id}`}
        className="custom group/minigrid-product-card block h-full"
      >
                      {/* 이미지 영역 */}
            <div className="relative">
              {generateDummyImage(product.name, product.category)}
              
              {/* 할인 배지 */}
              {hasDiscount && (
                <div 
                  className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-md font-semibold text-sm z-10"
                >
                  {discountPercentage}
                </div>
              )}
              
              {/* Free delivery 배지 (Tylko 스타일) */}
              {product.freeDelivery && (
                <div 
                  className="semibold-12 px-8 py-2 rounded-4 mr-4 absolute top-12 left-16 z-[15] flex py-[3px] !px-12 rounded-30"
                  style={{
                    color: '#FF3C00',
                    backgroundColor: '#FFFF66'
                  }}
                >
                  Free delivery
                </div>
              )}
            </div>

                      {/* 정보 영역 */}
            <div className="p-4">
              {/* 상단: 색상 스와치 */}
              <div className="flex justify-end mb-2">
                <ColorSwatches 
                  colors={5} 
                  additional={product.category === 'sofa' ? 10 : product.category === 'storage' ? 5 : 8} 
                />
              </div>

              {/* 제품명 */}
              <h2 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                {product.name}
              </h2>
              
              {/* 설명 */}
              <p className="text-sm text-gray-600 mb-2">
                {getFurnitureType(product.category)} {product.category} in {getFurnitureColor(product.category)}
              </p>
              
              {/* 크기 */}
              {product.category && (
                <p className="text-sm text-gray-600 mb-3">
                  {getFurnitureDimensions(product.category)}
                </p>
              )}

              {/* 하단: 가격 */}
              <div className="flex justify-between items-center">
                <div className="text-left">
                  <span className="font-semibold text-lg text-orange-500">
                    €{product.price.amount}
                  </span>
                  {hasDiscount && (
                    <span className="text-sm text-gray-400 line-through ml-2">
                      €{product.originalPrice?.amount}
                    </span>
                  )}
                </div>
              </div>
            </div>
        </a>
      </div>
    );
}

// 가구 종류별 색상 정보 생성
function getFurnitureColor(category?: string): string {
  const colors = {
    sofa: 'Sand and Blue',
    chaise_longue: 'Sand and Blue',
    chair: 'Natural Oak',
    table: 'Walnut',
    storage: 'Sand and Blue',
    bookcase: 'Natural Oak',
    sideboard: 'Walnut',
    bed: 'Natural Oak',
    default: 'Natural Oak'
  };
  
  return colors[category?.toLowerCase() as keyof typeof colors] || colors.default;
}

// 가구 종류별 타입 반환
function getFurnitureType(category?: string): string {
  const types = {
    sofa: 'Smooth',
    chaise_longue: 'Smooth',
    chair: 'Classic',
    table: 'Modern',
    storage: 'Original',
    bookcase: 'Original',
    sideboard: 'Original',
    bed: 'Comfort',
    default: 'Modern'
  };
  
  return types[category?.toLowerCase() as keyof typeof types] || types.default;
}

// 가구 종류별 크기 정보 생성 (Tylko 스타일)
function getFurnitureDimensions(category: string): string {
  const dimensions = {
    sofa: '148 x 113 cm',
    chaise_longue: '234 x 163 cm',
    chair: '85 x 95 cm',
    table: '120 x 75 cm',
    storage: '186 x 213 cm',
    bookcase: '186 x 213 cm',
    sideboard: '222 x 83 cm',
    bed: '200 x 180 cm',
    default: '150 x 100 cm'
  };
  
  return dimensions[category.toLowerCase() as keyof typeof dimensions] || dimensions.default;
}
