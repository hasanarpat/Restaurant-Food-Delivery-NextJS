'use client';
import React from 'react';
import Container from './ui/Container';
import { motion } from 'framer-motion';

const BenefitsShowcase = () => {
  const benefits = [
    {
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
            d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
          />
        </svg>
      ),
      title: 'Thousands of Restaurants',
      description:
        'Choose from thousands of restaurants serving delicious meals, delivered hot and fresh to your door.',
      color: 'bg-orange-500',
      textColor: 'text-orange-500',
      emoji: '🏪',
    },
    {
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
            d='M13 10V3L4 14h7v7l9-11h-7z'
          />
        </svg>
      ),
      title: 'Flash Deals',
      description:
        'Get exclusive flash discounts and special offers every time you open the app.',
      color: 'bg-accent-500',
      textColor: 'text-accent-500',
      emoji: '⚡',
    },
    {
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
            d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
          />
        </svg>
      ),
      title: "Neighborhood's Best",
      description:
        'Discover highly-rated restaurants loved by customers for their speed, quality, and service.',
      color: 'bg-purple-500',
      textColor: 'text-purple-500',
      emoji: '⭐',
    },
    {
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
            d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
          />
        </svg>
      ),
      title: 'Live Tracking',
      description:
        'Track your order in real-time on the map and know exactly when it will arrive.',
      color: 'bg-success-500',
      textColor: 'text-success-500',
      emoji: '📍',
    },
    {
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
            d='M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z'
          />
        </svg>
      ),
      title: 'Earn Discount Coupons',
      description:
        'The more you order, the more coupons you earn. Save on every order with accumulated rewards.',
      color: 'bg-blue-500',
      textColor: 'text-blue-500',
      emoji: '🎟️',
    },
    {
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
            d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
          />
        </svg>
      ),
      title: 'Meal Card Payments',
      description:
        'Pay with meal cards at eligible restaurants and enjoy seamless online transactions.',
      color: 'bg-secondary-500',
      textColor: 'text-secondary-500',
      emoji: '💳',
    },
  ];

  return (
    <section className='py-16 md:py-24 bg-white relative overflow-hidden'>
      {/* Animated background pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

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
            className='inline-block px-4 py-2 bg-primary-100 rounded-full mb-4'
          >
            <span className='font-ui text-sm font-semibold text-primary-600'>
              ✨ Our Features
            </span>
          </motion.div>

          <h2 className='font-heading text-4xl md:text-5xl font-bold text-gradient mb-4'>
            Why Choose Us?
          </h2>
          <p className='font-body text-lg text-gray-600 max-w-2xl mx-auto'>
            Discover the features that make ordering food easier, faster, and
            more rewarding
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10'>
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                type: 'spring',
                stiffness: 150,
              }}
              whileHover={{
                y: -10,
                transition: { duration: 0.2 },
              }}
              className='group relative'
            >
              {/* Card */}
              <div className='relative bg-white p-6 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 border border-gray-100 group-hover:border-gray-200 overflow-hidden'>
                {/* Emoji floating */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                  className='absolute top-4 right-4 text-4xl opacity-20 group-hover:opacity-40 transition-opacity'
                >
                  {benefit.emoji}
                </motion.div>

                {/* Icon with enhanced animation */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 ${benefit.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg relative z-10`}
                >
                  {benefit.icon}
                </motion.div>

                {/* Content */}
                <h3 className='font-heading text-xl font-bold text-gray-900 mb-3 relative z-10'>
                  {benefit.title}
                </h3>
                <p className='font-body text-gray-600 leading-relaxed relative z-10'>
                  {benefit.description}
                </p>

                {/* Decorative elements */}
                <div className='absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8'>
                  <div
                    className={`w-full h-full ${benefit.color} opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700`}
                  />
                </div>

                {/* Corner accent */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  className={`absolute bottom-4 right-4 w-3 h-3 ${benefit.color} rounded-full shadow-lg`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default BenefitsShowcase;
