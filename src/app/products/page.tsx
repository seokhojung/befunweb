import { Layout } from '@/components/layout';
import { CategoryCard } from '@/components/cards';
import { ProductGridV2, PromoBanner } from '@/components/sections';
import { productsV2Data } from '@/data/productsV2';

export const metadata = {
  title: 'Products | BEFUN',
  description: 'BEFUN 제품 페이지 - 새로운 제품 카탈로그에서 다양한 컬러와 옵션을 살펴보세요',
  keywords: 'BEFUN, 가구, 북케이스, 제품, 색상 옵션, 맞춤형 가구',
  openGraph: {
    title: 'Products | BEFUN',
    description: '새롭게 디자인된 제품 카탈로그',
    type: 'website',
  },
};

export default function ProductsV2Page() {
  return (
    <Layout>
      <div className="container mx-auto px-3 md:px-6 py-6 md:py-8 pt-16 md:pt-20">
        {/* 페이지 제목 */}
        <header className="mb-8">
        <br/>
        <p className="text-lg text-gray-600">Befun의 다양한 상품을 둘러보세요.</p>
        <br/>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ALL PRODUCTS</h1>
          
        </header>

        {/* Storage 카테고리 카드 */}
        <section className="mb-8">
          <CategoryCard name="Storage" />
        </section>

        {/* 구분선 */}
        <div className="border-t border-gray-400 mb-8"></div>

        {/* 프로모션 배너 */}
        <section className="mb-8">
          <PromoBanner />
        </section>

        {/* V2 제품 그리드 */}
        <section>
          <ProductGridV2 
            products={productsV2Data}
            columns={{
              mobile: 2,
              tablet: 3, 
              desktop: 4
            }}
            showSort={false}
            showFilters={false}
            maxItems={32} 
          />
        </section>

        {/* 총 제품 수 */}
        <div className="mt-8 text-right">
          <p className="text-gray-600">
            총 <span className="font-semibold">{productsV2Data.length}</span>개의 상품
          </p>
        </div>
      </div>
    </Layout>
  );
}