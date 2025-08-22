'use client';

import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { CategoryCard } from '@/components/CategoryCard';
import { PromoBanner } from '@/components/PromoBanner';
import { sampleProducts } from '@/data/products';
import { analytics } from '@/lib/analytics';
import { Product } from '@/types';

export default function ProductsPage() {
  useEffect(() => {
    analytics.pageView('/products', 'Befun 상품 목록');
    analytics.viewItemList('products_main', '메인 상품 목록');
  }, []);

  const handleProductSelect = (product: Product) => {
    analytics.selectItem(product.id, product.name, product.category);
  };

  return (
    <main className="min-h-screen pt-20" role="main">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* 페이지 제목 */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">상품 목록</h1>
          <p className="text-lg text-gray-600">Befun의 다양한 상품을 둘러보세요</p>
        </header>

        {/* Storage 카테고리 카드 */}
        <section className="mb-8">
          <CategoryCard />
        </section>

        {/* 구분선 */}
        <div className="border-t border-gray-200 mb-8"></div>

        {/* 프로모션 배너 */}
        <section className="mb-8">
          <PromoBanner />
        </section>

        {/* 상품 그리드 */}
        <section 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          role="grid"
          aria-label="상품 목록"
        >
          {sampleProducts.map((product) => (
            <div 
              key={product.id} 
              onClick={() => handleProductSelect(product)}
              role="gridcell"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </section>

        {/* 총 제품 수 */}
        <div className="mt-8 text-right">
          <p className="text-gray-600">
            총 <span className="font-semibold">{sampleProducts.length}</span>개의 상품
          </p>
        </div>
      </div>
    </main>
  );
}
