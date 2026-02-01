import { blogRepository } from './blog.repository';
import { AppError } from '@/core/errors/AppError';
import { IBlog } from './blog.schema';

export class BlogService {
  async getAllPosts(query: any = {}) {
    const filter: any = {};
    if (query.tag) {
      filter.tags = query.tag;
    }
    // Public API should typically only return published posts unless admin
    if (query.isPublished !== undefined) {
      filter.isPublished = query.isPublished === 'true';
    } else {
      // Default behavior? Maybe controlled by controller/route based on auth
    }

    return blogRepository.findAll(filter);
  }

  async getPostBySlug(slug: string) {
    const post = await blogRepository.findBySlug(slug);
    if (!post) {
      throw new AppError({
        message: 'Blog post not found',
        statusCode: 404,
        code: 'BLOG_NOT_FOUND',
      });
    }
    return post;
  }

  async createPost(data: Partial<IBlog>) {
    // Generate slug from title if not provided
    if (!data.slug && data.title) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    // Check if slug exists
    if (data.slug) {
      const existing = await blogRepository.findBySlug(data.slug);
      if (existing) {
        throw new AppError({
          message: 'Slug already exists',
          statusCode: 400,
          code: 'SLUG_EXISTS',
        });
      }
    }

    if (data.isPublished && !data.publishedAt) {
      data.publishedAt = new Date();
    }

    return blogRepository.create(data);
  }

  async updatePost(id: string, data: Partial<IBlog>) {
    if (data.slug) {
      const existing = await blogRepository.findBySlug(data.slug);
      if (existing && existing._id.toString() !== id) {
        throw new AppError({
          message: 'Slug already exists',
          statusCode: 400,
          code: 'SLUG_EXISTS',
        });
      }
    }

    const post = await blogRepository.update(id, data);
    if (!post) {
      throw new AppError({
        message: 'Blog post not found',
        statusCode: 404,
        code: 'BLOG_NOT_FOUND',
      });
    }
    return post;
  }

  async deletePost(id: string) {
    const post = await blogRepository.delete(id);
    if (!post) {
      throw new AppError({
        message: 'Blog post not found',
        statusCode: 404,
        code: 'BLOG_NOT_FOUND',
      });
    }
    return post;
  }
}

export const blogService = new BlogService();
