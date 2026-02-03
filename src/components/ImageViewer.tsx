'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X } from 'lucide-react';

interface ImageViewerProps {
  images: string[];
  title: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // If no images or empty array, fallback to placeholder (should be handled by parent but safe to check)
  if (!images || images.length === 0) {
    return (
      <div className='relative aspect-square bg-white rounded-[2.5rem] shadow-soft-lg overflow-hidden p-8 md:p-12 border border-gray-100 flex items-center justify-center'>
        <span className='text-gray-400'>No Image</span>
      </div>
    );
  }

  const currentImage = images[currentIndex];

  return (
    <div className='flex flex-col gap-4'>
      {/* Main Image */}
      <motion.div
        layoutId={`product-image-${currentIndex}`}
        className='relative aspect-square bg-white rounded-[2.5rem] shadow-soft-lg overflow-hidden p-8 md:p-12 border border-gray-100 group cursor-zoom-in'
        onClick={() => setIsLightboxOpen(true)}
      >
        <Image
          src={currentImage}
          alt={`${title} - View ${currentIndex + 1}`}
          fill
          className='object-contain hover:scale-105 transition-transform duration-700'
          priority
        />

        <div className='absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-sm text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity'>
          <ZoomIn className='w-5 h-5' />
        </div>
      </motion.div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className='flex gap-4 overflow-x-auto pb-2 px-2'>
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                index === currentIndex
                  ? 'border-primary-500 shadow-md ring-2 ring-primary-100'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                className='object-cover'
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4'
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              className='absolute top-6 right-6 text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors'
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className='w-8 h-8' />
            </button>

            <motion.div
              layoutId={`product-image-${currentIndex}`}
              className='relative w-full max-w-5xl aspect-square md:aspect-video'
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={currentImage}
                alt={title}
                fill
                className='object-contain'
              />
            </motion.div>

            {/* Thumbnails in Lightbox */}
            {images.length > 1 && (
              <div className='absolute bottom-10 left-0 right-0 flex justify-center gap-2'>
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                    }}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex
                        ? 'bg-white'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageViewer;
