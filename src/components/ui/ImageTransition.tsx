'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ImageTransitionProps {
  mainImage: string;
  hoverImage?: string;
  alt: string;
  priority?: boolean;
  className?: string;
  onLoad?: () => void;
  sizes?: string;
  fill?: boolean;
}

export function ImageTransition({
  mainImage,
  hoverImage,
  alt,
  priority = false,
  className = '',
  onLoad,
  sizes = '100vw',
  fill = false
}: ImageTransitionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverImageLoaded, setHoverImageLoaded] = useState(false);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 터치 디바이스 감지
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // 호버 이미지 프리로딩
  useEffect(() => {
    if (hoverImage && !hoverImageLoaded && typeof window !== 'undefined') {
      const preloadImage = new window.Image();
      preloadImage.onload = () => setHoverImageLoaded(true);
      preloadImage.src = hoverImage;
    }
  }, [hoverImage, hoverImageLoaded]);

  // 현재 표시할 이미지 결정
  const currentImage = isHovered && hoverImage && hoverImageLoaded ? hoverImage : mainImage;
  const showSkeleton = !mainImageLoaded;

  const handleMouseEnter = () => {
    if (!isTouchDevice && hoverImage) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setIsHovered(false);
    }
  };

  const handleTouch = () => {
    if (isTouchDevice && hoverImage && hoverImageLoaded) {
      setIsHovered(prev => !prev);
    }
  };

  const handleMainImageLoad = () => {
    setMainImageLoaded(true);
    onLoad?.();
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouch}
      style={{
        // GPU 가속을 위한 will-change 설정
        willChange: isHovered ? 'transform' : 'auto'
      }}
    >
      {/* 스켈레톤 로더 */}
      {showSkeleton && (
        <div className={`absolute inset-0 bg-gray-100 animate-pulse ${fill ? '' : 'aspect-square'}`}>
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-12 h-12 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      {/* 메인 이미지 */}
      <Image
        src={currentImage}
        alt={alt}
        fill={fill}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={handleMainImageLoad}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = '/images/placeholders/product-placeholder.svg';
          setMainImageLoaded(true);
        }}
        className={`
          object-cover transition-all duration-500 ease-in-out
          ${isHovered && !isTouchDevice ? 'scale-104' : 'scale-100'}
          ${showSkeleton ? 'opacity-0' : 'opacity-100'}
        `}
        style={{
          // 3D transform으로 GPU 가속 활용
          transform: isHovered && !isTouchDevice 
            ? 'scale3d(1.04, 1.04, 1) translateZ(0)' 
            : 'scale3d(1, 1, 1) translateZ(0)'
        }}
      />

      {/* 이미지 전환 인디케이터 (터치 디바이스용) */}
      {isTouchDevice && hoverImage && hoverImageLoaded && (
        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
          {isHovered ? '기본' : '다른 각도'} 보기
        </div>
      )}

    </div>
  );
}