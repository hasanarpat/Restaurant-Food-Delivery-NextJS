import React from 'react';
import ProductClient from './ProductClient';
import {
  pizzas,
  burgers,
  pastas,
  lahmacun,
  baklava,
  featuredProducts,
} from '@/data';
import { Metadata } from 'next';

const allProducts = [
  ...pizzas,
  ...burgers,
  ...pastas,
  ...lahmacun,
  ...baklava,
  ...featuredProducts,
];

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = allProducts.find((p) => p.id === Number(params.id));

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.title,
    description: product.desc || `Order ${product.title} from Antepli Pizza`,
    openGraph: {
      title: product.title,
      description: product.desc || `Order ${product.title} from Antepli Pizza`,
      images: [product.img || ''],
    },
  };
}

// Generate static params for all known products
export async function generateStaticParams() {
  const allProducts = [
    ...pizzas,
    ...burgers,
    ...pastas,
    ...lahmacun,
    ...baklava,
    ...featuredProducts,
  ];

  // Remove duplicates based on ID
  const uniqueIds = Array.from(new Set(allProducts.map((p) => p.id)));

  return uniqueIds.map((id) => ({
    id: id.toString(),
  }));
}

const SingleProductPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const params = await props.params;
  return <ProductClient id={Number(params.id)} />;
};

export default SingleProductPage;
