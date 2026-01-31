'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import Badge from './ui/Badge';
import Rating from './ui/Rating';

interface ProductCardProps {
  id: number;
  title: string;
  desc?: string;
  img?: string;
  price: number;
  badge?: 'new' | 'bestseller' | 'hot' | 'discount';
  rating?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  desc,
  img,
  price,
  badge,
  rating = 4.5,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className='group relative bg-white rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-500 overflow-hidden'
    >
      {/* Badge */}
      {badge && (
        <div className='absolute top-4 left-4 z-20'>
          <Badge variant={badge} pulse>
            {badge === 'new' && 'New'}
            {badge === 'bestseller' && '⭐ Best Seller'}
            {badge === 'hot' && '🔥 Hot'}
            {badge === 'discount' && '💰 Sale'}
          </Badge>
        </div>
      )}

      {/* Image Section */}
      <Link href={`/product/${id}`}>
        <div className='relative h-64 w-full overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100'>
          {img && (
            <Image
              src={img}
              alt={title}
              fill
              className='object-contain p-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500'
            />
          )}

          {/* Gradient overlay on hover */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
        </div>
      </Link>

      {/* Content Section */}
      <div className='p-6 space-y-4'>
        {/* Title */}
        <Link href={`/product/${id}`}>
          <h3 className='font-heading text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1'>
            {title}
          </h3>
        </Link>

        {/* Rating */}
        <Rating rating={rating} size='sm' />

        {/* Description */}
        {desc && (
          <p className='font-body text-sm text-gray-600 line-clamp-2'>{desc}</p>
        )}

        {/* Price and Action */}
        <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
          <div>
            <span className='text-2xl font-heading font-bold text-gradient'>
              ${price.toFixed(2)}
            </span>
          </div>

          <Button
            size='sm'
            variant='primary'
            className='transform group-hover:scale-105'
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Border glow effect */}
      <div className='absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary-300/50 transition-colors duration-300 pointer-events-none' />
    </motion.div>
  );
};

export default ProductCard;
