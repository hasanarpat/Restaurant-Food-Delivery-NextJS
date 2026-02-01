import { categoryRepository } from './category.repository';
import { AppError } from '@/core/errors/AppError';
import { ICategory } from './category.schema';

export class CategoryService {
  async getAllCategories() {
    return categoryRepository.findAll();
  }

  async getCategoryBySlug(slug: string) {
    const category = await categoryRepository.findBySlug(slug);
    if (!category) {
      throw new AppError({
        message: 'Category not found',
        statusCode: 404,
        code: 'CATEGORY_NOT_FOUND',
      });
    }
    return category;
  }

  async createCategory(data: Partial<ICategory>) {
    // Check if slug exists
    if (data.slug) {
      const exists = await categoryRepository.findBySlug(data.slug);
      if (exists) {
        throw new AppError({
          message: 'Category slug already exists',
          statusCode: 409,
          code: 'CATEGORY_EXISTS',
        });
      }
    }

    // Auto generate slug from title if not provided could be added here,
    // but for now we assume simple straight-through.

    return categoryRepository.create(data);
  }

  async updateCategory(slug: string, data: Partial<ICategory>) {
    const category = await categoryRepository.findBySlug(slug);
    if (!category) {
      throw new AppError({
        message: 'Category not found',
        statusCode: 404,
        code: 'CATEGORY_NOT_FOUND',
      });
    }

    return categoryRepository.update(category._id.toString(), data);
  }

  async deleteCategory(slug: string) {
    const category = await categoryRepository.findBySlug(slug);
    if (!category) {
      throw new AppError({
        message: 'Category not found',
        statusCode: 404,
        code: 'CATEGORY_NOT_FOUND',
      });
    }

    return categoryRepository.delete(category._id.toString());
  }
}

export const categoryService = new CategoryService();
