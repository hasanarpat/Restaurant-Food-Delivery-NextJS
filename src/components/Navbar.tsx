'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import Image from 'next/image';
import CartIcon from './CartIcon';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  LogOut,
  Settings,
  Package,
  ChevronDown,
  Truck,
  Phone,
  Mail,
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
    router.refresh();
  };

  const navLinks = [
    { href: '/', label: 'Anasayfa' },
    { href: '/menu', label: 'Menü' },
    { href: '/branches', label: 'Şubeler' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg' : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      {/* Top Info Bar - Hides on scroll */}
      <div
        className={`bg-primary-600 text-white transition-all duration-300 overflow-hidden ${
          scrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'
        }`}
      >
        <div className='container mx-auto px-4 h-full flex items-center justify-between text-sm'>
          <div className='flex items-center gap-6'>
            <a
              href='tel:05554443322'
              className='flex items-center gap-2 hover:opacity-80 transition-opacity'
            >
              <Phone className='w-3.5 h-3.5' />
              <span className='hidden md:inline'>0 555 444 33 22</span>
            </a>
            <a
              href='mailto:info@anteplipizza.com'
              className='hidden lg:flex items-center gap-2 hover:opacity-80 transition-opacity'
            >
              <Mail className='w-3.5 h-3.5' />
              <span>info@anteplipizza.com</span>
            </a>
          </div>
          <div className='flex items-center gap-2'>
            <Truck className='w-3.5 h-3.5' />
            <span className='font-medium'>Free delivery over $30</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className='border-b border-gray-100'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between h-16 lg:h-20'>
            {/* Logo */}
            <Link
              href='/'
              className='flex items-center gap-3 hover:opacity-90 transition-opacity'
            >
              <div className='relative w-12 h-12 lg:w-16 lg:h-16 rounded-full overflow-hidden shadow-sm flex-shrink-0'>
                <Image
                  src='/images/logo_orange.png'
                  alt='Antepli Pizza'
                  fill
                  sizes='100px'
                  className='object-cover'
                  priority
                />
              </div>
              <span className='font-heading text-xl lg:text-2xl font-bold text-gray-800'>
                Antepli Pizza
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className='hidden lg:flex items-center gap-1'>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className='px-4 py-2 rounded-lg font-ui font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all'
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className='hidden lg:flex items-center gap-2'>
              {/* Track Order */}
              <Link
                href='/orders'
                className='flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors group'
              >
                <Truck className='w-4 h-4 text-gray-600 group-hover:text-primary-600 transition-colors' />
                <span className='font-ui font-medium text-gray-700 group-hover:text-primary-600 transition-colors text-sm'>
                  Track
                </span>
              </Link>

              {/* User Menu */}
              {user ? (
                <div className='relative'>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className='flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors'
                  >
                    <div className='w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center'>
                      <User className='w-4 h-4 text-primary-600' />
                    </div>
                    <span className='font-ui font-medium text-gray-700'>
                      {user.profile.fullName.split(' ')[0]}
                    </span>
                    <ChevronDown className='w-4 h-4 text-gray-600' />
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
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
                          <Package className='w-4 h-4 text-gray-600' />
                          <span className='font-ui text-sm text-gray-700'>
                            My Orders
                          </span>
                        </Link>

                        <Link
                          href='/profile'
                          onClick={() => setShowUserMenu(false)}
                          className='flex items-center gap-3 px-4 py-2.5 hover:bg-primary-50 transition-colors'
                        >
                          <Settings className='w-4 h-4 text-gray-600' />
                          <span className='font-ui text-sm text-gray-700'>
                            Settings
                          </span>
                        </Link>

                        <button
                          onClick={handleLogout}
                          className='w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors border-t border-gray-100 mt-1'
                        >
                          <LogOut className='w-4 h-4 text-red-600' />
                          <span className='font-ui text-sm text-red-600'>
                            Logout
                          </span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href='/login'
                  className='flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors'
                >
                  <User className='w-4 h-4 text-gray-600' />
                  <span className='font-ui font-medium text-gray-700'>
                    Login
                  </span>
                </Link>
              )}

              {/* Cart */}
              <Link href='/cart'>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CartIcon />
                </motion.div>
              </Link>
            </div>

            {/* Mobile: Cart + Menu */}
            <div className='flex lg:hidden items-center gap-3'>
              <Link href='/cart'>
                <CartIcon />
              </Link>
              <Menu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
