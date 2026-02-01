import React from 'react';
import ProductClient from './ProductClient';
import { Metadata } from 'next';
import { productService } from '@/modules/product/product.service';
import dbConnect from '@/lib/mongodb';

// Use dynamic rendering to avoid MongoDB connection during build
export const dynamic = 'force-dynamic';

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
  try {
    await dbConnect();
    // Fetching all products might be heavy for huge catalogs, but fine for restaurant menu.
    const allProducts = await productService.getAllProducts({});

    return allProducts.map((p) => ({
      id: p._id.toString(), // Ensure ID is string
    }));
  } catch (error) {
    console.warn(
      'Failed to fetch products from database, returning empty array:',
      error,
    );
    // Return empty array if database connection fails
    // Pages will be generated on-demand when visited
    return [];
  }
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
