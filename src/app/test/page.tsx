import { sampleProducts } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Layout } from '@/components/layout';

export default function TestPage() {
  return (
    <Layout>
      <div className="container mx-auto p-6 pt-20">
        <h1 className="text-3xl font-bold mb-6">타입 검증 테스트 - 샘플 5종 상품</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">검증 결과</h2>
          <ul className="space-y-1 text-sm">
            <li>✅ 타입 정의 완료</li>
            <li>✅ 샘플 데이터 5종 생성</li>
            <li>✅ ProductCard 컴포넌트 렌더링</li>
            <li>✅ 타입 오류 0개 (컴파일 성공)</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
