'use client';
import React, { useState } from 'react';
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
  Send,
  Loader2,
  CheckCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '@/components/Notifications';
import apiClient from '@/lib/axios';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { success, error } = useNotification();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      await apiClient.post('/newsletter', { email });
      setIsSubscribed(true);
      success('Successfully subscribed to newsletter! 🎉');
      setEmail('');
    } catch (err: any) {
      if (err.message.includes('duplicate')) {
        error('You are already subscribed!');
      } else {
        error(err.message || 'Failed to subscribe. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className='bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white border-t border-gray-800 relative overflow-hidden'>
      {/* Decorative Gradients */}
      <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-orange-500 to-yellow-500'></div>
      <div className='absolute -top-24 -right-24 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none'></div>
      <div className='absolute -bottom-24 -left-24 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl pointer-events-none'></div>

      <Container>
        <div className='py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10'>
          {/* Brand Section */}
          <div className='space-y-6'>
            <div className='flex flex-col gap-4'>
              <div className='relative w-24 h-24 rounded-full overflow-hidden border-4 border-gray-700/50 shadow-xl group'>
                <Image
                  src='/images/logo_orange.png'
                  alt='Antepli Pizza'
                  fill
                  className='object-cover group-hover:scale-110 transition-transform duration-500'
                  priority
                />
              </div>
              <div>
                <h2 className='text-3xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-orange-400'>
                  Antepli Pizza
                </h2>
                <p className='text-gray-400 text-sm font-medium tracking-wide'>
                  EST. 2018
                </p>
              </div>
            </div>
            <p className='font-body text-gray-300 text-sm leading-relaxed max-w-xs'>
              Handcrafted with love, baked to perfection. Experience the true
              taste of traditional Turkish cuisine mixed with modern fast-food
              delights.
            </p>
            <div className='flex gap-3'>
              {[
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Twitter, href: '#' },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className='w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-primary-500 hover:to-orange-500 hover:text-white transition-all duration-300 group shadow-lg hover:shadow-orange-500/20 hover:-translate-y-1'
                >
                  <social.icon className='w-5 h-5 text-gray-400 group-hover:text-white transition-colors' />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className='space-y-6'>
            <h3 className='text-xl font-heading font-bold text-white relative inline-block'>
              Quick Links
              <span className='absolute -bottom-2 left-0 w-12 h-1 bg-primary-500 rounded-full'></span>
            </h3>
            <ul className='space-y-3 font-ui text-gray-300 text-sm'>
              {[
                { label: 'Home', href: '/' },
                { label: 'Menu', href: '/menu' },
                { label: 'Careers', href: '/careers' },
                { label: 'Partnership', href: '/partnership' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Blog', href: '/blog' },
                { label: 'Branches', href: '/branches' },
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className='group flex items-center gap-2 hover:text-primary-400 transition-colors py-1'
                  >
                    <ArrowRight className='w-3 h-3 text-primary-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300' />
                    <span className='group-hover:translate-x-1 transition-transform duration-300'>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className='space-y-6'>
            <h3 className='text-xl font-heading font-bold text-white relative inline-block'>
              Contact Us
              <span className='absolute -bottom-2 left-0 w-12 h-1 bg-primary-500 rounded-full'></span>
            </h3>
            <ul className='space-y-5 font-ui text-gray-300 text-sm'>
              <li className='flex items-start gap-4'>
                <div className='p-2 bg-gray-800 rounded-lg text-primary-500 shrink-0'>
                  <MapPin className='w-5 h-5' />
                </div>
                <span className='leading-relaxed pt-1'>
                  123 Pizza Street, Food City, FC 12345
                </span>
              </li>
              <li className='flex items-center gap-4'>
                <div className='p-2 bg-gray-800 rounded-lg text-primary-500 shrink-0'>
                  <Phone className='w-5 h-5' />
                </div>
                <Link
                  href='tel:+905554443322'
                  className='hover:text-primary-400 transition-colors pt-1'
                >
                  0 555 444 33 22
                </Link>
              </li>
              <li className='flex items-center gap-4'>
                <div className='p-2 bg-gray-800 rounded-lg text-primary-500 shrink-0'>
                  <Mail className='w-5 h-5' />
                </div>
                <Link
                  href='mailto:info@anteplipizza.com'
                  className='hover:text-primary-400 transition-colors pt-1'
                >
                  info@anteplipizza.com
                </Link>
              </li>
              <li className='flex items-start gap-4'>
                <div className='p-2 bg-gray-800 rounded-lg text-primary-500 shrink-0'>
                  <Clock className='w-5 h-5' />
                </div>
                <div>
                  <span className='block text-white font-semibold mb-1'>
                    Opening Hours
                  </span>
                  <span className='text-gray-400'>
                    Mon-Sun: 10:00 AM - 11:00 PM
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter section */}
          <div className='space-y-6'>
            <h3 className='text-xl font-heading font-bold text-white relative inline-block'>
              Newsletter
              <span className='absolute -bottom-2 left-0 w-12 h-1 bg-primary-500 rounded-full'></span>
            </h3>
            <p className='font-body text-sm text-gray-300 leading-relaxed'>
              Subscribe to get special offers, free giveaways, and the latest
              updates directly to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className='space-y-3 relative'>
              <div className='relative'>
                <Mail className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email address'
                  required
                  disabled={isSubscribed || isLoading}
                  className='w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed'
                />
              </div>
              <button
                type='submit'
                disabled={isSubscribed || isLoading}
                className='w-full px-4 py-3 bg-gradient-to-r from-primary-600 to-orange-600 hover:from-primary-500 hover:to-orange-500 text-white rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-orange-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95'
              >
                {isLoading ? (
                  <>
                    <Loader2 className='w-5 h-5 animate-spin' />
                    Subscribing...
                  </>
                ) : isSubscribed ? (
                  <>
                    <CheckCircle className='w-5 h-5' />
                    Subscribed!
                  </>
                ) : (
                  <>
                    Subscribe Now
                    <Send className='w-4 h-4' />
                  </>
                )}
              </button>
              {isSubscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='text-green-400 text-xs font-semibold text-center mt-2'
                >
                  Thank you for joining our family! 🧡
                </motion.p>
              )}
            </form>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className='border-t border-gray-800 bg-gray-950/50 relative z-10'>
        <Container>
          <div className='py-6 flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='font-ui text-xs text-gray-500 text-center md:text-left'>
              © {currentYear} Antepli Pizza. All rights reserved. Made with ❤️
              for food lovers.
            </p>
            <div className='flex gap-6 font-ui text-xs'>
              <Link
                href='/privacy'
                className='text-gray-500 hover:text-primary-400 transition-colors'
              >
                Privacy Policy
              </Link>
              <Link
                href='/terms'
                className='text-gray-500 hover:text-primary-400 transition-colors'
              >
                Terms of Service
              </Link>
              <Link
                href='/cookies'
                className='text-gray-500 hover:text-primary-400 transition-colors'
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
