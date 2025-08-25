export interface ColorOption {
  id: string;
  name: string;
  color: string;
  swatchUrl: string;
  imageUrl: string;
}

export interface ColorChangeableProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  colors: ColorOption[];
  defaultColorId: string;
}

// 로컬 서랍 이미지를 사용한 컬러 변경 가능한 제품들 (순서대로 A(1), A(2), A(3), A(4))
export const colorChangeableProducts: ColorChangeableProduct[] = [
  {
    id: '1',
    name: 'Original Modern',
    slug: 'original-modern',
    description: 'Modern storage solution with clean lines',
    category: 'storage',
    defaultColorId: 'default',
    colors: [
      {
        id: 'default',
        name: 'Default',
        color: '#FFFFFF',
        swatchUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iI0UwRTBFMCIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPgo=',
        imageUrl: '/images/products/drawers/A (1).avif'
      }
    ]
  },
  {
    id: '2',
    name: 'Original Classic',
    slug: 'original-classic',
    description: 'Classic storage with timeless appeal',
    category: 'storage',
    defaultColorId: 'default',
    colors: [
      {
        id: 'default',
        name: 'Default',
        color: '#F5F5DC',
        swatchUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiNGNUY1REMiIHN0cm9rZT0iI0UwRTBFMCIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPgo=',
        imageUrl: '/images/products/drawers/A (2).avif'
      }
    ]
  },
  {
    id: '3',
    name: 'Tone',
    slug: 'tone',
    description: 'Minimalist design with subtle tones',
    category: 'storage',
    defaultColorId: 'default',
    colors: [
      {
        id: 'default',
        name: 'Default',
        color: '#DEB887',
        swatchUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiNERUI4ODciIHN0cm9rZT0iI0UwRTBFMCIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPgo=',
        imageUrl: '/images/products/drawers/A (3).avif'
      }
    ]
  },
  {
    id: '4',
    name: 'Edge',
    slug: 'edge',
    description: 'Contemporary design with visible plywood edges',
    category: 'storage',
    defaultColorId: 'default',
    colors: [
      {
        id: 'default',
        name: 'Default',
        color: '#8B4513',
        swatchUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiM4QjQ1MTMiIHN0cm9rZT0iI0UwRTBFMCIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPgo=',
        imageUrl: '/images/products/drawers/A (4).avif'
      }
    ]
  }
];