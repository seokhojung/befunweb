'use client';

import React from 'react';
import { ProductBadge as ProductBadgeType } from '@/types/productsV2';

interface ProductBadgeProps {
  badge: ProductBadgeType;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProductBadge({ 
  badge, 
  position = 'top-left', 
  size = 'md',
  className = ''
}: ProductBadgeProps) {
  // 위치별 클래스 정의
  const positionClasses = {
    'top-left': 'top-2 left-2',
    'top-right': 'top-2 right-2',
    'bottom-left': 'bottom-2 left-2',
    'bottom-right': 'bottom-2 right-2',
  };

  // 크기별 클래스 정의
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  // 배지 타입별 기본 스타일
  const getDefaultStyles = (type: ProductBadgeType['type']) => {
    const baseStyles = {
      discount: {
        backgroundColor: '#FF3C00',
        color: '#FFFF66',
        fontWeight: 'bold'
      },
      delivery: {
        backgroundColor: '#10B981',
        color: '#FFFFFF',
        fontWeight: 'medium'
      },
      bestseller: {
        backgroundColor: 'transparent',
        color: '#BE7958',
        fontWeight: 'medium',
        textTransform: 'uppercase' as const
      },
      new: {
        backgroundColor: '#3B82F6',
        color: '#FFFFFF',
        fontWeight: 'bold'
      },
      label: {
        backgroundColor: '#6B7280',
        color: '#FFFFFF',
        fontWeight: 'medium'
      }
    };

    return baseStyles[type] || baseStyles.label;
  };

  const defaultStyles = getDefaultStyles(badge.type);

  // 스타일 병합 (사용자 정의 스타일이 우선)
  const finalStyles = {
    backgroundColor: badge.style.backgroundColor || defaultStyles.backgroundColor,
    color: badge.style.color || defaultStyles.color,
    border: badge.style.border,
    fontWeight: defaultStyles.fontWeight,
    ...('textTransform' in defaultStyles ? { textTransform: defaultStyles.textTransform } : {}),
  };

  // HTML 엔티티 디코딩 (&amp; → &)
  const decodedText = badge.text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  // bestseller 타입은 특별한 스타일링
  if (badge.type === 'bestseller') {
    return (
      <div
        className={`
          absolute ${positionClasses[position]} ${sizeClasses[size]}
          ${className}
          tracking-wider uppercase letter-spacing-wide
        `}
        style={finalStyles}
        role="img"
        aria-label={`배지: ${decodedText}`}
      >
        {decodedText}
      </div>
    );
  }

  return (
    <div
      className={`
        absolute ${positionClasses[position]} ${sizeClasses[size]}
        rounded-full shadow-sm backdrop-blur-sm
        flex items-center justify-center text-center
        whitespace-nowrap max-w-24 overflow-hidden
        ${className}
      `}
      style={finalStyles}
      role="img"
      aria-label={`배지: ${decodedText}`}
    >
      {/* 길이가 긴 텍스트 처리 */}
      {decodedText.length > 15 ? (
        <span className="truncate" title={decodedText}>
          {decodedText}
        </span>
      ) : (
        decodedText
      )}
    </div>
  );
}

// 여러 배지를 표시하는 컴포넌트
interface ProductBadgesProps {
  badges: ProductBadgeType[];
  position?: ProductBadgeProps['position'];
  size?: ProductBadgeProps['size'];
  maxDisplay?: number;
  className?: string;
}

export function ProductBadges({ 
  badges, 
  position = 'top-left', 
  size = 'md',
  maxDisplay = 3,
  className = ''
}: ProductBadgesProps) {
  // 우선순위에 따라 정렬 (낮은 숫자가 높은 우선순위)
  const sortedBadges = badges
    .sort((a, b) => a.priority - b.priority)
    .slice(0, maxDisplay);

  if (sortedBadges.length === 0) {
    return null;
  }

  // 단일 배지인 경우
  if (sortedBadges.length === 1) {
    return (
      <ProductBadge 
        badge={sortedBadges[0]!} 
        position={position} 
        size={size} 
        className={className}
      />
    );
  }

  // 여러 배지인 경우 수직으로 쌓기
  return (
    <div className={`absolute ${getPositionClasses(position)} ${className}`}>
      <div className="flex flex-col gap-1">
        {sortedBadges.map((badge, index) => (
          <div
            key={`${badge.type}-${badge.priority}-${index}`}
            className="relative"
          >
            <ProductBadge 
              badge={badge} 
              position="top-left" // 상대 위치 사용
              size={size}
              className="relative top-0 left-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// 헬퍼 함수: 위치 클래스 가져오기
function getPositionClasses(position: ProductBadgeProps['position'] = 'top-left') {
  const positionClasses = {
    'top-left': 'top-2 left-2',
    'top-right': 'top-2 right-2',
    'bottom-left': 'bottom-2 left-2',
    'bottom-right': 'bottom-2 right-2',
  };
  
  return positionClasses[position];
}