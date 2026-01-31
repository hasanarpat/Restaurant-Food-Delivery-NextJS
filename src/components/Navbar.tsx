'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import Image from 'next/image';
import CartIcon from './CartIcon';

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-lg border-b border-gray-200/20'
          : 'bg-transparent'
      }`}
    >
      {/* Top bar with gradient background */}
      <div
        className={`bg-gradient-hero transition-all duration-300 ${scrolled ? 'h-1' : 'h-12 md:h-16'}`}
      >
        {!scrolled && (
          <div className='h-full flex items-center justify-between px-4 lg:px-20 xl:px-40'>
            <div className='hidden md:flex items-center gap-4 text-white text-sm'>
              <div className='flex items-center gap-2'>
                <Image alt='phone' src='/phone.png' width={16} height={16} />
                <span className='font-ui'>0 555 55 55</span>
              </div>
            </div>
            <div className='flex items-center gap-4 text-white text-sm font-ui'>
              <span>🚚 Free delivery over $30</span>
            </div>
          </div>
        )}
      </div>

      {/* Main navbar */}
      <div className='flex items-center justify-between px-4 lg:px-20 xl:px-40 h-16 md:h-20'>
        {/* Left - Desktop Links */}
        <div className='hidden md:flex gap-6 flex-1 text-gray-700 font-ui font-medium'>
          <Link href='/' className='hover:text-primary-600 transition-colors'>
            Home
          </Link>
          <Link
            href='/menu'
            className='hover:text-primary-600 transition-colors'
          >
            Menu
          </Link>
          <Link href='/' className='hover:text-primary-600 transition-colors'>
            Contact
          </Link>
        </div>

        {/* Center - Logo */}
        <Link href='/' className='flex-1 md:text-center'>
          <h1 className='text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-gradient cursor-pointer'>
            Kopernik Pizza
          </h1>
        </Link>

        {/* Mobile Menu Button */}
        <div className='md:hidden'>
          <Menu />
        </div>

        {/* Right - Desktop Actions */}
        <div className='hidden md:flex flex-1 items-center justify-end gap-4'>
          <button className='p-2 hover:bg-primary-50 rounded-full transition-colors'>
            <svg
              className='w-5 h-5 text-gray-600'
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
          </button>

          <Link
            href={user ? '/orders' : '/login'}
            className='font-ui font-medium text-gray-700 hover:text-primary-600 transition-colors'
          >
            {user ? 'Orders' : 'Login'}
          </Link>

          <Link href='/cart'>
            <CartIcon />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
