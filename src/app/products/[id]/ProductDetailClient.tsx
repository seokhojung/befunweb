'use client';

import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { analytics } from '@/lib/analytics';
import { Product } from '@/types';

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  // GA4 이벤트: 상품 상세 뷰
  useEffect(() => {
    analytics.pageView(`/products/${product.id}`, `${product.name} - Befun`);
    analytics.viewItem(
      product.id,
      product.name,
      product.price.amount,
      product.price.currency
    );
  }, [product]);

  // 구성기로 이동 핸들러
  const handleConfiguratorClick = () => {
    analytics.addToCart(
      product.id,
      product.name,
      product.price.amount,
      product.price.currency
    );
  };

  return (
    <main className="min-h-screen pt-20" role="main">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 상품 이미지 섹션 */}
          <section 
            className="space-y-4"
            aria-label="상품 이미지"
          >
            {/* 메인 이미지 */}
            <div 
              className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
              role="img"
              aria-label={`${product.name} 메인 이미지`}
            >
              {product.images[0] && (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-lg">이미지: {product.images[0]}</span>
                </div>
              )}
            </div>
            
            {/* 썸네일 이미지들 */}
            {product.images.length > 1 && (
              <div 
                className="grid grid-cols-4 gap-2"
                role="list"
                aria-label="상품 썸네일 이미지"
              >
                {product.images.slice(1).map((image, index) => (
                  <div 
                    key={index} 
                    className="aspect-square bg-gray-100 rounded-md flex items-center justify-center"
                    role="listitem"
                    aria-label={`${product.name} 썸네일 이미지 ${index + 2}`}
                  >
                    <span className="text-gray-400 text-xs">썸네일 {index + 2}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 상품 정보 섹션 */}
          <section 
            className="space-y-6"
            aria-label="상품 정보"
          >
            {/* 상품 기본 정보 */}
            <header>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-xl text-gray-600">{product.description}</p>
            </header>

            {/* 가격 정보 */}
            <div 
              className="text-3xl font-bold text-gray-900"
              aria-label={`가격: ${product.price.currency === 'KRW' ? '₩' : '$'}${product.price.amount.toLocaleString()}`}
            >
              {product.price.currency === 'KRW' ? '₩' : '$'}
              {product.price.amount.toLocaleString()}
            </div>

            {/* 카테고리 */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">카테고리:</span>
              <span 
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                aria-label={`카테고리: ${product.category}`}
              >
                {product.category}
              </span>
            </div>

            {/* 변형 옵션 */}
            {product.variants.length > 1 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">옵션</h3>
                <div 
                  className="grid grid-cols-2 gap-3"
                  role="list"
                  aria-label="상품 변형 옵션"
                >
                  {product.variants.map((variant) => (
                    <div 
                      key={variant.id} 
                      className="border border-gray-200 rounded-lg p-3"
                      role="listitem"
                      aria-label={`변형 옵션: ${Object.values(variant.options).join(', ')}`}
                    >
                      <div className="text-sm text-gray-600 mb-1">
                        SKU: <span className="font-mono">{variant.sku}</span>
                      </div>
                      {Object.entries(variant.options).map(([key, value]) => (
                        <div key={key} className="text-sm">
                          <span className="text-gray-500">{key}:</span> {value}
                        </div>
                      ))}
                      {variant.price && (
                        <div 
                          className="text-lg font-semibold text-gray-900 mt-2"
                          aria-label={`변형 가격: ${variant.price.currency === 'KRW' ? '₩' : '$'}${variant.price.amount.toLocaleString()}`}
                        >
                          {variant.price.currency === 'KRW' ? '₩' : '$'}
                          {variant.price.amount.toLocaleString()}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 재질 정보 */}
            {product.materials && product.materials.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">재질</h3>
                <div 
                  className="space-y-2"
                  role="list"
                  aria-label="상품 재질 정보"
                >
                  {product.materials.map((material) => (
                    <div 
                      key={material.id} 
                      className="flex items-center space-x-2"
                      role="listitem"
                      aria-label={`재질: ${material.name}${material.color ? ` (색상: ${material.color})` : ''}`}
                    >
                      <span className="text-sm text-gray-600">{material.name}</span>
                      {material.color && (
                        <span className="text-xs text-gray-500">({material.color})</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 액션 버튼들 */}
            <div className="flex space-x-4 pt-6">
              <button 
                onClick={handleConfiguratorClick}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-describedby="configurator-description"
              >
                구성기로 이동
              </button>
              <button 
                className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-describedby="inquiry-description"
              >
                문의하기
              </button>
            </div>
            
            {/* 버튼 설명 */}
            <div className="sr-only">
              <p id="configurator-description">
                구성기로 이동하여 상품의 색상, 재질, 크기 등을 커스터마이징할 수 있습니다.
              </p>
              <p id="inquiry-description">
                상품에 대한 문의사항이 있으시면 문의하기 버튼을 클릭하세요.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
