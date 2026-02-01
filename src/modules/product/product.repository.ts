import { Product, IProduct } from './product.schema';
import mongoose from 'mongoose';

export class ProductRepository {
  async findAll(filter: any = {}): Promise<IProduct[]> {
    return Product.find({ ...filter, isAvailable: true })
      .populate('categoryId')
      .sort({ createdAt: -1 });
  }

  async findById(id: string): Promise<IProduct | null> {
    return Product.findById(id).populate('categoryId');
  }

  async create(data: Partial<IProduct>): Promise<IProduct> {
    return Product.create(data);
  }

  async update(id: string, data: Partial<IProduct>): Promise<IProduct | null> {
    return Product.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<IProduct | null> {
    return Product.findByIdAndDelete(id); // Or soft delete if preferred
  }

  async findByCategory(catSlug: string): Promise<IProduct[]> {
    // This requires aggregation or looking up category id first.
    // Simplified: Find category ID first in service, then pass query here.
    return [];
  }
}

export const productRepository = new ProductRepository();
