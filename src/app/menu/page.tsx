'use client';
import { menu } from '@/data';
import React from 'react';
import Container from '@/components/ui/Container';
import MenuCategoryCard from '@/components/MenuCategoryCard';
import { motion } from 'framer-motion';

const MenuPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-cream via-white to-primary-50 py-16 md:py-24'>
      <Container>
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center mb-12 md:mb-16'
        >
          <h1 className='font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-gradient mb-6'>
            Our Menu
          </h1>
          <p className='font-body text-lg md:text-xl text-gray-600 max-w-2xl mx-auto'>
            Explore our delicious selection of handcrafted dishes, made with
            love and the finest ingredients
          </p>
        </motion.div>

        {/* Menu Categories Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8'>
          {menu.map((category, index) => (
            <div key={category.id} className='h-[500px] lg:h-[600px]'>
              <MenuCategoryCard
                slug={category.slug}
                title={category.title}
                desc={category.desc || ''}
                img={category.img || ''}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className='mt-16 text-center'
        >
          <p className='font-ui text-sm text-gray-500'>
            All dishes are prepared fresh to order • Gluten-free and vegetarian
            options available
          </p>
        </motion.div>
      </Container>
    </div>
  );
};

export default MenuPage;
