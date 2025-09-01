'use client';

import { useEffect } from 'react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProductsV2Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 에러 로그 기록
    console.error('Products 페이지 에러:', error);
  }, [error]);

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8 pt-20">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            {/* 에러 아이콘 */}
            <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg 
                className="w-12 h-12 text-red-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L5.232 16.5c-.77.833.192 2.5 1.732 2.5z" 
                />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              제품 로딩 중 오류 발생
            </h1>
            <p className="text-gray-600 mb-6">
              제품 데이터를 불러오는데 문제가 발생했습니다. 
              잠시 후 다시 시도해 주세요.
            </p>
          </div>

          {/* 에러 상세 정보 (개발 환경에서만) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
              <h3 className="text-sm font-medium text-red-800 mb-2">개발자 정보:</h3>
              <code className="text-xs text-red-600 break-all">
                {error.message}
              </code>
            </div>
          )}

          {/* 액션 버튼들 */}
          <div className="space-y-4">
            <Button 
              onClick={reset}
              className="w-full"
              variant="default"
            >
              다시 시도
            </Button>
            
            <Button 
              onClick={() => window.location.href = '/products'}
              className="w-full"
              variant="secondary"
            >
              기존 제품 페이지로 이동
            </Button>
            
            <Button 
              onClick={() => window.location.href = '/'}
              className="w-full"
              variant="outline"
            >
              홈으로 돌아가기
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}