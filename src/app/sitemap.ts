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
  const categoriesResult: any = await categoryService.getAllCategories();
  const categories =
    categoriesResult.data ||
    (Array.isArray(categoriesResult) ? categoriesResult : []);
  const categoryRoutes = categories.map((cat: any) => ({
    url: `${baseUrl}/menu/${cat.slug}`,
    lastModified: cat.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 3. Dynamic Products
  const productsResult: any = await productService.getAllProducts({});
  const products =
    productsResult.data ||
    (Array.isArray(productsResult) ? productsResult : []);
  const productRoutes = products.map((product: any) => ({
    url: `${baseUrl}/product/${product._id}`,
    lastModified: product.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 4. Dynamic Blogs
  const blogsResult: any = await blogService.getAllPosts();
  const blogs =
    blogsResult.data || (Array.isArray(blogsResult) ? blogsResult : []);
  const blogRoutes = blogs.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 5. Dynamic Branches
  const branchesResult: any = await branchService.getAllBranches();
  const branches =
    branchesResult.data ||
    (Array.isArray(branchesResult) ? branchesResult : []);
  const branchRoutes = branches.map((branch: any) => ({
    url: `${baseUrl}/branches/${branch._id}`,
    lastModified: branch.updatedAt || new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // 6. Dynamic Careers
  const careersResult: any = await careerService.getAllCareers();
  const careers =
    careersResult.data || (Array.isArray(careersResult) ? careersResult : []);
  const careerRoutes = careers.map((career: any) => ({
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
