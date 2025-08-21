'use client';

import { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { sampleProducts } from '@/data/products';
import { analytics } from '@/lib/analytics';
import { Product } from '@/types';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'category'>('name');

  useEffect(() => {
    analytics.pageView('/products', 'Befun 상품 목록');
    analytics.viewItemList('products_main', '메인 상품 목록');
  }, []);

  const handleProductSelect = (product: Product) => {
    analytics.selectItem(product.id, product.name, product.category);
  };

  // 필터링된 상품 목록
  const filteredProducts = useMemo(() => {
    let filtered = sampleProducts;

    // 검색어 필터링
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 카테고리 필터링
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // 정렬
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price.amount - b.price.amount;
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  // 고유 카테고리 목록
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(sampleProducts.map(product => product.category))];
    return ['all', ...uniqueCategories];
  }, []);

  return (
    <main className="min-h-screen pt-20" role="main">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* 페이지 제목 */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">상품 목록</h1>
          <p className="text-lg text-gray-600">Befun의 다양한 상품을 둘러보세요</p>
        </header>

        {/* 검색 및 필터 섹션 */}
        <section 
          className="mb-8 p-6 bg-gray-50 rounded-lg"
          role="search"
          aria-label="상품 검색 및 필터"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 검색 입력 */}
            <div>
              <label 
                htmlFor="search-input"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                상품 검색
              </label>
              <input
                id="search-input"
                type="text"
                placeholder="상품명, 설명, 카테고리로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-describedby="search-description"
              />
              <p id="search-description" className="mt-1 text-sm text-gray-500">
                상품명, 설명, 카테고리를 입력하여 원하는 상품을 찾을 수 있습니다.
              </p>
            </div>

            {/* 카테고리 필터 */}
            <div>
              <label 
                htmlFor="category-filter"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                카테고리
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-describedby="category-description"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? '전체' : category}
                  </option>
                ))}
              </select>
              <p id="category-description" className="mt-1 text-sm text-gray-500">
                특정 카테고리의 상품만 표시합니다.
              </p>
            </div>

            {/* 정렬 옵션 */}
            <div>
              <label 
                htmlFor="sort-select"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                정렬 기준
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'category')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-describedby="sort-description"
              >
                <option value="name">이름순</option>
                <option value="price">가격순</option>
                <option value="category">카테고리순</option>
              </select>
              <p id="sort-description" className="mt-1 text-sm text-gray-500">
                상품 목록의 정렬 기준을 선택합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 결과 요약 */}
        <div className="mb-6">
          <p className="text-gray-600">
            총 <span className="font-semibold">{filteredProducts.length}</span>개의 상품을 찾았습니다.
            {searchTerm && (
              <span> 검색어: "{searchTerm}"</span>
            )}
            {selectedCategory !== 'all' && (
              <span> 카테고리: {selectedCategory}</span>
            )}
          </p>
        </div>

        {/* 상품 그리드 */}
        {filteredProducts.length > 0 ? (
          <section 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            role="grid"
            aria-label="상품 목록"
          >
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                onClick={() => handleProductSelect(product)}
                role="gridcell"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </section>
        ) : (
          <div 
            className="text-center py-12"
            role="status"
            aria-live="polite"
          >
            <p className="text-lg text-gray-500 mb-4">검색 결과가 없습니다.</p>
            <p className="text-gray-400">다른 검색어나 카테고리를 시도해보세요.</p>
          </div>
        )}
      </div>
    </main>
  );
}
