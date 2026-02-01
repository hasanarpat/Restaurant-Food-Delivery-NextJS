import { MetadataRoute } from 'next';
import { pizzas, burgers, pastas, lahmacun, baklava, menu } from '@/data';
import { BLOG_POSTS } from '@/data/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  // Static routes
  const routes = [
    '',
    '/menu',
    '/cart',
    '/login',
    '/orders',
    '/contact',
    '/about',
    '/gallery',
    '/branches',
    '/blog',
    '/careers',
    '/partnership',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Product routes
  const allProducts = [
    ...pizzas,
    ...burgers,
    ...pastas,
    ...lahmacun,
    ...baklava,
  ];

  const productRoutes = allProducts.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(product.createdAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic Category routes
  const categoryRoutes = menu.map((category) => ({
    url: `${baseUrl}/menu/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Dynamic Blog routes
  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...routes, ...categoryRoutes, ...productRoutes, ...blogRoutes];
}
