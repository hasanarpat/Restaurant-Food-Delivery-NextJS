import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const reviewsData = [
  {
    id: 1,
    user: 'Sarah M.',
    avatar: '/temporary/avatar1.png', // Fallback will be handled if image fails or use placeholder
    rating: 5,
    date: '2 days ago',
    comment:
      'Absolutely delicious! The crust was perfectly crispy and the toppings were fresh. increasing the quantity next time! 🍕',
  },
  {
    id: 2,
    user: 'John D.',
    avatar: '/temporary/avatar2.png',
    rating: 4,
    date: '1 week ago',
    comment:
      'Great flavor, arrived hot. Slightly greasy but otherwise perfect. Would recommend the garlic sauce add-on.',
  },
  {
    id: 3,
    user: 'Emily R.',
    avatar: '/temporary/avatar3.png',
    rating: 5,
    date: '2 weeks ago',
    comment:
      "Best burger I've had in a while. The bun was soft and the meat was juicy. 10/10 will order again!",
  },
];

const Reviews = () => {
  return (
    <div className='py-8'>
      <h3 className='font-heading text-2xl font-bold text-gray-900 mb-6'>
        Customer Reviews ({reviewsData.length})
      </h3>

      <div className='flex flex-col gap-6'>
        {reviewsData.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className='border-b border-gray-100 pb-6 last:border-0'
          >
            <div className='flex items-start gap-4'>
              {/* Avatar Placeholder */}
              <div className='w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold'>
                {review.user.charAt(0)}
              </div>

              <div className='flex-1'>
                <div className='flex justify-between items-start mb-2'>
                  <div>
                    <h4 className='font-bold text-gray-900 text-sm'>
                      {review.user}
                    </h4>
                    <span className='text-xs text-gray-400'>{review.date}</span>
                  </div>
                  <div className='flex text-yellow-400 text-sm'>
                    {'★'.repeat(review.rating)}
                    {'★'
                      .repeat(5 - review.rating)
                      .split('')
                      .map((_, i) => (
                        <span key={i} className='text-gray-300'>
                          ★
                        </span>
                      ))}
                  </div>
                </div>
                <p className='text-gray-600 text-sm leading-relaxed'>
                  {review.comment}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
