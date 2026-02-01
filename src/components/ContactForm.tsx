'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNotification } from './Notifications';
import Button from './ui/Button';
import apiClient from '@/lib/axios';

const ContactForm = () => {
  const { success, error } = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      error('Please fill in all required fields');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    setIsLoading(true);
    try {
      await apiClient.post('/contact', formData);
      success("Message sent successfully! We'll get back to you soon. 📧");
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      error(err.message || 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className='space-y-6'
    >
      {/* Name */}
      <div className='relative'>
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
          className='peer w-full px-4 pt-6 pb-2 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors font-body'
          placeholder=' '
        />
        <label className='absolute left-4 top-4 text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-600 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs font-ui'>
          Full Name *
        </label>
      </div>

      {/* Email */}
      <div className='relative'>
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
          className='peer w-full px-4 pt-6 pb-2 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors font-body'
          placeholder=' '
        />
        <label className='absolute left-4 top-4 text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-600 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs font-ui'>
          Email Address *
        </label>
      </div>

      {/* Subject */}
      <div className='relative'>
        <input
          type='text'
          name='subject'
          value={formData.subject}
          onChange={handleChange}
          className='peer w-full px-4 pt-6 pb-2 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors font-body'
          placeholder=' '
        />
        <label className='absolute left-4 top-4 text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-600 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs font-ui'>
          Subject
        </label>
      </div>

      {/* Message */}
      <div className='relative'>
        <textarea
          name='message'
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className='peer w-full px-4 pt-6 pb-2 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors font-body resize-none'
          placeholder=' '
        />
        <label className='absolute left-4 top-4 text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-600 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs font-ui'>
          Your Message *
        </label>
      </div>

      {/* Submit Button */}
      <motion.button
        type='submit'
        disabled={isLoading}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        className='w-full bg-gradient-button hover:bg-gradient-button-hover text-white font-heading font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden'
      >
        {isLoading ? (
          <span className='flex items-center justify-center gap-2'>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className='w-5 h-5 border-2 border-white border-t-transparent rounded-full'
            />
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </motion.button>
    </motion.form>
  );
};

export default ContactForm;
