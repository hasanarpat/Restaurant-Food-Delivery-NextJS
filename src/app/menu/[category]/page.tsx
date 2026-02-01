import React from 'react';
import CategoryClient from './CategoryClient';
import { Metadata } from 'next';
import { categoryService } from '@/modules/category/category.service';
import { productService } from '@/modules/product/product.service';
import dbConnect from '@/lib/mongodb';

// Revalidate every 60 seconds
export const revalidate = 60;

export async function generateMetadata(props: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  await dbConnect();
  const category = await categoryService
    .getCategoryBySlug(params.category)
    .catch(() => null);

  if (!category) {
    return {
      title: 'Menu Category',
    };
  }

  return {
    title: category.title,
    description: category.desc,
    openGraph: {
      title: category.title,
      description: category.desc,
      images: [category.img || ''],
    },
  };
}

// Generate static params for all categories
export async function generateStaticParams() {
  await dbConnect();
  const categories = await categoryService.getAllCategories();

  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

const SingleCategory = async (props: {
  params: Promise<{ category: string }>;
}) => {
  const params = await props.params;
  await dbConnect();

  // 1. Get Category Details
  const category = await categoryService
    .getCategoryBySlug(params.category)
    .catch(() => null);

  // 2. Get Products for this Category
  // Note: productService filter uses 'catSlug'
  const products = await productService.getAllProducts({
    catSlug: params.category,
  });

  // Serialize for Client Component
  const parsedCategory = category ? JSON.parse(JSON.stringify(category)) : null;
  const parsedProducts = JSON.parse(JSON.stringify(products));

  return (
    <CategoryClient
      category={parsedCategory}
      products={parsedProducts}
      slug={params.category}
    />
  );
};

export default SingleCategory;
