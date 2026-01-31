'use client';
import React from 'react';
import Image from 'next/image';
import Container from './ui/Container';
import { motion, useScroll, useTransform } from 'framer-motion';

const AppDownload = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const stats = [
    { value: '500K+', label: 'Active Users', icon: '👥' },
    { value: '10K+', label: 'Restaurants', icon: '🏪' },
    { value: '1M+', label: 'Orders', icon: '📦' },
  ];

  return (
    <section className='py-16 md:py-24 bg-cream relative overflow-hidden'>
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className='absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-200/30 to-secondary-200/30 rounded-full blur-3xl'
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className='absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-secondary-200/30 to-primary-200/30 rounded-full blur-3xl'
      />

      <Container>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10'>
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className='inline-block px-4 py-2 bg-primary-100 rounded-full mb-6'
            >
              <span className='font-ui text-sm font-semibold text-primary-600'>
                📱 Download Our App
              </span>
            </motion.div>

            <h2 className='font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
              <span className='block text-gray-900'>Order Food</span>
              <motion.span
                className='block text-gradient'
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                Anytime, Anywhere
              </motion.span>
            </h2>

            <p className='font-body text-lg text-gray-600 mb-8 max-w-xl'>
              Download our mobile app and enjoy{' '}
              <span className='font-semibold text-primary-600'>
                delicious meals
              </span>{' '}
              from your favorite restaurants. Track your orders in real-time and
              get exclusive app-only deals!
            </p>

            {/* Download Buttons with enhanced animation */}
            <div className='flex flex-wrap gap-4 mb-12'>
              <motion.a
                href='#'
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className='group flex items-center gap-3 px-6 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all relative overflow-hidden'
              >
                <motion.div
                  className='absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20'
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <svg
                  className='w-8 h-8 relative z-10'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z' />
                </svg>
                <div className='text-left relative z-10'>
                  <div className='text-xs opacity-80'>Download on the</div>
                  <div className='text-lg font-semibold'>App Store</div>
                </div>
              </motion.a>

              <motion.a
                href='#'
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className='group flex items-center gap-3 px-6 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all relative overflow-hidden'
              >
                <motion.div
                  className='absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20'
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <svg
                  className='w-8 h-8 relative z-10'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z' />
                </svg>
                <div className='text-left relative z-10'>
                  <div className='text-xs opacity-80'>GET IT ON</div>
                  <div className='text-lg font-semibold'>Google Play</div>
                </div>
              </motion.a>
            </div>

            {/* Stats with enhanced animation */}
            <div className='grid grid-cols-3 gap-6'>
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className='relative text-center lg:text-left group cursor-pointer'
                >
                  <div className='absolute inset-0 bg-gradient-to-br from-primary-100/50 to-secondary-100/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl' />
                  <div className='relative bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-100'>
                    <div className='text-2xl mb-1'>{stat.icon}</div>
                    <div className='font-heading text-3xl md:text-4xl font-bold text-gradient mb-1'>
                      {stat.value}
                    </div>
                    <div className='font-ui text-sm text-gray-600'>
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Phone Mockup Side with parallax */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring' }}
            style={{ y }}
            className='relative flex justify-center lg:justify-end'
          >
            <div className='relative w-80 h-[600px]'>
              {/* Glow effect */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className='absolute inset-0 bg-gradient-to-br from-primary-500/30 to-secondary-500/30 rounded-[3rem] blur-2xl'
              />

              {/* Phone frame */}
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className='absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] shadow-2xl p-3 transform-gpu perspective-1000'
              >
                <div className='w-full h-full bg-white rounded-[2.5rem] overflow-hidden'>
                  <div className='w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center'>
                    <div className='text-center p-8'>
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 5, 0],
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className='w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-4'
                      >
                        <svg
                          className='w-16 h-16 text-primary-600'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                        </svg>
                      </motion.div>
                      <h3 className='font-heading text-xl font-bold text-gray-900 mb-2'>
                        Kopernik Pizza
                      </h3>
                      <p className='font-body text-sm text-gray-600'>
                        Order your favorite meals
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating notification card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
                transition={{
                  opacity: { delay: 1 },
                  x: { delay: 1 },
                  y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className='absolute -right-8 top-20 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-4 hidden lg:block border border-white/20'
              >
                <div className='flex items-center gap-3'>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className='w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg'
                  >
                    <svg
                      className='w-6 h-6 text-white'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </motion.div>
                  <div>
                    <div className='font-ui text-xs text-gray-500'>
                      Order Status
                    </div>
                    <div className='font-heading text-sm font-semibold text-gray-900'>
                      On the way! 🚀
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Additional floating element */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0, y: [0, 10, 0] }}
                transition={{
                  opacity: { delay: 1.2 },
                  x: { delay: 1.2 },
                  y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                }}
                whileHover={{ scale: 1.1, rotate: -5 }}
                className='absolute -left-8 bottom-32 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-3 hidden lg:block border border-white/20'
              >
                <div className='flex items-center gap-2'>
                  <span className='text-2xl'>⭐</span>
                  <div>
                    <div className='font-heading text-lg font-bold text-gray-900'>
                      4.9
                    </div>
                    <div className='font-ui text-xs text-gray-500'>Rating</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default AppDownload;
