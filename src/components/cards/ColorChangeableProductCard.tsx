'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { ColorChangeableProduct } from '@/data/colorProducts';

interface ColorChangeableProductCardProps {
  product: ColorChangeableProduct;
  className?: string;
}

export const ColorChangeableProductCard = React.memo(function ColorChangeableProductCard({ 
  product, 
  className = '' 
}: ColorChangeableProductCardProps) {
  const [selectedColorId, setSelectedColorId] = useState(product.defaultColorId);
  
  // 선택된 컬러의 이미지 찾기 (메모화)
  const selectedColor = useMemo(() => 
    product.colors.find(color => color.id === selectedColorId) || product.colors[0], 
    [product.colors, selectedColorId]
  );

  // 이미지 사이즈 계산 메모화
  const imageSizes = useMemo(() => 
    "(max-width: 768px) 244px, (max-width: 1024px) 300px, 350px", 
    []
  );

  // 색상 선택 핸들러 메모화
  const handleColorChange = useCallback((colorId: string) => {
    setSelectedColorId(colorId);
  }, []);
  
  if (!selectedColor) {
    return null; // 컬러가 없는 경우 렌더링하지 않음
  }

  return (
    <article className={`relative block ${className}`}>
      {/* 제품 이미지 */}
      <div className="block w-full transition-all duration-300 ease-out">
        <div className="w-full aspect-square relative overflow-hidden bg-transparent">
          <Image
            src={selectedColor.imageUrl}
            alt={`${product.name} in ${selectedColor.name}`}
            fill
            className="w-full h-full object-contain transition-all duration-300"
            loading="lazy"
            sizes={imageSizes}
          />
        </div>
      </div>

      {/* 제품명 */}
      <h2 className="text-neutral-900 font-semibold text-lg text-center w-full mt-8">
        {product.name}
      </h2>

      {/* 컬러 선택기 - 컬러가 2개 이상일 때만 표시 */}
      {product.colors.length > 1 && (
        <fieldset className="flex flex-wrap gap-1 justify-center mt-4">
          {product.colors.map((color) => (
            <label
              key={color.id}
              className={`inline-block w-8 h-8 p-0.5 cursor-pointer relative border-2 rounded-full transition-all duration-200 ease-out hover:border-neutral-400 ${
                selectedColorId === color.id 
                  ? 'border-neutral-900' 
                  : 'border-transparent'
              }`}
            >
              <input
                type="radio"
                name={`color-${product.id}`}
                value={color.id}
                checked={selectedColorId === color.id}
                onChange={() => handleColorChange(color.id)}
                className="sr-only"
              />
              <span 
                className="inline-block w-full h-full border border-neutral-300 rounded-full overflow-hidden"
                style={{
                  backgroundImage: `url(${color.swatchUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                title={color.name}
              />
            </label>
          ))}
        </fieldset>
      )}
    </article>
  );
}, (prevProps, nextProps) => {
  // 제품 ID와 색상 배열이 같으면 리렌더링 방지
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.product.colors.length === nextProps.product.colors.length &&
    prevProps.className === nextProps.className
  );
});