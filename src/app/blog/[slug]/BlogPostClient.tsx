'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { Calendar, Clock, User, Tag, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import { BlogPost } from '@/data/blog';

interface BlogPostClientProps {
  post: BlogPost;
}

const BlogPostClient: React.FC<BlogPostClientProps> = ({ post }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    }
  };

  return (
    <div className='min-h-screen bg-cream'>
      {/* Hero Header */}
      <div className='bg-gradient-to-br from-primary-500 to-orange-500 py-20'>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='max-w-4xl mx-auto'
          >
            <Link href='/blog'>
              <Button
                variant='ghost'
                className='text-white hover:bg-white/20 mb-6'
              >
                <ArrowLeft size={20} />
                Blog'a Dön
              </Button>
            </Link>

            <h1 className='font-heading text-3xl md:text-5xl font-extrabold text-white mb-6'>
              {post.title}
            </h1>

            <div className='flex flex-wrap items-center gap-4 text-white/90 text-sm mb-6'>
              <div className='flex items-center gap-2'>
                <User size={16} />
                {post.author}
              </div>
              <div className='flex items-center gap-2'>
                <Calendar size={16} />
                {post.date}
              </div>
              <div className='flex items-center gap-2'>
                <Clock size={16} />
                {post.readTime} okuma
              </div>
            </div>

            <p className='text-xl text-white/95 leading-relaxed'>
              {post.excerpt}
            </p>
          </motion.div>
        </Container>
      </div>

      {/* Content */}
      <Container className='py-16'>
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='max-w-4xl mx-auto'
        >
          <div className='bg-white rounded-[2.5rem] p-8 md:p-12 shadow-lg mb-8'>
            <div className='prose prose-lg max-w-none'>
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h3
                      key={index}
                      className='font-heading text-2xl font-bold text-gray-900 mt-8 mb-4'
                    >
                      {paragraph.replace(/\*\*/g, '')}
                    </h3>
                  );
                }
                return (
                  <p
                    key={index}
                    className='text-gray-700 leading-relaxed mb-4 whitespace-pre-line text-lg'
                  >
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Tags & Share */}
          <div className='bg-white rounded-[2.5rem] p-8 shadow-lg'>
            <div className='flex flex-wrap items-center justify-between gap-4'>
              <div className='flex flex-wrap gap-2'>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className='px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold flex items-center gap-2'
                  >
                    <Tag size={14} />
                    {tag}
                  </span>
                ))}
              </div>

              <Button
                variant='secondary'
                onClick={handleShare}
                className='flex items-center gap-2'
              >
                <Share2 size={18} />
                Paylaş
              </Button>
            </div>
          </div>

          {/* Back Button */}
          <div className='text-center mt-12'>
            <Link href='/blog'>
              <Button variant='primary' size='lg'>
                Tüm Blog Yazılarına Dön
              </Button>
            </Link>
          </div>
        </motion.article>
      </Container>
    </div>
  );
};

export default BlogPostClient;
