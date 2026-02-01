'use client';
import React from 'react';
import Container from '@/components/ui/Container';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, AlertCircle } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className='min-h-screen bg-gray-50 py-20 px-4'>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='max-w-4xl mx-auto bg-white rounded-3xl shadow-soft-lg overflow-hidden border border-gray-100'
        >
          {/* Header */}
          <div className='bg-primary-600 p-8 md:p-12 text-white text-center relative overflow-hidden'>
            <div className='absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl'></div>
            <div className='absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl'></div>

            <Shield className='w-16 h-16 mx-auto mb-6 opacity-90' />
            <h1 className='text-3xl md:text-5xl font-heading font-bold mb-4'>
              Privacy Policy
            </h1>
            <p className='text-primary-100 font-body text-lg'>
              How we protect your data in this demo
            </p>
          </div>

          {/* Portfolio Disclaimer */}
          <div className='p-6 bg-orange-50 border-b border-orange-100 flex items-start gap-4'>
            <AlertCircle className='w-6 h-6 text-orange-600 mt-1 shrink-0' />
            <div>
              <h2 className='text-orange-800 font-bold mb-1'>
                Portfolio Project Disclaimer
              </h2>
              <p className='text-orange-700 text-sm leading-relaxed'>
                This website is a **demonstration project** created for a
                developer portfolio. It is NOT a real business. Any information
                entered here (emails, dummy credit card numbers, addresses) is
                stored solely for simulating the user experience and is not used
                for real transactions or shared with third parties.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className='p-8 md:p-12 space-y-10'>
            <section className='space-y-4'>
              <div className='flex items-center gap-3 text-primary-600 mb-2'>
                <Eye className='w-6 h-6' />
                <h2 className='text-2xl font-heading font-bold'>
                  Data Collection
                </h2>
              </div>
              <p className='text-gray-600 leading-relaxed font-body'>
                In this demo environment, we collect the following information
                when you interact with the site:
              </p>
              <ul className='list-disc list-inside space-y-2 text-gray-500 text-sm md:text-base'>
                <li>
                  Account details (Full Name, Email, Phone) during registration.
                </li>
                <li>
                  Delivery information (Address, City, Zip Code) during the
                  checkout simulation.
                </li>
                <li>
                  Simulated payment details (Dummy card numbers) for order
                  processing logic.
                </li>
                <li>
                  Navigation data for internal performance testing of the
                  application.
                </li>
              </ul>
            </section>

            <section className='space-y-4'>
              <div className='flex items-center gap-3 text-primary-600 mb-2'>
                <Lock className='w-6 h-6' />
                <h2 className='text-2xl font-heading font-bold'>Security</h2>
              </div>
              <p className='text-gray-600 leading-relaxed font-body'>
                While this is a demo, we treat data security with high
                standards:
              </p>
              <ul className='list-disc list-inside space-y-2 text-gray-500 text-sm md:text-base'>
                <li>
                  Sensitive data is handled using modern encryption standards.
                </li>
                <li>
                  Authentication is managed via secure cookie-based tokens.
                </li>
                <li>
                  No real financial data is processed; the payment flow is
                  entirely simulated using a mock repository.
                </li>
              </ul>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-heading font-bold text-gray-800'>
                Third-Party Services
              </h2>
              <p className='text-gray-600 leading-relaxed font-body'>
                This site links to various developer tools and icons (Lucide,
                Framer Motion, Next.js). We do not sell your "demo" data to
                advertisers.
              </p>
            </section>

            <div className='pt-10 border-t border-gray-100 text-center'>
              <p className='text-gray-400 text-xs italic font-ui'>
                Last Updated: February 2026. This policy is subject to change as
                the portfolio project evolves.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;
