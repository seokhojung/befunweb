import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { VideoSection } from '@/components/VideoSection';
import { heroData } from '@/data/home';
import { sampleProducts } from '@/data/products';
import Link from 'next/link';

export default function HomePage() {
  const featuredProducts = sampleProducts.slice(0, 6);

  return (
    <main className="min-h-screen" role="main">
      <Header />
      
      {/* 히어로 섹션 */}
      <VideoSection hero={heroData} />
      
      {/* 추천 상품 섹션 */}
      <section 
        className="py-16 bg-gray-50"
        aria-labelledby="featured-products-title"
      >
        <div className="container mx-auto px-6">
          <header className="text-center mb-12">
            <h2 
              id="featured-products-title"
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              추천 상품
            </h2>
            <p className="text-lg text-gray-600">
              Befun에서 엄선한 인기 상품들을 만나보세요
            </p>
          </header>
          
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            role="grid"
            aria-label="추천 상품 목록"
          >
            {featuredProducts.map((product) => (
              <div 
                key={product.id}
                role="gridcell"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          {/* 전체 상품 보기 링크 */}
          <div className="text-center">
            <Link 
              href="/products"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-describedby="view-all-description"
            >
              전체 상품 보기
            </Link>
            <p 
              id="view-all-description"
              className="mt-2 text-sm text-gray-500"
            >
              더 많은 상품을 둘러보고 원하는 제품을 찾아보세요
            </p>
          </div>
        </div>
      </section>
      
      {/* 구성기 CTA 섹션 */}
      <section 
        className="py-16 bg-blue-600 text-white"
        aria-labelledby="configurator-cta-title"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 
            id="configurator-cta-title"
            className="text-3xl font-bold mb-4"
          >
            나만의 특별한 공간을 만들어보세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Befun 구성기를 사용하여 색상, 재질, 크기를 자유롭게 선택하고 완벽한 제품을 만들어보세요
          </p>
          <Link 
            href="/configurator"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
            aria-describedby="configurator-description"
          >
            구성기 시작하기
          </Link>
          <p 
            id="configurator-description"
            className="mt-2 text-sm opacity-75"
          >
            구성기에서 상품을 커스터마이징하고 실시간으로 미리보기를 확인할 수 있습니다
          </p>
        </div>
      </section>
      
      {/* 스크린 리더 전용 설명 */}
      <div className="sr-only" aria-live="polite">
        Befun 홈페이지입니다. 히어로 섹션, 추천 상품 목록, 구성기 안내 섹션이 포함되어 있습니다.
      </div>
    </main>
  );
}
