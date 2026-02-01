'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import Image from 'next/image';
import CartIcon from './CartIcon';
import { motion } from 'framer-motion';
import {
  Home,
  Pizza,
  BookOpen,
  Phone,
  Truck,
  Search,
  User,
  ShoppingCart,
  Facebook,
  Instagram,
  MapPin,
  Clock,
  Mail,
  LogOut,
  Settings,
  Package,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
    router.push('/');
  };

  const navLinks = [
    { href: '/', label: 'Home', icon: <Home className='w-5 h-5' /> },
    {
      href: '/menu',
      label: 'Menu',
      icon: <Pizza className='w-5 h-5' />,
    },
    { href: '/about', label: 'About', icon: <BookOpen className='w-5 h-5' /> },
    { href: '/contact', label: 'Contact', icon: <Phone className='w-5 h-5' /> },
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
            <div className='hidden md:flex items-center gap-6 text-white text-sm'>
              <div className='flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer'>
                <Phone className='w-4 h-4' />
                <span className='font-ui font-medium'>0 555 444 33 22</span>
              </div>
              <div className='hidden lg:flex items-center gap-2'>
                <Mail className='w-4 h-4' />
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
                  <Facebook className='w-5 h-5' />
                </a>
                <a
                  href='#'
                  className='hover:opacity-80 transition-opacity'
                  aria-label='Instagram'
                >
                  <Instagram className='w-5 h-5' />
                </a>
              </div>
              <div className='flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full'>
                <Truck className='w-4 h-4' />
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
              <span className='text-gray-500 group-hover:text-primary-600 transition-colors'>
                {link.icon}
              </span>
              <span className='font-ui font-medium text-gray-700 group-hover:text-primary-600 transition-colors'>
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Center - Logo using antepli_logo_solid.png */}
        <Link
          href='/'
          className='flex-1 md:text-center group flex justify-center items-center gap-3'
        >
          <div className='relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shadow-sm'>
            <Image
              src='/images/logo_orange.png'
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
            <Search className='w-5 h-5 text-gray-600 group-hover:text-primary-600 transition-colors' />
          </motion.button>

          {/* Track Order */}
          <Link
            href='/orders'
            className='hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors group'
          >
            <Truck className='w-5 h-5 text-gray-600 group-hover:text-primary-600 transition-colors' />
            <span className='font-ui font-medium text-gray-700 group-hover:text-primary-600 transition-colors text-sm'>
              Track
            </span>
          </Link>

          {/* User Menu or Login */}
          {user ? (
            <div className='relative'>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className='flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors group'
              >
                <div className='w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center'>
                  <User className='w-5 h-5 text-primary-600' />
                </div>
                <span className='font-ui font-medium text-gray-700 group-hover:text-primary-600 transition-colors'>
                  {user.profile.fullName.split(' ')[0]}
                </span>
                <ChevronDown className='w-4 h-4 text-gray-600 group-hover:text-primary-600 transition-colors' />
              </button>

              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50'
                >
                  <div className='px-4 py-3 border-b border-gray-100'>
                    <p className='font-ui font-semibold text-gray-900'>
                      {user.profile.fullName}
                    </p>
                    <p className='font-ui text-xs text-gray-500'>
                      {user.email}
                    </p>
                  </div>

                  <Link
                    href='/orders'
                    onClick={() => setShowUserMenu(false)}
                    className='flex items-center gap-3 px-4 py-2.5 hover:bg-primary-50 transition-colors'
                  >
                    <Package className='w-5 h-5 text-gray-600' />
                    <span className='font-ui text-sm text-gray-700'>
                      My Orders
                    </span>
                  </Link>

                  <Link
                    href='/profile'
                    onClick={() => setShowUserMenu(false)}
                    className='flex items-center gap-3 px-4 py-2.5 hover:bg-primary-50 transition-colors'
                  >
                    <Settings className='w-5 h-5 text-gray-600' />
                    <span className='font-ui text-sm text-gray-700'>
                      Settings
                    </span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className='w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors border-t border-gray-100 mt-1'
                  >
                    <LogOut className='w-5 h-5 text-red-600' />
                    <span className='font-ui text-sm text-red-600'>Logout</span>
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <Link
              href='/login'
              className='flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors group'
            >
              <User className='w-5 h-5 text-gray-600 group-hover:text-primary-600 transition-colors' />
              <span className='font-ui font-medium text-gray-700 group-hover:text-primary-600 transition-colors'>
                Login
              </span>
            </Link>
          )}

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
