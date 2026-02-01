'use client';
import React, { useState, useEffect } from 'react';
import Button from './ui/Button';
import { useCart } from '@/context/CartContext';

type Props = {
  id: string | number;
  title: string;
  price: number;
  image?: string;
  options?: { title: string; additionalPrice: number }[];
  excludableIngredients?: string[];
};

const Price = ({
  id,
  title,
  price,
  image,
  options,
  excludableIngredients = [],
}: Props) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const [selected, setSelected] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [excluded, setExcluded] = useState<string[]>([]);

  const selectedOption = options?.[selected];
  const currentSize = selectedOption?.title || 'Regular';

  const areIngredientsEqual = (a: string[], b: string[]) => {
    if (a.length !== b.length) return false;
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    return sortedA.every((val, index) => val === sortedB[index]);
  };

  // Find if item is already in cart
  const cartItem = cart.find(
    (item) =>
      item.id === id &&
      item.size === currentSize &&
      areIngredientsEqual(item.excludedIngredients || [], excluded),
  );

  // Sync quantity with cart on mount or when selection/exclusions change
  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [cartItem, selected, excluded]);

  const handleAddToCart = () => {
    const finalPrice = price + (selectedOption?.additionalPrice || 0);

    if (cartItem) {
      // Update existing item
      updateQuantity(id, quantity, currentSize, excluded);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } else {
      // Add new item
      addToCart({
        id,
        title,
        price: finalPrice,
        size: currentSize,
        image: image || '/temporary/p1.png',
        quantity: quantity,
        excludedIngredients: excluded.length > 0 ? excluded : undefined,
      });
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  const toggleIngredient = (ing: string) => {
    setExcluded((prev) =>
      prev.includes(ing) ? prev.filter((i) => i !== ing) : [...prev, ing],
    );
  };

  return (
    <div className='flex flex-col gap-6'>
      {/* Price */}
      <h2 className='font-heading text-3xl font-bold text-gradient'>
        ${(price + (options?.[selected]?.additionalPrice || 0)).toFixed(2)}
      </h2>

      {/* Size Options */}
      {options && options.length > 0 && (
        <div>
          <h3 className='font-heading text-sm font-semibold text-gray-700 mb-3'>
            Choose Size
          </h3>
          <div className='flex gap-3'>
            {options.map((option, index) => (
              <button
                key={option.title}
                onClick={() => setSelected(index)}
                className={`px-6 py-3 rounded-lg font-ui text-sm font-semibold transition-all ${
                  selected === index
                    ? 'bg-gradient-button text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.title}
                {option.additionalPrice > 0 && (
                  <span className='ml-1 text-xs'>
                    +${option.additionalPrice}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Ingredients Exclusion */}
      {excludableIngredients && excludableIngredients.length > 0 && (
        <div>
          <h3 className='font-heading text-sm font-semibold text-gray-700 mb-3'>
            Remove Ingredients
          </h3>
          <div className='flex flex-wrap gap-2'>
            {excludableIngredients.map((ing) => {
              const isExcluded = excluded.includes(ing);
              return (
                <button
                  key={ing}
                  onClick={() => toggleIngredient(ing)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                    isExcluded
                      ? 'bg-red-50 border-red-200 text-red-600 line-through ring-1 ring-red-200'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-primary-500'
                  }`}
                >
                  {ing}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div>
        <h3 className='font-heading text-sm font-semibold text-gray-700 mb-3'>
          Quantity
        </h3>
        <div className='flex items-center gap-4 bg-gray-100 rounded-lg px-4 py-2 w-fit'>
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className='w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded transition-colors font-bold text-lg'
          >
            −
          </button>
          <span className='font-heading font-bold text-lg text-gray-900 min-w-[2rem] text-center'>
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className='w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded transition-colors font-bold text-lg'
          >
            +
          </button>
        </div>
      </div>

      {/* Add/Update Button */}
      <Button
        variant='primary'
        size='lg'
        onClick={handleAddToCart}
        className='w-full md:w-auto min-w-[200px]'
      >
        {isAdded ? (
          <>
            <svg
              className='w-5 h-5 mr-2 inline'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                clipRule='evenodd'
              />
            </svg>
            {cartItem ? 'Updated!' : 'Added to Cart!'}
          </>
        ) : cartItem ? (
          <>Update Cart (Total: {quantity}) 🛒</> // Clear indicator it's updating
        ) : (
          <>Add to Cart 🛒</>
        )}
      </Button>

      {/* Helper text if items exist */}
      {cartItem && !isAdded && (
        <p className='font-ui text-xs text-primary-600 font-medium'>
          You have {cartItem.quantity} of this item in your cart.
        </p>
      )}
    </div>
  );
};
export default Price;
