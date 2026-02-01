export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogPostClient from './BlogPostClient';
import { getBaseUrl } from '@/core/utils/base-url';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

const getBlogPost = async (slug: string) => {
  try {
    const baseUrl = await getBaseUrl();
    const res = await fetch(`${baseUrl}/api/v1/blog/${slug}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('Failed to fetch blog post:', res.status);
      return null;
    }

    const response = await res.json();
    return response.data || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Blog Yazısı Bulunamadı',
    };
  }

  return {
    title: `${post.title} | Antepli Mutfağı Blog`,
    description: post.excerpt,
    keywords: post.tags?.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
