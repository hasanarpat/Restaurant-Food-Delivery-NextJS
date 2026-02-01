'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';

import ImageViewer from '@/components/ImageViewer';
import { Camera, Heart } from 'lucide-react';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  description: string;
  category: 'products' | 'team' | 'ambiance' | 'customers';
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: '1',
    src: '/artifacts/gallery_team_cooking_1769958603028.png',
    alt: 'Mutfak Ekibimiz',
    description:
      'Ekibimiz bir aile gibi! Her gün aşkla, özenle hazırlıyoruz lezzetlerimizi. 👨‍🍳❤️',
    category: 'team',
  },
  {
    id: '2',
    src: '/artifacts/gallery_lahmacun_prep_1769958617413.png',
    alt: 'Lahmacun Hazırlığı',
    description:
      'El emeği göz nuru... Hamurdan hazır lezzetlere kadar her aşama özenle hazırlanıyor. 🥖',
    category: 'products',
  },
  {
    id: '3',
    src: '/artifacts/gallery_customers_happy_1769958633312.png',
    alt: 'Mutlu Müşterilerimiz',
    description:
      'Sizin mutluluğunuz bizim en büyük ödülümüz! Ailecek, arkadaşça güzel anlar. 🤗',
    category: 'customers',
  },
  {
    id: '4',
    src: '/artifacts/gallery_baklava_display_1769958660988.png',
    alt: 'Tatlı Vitrini',
    description:
      'Geleneksel Türk tatlılarımız... Fıstık, ceviz, bal ile hazırlanan şaheserlerin vitrini. 🍯',
    category: 'products',
  },
  {
    id: '5',
    src: '/artifacts/gallery_restaurant_ambiance_1769958675436.png',
    alt: 'Restoranımızın Atmosferi',
    description:
      'Sıcak, samimi ve geleneksel... Kendinizi evinizde gibi hissedebileceğiniz bir atmosfer. 🏮',
    category: 'ambiance',
  },
  {
    id: '6',
    src: '/artifacts/gallery_kebab_grill_1769958689535.png',
    alt: 'Kebap Izgara',
    description:
      'Közde pişen kebaplarımız... Ateş üzerinde ustalıkla hazırlanan geleneksel lezzetler. 🔥',
    category: 'products',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'Tümü', icon: <Camera size={18} /> },
  { id: 'products', label: 'Ürünlerimiz', icon: <Heart size={18} /> },
  { id: 'team', label: 'Ekibimiz', icon: <Heart size={18} /> },
  { id: 'ambiance', label: 'Atmosfer', icon: <Heart size={18} /> },
  { id: 'customers', label: 'Müşterilerimiz', icon: <Heart size={18} /> },
];

const GalleryClient = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredImages =
    selectedCategory === 'all'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === selectedCategory);

  const openViewer = (index: number) => {
    setCurrentImageIndex(index);
    setViewerOpen(true);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === filteredImages.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <div className='min-h-screen pt-28 md:pt-36 bg-cream'>
      <Container className='py-16'>
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center mb-12 max-w-3xl mx-auto'
        >
          <h2 className='font-heading text-3xl md:text-4xl font-extrabold text-gray-900 mb-6'>
            Bizim Hikayemiz 📸
          </h2>
          <p className='font-body text-lg text-gray-600 leading-relaxed'>
            Her fotoğraf bir anı, her an bir hikaye... Mutfağımızın sıcaklığını,
            ekibimizin enerjisini ve sizlerle paylaştığımız güzel anları
            keşfedin.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='flex flex-wrap justify-center gap-3 mb-12'
        >
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow border border-gray-200'
              }`}
            >
              {category.icon}
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              onClick={() => openViewer(index)}
              className='group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all'
            >
              <img
                src={image.src}
                alt={image.alt}
                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
              />
              {/* Overlay */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <div className='absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
                  <h3 className='font-heading text-xl font-bold mb-2'>
                    {image.alt}
                  </h3>
                  <p className='text-sm text-white/90 line-clamp-2'>
                    {image.description}
                  </p>
                </div>
              </div>

              {/* Camera Icon */}
              <div className='absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <Camera size={20} className='text-primary-600' />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-center py-20'
          >
            <p className='text-gray-500 text-lg'>
              Bu kategoride henüz fotoğraf bulunmuyor.
            </p>
          </motion.div>
        )}
      </Container>

      {/* Image Viewer */}
      {viewerOpen && (
        <ImageViewer
          images={filteredImages.map((img) => ({
            src: img.src,
            alt: img.alt,
            description: img.description,
          }))}
          currentIndex={currentImageIndex}
          onClose={() => setViewerOpen(false)}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </div>
  );
};

export default GalleryClient;
