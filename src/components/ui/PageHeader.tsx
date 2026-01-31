import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href: string }[];
  centered?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  centered = false,
}) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-6 flex items-center gap-2 text-sm font-ui text-gray-600'
        >
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span>/</span>}
              {index === breadcrumbs.length - 1 ? (
                <span className='text-gray-900 font-semibold'>
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className='hover:text-primary-600 transition-colors'
                >
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      )}

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: breadcrumbs ? 0.1 : 0 }}
        className='font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-4'
      >
        {title}
      </motion.h1>

      {/* Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: breadcrumbs ? 0.2 : 0.1 }}
          className={`font-body text-lg text-gray-600 ${
            centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default PageHeader;
