import { MetadataRoute } from 'next';
import { productService } from '@/modules/product/product.service';
import { blogService } from '@/modules/blog/blog.service';
import { categoryService } from '@/modules/category/category.service';
import { branchService } from '@/modules/branch/branch.service';
import { careerService } from '@/modules/career/career.service';
import dbConnect from '@/lib/mongodb';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await dbConnect();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  // 1. Static Routes
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
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Dynamic Categories
  const categories = await categoryService.getAllCategories();
  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/menu/${cat.slug}`,
    lastModified: cat.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 3. Dynamic Products
  // productService.getAllProducts returns IProduct[] directly (from repo)
  const products = await productService.getAllProducts({});
  const productRoutes = products.map((product: any) => ({
    url: `${baseUrl}/product/${product._id}`,
    lastModified: product.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 4. Dynamic Blogs
  const blogs = await blogService.getAllPosts();
  const blogRoutes = blogs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 5. Dynamic Branches
  const branches = await branchService.getAllBranches();
  const branchRoutes = branches.map((branch) => ({
    url: `${baseUrl}/branches/${branch._id}`,
    lastModified: branch.updatedAt || new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // 6. Dynamic Careers
  const careers = await careerService.getAllCareers();
  const careerRoutes = careers.map((career) => ({
    url: `${baseUrl}/careers/${career._id}`,
    lastModified: career.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    ...routes,
    ...categoryRoutes,
    ...productRoutes,
    ...blogRoutes,
    ...branchRoutes,
    ...careerRoutes,
  ];
}
