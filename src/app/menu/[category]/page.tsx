import React from 'react';
import CategoryClient from './CategoryClient';

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
