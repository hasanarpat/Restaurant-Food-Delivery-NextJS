import React from 'react';
import Link from 'next/link';
import Container from './ui/Container';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'>
      {/* Main Footer */}
      <Container>
        <div className='py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12'>
          {/* Brand Section */}
          <div className='space-y-4'>
            <h2 className='text-2xl lg:text-3xl font-heading font-bold text-gradient-to-r from-primary-400 to-primary-500'>
              Kopernik Pizza
            </h2>
            <p className='font-body text-gray-300 text-sm leading-relaxed'>
              Delicious handcrafted pizzas, burgers, and pasta made with love
              and the finest ingredients. Fast delivery, amazing taste!
            </p>
            <div className='flex gap-3'>
              <Link
                href='#'
                className='w-10 h-10 rounded-full bg-primary-500 hover:bg-primary-600 flex items-center justify-center transition-colors'
                aria-label='Facebook'
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                </svg>
              </Link>
              <Link
                href='#'
                className='w-10 h-10 rounded-full bg-primary-500 hover:bg-primary-600 flex items-center justify-center transition-colors'
                aria-label='Instagram'
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
                </svg>
              </Link>
              <Link
                href='#'
                className='w-10 h-10 rounded-full bg-primary-500 hover:bg-primary-600 flex items-center justify-center transition-colors'
                aria-label='Twitter'
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h3 className='text-lg font-heading font-semibold text-primary-400'>
              Quick Links
            </h3>
            <ul className='space-y-2 font-body text-sm'>
              <li>
                <Link
                  href='/'
                  className='text-gray-300 hover:text-primary-400 transition-colors'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/menu'
                  className='text-gray-300 hover:text-primary-400 transition-colors'
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href='/'
                  className='text-gray-300 hover:text-primary-400 transition-colors'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='/'
                  className='text-gray-300 hover:text-primary-400 transition-colors'
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href='/orders'
                  className='text-gray-300 hover:text-primary-400 transition-colors'
                >
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className='space-y-4'>
            <h3 className='text-lg font-heading font-semibold text-primary-400'>
              Contact Us
            </h3>
            <ul className='space-y-3 font-body text-sm text-gray-300'>
              <li className='flex items-start gap-2'>
                <span>📍</span>
                <span>123 Pizza Street, Food City, FC 12345</span>
              </li>
              <li className='flex items-center gap-2'>
                <span>📞</span>
                <Link
                  href='tel:5555555'
                  className='hover:text-primary-400 transition-colors'
                >
                  555 55 55
                </Link>
              </li>
              <li className='flex items-center gap-2'>
                <span>✉️</span>
                <Link
                  href='mailto:info@kopernikpizza.com'
                  className='hover:text-primary-400 transition-colors'
                >
                  info@kopernikpizza.com
                </Link>
              </li>
              <li className='flex items-center gap-2'>
                <span>🕐</span>
                <span>Mon-Sun: 10:00 AM - 11:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className='space-y-4'>
            <h3 className='text-lg font-heading font-semibold text-primary-400'>
              Newsletter
            </h3>
            <p className='font-body text-sm text-gray-300'>
              Subscribe to get special offers, free giveaways, and updates.
            </p>
            <form className='space-y-2'>
              <input
                type='email'
                placeholder='Enter your email'
                className='w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors text-sm'
              />
              <button
                type='submit'
                className='w-full px-4 py-2 bg-gradient-button hover:bg-gradient-button-hover text-white rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg text-sm'
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className='border-t border-gray-800'>
        <Container>
          <div className='py-6 flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='font-ui text-sm text-gray-400 text-center md:text-left'>
              © {currentYear} Kopernik Pizza. All rights reserved.
            </p>
            <div className='flex gap-6 font-ui text-sm'>
              <Link
                href='/'
                className='text-gray-400 hover:text-primary-400 transition-colors'
              >
                Privacy Policy
              </Link>
              <Link
                href='/'
                className='text-gray-400 hover:text-primary-400 transition-colors'
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
