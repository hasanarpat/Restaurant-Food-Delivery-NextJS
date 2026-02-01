export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BLOG_POSTS } from '@/data/blog';
import BlogPostClient from './BlogPostClient';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Blog Yazısı Bulunamadı',
    };
  }

  return {
    title: `${post.title} | Antepli Mutfağı Blog`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
