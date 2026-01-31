'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNotification } from '@/components/Notifications';
import { useRouter } from 'next/navigation';
import { div } from 'framer-motion/client';

type Tab = 'login' | 'signup';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>('login');
  const [showVerification, setShowVerification] = useState(false);
  const { success, error } = useNotification();
  const router = useRouter();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    verificationCode: '',
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!loginData.email || !loginData.password) {
      error('Please fill in all fields');
      return;
    }

    // Simulate login
    success('Login successful! Welcome back! 🎉');
    setTimeout(() => router.push('/'), 1500);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!signupData.fullName || !signupData.email || !signupData.password) {
      error('Please fill in all fields');
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      error('Passwords do not match');
      return;
    }

    if (signupData.password.length < 6) {
      error('Password must be at least 6 characters');
      return;
    }

    if (!showVerification) {
      // Request verification code
      setShowVerification(true);
      success('Verification code sent to your email! 📧');
      return;
    }

    // Verify code
    if (
      !signupData.verificationCode ||
      signupData.verificationCode.length !== 6
    ) {
      error('Please enter the 6-digit verification code');
      return;
    }

    // Simulate successful signup
    success('Account created successfully! Welcome! 🎉');
    setTimeout(() => router.push('/'), 1500);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-cream via-white to-primary-50 flex items-center justify-center py-12 px-4'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className='w-full max-w-7xl mx-auto bg-white rounded-3xl shadow-soft-lg overflow-hidden'
      >
        <div className='flex flex-col lg:flex-row min-h-[600px]'>
          {/* Image Side */}
          <div className='relative h-64 lg:h-auto lg:w-1/2 bg-gradient-to-br from-primary-100 to-primary-700'>
            <Image
              src='/loginBg.png'
              alt='Login'
              fill
              className='object-cover mix-blend-overlay opacity-50'
            />
            <div className='absolute inset-0 flex items-center justify-center p-8 lg:p-12'>
              <div className='text-center'>
                <h2 className='font-heading text-3xl lg:text-5xl font-bold text-white mb-4'>
                  {activeTab === 'login' ? 'Welcome Back!' : 'Join Us!'}
                </h2>
                <p className='font-body text-white/90 text-base lg:text-lg max-w-md mx-auto'>
                  {activeTab === 'login'
                    ? 'Sign in to continue your culinary journey'
                    : 'Create an account and start ordering delicious food'}
                </p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className='p-8 lg:p-16 lg:w-1/2 flex flex-col justify-center'>
            {/* Tabs */}
            <div className='flex gap-4 mb-8 border-b border-gray-200'>
              <button
                onClick={() => {
                  setActiveTab('login');
                  setShowVerification(false);
                }}
                className={`font-heading text-lg font-semibold pb-3 px-2 transition-all ${
                  activeTab === 'login'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setActiveTab('signup');
                  setShowVerification(false);
                }}
                className={`font-heading text-lg font-semibold pb-3 px-2 transition-all ${
                  activeTab === 'signup'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Login Form */}
            {activeTab === 'login' && (
              <motion.form
                key='login'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleLoginSubmit}
                className='space-y-6'
              >
                <div>
                  <label className='font-ui text-sm font-semibold text-gray-700 mb-2 block'>
                    Email Address
                  </label>
                  <input
                    type='email'
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    required
                    className='w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-primary-500 transition-colors font-body'
                    placeholder='your@email.com'
                  />
                </div>

                <div>
                  <label className='font-ui text-sm font-semibold text-gray-700 mb-2 block'>
                    Password
                  </label>
                  <input
                    type='password'
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    required
                    className='w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-primary-500 transition-colors font-body'
                    placeholder='••••••••'
                  />
                </div>

                <button
                  type='submit'
                  className='w-full bg-gradient-button hover:bg-gradient-button-hover text-white font-heading font-semibold py-4 rounded-xl transition-all shadow-md hover:shadow-lg'
                >
                  Sign In
                </button>

                <div className='relative'>
                  <div className='absolute inset-0 flex items-center'>
                    <div className='w-full border-t border-gray-300'></div>
                  </div>
                  <div className='relative flex justify-center text-sm'>
                    <span className='px-4 bg-white text-gray-500 font-ui'>
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <button
                    type='button'
                    className='flex items-center justify-center gap-3 p-3 border-2 border-gray-200 rounded-xl hover:border-primary-400 hover:bg-primary-50 transition-all'
                  >
                    <Image
                      src='/google.png'
                      alt='Google'
                      width={20}
                      height={20}
                    />
                    <span className='font-ui font-semibold text-gray-700 text-sm'>
                      Google
                    </span>
                  </button>
                  <button
                    type='button'
                    className='flex items-center justify-center gap-3 p-3 border-2 border-gray-200 rounded-xl hover:border-primary-400 hover:bg-primary-50 transition-all'
                  >
                    <Image
                      src='/facebook.png'
                      alt='Facebook'
                      width={20}
                      height={20}
                    />
                    <span className='font-ui font-semibold text-gray-700 text-sm'>
                      Facebook
                    </span>
                  </button>
                </div>
              </motion.form>
            )}

            {/* Signup Form */}
            {activeTab === 'signup' && (
              <motion.form
                key='signup'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleSignupSubmit}
                className='space-y-5'
              >
                {!showVerification ? (
                  <>
                    <div>
                      <label className='font-ui text-sm font-semibold text-gray-700 mb-2 block'>
                        Full Name
                      </label>
                      <input
                        type='text'
                        value={signupData.fullName}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            fullName: e.target.value,
                          })
                        }
                        required
                        className='w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-primary-500 transition-colors font-body'
                        placeholder='John Doe'
                      />
                    </div>

                    <div>
                      <label className='font-ui text-sm font-semibold text-gray-700 mb-2 block'>
                        Email Address
                      </label>
                      <input
                        type='email'
                        value={signupData.email}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            email: e.target.value,
                          })
                        }
                        required
                        className='w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-primary-500 transition-colors font-body'
                        placeholder='your@email.com'
                      />
                    </div>

                    <div>
                      <label className='font-ui text-sm font-semibold text-gray-700 mb-2 block'>
                        Password
                      </label>
                      <input
                        type='password'
                        value={signupData.password}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            password: e.target.value,
                          })
                        }
                        required
                        className='w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-primary-500 transition-colors font-body'
                        placeholder='••••••••'
                      />
                    </div>

                    <div>
                      <label className='font-ui text-sm font-semibold text-gray-700 mb-2 block'>
                        Confirm Password
                      </label>
                      <input
                        type='password'
                        value={signupData.confirmPassword}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            confirmPassword: e.target.value,
                          })
                        }
                        required
                        className='w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-primary-500 transition-colors font-body'
                        placeholder='••••••••'
                      />
                    </div>

                    <button
                      type='submit'
                      className='w-full bg-gradient-button hover:bg-gradient-button-hover text-white font-heading font-semibold py-4 rounded-xl transition-all shadow-md hover:shadow-lg'
                    >
                      Continue
                    </button>
                  </>
                ) : (
                  <>
                    <div className='text-center mb-6'>
                      <div className='w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <svg
                          className='w-8 h-8 text-primary-600'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                          />
                        </svg>
                      </div>
                      <h3 className='font-heading text-xl font-bold text-gray-900 mb-2'>
                        Check Your Email
                      </h3>
                      <p className='font-body text-sm text-gray-600'>
                        We've sent a 6-digit verification code to
                        <br />
                        <span className='font-semibold text-primary-600'>
                          {signupData.email}
                        </span>
                      </p>
                    </div>

                    <div>
                      <label className='font-ui text-sm font-semibold text-gray-700 mb-2 block text-center'>
                        Verification Code
                      </label>
                      <input
                        type='text'
                        value={signupData.verificationCode}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            verificationCode: e.target.value.replace(/\D/g, ''),
                          })
                        }
                        maxLength={6}
                        required
                        className='w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-primary-500 transition-colors font-mono text-center text-2xl tracking-widest'
                        placeholder='000000'
                      />
                    </div>

                    <button
                      type='submit'
                      className='w-full bg-gradient-button hover:bg-gradient-button-hover text-white font-heading font-semibold py-4 rounded-xl transition-all shadow-md hover:shadow-lg'
                    >
                      Verify & Create Account
                    </button>

                    <button
                      type='button'
                      onClick={() => {
                        success('Verification code resent! 📧');
                      }}
                      className='w-full text-primary-600 hover:text-primary-700 font-ui text-sm font-semibold'
                    >
                      Resend Code
                    </button>
                  </>
                )}
              </motion.form>
            )}

            {/* Footer */}
            <div className='mt-6 pt-6 border-t border-gray-200'>
              <p className='font-ui text-xs text-gray-500 text-center'>
                Have a problem?{' '}
                <Link
                  href='/'
                  className='text-primary-600 hover:text-primary-700 underline font-semibold'
                >
                  Contact Us
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
