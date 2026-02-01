'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageViewerProps {
  images: { src: string; alt: string; description?: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  images,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
}) => {
  const [zoom, setZoom] = React.useState(1);
  const currentImage = images[currentIndex];

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 1));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 bg-black/95 z-[200] flex items-center justify-center'
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm'
        >
          <X size={24} className='text-white' />
        </button>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrevious();
                setZoom(1);
              }}
              className='absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm'
            >
              <ChevronLeft size={32} className='text-white' />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
                setZoom(1);
              }}
              className='absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm'
            >
              <ChevronRight size={32} className='text-white' />
            </button>
          </>
        )}

        {/* Zoom Controls */}
        <div className='absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 bg-white/10 backdrop-blur-sm rounded-full p-2'>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleZoomOut();
            }}
            className='p-2 hover:bg-white/20 rounded-full transition-colors'
            disabled={zoom <= 1}
          >
            <ZoomOut size={20} className='text-white' />
          </button>
          <span className='text-white font-semibold px-3 py-2 text-sm'>
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleZoomIn();
            }}
            className='p-2 hover:bg-white/20 rounded-full transition-colors'
            disabled={zoom >= 3}
          >
            <ZoomIn size={20} className='text-white' />
          </button>
        </div>

        {/* Image Counter */}
        {images.length > 1 && (
          <div className='absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2'>
            <span className='text-white font-semibold text-sm'>
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        )}

        {/* Image Container */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className='max-w-7xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center p-8'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='relative overflow-hidden rounded-2xl'>
            <motion.img
              src={currentImage.src}
              alt={currentImage.alt}
              className='max-w-full max-h-[75vh] object-contain'
              style={{ scale: zoom }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            />
          </div>

          {/* Image Description */}
          {currentImage.description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className='mt-6 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 max-w-2xl'
            >
              <p className='text-white text-center font-ui leading-relaxed'>
                {currentImage.description}
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageViewer;
