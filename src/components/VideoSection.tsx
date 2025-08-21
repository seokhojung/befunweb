'use client';

import ReactPlayer from 'react-player';
import { HeroSection } from '@/types';
import Link from 'next/link';

interface VideoSectionProps {
  hero: HeroSection;
}

export function VideoSection({ hero }: VideoSectionProps) {
  return (
    <section 
      className="relative h-screen overflow-hidden"
      role="banner"
      aria-label="히어로 섹션"
    >
      {/* 비디오 배경 */}
      <div className="absolute inset-0">
        <ReactPlayer
          url={hero.videoUrl}
          playing
          loop
          muted
          width="100%"
          height="100%"
          style={{ objectFit: 'cover' }}
          fallback={
            <div 
              className="w-full h-full bg-gray-900 flex items-center justify-center"
              role="img"
              aria-label="비디오 플레이스홀더 이미지"
            >
              <span className="text-white text-lg">비디오 로딩 중...</span>
            </div>
          }
        />
      </div>
      
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-center text-white px-6 max-w-4xl">
          <h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            id="hero-title"
          >
            {hero.title}
          </h1>
          <p 
            className="text-xl md:text-2xl mb-8 opacity-90"
            id="hero-subtitle"
          >
            {hero.subtitle}
          </p>
          <Link 
            href={hero.ctaLink}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black/40"
            aria-describedby="hero-title hero-subtitle"
          >
            {hero.ctaText}
          </Link>
        </div>
      </div>
      
      {/* 스크린 리더 전용 설명 */}
      <div className="sr-only" aria-live="polite">
        {hero.title} - {hero.subtitle}. {hero.ctaText} 버튼을 클릭하여 {hero.ctaLink}로 이동할 수 있습니다.
      </div>
    </section>
  );
}
