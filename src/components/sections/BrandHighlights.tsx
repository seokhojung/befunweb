'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatedCard } from '@/components/ui/animated-card';
import { Badge } from '@/components/ui/badge';

interface BrandHighlight {
  id: number;
  title: string;
  description: string;
  gradient: string;
  backgroundImage: string;
}

const brandHighlights: BrandHighlight[] = [
  {
    id: 1,
    title: "내가 만드는 디자인",
    description: "맞춤 설계로 빈틈없이 딱 맞는 가구",
    gradient: "from-red-400/80 to-cyan-400/80",
    backgroundImage: "/images/brand-highlights/card-1.avif"
  },
  {
    id: 2,
    title: "당신만을 위한 제작",
    description: "주문 제작으로 완성되는 프리미엄 품질",
    gradient: "from-green-400/80 to-emerald-300/80",
    backgroundImage: "/images/brand-highlights/card-2.avif"
  },
  {
    id: 3,
    title: "쉽고 빠른 조립",
    description: "클릭 몇 번이면 완성, 분해와 재조립도 간편",
    gradient: "from-orange-300/80 to-pink-300/80",
    backgroundImage: "/images/brand-highlights/card-3.avif"
  },
  {
    id: 4,
    title: "오래도록 함께",
    description: "변치 않는 품질, 평생 사용하는 가구",
    gradient: "from-purple-300/80 to-pink-400/80",
    backgroundImage: "/images/brand-highlights/card-4.avif"
  }
];

export function BrandHighlights() {
  const [activeCard, setActiveCard] = useState(2);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // 자동 슬라이드 함수
  const nextCard = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveCard((prev) => prev === brandHighlights.length ? 1 : prev + 1);
    
    setTimeout(() => setIsTransitioning(false), 700);
  };

  // 자동 슬라이드 시작
  const startAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    
    autoPlayRef.current = setInterval(() => {
      if (!isPaused && !isTransitioning) {
        nextCard();
      }
    }, 5000);
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
    return () => stopAutoPlay();
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
    if (isTransitioning || activeCard === cardId) return;
    
    setIsTransitioning(true);
    setActiveCard(cardId);
    
    setTimeout(() => setIsTransitioning(false), 700);
  };

  // 카드 스타일 계산
  const getCardStyles = (index: number) => {
    const isActive = activeCard === index + 1;
    
    return {
      width: isActive ? 'w-card-active' : 'w-card-inactive',
      animation: isActive ? 'animate-card-expand' : 'animate-card-collapse',
      zIndex: isActive ? 'z-10' : 'z-0'
    };
  };

  return (
    <section className="py-16 md:py-20 xl:py-24 bg-neutral-200">
      <div className="container mx-auto px-6">
        {/* 헤더 */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="uppercase font-semibold text-sm text-neutral-600 mb-8">
            맞춤 가구의 새로운 기준
          </p>
          <h3 className="font-semibold text-2xl lg:text-4xl xl:text-5xl text-neutral-900 max-w-[800px] mx-auto">
            한 번의 선택, 평생의 만족
          </h3>
        </div>

        {/* 모바일/태블릿: 카드 그리드 */}
        <div className="lg:hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {brandHighlights.map((highlight) => (
              <div key={highlight.id} className="h-[300px] md:h-[350px]">
                <DesignCard 
                  highlight={highlight} 
                  isActive={activeCard === highlight.id}
                  onClick={() => handleCardClick(highlight.id)}
                  isTransitioning={isTransitioning}
                  isMobile={true}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 데스크톱: 4개 카드 한 줄 배치 */}
        <div className="hidden lg:block">
          <div 
            className="flex gap-2 h-[476px] xl:h-[668px] 2xl:h-[764px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {brandHighlights.map((highlight, index) => {
              const styles = getCardStyles(index);
              const isActive = activeCard === index + 1;
              
              return (
                <div
                  key={highlight.id}
                  className={`
                    h-full transition-all duration-700 ease-in-out relative
                    ${styles.width} ${styles.zIndex}
                    ${isActive ? 'mx-2' : ''}
                  `}
                >
                  <DesignCard 
                    highlight={highlight} 
                    isActive={isActive}
                    onClick={() => handleCardClick(highlight.id)}
                    isTransitioning={isTransitioning}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// 디자인 카드 컴포넌트
function DesignCard({ 
  highlight, 
  isActive, 
  onClick, 
  isTransitioning,
  isMobile = false
}: { 
  highlight: BrandHighlight; 
  isActive: boolean; 
  onClick: () => void;
  isTransitioning: boolean;
  isMobile?: boolean;
}) {
  return (
    <AnimatedCard
      isActive={isActive}
      isTransitioning={isTransitioning}
      onClick={onClick}
      className="h-full group"
    >
      {/* 배경 이미지 */}
      <div 
        className="w-full h-full relative overflow-hidden"
        style={{
          backgroundImage: `url(${highlight.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* 컨텐츠 컨테이너 */}
        <div className="absolute inset-0">
        {/* 배경 패턴 애니메이션 */}
        <div className={`
          absolute inset-0 opacity-20 transition-all duration-1000
          ${isActive ? 'animate-float' : ''}
        `}>
          <div className="absolute top-4 right-4 w-32 h-32 border-2 border-white rounded-full" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border border-white rounded-full" />
          <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-white rounded-full" />
        </div>

        {/* 번호 배지 */}
        <div className="absolute top-6 left-6 z-10">
          <Badge 
            variant="secondary" 
            className={`
              text-white bg-white/20 border-white text-lg font-semibold 
              px-4 py-2 rounded-full backdrop-blur-sm 
              transition-all duration-500
              ${isActive 
                ? 'scale-110 bg-white/30 shadow-lg animate-bounce' 
                : 'scale-100 group-hover:scale-105'
              }
            `}
          >
            {String(highlight.id).padStart(2, '0')}
          </Badge>
        </div>

        {/* 콘텐츠 오버레이 - 어두운 배경으로 텍스트 가독성 확보 */}
        <div className={`
          absolute inset-0 flex flex-col justify-end p-6 md:p-8 
          transition-all duration-700 ease-in-out
          bg-gradient-to-t from-black/70 via-black/30 to-transparent
          ${isActive || isMobile
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8 pointer-events-none'
          }
        `}>
          <div className="text-white">
            <h3 className={`
              font-semibold mb-2 md:mb-4 transition-all duration-700 ease-out
              ${isActive || isMobile
                ? 'text-2xl md:text-3xl lg:text-5xl opacity-100 translate-y-0' 
                : 'text-xl md:text-2xl lg:text-3xl opacity-0 translate-y-4'
              }
            `}>
              {highlight.title}
            </h3>
            <p className={`
              transition-all duration-700 ease-out delay-200
              ${isActive || isMobile
                ? 'text-sm md:text-base lg:text-lg opacity-90 translate-y-0' 
                : 'text-sm md:text-base opacity-0 translate-y-4'
              }
            `}>
              {highlight.description}
            </p>
          </div>
        </div>

        {/* 활성 카드 추가 효과 - 미세한 오버레이만 */}
        {isActive && (
          <div className="absolute inset-0 bg-black/10" />
        )}
        </div>
      </div>
    </AnimatedCard>
  );
}