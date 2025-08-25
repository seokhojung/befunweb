'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

interface SustainabilityCard {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
}

const sustainabilityCards: SustainabilityCard[] = [
  {
    id: 1,
    title: "내구성 있는 소재",
    description: "최고 품질의 소재만을 사용하여 제작합니다. 오래 지속되도록 만들어지며 무료 보증으로 보호됩니다.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 48 48" className="w-12 h-12">
        <g clipPath="url(#sustainability_svg__a)">
          <path fill="#fff" fillRule="evenodd" d="M4.547 6h37.425l.002 1.498.024 19.046-3 .004L38.976 9h-10.32v9h-9.297V9H7.547v28.5h19.56v3H4.547V6Zm17.911 3v6h3.1V9h-3.1ZM10.064 30h7.934v-3h-7.935v3Zm0 4.5h10.934v-3H10.063v3Z" clipRule="evenodd"/>
          <path stroke="#fff" strokeWidth="3" d="m35.563 38.394-4.621-4.621 4.48-4.481M39.352 33.727h-7.96"/>
        </g>
        <defs>
          <clipPath id="sustainability_svg__a">
            <path fill="#fff" d="M0 0h48v48H0z"/>
          </clipPath>
        </defs>
      </svg>
    )
  },
  {
    id: 2,
    title: "변치 않는 스타일",
    description: "우리의 가구는 미래의 클래식으로, 수십 년간 유행을 타지 않는 미학으로 디자인되었습니다.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 48 48" className="w-12 h-12">
        <g clipPath="url(#sustainability_svg__b)">
          <path fill="#fff" fillRule="evenodd" d="M4.547 6h37.425l.002 1.498.024 19.046-3 .004L38.976 9h-10.32v9h-9.297V9H7.547v28.5h19.56v3H4.547V6Zm17.911 3v6h3.1V9h-3.1ZM10.064 30h7.934v-3h-7.935v3Zm0 4.5h10.934v-3H10.063v3Z" clipRule="evenodd"/>
          <path stroke="#fff" strokeWidth="3" d="m35.563 38.394-4.621-4.621 4.48-4.481M39.352 33.727h-7.96"/>
        </g>
        <defs>
          <clipPath id="sustainability_svg__b">
            <path fill="#fff" d="M0 0h48v48H0z"/>
          </clipPath>
        </defs>
      </svg>
    )
  },
  {
    id: 3,
    title: "교체 가능한 부품",
    description: "스크래치, 긁힘, 삶의 흔적 - 모두 이야기의 일부입니다. 그래서 우리는 교체 가능한 가구를 만듭니다.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 48 48" className="w-12 h-12">
        <g clipPath="url(#sustainability_svg__c)">
          <path fill="#fff" fillRule="evenodd" d="M4.547 6h37.425l.002 1.498.024 19.046-3 .004L38.976 9h-10.32v9h-9.297V9H7.547v28.5h19.56v3H4.547V6Zm17.911 3v6h3.1V9h-3.1ZM10.064 30h7.934v-3h-7.935v3Zm0 4.5h10.934v-3H10.063v3Z" clipRule="evenodd"/>
          <path stroke="#fff" strokeWidth="3" d="m35.563 38.394-4.621-4.621 4.48-4.481M39.352 33.727h-7.96"/>
        </g>
        <defs>
          <clipPath id="sustainability_svg__c">
            <path fill="#fff" d="M0 0h48v48H0z"/>
          </clipPath>
        </defs>
      </svg>
    )
  },
  {
    id: 4,
    title: "이동 가능한 디자인",
    description: "삶의 변화를 위해 만들어졌습니다. 분해하고 다시 조립할 수 있도록 설계되었습니다.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 48 48" className="w-12 h-12">
        <g clipPath="url(#sustainability_svg__d)">
          <path fill="#fff" fillRule="evenodd" d="M4.547 6h37.425l.002 1.498.024 19.046-3 .004L38.976 9h-10.32v9h-9.297V9H7.547v28.5h19.56v3H4.547V6Zm17.911 3v6h3.1V9h-3.1ZM10.064 30h7.934v-3h-7.935v3Zm0 4.5h10.934v-3H10.063v3Z" clipRule="evenodd"/>
          <path stroke="#fff" strokeWidth="3" d="m35.563 38.394-4.621-4.621 4.48-4.481M39.352 33.727h-7.96"/>
        </g>
        <defs>
          <clipPath id="sustainability_svg__d">
            <path fill="#fff" d="M0 0h48v48H0z"/>
          </clipPath>
        </defs>
      </svg>
    )
  }
];

export function Sustainability() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative overflow-hidden min-h-[450px]">
      {/* 배경 이미지 */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/images/sustainability/sustainability-lg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 container mx-auto px-6 flex items-center justify-center min-h-[450px]">
        <div className="grid grid-cols-12 gap-6 items-center w-full">
          {/* 왼쪽: 메인 텍스트 */}
          <div className="col-span-12 lg:col-span-5">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6">
              필요한 것만 만듭니다
            </h2>
            <p className="text-base md:text-lg text-white/90 mb-8">
              모든 제품은 주문 제작으로 만들어져 재고와 낭비를 없앱니다. 
              평생 사용할 수 있도록 설계되어 교체할 필요가 없습니다.
            </p>
            <Link 
              href="/products" 
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              PRODUCTS
            </Link>
          </div>

          {/* 오른쪽: 캐러셀 */}
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <div className="relative">
              <Swiper
                modules={[Navigation, Scrollbar]}
                spaceBetween={16}
                slidesPerView={1}
                navigation={{
                  nextEl: '.swiper-button-next-custom',
                  prevEl: '.swiper-button-prev-custom',
                }}
                scrollbar={{
                  el: '.swiper-scrollbar-custom',
                  draggable: true,
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 2,
                  },
                }}
                className="sustainability-swiper"
              >
                {sustainabilityCards.map((card) => (
                  <SwiperSlide key={card.id}>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 h-full min-h-[280px] flex flex-col">
                      <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                        {card.title}
                      </h3>
                      <p className="text-sm md:text-base text-white/80 mb-auto">
                        {card.description}
                      </p>
                      <div className="mt-6 flex justify-end">
                        {card.icon}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* 커스텀 네비게이션 버튼 */}
              <button className="swiper-button-prev-custom absolute -left-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow hidden lg:flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M15 6l-6 6 6 6"/>
                </svg>
              </button>
              <button className="swiper-button-next-custom absolute -right-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow hidden lg:flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M9 6l6 6-6 6"/>
                </svg>
              </button>

              {/* 스크롤바 */}
              <div className="swiper-scrollbar-custom mt-6 h-1 bg-white/20 rounded-full relative">
                <div className="swiper-scrollbar-drag bg-white rounded-full"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}