'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import CartIcon from './CartIcon';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  {
    id: 1,
    title: 'Homepage',
    url: '/',
    icon: '🏠',
  },
  {
    id: 2,
    title: 'Menu',
    url: '/menu',
    icon: '📋',
  },
  {
    id: 3,
    title: 'Working Hours',
    url: '/',
    icon: '🕐',
  },
  {
    id: 4,
    title: 'Contact',
    url: '/',
    icon: '📞',
  },
];

const Menu = () => {
  const [open, setOpen] = useState(false);
  const user = false;

  return (
    <div className=''>
      {/* Hamburger Button */}
      <button
        onClick={() => setOpen(!open)}
        className='relative p-2 hover:bg-primary-50 rounded-lg transition-colors z-50'
        aria-label='Toggle menu'
      >
        <div className='w-6 h-5 flex flex-col justify-between'>
          <span
            className={`w-full h-0.5 bg-gray-800 rounded-full transition-all duration-300 ${
              open ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`w-full h-0.5 bg-gray-800 rounded-full transition-all duration-300 ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-full h-0.5 bg-gray-800 rounded-full transition-all duration-300 ${
              open ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </div>
      </button>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed inset-0 bg-black/60 backdrop-blur-sm z-40'
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Menu Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className='fixed right-0 top-0 h-screen w-80 bg-white shadow-2xl z-40 overflow-y-auto'
          >
            {/* Header */}
            <div className='bg-gradient-to-br from-primary-500 to-primary-600 p-6 pt-20'>
              <h2 className='font-heading text-2xl font-bold text-white mb-1'>
                Antepli Pizza
              </h2>
              <p className='font-body text-sm text-white/90'>
                Delicious food delivery
              </p>
            </div>

            <div className='flex flex-col h-[calc(100%-140px)] p-6'>
              {/* Navigation Links */}
              <nav className='flex flex-col gap-2 mb-6'>
                {links.map((link, index) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.url}
                      onClick={() => setOpen(false)}
                      className='flex items-center gap-4 p-4 rounded-xl hover:bg-primary-50 transition-colors group'
                    >
                      <span className='text-2xl group-hover:scale-110 transition-transform'>
                        {link.icon}
                      </span>
                      <span className='font-heading text-lg font-semibold text-gray-800 group-hover:text-primary-600 transition-colors'>
                        {link.title}
                      </span>
                    </Link>
                  </motion.div>
                ))}

                {/* Auth Links */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {!user ? (
                    <Link
                      href='/login'
                      onClick={() => setOpen(false)}
                      className='flex items-center gap-4 p-4 rounded-xl hover:bg-primary-50 transition-colors group'
                    >
                      <span className='text-2xl group-hover:scale-110 transition-transform'>
                        🔐
                      </span>
                      <span className='font-heading text-lg font-semibold text-gray-800 group-hover:text-primary-600 transition-colors'>
                        Login
                      </span>
                    </Link>
                  ) : (
                    <Link
                      href='/orders'
                      onClick={() => setOpen(false)}
                      className='flex items-center gap-4 p-4 rounded-xl hover:bg-primary-50 transition-colors group'
                    >
                      <span className='text-2xl group-hover:scale-110 transition-transform'>
                        📦
                      </span>
                      <span className='font-heading text-lg font-semibold text-gray-800 group-hover:text-primary-600 transition-colors'>
                        Orders
                      </span>
                    </Link>
                  )}
                </motion.div>
              </nav>

              {/* Divider */}
              <div className='border-t border-gray-200 my-4' />

              {/* Working Hours */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className='mb-6'
              >
                <h3 className='font-ui text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3'>
                  Working Hours
                </h3>
                <div className='space-y-1 font-body text-sm text-gray-700'>
                  <p>Monday - Friday: 10:00 AM - 11:00 PM</p>
                  <p>Saturday - Sunday: 11:00 AM - 12:00 AM</p>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className='mb-6'
              >
                <h3 className='font-ui text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3'>
                  Follow Us
                </h3>
                <div className='flex gap-3'>
                  <a
                    href='#'
                    className='w-10 h-10 rounded-full bg-primary-100 hover:bg-primary-200 flex items-center justify-center transition-colors'
                    aria-label='Facebook'
                  >
                    <span className='text-lg'>📘</span>
                  </a>
                  <a
                    href='#'
                    className='w-10 h-10 rounded-full bg-primary-100 hover:bg-primary-200 flex items-center justify-center transition-colors'
                    aria-label='Instagram'
                  >
                    <span className='text-lg'>📸</span>
                  </a>
                  <a
                    href='#'
                    className='w-10 h-10 rounded-full bg-primary-100 hover:bg-primary-200 flex items-center justify-center transition-colors'
                    aria-label='Twitter'
                  >
                    <span className='text-lg'>🐦</span>
                  </a>
                </div>
              </motion.div>

              {/* Cart Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className='mt-auto'
              >
                <Link
                  href='/cart'
                  onClick={() => setOpen(false)}
                  className='flex items-center justify-center gap-3 p-4 bg-gradient-button hover:bg-gradient-button-hover text-white rounded-xl shadow-md hover:shadow-lg transition-all font-heading font-semibold'
                >
                  <CartIcon />
                  <span>View Cart</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
