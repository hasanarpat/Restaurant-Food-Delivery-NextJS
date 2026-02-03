'use client';
import React, { useState } from 'react';
import Container from '@/components/ui/Container';
import ProductCard from '@/components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { Search, SlidersHorizontal } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(initialMeta.page || 1);
  const [hasMore, setHasMore] = useState(
    (initialMeta.page || 1) < (initialMeta.totalPages || 1),
  );
  const [loading, setLoading] = useState(false);

  // Capitalize first letter
  const categoryName =
    category?.title || slug.charAt(0).toUpperCase() + slug.slice(1);
  // const categoryDesc = category?.desc || `Delicious ${categoryName}`; // Unused?

  const fetchProducts = React.useCallback(
    async (pageNum: number, sortOption: string, search: string = '') => {
      try {
        setLoading(true);
        const limit = initialMeta.limit || 10;
        const res = await fetch(
          `/api/v1/products?catSlug=${slug}&page=${pageNum}&limit=${limit}&sort=${sortOption}&search=${search}`,
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
    },
    [slug, initialMeta.limit],
  );

  const handleSortChange = React.useCallback(
    async (newSort: SortOption) => {
      setSortBy(newSort);
      setPage(1);
      setHasMore(true);
      setProducts([]);

      const result = await fetchProducts(1, newSort, searchTerm);
      if (result) {
        setProducts(result.data);
        setHasMore(result.meta.page < result.meta.totalPages);
        setPage(1);
      }
    },
    [fetchProducts, searchTerm],
  );

  const handleSearch = React.useCallback(
    async (term: string) => {
      setSearchTerm(term);
      setPage(1);
      setHasMore(true);

      const result = await fetchProducts(1, sortBy, term);
      if (result) {
        setProducts(result.data);
        setHasMore(result.meta.page < result.meta.totalPages);
      }
    },
    [fetchProducts, sortBy],
  );

  const isFirstRender = React.useRef(true);

  // Debounced search
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      handleSearch(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, handleSearch]);

  const loadMore = React.useCallback(async () => {
    if (loading || !hasMore) return;

    const nextPage = page + 1;
    const result = await fetchProducts(nextPage, sortBy, searchTerm);

    if (result) {
      setProducts((prev) => [...prev, ...result.data]);
      setPage(result.meta.page);
      setHasMore(result.meta.page < result.meta.totalPages);
    } else {
      setHasMore(false);
    }
  }, [loading, hasMore, page, sortBy, searchTerm, fetchProducts]);

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

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='mb-8 flex flex-col md:flex-row gap-4 p-4 md:p-6 bg-white/80 backdrop-blur-md rounded-3xl shadow-soft border border-white/50'
        >
          {/* Search Input */}
          <div className='flex-1 relative group'>
            <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors' />
            <input
              type='text'
              placeholder={`Search in ${categoryName.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-12 pr-4 py-3 bg-gray-50/50 rounded-2xl border border-gray-100 focus:outline-none focus:border-primary-500 focus:bg-white transition-all font-ui text-sm'
            />
          </div>

          <div className='flex flex-wrap items-center gap-4'>
            {/* Stats */}
            <div className='flex items-center gap-2 px-4 py-3 bg-gray-50/50 rounded-2xl border border-gray-100 font-ui text-sm text-gray-600'>
              <span className='font-bold text-gray-900'>{products.length}</span>
              results
              {searchTerm && <span className='text-xs italic'>(filtered)</span>}
            </div>

            {/* Sort Dropdown */}
            <div className='flex items-center gap-2 px-4 py-1.5 bg-gray-50/50 rounded-2xl border border-gray-100 font-ui text-sm group focus-within:border-primary-500 transition-all'>
              <SlidersHorizontal className='w-4 h-4 text-gray-400' />
              <label className='text-gray-500'>Sort:</label>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className='bg-transparent py-2 focus:outline-none cursor-pointer font-bold text-gray-900'
              >
                <option value='popular'>Most Popular</option>
                <option value='price-low'>Price: Low to High</option>
                <option value='price-high'>Price: High to Low</option>
                <option value='newest'>Newest</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className='relative min-h-[400px]'>
          <AnimatePresence mode='wait'>
            {products.length > 0 ? (
              <motion.div
                key='grid'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              >
                {products.map((item: any, index: number) => (
                  <motion.div
                    key={item._id || item.id || index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
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
              </motion.div>
            ) : (
              !loading && (
                <motion.div
                  key='no-results'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='flex flex-col items-center justify-center py-20 text-center'
                >
                  <div className='w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6'>
                    <Search className='w-10 h-10 text-gray-300' />
                  </div>
                  <h3 className='text-3xl font-heading font-bold text-gray-900 mb-2'>
                    No products found
                  </h3>
                  <p className='text-gray-500 max-w-md'>
                    We couldn't find any {categoryName.toLowerCase()} matching "
                    {searchTerm}". Try another keyword.
                  </p>
                  <button
                    onClick={() => setSearchTerm('')}
                    className='mt-8 px-6 py-3 bg-primary-500 text-white font-bold rounded-2xl hover:bg-primary-600 transition-colors shadow-lg shadow-primary-200'
                  >
                    Clear search
                  </button>
                </motion.div>
              )
            )}
          </AnimatePresence>
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
