'use client';
import React from 'react';
import Container from '@/components/ui/Container';
import PageHeader from '@/components/ui/PageHeader';
import StatsCounter from '@/components/StatsCounter';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const values = [
    {
      icon: '🍕',
      title: 'Quality First',
      description:
        'We partner only with restaurants that share our commitment to excellence and fresh ingredients.',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description:
        'Our optimized delivery network ensures your food arrives hot and fresh, every single time.',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: '🤝',
      title: 'Trust & Safety',
      description:
        'Verified restaurants, background-checked couriers, and secure payments for your peace of mind.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '💡',
      title: 'Innovation',
      description:
        'Constantly improving with cutting-edge technology to make ordering food easier than ever.',
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  const milestones = [
    {
      year: '2018',
      title: 'Company Founded',
      description: 'Started with a vision to revolutionize food delivery',
    },
    {
      year: '2019',
      title: '1000+ Restaurants',
      description: 'Expanded to serve the entire city',
    },
    {
      year: '2021',
      title: '100K Users',
      description: 'Reached our first major customer milestone',
    },
    {
      year: '2024',
      title: 'Market Leader',
      description: 'Became the #1 food delivery platform',
    },
  ];

  return (
    <div className='min-h-screen pt-28 md:pt-36'>
      <PageHeader title='About Us' />

      <Container>
        {/* Hero Section */}
        <section className='py-16 md:py-24'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center max-w-4xl mx-auto mb-16'
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              className='inline-block px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full mb-6'
            >
              <span className='font-ui text-sm font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent'>
                🎯 Our Mission
              </span>
            </motion.div>

            <h2 className='font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
              Bringing Delicious Food to Your Doorstep
            </h2>
            <p className='font-body text-lg text-gray-600 leading-relaxed'>
              We connect food lovers with the best restaurants in town,
              delivering happiness one meal at a time. Our mission is to make
              quality food accessible to everyone, anytime, anywhere.
            </p>
          </motion.div>

          {/* Stats */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-12 mb-16'>
            <StatsCounter
              end={6}
              suffix='+'
              label='Years in Business'
              icon='🎂'
            />
            <StatsCounter
              end={500}
              suffix='K+'
              label='Happy Customers'
              icon='😊'
            />
            <StatsCounter
              end={10}
              suffix='K+'
              label='Partner Restaurants'
              icon='🏪'
            />
          </div>
        </section>

        {/* Our Story Timeline */}
        <section className='py-16 md:py-24 bg-gradient-to-br from-cream via-white to-primary-50 -mx-4 md:-mx-8 px-4 md:px-8 rounded-3xl'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2 className='font-heading text-4xl md:text-5xl font-bold text-gradient mb-4'>
              Our Journey
            </h2>
            <p className='font-body text-lg text-gray-600'>
              From a small startup to the leading food delivery platform
            </p>
          </motion.div>

          <div className='max-w-4xl mx-auto'>
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className='relative flex gap-6 mb-12 last:mb-0'
              >
                {/* Timeline line */}
                {index < milestones.length - 1 && (
                  <div className='absolute left-12 top-24 w-0.5 h-full bg-gradient-to-b from-primary-500 to-secondary-500' />
                )}

                {/* Year badge */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className='flex-shrink-0 w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-xl'
                >
                  <span className='font-heading text-xl font-bold text-white'>
                    {milestone.year}
                  </span>
                </motion.div>

                {/* Content */}
                <div className='flex-1 bg-white rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all'>
                  <h3 className='font-heading text-2xl font-bold text-gray-900 mb-2'>
                    {milestone.title}
                  </h3>
                  <p className='font-body text-gray-600'>
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Our Values */}
        <section className='py-16 md:py-24'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2 className='font-heading text-4xl md:text-5xl font-bold text-gradient mb-4'>
              Our Values
            </h2>
            <p className='font-body text-lg text-gray-600'>
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className='group relative'
              >
                {/* Glow effect */}
                <motion.div
                  className={`absolute -inset-2 bg-gradient-to-r ${value.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                />

                {/* Card */}
                <div className='relative bg-white rounded-2xl p-8 shadow-soft hover:shadow-soft-lg transition-all overflow-hidden'>
                  {/* Animated emoji */}
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
                    className='text-6xl mb-6'
                  >
                    {value.icon}
                  </motion.div>

                  <h3 className='font-heading text-2xl font-bold text-gray-900 mb-4'>
                    {value.title}
                  </h3>
                  <p className='font-body text-gray-600 leading-relaxed'>
                    {value.description}
                  </p>

                  {/* Corner accent */}
                  <motion.div
                    className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br ${value.gradient} opacity-5 rounded-tl-full`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-16 md:py-24'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl p-12 text-center text-white'
          >
            <h2 className='font-heading text-4xl md:text-5xl font-bold mb-6'>
              Ready to Order?
            </h2>
            <p className='font-body text-lg mb-8 max-w-2xl mx-auto opacity-90'>
              Join thousands of happy customers enjoying delicious food
              delivered right to their door
            </p>
            <motion.a
              href='/menu/pizzas'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='inline-block px-8 py-4 bg-white text-primary-600 font-heading font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all'
            >
              Browse Menu →
            </motion.a>
          </motion.div>
        </section>
      </Container>
    </div>
  );
};

export default AboutPage;
