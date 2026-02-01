'use client';
import React, { useState } from 'react';
import Container from '@/components/ui/Container';

import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/axios';
import { useNotification } from '@/components/Notifications';
import Image from 'next/image';

const ProfileClient = () => {
  const { user, refetch } = useAuth();
  const { success, error } = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Local state for editing
  const [fullName, setFullName] = useState(user?.profile?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [isEditing, setIsEditing] = useState(false);

  React.useEffect(() => {
    if (user) {
      setFullName(user.profile.fullName);
      setPhone(user.phone || '');
    }
  }, [user]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await apiClient.put('/auth/me', {
        fullName,
        phone,
      });
      await refetch(); // Update global state
      success('Profile updated successfully! ✨');
      setIsEditing(false);
    } catch (err: any) {
      error(err.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-cream pt-28 md:pt-36'>
      <Container className='py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto'>
          {/* Sidebar / Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className='bg-white p-6 rounded-2xl shadow-soft h-fit text-center'
          >
            <div className='w-32 h-32 mx-auto bg-primary-100 rounded-full flex items-center justify-center text-primary-500 font-heading text-4xl font-bold mb-4 overflow-hidden relative'>
              {user?.profile.avatar ? (
                <Image
                  src={user.profile.avatar}
                  alt={user.profile.fullName}
                  fill
                  className='object-cover'
                />
              ) : (
                user?.profile.fullName.charAt(0).toUpperCase()
              )}
            </div>
            <h2 className='font-heading text-xl font-bold text-gray-900'>
              {user?.profile.fullName}
            </h2>
            <p className='font-ui text-sm text-gray-500'>{user?.email}</p>
            <p className='mt-2 inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold'>
              {user?.role}
            </p>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='md:col-span-2 space-y-6'
          >
            {/* Personal Information */}
            <div className='bg-white p-8 rounded-2xl shadow-soft'>
              <div className='flex items-center justify-between mb-6'>
                <h3 className='font-heading text-2xl font-bold text-gray-900'>
                  Personal Information
                </h3>
                <Button
                  variant='secondary'
                  size='sm'
                  onClick={() => {
                    if (isEditing)
                      handleSave(); // Save if currently editing
                    else setIsEditing(true); // Enable edit mode
                  }}
                  disabled={isLoading}
                >
                  {isLoading
                    ? 'Saving...'
                    : isEditing
                      ? 'Save Changes'
                      : 'Edit Profile'}
                </Button>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='font-ui text-sm font-semibold text-gray-500 mb-1 block'>
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type='text'
                      className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-500'
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  ) : (
                    <p className='font-body text-gray-900 text-lg'>
                      {user?.profile.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className='font-ui text-sm font-semibold text-gray-500 mb-1 block'>
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type='tel'
                      className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-500'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder='+1 (555) 000-0000'
                    />
                  ) : (
                    <p className='font-body text-gray-900 text-lg'>
                      {user?.phone || 'Not set'}
                    </p>
                  )}
                </div>

                <div>
                  <label className='font-ui text-sm font-semibold text-gray-500 mb-1 block'>
                    Email Address
                  </label>
                  <p className='font-body text-gray-900 text-lg opacity-75'>
                    {user?.email}
                  </p>
                  <span className='text-xs text-gray-400'>
                    Email cannot be changed
                  </span>
                </div>
              </div>

              {isEditing && (
                <div className='mt-6 flex justify-end'>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFullName(user?.profile.fullName || '');
                      setPhone(user?.phone || '');
                    }}
                    className='text-gray-500 hover:text-gray-700 font-medium px-4 py-2'
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Address Management */}
            <div className='bg-white p-8 rounded-2xl shadow-soft mt-6'>
              <div className='flex items-center justify-between mb-6'>
                <h3 className='font-heading text-2xl font-bold text-gray-900'>
                  Saved Addresses
                </h3>
              </div>

              {/* Address List */}
              <div className='space-y-4 mb-8'>
                {user?.addresses && user.addresses.length > 0 ? (
                  user.addresses.map((address: any) => (
                    <div
                      key={address._id}
                      className='flex items-start justify-between p-4 border rounded-xl hover:border-primary-200 transition-colors'
                    >
                      <div>
                        <h4 className='font-bold text-gray-900'>
                          {address.title}
                        </h4>
                        <p className='text-gray-600 text-sm'>{address.line1}</p>
                        <p className='text-gray-500 text-xs'>
                          {address.city}, {address.zip}
                        </p>
                      </div>
                      <button
                        onClick={async () => {
                          if (
                            !confirm(
                              'Are you sure you want to delete this address?',
                            )
                          )
                            return;
                          try {
                            await apiClient.delete(
                              `/users/address/${address._id}`,
                            );
                            await refetch();
                            success('Address deleted successfully');
                          } catch (e: any) {
                            error(e.message || 'Failed to delete');
                          }
                        }}
                        className='text-red-500 hover:text-red-700 text-sm font-medium'
                      >
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <p className='text-gray-500 italic'>
                    No addresses saved yet.
                  </p>
                )}
              </div>

              {/* Add Address Form */}
              <div className='border-t pt-6'>
                <h4 className='font-heading text-lg font-semibold mb-4'>
                  Add New Address
                </h4>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const data = {
                      title: formData.get('title'),
                      line1: formData.get('line1'),
                      city: formData.get('city'),
                      zip: formData.get('zip'),
                    };

                    // Optimistic check
                    if (user?.addresses && user.addresses.length >= 10) {
                      error(
                        'Limit reached. Please delete one of your unused addresses.',
                      );
                      return;
                    }

                    try {
                      await apiClient.post('/users/address', data);
                      await refetch();
                      success('Address added successfully');
                      (e.target as HTMLFormElement).reset();
                    } catch (e: any) {
                      error(e.message || 'Failed to add address');
                    }
                  }}
                  className='grid grid-cols-1 md:grid-cols-2 gap-4'
                >
                  <input
                    name='title'
                    required
                    placeholder='Address Title (e.g. Home)'
                    className='px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary-500'
                  />
                  <input
                    name='city'
                    required
                    placeholder='City'
                    className='px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary-500'
                  />
                  <input
                    name='line1'
                    required
                    placeholder='Full Address'
                    className='hidden md:block col-span-2 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary-500'
                  />
                  {/* Mobile duplicated input for layout simplicity or conditional rendering, but simply: */}
                  <input
                    name='line1'
                    required
                    placeholder='Full Address'
                    className='md:hidden px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary-500'
                  />

                  <input
                    name='zip'
                    required
                    placeholder='ZIP Code'
                    className='px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary-500'
                  />
                  <div className='flex items-center'>
                    <Button type='submit' variant='primary' size='md'>
                      Add Address
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Recent Activity / Stats (Placeholder) */}
            <div className='bg-primary-500 p-8 rounded-2xl shadow-soft text-white flex justify-between items-center'>
              <div>
                <h3 className='font-heading text-xl font-bold mb-1'>
                  Join the Club!
                </h3>
                <p className='text-white/90 text-sm'>
                  Get exclusive offers and earn points with every order.
                </p>
              </div>
              <Button
                variant='primary'
                className='bg-white text-primary-600 hover:bg-gray-100 border-none'
              >
                Coming Soon
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default ProfileClient;
