'use client';
import Image from 'next/image';
import React from 'react';
import Container from '@/components/ui/Container';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();
  const router = useRouter();

  const serviceCost = 0;
  const deliveryCost = totalPrice > 50 ? 0 : 4.99;
  const total = totalPrice + serviceCost + deliveryCost;

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className='bg-cream min-h-screen pt-28 md:pt-36 pb-20'>
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Cart', href: '/cart' },
          ]}
        />

        {cart.length === 0 ? (
          <div className='text-center py-16'>
            <p className='text-2xl font-heading font-semibold text-gray-400 mb-4'>
              Your cart is empty
            </p>
            <Link href='/menu'>
              <Button variant='primary' size='lg'>
                Browse Menu
              </Button>
            </Link>
          </div>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Cart Items */}
            <div className='lg:col-span-2 space-y-4'>
              {cart.map((item, index) => (
                <motion.div
                  key={`${item.id}-${item.size}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className='flex items-center gap-4 bg-white p-4 rounded-2xl shadow-soft hover:shadow-soft-lg transition-shadow'
                >
                  {/* Product Image */}
                  <div className='relative w-24 h-24 flex-shrink-0 bg-cream rounded-xl overflow-hidden'>
                    <Image
                      src={item.image || '/temporary/p1.png'}
                      alt={item.title}
                      fill
                      className='object-cover hover:scale-110 transition-transform duration-300'
                    />
                  </div>

                  {/* Product Info */}
                  <div className='flex-1'>
                    <h3 className='font-heading text-lg font-bold text-gray-900'>
                      {item.title}
                    </h3>
                    <p className='font-ui text-sm text-gray-600'>{item.size}</p>
                    <p className='font-heading text-lg font-bold text-primary-600 mt-1'>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className='flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-2'>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1, item.size)
                      }
                      className='w-6 h-6 flex items-center justify-center hover:bg-gray-200 rounded transition-colors font-bold'
                    >
                      −
                    </button>
                    <span className='font-heading font-bold text-gray-900 min-w-[1.5rem] text-center'>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1, item.size)
                      }
                      className='w-6 h-6 flex items-center justify-center hover:bg-gray-200 rounded transition-colors font-bold'
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
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
                    <span>Subtotal ({cart.length} items)</span>
                    <span className='font-semibold'>
                      ${totalPrice.toFixed(2)}
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

                <Button
                  variant='primary'
                  size='lg'
                  className='w-full mt-6'
                  onClick={handleCheckout}
                >
                  Proceed to Checkout 🛒
                </Button>

                {totalPrice < 50 && (
                  <p className='text-xs text-center text-gray-500 mt-3'>
                    Add ${(50 - totalPrice).toFixed(2)} more for free delivery!
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
