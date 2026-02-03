'use client';
import React, { useState, useMemo } from 'react';
import Container from '@/components/ui/Container';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

type SortOption = 'popular' | 'price-low' | 'price-high' | 'newest';

interface CategoryClientProps {
  category: any;
  initialProducts: any[];
  initialMeta: any;
  slug: string;
}

const CategoryClient: React.FC<CategoryClientProps> = ({
  category,
  initialProducts,
  initialMeta,
  slug,
}) => {
  const [products, setProducts] = useState(initialProducts);
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [page, setPage] = useState(initialMeta.page || 1);
  const [hasMore, setHasMore] = useState(
    (initialMeta.page || 1) < (initialMeta.totalPages || 1),
  );
  const [loading, setLoading] = useState(false);

  // Capitalize first letter
  const categoryName =
    category?.title || slug.charAt(0).toUpperCase() + slug.slice(1);
  // const categoryDesc = category?.desc || `Delicious ${categoryName}`; // Unused?

  const fetchProducts = async (pageNum: number, sortOption: string) => {
    try {
      setLoading(true);
      const limit = initialMeta.limit || 10;
      const res = await fetch(
        `/api/v1/products?catSlug=${slug}&page=${pageNum}&limit=${limit}&sort=${sortOption}`,
      );
      const data = await res.json();
      if (res.ok) {
        return { data: data.data, meta: data.meta };
      }
      return null;
    } catch (error) {
      console.error('Failed to fetch products', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = async (newSort: SortOption) => {
    setSortBy(newSort);
    setPage(1);
    setHasMore(true); // Assume true until fetch
    setProducts([]); // Clear current to show loading? Or keep? Better clear or show skeleton.

    // Fetch page 1 with new sort
    const result = await fetchProducts(1, newSort);
    if (result) {
      setProducts(result.data);
      setHasMore(result.meta.page < result.meta.totalPages);
      setPage(1);
    }
  };

  const loadMore = async () => {
    if (loading || !hasMore) return;

    const nextPage = page + 1;
    const result = await fetchProducts(nextPage, sortBy);

    if (result) {
      setProducts((prev) => [...prev, ...result.data]);
      setPage(result.meta.page);
      setHasMore(result.meta.page < result.meta.totalPages);
    } else {
      setHasMore(false); // Stop trying on error
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-cream via-white to-primary-50 pt-40 pb-16 md:pt-52 md:pb-24'>
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
              {products.length}+
            </span>{' '}
            products shown
          </div>

          <div className='flex items-center gap-4'>
            <label className='font-ui text-sm text-gray-600'>Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
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
          {products.map((item: any, index: number) => (
            <motion.div
              key={item._id || item.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <ProductCard
                id={item._id || item.id}
                title={item.title}
                desc={item.desc}
                img={item.img}
                price={item.price}
                badge={item.isFeatured ? 'hot' : undefined}
                rating={item.rating || 0}
              />
            </motion.div>
          ))}
        </div>

        {/* Infinite Scroll Trigger */}
        {hasMore && (
          <motion.div
            onViewportEnter={loadMore}
            className='w-full py-10 flex justify-center'
          >
            {loading ? (
              <div className='w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin'></div>
            ) : (
              <div className='h-10'></div>
            )}
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default CategoryClient;
