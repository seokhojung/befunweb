'use client';

import Image from 'next/image';
import { useState } from 'react';
import { StorageIcon, ShelfStorageIcon, ModernStorageIcon } from '../icons/StorageIcon';

interface CategoryCardProps {
  name: string;
  imageUrl?: string;
  href?: string;
  onSale?: boolean;
  iconType?: 'storage' | 'shelf' | 'modern';
}

export function CategoryCard({ 
  name = "Storage", 
  imageUrl,
  href = "/products",
  onSale = false,
  iconType = 'storage'
}: CategoryCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const IconComponent = iconType === 'shelf' 
    ? ShelfStorageIcon 
    : iconType === 'modern' 
    ? ModernStorageIcon 
    : StorageIcon;
    
  const showIcon = !imageUrl || imageError;
  
  return (
    <div className="relative w-[140px] h-auto group">
      {/* Sale Badge */}
      {onSale && (
        <div className="absolute top-2 right-2 z-10 px-2 py-1 rounded-full text-xs font-semibold"
             style={{ color: '#FFFF66', backgroundColor: '#FF3C00' }}>
          Sale
        </div>
      )}
      
      {/* Card Link */}
      <a href={href} className="flex h-full flex-col justify-between items-center hover:text-gray-900 text-gray-700">
        {/* Category Image */}
        <div className="w-full mt-4 overflow-hidden">
          <div className="aspect-[980/481] bg-transparent transition-transform group-hover:scale-[1.03] relative">
            {showIcon ? (
              <div className="w-full h-full flex items-center justify-center">
                <IconComponent size={40} className="text-gray-400" />
              </div>
            ) : (
              <Image 
                src={imageUrl!}
                alt={name}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
                sizes="140px"
              />
            )}
          </div>
        </div>
        
        {/* Category Name */}
        <div className="flex-1 flex flex-col items-center justify-center text-center p-2">
          <span className="font-semibold text-sm underline-offset-2 hover:underline">
            {name}
          </span>
        </div>
      </a>
    </div>
  );
}
