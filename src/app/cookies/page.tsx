'use client';
import React from 'react';
import Container from '@/components/ui/Container';
import { motion } from 'framer-motion';
import { Cookie, Info, Settings, MousePointer2 } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <div className='min-h-screen bg-gray-50 py-20 px-4'>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='max-w-4xl mx-auto bg-white rounded-3xl shadow-soft-lg overflow-hidden border border-gray-100'
        >
          {/* Header */}
          <div className='bg-blue-600 p-8 md:p-12 text-white text-center relative overflow-hidden'>
            <div className='absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl'></div>
            <div className='absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl'></div>

            <Cookie className='w-16 h-16 mx-auto mb-6 opacity-90' />
            <h1 className='text-3xl md:text-5xl font-heading font-bold mb-4'>
              Cookie Policy
            </h1>
            <p className='text-blue-100 font-body text-lg'>
              How we use technological cookies in this demo
            </p>
          </div>

          {/* Portfolio Disclaimer */}
          <div className='p-6 bg-blue-50 border-b border-blue-100 flex items-start gap-4'>
            <Settings className='w-6 h-6 text-blue-600 mt-1 shrink-0' />
            <div>
              <h2 className='text-blue-800 font-bold mb-1'>
                Portfolio Technical Notice
              </h2>
              <p className='text-blue-700 text-sm leading-relaxed'>
                This site uses cookies strictly for **technical functionality**
                (like keeping you logged in or saving your pizza to the cart).
                We do not use advertising or tracking cookies from external
                providers.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className='p-8 md:p-12 space-y-10'>
            <section className='space-y-4'>
              <div className='flex items-center gap-3 text-blue-600 mb-2'>
                <Info className='w-6 h-6' />
                <h2 className='text-2xl font-heading font-bold'>
                  What are Cookies?
                </h2>
              </div>
              <p className='text-gray-600 leading-relaxed font-body'>
                Cookies are small text files stored on your device. In this
                portfolio project, they are used to ensure the application state
                is maintained as you navigate between pages.
              </p>
            </section>

            <section className='space-y-4'>
              <div className='flex items-center gap-3 text-blue-600 mb-2'>
                <MousePointer2 className='w-6 h-6' />
                <h2 className='text-2xl font-heading font-bold'>
                  How We Use Them
                </h2>
              </div>
              <ul className='list-disc list-inside space-y-3 text-gray-500 text-sm md:text-base'>
                <li>
                  <strong className='text-gray-800'>Authentication:</strong> We
                  use cookies to verify your identity after you sign in so you
                  can see your profile and place orders.
                </li>
                <li>
                  <strong className='text-gray-800'>Cart Persistence:</strong>{' '}
                  Local storage and cookies help keep your selected items in the
                  cart even if you refresh the page.
                </li>
                <li>
                  <strong className='text-gray-800'>Session Stability:</strong>{' '}
                  Ensuring you stay on the same server instance during your demo
                  session for consistent data.
                </li>
              </ul>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-heading font-bold text-gray-800'>
                Managing Cookies
              </h2>
              <p className='text-gray-600 leading-relaxed font-body'>
                You can clear your cookies anytime via your browser settings.
                Note that clearing them will log you out and reset your cart, as
                this is how the application tracks your demo state.
              </p>
            </section>

            <div className='pt-10 border-t border-gray-100 text-center'>
              <p className='text-gray-400 text-xs italic font-ui'>
                Created for development demonstration purposes. No data is sold
                or exploited.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default CookiePolicy;
