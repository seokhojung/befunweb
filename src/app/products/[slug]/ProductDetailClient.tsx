'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Layout } from '@/components/layout';
import { productsV2Data } from '@/data/productsV2';
import { ColorVariantV2 } from '@/types/productsV2';
import { convertAndFormatPrice, calculateDiscountRate } from '@/utils/currency';

interface ProductDetailClientProps {
  slug: string;
}

export default function ProductDetailClient({ slug }: ProductDetailClientProps) {
  const searchParams = useSearchParams();
  const colorParam = searchParams?.get('color');
  
  // 제품 데이터 찾기
  const product = useMemo(() => {
    return productsV2Data.find(p => p.slug === slug);
  }, [slug]);

  // 선택된 색상 변형 관리
  const defaultVariant = useMemo(() => {
    if (!product) return null;
    return product.colorVariants.find(v => v.id === colorParam) || 
           product.colorVariants.find(v => v.isDefault) || 
           product.colorVariants[0];
  }, [product, colorParam]);

  const [selectedVariant, setSelectedVariant] = useState<ColorVariantV2 | null>(defaultVariant || null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // 페이지 제목을 색상 변경에 따라 업데이트
  useEffect(() => {
    if (product && selectedVariant) {
      document.title = `${product.name} - ${selectedVariant.name} | BEFUN`;
    }
  }, [product, selectedVariant]);

  // 제품이 없는 경우
  if (!product || !selectedVariant) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">제품을 찾을 수 없습니다</h1>
            <p className="text-gray-600 mb-8">요청하신 제품이 존재하지 않습니다.</p>
            <Link href="/products" className="text-blue-600 hover:text-blue-800 underline">
              제품 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // 현재 선택된 변형의 이미지들
  const currentImages = [selectedVariant.mainImage, selectedVariant.hoverImage].filter(Boolean);

  const handleColorChange = (variantId: string) => {
    const newVariant = product.colorVariants.find(v => v.id === variantId);
    if (newVariant) {
      setSelectedVariant(newVariant);
      setSelectedImageIndex(0);
      // URL 업데이트
      const url = new URL(window.location.href);
      url.searchParams.set('color', variantId);
      window.history.replaceState(null, '', url.toString());
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-20">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">홈</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-gray-700">Products</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name} - {selectedVariant.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={currentImages[selectedImageIndex] || selectedVariant.mainImage}
                alt={`${product.name} - ${selectedVariant.name}`}
                width={600}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            
            {/* Thumbnail Navigation */}
            {currentImages.length > 1 && (
              <div className="flex space-x-2">
                {currentImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index 
                        ? 'border-gray-900' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Product Name & Badges */}
            <div>
              {product.badges && product.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {product.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded"
                    >
                      {badge.text}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name} - {selectedVariant.name}
              </h1>
              <p className="text-lg text-gray-600 mt-2 capitalize">
                {product.furnitureType || product.category}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              {product.originalPrice && product.originalPrice.amount > product.price.amount && (
                <span className="text-xl text-gray-400 line-through">
                  {convertAndFormatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-3xl font-bold text-gray-900">
                {convertAndFormatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice.amount > product.price.amount && (
                <span className="text-lg font-medium text-red-600 bg-red-50 px-3 py-1 rounded">
                  -{calculateDiscountRate(product.originalPrice, product.price)}%
                </span>
              )}
            </div>

            {/* Color Selection */}
            {product.colorVariants.length > 1 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  색상: {selectedVariant.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.colorVariants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => handleColorChange(variant.id)}
                      className={`w-12 h-10 rounded border-2 overflow-hidden transition-all hover:scale-105 ${
                        selectedVariant.id === variant.id
                          ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-1'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      title={variant.name}
                    >
                      <Image
                        src={variant.thumbnail}
                        alt={variant.name}
                        width={48}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Dimensions */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">치수</h3>
              <p className="text-gray-600">{product.exactDimensions}</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <button className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                장바구니에 추가
              </button>
              <button className="w-full border border-gray-300 text-gray-900 py-4 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                맞춤 설정하기
              </button>
            </div>

            {/* Product Description */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">제품 설명</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.name}은/는 현대적인 디자인과 뛰어난 품질을 자랑하는 {product.furnitureType || product.category}입니다. 
                다양한 색상 옵션으로 여러분의 공간에 완벽하게 어울리도록 설계되었습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}