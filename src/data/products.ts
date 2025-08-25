import { Product } from '@/types';

// 기본 5개 상품
const baseProducts: Product[] = [
  {
    id: '1',
    name: 'Modern Chair',
    slug: 'modern-chair',
    images: ['/images/chair-1.jpg', '/images/chair-2.jpg'],
    image: '/images/chair-1.jpg',
    variants: [
      {
        id: 'v1',
        options: { color: 'Black', material: 'Leather' },
        sku: 'CHR-001-BLK',
        price: { currency: 'KRW', amount: 150000 }
      },
      {
        id: 'v2',
        options: { color: 'Brown', material: 'Fabric' },
        sku: 'CHR-001-BRN',
        price: { currency: 'KRW', amount: 120000 }
      }
    ],
    price: { currency: 'KRW', amount: 150000 },
    description: '현대적인 디자인의 편안한 의자',
    category: 'furniture',
    isNew: true,
    freeDelivery: true
  },
  {
    id: '2',
    name: 'Designer Table',
    slug: 'designer-table',
    images: ['/images/table-1.jpg', '/images/table-2.jpg'],
    image: '/images/table-1.jpg',
    variants: [
      {
        id: 'v3',
        options: { size: 'Large', finish: 'Natural' },
        sku: 'TBL-002-LRG',
        price: { currency: 'KRW', amount: 300000 }
      }
    ],
    price: { currency: 'KRW', amount: 180000 },
    originalPrice: { currency: 'KRW', amount: 300000 },
    discount: 40,
    description: '독특한 디자인의 테이블',
    category: 'furniture'
  },
  {
    id: '3',
    name: 'Smart Lamp',
    slug: 'smart-lamp',
    images: ['/images/lamp-1.jpg'],
    image: '/images/lamp-1.jpg',
    variants: [
      {
        id: 'v4',
        options: { color: 'White', type: 'LED' },
        sku: 'LMP-003-WHT',
        price: { currency: 'KRW', amount: 80000 }
      }
    ],
    price: { currency: 'KRW', amount: 80000 },
    description: '스마트 기능이 탑재된 현대적인 램프',
    category: 'lighting',
    isNew: true,
    freeDelivery: true
  },
  {
    id: '4',
    name: 'Art Print',
    slug: 'art-print',
    images: ['/images/art-1.jpg'],
    image: '/images/art-1.jpg',
    variants: [
      {
        id: 'v5',
        options: { size: 'A3', frame: 'Black' },
        sku: 'ART-004-A3',
        price: { currency: 'KRW', amount: 50000 }
      }
    ],
    price: { currency: 'KRW', amount: 50000 },
    description: '독특한 아트 프린트',
    category: 'art'
  },
  {
    id: '5',
    name: 'Plant Pot',
    slug: 'plant-pot',
    images: ['/images/pot-1.jpg'],
    image: '/images/pot-1.jpg',
    variants: [
      {
        id: 'v6',
        options: { size: 'Medium', material: 'Ceramic' },
        sku: 'POT-005-MED',
        price: { currency: 'KRW', amount: 35000 }
      }
    ],
    price: { currency: 'KRW', amount: 35000 },
    description: '자연스러운 식물 화분',
    category: 'garden'
  }
];

// 추가 상품 데이터 생성 함수
function generateAdditionalProducts(): Product[] {
  const categories = ['furniture', 'lighting', 'art', 'garden', 'kitchen', 'bathroom', 'bedroom', 'office'];
  const materials = ['Wood', 'Metal', 'Glass', 'Plastic', 'Fabric', 'Leather', 'Ceramic', 'Stone'];
  const colors = ['Black', 'White', 'Brown', 'Gray', 'Blue', 'Green', 'Red', 'Yellow'];
  
  const additionalProducts: Product[] = [];
  
  for (let i = 6; i <= 30; i++) {
    const category = categories[i % categories.length];
    const material = materials[i % materials.length];
    const color = colors[i % colors.length];
    
    // 결정적인 가격 생성 (Math.random() 대신)
    const priceBase = ((i * 7) % 500000) + 20000;
    const variantPrice = ((i * 11) % 500000) + 20000;
    
    // 할인 적용 (30% 확률)
    const hasDiscount = i % 3 === 0;
    const discount = hasDiscount ? 40 : 0;
    const finalPrice = hasDiscount ? Math.round(priceBase * 0.6) : priceBase;
    const originalPrice = hasDiscount ? priceBase : undefined;
    
    // 신상품 표시 (20% 확률)
    const isNew = i % 5 === 0;
    // 무료배송 (25% 확률)
    const freeDelivery = i % 4 === 0;
    
    const product: Product = {
      id: i.toString(),
      name: `${category.charAt(0).toUpperCase() + category.slice(1)} Item ${i}`,
      slug: `${category}-item-${i}`,
      images: [`/images/${category}-${i}.jpg`],
      image: `/images/${category}-${i}.jpg`,
      variants: [
        {
          id: `v${i}`,
          options: { material, color },
          sku: `${category.toUpperCase().substring(0, 3)}-${i.toString().padStart(3, '0')}`,
          price: { currency: 'KRW', amount: variantPrice }
        }
      ],
      price: { currency: 'KRW', amount: finalPrice },
      originalPrice: originalPrice ? { currency: 'KRW', amount: originalPrice } : undefined,
      discount: discount > 0 ? discount : undefined,
      description: `${material} 소재의 ${color}색 ${category} 제품입니다.`,
      category,
      isNew: isNew || undefined,
      freeDelivery: freeDelivery || undefined
    };
    
    additionalProducts.push(product);
  }
  
  return additionalProducts;
}

export const sampleProducts: Product[] = [
  ...baseProducts,
  ...generateAdditionalProducts()
];
