export function PromoBanner() {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl overflow-hidden shadow-lg">
      <div className="flex flex-col md:flex-row items-center">
        {/* 좌측 텍스트 영역 */}
        <div className="flex-1 p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-400">
            BEFUN COLLECTION
          </h2>
          <p className="text-lg md:text-xl text-gray-100 leading-relaxed">
            당신만의 특별한 공간을 만들어보세요
          </p>
        </div>
        
        {/* 우측 더미 이미지 영역 */}
        <div className="flex-1 p-8 md:p-12 flex items-center justify-center">
          <div className="w-full h-48 md:h-64 bg-gradient-to-br from-gray-600 to-gray-500 rounded-lg flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">🏠</div>
              <p className="text-sm opacity-80">더미 이미지 영역</p>
              <p className="text-xs opacity-60">실제 이미지로 교체 예정</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
