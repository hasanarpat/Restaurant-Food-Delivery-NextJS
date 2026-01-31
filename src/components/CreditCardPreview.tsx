'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface CreditCardPreviewProps {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

const CreditCardPreview: React.FC<CreditCardPreviewProps> = ({
  cardNumber,
  cardName,
  expiryDate,
  cvv,
}) => {
  // Format card number with spaces (XXXX XXXX XXXX XXXX)
  const formatCardNumber = (number: string) => {
    const cleaned = number.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || '';
    return formatted || '•••• •••• •••• ••••';
  };

  // Determine card type based on first digit
  const getCardType = () => {
    const firstDigit = cardNumber.charAt(0);
    if (firstDigit === '4') return 'Visa';
    if (firstDigit === '5') return 'Mastercard';
    if (firstDigit === '3') return 'Amex';
    return 'Card';
  };

  return (
    <div className='relative w-full max-w-md mx-auto perspective-1000'>
      {/* Main Card */}
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 0 }}
        className='relative w-full h-56 rounded-2xl overflow-hidden shadow-2xl'
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        {/* Glassmorphism overlay */}
        <div className='absolute inset-0 bg-white/10 backdrop-blur-sm' />

        {/* Decorative circles */}
        <div className='absolute -top-20 -right-20 w-64 h-64 bg-white/20 rounded-full blur-3xl' />
        <div className='absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl' />

        {/* Card content */}
        <div className='relative h-full p-6 flex flex-col justify-between text-white z-10'>
          {/* Top section - Logo & Chip */}
          <div className='flex justify-between items-start'>
            <div className='flex items-center gap-2'>
              {/* Chip */}
              <div className='w-12 h-10 bg-gradient-to-br from-amber-200 to-amber-400 rounded-lg relative overflow-hidden'>
                <div className='absolute inset-1 bg-gradient-to-br from-amber-300 to-amber-500 rounded' />
                <div className='absolute inset-2 grid grid-cols-3 gap-0.5'>
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className='bg-amber-600/30 rounded-sm' />
                  ))}
                </div>
              </div>

              {/* Contactless icon */}
              <svg
                className='w-6 h-6 text-white/80'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z' />
              </svg>
            </div>

            {/* Card type badge */}
            <div className='px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold'>
              {getCardType()}
            </div>
          </div>

          {/* Middle section - Card Number */}
          <div>
            <motion.div
              key={cardNumber}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className='font-mono text-2xl tracking-widest font-semibold mb-1'
            >
              {formatCardNumber(cardNumber)}
            </motion.div>
          </div>

          {/* Bottom section - Name & Expiry */}
          <div className='flex justify-between items-end'>
            <div className='flex-1'>
              <div className='text-xs text-white/70 mb-1 font-medium uppercase tracking-wide'>
                Card Holder
              </div>
              <motion.div
                key={cardName}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='font-semibold text-sm uppercase tracking-wide truncate'
              >
                {cardName || 'YOUR NAME'}
              </motion.div>
            </div>

            <div className='text-right'>
              <div className='text-xs text-white/70 mb-1 font-medium uppercase tracking-wide'>
                Expires
              </div>
              <motion.div
                key={expiryDate}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='font-mono font-semibold text-sm'
              >
                {expiryDate || 'MM/YY'}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Metallic sheen effect */}
        <div className='absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 pointer-events-none' />
      </motion.div>

      {/* CVV Preview (small card back view) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: cvv ? 1 : 0, y: cvv ? 0 : 10 }}
        className='mt-4 relative w-32 h-20 ml-auto rounded-lg overflow-hidden shadow-lg'
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <div className='absolute inset-0 bg-white/10 backdrop-blur-sm' />

        {/* Magnetic stripe */}
        <div className='absolute top-4 left-0 right-0 h-8 bg-gray-900/50' />

        {/* CVV section */}
        <div className='absolute bottom-3 right-3 bg-white/90 px-2 py-1 rounded text-xs font-mono font-bold text-gray-800'>
          {cvv || '•••'}
        </div>
      </motion.div>
    </div>
  );
};

export default CreditCardPreview;
