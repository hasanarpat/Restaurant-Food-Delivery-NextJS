'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import Image from 'next/image';
import CartIcon from './CartIcon';
import { motion } from 'framer-motion';

const Navbar = () => {
  const user = false;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/menu/pizzas', label: 'Menu', icon: '🍕' },
    { href: '/about', label: 'About', icon: '📖' },
    { href: '/contact', label: 'Contact', icon: '📞' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-lg border-b border-gray-200/20'
          : 'bg-white/60 backdrop-blur-md border-b border-white/20'
      }`}
    >
      {/* Top bar with solid red background - enhanced content */}
      <div
        className={`bg-primary-500 transition-all duration-300 ${scrolled ? 'h-1' : 'h-12 md:h-16'}`}
      >
        {!scrolled && (
          <div className='h-full flex items-center justify-between px-4 lg:px-20 xl:px-40'>
            {/* Left - Contact Info */}
            <div className='hidden md:flex items-center gap-6 text-white text-sm'>
              <div className='flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer'>
                <svg
                  className='w-4 h-4'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
                </svg>
                <span className='font-ui font-medium'>0 555 444 33 22</span>
              </div>
              <div className='hidden lg:flex items-center gap-2'>
                <svg
                  className='w-4 h-4'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                  <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                </svg>
                <span className='font-ui font-medium'>
                  info@anteplipizza.com
                </span>
              </div>
            </div>

            {/* Right - Promo & Social */}
            <div className='flex items-center gap-6 text-white text-sm font-ui'>
              <div className='hidden lg:flex items-center gap-4'>
                <a
                  href='#'
                  className='hover:opacity-80 transition-opacity'
                  aria-label='Facebook'
                >
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                  </svg>
                </a>
                <a
                  href='#'
                  className='hover:opacity-80 transition-opacity'
                  aria-label='Instagram'
                >
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' />
                  </svg>
                </a>
              </div>
              <div className='flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full'>
                <span className='text-base'>🚚</span>
                <span className='font-semibold'>Free delivery over $30</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main navbar */}
      <div className='flex items-center justify-between px-4 lg:px-20 xl:px-40 h-16 md:h-20'>
        {/* Left - Desktop Links with icons */}
        <div className='hidden md:flex gap-2 flex-1'>
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className='group flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-all duration-200'
            >
              <span className='text-lg group-hover:scale-110 transition-transform'>
                {link.icon}
              </span>
              <span className='font-ui font-medium text-gray-700 group-hover:text-primary-600 transition-colors'>
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Center - Logo with animation */}
        <Link
          href='/'
          className='flex-1 md:text-center group flex justify-center items-center gap-3'
        >
          <div className='relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shadow-sm'>
            <Image
              src='/antepli_logo_solid.png'
              alt='Antepli Pizza'
              fill
              className='object-cover'
              priority
            />
          </div>
          <span className='font-heading text-xl md:text-2xl font-bold text-gray-800 tracking-tight'>
            Antepli Pizza
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <div className='md:hidden'>
          <Menu />
        </div>

        {/* Right - Desktop Actions with enhanced styling */}
        <div className='hidden md:flex flex-1 items-center justify-end gap-3'>
          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className='p-2.5 hover:bg-primary-50 rounded-lg transition-colors group'
            aria-label='Search'
          >
            <svg
              className='w-5 h-5 text-gray-600 group-hover:text-primary-600 transition-colors'
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
          </motion.button>

          {/* Track Order */}
          <Link
            href='/orders'
            className='hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors group'
          >
            <svg
              className='w-5 h-5 text-gray-600 group-hover:text-primary-600 transition-colors'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
              />
            </svg>
            <span className='font-ui font-medium text-gray-700 group-hover:text-primary-600 transition-colors text-sm'>
              Track
            </span>
          </Link>

          {/* Login/Orders Button */}
          <Link
            href={user ? '/orders' : '/login'}
            className='flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors group'
          >
            <svg
              className='w-5 h-5 text-gray-600 group-hover:text-primary-600 transition-colors'
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
            <span className='font-ui font-medium text-gray-700 group-hover:text-primary-600 transition-colors'>
              {user ? 'Orders' : 'Login'}
            </span>
          </Link>

          {/* Cart with animation */}
          <Link href='/cart'>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <CartIcon />
            </motion.div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
