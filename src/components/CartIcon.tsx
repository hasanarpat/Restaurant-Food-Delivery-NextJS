import React from 'react';
import Image from 'next/image';

const CartIcon = () => {
  const itemCount = 3; // This would come from cart state

  return (
    <div className='relative p-2 hover:bg-primary-50 rounded-full transition-all duration-300 cursor-pointer group'>
      <Image
        src='/cart.png'
        alt='cart'
        width={24}
        height={24}
        className='group-hover:scale-110 transition-transform duration-300'
      />
      {itemCount > 0 && (
        <span className='absolute -top-1 -right-1 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md animate-pulse'>
          {itemCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
