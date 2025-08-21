import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { sampleProducts } from '@/data/products';
import { Product } from '@/types';
import { ProductDetailClient } from './ProductDetailClient';

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// ISR을 위한 generateStaticParams
export async function generateStaticParams() {
  return sampleProducts.map((product) => ({
    id: product.id,
  }));
}

// 상품 데이터 가져오기
function getProduct(id: string): Product | undefined {
  return sampleProducts.find(product => product.id === id);
}

// JSON-LD 구조화데이터 생성
function generateProductJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.variants[0]?.sku,
    brand: {
      '@type': 'Brand',
      name: 'Befun'
    },
    offers: {
      '@type': 'Offer',
      price: product.price.amount,
      priceCurrency: product.price.currency,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Befun'
      }
    },
    category: product.category,
    ...(product.materials && {
      material: product.materials.map(m => m.name).join(', ')
    })
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  const jsonLd = generateProductJsonLd(product);

  return (
    <>
      {/* JSON-LD 구조화데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <ProductDetailClient product={product} />
    </>
  );
}
