import React from 'react';
import ProductClient from './ProductClient';
import { Metadata } from 'next';
import { productService } from '@/modules/product/product.service';
import dbConnect from '@/lib/mongodb';

// Revalidate every 60 seconds
export const revalidate = 60;

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  await dbConnect();
  // Using catch to handle 404 cleanly in metadata
  const product = await productService
    .getProductById(params.id)
    .catch(() => null);

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

// Generate static params for all products (or a subset for larger catalogs)
export async function generateStaticParams() {
  await dbConnect();
  // Fetching all products might be heavy for huge catalogs, but fine for restaurant menu.
  const allProducts = await productService.getAllProducts({});

  return allProducts.map((p) => ({
    id: p._id.toString(), // Ensure ID is string
  }));
}

const SingleProductPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const params = await props.params;
  await dbConnect();

  const product = await productService
    .getProductById(params.id)
    .catch(() => null);

  // Serialize for Client Component
  const parsedProduct = product ? JSON.parse(JSON.stringify(product)) : null;

  return <ProductClient product={parsedProduct} />;
};

export default SingleProductPage;
