'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface OrderTrackerProps {
  currentStep: number; // 0-3 (Placed, Preparing, On the Way, Delivered)
  estimatedTime?: string;
}

const OrderTracker: React.FC<OrderTrackerProps> = ({
  currentStep,
  estimatedTime = '25 min',
}) => {
  const steps = [
    {
      title: 'Order Placed',
      description: 'We received your order',
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      ),
    },
    {
      title: 'Preparing',
      description: 'Your food is being prepared',
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
          />
        </svg>
      ),
    },
    {
      title: 'On the Way',
      description: 'Courier is delivering your order',
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
          />
        </svg>
      ),
    },
    {
      title: 'Delivered',
      description: 'Enjoy your meal!',
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M5 13l4 4L19 7'
          />
        </svg>
      ),
    },
  ];

  return (
    <div className='bg-white rounded-3xl p-6 lg:p-10 shadow-soft'>
      {/* ETA Badge */}
      {currentStep < 3 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full mb-8'
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className='w-2 h-2 bg-primary-600 rounded-full'
          />
          <span className='font-ui text-sm font-semibold text-primary-600'>
            Estimated: {estimatedTime}
          </span>
        </motion.div>
      )}

      {/* Timeline */}
      <div className='relative'>
        {/* Progress Line */}
        <div className='absolute left-6 top-0 bottom-0 w-1 bg-gray-200 rounded-full hidden md:block' />
        <motion.div
          className='absolute left-6 top-0 w-1 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full hidden md:block'
          initial={{ height: '0%' }}
          animate={{ height: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {/* Steps */}
        <div className='space-y-8'>
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className='relative flex items-start gap-6'
              >
                {/* Icon */}
                <motion.div
                  animate={
                    isActive
                      ? {
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                        }
                      : {}
                  }
                  transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                  className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                    isCompleted || isActive
                      ? 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {step.icon}

                  {/* Pulsing ring for active */}
                  {isActive && (
                    <motion.div
                      className='absolute inset-0 rounded-xl bg-primary-500'
                      animate={{
                        scale: [1, 1.5],
                        opacity: [0.5, 0],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Content */}
                <div className='flex-1 pt-1.5'>
                  <h3
                    className={`font-heading text-lg font-bold mb-1 ${
                      isCompleted || isActive
                        ? 'text-gray-900'
                        : 'text-gray-400'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className='font-body text-sm text-gray-600'>
                    {step.description}
                  </p>

                  {/* Active pulse */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className='mt-2 flex items-center gap-2 text-primary-600'
                    >
                      <motion.div
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className='w-2 h-2 bg-primary-600 rounded-full'
                      />
                      <span className='font-ui text-xs font-semibold'>
                        In Progress...
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Checkmark for completed */}
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className='flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center'
                  >
                    <svg
                      className='w-4 h-4 text-white'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderTracker;
