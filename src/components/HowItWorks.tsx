'use client';
import React from 'react';
import Container from './ui/Container';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Choose Restaurant',
      description:
        'Browse thousands of restaurants and cuisines. Filter by ratings, delivery time, or your favorite dishes.',
      icon: (
        <svg
          className='w-8 h-8'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
      ),
      color: 'bg-blue-500',
      emoji: '🔍',
    },
    {
      number: '02',
      title: 'Place Your Order',
      description:
        'Select your favorite meals, customize them to your taste, and add them to your cart with just a few clicks.',
      icon: (
        <svg
          className='w-8 h-8'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
          />
        </svg>
      ),
      color: 'bg-purple-500',
      emoji: '🛒',
    },
    {
      number: '03',
      title: 'Track Live',
      description:
        'Watch your order being prepared and delivered in real-time. Know exactly when it will arrive at your door.',
      icon: (
        <svg
          className='w-8 h-8'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
          />
        </svg>
      ),
      color: 'bg-success-500',
      emoji: '📍',
    },
    {
      number: '04',
      title: "It's at Your Door!",
      description:
        'Receive your hot, fresh meal delivered safely to your doorstep. Enjoy your delicious food!',
      icon: (
        <svg
          className='w-8 h-8'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M5 13l4 4L19 7'
          />
        </svg>
      ),
      color: 'bg-primary-500',
      emoji: '🎉',
    },
  ];

  return (
    <section className='py-16 md:py-24 bg-cream relative overflow-hidden'>
      {/* Animated background circles */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className='absolute top-10 left-10 w-72 h-72 bg-primary-200 rounded-full blur-3xl'
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className='absolute bottom-10 right-10 w-72 h-72 bg-secondary-200 rounded-full blur-3xl'
      />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-16 relative z-10'
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className='inline-block px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-4 shadow-md'
          >
            <span className='font-ui text-sm font-semibold text-primary-600'>
              🚀 Simple Process
            </span>
          </motion.div>

          <h2 className='font-heading text-4xl md:text-5xl font-bold text-gradient mb-4'>
            How It Works
          </h2>
          <p className='font-body text-lg text-gray-600 max-w-2xl mx-auto'>
            Four simple steps to get your favorite food delivered to your door
          </p>
        </motion.div>

        <div className='relative'>
          {/* Enhanced animated timeline */}
          <div className='hidden lg:block absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2'>
            <div className='relative w-full h-full bg-gray-200 rounded-full overflow-hidden'>
              <motion.div
                className='absolute inset-0 bg-primary-500'
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10'>
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.2,
                  type: 'spring',
                  stiffness: 100,
                }}
                whileHover={{ scale: 1.05, y: -10 }}
                className='relative group'
              >
                {/* Card */}
                <div className='relative bg-white rounded-2xl p-6 shadow-soft hover:shadow-2xl transition-all duration-300 overflow-hidden'>
                  {/* Step number with 3D effect */}
                  <motion.div
                    whileHover={{ rotateY: 180, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className='absolute -top-6 -left-2 w-16 h-16 perspective-1000'
                  >
                    <div
                      className={`w-full h-full ${step.color} rounded-2xl flex items-center justify-center shadow-xl transform-gpu preserve-3d`}
                    >
                      <span className='font-heading text-2xl font-bold text-white'>
                        {step.number}
                      </span>
                    </div>
                  </motion.div>

                  {/* Floating emoji */}
                  <motion.div
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                    className='absolute top-4 right-4 text-4xl opacity-30 group-hover:opacity-50 transition-opacity'
                  >
                    {step.emoji}
                  </motion.div>

                  {/* Icon with rotation */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                    className={`relative w-16 h-16 ${step.color} rounded-xl flex items-center justify-center text-white mb-4 mt-8 ml-auto mr-0 shadow-lg`}
                  >
                    {step.icon}
                  </motion.div>

                  {/* Content */}
                  <h3 className='relative font-heading text-xl font-bold text-gray-900 mb-3'>
                    {step.title}
                  </h3>
                  <p className='relative font-body text-gray-600 leading-relaxed'>
                    {step.description}
                  </p>

                  {/* Pulsing dot indicator */}
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`absolute bottom-4 right-4 w-3 h-3 ${step.color} rounded-full shadow-lg`}
                  />
                </div>

                {/* Animated connector arrow */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                    className='hidden lg:block absolute top-1/2 -right-6 w-12 h-12 transform -translate-y-1/2 z-20'
                  >
                    <motion.svg
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className='text-primary-500'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      />
                    </motion.svg>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
