import React from 'react';
import { featuredProducts } from '@/data';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

const RelatedProducts = ({ currentId }: { currentId: number }) => {
  // Filter out the current product and take top 3
  const related = featuredProducts
    .filter((item) => item.id !== currentId)
    .slice(0, 3);

  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className='py-8'>
      <div className='flex items-center justify-between mb-8'>
        <h3 className='font-heading text-2xl font-bold text-gray-900'>
          You Might Also Like
        </h3>
        <div className='flex gap-2'>
          <button
            onClick={() => scroll('left')}
            className='w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center hover:bg-gray-50 transition-colors'
            aria-label='Scroll left'
          >
            ←
          </button>
          <button
            onClick={() => scroll('right')}
            className='w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center hover:bg-gray-50 transition-colors'
            aria-label='Scroll right'
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className='flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0'
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {related.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className='min-w-[280px] md:min-w-[320px] snap-start'
          >
            <div className='h-full'>
              <ProductCard
                id={item.id}
                title={item.title}
                desc={item.desc}
                img={item.img}
                price={item.price}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
