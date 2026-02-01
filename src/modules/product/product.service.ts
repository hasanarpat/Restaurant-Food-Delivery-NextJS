import { productRepository } from './product.repository';
import { categoryRepository } from '../category/category.repository';
import { AppError } from '@/core/errors/AppError';
import { IProduct } from './product.schema';

export class ProductService {
  async getAllProducts(query: any = {}) {
    const filter: any = {};
    if (query.isFeatured === 'true') filter.isFeatured = true;

    // If category slug is provided
    if (query.catSlug) {
      const category = await categoryRepository.findBySlug(query.catSlug);
      if (category) {
        filter.categoryId = category._id; // Ensure logic handles ObjectID
      }
    }

    return productRepository.findAll(filter);
  }

  async getProductById(id: string) {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new AppError({
        message: 'Product not found',
        statusCode: 404,
        code: 'PRODUCT_NOT_FOUND',
      });
    }
    return product;
  }

  async createProduct(data: any) {
    // Map 'category' (from FE/Zod) to 'categoryId' (DB Schema)
    if (data.category) {
      data.categoryId = data.category;
      delete data.category;
    }
    return productRepository.create(data);
  }

  async updateProduct(id: string, data: Partial<IProduct>) {
    const product = await productRepository.update(id, data);
    if (!product) {
      throw new AppError({
        message: 'Product not found',
        statusCode: 404,
        code: 'PRODUCT_NOT_FOUND',
      });
    }
    return product;
  }

  async deleteProduct(id: string) {
    const product = await productRepository.delete(id);
    if (!product) {
      throw new AppError({
        message: 'Product not found',
        statusCode: 404,
        code: 'PRODUCT_NOT_FOUND',
      });
    }
    return product;
  }
}

export const productService = new ProductService();
