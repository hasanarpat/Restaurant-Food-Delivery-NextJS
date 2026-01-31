'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import Container from '@/components/ui/Container';
import PageHeader from '@/components/ui/PageHeader';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';

// Temporary cart data
const initialCartItems = [
  {
    id: 1,
    name: 'Sicilian Pizza',
    size: 'Large',
    price: 24.9,
    quantity: 2,
    image: '/temporary/p1.png',
  },
  {
    id: 2,
    name: 'Bella Napoli',
    size: 'Medium',
    price: 19.9,
    quantity: 1,
    image: '/temporary/p2.png',
  },
  {
    id: 3,
    name: 'Spicy Arrabbiata',
    size: 'Large',
    price: 26.9,
    quantity: 1,
    image: '/temporary/p3.png',
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const serviceCost = 0;
  const deliveryCost = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + serviceCost + deliveryCost;

  return (
    <div className='min-h-screen bg-gradient-to-br from-cream via-white to-primary-50 py-16 md:py-24'>
      <Container>
        <PageHeader
          title='Shopping Cart'
          description={`${cartItems.length} ${cartItems.length === 1 ? 'item' : 'items'} in your cart`}
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Cart', href: '/cart' },
          ]}
        />

        {cartItems.length === 0 ? (
          <div className='text-center py-16'>
            <p className='text-2xl font-heading font-semibold text-gray-400 mb-4'>
              Your cart is empty
            </p>
            <Button variant='primary' size='lg'>
              Browse Menu
            </Button>
          </div>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Cart Items */}
            <div className='lg:col-span-2 space-y-4'>
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className='flex items-center gap-4 bg-white p-4 rounded-2xl shadow-soft hover:shadow-soft-lg transition-shadow'
                >
                  {/* Product Image */}
                  <div className='relative w-24 h-24 flex-shrink-0 bg-cream rounded-xl overflow-hidden'>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className='object-cover hover:scale-110 transition-transform duration-300'
                    />
                  </div>

                  {/* Product Info */}
                  <div className='flex-1'>
                    <h3 className='font-heading text-lg font-bold text-gray-900'>
                      {item.name}
                    </h3>
                    <p className='font-ui text-sm text-gray-600'>{item.size}</p>
                    <p className='font-heading text-lg font-bold text-primary-600 mt-1'>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className='flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-2'>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className='w-6 h-6 flex items-center justify-center hover:bg-gray-200 rounded transition-colors font-bold'
                    >
                      −
                    </button>
                    <span className='font-heading font-bold text-gray-900 min-w-[1.5rem] text-center'>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className='w-6 h-6 flex items-center justify-center hover:bg-gray-200 rounded transition-colors font-bold'
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className='w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors'
                    aria-label='Remove item'
                  >
                    <svg
                      className='w-5 h-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className='lg:col-span-1'
            >
              <div className='bg-white p-6 rounded-2xl shadow-soft sticky top-24'>
                <h2 className='font-heading text-2xl font-bold text-gray-900 mb-6'>
                  Order Summary
                </h2>

                <div className='space-y-4 font-body'>
                  <div className='flex justify-between text-gray-700'>
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className='font-semibold'>
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className='flex justify-between text-gray-700'>
                    <span>Service Cost</span>
                    <span className='font-semibold'>
                      ${serviceCost.toFixed(2)}
                    </span>
                  </div>
                  <div className='flex justify-between text-gray-700'>
                    <span>Delivery Cost</span>
                    {deliveryCost === 0 ? (
                      <span className='font-semibold text-green-500'>
                        FREE!
                      </span>
                    ) : (
                      <span className='font-semibold'>
                        ${deliveryCost.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className='border-t border-gray-200 pt-4 mt-4'>
                    <div className='flex justify-between items-center'>
                      <span className='font-heading text-lg font-bold text-gray-900'>
                        TOTAL (INCL. VAT)
                      </span>
                      <span className='font-heading text-2xl font-bold text-gradient'>
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button variant='primary' size='lg' className='w-full mt-6'>
                  Proceed to Checkout 🛒
                </Button>

                {subtotal < 50 && (
                  <p className='text-xs text-center text-gray-500 mt-3'>
                    Add ${(50 - subtotal).toFixed(2)} more for free delivery!
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CartPage;
