'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { Calendar, Clock, User, Tag, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
interface BlogPostClientProps {
  post: any;
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
      <div className='relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden'>
        {/* Background Image */}
        <div className='absolute inset-0 z-0'>
          <img
            src={post.coverImage || '/images/blog/dough.png'}
            alt={post.title}
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-black/60 backdrop-blur-[2px]' />
        </div>

        <Container className='relative z-10'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='max-w-4xl mx-auto'
          >
            <Link href='/blog'>
              <Button
                variant='ghost'
                className='text-white hover:bg-white/20 mb-8'
              >
                <ArrowLeft size={20} />
                Blog'a Dön
              </Button>
            </Link>

            <h1 className='font-heading text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 leading-tight'>
              {post.title}
            </h1>

            <div className='flex flex-wrap items-center gap-6 text-white/90 text-sm md:text-base mb-8'>
              <div className='flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md'>
                <User size={18} className='text-primary-400' />
                <span className='font-medium'>{post.author}</span>
              </div>
              <div className='flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md'>
                <Calendar size={18} className='text-primary-400' />
                <span className='font-medium'>
                  {new Date(
                    post.publishedAt || post.createdAt || Date.now(),
                  ).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className='flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md'>
                <Clock size={18} className='text-primary-400' />
                <span className='font-medium'>
                  {post.readTime || 5} dk okuma
                </span>
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
            <div
              className='prose prose-lg max-w-none text-gray-700 prose-headings:font-heading prose-headings:font-bold prose-headings:text-gray-900 prose-p:leading-relaxed prose-p:text-lg prose-a:text-primary-600 hover:prose-a:text-primary-700'
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Tags & Share */}
          <div className='bg-white rounded-[2.5rem] p-8 shadow-lg'>
            <div className='flex flex-wrap items-center justify-between gap-4'>
              <div className='flex flex-wrap gap-2'>
                {post.tags.map((tag: string) => (
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
