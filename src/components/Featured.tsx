'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Container from './ui/Container';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import apiClient from '@/lib/axios';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

const Featured = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { sentinelRef } = useInfiniteScroll({
    hasMore,
    isLoading,
    onLoadMore: () => setPage((prev) => prev + 1),
    rootMargin: '100px',
  });

  const fetchProducts = useCallback(async (pageNum: number) => {
    try {
      setIsLoading(true);
      const res = await apiClient.get(
        `/products?isFeatured=true&limit=8&page=${pageNum}`,
      );
      // API returns: { success: true, data: [...], meta: ... }
      const newProducts = res.data.data || [];
      const meta = res.data.meta;
      console.log(newProducts);
      setProducts((prev) => {
        // Avoid duplicates if React.StrictMode causes double render/fetch
        const existingIds = new Set(prev.map((p) => p._id));
        const uniqueNew = newProducts.filter(
          (p: any) => !existingIds.has(p._id),
        );
        return [...prev, ...uniqueNew];
      });

      if (pageNum >= meta.totalPages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to fetch featured products', error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(page);
  }, [page, fetchProducts]);

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
          {products.map((product, index) => (
            <ProductCard
              key={product._id}
              id={product._id} // Map _id to id
              title={product.title}
              desc={product.desc}
              img={product.img}
              price={product.price}
              badge={
                index === 0 ? 'bestseller' : index === 2 ? 'hot' : undefined
              }
              // If product.rating exists use it, else default
              rating={product.rating || 4.5}
            />
          ))}
        </div>

        {/* Loading Spinner / Sentinel */}
        <div
          ref={sentinelRef}
          className='h-10 w-full flex justify-center items-center mt-8'
        >
          {isLoading && (
            <div className='w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin'></div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Featured;
