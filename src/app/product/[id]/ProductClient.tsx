'use client';
import Price from '@/components/Price';
import Image from 'next/image';
import React from 'react';
import Container from '@/components/ui/Container';
import { motion } from 'framer-motion';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Reviews from '@/components/Reviews';
import NutritionalInfo from '@/components/NutritionalInfo';
import RelatedProducts from '@/components/RelatedProducts';
import { Flame, AlertTriangle, Star } from 'lucide-react';

interface ProductClientProps {
  product: any; // Ideally IProduct
}

const ProductClient: React.FC<ProductClientProps> = ({ product }) => {
  // If no product is passed, show 404
  if (!product) {
    return notFound();
  }

  // Use DB id
  const id = product._id || product.id;

  // No complex category lookup needed effectively,
  // but if we want breadcrumbs we can use product.categoryId if populated, or just "Products"
  // Assuming populated: product.categoryId.slug
  // Or if not populated, just link to Menu.
  let categorySlug = '';
  let categoryTitle = '';

  if (product.categoryId && typeof product.categoryId === 'object') {
    categorySlug = product.categoryId.slug;
    categoryTitle = product.categoryId.title;
  }

  const breadcrumbItems = [
    { label: 'Menu', href: '/menu' },
    ...(categorySlug
      ? [{ label: categoryTitle, href: `/menu/${categorySlug}` }]
      : []),
    { label: product.title },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-cream via-white to-primary-50 pt-40 pb-12 md:pt-52 md:pb-16'>
      <Container>
        <Breadcrumbs items={breadcrumbItems} />

        {/* Main Product Section */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12'>
          {/* Left Column: Image & Nutrition */}
          <div className='flex flex-col gap-6'>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className='relative aspect-square bg-white rounded-[2.5rem] shadow-soft-lg overflow-hidden p-8 md:p-12 border border-gray-100'
            >
              {product.img && (
                <Image
                  src={product.img}
                  alt={product.title}
                  fill
                  className='object-contain hover:scale-105 transition-transform duration-700'
                  priority
                />
              )}
              {/* Floating Badge */}
              <div className='absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm text-sm font-bold text-gray-800 flex items-center gap-1'>
                <Flame className='w-4 h-4 text-orange-500 fill-orange-500' />{' '}
                Popular
              </div>
            </motion.div>

            {/* Desktop Nutritional Info (Visible on LG) */}
            <div className='hidden lg:block'>
              <NutritionalInfo />
            </div>
          </div>

          {/* Right Column: Details & Price */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className='flex flex-col h-full'
          >
            <div className='sticky top-28'>
              <h1 className='font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 tracking-tight leading-tight'>
                {product.title}
              </h1>

              {/* Rating Summary */}
              <div className='flex items-center gap-2 mb-4'>
                <div className='flex text-yellow-500'>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className='w-5 h-5 fill-current' />
                  ))}
                </div>
                <span className='text-sm text-gray-500 font-semibold'>
                  (128 reviews)
                </span>
              </div>

              <p className='font-body text-base md:text-lg text-gray-600 mb-6 leading-relaxed'>
                {product.desc}
              </p>

              {/* Ingredients Tag */}
              <div className='mb-6'>
                <h3 className='font-heading text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider'>
                  Key Ingredients
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {[
                    'Organic Flour',
                    'Fresh Mozzarella',
                    'San Marzano Tomatoes',
                    'Basil',
                    'Virgin Olive Oil',
                  ].map((ing) => (
                    <span
                      key={ing}
                      className='px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-600'
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Allergens */}
              <div className='mb-6 p-4 bg-orange-50 rounded-xl border border-orange-100 flex items-start gap-3'>
                <AlertTriangle className='w-6 h-6 text-orange-500 shrink-0' />
                <div>
                  <h4 className='font-bold text-orange-800 text-sm'>
                    Allergen Info
                  </h4>
                  <p className='text-xs text-orange-700 mt-1'>
                    Contains: Gluten, Dairy. May contain traces of nuts.
                  </p>
                </div>
              </div>

              <div className='bg-white p-6 md:p-8 rounded-3xl shadow-soft border border-gray-100'>
                <Price
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.img}
                  options={product.options}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile Nutritional Info (Visible on Mobile only) */}
        <div className='lg:hidden mb-12'>
          <NutritionalInfo />
        </div>

        {/* Reviews Section */}
        <div className='border-t border-gray-200 pt-12 mb-12'>
          <Reviews />
        </div>

        {/* Related Products Slider */}
        <div className='border-t border-gray-200 pt-12'>
          <RelatedProducts currentId={id} />
        </div>
      </Container>
    </div>
  );
};

export default ProductClient;
