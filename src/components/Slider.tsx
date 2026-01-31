'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './ui/Button';

const slides = [
  {
    id: 1,
    slide: '/slide1.png',
    title: 'Authentic Antep Stone Oven Pizza',
    description:
      'Crispy crust, rich toppings, and the traditional taste you crave.',
  },
  {
    id: 2,
    slide: '/slider_lahmacun.png',
    title: 'Traditional Crispy Lahmacun',
    description:
      'Freshly ground meat, herbs, and spices on thin dough. Served with fresh lemon and parsley.',
  },
  {
    id: 3,
    slide: '/slide2.png',
    title: 'Gourmet Burgers with a Local Twist',
    description: 'Juicy 100% beef patties seasoned with special Antep spices.',
  },
  {
    id: 4,
    slide: '/slider_baklava.png',
    title: 'Premium Pistachio Baklava',
    description:
      'The perfect sweet ending. 40 layers of phyllo with the finest Antep pistachios.',
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

  const nextSlide = () => {
    setSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className='relative flex flex-col lg:flex-row h-[70vh] mt-16 md:mt-24 overflow-hidden rounded-3xl mx-4 md:mx-8 lg:mx-16 shadow-soft'>
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
              <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-gradient leading-tight max-w-2xl'>
                {slides[slide].title}
              </h1>
            </motion.div>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className='text-base md:text-lg text-gray-600 font-body max-w-lg z-10'
            >
              {slides[slide].description}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className='z-10'
            >
              <Button size='lg' variant='primary' className='group gap-2'>
                Order Now{' '}
                <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
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

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className='absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group'
        aria-label='Previous slide'
      >
        <ChevronLeft className='w-6 h-6 text-gray-800 group-hover:text-primary-600 transition-colors' />
      </button>

      <button
        onClick={nextSlide}
        className='absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group'
        aria-label='Next slide'
      >
        <ChevronRight className='w-6 h-6 text-gray-800 group-hover:text-primary-600 transition-colors' />
      </button>
    </div>
  );
};

export default Slider;
