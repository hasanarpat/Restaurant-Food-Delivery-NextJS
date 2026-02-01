'use client';
import React from 'react';
import Container from '@/components/ui/Container';
import { motion } from 'framer-motion';
import { FileText, ClipboardCheck, Scale, AlertTriangle } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className='min-h-screen bg-gray-50 py-20 px-4'>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='max-w-4xl mx-auto bg-white rounded-3xl shadow-soft-lg overflow-hidden border border-gray-100'
        >
          {/* Header */}
          <div className='bg-secondary-600 p-8 md:p-12 text-white text-center relative overflow-hidden'>
            <div className='absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl'></div>
            <div className='absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl'></div>

            <FileText className='w-16 h-16 mx-auto mb-6 opacity-90' />
            <h1 className='text-3xl md:text-5xl font-heading font-bold mb-4'>
              Terms of Service
            </h1>
            <p className='text-secondary-100 font-body text-lg'>
              Rules and guidelines for this demo experience
            </p>
          </div>

          {/* Portfolio Disclaimer */}
          <div className='p-6 bg-red-50 border-b border-red-100 flex items-start gap-4'>
            <AlertTriangle className='w-6 h-6 text-red-600 mt-1 shrink-0' />
            <div>
              <h2 className='text-red-800 font-bold mb-1'>
                Important Demo Notice
              </h2>
              <p className='text-red-700 text-sm leading-relaxed'>
                By using this site, you acknowledge that this is a **portfolio
                demonstration**. No real products will be delivered, and no real
                currency is exchanged. The "Payment" steps are entirely
                simulated to showcase development skills.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className='p-8 md:p-12 space-y-10'>
            <section className='space-y-4'>
              <div className='flex items-center gap-3 text-secondary-600 mb-2'>
                <ClipboardCheck className='w-6 h-6' />
                <h2 className='text-2xl font-heading font-bold'>
                  Usage Agreement
                </h2>
              </div>
              <p className='text-gray-600 leading-relaxed font-body'>
                Welcome to Antepli Pizza (Demo). By browsing or using this
                application, you agree to:
              </p>
              <ul className='list-disc list-inside space-y-2 text-gray-500 text-sm md:text-base'>
                <li>
                  Use the platform exclusively for testing and evaluating its
                  features.
                </li>
                <li>Avoid entering any real, sensitive personal data.</li>
                <li>
                  Understand that "Order Success" is a simulated UI event.
                </li>
                <li>
                  Respect the intellectual property of the project creator.
                </li>
              </ul>
            </section>

            <section className='space-y-4'>
              <div className='flex items-center gap-3 text-secondary-600 mb-2'>
                <Scale className='w-6 h-6' />
                <h2 className='text-2xl font-heading font-bold'>Liability</h2>
              </div>
              <p className='text-gray-600 leading-relaxed font-body'>
                The developer of this project is not liable for:
              </p>
              <ul className='list-disc list-inside space-y-2 text-gray-500 text-sm md:text-base'>
                <li>
                  Expectations of food delivery; we are software engineers, not
                  chefs (sadly).
                </li>
                <li>Data loss if the simulation database is wiped or reset.</li>
                <li>
                  Any misunderstandings arising from the simulated nature of the
                  payment system.
                </li>
              </ul>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-heading font-bold text-gray-800'>
                Contact for Tech Inquiries
              </h2>
              <p className='text-gray-600 leading-relaxed font-body'>
                If you are a recruiter or developer interested in how this site
                was built, please contact the author via the professional links
                provided in the original portfolio hosting this site.
              </p>
            </section>

            <div className='pt-10 border-t border-gray-100 text-center'>
              <p className='text-gray-400 text-xs italic font-ui'>
                Version 1.0 (Demo Mode). This document is part of a developer
                portfolio.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default TermsOfService;
