import { ProductGrid } from '@/components/ProductGrid';
import { BrandHighlights } from '@/components/BrandHighlights';
import { HeroSection } from '@/components/HeroSection';
import { Sustainability } from '@/components/Sustainability';
import { ProductColorSection } from '@/components/ProductColorSection';
import { Layout } from '@/components/layout';
import { heroData } from '@/data/home';
import { sampleProducts } from '@/data/products';

export default function Home() {
  return (
    <Layout>
      {/* 히어로 섹션 */}
      <HeroSection hero={heroData} />

      {/* 컬러 선택 가능한 제품 섹션 */}
      <ProductColorSection />

      {/* 브랜드 하이라이트 섹션 */}
      <BrandHighlights />

      {/* 추천 상품 그리드 섹션 */}
      <ProductGrid products={sampleProducts.slice(0, 7)} title="우리의 인기 제품들" />

      {/* 지속가능성 섹션 */}
      <Sustainability />
      
      {/* 구성기 CTA 섹션 */}
      <section className="py-12 md:py-20 lg:py-24 bg-gray-100">
        <div className="grid-container text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            나만의 가구를 디자인해보세요
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
            맞춤형 가구 구성기로 당신만의 공간을 만들어보세요
          </p>
          <a
            href="/configurator"
            className="inline-block bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            CONFIGURATOR
          </a>
        </div>
      </section>
    </Layout>
  );
}
