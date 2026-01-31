import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'new' | 'bestseller' | 'hot' | 'discount';
  className?: string;
  pulse?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'new',
  className = '',
  pulse = false,
}) => {
  const baseStyles =
    'inline-flex items-center justify-center px-3 py-1 text-xs font-bold uppercase rounded-full shadow-sm';

  const variants = {
    new: 'bg-gradient-to-r from-primary-400 to-primary-500 text-white',
    bestseller: 'bg-gradient-to-r from-accent-500 to-accent-600 text-white',
    hot: 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
    discount: 'bg-gradient-to-r from-success-500 to-success-600 text-white',
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${pulse ? 'animate-pulse' : ''} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
