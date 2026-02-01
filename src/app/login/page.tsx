'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNotification } from '@/components/Notifications';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import apiClient from '@/lib/axios';
import { useAuth } from '@/contexts/AuthContext';

// Zod Schemas matching Backend (loosely for frontend validation)
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const signupSchema = z
  .object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    phone: z.string().min(10, 'Phone number is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

type Tab = 'login' | 'signup';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>('login');
  const [isLoading, setIsLoading] = useState(false);
  const { success, error: showError } = useNotification();
  const { refetch } = useAuth();
  const router = useRouter();

  // Login Form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  // Signup Form
  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await apiClient.post('/auth/login', data);
      await refetch(); // Fetch user data
      success('Login successful! Welcome back! 🎉');
      // Force refresh to update auth state (middleware/cookies)
      router.refresh();
      setTimeout(() => router.push('/'), 1000);
    } catch (err: any) {
      showError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const onSignupSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      // Backend expects: email, password, fullName, phone
      const { confirmPassword, ...registerData } = data;

      await apiClient.post('/auth/register', registerData);
      await refetch(); // Fetch user data
      success('Account created successfully! Welcome! 🎉');
      router.refresh();
      setTimeout(() => router.push('/'), 1000);
    } catch (err: any) {
      showError(err.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
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
                onClick={() => setActiveTab('login')}
                className={`font-heading text-lg font-semibold pb-3 px-2 transition-all ${
                  activeTab === 'login'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab('signup')}
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
                onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                className='space-y-6'
              >
                <div>
                  <label className='font-ui text-sm font-semibold text-gray-700 mb-2 block'>
                    Email Address
                  </label>
                  <input
                    {...loginForm.register('email')}
                    type='email'
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      loginForm.formState.errors.email
                        ? 'border-red-500'
                        : 'border-gray-200'
                    } focus:outline-none focus:border-primary-500 transition-colors font-body`}
                    placeholder='your@email.com'
                  />
                  {loginForm.formState.errors.email && (
                    <p className='text-red-500 text-xs mt-1'>
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className='font-ui text-sm font-semibold text-gray-700 mb-2 block'>
                    Password
                  </label>
                  <input
                    {...loginForm.register('password')}
                    type='password'
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      loginForm.formState.errors.password
                        ? 'border-red-500'
                        : 'border-gray-200'
                    } focus:outline-none focus:border-primary-500 transition-colors font-body`}
                    placeholder='••••••••'
                  />
                  {loginForm.formState.errors.password && (
                    <p className='text-red-500 text-xs mt-1'>
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <button
                  type='submit'
                  disabled={isLoading}
                  className='w-full bg-gradient-button hover:bg-gradient-button-hover text-white font-heading font-semibold py-4 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
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
                onSubmit={signupForm.handleSubmit(onSignupSubmit)}
                className='space-y-5'
              >
                <div>
                  <label className='font-ui text-sm font-semibold text-gray-700 mb-2 block'>
                    Full Name
                  </label>
                  <input
                    {...signupForm.register('fullName')}
                    type='text'
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      signupForm.formState.errors.fullName
                        ? 'border-red-500'
                        : 'border-gray-200'
                    } focus:outline-none focus:border-primary-500 transition-colors font-body`}
                    placeholder='John Doe'
                  />
                  {signupForm.formState.errors.fullName && (
                    <p className='text-red-500 text-xs mt-1'>
                      {signupForm.formState.errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className='font-ui text-sm font-semibold text-gray-700 mb-2 block'>
                    Email Address
                  </label>
                  <input
                    {...signupForm.register('email')}
                    type='email'
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      signupForm.formState.errors.email
                        ? 'border-red-500'
                        : 'border-gray-200'
                    } focus:outline-none focus:border-primary-500 transition-colors font-body`}
                    placeholder='your@email.com'
                  />
                  {signupForm.formState.errors.email && (
                    <p className='text-red-500 text-xs mt-1'>
                      {signupForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className='font-ui text-sm font-semibold text-gray-700 mb-2 block'>
                    Phone Number
                  </label>
                  <input
                    {...signupForm.register('phone')}
                    type='tel'
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      signupForm.formState.errors.phone
                        ? 'border-red-500'
                        : 'border-gray-200'
                    } focus:outline-none focus:border-primary-500 transition-colors font-body`}
                    placeholder='5551234567'
                  />
                  {signupForm.formState.errors.phone && (
                    <p className='text-red-500 text-xs mt-1'>
                      {signupForm.formState.errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className='font-ui text-sm font-semibold text-gray-700 mb-2 block'>
                    Password
                  </label>
                  <input
                    {...signupForm.register('password')}
                    type='password'
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      signupForm.formState.errors.password
                        ? 'border-red-500'
                        : 'border-gray-200'
                    } focus:outline-none focus:border-primary-500 transition-colors font-body`}
                    placeholder='••••••••'
                  />
                  {signupForm.formState.errors.password && (
                    <p className='text-red-500 text-xs mt-1'>
                      {signupForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className='font-ui text-sm font-semibold text-gray-700 mb-2 block'>
                    Confirm Password
                  </label>
                  <input
                    {...signupForm.register('confirmPassword')}
                    type='password'
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      signupForm.formState.errors.confirmPassword
                        ? 'border-red-500'
                        : 'border-gray-200'
                    } focus:outline-none focus:border-primary-500 transition-colors font-body`}
                    placeholder='••••••••'
                  />
                  {signupForm.formState.errors.confirmPassword && (
                    <p className='text-red-500 text-xs mt-1'>
                      {signupForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <button
                  type='submit'
                  disabled={isLoading}
                  className='w-full bg-gradient-button hover:bg-gradient-button-hover text-white font-heading font-semibold py-4 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
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
