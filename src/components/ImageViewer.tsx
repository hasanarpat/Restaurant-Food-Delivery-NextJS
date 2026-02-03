'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageObject {
  src: string;
  alt?: string;
  description?: string;
}

interface ImageViewerProps {
  images: (string | ImageObject)[];
  title?: string;
  currentIndex?: number;
  isOpen?: boolean;
  onClose?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  images,
  title = '',
  currentIndex: externalIndex,
  isOpen: externalIsOpen,
  onClose,
  onNext: externalNext,
  onPrevious: externalPrev,
}) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [scale, setScale] = useState(1);

  const isControlled = externalIsOpen !== undefined;
  const isIndexControlled = externalIndex !== undefined;

  const currentIndex = isIndexControlled
    ? (externalIndex as number)
    : internalIndex;
  const isLightboxOpen = isControlled ? externalIsOpen : internalIsOpen;
  const setIsLightboxOpen = (open: boolean) => {
    if (onClose && !open) onClose();
    if (!isControlled) setInternalIsOpen(open);
  };
  const setCurrentIndex = (index: number | ((prev: number) => number)) => {
    if (isIndexControlled) {
      // If externalNext/Prev provided, they should handle it,
      // but here we are in a thumbnail click or similar.
      // For now, we'll just allow internal index if not provided.
    }
    setInternalIndex(index);
  };

  const getImageUrl = (img: string | ImageObject) =>
    typeof img === 'string' ? img : img.src;
  const getImageAlt = (img: string | ImageObject) =>
    typeof img === 'string' ? title : img.alt || title;

  // If no images or empty array, fallback to placeholder (should be handled by parent but safe to check)
  if (!images || images.length === 0) {
    return (
      <div className='relative aspect-square bg-white rounded-[2.5rem] shadow-soft-lg overflow-hidden p-8 md:p-12 border border-gray-100 flex items-center justify-center'>
        <span className='text-gray-400'>No Image</span>
      </div>
    );
  }

  const currentImage = images[currentIndex];

  const handleNext = React.useCallback(() => {
    if (externalNext) {
      externalNext();
    } else {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
    setScale(1); // Reset zoom on change
  }, [images.length, externalNext]);

  const handlePrev = React.useCallback(() => {
    if (externalPrev) {
      externalPrev();
    } else {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
    setScale(1); // Reset zoom on change
  }, [images.length, externalPrev]);

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.5, 1));

  // Keyboard navigation
  React.useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === '+' || e.key === '=') handleZoomIn();
      if (e.key === '-') handleZoomOut();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, handleNext, handlePrev, handleZoomIn, handleZoomOut]);

  return (
    <div className='flex flex-col gap-4'>
      {/* Main Image - Only show if not controlled (standalone mode) */}
      {!isControlled && (
        <>
          <motion.div
            layoutId={`product-image-${currentIndex}`}
            className='relative aspect-square bg-white rounded-[2.5rem] shadow-soft-lg overflow-hidden p-8 md:p-12 border border-gray-100 group cursor-zoom-in'
            onClick={() => setIsLightboxOpen(true)}
          >
            <Image
              src={getImageUrl(currentImage)}
              alt={`${getImageAlt(currentImage)} - View ${currentIndex + 1}`}
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
              {images.map((img: string | ImageObject, index: number) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setScale(1);
                  }}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    index === currentIndex
                      ? 'border-primary-500 shadow-md ring-2 ring-primary-100'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={getImageUrl(img)}
                    alt={`${getImageAlt(img)} thumbnail ${index + 1}`}
                    fill
                    className='object-cover'
                  />
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4'
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Controls */}
            <div className='absolute top-6 right-6 flex items-center gap-4 z-50'>
              <div className='flex bg-white/10 rounded-full p-1 backdrop-blur-sm'>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoomOut();
                  }}
                  className='p-2 text-white hover:bg-white/20 rounded-full transition-colors'
                >
                  <ZoomOut className='w-5 h-5' />
                </button>
                <span className='px-2 flex items-center text-white text-sm font-mono min-w-[3ch] justify-center'>
                  {Math.round(scale * 100)}%
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoomIn();
                  }}
                  className='p-2 text-white hover:bg-white/20 rounded-full transition-colors'
                >
                  <ZoomIn className='w-5 h-5' />
                </button>
              </div>

              <button
                className='text-white bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors'
                onClick={() => setIsLightboxOpen(false)}
              >
                <X className='w-6 h-6' />
              </button>
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  className='absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white hover:bg-white/10 rounded-full transition-colors z-50'
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                >
                  <ChevronLeft className='w-8 h-8' />
                </button>
                <button
                  className='absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white hover:bg-white/10 rounded-full transition-colors z-50'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                >
                  <ChevronRight className='w-8 h-8' />
                </button>
              </>
            )}

            <motion.div
              className='relative w-full h-full flex items-center justify-center overflow-hidden'
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className='relative w-full max-w-5xl aspect-square md:aspect-video'
                animate={{ scale: scale, x: 0 }}
                transition={{ duration: 0.2 }}
                drag={scale === 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = offset.x; // + is right (prev), - is left (next)
                  if (swipe < -50 || velocity.x < -500) {
                    handleNext();
                  } else if (swipe > 50 || velocity.x > 500) {
                    handlePrev();
                  }
                }}
              >
                <Image
                  src={getImageUrl(currentImage)}
                  alt={getImageAlt(currentImage)}
                  fill
                  className='object-contain'
                  draggable={false}
                />
              </motion.div>
            </motion.div>

            {/* Thumbnails in Lightbox */}
            {images.length > 1 && (
              <div className='absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-50'>
                {images.map((_: any, index: number) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                      setScale(1);
                    }}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex
                        ? 'bg-primary-500 scale-125'
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
