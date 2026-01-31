'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from './ui/Button';

interface MenuCategoryCardProps {
  slug: string;
  title: string;
  desc: string;
  img: string;
  index: number;
}

const MenuCategoryCard: React.FC<MenuCategoryCardProps> = ({
  slug,
  title,
  desc,
  img,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className='group relative h-full'
    >
      <Link href={`/menu/${slug}`} className='block h-full'>
        <div className='relative h-full rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-500'>
          {/* Background Image with overlay */}
          <div className='absolute inset-0'>
            <Image
              src={img}
              alt={title}
              fill
              className='object-cover group-hover:scale-110 transition-transform duration-700'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent' />
          </div>

          {/* Content */}
          <div className='relative h-full flex flex-col justify-end p-8 md:p-10'>
            {/* Decorative element */}
            <div className='absolute top-6 right-6 w-16 h-16 bg-primary-400/20 rounded-full blur-2xl group-hover:bg-primary-400/40 transition-all duration-500' />

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            >
              <h2 className='font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 group-hover:text-primary-300 transition-colors'>
                {title}
              </h2>
              <p className='font-body text-white/90 text-base md:text-lg max-w-md mb-6'>
                {desc}
              </p>

              <div className='inline-block'>
                <Button
                  variant='primary'
                  size='lg'
                  className='group-hover:scale-105 transition-transform'
                >
                  Explore Menu →
                </Button>
              </div>
            </motion.div>

            {/* Animated border */}
            <div className='absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary-400/50 transition-all duration-500 pointer-events-none' />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MenuCategoryCard;
