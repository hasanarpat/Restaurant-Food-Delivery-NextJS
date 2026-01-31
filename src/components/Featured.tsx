'use client';
import { featuredProducts } from '@/data';
import React from 'react';
import Container from './ui/Container';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

const Featured = () => {
  // Assign badges to some products for demo
  const productsWithBadges = featuredProducts.map((product, index) => ({
    ...product,
    badge:
      index === 0
        ? ('new' as const)
        : index === 1
          ? ('bestseller' as const)
          : index === 4
            ? ('hot' as const)
            : undefined,
    rating: 4.5 + Math.random() * 0.5, // Random rating between 4.5-5.0
  }));

  return (
    <section className='py-16 md:py-24 bg-white'>
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-12'
        >
          <h2 className='text-4xl md:text-5xl font-heading font-bold text-gradient mb-4'>
            Featured Products
          </h2>
          <p className='text-lg text-gray-600 font-body max-w-2xl mx-auto'>
            Discover our most popular and delicious items, crafted with passion
            and the finest ingredients
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {productsWithBadges.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              desc={product.desc}
              img={product.img}
              price={product.price}
              badge={product.badge}
              rating={product.rating}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Featured;
