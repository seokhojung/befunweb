'use client';

import { Layout } from '@/components/layout';
import { config } from '@/config';

export default function ConfiguratorPage() {
  return (
    <Layout>
      
      {/* 구성기 iframe 섹션 */}
      <section 
        className="w-full h-screen mt-3 overflow-hidden"
        aria-label="상품 구성기"
      >
        <iframe
          src={config.external.configurator.url}
          className="w-full h-full border-0"
          style={{ overflow: 'hidden' }}
          title="Befun 구성기 - 상품 커스터마이징 도구"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          loading="lazy"
          scrolling="no"
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
                  href={config.external.configurator.url}
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
      
      {/* 스크린 리더 전용 설명 */}
      <div className="sr-only" aria-live="polite">
        Befun 구성기 페이지입니다. 상품을 커스터마이징할 수 있는 도구가 포함되어 있습니다.
      </div>
    </Layout>
  );
}
