import Image from 'next/image';

export function PromoBanner() {
  return (
    <div className="relative rounded-0 overflow-hidden shadow-lg h-[300px]">
      {/* 배경 이미지 */}
      <Image
        src="/images/banners/promo-collection.webp"
        alt="BEFUN COLLECTION"
        fill
        className="object-cover"
        priority
      />
      
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
        {/* 텍스트 콘텐츠 */}
        <div className="relative h-full flex items-center px-8 md:px-12">
          <div className="max-w-lg text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-400">
              BEFUN COLLECTION
            </h2>
            <p className="text-lg md:text-xl text-gray-100 leading-relaxed">
              당신만의 특별한 공간을 만들어보세요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
