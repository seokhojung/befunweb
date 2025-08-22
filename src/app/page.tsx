import { ProductGrid } from '@/components/ProductGrid';
import { BrandHighlights } from '@/components/BrandHighlights';
import { HeroSection } from '@/components/HeroSection';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { heroData } from '@/data/home';
import { sampleProducts } from '@/data/products';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* 히어로 섹션 */}
        <HeroSection hero={heroData} />

        {/* 추천 상품 그리드 섹션 */}
        <ProductGrid products={sampleProducts.slice(0, 7)} title="Recommended for you" />

        {/* 브랜드 하이라이트 섹션 */}
        <BrandHighlights />
        
        {/* 구성기 CTA 섹션 */}
        <section className="py-24 bg-gray-50">
          <div className="grid-container text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              나만의 가구를 디자인해보세요
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              맞춤형 가구 구성기로 당신만의 공간을 만들어보세요
            </p>
            <a
              href="/configurator"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              구성기 시작하기
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
