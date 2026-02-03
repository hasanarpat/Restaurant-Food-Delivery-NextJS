'use client';
import React, { useEffect, useState } from 'react';
import CountDown from './CountDown';
import Image from 'next/image';
import Button from './ui/Button';
import { motion } from 'framer-motion';
import { Flame, Users, Clock } from 'lucide-react';
import apiClient from '@/lib/axios';
import Link from 'next/link';

interface OfferData {
  _id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  buttonText: string;
  buttonLink?: string;
  endDate: string;
  isActive: boolean;
  badge?: string;
  stats?: {
    ordersToday: number;
    customersServed: number;
  };
}

const Offer = () => {
  const [offer, setOffer] = useState<OfferData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await apiClient.get('/offers');
        if (response.data.success && response.data.data) {
          setOffer(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch offer:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();
  }, []);

  // Don't render if no offer or loading
  if (loading || !offer) {
    return null;
  }

  const discountPercentage = offer.originalPrice
    ? Math.round(
        ((offer.originalPrice - offer.price) / offer.originalPrice) * 100,
      )
    : 0;

  return (
    <section className='relative py-12 md:py-20 overflow-hidden'>
      {/* Background with gradient */}
      <div className='absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700' />

      {/* Decorative pattern overlay */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl' />
        <div className='absolute bottom-0 left-0 w-96 h-96 bg-accent-300 rounded-full blur-3xl' />
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='text-white space-y-6 order-2 lg:order-1'
            >
              {/* Badge */}
              <div className='inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30'>
                <span className='relative flex h-2 w-2'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75' />
                  <span className='relative inline-flex rounded-full h-2 w-2 bg-accent-400' />
                </span>
                <span className='text-sm font-semibold text-white'>
                  {offer.badge || 'Limited Time Offer'}
                </span>
                <Flame className='w-4 h-4 text-accent-300' />
              </div>

              {/* Title */}
              <div>
                <h2 className='text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight'>
                  {offer.title}
                </h2>
                {offer.subtitle && (
                  <p className='text-2xl md:text-3xl font-heading font-bold text-accent-300 mt-2'>
                    {offer.subtitle}
                  </p>
                )}
              </div>

              {/* Description */}
              <p className='text-lg md:text-xl text-white/90 font-body max-w-xl leading-relaxed'>
                {offer.description}
              </p>

              {/* Countdown */}
              <div className='bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20'>
                <div className='flex items-center gap-2 mb-3'>
                  <Clock className='w-5 h-5 text-accent-300' />
                  <span className='font-semibold text-white'>
                    Offer Ends In:
                  </span>
                </div>
                <CountDown targetDate={new Date(offer.endDate)} />
              </div>

              {/* CTA Section */}
              <div className='flex flex-col sm:flex-row gap-4 items-center'>
                <Link href={offer.buttonLink || '/menu'}>
                  <Button
                    size='lg'
                    variant='primary'
                    className='!bg-accent-500 text-white hover:!bg-accent-400 shadow-xl'
                  >
                    {offer.buttonText} 🔥
                  </Button>
                </Link>

                {offer.stats &&
                  (offer.stats.ordersToday > 0 ||
                    offer.stats.customersServed > 0) && (
                    <div className='flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20'>
                      <div className='flex -space-x-3'>
                        <div className='w-10 h-10 rounded-full bg-gradient-to-br from-primary-300 to-primary-400 border-2 border-white' />
                        <div className='w-10 h-10 rounded-full bg-gradient-to-br from-accent-300 to-accent-400 border-2 border-white' />
                        <div className='w-10 h-10 rounded-full bg-gradient-to-br from-success-300 to-success-400 border-2 border-white' />
                      </div>
                      <div className='text-sm'>
                        <div className='flex items-center gap-1.5'>
                          <Users className='w-4 h-4 text-accent-300' />
                          <p className='font-bold text-white'>
                            {offer.stats.ordersToday ||
                              offer.stats.customersServed}
                            +
                          </p>
                        </div>
                        <p className='text-white/80'>ordered today</p>
                      </div>
                    </div>
                  )}
              </div>
            </motion.div>

            {/* Right: Image - Always visible on mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className='relative order-1 lg:order-2'
            >
              {/* Card container for the product */}
              <div className='relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl'>
                {/* Glow effect */}
                <div className='absolute -inset-4 bg-gradient-to-r from-accent-400/20 to-primary-300/20 rounded-3xl blur-2xl' />

                {/* Product Image */}
                <div className='relative aspect-square w-full max-w-md mx-auto'>
                  <div className='absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl' />
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    sizes='(max-width: 768px) 90vw, 50vw'
                    className='object-contain drop-shadow-2xl'
                    priority
                  />
                </div>

                {/* Price tag */}
                <div className='absolute -top-4 -right-4 bg-accent-500 text-white rounded-full w-20 h-20 md:w-24 md:h-24 flex items-center justify-center shadow-xl border-4 border-white/20 transform rotate-12'>
                  <div className='text-center transform -rotate-12'>
                    {discountPercentage > 0 && (
                      <p className='text-xs md:text-sm font-semibold'>
                        Save {discountPercentage}%
                      </p>
                    )}
                    <p className='text-xl md:text-2xl font-bold'>
                      ${offer.price}
                    </p>
                    {offer.originalPrice && (
                      <p className='text-xs line-through opacity-75'>
                        ${offer.originalPrice}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offer;
