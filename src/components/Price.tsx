'use client';
import React, { useEffect, useState } from 'react';
import Button from './ui/Button';

type Props = {
  price: number;
  id: number;
  options?: { title: string; additionalPrice: number }[];
};

const Price = ({ price, id, options }: Props) => {
  const [total, setTotal] = useState(price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setTotal(
      quantity * (options ? price + options[selected].additionalPrice : price),
    );
  }, [quantity, selected, options, price]);

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-baseline gap-3'>
        <h2 className='text-4xl font-heading font-bold text-gradient'>
          ${total.toFixed(2)}
        </h2>
        {options && options[selected].additionalPrice > 0 && (
          <span className='font-ui text-sm text-gray-500'>
            (+${options[selected].additionalPrice.toFixed(2)})
          </span>
        )}
      </div>

      {/* Size Options */}
      {options && (
        <div className='flex flex-col gap-3'>
          <label className='font-ui text-sm font-semibold text-gray-700'>
            Choose Size:
          </label>
          <div className='flex gap-3 flex-wrap'>
            {options.map((option, index) => (
              <button
                key={option.title}
                className={`px-6 py-3 rounded-lg font-ui font-semibold transition-all duration-300 ${
                  selected === index
                    ? 'bg-gradient-button text-white shadow-md'
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-primary-400'
                }`}
                onClick={() => setSelected(index)}
              >
                {option.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity and Add to Cart */}
      <div className='flex flex-col sm:flex-row items-stretch gap-4'>
        {/* Quantity Selector */}
        <div className='flex items-center justify-between sm:justify-start gap-4 bg-white border-2 border-gray-200 rounded-lg px-6 py-3'>
          <span className='font-ui font-semibold text-gray-700'>Quantity:</span>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}
              className='w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-primary-100 rounded-md transition-colors font-bold text-gray-700'
            >
              −
            </button>
            <span className='font-heading font-bold text-xl text-gray-900 min-w-[2rem] text-center select-none'>
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((prev) => (prev === 9 ? 9 : prev + 1))}
              className='w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-primary-100 rounded-md transition-colors font-bold text-gray-700'
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button variant='primary' size='lg' className='flex-1'>
          Add to Cart 🛒
        </Button>
      </div>
    </div>
  );
};

export default Price;
