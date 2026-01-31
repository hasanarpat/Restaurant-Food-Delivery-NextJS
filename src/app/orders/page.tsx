'use client';
import React, { useState } from 'react';
import Container from '@/components/ui/Container';
import PageHeader from '@/components/ui/PageHeader';
import OrderTracker from '@/components/OrderTracker';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';

const OrdersPage = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [showTracker, setShowTracker] = useState(false);

  // Mock order history data
  const orderHistory = [
    {
      id: '12740174201401',
      date: '2024-01-19',
      time: '14:30',
      total: 89.9,
      items: 'Big Burger Menu (2), Veggie Pizza (2), Coca Cola 1L (2)',
      status: 'on-the-way',
      statusText: 'On the way',
      currentStep: 2,
    },
    {
      id: '12740174201402',
      date: '2024-01-15',
      time: '19:45',
      total: 45.5,
      items: 'Margherita Pizza, Caesar Salad',
      status: 'delivered',
      statusText: 'Delivered',
      currentStep: 3,
    },
    {
      id: '12740174201403',
      date: '2024-01-10',
      time: '12:15',
      total: 67.8,
      items: 'Pepperoni Pizza (2), Garlic Bread, Sprite',
      status: 'delivered',
      statusText: 'Delivered',
      currentStep: 3,
    },
  ];

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber) {
      setShowTracker(true);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      'on-the-way': 'bg-secondary-100 text-secondary-700',
      preparing: 'bg-accent-100 text-accent-700',
      delivered: 'bg-primary-100 text-primary-700',
      placed: 'bg-gray-100 text-gray-700',
    };

    return styles[status as keyof typeof styles] || styles.placed;
  };

  return (
    <div className='min-h-screen'>
      <PageHeader title='Track Your Order' />

      <Container>
        {/* Track Order Section */}
        <section className='py-16'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className='max-w-2xl mx-auto'
          >
            <form onSubmit={handleTrackOrder} className='mb-12'>
              <div className='flex gap-4'>
                <input
                  type='text'
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder='Enter order number (e.g., 12740174201401)'
                  className='flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors font-body'
                />
                <Button type='submit' variant='primary' size='lg'>
                  Track Order
                </Button>
              </div>
            </form>

            {/* Order Tracker Display */}
            {showTracker && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <OrderTracker currentStep={2} estimatedTime='15 min' />
              </motion.div>
            )}
          </motion.div>
        </section>

        {/* Order History */}
        <section className='py-16'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='mb-8'
          >
            <h2 className='font-heading text-3xl md:text-4xl font-bold text-gradient mb-2'>
              Order History
            </h2>
            <p className='font-body text-gray-600'>
              View your past orders and reorder your favorites
            </p>
          </motion.div>

          <div className='grid grid-cols-1 gap-6'>
            {orderHistory.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className='bg-white rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all'
              >
                <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-6'>
                  {/* Order Info */}
                  <div className='flex-1'>
                    <div className='flex items-start gap-4 mb-4'>
                      {/* Order Icon */}
                      <div className='flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center text-white shadow-lg'>
                        <svg
                          className='w-8 h-8'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                          />
                        </svg>
                      </div>

                      <div className='flex-1'>
                        <div className='flex items-center gap-3 mb-2'>
                          <h3 className='font-heading text-xl font-bold text-gray-900'>
                            Order #{order.id}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                              order.status,
                            )}`}
                          >
                            {order.statusText}
                          </span>
                        </div>
                        <p className='font-ui text-sm text-gray-500 mb-2'>
                          {order.date} at {order.time}
                        </p>
                        <p className='font-body text-gray-700'>{order.items}</p>
                      </div>
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className='flex items-center gap-4 lg:flex-col lg:items-end'>
                    <div className='font-heading text-2xl font-bold text-gray-900'>
                      ${order.total.toFixed(2)}
                    </div>
                    <div className='flex gap-2'>
                      {order.status === 'on-the-way' && (
                        <Button
                          variant='primary'
                          size='sm'
                          onClick={() => {
                            setTrackingNumber(order.id);
                            setShowTracker(true);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        >
                          Track
                        </Button>
                      )}
                      <Button variant='secondary' size='sm'>
                        Reorder
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Empty State (when no orders) - Optional */}
        {orderHistory.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className='text-center py-16'
          >
            <div className='text-8xl mb-6'>📦</div>
            <h3 className='font-heading text-2xl font-bold text-gray-900 mb-2'>
              No Orders Yet
            </h3>
            <p className='font-body text-gray-600 mb-6'>
              Start ordering delicious food to see your order history here!
            </p>
            <Button variant='primary' size='lg'>
              Browse Menu
            </Button>
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default OrdersPage;
