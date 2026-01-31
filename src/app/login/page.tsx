'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Container from '@/components/ui/Container';
import { motion } from 'framer-motion';

const LoginPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-cream via-white to-primary-50 flex items-center justify-center py-16 px-4'>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className='max-w-5xl mx-auto bg-white rounded-3xl shadow-soft-lg overflow-hidden'
        >
          <div className='flex flex-col md:flex-row'>
            {/* Image Side */}
            <div className='relative h-64 md:h-auto md:w-1/2 bg-gradient-to-br from-primary-400 to-primary-600'>
              <Image
                src='/loginBg.png'
                alt='Login'
                fill
                className='object-cover mix-blend-overlay opacity-50'
              />
              <div className='absolute inset-0 flex items-center justify-center p-8'>
                <div className='text-center'>
                  <h2 className='font-heading text-3xl md:text-4xl font-bold text-white mb-3'>
                    Welcome Back!
                  </h2>
                  <p className='font-body text-white/90 text-sm md:text-base'>
                    Sign in to continue your culinary journey
                  </p>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className='p-8 md:p-12 md:w-1/2 flex flex-col justify-center'>
              <h1 className='font-heading text-3xl font-bold text-gray-900 mb-2'>
                Sign In
              </h1>
              <p className='font-body text-gray-600 mb-8'>
                Log in to your account or create a new one using social buttons
              </p>

              <div className='space-y-4'>
                {/* Google Login */}
                <button className='w-full flex items-center justify-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-primary-400 hover:bg-primary-50 transition-all group'>
                  <Image
                    src='/google.png'
                    alt='Google'
                    width={24}
                    height={24}
                    className='object-contain'
                  />
                  <span className='font-heading font-semibold text-gray-700 group-hover:text-primary-600 transition-colors'>
                    Sign in with Google
                  </span>
                </button>

                {/* Facebook Login */}
                <button className='w-full flex items-center justify-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-primary-400 hover:bg-primary-50 transition-all group'>
                  <Image
                    src='/facebook.png'
                    alt='Facebook'
                    width={24}
                    height={24}
                    className='object-contain'
                  />
                  <span className='font-heading font-semibold text-gray-700 group-hover:text-primary-600 transition-colors'>
                    Sign in with Facebook
                  </span>
                </button>
              </div>

              {/* Footer */}
              <div className='mt-8 pt-6 border-t border-gray-200'>
                <p className='font-ui text-sm text-gray-600 text-center'>
                  Don't have an account?{' '}
                  <Link
                    href='/register'
                    className='font-semibold text-primary-600 hover:text-primary-700 underline'
                  >
                    Create Account
                  </Link>
                </p>
                <p className='font-ui text-xs text-gray-500 text-center mt-4'>
                  Have a problem?{' '}
                  <Link
                    href='/'
                    className='text-primary-600 hover:text-primary-700 underline'
                  >
                    Contact Us
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default LoginPage;
