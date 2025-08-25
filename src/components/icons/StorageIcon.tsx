interface StorageIconProps {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}

export function StorageIcon({ 
  width = 24, 
  height = 24, 
  className = "",
  color = "currentColor" 
}: StorageIconProps) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 캐비닛 본체 */}
      <rect 
        x="3" 
        y="2" 
        width="18" 
        height="20" 
        rx="1" 
        stroke={color} 
        strokeWidth="1.5"
      />
      
      {/* 상단 서랍 */}
      <rect 
        x="3" 
        y="2" 
        width="18" 
        height="6" 
        rx="1" 
        stroke={color} 
        strokeWidth="1.5"
      />
      
      {/* 중간 서랍 */}
      <rect 
        x="3" 
        y="8" 
        width="18" 
        height="6" 
        rx="1" 
        stroke={color} 
        strokeWidth="1.5"
      />
      
      {/* 하단 서랍 */}
      <rect 
        x="3" 
        y="14" 
        width="18" 
        height="8" 
        rx="1" 
        stroke={color} 
        strokeWidth="1.5"
      />
      
      {/* 서랍 손잡이들 */}
      <circle cx="12" cy="5" r="0.75" fill={color} />
      <circle cx="12" cy="11" r="0.75" fill={color} />
      <circle cx="12" cy="18" r="0.75" fill={color} />
    </svg>
  );
}

// 선반 스타일 스토리지 아이콘
export function ShelfStorageIcon({ 
  width = 24, 
  height = 24, 
  className = "",
  color = "currentColor" 
}: StorageIconProps) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 프레임 */}
      <rect 
        x="3" 
        y="2" 
        width="18" 
        height="20" 
        rx="1" 
        stroke={color} 
        strokeWidth="1.5"
        fill="none"
      />
      
      {/* 선반들 */}
      <line x1="3" y1="8" x2="21" y2="8" stroke={color} strokeWidth="1.5" />
      <line x1="3" y1="14" x2="21" y2="14" stroke={color} strokeWidth="1.5" />
      
      {/* 세로 구분선 */}
      <line x1="12" y1="2" x2="12" y2="22" stroke={color} strokeWidth="1.5" />
      
      {/* 장식 요소 - 박스들 */}
      <rect x="5" y="4" width="5" height="3" fill={color} opacity="0.3" />
      <rect x="14" y="10" width="5" height="3" fill={color} opacity="0.3" />
      <rect x="5" y="16" width="5" height="4" fill={color} opacity="0.3" />
    </svg>
  );
}

// 모던한 수납장 아이콘
export function ModernStorageIcon({ 
  width = 24, 
  height = 24, 
  className = "",
  color = "currentColor" 
}: StorageIconProps) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 메인 프레임 */}
      <path 
        d="M4 3h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z" 
        stroke={color} 
        strokeWidth="1.5"
      />
      
      {/* 상단 도어 */}
      <rect x="4" y="4" width="7" height="8" stroke={color} strokeWidth="1" />
      <rect x="13" y="4" width="7" height="8" stroke={color} strokeWidth="1" />
      
      {/* 하단 서랍 */}
      <rect x="4" y="14" width="16" height="3" stroke={color} strokeWidth="1" />
      <rect x="4" y="17" width="16" height="3" stroke={color} strokeWidth="1" />
      
      {/* 도어 손잡이 */}
      <line x1="9" y1="8" x2="9" y2="8.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="15" y1="8" x2="15" y2="8.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
      
      {/* 서랍 손잡이 */}
      <line x1="10" y1="15.5" x2="14" y2="15.5" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <line x1="10" y1="18.5" x2="14" y2="18.5" stroke={color} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}