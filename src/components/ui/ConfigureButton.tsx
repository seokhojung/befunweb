'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ConfigureButtonProps {
  productId: string;
  productSlug?: string;
  selectedColorId?: string;
  isVisible?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  className?: string;
}

export function ConfigureButton({
  productId,
  productSlug,
  selectedColorId,
  isVisible = false,
  onClick,
  className = ''
}: ConfigureButtonProps) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // 모바일 디바이스 감지
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    // 커스텀 onClick 핸들러가 있으면 실행
    if (onClick) {
      onClick(event);
      return;
    }

    // 기본 동작: 상세 페이지로 이동
    const targetSlug = productSlug || productId;
    const colorParam = selectedColorId ? `?color=${selectedColorId}` : '';
    const url = `/products/${targetSlug}${colorParam}`;
    
    router.push(url);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const syntheticEvent = {
        preventDefault: () => event.preventDefault(),
        stopPropagation: () => event.stopPropagation()
      } as React.MouseEvent;
      handleClick(syntheticEvent);
    }
  };

  // 모바일에서는 항상 표시, 데스크톱에서는 isVisible에 따라 표시
  const shouldShow = isMobile || isVisible;

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`
        absolute bottom-4 left-1/2 -translate-x-1/2 z-20
        bg-gray-900 text-white px-4 py-2.5 rounded-full
        flex items-center gap-2 text-sm font-medium
        shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out
        hover:bg-gray-800 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900
        ${shouldShow 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-16 opacity-0'
        }
        ${isMobile ? 'translate-y-0 opacity-100' : ''}
        ${className}
      `}
      aria-label={`${productId} 제품 구성 및 상세보기`}
      tabIndex={shouldShow ? 0 : -1}
    >
      {/* 편집/설정 아이콘 */}
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      
      {/* 버튼 텍스트 */}
      <span>Configure</span>
    </button>
  );
}

// 간단한 대안 버튼 (아이콘만)
interface ConfigureIconButtonProps {
  productId: string;
  productSlug?: string;
  selectedColorId?: string;
  isVisible?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  className?: string;
}

export function ConfigureIconButton({
  productId,
  productSlug,
  selectedColorId,
  isVisible = false,
  onClick,
  className = ''
}: ConfigureIconButtonProps) {
  const router = useRouter();

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (onClick) {
      onClick(event);
      return;
    }

    const targetSlug = productSlug || productId;
    const colorParam = selectedColorId ? `?color=${selectedColorId}` : '';
    router.push(`/products/${targetSlug}${colorParam}`);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        absolute top-3 right-3 z-20 w-8 h-8
        bg-white/90 backdrop-blur-sm rounded-full
        flex items-center justify-center
        shadow-sm hover:shadow-md transition-all duration-200
        hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-1
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        ${className}
      `}
      aria-label="제품 구성하기"
    >
      <svg
        className="w-4 h-4 text-gray-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    </button>
  );
}