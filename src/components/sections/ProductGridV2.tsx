'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCardV2 } from '@/components/cards';
import { ProductV2 } from '@/types/productsV2';
import { Button } from '../ui';

interface ProductGridV2Props {
  products: ProductV2[];
  title?: string;
  subtitle?: string;
  columns?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  showFilters?: boolean;
  showSort?: boolean;
  className?: string;
  maxItems?: number;
  slideMode?: boolean; // 슬라이드 모드 여부
}

type SortOption = 'default' | 'name' | 'price-low' | 'price-high' | 'newest';

export const ProductGridV2 = React.memo(function ProductGridV2({
  products,
  title,
  subtitle,
  columns = {
    mobile: 2,
    tablet: 3,
    desktop: 4
  },
  showFilters = false,
  showSort = false,
  className = '',
  maxItems,
  slideMode = false
}: ProductGridV2Props) {
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [isLoading, setIsLoading] = useState(false);
  
  // Embla Carousel for slide mode
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    skipSnaps: false,
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // 제품 정렬 로직
  const sortedProducts = useMemo(() => {
    if (!products || products.length === 0) {
      return [];
    }
    
    const sorted = [...products];
    
    switch (sortBy) {
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        sorted.sort((a, b) => a.price.amount - b.price.amount);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price.amount - a.price.amount);
        break;
      case 'newest':
        // ID 기준으로 정렬 (최신 제품이 높은 ID를 가진다고 가정)
        sorted.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'default':
      default:
        // 기본 순서 유지
        break;
    }
    
    return maxItems ? sorted.slice(0, maxItems) : sorted;
  }, [products, sortBy, maxItems]);

  // 그리드 클래스 생성 (정적 클래스 사용)
  const getGridClasses = (cols: typeof columns) => {
    const baseClasses = 'grid gap-3 md:gap-4 lg:gap-6 xl:gap-8';
    
    // Tailwind에서 정적으로 인식할 수 있도록 명시적 클래스 매핑
    const mobileClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
    }[cols.mobile] || 'grid-cols-2';
    
    const tabletClasses = {
      1: 'md:grid-cols-1',
      2: 'md:grid-cols-2', 
      3: 'md:grid-cols-3',
      4: 'md:grid-cols-4',
    }[cols.tablet] || 'md:grid-cols-3';
    
    const desktopClasses = {
      1: 'lg:grid-cols-1',
      2: 'lg:grid-cols-2',
      3: 'lg:grid-cols-3',
      4: 'lg:grid-cols-4',
    }[cols.desktop] || 'lg:grid-cols-4';
    
    return `${baseClasses} ${mobileClasses} ${tabletClasses} ${desktopClasses}`;
  };

  const gridClasses = getGridClasses(columns);

  const handleSortChange = (newSort: SortOption) => {
    setIsLoading(true);
    setSortBy(newSort);
    
    // 약간의 딜레이로 정렬 애니메이션 효과
    setTimeout(() => {
      setIsLoading(false);
    }, 150);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">제품이 없습니다</h3>
        <p className="text-gray-500">곧 새로운 제품들이 추가될 예정입니다.</p>
      </div>
    );
  }

  // 슬라이드 모드일 때의 렌더링
  if (slideMode) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          {/* 헤더 */}
          <header className="text-center mb-12">
            {title && (
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600">
                {subtitle}
              </p>
            )}
          </header>

          {/* 상품 슬라이드 컨테이너 */}
          <div className="relative group">
            {/* Embla Carousel */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4 md:gap-6">
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex-[0_0_300px]"
                  >
                    <ProductCardV2 product={product} />
                  </div>
                ))}
              </div>
            </div>

            {/* 네비게이션 버튼들 */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg border-0 hover:bg-white"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg border-0 hover:bg-white"
              onClick={scrollNext}
              disabled={!canScrollNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // 기존 그리드 모드 렌더링
  return (
    <div className={`w-full ${className}`}>
      {/* 제목 */}
      {title && (
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            {title}
          </h2>
        </div>
      )}
      
      {/* 필터 및 정렬 컨트롤 */}
      {(showFilters || showSort) && (
        <div className="flex justify-between items-center mb-8 p-4 bg-gray-50 rounded-lg">
          {/* 필터 (향후 구현) */}
          {showFilters && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">필터:</span>
              <select className="text-sm border border-gray-300 rounded px-3 py-1">
                <option value="all">전체</option>
                <option value="bookcase">북케이스</option>
                <option value="available">재고 있음</option>
              </select>
            </div>
          )}

          {/* 정렬 */}
          {showSort && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">정렬:</span>
              <select 
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="text-sm border border-gray-300 rounded px-3 py-1"
              >
                <option value="default">기본 순서</option>
                <option value="name">이름순</option>
                <option value="price-low">가격 낮은순</option>
                <option value="price-high">가격 높은순</option>
                <option value="newest">최신순</option>
              </select>
            </div>
          )}

          {/* 제품 수 표시 */}
          <div className="text-sm text-gray-600">
            총 <span className="font-medium">{sortedProducts.length}</span>개 제품
          </div>
        </div>
      )}

      {/* 제품 그리드 */}
      <div
        className={`${gridClasses} ${isLoading ? 'opacity-75 transition-opacity' : ''}`}
        role="grid"
        aria-label="제품 V2 목록"
        aria-busy={isLoading}
      >
        {sortedProducts.map((product, index) => (
          <div
            key={product.id}
            role="gridcell"
            className="group"
          >
            <ProductCardV2
              product={product}
              priority={index < 8} // 첫 8개는 우선 로딩
            />
          </div>
        ))}
      </div>

      {/* 로딩 인디케이터 */}
      {isLoading && (
        <div className="flex justify-center mt-8">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
});

// 스켈레톤 그리드 컴포넌트
export function ProductGridV2Skeleton({
  columns = { mobile: 2, tablet: 3, desktop: 4 },
  itemCount = 8
}: {
  columns?: ProductGridV2Props['columns'];
  itemCount?: number;
}) {
  // 스켈레톤용 그리드 클래스 생성
  const getSkeletonGridClasses = (cols: typeof columns) => {
    const baseClasses = 'grid gap-3 md:gap-4 lg:gap-6 xl:gap-8';
    
    const mobileClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
    }[cols.mobile] || 'grid-cols-2';
    
    const tabletClasses = {
      1: 'md:grid-cols-1',
      2: 'md:grid-cols-2', 
      3: 'md:grid-cols-3',
      4: 'md:grid-cols-4',
    }[cols.tablet] || 'md:grid-cols-3';
    
    const desktopClasses = {
      1: 'lg:grid-cols-1',
      2: 'lg:grid-cols-2',
      3: 'lg:grid-cols-3',
      4: 'lg:grid-cols-4',
    }[cols.desktop] || 'lg:grid-cols-4';
    
    return `${baseClasses} ${mobileClasses} ${tabletClasses} ${desktopClasses}`;
  };

  const gridClasses = getSkeletonGridClasses(columns);

  return (
    <div className={gridClasses}>
      {Array.from({ length: itemCount }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm animate-pulse">
          <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
          <div className="p-4 space-y-3">
            <div className="h-5 bg-gray-200 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
            <div className="flex justify-between">
              <div className="h-6 w-16 bg-gray-200 rounded"></div>
              <div className="h-4 w-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// 에러 상태 컴포넌트
export function ProductGridV2Error({
  onRetry,
  message = '제품 목록을 불러오는 중 오류가 발생했습니다.'
}: {
  onRetry?: () => void;
  message?: string;
}) {
  return (
    <div className="text-center py-12">
      <div className="text-red-500 mb-4">
        <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L5.232 16.5c-.77.833.192 2.5 1.732 2.5z"/>
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">오류 발생</h3>
      <p className="text-gray-500 mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}