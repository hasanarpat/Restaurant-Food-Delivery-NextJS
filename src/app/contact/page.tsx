'use client';
import React from 'react';
import Container from '@/components/ui/Container';
import PageHeader from '@/components/ui/PageHeader';
import ContactForm from '@/components/ContactForm';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const contactMethods = [
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
            d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
          />
        </svg>
      ),
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      gradient: 'from-green-500 to-emerald-500',
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
            d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
          />
        </svg>
      ),
      title: 'Email',
      value: 'support@kopernikpizza.com',
      link: 'mailto:support@kopernikpizza.com',
      gradient: 'from-blue-500 to-cyan-500',
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
      title: 'Address',
      value: '123 Food Street, NY 10001',
      link: 'https://maps.google.com',
      gradient: 'from-purple-500 to-pink-500',
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
            d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      ),
      title: 'Business Hours',
      value: 'Mon-Sun: 10:00 AM - 11:00 PM',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      icon: '📷',
      url: '#',
      color: 'from-pink-500 to-purple-500',
    },
    {
      name: 'Facebook',
      icon: '👍',
      url: '#',
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Twitter',
      icon: '🐦',
      url: '#',
      color: 'from-sky-400 to-blue-500',
    },
  ];

  return (
    <div className='min-h-screen'>
      <PageHeader title='Contact Us' />

      <Container>
        <section className='py-16 md:py-24'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Left - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className='bg-white rounded-3xl p-8 lg:p-10 shadow-soft'
            >
              <h2 className='font-heading text-3xl font-bold text-gray-900 mb-2'>
                Send us a Message
              </h2>
              <p className='font-body text-gray-600 mb-8'>
                Fill out the form below and we'll get back to you as soon as
                possible
              </p>
              <ContactForm />
            </motion.div>

            {/* Right - Contact Info */}
            <div className='space-y-6'>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className='bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-8 lg:p-10'
              >
                <h2 className='font-heading text-3xl font-bold text-gray-900 mb-6'>
                  Get in Touch
                </h2>

                <div className='space-y-6'>
                  {contactMethods.map((method, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                      className='group'
                    >
                      {method.link ? (
                        <a
                          href={method.link}
                          className='flex items-start gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-all'
                        >
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${method.gradient} rounded-xl flex items-center justify-center text-white shadow-lg`}
                          >
                            {method.icon}
                          </motion.div>
                          <div>
                            <div className='font-ui text-sm text-gray-500 mb-1'>
                              {method.title}
                            </div>
                            <div className='font-heading text-lg font-semibold text-gray-900'>
                              {method.value}
                            </div>
                          </div>
                        </a>
                      ) : (
                        <div className='flex items-start gap-4 p-4 bg-white rounded-xl'>
                          <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${method.gradient} rounded-xl flex items-center justify-center text-white shadow-lg`}
                          >
                            {method.icon}
                          </motion.div>
                          <div>
                            <div className='font-ui text-sm text-gray-500 mb-1'>
                              {method.title}
                            </div>
                            <div className='font-heading text-lg font-semibold text-gray-900'>
                              {method.value}
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='bg-white rounded-3xl p-8 shadow-soft'
              >
                <h3 className='font-heading text-2xl font-bold text-gray-900 mb-6'>
                  Follow Us
                </h3>
                <div className='flex gap-4'>
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex-1 flex flex-col items-center gap-3 p-4 bg-gradient-to-br ${social.color} text-white rounded-xl shadow-lg hover:shadow-xl transition-all`}
                    >
                      <span className='text-3xl'>{social.icon}</span>
                      <span className='font-ui text-sm font-semibold'>
                        {social.name}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default ContactPage;
