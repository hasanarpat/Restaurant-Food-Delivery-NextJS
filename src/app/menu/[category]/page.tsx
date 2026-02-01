import React from 'react';
import CategoryClient from './CategoryClient';
import { Metadata } from 'next';
import { menu } from '@/data';

export async function generateMetadata(props: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const category = menu.find((item) => item.slug === params.category);

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
  return [
    { category: 'pizzas' },
    { category: 'burgers' },
    { category: 'pastas' },
    { category: 'lahmacun' },
    { category: 'baklava' },
  ];
}

const SingleCategory = async (props: {
  params: Promise<{ category: string }>;
}) => {
  const params = await props.params;
  return <CategoryClient category={params.category} />;
};

export default SingleCategory;
