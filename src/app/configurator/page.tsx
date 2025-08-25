'use client';

import { Header } from '@/components/Header';

export default function ConfiguratorPage() {
  return (
    <main className="min-h-screen" role="main">
      <Header />
      
      {/* 구성기 제목 섹션 */}
      <section 
        className="pt-20 pb-6 bg-gray-50"
        aria-labelledby="configurator-title"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 
            id="configurator-title"
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            Befun 구성기
          </h1>
          <p className="text-lg text-gray-600">
            상품의 색상, 재질, 크기를 자유롭게 선택하여 나만의 특별한 제품을 만들어보세요
          </p>
        </div>
      </section>
      
      {/* 구성기 iframe 섹션 */}
      <section 
        className="w-full h-screen"
        aria-label="상품 구성기"
      >
        <iframe
          src="https://befun241204.netlify.app/"
          className="w-full h-full border-0"
          title="Befun 구성기 - 상품 커스터마이징 도구"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          loading="lazy"
          aria-describedby="configurator-description"
        />
        
        {/* iframe 로딩 실패 시 fallback */}
        <div 
          id="iframe-fallback"
          style={{ display: 'none' }}
          role="alert"
          aria-live="polite"
        >
          <div className="bg-gray-100 min-h-screen">
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  구성기를 로드할 수 없습니다
                </h2>
                <p className="text-gray-600 mb-6">
                  일시적인 문제로 구성기를 표시할 수 없습니다. 잠시 후 다시 시도해주세요.
                </p>
                <a
                  href="https://befun241204.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-describedby="external-link-description"
                >
                  새 창에서 구성기 열기
                </a>
                <p 
                  id="external-link-description"
                  className="mt-2 text-sm text-gray-500"
                >
                  새 창에서 구성기를 열어 상품을 커스터마이징할 수 있습니다
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 구성기 사용 안내 */}
      <section 
        className="py-12 bg-white border-t"
        aria-labelledby="usage-guide-title"
      >
        <div className="container mx-auto px-6">
          <h2 
            id="usage-guide-title"
            className="text-2xl font-bold text-gray-900 mb-6 text-center"
          >
            구성기 사용 방법
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">상품 선택</h3>
              <p className="text-gray-600">커스터마이징하고 싶은 상품을 선택하세요</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">옵션 선택</h3>
              <p className="text-gray-600">색상, 재질, 크기 등 원하는 옵션을 선택하세요</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">결과 확인</h3>
              <p className="text-gray-600">선택한 옵션으로 완성된 상품을 확인하세요</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* 스크린 리더 전용 설명 */}
      <div className="sr-only" aria-live="polite">
        Befun 구성기 페이지입니다. 상품을 커스터마이징할 수 있는 도구가 포함되어 있습니다.
      </div>
    </main>
  );
}
