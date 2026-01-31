'use client';
import Price from '@/components/Price';
import { pizzas, burgers, pastas, featuredProducts } from '@/data';
import Image from 'next/image';
import React from 'react';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useParams, notFound } from 'next/navigation';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

const SingleProductPage = () => {
  const params = useParams();
  const id = Number(params.id);

  // Find product in all data sources
  const product =
    pizzas.find((p) => p.id === id) ||
    burgers.find((p) => p.id === id) ||
    pastas.find((p) => p.id === id) ||
    featuredProducts.find((p) => p.id === id);

  // Determine category for breadcrumb
  let category = '';
  if (pizzas.find((p) => p.id === id)) category = 'pizzas';
  else if (burgers.find((p) => p.id === id)) category = 'burgers';
  else if (pastas.find((p) => p.id === id)) category = 'pastas';

  if (!product) {
    return notFound();
  }

  const breadcrumbItems = [
    { label: 'Menu', href: '/menu' },
    ...(category ? [{ label: category, href: `/menu/${category}` }] : []),
    { label: product.title },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-cream via-white to-primary-50 pt-36 pb-16 md:pt-48 md:pb-24'>
      <Container>
        <Breadcrumbs items={breadcrumbItems} />

        {/* Product Details */}
        <div className='flex flex-col md:flex-row gap-12 md:gap-16'>
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className='flex-1'
          >
            <div className='relative aspect-square bg-white rounded-3xl shadow-soft overflow-hidden p-8'>
              {product.img && (
                <Image
                  src={product.img}
                  alt={product.title}
                  fill
                  className='object-contain hover:scale-105 transition-transform duration-500'
                />
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className='flex-1 flex flex-col gap-6'
          >
            <div>
              <h1 className='font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-4'>
                {product.title}
              </h1>
              <p className='font-body text-lg text-gray-600'>{product.desc}</p>
            </div>

            <div className='border-t border-gray-200 pt-6'>
              <Price
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.img}
                options={product.options}
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default SingleProductPage;
