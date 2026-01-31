'use client';
import React from 'react';
import Countdown from 'react-countdown';

const CountDown = () => {
  // Always start from 3 days, 16 hours, 7 minutes from now
  const endingDate = new Date(
    new Date().getTime() +
      3 * 24 * 60 * 60 * 1000 + // 3 days
      16 * 60 * 60 * 1000 + // 16 hours
      7 * 60 * 1000, // 7 minutes
  );

  const renderer = ({ days, hours, minutes, seconds }: any) => {
    return (
      <div className='flex gap-3 sm:gap-4'>
        <TimeCard value={days} label='Days' />
        <TimeCard value={hours} label='Hours' />
        <TimeCard value={minutes} label='Mins' />
        <TimeCard value={seconds} label='Secs' />
      </div>
    );
  };

  return <Countdown date={endingDate} renderer={renderer} />;
};

const TimeCard = ({ value, label }: { value: number; label: string }) => {
  return (
    <div className='flex flex-col items-center gap-1'>
      <div className='relative'>
        <div className='absolute inset-0 bg-gradient-button blur-md opacity-50' />
        <div className='relative bg-white rounded-lg shadow-lg p-3 sm:p-4 min-w-[60px] sm:min-w-[80px]'>
          <span className='text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-gradient'>
            {value.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className='text-xs sm:text-sm font-ui font-semibold text-gray-600 uppercase tracking-wide'>
        {label}
      </span>
    </div>
  );
};

export default CountDown;
