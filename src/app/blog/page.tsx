export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Blog - Haberler & Tarifler | Antepli Mutfağı',
  description:
    'Türk mutfağından tarifler, ipuçları ve Antepli Mutfağı ailesinden haberler.',
  keywords: 'blog, tarifler, mutfak ipuçları, haberler, türk mutfağı',
};

export default function BlogPage() {
  return <BlogClient />;
}
