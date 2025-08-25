'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatedCard } from '@/components/ui/animated-card';
import { Badge } from '@/components/ui/badge';

interface BrandHighlight {
  id: number;
  title: string;
  description: string;
  gradient: string;
}

const brandHighlights: BrandHighlight[] = [
  {
    id: 1,
    title: "You design it",
    description: "Forget one-size-fits-all. No gaps, no guesswork – use our clever CustomFit® tech to create your perfect fit with ease.",
    gradient: "from-red-400 to-cyan-400"
  },
  {
    id: 2,
    title: "We make it to your order",
    description: "Every piece is crafted just for you, with quality at the core. No mass production, just made-for-you perfection.",
    gradient: "from-green-400 to-emerald-300"
  },
  {
    id: 3,
    title: "Build in no time",
    description: "Our SimpleClick® assembly feels like magic: just a few clicks and you're done. Moving? Take it apart, put it back together. Easy.",
    gradient: "from-orange-300 to-pink-300"
  },
  {
    id: 4,
    title: "Enjoy for a lifetime",
    description: "Future-proof furniture design and high-quality materials that last. Plus, replaceable parts for when life happens.",
    gradient: "from-purple-300 to-pink-400"
  }
];

export function BrandHighlights() {
  const [activeCard, setActiveCard] = useState(2); // Tylko와 동일하게 2번 카드가 기본 활성
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // 자동 슬라이드 함수
  const nextCard = () => {
    if (isTransitioning) return; // 전환 중이면 무시
    
    setIsTransitioning(true);
    setActiveCard((prev) => {
      if (prev === brandHighlights.length) {
        return 1; // 마지막 카드에서 첫 번째 카드로
      }
      return prev + 1;
    });
    
    // 전환 완료 후 상태 리셋
    setTimeout(() => setIsTransitioning(false), 700);
  };

  // 자동 슬라이드 시작
  const startAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(() => {
      if (!isPaused && !isTransitioning) {
        nextCard();
      }
    }, 5000); // 5초마다
  };

  // 자동 슬라이드 정지
  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  // 컴포넌트 마운트 시 자동 슬라이드 시작
  useEffect(() => {
    startAutoPlay();
    return () => {
      stopAutoPlay();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 일시정지 상태 변경 시 자동 슬라이드 재개/정지
  useEffect(() => {
    if (isPaused) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]);

  const handleCardClick = (cardId: number) => {
    if (isTransitioning || activeCard === cardId) return; // 전환 중이거나 이미 활성화된 카드면 무시
    
    setIsTransitioning(true);
    setActiveCard(cardId);
    
    // 전환 완료 후 상태 리셋
    setTimeout(() => setIsTransitioning(false), 700);
  };

  // 카드 너비 계산 함수 (Tylko와 정확히 동일)
  const getCardWidth = (index: number) => {
    if (activeCard === index + 1) {
      return 'w-[66.6666666666%]'; // 활성 카드는 66.67%
    }
    return 'w-[11.1111111111%]'; // 비활성 카드는 11.11%
  };

  // 카드 클래스 계산 함수
  const getCardClasses = (index: number) => {
    const baseClasses = 'h-[350px] lg:h-[476px] xl:h-[668px] 2xl:h-[764px] transition-all duration-700 ease-in-out';
    const widthClass = getCardWidth(index);
    
    let additionalClasses = '';
    if (activeCard === index + 1) {
      additionalClasses += ' active';
      if (index === 1) {
        additionalClasses += ' right-animation'; // 2번 카드가 활성일 때
      }
    } else if (index === 0 && activeCard === 2) {
      additionalClasses += ' active-before'; // 1번 카드가 2번 카드 활성 시
    }
    
    return `${baseClasses} ${widthClass} ${additionalClasses}`.trim();
  };

  return (
    <section className="py-48 md:py-64 xl:py-96 bg-beige-200">
      <div className="container mx-auto px-6">
        {/* 헤더 */}
        <div className="text-center mb-32 lg:mb-48">
          <p className="uppercase font-semibold text-sm text-neutral-600 mb-8">
            Create in just a few clicks
          </p>
          <h3 className="font-semibold text-2xl lg:text-4xl xl:text-5xl text-neutral-900 max-w-[635px] mx-auto">
            Design once, love forever
          </h3>
        </div>

        {/* 모바일/태블릿: 카드 그리드 */}
        <div className="lg:hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {brandHighlights.map((highlight) => (
              <div key={highlight.id}>
                <DesignCard 
                  highlight={highlight} 
                  isActive={activeCard === highlight.id}
                  onClick={() => handleCardClick(highlight.id)}
                  isTransitioning={isTransitioning}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 데스크톱: 4개 카드 한 줄 배치 */}
        <div className="hidden lg:block">
          <div 
            className="flex gap-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {brandHighlights.map((highlight, index) => (
              <div
                key={highlight.id}
                className={getCardClasses(index)}
              >
                <DesignCard 
                  highlight={highlight} 
                  isActive={activeCard === highlight.id}
                  onClick={() => handleCardClick(highlight.id)}
                  isTransitioning={isTransitioning}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// 디자인 카드 컴포넌트 (AnimatedCard 활용)
function DesignCard({ highlight, isActive, onClick, isTransitioning }: { 
  highlight: BrandHighlight; 
  isActive: boolean; 
  onClick: () => void;
  isTransitioning: boolean;
 }) {
  return (
    <AnimatedCard
      isActive={isActive}
      isTransitioning={isTransitioning}
      onClick={onClick}
      className="h-full"
    >
      {/* 그라데이션 배경 + 애니메이션 */}
      <div className={`w-full h-full bg-gradient-to-br ${highlight.gradient} relative transition-all duration-1000 ease-in-out ${
        isActive ? 'animate-gradient-shift' : ''
      }`}>
        {/* 배경 패턴 애니메이션 */}
        <div className={`absolute inset-0 opacity-20 transition-all duration-1000 ${
          isActive ? 'animate-float' : ''
        }`}>
          <div className="absolute top-4 right-4 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-8 left-8 w-16 h-16 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-white rounded-full"></div>
        </div>

        {/* 번호 배지 - 애니메이션 효과 */}
        <div className="absolute top-6 left-6 z-10">
          <Badge 
            variant="secondary" 
            className={`text-white bg-white/20 border-white text-lg font-semibold px-4 py-2 rounded-full backdrop-blur-sm transition-all duration-500 ${
              isActive 
                ? 'scale-110 bg-white/30 shadow-lg animate-bounce' 
                : 'scale-100 hover:scale-105'
            }`}
          >
            {String(highlight.id).padStart(2, '0')}
          </Badge>
        </div>

        {/* 콘텐츠 오버레이 - 확장된 카드에서만 보임 + 애니메이션 */}
        <div className={`absolute inset-0 flex flex-col justify-end p-8 transition-all duration-700 ease-in-out ${
          isActive 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8 pointer-events-none'
        }`}>
          <div className="text-white">
            <h3 className={`font-semibold mb-4 transition-all duration-700 ease-out ${
              isActive 
                ? 'text-3xl md:text-4xl lg:text-5xl opacity-100 translate-y-0' 
                : 'text-xl md:text-2xl lg:text-3xl opacity-0 translate-y-4'
            }`}>
              {highlight.title}
            </h3>
            <p className={`opacity-90 transition-all duration-700 ease-out delay-200 ${
              isActive 
                ? 'text-base md:text-lg opacity-100 translate-y-0' 
                : 'text-sm md:text-base opacity-0 translate-y-4'
            }`}>
              {highlight.description}
            </p>
          </div>
        </div>

        {/* 활성 카드일 때 추가 효과 */}
        {isActive && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
          </>
        )}
      </div>
    </AnimatedCard>
  );
}
