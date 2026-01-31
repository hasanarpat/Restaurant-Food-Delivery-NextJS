'use client';
import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatsCounterProps {
  end: number;
  duration?: number;
  label: string;
  suffix?: string;
  prefix?: string;
  icon?: React.ReactNode;
}

const StatsCounter: React.FC<StatsCounterProps> = ({
  end,
  duration = 2,
  label,
  suffix = '',
  prefix = '',
  icon,
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
      className='text-center group'
    >
      {icon && (
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className='text-5xl mb-4'
        >
          {icon}
        </motion.div>
      )}
      <motion.div
        className='font-heading text-5xl md:text-6xl font-bold text-gradient mb-2'
        animate={isInView ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5, delay: duration }}
      >
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </motion.div>
      <div className='font-ui text-gray-600 text-lg'>{label}</div>
    </motion.div>
  );
};

export default StatsCounter;
