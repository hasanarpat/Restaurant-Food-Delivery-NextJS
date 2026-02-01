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
        filter.category = category._id; // Ensure logic handles ObjectID
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

  async createProduct(data: Partial<IProduct>) {
    // Validate Category if provided
    // Assuming data.category is ID string from FE
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
