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
          <h2 className="font-semibold text-3xl lg:text-5xl text-neutral-900 lg:pr-8 whitespace-nowrap">
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

      {/* 제품 캐러셀 */}
      <div className="relative group">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation]}
          spaceBetween={8}
          slidesPerView={1.2}
          centeredSlides={false}
          watchSlidesProgress={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
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
              <div className="flex-shrink-0 w-full md:w-auto overflow-hidden md-max:opacity-50 md-max:first:opacity-100 md-max:last:opacity-100">
                <ColorChangeableProductCard product={product} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  );
}