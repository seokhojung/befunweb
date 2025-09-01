import { Layout } from '@/components/layout';
import { ProductGridV2Skeleton } from '@/components/sections';

export default function ProductsV2Loading() {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-8 pt-20">
        {/* 헤더 스켈레톤 */}
        <header className="mb-8">
          <br/>
          <div className="h-6 w-96 bg-gray-200 rounded animate-pulse mb-4"></div>
          <br/>
          <div className="h-10 w-64 bg-gray-200 rounded animate-pulse"></div>
        </header>

        {/* 프로모션 배너 스켈레톤 */}
        <section className="mb-8">
          <div className="h-32 w-full bg-gray-200 rounded-lg animate-pulse"></div>
        </section>

        {/* 구분선 */}
        <div className="border-t border-gray-400 mb-8"></div>

        {/* 제품 그리드 스켈레톤 */}
        <ProductGridV2Skeleton 
          columns={{
            mobile: 2,
            tablet: 3,
            desktop: 4
          }}
          itemCount={12}
        />

        {/* 로딩 메시지 */}
        <div className="mt-8 text-center">
          <p className="text-gray-500">제품 V2 데이터를 불러오는 중...</p>
        </div>
      </div>
    </Layout>
  );
}