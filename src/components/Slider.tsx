'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';

const slides = [
  {
    id: 1,
    slide: '/slide1.png',
    title: 'The best pizzas in all the galaxies...',
    description:
      'Delicious handcrafted pizzas made with love and fresh ingredients',
  },
  {
    id: 2,
    slide: '/slide2.png',
    title: 'Try our new Mexican Burger: Red Hot Chilli Peppers 🌶️🔥',
    description: 'Spicy, juicy, and absolutely irresistible',
  },
  {
    id: 3,
    slide: '/slide3.jpg',
    title: 'Hot and Cheesy food with freezing cokes',
    description: 'The perfect combination for a great meal',
  },
];

const Slider = () => {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setSlide((slide) => (slide === slides.length - 1 ? 0 : slide + 1)),
      5000,
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative flex flex-col lg:flex-row h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] mt-16 md:mt-24 overflow-hidden'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={slide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className='absolute inset-0 flex flex-col lg:flex-row'
        >
          {/* Text Section */}
          <div className='flex-1 flex flex-col items-center justify-center gap-6 text-center p-8 md:p-16 bg-gradient-to-br from-cream via-primary-50 to-primary-100 relative overflow-hidden'>
            {/* Floating decorative elements */}
            <div className='absolute top-10 left-10 w-20 h-20 bg-primary-200 rounded-full blur-3xl opacity-50 animate-float' />
            <div
              className='absolute bottom-20 right-20 w-32 h-32 bg-accent-200 rounded-full blur-3xl opacity-30 animate-float'
              style={{ animationDelay: '1s' }}
            />

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className='z-10'
            >
              <h1 className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-gradient leading-tight max-w-3xl'>
                {slides[slide].title}
              </h1>
            </motion.div>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className='text-lg md:text-xl text-gray-600 font-body max-w-xl z-10'
            >
              {slides[slide].description}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className='z-10'
            >
              <Button size='lg' variant='primary'>
                Order Now 🍕
              </Button>
            </motion.div>

            {/* Progress Indicators */}
            <div className='flex gap-3 mt-4 z-10'>
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === slide
                      ? 'w-8 bg-gradient-button'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className='relative flex-1 h-1/2 lg:h-full'>
            {/* Gradient Overlay */}
            <div className='absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-cream/80 via-cream/20 to-transparent z-10' />

            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.7 }}
              className='relative w-full h-full'
            >
              <Image
                src={slides[slide].slide}
                alt={slides[slide].title}
                fill
                className='object-cover'
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Slider;
