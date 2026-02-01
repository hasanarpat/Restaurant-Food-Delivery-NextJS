export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import BlogClient from '@/app/blog/BlogClient';
import { getBaseUrl } from '@/core/utils/base-url';

export const metadata: Metadata = {
  title: 'Blog - Haberler & Tarifler | Antepli Mutfağı',
  description:
    'Türk mutfağından tarifler, ipuçları ve Antepli Mutfağı ailesinden haberler.',
  keywords: 'blog, tarifler, mutfak ipuçları, haberler, türk mutfağı',
};

const getBlogs = async () => {
  try {
    const baseUrl = await getBaseUrl();

    const res = await fetch(`${baseUrl}/api/v1/blog`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('Failed to fetch blogs:', res.status, res.statusText);
      // Try to read text if json fails
      try {
        const text = await res.text();
        console.error('Response body:', text);
      } catch (e) {
        console.error('Failed to read error body');
      }
      throw new Error(`Failed to fetch blogs: ${res.status}`);
    }

    const response = await res.json();
    const data = response.data || [];

    return data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

export default async function BlogPage() {
  const posts = await getBlogs();
  return <BlogClient initialPosts={posts} />;
}
