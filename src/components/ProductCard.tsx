import { Product } from '@/types';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article 
      className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 group"
      role="article"
      aria-labelledby={`product-title-${product.id}`}
      aria-describedby={`product-desc-${product.id}`}
    >
      <Link 
        href={`/products/${product.id}`} 
        className="block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
        aria-describedby={`product-price-${product.id} product-category-${product.id}`}
      >
        {/* 상품 이미지 */}
        <div 
          className="aspect-square bg-gray-100 rounded-md mb-3 overflow-hidden"
          role="img"
          aria-label={`${product.name} 상품 이미지`}
        >
          {product.images[0] && (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center group-hover:bg-gray-300 transition-colors duration-200">
              <span className="text-gray-500 text-sm">이미지: {product.images[0]}</span>
            </div>
          )}
        </div>
        
        {/* 상품 정보 */}
        <div className="space-y-2">
          <h3 
            id={`product-title-${product.id}`}
            className="font-semibold text-lg group-hover:text-blue-600 transition-colors duration-200"
          >
            {product.name}
          </h3>
          <p 
            id={`product-desc-${product.id}`}
            className="text-gray-600 text-sm line-clamp-2"
          >
            {product.description}
          </p>
          
          {/* 가격 및 카테고리 */}
          <div className="flex justify-between items-center">
            <span 
              id={`product-price-${product.id}`}
              className="font-bold text-lg"
              aria-label={`가격: ${product.price.currency === 'KRW' ? '₩' : '$'}${product.price.amount.toLocaleString()}`}
            >
              {product.price.currency === 'KRW' ? '₩' : '$'}
              {product.price.amount.toLocaleString()}
            </span>
            <span 
              id={`product-category-${product.id}`}
              className="text-xs text-gray-500"
              aria-label={`카테고리: ${product.category}`}
            >
              {product.category}
            </span>
          </div>
          
          {/* 변형 정보 */}
          <div className="mt-2">
            <span 
              className="text-xs text-gray-500"
              aria-label={`변형 옵션 ${product.variants.length}개`}
            >
              변형: {product.variants.length}개
            </span>
          </div>
        </div>
      </Link>
      
      {/* 스크린 리더 전용 설명 */}
      <div className="sr-only">
        {product.name} - {product.description}. 가격: {product.price.currency === 'KRW' ? '₩' : '$'}{product.price.amount.toLocaleString()}, 카테고리: {product.category}. 변형 옵션 {product.variants.length}개. 클릭하여 상세 정보를 확인하세요.
      </div>
    </article>
  );
}
