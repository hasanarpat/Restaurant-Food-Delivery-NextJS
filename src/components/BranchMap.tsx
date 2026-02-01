'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from './ui/Container';
import { MapPin, Star, Clock, MessageSquare, Phone } from 'lucide-react';

interface Review {
  id: string;
  user: string;
  comment: string;
  rating: number;
}

interface Branch {
  id: string;
  name: string;
  lat: number;
  lng: number;
  rating: number;
  hours: string;
  phone: string;
  address: string;
  reviews: Review[];
}

const BRANCHES: Branch[] = [
  {
    id: '1',
    name: 'Alsancak Şubesi',
    lat: 45,
    lng: 25,
    rating: 4.9,
    hours: '08:00 - 23:00',
    phone: '+90 (232) 123 45 67',
    address: 'Alsancak, Kıbrıs Şehitleri Cd.',
    reviews: [
      {
        id: 'r1',
        user: 'Caner',
        comment: 'Pizzalar şahane, servis hızlı.',
        rating: 5,
      },
      { id: 'r2', user: 'Berna', comment: 'Atmosfer harika.', rating: 4 },
    ],
  },
  {
    id: '2',
    name: 'Karşıyaka Sahil',
    lat: 30,
    lng: 50,
    rating: 4.7,
    hours: '10:00 - 22:00',
    phone: '+90 (232) 987 65 43',
    address: 'Karşıyaka Sahil Yolu No:45',
    reviews: [
      {
        id: 'r3',
        user: 'Mert',
        comment: 'Manzara ve lezzet bir arada.',
        rating: 5,
      },
    ],
  },
  {
    id: '3',
    name: 'Bornova Küçükpark',
    lat: 60,
    lng: 75,
    rating: 4.8,
    hours: '09:00 - 01:00',
    phone: '+90 (232) 456 78 90',
    address: 'Kazım Dirik Mh. 156 Sk.',
    reviews: [
      {
        id: 'r4',
        user: 'Selin',
        comment: 'Öğrenciler için birebir!',
        rating: 5,
      },
    ],
  },
];

const BranchMap = () => {
  const [hoveredBranch, setHoveredBranch] = useState<Branch | null>(null);

  return (
    <section className='py-24 bg-cream overflow-hidden'>
      <Container>
        <div className='text-center mb-16'>
          <h2 className='font-heading text-4xl md:text-5xl font-extrabold text-gray-900 mb-6'>
            Şubelerimiz
          </h2>
          <p className='font-body text-gray-600 max-w-2xl mx-auto text-lg'>
            Sizlere en yakın noktada hizmetinizdeyiz. Harita üzerindeki
            noktalara gelerek şube detaylarını, çalışma saatlerini ve yorumları
            görebilirsiniz.
          </p>
        </div>

        {/* Map Container - No overflow-hidden here to allow cards to pop out */}
        <div className='relative w-full h-[650px]'>
          {/* Background Map Layer with overflow-hidden for rounded corners */}
          <div className='absolute inset-0 bg-gray-200 rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6253.760012522405!2d27.152240994368157!3d38.39802342632936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1str!2str!4v1769957328418!5m2!1str!2str'
              className='absolute inset-0 w-full h-full border-0'
              allowFullScreen={true}
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
            {/* Soft overlay to make map less distracting */}
            <div className='absolute inset-0 bg-white/5 pointer-events-none'></div>
          </div>

          {/* Markers Layer - Full bounds, no overflow-hidden */}
          <div className='absolute inset-0 pointer-events-none'>
            {BRANCHES.map((branch) => {
              // Smart positioning logic
              const isFarRight = branch.lng > 70;
              const isFarLeft = branch.lng < 30;
              const isNearTop = branch.lat < 40;

              let cardClasses = 'absolute z-[60] w-80 pointer-events-auto';
              let initialY = 15;

              // Default: Centered above
              cardClasses += ' bottom-full left-1/2 -translate-x-1/2 mb-6';

              if (isFarRight) {
                cardClasses =
                  'absolute z-[60] w-80 bottom-full right-0 translate-x-1/4 mb-6 pointer-events-auto';
              } else if (isFarLeft) {
                cardClasses =
                  'absolute z-[60] w-80 bottom-full left-0 -translate-x-1/4 mb-6 pointer-events-auto';
              }

              if (isNearTop) {
                // Flip to bottom if near top
                cardClasses = cardClasses.replace('bottom-full', 'top-full');
                cardClasses = cardClasses.replace('mb-6', 'mt-6');
                initialY = -15;
              }

              return (
                <div
                  key={branch.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto ${
                    hoveredBranch?.id === branch.id ? 'z-[70]' : 'z-10'
                  }`}
                  style={{ left: `${branch.lng}%`, top: `${branch.lat}%` }}
                  onMouseEnter={() => setHoveredBranch(branch)}
                  onMouseLeave={() => setHoveredBranch(null)}
                >
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className='relative cursor-pointer group flex items-center justify-center'
                  >
                    <div className='p-4 bg-primary-500 rounded-full shadow-2xl text-white group-hover:bg-primary-600 transition-all duration-300 border-4 border-white transform-gpu relative z-20'>
                      <MapPin size={28} className='drop-shadow-sm' />
                    </div>

                    {/* Ripple Effect - Disable pointer events to prevent hover bug */}
                    <div className='absolute inset-0 -z-10 pointer-events-none'>
                      <motion.div
                        className='absolute inset-0 bg-primary-400 rounded-full'
                        animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          ease: 'easeOut',
                        }}
                      />
                    </div>

                    {/* Info Card on Hover */}
                    <AnimatePresence>
                      {hoveredBranch?.id === branch.id && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: initialY,
                            scale: 0.9,
                            filter: 'blur(10px)',
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            filter: 'blur(0px)',
                          }}
                          exit={{
                            opacity: 0,
                            y: initialY,
                            scale: 0.9,
                            filter: 'blur(10px)',
                          }}
                          transition={{
                            type: 'spring',
                            damping: 20,
                            stiffness: 300,
                          }}
                          className={`bg-white/98 backdrop-blur-2xl p-6 rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-white/60 ${cardClasses}`}
                        >
                          <div className='relative z-10 text-left'>
                            <div className='flex justify-between items-start mb-4'>
                              <h3 className='font-heading text-xl font-extrabold text-gray-900 tracking-tight'>
                                {branch.name}
                              </h3>
                              <div className='flex items-center gap-1.5 px-3 py-1 bg-yellow-400/20 text-yellow-700 rounded-full text-xs font-black'>
                                <Star size={14} fill='currentColor' />
                                {branch.rating}
                              </div>
                            </div>

                            <div className='space-y-3 mb-6'>
                              <div className='flex items-start gap-3 text-sm text-gray-600 font-medium font-ui'>
                                <MapPin
                                  size={18}
                                  className='text-primary-500 mt-0.5 flex-shrink-0'
                                />
                                <span className='leading-snug'>
                                  {branch.address}
                                </span>
                              </div>
                              <div className='flex items-center gap-3 text-sm text-gray-600 font-medium font-ui'>
                                <Clock
                                  size={18}
                                  className='text-primary-500 flex-shrink-0'
                                />
                                <span>{branch.hours}</span>
                              </div>
                              <div className='flex items-center gap-3 text-sm text-gray-600 font-medium font-ui'>
                                <Phone
                                  size={18}
                                  className='text-primary-500 flex-shrink-0'
                                />
                                <span>{branch.phone}</span>
                              </div>
                            </div>

                            {/* Mini Reviews Section */}
                            <div className='pt-5 border-t border-gray-100'>
                              <div className='flex items-center gap-2 mb-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]'>
                                <MessageSquare size={12} />
                                Müşteri Yorumları
                              </div>
                              <div className='space-y-3'>
                                {branch.reviews.map((review) => (
                                  <div
                                    key={review.id}
                                    className='bg-gray-50/80 p-4 rounded-2xl border border-gray-100/50'
                                  >
                                    <div className='flex justify-between items-center mb-2'>
                                      <span className='text-xs font-bold text-gray-900'>
                                        {review.user}
                                      </span>
                                      <div className='flex gap-0.5'>
                                        {[...Array(5)].map((_, i) => (
                                          <Star
                                            key={i}
                                            size={10}
                                            fill={
                                              i < review.rating
                                                ? '#fbbf24'
                                                : 'none'
                                            }
                                            color={
                                              i < review.rating
                                                ? '#fbbf24'
                                                : '#e2e8f0'
                                            }
                                          />
                                        ))}
                                      </div>
                                    </div>
                                    <p className='text-xs text-gray-500 italic leading-relaxed'>
                                      "{review.comment}"
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Decorative Elements */}
                          <div className='absolute -top-16 -right-16 w-32 h-32 bg-primary-200/20 rounded-full blur-3xl -z-10' />
                          <div className='absolute -bottom-16 -left-16 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl -z-10' />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BranchMap;
