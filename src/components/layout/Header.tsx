'use client';

import Link from 'next/link';
import { useMenuToggle, useScrollDirection } from '@/hooks';

export function Header() {
  // useMenuToggle Hook으로 메뉴 로직 간소화
  const { isOpen: isMenuOpen, getMenuProps, getButtonProps, close: closeMenu } = useMenuToggle({
    closeOnOutsideClick: true,
    closeOnEscape: true,
  });

  // useScrollDirection Hook으로 스크롤 감지 로직 간소화
  const { isVisible: isHeaderVisible } = useScrollDirection({
    threshold: 100,
    throttleMs: 16,
    initialVisible: true,
    disableWhenAtTop: true,
  });

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 ${
        isHeaderVisible ? 'animate-slide-down' : 'animate-slide-up'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* 로고 섹션 */}
        <div className="h-20 md:h-24 flex items-center">
          <Link href="/" className="text-3xl md:text-4xl font-bold text-green-500 hover:text-green-600 transition-colors">
            BEFUN
          </Link>
        </div>

        {/* 네비게이션 섹션 */}
        <nav className="h-12 md:h-16 lg:px-8 lg:rounded-full flex items-center justify-center lg:bg-black/50 lg:backdrop-blur-md lg:text-white">
          {/* 메인 네비게이션 메뉴 */}
          <div className="hidden lg:flex items-center h-full">
            <ul className="flex h-full items-center space-x-8">
              <li className="h-full flex items-center">
                <Link href="/products" className="px-4 py-2 rounded-full hover:bg-white/20 transition-colors duration-200 font-medium">
                  Shop
                </Link>
              </li>
              <li className="h-full flex items-center">
                <Link href="/configurator" className="px-4 py-2 rounded-full hover:bg-white/20 transition-colors duration-200 font-medium">
                  Configurator
                </Link>
              </li>
            </ul>
          </div>

          {/* 우측 아이콘 메뉴 - 데스크톱에서만 표시 */}
          <div className="hidden lg:flex items-center h-full space-x-2">
            {/* 알림 버튼 */}
            <button className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" className="w-5 h-5">
                <path stroke="currentColor" strokeWidth="2" d="M12 4a8 8 0 0 0-8 8v4l-3 3h22l-3-3v-4a8 8 0 0 0-8-8Z"/>
                <path stroke="currentColor" strokeWidth="2" d="M9 20a3 3 0 0 0 6 0"/>
              </svg>
            </button>

            {/* 계정 링크 */}
            <Link href="/account" className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" className="w-5 h-5">
                <path stroke="currentColor" strokeWidth="2" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </Link>

            {/* 위시리스트 링크 */}
            <Link href="/library" className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" className="w-5 h-5">
                <path stroke="currentColor" strokeWidth="2" d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z"/>
              </svg>
            </Link>

            {/* 장바구니 링크 */}
            <Link href="/cart" className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" className="w-5 h-5">
                <path stroke="currentColor" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0 2.5 5M7 13l-2.5 5m0 0h9m-9 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm9 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"/>
              </svg>
            </Link>
          </div>

          {/* 모바일 메뉴 버튼 - 모바일에서만 표시 */}
          <button 
            {...getButtonProps()}
            className="lg:hidden p-3 bg-black/50 backdrop-blur-md rounded-full hover:bg-black/60 transition-all duration-200 text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" className="w-5 h-5">
              <path stroke="currentColor" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </nav>

        {/* 모바일 메뉴 오버레이 */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black/20 z-[60] lg:hidden">
            <div {...getMenuProps()} className="absolute right-4 top-20 bg-black/50 backdrop-blur-md rounded-2xl p-6 shadow-xl">
              <nav className="flex flex-col space-y-4">
                <Link 
                  href="/products" 
                  className="text-white hover:text-gray-300 transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-white/10"
                  onClick={closeMenu}
                >
                  Shop
                </Link>
                <Link 
                  href="/configurator" 
                  className="text-white hover:text-gray-300 transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-white/10"
                  onClick={closeMenu}
                >
                  Configurator
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
