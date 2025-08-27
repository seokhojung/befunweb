'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { ColorChangeableProductCard } from './ColorChangeableProductCard';
import { colorChangeableProducts } from '@/data/colorProducts';

export function ProductColorSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="grid-container md-max:text-center py-12 lg:py-24">
      {/* 헤더 섹션 */}
      <div className="mb-16 lg:mb-24">
        <p className="mb-8 uppercase lg:mb-12 font-semibold text-sm lg:text-lg text-neutral-700">
          당신만의 공간을 위한 선택
        </p>
        
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 lg:mb-16">
          <h2 className="font-semibold text-2xl md:text-3xl lg:text-5xl text-neutral-900 lg:pr-8">
            나만의 스타일을 완성하세요
          </h2>
          
          <Link 
            href="/products" 
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-neutral-900 text-neutral-900 font-semibold text-sm hover:bg-neutral-900 hover:text-white transition-all duration-200 md-max:mt-4 md-max:mx-auto whitespace-nowrap rounded-lg"
          >
            전체보기
          </Link>
        </div>
      </div>

      {/* 제품 그리드 - 모바일에서는 2x2 그리드, 데스크톱에서는 슬라이더 */}
      <div className="block md:hidden">
        {/* 모바일 그리드 */}
        <div className="grid grid-cols-2 gap-4">
          {colorChangeableProducts.slice(0, 4).map((product) => (
            <ColorChangeableProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* 데스크톱 캐러셀 */}
      <div className="hidden md:block relative group">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={3}
          centeredSlides={false}
          watchSlidesProgress={true}
          breakpoints={{
            768: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
          }}
          className="!overflow-visible"
        >
          {colorChangeableProducts.map((product) => (
            <SwiperSlide key={product.id} className="!h-auto">
              <ColorChangeableProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}