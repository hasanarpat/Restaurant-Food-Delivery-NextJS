'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Badge from './ui/Badge';
import Rating from './ui/Rating';
import { useCart } from '@/context/CartContext';
import { Flame, Sparkles, Star, Check } from 'lucide-react';

interface ProductCardProps {
  id: string | number;
  title: string;
  desc?: string;
  img?: string;
  price: number;
  badge?: 'hot' | 'new' | 'bestseller';
  rating?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  desc,
  img,
  price,
  badge,
  rating,
}) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id,
      title,
      price,
      size: 'Medium',
      image: img || '/temporary/p1.png',
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <Link href={`/product/${id}`}>
      <div className='group relative bg-white rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden flex flex-col h-full'>
        {/* Badge */}
        {/* Badge */}
        {badge && (
          <div className='absolute top-4 left-4 z-10'>
            <Badge variant={badge}>
              {badge === 'hot' && <Flame className='w-4 h-4 fill-current' />}
              {badge === 'new' && <Sparkles className='w-4 h-4' />}
              {badge === 'bestseller' && (
                <Star className='w-4 h-4 fill-current' />
              )}
            </Badge>
          </div>
        )}

        {/* Image */}
        <div className='relative h-56 bg-gradient-to-br from-cream to-primary-50 overflow-hidden'>
          {img && (
            <Image
              src={img}
              alt={title}
              fill
              sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
              className='object-contain object-center p-4 group-hover:scale-110 transition-transform duration-300'
            />
          )}
        </div>

        {/* Content */}
        <div className='p-6 flex flex-col flex-1'>
          <h3 className='font-heading text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-1'>
            {title}
          </h3>

          {desc && (
            <p className='font-body text-sm text-gray-600 mb-4 line-clamp-2 flex-1'>
              {desc}
            </p>
          )}

          <div className='flex items-center justify-between mt-auto'>
            <div>
              <p className='font-heading text-2xl font-bold text-gradient'>
                ${price.toFixed(2)}
              </p>
              {rating && <Rating rating={rating} size='sm' className='mt-1' />}
            </div>

            {/* Quick Add Button */}
            <button
              onClick={handleQuickAdd}
              className={`px-4 py-2 rounded-lg font-ui text-sm font-semibold transition-all ${
                isAdded
                  ? 'bg-success-500 text-white'
                  : 'bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg'
              }`}
            >
              {isAdded ? (
                <div className='flex items-center gap-1'>
                  <Check className='w-4 h-4' />
                  Added!
                </div>
              ) : (
                <>+ Cart</>
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
