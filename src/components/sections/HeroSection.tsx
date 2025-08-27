'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui';
import { HeroSection as HeroSectionType } from '@/types';

interface HeroSectionProps {
  hero: HeroSectionType;
}

export const HeroSection = React.memo(function HeroSection({ hero }: HeroSectionProps) {
  // 스타일 객체 메모화
  const backgroundPatternStyle = useMemo(() => ({
    backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
    backgroundSize: '60px 60px'
  }), []);
  return (
    <section 
      className="relative h-screen overflow-hidden"
      role="banner"
      aria-label="히어로 섹션"
    >
      {/* 배경 이미지 최적화 */}
      <Image
        src="/images/banners/home-hero.png"
        alt="Hero Background"
        fill
        className="object-cover"
        priority
        quality={85}
        sizes="100vw"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli+kgV5xNvLMB5TqWPGz0GGGmn5K7Ws0dqwquZKOh4MKFrPX7XQpgsWoqLEePkP8AFvV6BaKnelAkNXY6/AeG9mEXoNS3lnA8p1LHjZ6DVqJhwp/aJ/U/FWUbhWCgf8A/9k="
      />
      
      {/* 오버레이 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50">
        {/* 추가 패턴 오버레이 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={backgroundPatternStyle}></div>
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
            <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black/40 shadow-lg hover:shadow-xl">
              <Link 
                href={hero.ctaLink}
                aria-describedby="hero-title hero-subtitle"
              >
                {hero.ctaText}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-2 border-white text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 hover:bg-white hover:text-gray-900 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/40">
              <Link href="/products">
                PRODUCTS
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* 스크롤 인디케이터
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div> */}
      
      {/* 스크린 리더 전용 설명 */}
      <div className="sr-only" aria-live="polite">
        {hero.title} - {hero.subtitle}. {hero.ctaText} 버튼을 클릭하여 {hero.ctaLink}로 이동할 수 있습니다.
      </div>
    </section>
  );
}, (prevProps, nextProps) => {
  // Hero 섹션은 거의 변하지 않으므로 얕은 비교로 충분
  return (
    prevProps.hero.title === nextProps.hero.title &&
    prevProps.hero.subtitle === nextProps.hero.subtitle &&
    prevProps.hero.ctaText === nextProps.hero.ctaText &&
    prevProps.hero.ctaLink === nextProps.hero.ctaLink
  );
});
