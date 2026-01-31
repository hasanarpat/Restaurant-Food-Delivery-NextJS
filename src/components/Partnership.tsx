'use client';
import React from 'react';
import Container from './ui/Container';
import Button from './ui/Button';
import { motion } from 'framer-motion';

const Partnership = () => {
  const partnerships = [
    {
      title: 'Restaurant Partnership',
      description:
        'Join our platform and reach thousands of hungry customers. Grow your business with use.',
      icon: (
        <svg
          className='w-12 h-12'
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
      cta: 'Apply as Restaurant',
      benefits: [
        'Increase sales by 300%',
        'Reach 500K+ customers',
        'Easy management dashboard',
      ],
      color: 'bg-primary-500',
      emoji: '🏪',
    },
    {
      title: 'Become a Courier',
      description:
        'Earn money on your schedule. Join our delivery team and start delivering today.',
      icon: (
        <svg
          className='w-12 h-12'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
          />
        </svg>
      ),
      cta: 'Apply as Courier',
      benefits: [
        'Flexible hours, work anytime',
        'Weekly instant payments',
        'Be your own boss',
      ],
      color: 'bg-secondary-500',
      emoji: '🚴',
    },
  ];

  return (
    <section className='py-16 md:py-24 bg-gray-900 relative overflow-hidden'>
      {/* Animated background effects */}
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, 180, 360],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className='absolute top-0 left-0 w-[600px] h-[600px] bg-primary-500 rounded-full blur-3xl'
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          rotate: [360, 180, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className='absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary-500 rounded-full blur-3xl'
      />

      {/* Grid pattern overlay */}
      <div className='absolute inset-0 opacity-5'>
        <div
          className='w-full h-full'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
            className='inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-4'
          >
            <span className='font-ui text-sm font-semibold text-white'>
              🤝 Join Our Team
            </span>
          </motion.div>

          <h2 className='font-heading text-4xl md:text-5xl font-bold text-white mb-4'>
            Partner With Us
          </h2>
          <p className='font-body text-lg text-gray-300 max-w-2xl mx-auto'>
            Join our growing community and start earning or growing your
            business today
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10'>
          {partnerships.map((partnership, index) => (
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
              whileHover={{ y: -15, scale: 1.02 }}
              className='group relative'
            >
              {/* Card */}
              <div className='relative bg-white rounded-3xl p-8 lg:p-10 shadow-2xl overflow-hidden'>
                {/* Floating emoji */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                  className='absolute top-8 right-8 text-6xl opacity-10 group-hover:opacity-20 transition-opacity'
                >
                  {partnership.emoji}
                </motion.div>

                {/* Icon with 3D rotation */}
                <motion.div
                  whileHover={{ rotateY: 360, scale: 1.2 }}
                  transition={{ duration: 0.8 }}
                  className={`w-20 h-20 ${partnership.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-2xl relative z-10`}
                >
                  {partnership.icon}
                </motion.div>

                {/* Content */}
                <h3 className='font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-4 relative z-10'>
                  {partnership.title}
                </h3>
                <p className='font-body text-gray-600 mb-6 leading-relaxed relative z-10'>
                  {partnership.description}
                </p>

                {/* Benefits with stagger animation */}
                <ul className='space-y-3 mb-8'>
                  {partnership.benefits.map((benefit, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + idx * 0.1 }}
                      whileHover={{ x: 10 }}
                      className='flex items-center gap-3 relative z-10'
                    >
                      <motion.svg
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: idx * 0.2,
                        }}
                        className='w-6 h-6 text-green-500 flex-shrink-0'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                          clipRule='evenodd'
                        />
                      </motion.svg>
                      <span className='font-ui text-gray-700 font-medium'>
                        {benefit}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    className={`relative w-full px-8 py-4 ${partnership.color} hover:opacity-90 text-white font-heading font-semibold rounded-xl shadow-lg overflow-hidden group/btn`}
                  >
                    <motion.div
                      className='absolute inset-0 bg-white'
                      initial={{ x: '-100%', opacity: 0.3 }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className='relative z-10'>{partnership.cta} →</span>
                  </button>
                </motion.div>

                {/* Decorative corner circles */}
                <div className='absolute bottom-0 right-0 w-32 h-32 transform translate-x-16 translate-y-16'>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className={`w-full h-full ${partnership.color} rounded-full opacity-10`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA with pulse */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className='text-center mt-12 relative z-10'
        >
          <motion.p
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className='font-ui text-gray-300 mb-4'
          >
            Have questions? We're here to help!
          </motion.p>
          <motion.a
            href='#'
            whileHover={{ scale: 1.05, x: 10 }}
            className='inline-flex items-center gap-2 font-ui text-primary-400 hover:text-primary-300 font-semibold'
          >
            Contact Partnership Team
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </Container>
    </section>
  );
};

export default Partnership;
