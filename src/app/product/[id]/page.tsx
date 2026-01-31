'use client';
import Price from '@/components/Price';
import { pizzas, burgers, pastas, featuredProducts } from '@/data';
import Image from 'next/image';
import React from 'react';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useParams, notFound } from 'next/navigation';

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

  return (
    <div className='min-h-screen bg-gradient-to-br from-cream via-white to-primary-50 py-16 md:py-24'>
      <Container>
        {/* Breadcrumb */}
        <div className='mb-8 flex items-center gap-2 text-sm font-ui text-gray-600'>
          <Link href='/' className='hover:text-primary-600 transition-colors'>
            Home
          </Link>
          <span>/</span>
          <Link
            href='/menu'
            className='hover:text-primary-600 transition-colors'
          >
            Menu
          </Link>
          {category && (
            <>
              <span>/</span>
              <Link
                href={`/menu/${category}`}
                className='hover:text-primary-600 transition-colors capitalize'
              >
                {category}
              </Link>
            </>
          )}
          <span>/</span>
          <span className='text-gray-900 font-semibold'>{product.title}</span>
        </div>

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
