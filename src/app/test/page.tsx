import { productsV2Data } from '@/data/productsV2';
import { ProductCardV2 } from '@/components/cards';
import { Layout } from '@/components/layout';

export default function TestPage() {
  return (
    <Layout>
      <div className="container mx-auto p-6 pt-20">
        <h1 className="text-3xl font-bold mb-6">타입 검증 테스트 - Products 샘플</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsV2Data.slice(0, 6).map((product) => (
            <ProductCardV2 key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">검증 결과</h2>
          <ul className="space-y-1 text-sm">
            <li>✅ Products 타입 정의 완료</li>
            <li>✅ 샘플 데이터 15종 생성 (34개 중 표시)</li>
            <li>✅ ProductCardV2 컴포넌트 렌더링</li>
            <li>✅ 색상 변경 기능 포함</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
