'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ColorVariantV2 } from '@/types/productsV2';

interface ColorSwatchGridProps {
  variants: ColorVariantV2[];
  selectedId?: string;
  onSelect: (variantId: string) => void;
  maxDisplay?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function ColorSwatchGrid({ 
  variants, 
  selectedId, 
  onSelect, 
  maxDisplay = 12,
  size = 'md'
}: ColorSwatchGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // 최대 표시 개수만큼 색상 제한
  const displayVariants = variants.slice(0, maxDisplay);

  // 크기별 스타일 정의
  const sizeClasses = {
    sm: 'w-10 h-8', // 40x32px (모바일)
    md: 'w-17 h-14', // 68x54px (데스크톱)  
    lg: 'w-20 h-16' // 80x64px (큰 화면)
  };

  const handleColorSelect = (variantId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    onSelect(variantId);
  };

  const handleKeyDown = (event: React.KeyboardEvent, variantId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      onSelect(variantId);
    }
  };

  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="색상 선택">
      {displayVariants.map((variant) => {
        const isSelected = selectedId === variant.id;
        const isHovered = hoveredId === variant.id;
        
        return (
          <div
            key={variant.id}
            className="relative group"
            onMouseEnter={() => setHoveredId(variant.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* 색상 스와치 버튼 */}
            <button
              onClick={(e) => handleColorSelect(variant.id, e)}
              onKeyDown={(e) => handleKeyDown(e, variant.id)}
              className={`
                ${sizeClasses[size]} 
                rounded border-2 overflow-hidden relative
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                transition-all duration-200 hover:scale-105
                ${isSelected 
                  ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-1' 
                  : 'border-gray-300 hover:border-gray-400'
                }
              `}
              role="radio"
              aria-checked={isSelected}
              aria-label={`${variant.name} 색상 선택`}
              tabIndex={isSelected ? 0 : -1}
            >
              <Image
                src={variant.thumbnail}
                alt={`${variant.name} 썸네일`}
                fill
                sizes="80px"
                className="object-cover"
                onError={(e) => {
                  // 썸네일 로드 실패 시 단색으로 표시
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.style.backgroundColor = getColorFromName(variant.name);
                  }
                }}
              />
              
              {/* 선택된 상태 체크마크 */}
              {isSelected && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <svg 
                    className="w-4 h-4 text-white drop-shadow-lg" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
              )}
            </button>

            {/* 툴팁 */}
            {isHovered && (
              <div 
                className="absolute z-10 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                role="tooltip"
              >
                {variant.name}
                {/* 툴팁 화살표 */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-2 border-transparent border-t-gray-900"></div>
              </div>
            )}
          </div>
        );
      })}

      {/* 더 많은 색상이 있을 때 표시 */}
      {variants.length > maxDisplay && (
        <div className={`${sizeClasses[size]} flex items-center justify-center text-xs text-gray-500 border border-gray-300 rounded`}>
          +{variants.length - maxDisplay}
        </div>
      )}
    </div>
  );
}

// 색상 이름으로부터 대표 색상 추출하는 헬퍼 함수
function getColorFromName(colorName: string): string {
  const colorMap: Record<string, string> = {
    'White': '#FFFFFF',
    'Black': '#000000',
    'Brown': '#8B4513',
    'Grey': '#808080',
    'Gray': '#808080',
    'Green': '#008000',
    'Blue': '#0000FF',
    'Pink': '#FFC0CB',
    'Beige': '#F5F5DC',
    'Sand': '#C2B280',
    'Moss Green': '#8A9A5B',
    'Navy': '#000080',
    'Red': '#FF0000'
  };
  
  return colorMap[colorName] || '#D1D5DB'; // 기본값: 회색
}