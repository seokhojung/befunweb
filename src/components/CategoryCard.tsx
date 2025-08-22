export function CategoryCard() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Storage SVG 아이콘 */}
        <div className="w-16 h-16 text-gray-700">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="12" r="2" fill="currentColor"/>
            <line x1="2" y1="9" x2="22" y2="9" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
        
        {/* 카테고리명 */}
        <h3 className="text-xl font-semibold text-gray-900">Storage</h3>
        
        {/* 간단한 설명 */}
        <p className="text-sm text-gray-600">수납과 정리를 위한 가구</p>
      </div>
    </div>
  );
}
