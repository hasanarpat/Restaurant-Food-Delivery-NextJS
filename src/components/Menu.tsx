'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import CartIcon from './CartIcon';

const links = [
  {
    id: 1,
    title: 'Homepage',
    url: '/',
  },
  {
    id: 2,
    title: 'Menu',
    url: '/menu',
  },
  {
    id: 3,
    title: 'Working Hours',
    url: '/',
  },
  {
    id: 4,
    title: 'Contact',
    url: '/',
  },
];

const Menu = () => {
  const [open, setOpen] = useState(false);
  const user = false;

  return (
    <div className=''>
      <button
        onClick={() => setOpen(!open)}
        className='p-2 hover:bg-primary-50 rounded-full transition-colors relative z-50'
      >
        {!open ? (
          <Image alt='open menu' src='/open.png' width={24} height={24} />
        ) : (
          <Image alt='close menu' src='/close.png' width={24} height={24} />
        )}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-300'
          onClick={() => setOpen(false)}
        />
      )}

      {/* Menu Panel */}
      <div
        className={`fixed right-0 top-0 h-screen w-72 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-smooth ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex flex-col h-full pt-24 pb-8 px-6'>
          <nav className='flex flex-col gap-4'>
            {links.map((link) => (
              <Link
                href={link.url}
                key={link.id}
                onClick={() => setOpen(false)}
                className='font-heading text-2xl font-semibold text-gray-800 hover:text-primary-600 transition-colors py-3 border-b border-gray-100'
              >
                {link.title}
              </Link>
            ))}
            {!user ? (
              <Link
                href='/login'
                onClick={() => setOpen(false)}
                className='font-heading text-2xl font-semibold text-gray-800 hover:text-primary-600 transition-colors py-3 border-b border-gray-100'
              >
                Login
              </Link>
            ) : (
              <Link
                href='/orders'
                onClick={() => setOpen(false)}
                className='font-heading text-2xl font-semibold text-gray-800 hover:text-primary-600 transition-colors py-3 border-b border-gray-100'
              >
                Orders
              </Link>
            )}
          </nav>

          <div className='mt-auto'>
            <Link
              href='/cart'
              onClick={() => setOpen(false)}
              className='flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-primary-600 transition-colors'
            >
              <CartIcon />
              <span>View Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
