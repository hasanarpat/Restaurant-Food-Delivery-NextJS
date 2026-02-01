'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './ui/Button';

const slides = [
  {
    id: 1,
    slide: '/slider_pizza.png',
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
    slide: '/slider_burger.png',
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
      () => setSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1)),
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
    <div className='relative h-[calc(100vh-6rem)] md:h-[calc(100vh-5rem)] mt-0 w-full overflow-hidden bg-gray-900 group'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={slide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className='absolute inset-0'
        >
          {/* Background Image */}
          <div className='absolute inset-0 w-full h-full'>
            <Image
              src={slides[slide].slide}
              alt={slides[slide].title}
              fill
              className='object-cover opacity-60'
              priority
            />
            {/* Gradient Overlay */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30' />
          </div>

          {/* Centered Content */}
          <div className='absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-20 z-10 space-y-6 md:space-y-8'>
            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className='text-3xl md:text-5xl lg:text-7xl font-heading font-extrabold text-white tracking-tight drop-shadow-lg max-w-4xl leading-tight'
            >
              {slides[slide].title}
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className='text-lg md:text-2xl text-gray-200 font-body max-w-2xl drop-shadow-md leading-relaxed'
            >
              {slides[slide].description}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Button
                size='xl'
                variant='primary'
                className='gap-3 px-8 py-4 text-lg shadow-glow hover:shadow-glow-lg transform hover:-translate-y-1 transition-all duration-300'
              >
                Order Now <ArrowRight className='w-6 h-6' />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows (Hidden on mobile, visible on hover) */}
      <button
        onClick={prevSlide}
        className='absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-primary-600 transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center border border-white/20 hover:border-white'
        aria-label='Previous slide'
      >
        <ChevronLeft className='w-8 h-8' />
      </button>

      <button
        onClick={nextSlide}
        className='absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-primary-600 transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center border border-white/20 hover:border-white'
        aria-label='Next slide'
      >
        <ChevronRight className='w-8 h-8' />
      </button>

      {/* Modern Dots Navigation */}
      <div className='absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3'>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setSlide(index)}
            className={`transition-all duration-500 rounded-full cursor-pointer ${
              index === slide
                ? 'w-10 h-2 bg-primary-500 shadow-glow'
                : 'w-2 h-2 bg-white/50 hover:bg-white hover:scale-125'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
