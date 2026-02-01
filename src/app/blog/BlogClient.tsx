'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import PageHeader from '@/components/ui/PageHeader';
import { BLOG_POSTS } from '@/data/blog';
import {
  Calendar,
  Clock,
  User,
  Tag,
  BookOpen,
  ChefHat,
  Lightbulb,
  Newspaper,
  Heart,
} from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const CATEGORIES = [
  { id: 'all', label: 'Tümü', icon: <BookOpen size={18} /> },
  { id: 'recipes', label: 'Tarifler', icon: <ChefHat size={18} /> },
  { id: 'tips', label: 'İpuçları', icon: <Lightbulb size={18} /> },
  { id: 'news', label: 'Haberler', icon: <Newspaper size={18} /> },
  { id: 'team', label: 'Ekibimiz', icon: <Heart size={18} /> },
] as const;

const BlogClient = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPosts =
    selectedCategory === 'all'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === selectedCategory);

  return (
    <div className='min-h-screen bg-cream'>
      <PageHeader
        title='Blog'
        description='Türk mutfağından tarifler, ipuçları ve haberlerimiz'
      />

      <Container className='py-16'>
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center mb-12 max-w-3xl mx-auto'
        >
          <h2 className='font-heading text-3xl md:text-4xl font-extrabold text-gray-900 mb-6'>
            Mutfaktan Haberler 📰
          </h2>
          <p className='font-body text-lg text-gray-600 leading-relaxed'>
            Lezzetli tarifler, mutfak sırları, ekibimizden haberler ve daha
            fazlası...
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='flex flex-wrap justify-center gap-3 mb-12'
        >
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow border border-gray-200'
              }`}
            >
              {category.icon}
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          layout
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
        >
          {filteredPosts.map((post, index) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className='block h-full'
            >
              <motion.article
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className='bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group h-full flex flex-col'
              >
                {/* Image Placeholder */}
                <div className='h-48 bg-gradient-to-br from-primary-400 to-orange-500 flex items-center justify-center relative overflow-hidden'>
                  <div className='text-white text-6xl group-hover:scale-110 transition-transform duration-300'>
                    {post.category === 'recipes' && '👨‍🍳'}
                    {post.category === 'tips' && '💡'}
                    {post.category === 'news' && '📰'}
                    {post.category === 'team' && '❤️'}
                  </div>
                </div>

                <div className='p-6 flex flex-col flex-grow'>
                  {/* Meta */}
                  <div className='flex items-center gap-4 text-sm text-gray-500 mb-4'>
                    <div className='flex items-center gap-1'>
                      <Calendar size={14} />
                      {post.date}
                    </div>
                    <div className='flex items-center gap-1'>
                      <Clock size={14} />
                      {post.readTime}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className='font-heading text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors'>
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className='text-gray-600 mb-4 line-clamp-3'>
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className='mt-auto pt-4'>
                    <div className='flex items-center justify-between mb-4'>
                      <div className='flex items-center gap-2 text-sm text-gray-600'>
                        <User size={14} />
                        <span>{post.author}</span>
                      </div>
                      <span className='text-primary-600 font-semibold text-sm group-hover:underline'>
                        Devamını Oku →
                      </span>
                    </div>

                    {/* Tags */}
                    <div className='flex flex-wrap gap-2'>
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className='px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium flex items-center gap-1'
                        >
                          <Tag size={12} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-center py-20'
          >
            <p className='text-gray-500 text-lg'>
              Bu kategoride henüz yazı bulunmuyor.
            </p>
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default BlogClient;
