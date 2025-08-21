import Link from 'next/link';

export function Header() {
  return (
    <header 
      className="fixed top-0 left-0 right-0 bg-white shadow-md z-50"
      role="banner"
      aria-label="사이트 헤더"
    >
      <nav 
        className="container mx-auto px-6 py-4"
        role="navigation"
        aria-label="메인 네비게이션"
      >
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <Link 
            href="/" 
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            aria-label="Befun 홈페이지로 이동"
          >
            Befun
          </Link>
          
          {/* 네비게이션 링크 */}
          <ul 
            className="flex space-x-8"
            role="menubar"
            aria-label="메인 메뉴"
          >
            <li role="none">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
                role="menuitem"
                aria-current="page"
              >
                홈
              </Link>
            </li>
            <li role="none">
              <Link 
                href="/products" 
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
                role="menuitem"
              >
                상품
              </Link>
            </li>
            <li role="none">
              <Link 
                href="/configurator" 
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
                role="menuitem"
              >
                구성기
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
