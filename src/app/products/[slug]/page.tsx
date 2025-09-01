import { Metadata } from 'next';
import ProductDetailClient from './ProductDetailClient';
import { productsV2Data } from '@/data/productsV2';
import { convertAndFormatPrice } from '@/utils/currency';

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productsV2Data.find(p => p.slug === slug);
  
  if (!product) {
    return {
      title: 'Product Not Found | BEFUN',
      description: 'The requested product could not be found.'
    };
  }

  const defaultVariant = product.colorVariants.find(v => v.isDefault) || product.colorVariants[0];
  
  if (!defaultVariant) {
    return {
      title: `${product.name} | BEFUN`,
      description: `${product.name}. ${product.furnitureType || product.category}. ${product.exactDimensions}. ${convertAndFormatPrice(product.price)}부터`,
      keywords: `BEFUN, ${product.name}, ${product.furnitureType || product.category}, 가구, furniture`
    };
  }
  
  return {
    title: `${product.name} - ${defaultVariant.name} | BEFUN`,
    description: `${product.name} - ${defaultVariant.name}. ${product.furnitureType || product.category}. ${product.exactDimensions}. 다양한 색상 옵션 available. ${convertAndFormatPrice(product.price)}부터`,
    keywords: `BEFUN, ${product.name}, ${defaultVariant.name}, ${product.furnitureType || product.category}, 가구, furniture`,
    openGraph: {
      title: `${product.name} - ${defaultVariant.name} | BEFUN`,
      description: `${product.name} - ${defaultVariant.name}. ${product.furnitureType || product.category}`,
      images: [
        {
          url: defaultVariant.mainImage,
          width: 800,
          height: 800,
          alt: `${product.name} - ${defaultVariant.name}`
        }
      ],
      type: 'website'
    }
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  return <ProductDetailClient slug={slug} />;
}