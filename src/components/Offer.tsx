'use client';
import React from 'react';
import CountDown from './CountDown';
import Image from 'next/image';
import Button from './ui/Button';
import Container from './ui/Container';
import { motion } from 'framer-motion';

const Offer = () => {
  return (
    <section className='relative py-16 md:py-24 bg-gradient-to-br from-primary-50 via-accent-50 to-orange-50 overflow-hidden'>
      {/* Floating decorative elements */}
      <div className='absolute top-10 right-10 w-32 h-32 bg-primary-300 rounded-full blur-3xl opacity-30 animate-float' />
      <div
        className='absolute bottom-20 left-20 w-40 h-40 bg-accent-300 rounded-full blur-3xl opacity-20 animate-float'
        style={{ animationDelay: '1.5s' }}
      />

      <Container>
        <div className='flex flex-col lg:flex-row items-center gap-12'>
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='flex-1 text-center lg:text-left space-y-6 z-10'
          >
            <div className='inline-block'>
              <span className='inline-flex items-center gap-2 px-4 py-2 bg-accent-500 text-white rounded-full text-sm font-bold animate-pulse'>
                <span className='relative flex h-3 w-3'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75'></span>
                  <span className='relative inline-flex rounded-full h-3 w-3 bg-white'></span>
                </span>
                Limited Time Offer
              </span>
            </div>

            <h2 className='text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900'>
              Delicious Burger <span className='text-gradient'>&</span> French
              Fries
            </h2>

            <p className='text-lg md:text-xl text-gray-700 font-body max-w-xl'>
              Progressively simplify effective e-toilers and process-centric
              methods of empowerment. Quickly pontificate parallel.
            </p>

            <div className='space-y-4'>
              <CountDown />

              <div className='flex flex-col sm:flex-row gap-4 items-center lg:items-start'>
                <Button size='lg' variant='primary'>
                  Order Now 🍔
                </Button>
                <div className='flex items-center gap-3'>
                  <div className='flex -space-x-2'>
                    <div className='w-10 h-10 rounded-full bg-primary-400 border-2 border-white' />
                    <div className='w-10 h-10 rounded-full bg-accent-400 border-2 border-white' />
                    <div className='w-10 h-10 rounded-full bg-success-400 border-2 border-white' />
                  </div>
                  <div className='text-sm text-gray-600'>
                    <p className='font-semibold'>1,234 people</p>
                    <p>ordered today</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className='flex-1 relative z-10'
          >
            <div className='relative w-full aspect-square max-w-md mx-auto'>
              <div className='absolute inset-0 bg-gradient-to-br from-primary-300 to-accent-300 rounded-full blur-2xl opacity-30 animate-pulse-slow' />
              <Image
                src='/offerProduct.png'
                alt='Special Offer Product'
                fill
                className='object-contain drop-shadow-2xl animate-float'
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Offer;
