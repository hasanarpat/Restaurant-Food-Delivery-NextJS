'use client';
import React, { useEffect } from 'react';
import Container from '@/components/ui/Container';
import PageHeader from '@/components/ui/PageHeader';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import CreditCardPreview from '@/components/CreditCardPreview';
import { useNotification } from '@/components/Notifications';
import { useAuth } from '@/contexts/AuthContext';
import apiClient from '@/lib/axios';

const CheckoutPage = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { success, error } = useNotification();
  const [formData, setFormData] = React.useState({
    // Address
    fullName: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    // Payment
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login?from=/checkout');
    }
    if (user) {
      // Pre-fill if profile exists
      setFormData((prev) => ({
        ...prev,
        fullName: user.profile.fullName || '',
        phone: user.phone || '',
      }));
    }
  }, [user, isLoading, router]);

  const serviceCost = 0;
  const deliveryCost = totalPrice > 50 ? 0 : 4.99;
  const total = totalPrice + serviceCost + deliveryCost;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    // Auto-format card number (XXXX XXXX XXXX XXXX)
    if (name === 'cardNumber') {
      const cleaned = value.replace(/\s/g, '');
      const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
      setFormData((prev) => ({ ...prev, [name]: formatted }));
      return;
    }

    // Auto-format expiry date (MM/YY)
    if (name === 'expiryDate') {
      let formatted = value.replace(/\D/g, '');
      if (formatted.length >= 2) {
        formatted = formatted.slice(0, 2) + '/' + formatted.slice(2, 4);
      }
      setFormData((prev) => ({ ...prev, [name]: formatted }));
      return;
    }

    // Only allow numbers for CVV
    if (name === 'cvv') {
      const cleaned = value.replace(/\D/g, '');
      setFormData((prev) => ({ ...prev, [name]: cleaned }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    // Card number validation (must be 16 digits)
    const cardNumberClean = formData.cardNumber.replace(/\s/g, '');
    if (cardNumberClean.length !== 16 || !/^\d+$/.test(cardNumberClean)) {
      error('Please enter a valid 16-digit card number');
      return false;
    }

    // Expiry date validation (MM/YY format and not expired)
    const expiryParts = formData.expiryDate.split('/');
    if (expiryParts.length !== 2) {
      error('Please enter expiry date in MM/YY format');
      return false;
    }
    const month = parseInt(expiryParts[0]);
    const year = parseInt('20' + expiryParts[1]);
    if (month < 1 || month > 12) {
      error('Please enter a valid month (01-12)');
      return false;
    }
    const now = new Date();
    const expiry = new Date(year, month - 1);
    if (expiry < now) {
      error('Card has expired');
      return false;
    }

    // CVV validation (3 digits)
    if (formData.cvv.length !== 3 || !/^\d{3}$/.test(formData.cvv)) {
      error('Please enter a valid 3-digit CVV');
      return false;
    }

    // Phone validation
    if (formData.phone.length < 10) {
      error('Please enter a valid phone number');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare Payload
      const items = cart.map((item) => ({
        productId: item.id.toString(),
        quantity: item.quantity,
        // If size exists, we treat it as an option. Ideally we should know its price diff.
        // For now, assume 0 or handle logic.
        // Zod schema: selectedOptions: { title: string, additionalPrice: number }[]
        selectedOptions: item.size
          ? [{ title: item.size, additionalPrice: 0 }]
          : [],
      }));

      const customerNote = `Address: ${formData.address}, ${formData.city}, ${formData.zipCode}. Contact: ${formData.fullName} (${formData.phone})`;

      await apiClient.post('/orders', {
        items,
        customerNote,
      });

      // Show success notification
      success('Order placed successfully! 🎉 Your food is on the way!', 3000);

      // Clear cart and redirect after a short delay
      setTimeout(() => {
        clearCart();
        router.push('/orders'); // Redirect to orders page
      }, 1500);
    } catch (err: any) {
      error(err.message || 'Failed to place order');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        Loading...
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-cream via-white to-primary-50 py-16 md:py-24'>
        <Container>
          <div className='text-center py-16'>
            <h1 className='font-heading text-3xl font-bold text-gray-900 mb-4'>
              Your cart is empty
            </h1>
            <p className='font-body text-gray-600 mb-8'>
              Add some items to your cart before checking out.
            </p>
            <Button
              variant='primary'
              size='lg'
              onClick={() => router.push('/menu')}
            >
              Browse Menu
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-cream via-white to-primary-50 py-16 md:py-24'>
      <Container>
        <PageHeader
          title='Checkout'
          description='Complete your order'
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Cart', href: '/cart' },
            { label: 'Checkout', href: '/checkout' },
          ]}
        />

        <form
          onSubmit={handleSubmit}
          className='grid grid-cols-1 lg:grid-cols-3 gap-8'
        >
          {/* Forms Section */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Delivery Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-white p-6 rounded-2xl shadow-soft'
            >
              <h2 className='font-heading text-2xl font-bold text-gray-900 mb-6'>
                Delivery Address
              </h2>

              {/* Saved Addresses Selection */}
              {user?.addresses && user.addresses.length > 0 && (
                <div className='mb-6 grid gap-3'>
                  <p className='font-ui text-sm font-semibold text-gray-700'>
                    Select a Saved Address:
                  </p>
                  {user.addresses.map((addr: any) => (
                    <label
                      key={addr._id}
                      className='flex items-start gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors'
                    >
                      <input
                        type='radio'
                        name='selectedAddress'
                        className='mt-1'
                        onChange={() => {
                          setFormData((prev) => ({
                            ...prev,
                            address: addr.line1,
                            city: addr.city,
                            zipCode: addr.zip,
                          }));
                        }}
                      />
                      <div>
                        <span className='font-bold text-gray-900 block'>
                          {addr.title}
                        </span>
                        <span className='text-sm text-gray-600 block'>
                          {addr.line1}, {addr.city} {addr.zip}
                        </span>
                      </div>
                    </label>
                  ))}
                  <div className='border-t my-2'></div>
                  <p className='font-ui text-xs text-gray-500 italic'>
                    Or fill in manually below:
                  </p>
                </div>
              )}

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='md:col-span-2'>
                  <label className='font-ui text-sm font-semibold text-gray-700 mb-2 block'>
                    Full Name
                  </label>
                  <input
                    type='text'
                    name='fullName'
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary-500 transition-colors font-body'
                    placeholder='John Doe'
                  />
                </div>
                <div className='md:col-span-2'>
                  <label className='font-ui text-sm font-semibold text-gray-700 mb-2 block'>
                    Phone Number
                  </label>
                  <input
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary-500 transition-colors font-body'
                    placeholder='+1 (555) 123-4567'
                  />
                </div>
                <div className='md:col-span-2'>
                  <label className='font-ui text-sm font-semibold text-gray-700 mb-2 block'>
                    Delivery Address
                  </label>
                  <textarea
                    name='address'
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary-500 transition-colors font-body resize-none'
                    placeholder='123 Main Street, Apt 4B'
                  />
                </div>
                <div>
                  <label className='font-ui text-sm font-semibold text-gray-700 mb-2 block'>
                    City
                  </label>
                  <input
                    type='text'
                    name='city'
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary-500 transition-colors font-body'
                    placeholder='New York'
                  />
                </div>
                <div>
                  <label className='font-ui text-sm font-semibold text-gray-700 mb-2 block'>
                    ZIP Code
                  </label>
                  <input
                    type='text'
                    name='zipCode'
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary-500 transition-colors font-body'
                    placeholder='10001'
                  />
                </div>
              </div>
            </motion.div>

            {/* Payment Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className='bg-white p-6 rounded-2xl shadow-soft'
            >
              <h2 className='font-heading text-2xl font-bold text-gray-900 mb-6'>
                Payment Information
              </h2>

              {/* Grid layout: Card preview on left, form on right (md+) */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Credit Card Preview */}
                <div className='flex items-start'>
                  <CreditCardPreview
                    cardNumber={formData.cardNumber}
                    cardName={formData.cardName}
                    expiryDate={formData.expiryDate}
                    cvv={formData.cvv}
                  />
                </div>

                {/* Form Fields */}
                <div className='space-y-4'>
                  <div>
                    <label className='font-ui text-sm font-semibold text-gray-700 mb-2 block'>
                      Card Number
                    </label>
                    <input
                      type='text'
                      name='cardNumber'
                      value={formData.cardNumber}
                      onChange={handleChange}
                      required
                      maxLength={19}
                      className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary-500 transition-colors font-body'
                      placeholder='1234 5678 9012 3456'
                    />
                  </div>
                  <div>
                    <label className='font-ui text-sm font-semibold text-gray-700 mb-2 block'>
                      Cardholder Name
                    </label>
                    <input
                      type='text'
                      name='cardName'
                      value={formData.cardName}
                      onChange={handleChange}
                      required
                      className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary-500 transition-colors font-body'
                      placeholder='JOHN DOE'
                    />
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='font-ui text-sm font-semibold text-gray-700 mb-2 block'>
                        Expiry Date
                      </label>
                      <input
                        type='text'
                        name='expiryDate'
                        value={formData.expiryDate}
                        onChange={handleChange}
                        required
                        maxLength={5}
                        className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary-500 transition-colors font-body'
                        placeholder='MM/YY'
                      />
                    </div>
                    <div>
                      <label className='font-ui text-sm font-semibold text-gray-700 mb-2 block'>
                        CVV
                      </label>
                      <input
                        type='text'
                        name='cvv'
                        value={formData.cvv}
                        onChange={handleChange}
                        required
                        maxLength={3}
                        className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary-500 transition-colors font-body'
                        placeholder='123'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='lg:col-span-1'
          >
            <div className='bg-white p-6 rounded-2xl shadow-soft sticky top-24'>
              <h2 className='font-heading text-2xl font-bold text-gray-900 mb-6'>
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className='space-y-3 mb-6 max-h-64 overflow-y-auto'>
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className='flex justify-between text-sm'
                  >
                    <span className='font-body text-gray-700'>
                      {item.quantity}x {item.title} ({item.size})
                    </span>
                    <span className='font-semibold text-gray-900'>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className='border-t border-gray-200 pt-4 space-y-3 font-body'>
                <div className='flex justify-between text-gray-700'>
                  <span>Subtotal</span>
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
                  <span>Delivery</span>
                  {deliveryCost === 0 ? (
                    <span className='font-semibold text-green-500'>FREE!</span>
                  ) : (
                    <span className='font-semibold'>
                      ${deliveryCost.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className='border-t border-gray-200 pt-3 mt-3'>
                  <div className='flex justify-between items-center'>
                    <span className='font-heading text-lg font-bold text-gray-900'>
                      Total
                    </span>
                    <span className='font-heading text-2xl font-bold text-gradient'>
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                type='submit'
                variant='primary'
                size='lg'
                disabled={isSubmitting}
                className='w-full mt-6 disabled:opacity-70 disabled:cursor-not-allowed'
              >
                {isSubmitting ? 'Placing Order...' : 'Place Order 🎉'}
              </Button>

              <p className='text-xs text-center text-gray-500 mt-4'>
                By placing your order, you agree to our terms and conditions.
              </p>
            </div>
          </motion.div>
        </form>
      </Container>
    </div>
  );
};

export default CheckoutPage;
