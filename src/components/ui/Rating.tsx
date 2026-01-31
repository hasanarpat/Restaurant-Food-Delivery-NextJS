import React from 'react';

interface RatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showNumber = true,
  className = '',
}) => {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className='flex items-center gap-0.5'>
        {[...Array(maxRating)].map((_, index) => {
          if (index < fullStars) {
            // Full star
            return (
              <svg
                key={index}
                className={`${sizes[size]} text-primary-500 fill-current`}
                viewBox='0 0 20 20'
              >
                <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
              </svg>
            );
          } else if (index === fullStars && hasHalfStar) {
            // Half star
            return (
              <svg
                key={index}
                className={`${sizes[size]} text-primary-500`}
                viewBox='0 0 20 20'
              >
                <defs>
                  <linearGradient id={`half-${index}`}>
                    <stop
                      offset='50%'
                      stopColor='currentColor'
                      stopOpacity='1'
                    />
                    <stop
                      offset='50%'
                      stopColor='currentColor'
                      stopOpacity='0.2'
                    />
                  </linearGradient>
                </defs>
                <path
                  fill={`url(#half-${index})`}
                  d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z'
                />
              </svg>
            );
          } else {
            // Empty star
            return (
              <svg
                key={index}
                className={`${sizes[size]} text-gray-300 fill-current`}
                viewBox='0 0 20 20'
              >
                <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
              </svg>
            );
          }
        })}
      </div>
      {showNumber && (
        <span className={`${textSizes[size]} font-medium text-gray-700`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;
