import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className='flex items-center gap-2 text-sm font-ui text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2 md:pb-0'
      aria-label='Breadcrumb'
    >
      <Link
        href='/'
        className='flex items-center gap-1 hover:text-primary-600 transition-colors'
      >
        <span className='text-lg'>🏠</span>
        <span className='hidden md:inline'>Home</span>
      </Link>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span className='text-gray-300'>/</span>
          {item.href ? (
            <Link
              href={item.href}
              className='hover:text-primary-600 transition-colors capitalize hover:underline'
            >
              {item.label}
            </Link>
          ) : (
            <span className='font-semibold text-primary-800 capitalize'>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </motion.nav>
  );
};

export default Breadcrumbs;
