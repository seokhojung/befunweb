'use client';

import Link from 'next/link';
import { Layout } from '@/components/layout';

export default function NotFound() {
  return (
    <Layout>
      <div className="flex-1 flex items-center justify-center px-6 min-h-[400px] md:min-h-[600px]">
        <div className="text-center">
          {/* 심플한 404 */}
          <h1 className="text-7xl font-light text-gray-300 mb-8">404</h1>
          
          {/* 간단한 메시지 */}
          <p className="text-xl text-gray-600 mb-12">
            페이지를 준비 중입니다
          </p>
          
          {/* 액션 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="inline-block bg-black text-white px-6 py-3 font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              홈으로 돌아가기
            </Link>
            
            <Link 
              href="/products"
              className="inline-block border border-black text-black px-6 py-3 font-medium hover:bg-black hover:text-white transition-colors duration-200"
            >
              상품 둘러보기
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}