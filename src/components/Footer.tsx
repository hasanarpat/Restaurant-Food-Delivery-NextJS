import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from './ui/Container';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  ArrowRight,
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'>
      {/* Main Footer */}
      <Container>
        <div className='py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12'>
          {/* Brand Section */}
          <div className='space-y-4'>
            <div className='flex flex-col gap-4'>
              <div className='relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gray-800'>
                <Image
                  src='/images/logo_orange.png'
                  alt='Antepli Pizza'
                  fill
                  className='object-cover'
                  priority
                />
              </div>
              <h2 className='text-2xl lg:text-3xl font-heading font-bold text-gradient-to-r from-primary-400 to-primary-500'>
                Antepli Pizza
              </h2>
            </div>
            <p className='font-body text-gray-300 text-sm leading-relaxed'>
              Delicious handcrafted pizzas, burgers, and pasta made with love
              and the finest ingredients. Fast delivery, amazing taste!
            </p>
            <div className='flex gap-4'>
              <Link
                href='#'
                className='p-2 bg-gray-800 rounded-full hover:bg-primary-600 transition-colors duration-300 group'
              >
                <Facebook className='w-5 h-5 text-gray-300 group-hover:text-white transition-colors' />
              </Link>
              <Link
                href='#'
                className='p-2 bg-gray-800 rounded-full hover:bg-primary-600 transition-colors duration-300 group'
              >
                <Instagram className='w-5 h-5 text-gray-300 group-hover:text-white transition-colors' />
              </Link>
              <Link
                href='#'
                className='p-2 bg-gray-800 rounded-full hover:bg-primary-600 transition-colors duration-300 group'
              >
                <Twitter className='w-5 h-5 text-gray-300 group-hover:text-white transition-colors' />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h3 className='text-lg font-heading font-semibold text-primary-400'>
              Quick Links
            </h3>
            <ul className='space-y-2 font-ui text-gray-300 text-sm'>
              <li>
                <Link
                  href='/'
                  className='hover:text-primary-400 transition-colors flex items-center gap-2 group'
                >
                  <ArrowRight className='w-4 h-4 text-primary-500 group-hover:translate-x-1 transition-transform' />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/menu'
                  className='hover:text-primary-400 transition-colors flex items-center gap-2 group'
                >
                  <ArrowRight className='w-4 h-4 text-primary-500 group-hover:translate-x-1 transition-transform' />
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href='/careers'
                  className='hover:text-primary-400 transition-colors flex items-center gap-2 group'
                >
                  <ArrowRight className='w-4 h-4 text-primary-500 group-hover:translate-x-1 transition-transform' />
                  Careers
                </Link>
              </li>{' '}
              <li>
                <Link
                  href='/partnership'
                  className='hover:text-primary-400 transition-colors flex items-center gap-2 group'
                >
                  <ArrowRight className='w-4 h-4 text-primary-500 group-hover:translate-x-1 transition-transform' />
                  Partnership
                </Link>
              </li>
              <li>
                <Link
                  href='/gallery'
                  className='hover:text-primary-400 transition-colors flex items-center gap-2 group'
                >
                  <ArrowRight className='w-4 h-4 text-primary-500 group-hover:translate-x-1 transition-transform' />
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href='/blog'
                  className='hover:text-primary-400 transition-colors flex items-center gap-2 group'
                >
                  <ArrowRight className='w-4 h-4 text-primary-500 group-hover:translate-x-1 transition-transform' />
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href='/branches'
                  className='hover:text-primary-400 transition-colors flex items-center gap-2 group'
                >
                  <ArrowRight className='w-4 h-4 text-primary-500 group-hover:translate-x-1 transition-transform' />
                  Branches
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='hover:text-primary-400 transition-colors flex items-center gap-2 group'
                >
                  <ArrowRight className='w-4 h-4 text-primary-500 group-hover:translate-x-1 transition-transform' />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='hover:text-primary-400 transition-colors flex items-center gap-2 group'
                >
                  <ArrowRight className='w-4 h-4 text-primary-500 group-hover:translate-x-1 transition-transform' />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className='space-y-4'>
            <h3 className='text-lg font-heading font-semibold text-primary-400'>
              Contact Us
            </h3>
            <ul className='space-y-3 font-ui text-gray-300 text-sm'>
              <li className='flex items-start gap-3'>
                <MapPin className='w-5 h-5 text-primary-500 shrink-0 mt-0.5' />
                <span>123 Pizza Street, Food City, FC 12345</span>
              </li>
              <li className='flex items-center gap-3'>
                <Phone className='w-5 h-5 text-primary-500 shrink-0' />
                <Link
                  href='tel:+905554443322'
                  className='hover:text-primary-400 transition-colors'
                >
                  0 555 444 33 22
                </Link>
              </li>
              <li className='flex items-center gap-3'>
                <Mail className='w-5 h-5 text-primary-500 shrink-0' />
                <Link
                  href='mailto:info@anteplipizza.com'
                  className='hover:text-primary-400 transition-colors'
                >
                  info@anteplipizza.com
                </Link>
              </li>
              <li className='flex items-center gap-3'>
                <Clock className='w-5 h-5 text-primary-500 shrink-0' />
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
                className='w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg text-sm'
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
              © {currentYear} Antepli Pizza. All rights reserved.
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
