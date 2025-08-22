'use client';

import Link from 'next/link';
import { HeroSection as HeroSectionType } from '@/types';

interface HeroSectionProps {
  hero: HeroSectionType;
}

export function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section 
      className="relative h-screen overflow-hidden"
      role="banner"
      aria-label="히어로 섹션"
    >
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        {/* 추가 패턴 오버레이 */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
      </div>
      
      {/* 콘텐츠 */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white px-6 max-w-5xl mx-auto">
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            id="hero-title"
          >
            {hero.title}
          </h1>
          <p 
            className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed"
            id="hero-subtitle"
          >
            {hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href={hero.ctaLink}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black/40 shadow-lg hover:shadow-xl"
              aria-describedby="hero-title hero-subtitle"
            >
              {hero.ctaText}
            </Link>
            <Link 
              href="/products"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 hover:bg-white hover:text-gray-900 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/40"
            >
              상품 둘러보기
            </Link>
          </div>
        </div>
      </div>
      
      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
      
      {/* 스크린 리더 전용 설명 */}
      <div className="sr-only" aria-live="polite">
        {hero.title} - {hero.subtitle}. {hero.ctaText} 버튼을 클릭하여 {hero.ctaLink}로 이동할 수 있습니다.
      </div>
    </section>
  );
}
