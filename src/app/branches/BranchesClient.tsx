'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';

import Button from '@/components/ui/Button';
import {
  MapPin,
  Phone,
  Clock,
  User,
  Navigation,
  Building2,
  Calendar,
  Star,
} from 'lucide-react';

interface BranchesClientProps {
  initialBranches: any[]; // Ideally IBranch[]
}

const BranchesClient: React.FC<BranchesClientProps> = ({
  initialBranches = [],
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('all');

  const branches = initialBranches.map((b) => ({
    id: b._id,
    name: b.name,
    address: b.address,
    city: b.city,
    district: b.district,
    phone: b.phone,
    workingHours: {
      weekday: b.workingHours, // Using the string from DB
      weekend: b.workingHours, // Using the string from DB
    },
    coordinates: b.coordinates,
    manager: b.manager || 'Şube Müdürü',
    rating: b.rating || 5,
    reviews: b.reviews || [],
  }));

  const cities = ['all', ...Array.from(new Set(branches.map((b) => b.city)))];

  const filteredBranches =
    selectedCity === 'all'
      ? branches
      : branches.filter((b) => b.city === selectedCity);

  const handleGetDirections = (lat: number, lng: number) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
      '_blank',
    );
  };

  return (
    <div className='min-h-screen bg-cream pt-28 md:pt-36'>
      <Container className='py-16'>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center mb-12 max-w-3xl mx-auto'
        >
          <h2 className='font-heading text-3xl md:text-4xl font-extrabold text-gray-900 mb-6'>
            Size En Yakın Şubemizi Bulun 📍
          </h2>
          <p className='font-body text-lg text-gray-600 leading-relaxed'>
            İzmir'in farklı noktalarında, her zaman size yakın. Taze ve lezzetli
            yemeklerimiz için en yakın şubemizi ziyaret edin!
          </p>
        </motion.div>

        {/* City Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='flex flex-wrap justify-center gap-3 mb-12'
        >
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCity === city
                  ? 'bg-primary-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow border border-gray-200'
              }`}
            >
              {city === 'all' ? 'Tüm Şubeler' : city}
            </button>
          ))}
        </motion.div>

        {/* Interactive Map with Markers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className='mb-16'
        >
          <div className='relative w-full h-[500px]'>
            {/* Google Maps Background */}
            <div className='absolute inset-0 bg-gray-200 rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d198586.38634466443!2d27.031684!3d38.423734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd862a762cacd%3A0x628cbba1a59ce8fe!2zxLB6bWly!5e0!3m2!1str!2str!4v1706797200000!5m2!1str!2str'
                className='absolute inset-0 w-full h-full border-0'
                allowFullScreen={true}
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              ></iframe>
              {/* Overlay for visual effect */}
              <div className='absolute inset-0 bg-white/5 pointer-events-none'></div>
            </div>

            {/* Branch Markers Overlay */}
            <div className='absolute inset-0 pointer-events-none'>
              {filteredBranches.map((branch, index) => {
                // Mock positions for İzmir branches (percentage-based)
                const mockPositions: {
                  [key: string]: { top: string; left: string };
                } = {
                  '1': { top: '45%', left: '48%' }, // Alsancak (merkez)
                  '2': { top: '35%', left: '42%' }, // Karşıyaka (kuzeybatı)
                  '3': { top: '50%', left: '65%' }, // Bornova (doğu)
                  '4': { top: '55%', left: '50%' }, // Konak (güney merkez)
                  '5': { top: '70%', left: '60%' }, // Buca (güneydoğu)
                };

                const position = mockPositions[branch.id] || {
                  top: '50%',
                  left: '50%',
                };

                return (
                  <div
                    key={branch.id}
                    className='absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-10 group'
                    style={{ top: position.top, left: position.left }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.2 }}
                      className='relative cursor-pointer'
                    >
                      {/* Marker Pin */}
                      <div className='p-3 bg-primary-500 rounded-full shadow-xl text-white group-hover:bg-primary-600 transition-all duration-300 border-4 border-white relative z-20'>
                        <MapPin size={24} className='drop-shadow-sm' />
                      </div>

                      {/* Ripple Effect */}
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

                      {/* Hover Info Card */}
                      <div className='absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30'>
                        <div className='bg-white/98 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-gray-100'>
                          <div className='flex items-start justify-between mb-3'>
                            <h3 className='font-heading text-lg font-bold text-gray-900 flex items-center gap-2'>
                              <Building2
                                size={20}
                                className='text-primary-600'
                              />
                              {branch.name}
                            </h3>
                            <div className='flex items-center gap-1 px-2 py-1 bg-yellow-400/20 text-yellow-700 rounded-full'>
                              <Star size={14} fill='currentColor' />
                              <span className='text-xs font-black'>
                                {branch.rating}
                              </span>
                            </div>
                          </div>
                          <div className='space-y-2 text-sm text-gray-600'>
                            <div className='flex items-start gap-2'>
                              <MapPin
                                size={16}
                                className='text-primary-500 flex-shrink-0 mt-0.5'
                              />
                              <span className='line-clamp-2'>
                                {branch.address}
                              </span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <Phone
                                size={16}
                                className='text-primary-500 flex-shrink-0'
                              />
                              <span>{branch.phone}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <Clock
                                size={16}
                                className='text-primary-500 flex-shrink-0'
                              />
                              <span>{branch.workingHours.weekday}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className='absolute top-6 left-6 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg border border-gray-100 z-20'>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-primary-500 rounded-full'>
                  <MapPin size={20} className='text-white' />
                </div>
                <div>
                  <p className='font-semibold text-gray-900 text-sm'>
                    {filteredBranches.length} Şube
                  </p>
                  <p className='text-xs text-gray-600'>İzmir Geneli</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Branches Grid */}
        <motion.div
          layout
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
        >
          {filteredBranches.map((branch, index) => (
            <motion.div
              key={branch.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className='bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group'
            >
              {/* Header */}
              <div className='bg-gradient-to-br from-primary-500 to-orange-500 p-6 text-white'>
                <div className='flex items-center gap-3 mb-2'>
                  <Building2 size={28} />
                  <h3 className='font-heading text-2xl font-bold'>
                    {branch.name}
                  </h3>
                </div>
                <p className='text-white/90 flex items-center gap-2'>
                  <MapPin size={16} />
                  {branch.district}, {branch.city}
                </p>
              </div>

              {/* Content */}
              <div className='p-6 space-y-4'>
                {/* Address */}
                <div className='flex gap-3'>
                  <MapPin
                    size={20}
                    className='text-primary-600 flex-shrink-0 mt-1'
                  />
                  <div>
                    <p className='font-semibold text-gray-900 mb-1'>Adres:</p>
                    <p className='text-gray-600 text-sm leading-relaxed'>
                      {branch.address}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className='flex gap-3'>
                  <Phone size={20} className='text-primary-600 flex-shrink-0' />
                  <div>
                    <p className='font-semibold text-gray-900 mb-1'>Telefon:</p>
                    <a
                      href={`tel:${branch.phone}`}
                      className='text-primary-600 hover:text-primary-700 font-semibold transition-colors'
                    >
                      {branch.phone}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className='flex gap-3'>
                  <Clock size={20} className='text-primary-600 flex-shrink-0' />
                  <div className='flex-1'>
                    <p className='font-semibold text-gray-900 mb-2'>
                      Çalışma Saatleri:
                    </p>
                    <div className='space-y-1 text-sm'>
                      <div className='flex items-center gap-2'>
                        <Calendar size={14} className='text-gray-400' />
                        <span className='text-gray-600'>
                          Hafta İçi: {branch.workingHours.weekday}
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Calendar size={14} className='text-gray-400' />
                        <span className='text-gray-600'>
                          Hafta Sonu: {branch.workingHours.weekend}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Manager */}
                <div className='flex gap-3'>
                  <User size={20} className='text-primary-600 flex-shrink-0' />
                  <div>
                    <p className='font-semibold text-gray-900 mb-1'>
                      Şube Müdürü:
                    </p>
                    <p className='text-gray-600'>{branch.manager}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
                  <span className='font-semibold text-gray-900'>
                    Müşteri Puanı:
                  </span>
                  <div className='flex items-center gap-2'>
                    <div className='flex gap-0.5'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={
                            i < Math.floor(branch.rating) ? '#fbbf24' : 'none'
                          }
                          color={
                            i < Math.floor(branch.rating)
                              ? '#fbbf24'
                              : '#e2e8f0'
                          }
                        />
                      ))}
                    </div>
                    <span className='font-bold text-gray-900'>
                      {branch.rating}
                    </span>
                  </div>
                </div>

                {/* Reviews */}
                <div className='pt-4 border-t border-gray-100'>
                  <h4 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
                    <Star size={18} className='text-yellow-500' />
                    Müşteri Yorumları ({branch.reviews.length})
                  </h4>
                  <div className='space-y-3 max-h-64 overflow-y-auto'>
                    {branch.reviews.map(
                      (review: {
                        id: string;
                        user: string;
                        comment: string;
                        rating: number;
                        date: string;
                      }) => (
                        <div
                          key={review.id}
                          className='bg-gray-50 p-4 rounded-2xl border border-gray-100'
                        >
                          <div className='flex justify-between items-start mb-2'>
                            <span className='font-bold text-sm text-gray-900'>
                              {review.user}
                            </span>
                            <div className='flex gap-0.5'>
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={12}
                                  fill={i < review.rating ? '#fbbf24' : 'none'}
                                  color={
                                    i < review.rating ? '#fbbf24' : '#e2e8f0'
                                  }
                                />
                              ))}
                            </div>
                          </div>
                          <p className='text-sm text-gray-600 italic leading-relaxed mb-2'>
                            "{review.comment}"
                          </p>
                          <span className='text-xs text-gray-400'>
                            {review.date}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Get Directions Button */}
                <div className='pt-4'>
                  <Button
                    variant='primary'
                    className='w-full flex items-center justify-center gap-2'
                    onClick={() =>
                      handleGetDirections(
                        branch.coordinates.lat,
                        branch.coordinates.lng,
                      )
                    }
                  >
                    <Navigation size={18} />
                    Yol Tarifi Al
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredBranches.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-center py-20'
          >
            <p className='text-gray-500 text-lg'>
              Bu şehirde henüz şubemiz bulunmuyor.
            </p>
          </motion.div>
        )}

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className='mt-16 bg-gradient-to-br from-primary-500 to-orange-500 rounded-[2.5rem] p-12 text-center text-white'
        >
          <h3 className='font-heading text-3xl font-bold mb-4'>
            Yeni Şubeler Yolda! 🎉
          </h3>
          <p className='text-xl text-white/90 mb-6 max-w-2xl mx-auto'>
            Yakında daha fazla lokasyonda sizlerle olacağız. Franchise
            fırsatları için bizi aramayı unutmayın!
          </p>
          <Button
            variant='secondary'
            size='lg'
            onClick={() => (window.location.href = '/partnership')}
            className='bg-white text-primary-600 hover:bg-white/90'
          >
            Franchise Başvurusu Yap
          </Button>
        </motion.div>
      </Container>
    </div>
  );
};

export default BranchesClient;
