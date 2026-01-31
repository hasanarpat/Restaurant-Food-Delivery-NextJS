'use client';
import { pizzas, burgers, pastas } from '@/data';
import { usePathname } from 'next/navigation';
import React, { useState, useMemo } from 'react';
import Container from '@/components/ui/Container';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

type SortOption = 'popular' | 'price-low' | 'price-high' | 'newest';

const SingleCategory = () => {
  const pathname = usePathname();
  const category = pathname.split('/')[2];
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  // Capitalize first letter
  const categoryName = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : 'Products';

  // Get correct products based on category
  const getProducts = () => {
    switch (category) {
      case 'pizzas':
        return pizzas;
      case 'burgers':
        return burgers;
      case 'pastas':
        return pastas;
      default:
        return pizzas;
    }
  };

  const products = getProducts();

  // Sort products based on selected option
  const sortedProducts = useMemo(() => {
    const productsCopy = [...products];

    switch (sortBy) {
      case 'popular':
        return productsCopy.sort(
          (a, b) => (b.popularity || 50) - (a.popularity || 50),
        );
      case 'price-low':
        return productsCopy.sort((a, b) => a.price - b.price);
      case 'price-high':
        return productsCopy.sort((a, b) => b.price - a.price);
      case 'newest':
        return productsCopy.sort((a, b) => {
          const dateA = new Date(a.createdAt || '2024-01-01').getTime();
          const dateB = new Date(b.createdAt || '2024-01-01').getTime();
          return dateB - dateA;
        });
      default:
        return productsCopy;
    }
  }, [products, sortBy]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-cream via-white to-primary-50 pt-36 pb-16 md:pt-48 md:pb-24'>
      <Container>
        <Breadcrumbs
          items={[{ label: 'Menu', href: '/menu' }, { label: categoryName }]}
        />

        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className='mb-12'
        >
          <h1 className='font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-4'>
            {categoryName}
          </h1>
          <p className='font-body text-lg text-gray-600 max-w-2xl'>
            Discover our selection of delicious {categoryName.toLowerCase()},
            crafted with passion and the finest ingredients
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 bg-white rounded-2xl shadow-soft'
        >
          <div className='flex items-center gap-2 font-ui text-sm text-gray-600'>
            <span className='font-semibold text-gray-900'>
              {sortedProducts.length}
            </span>{' '}
            products found
          </div>

          <div className='flex items-center gap-4'>
            <label className='font-ui text-sm text-gray-600'>Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className='px-4 py-2 rounded-lg border border-gray-200 font-ui text-sm focus:outline-none focus:border-primary-500 transition-colors cursor-pointer'
            >
              <option value='popular'>Most Popular</option>
              <option value='price-low'>Price: Low to High</option>
              <option value='price-high'>Price: High to Low</option>
              <option value='newest'>Newest</option>
            </select>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {sortedProducts.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <ProductCard
                id={item.id}
                title={item.title}
                desc={item.desc}
                img={item.img}
                price={item.price}
                badge={
                  index === 0 ? 'bestseller' : index === 2 ? 'hot' : undefined
                }
                rating={4.5 + Math.random() * 0.5}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default SingleCategory;
