import { Product, IProduct } from './product.schema';
import mongoose from 'mongoose';

export class ProductRepository {
  async findAll(query: any = {}): Promise<any> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter: any = { isAvailable: true }; // Default filter

    // Explicit filtering logic
    if (query.isFeatured) filter.isFeatured = query.isFeatured === 'true';
    // If catSlug is handled by service resolving to ID, or if we query by populated field (complicated in basic find).
    // Assuming service deals with category ID or passed in filter:
    if (query.categoryId) filter.categoryId = query.categoryId;

    const [data, total] = await Promise.all([
      Product.find(filter)
        .populate('categoryId')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Product.countDocuments(filter),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
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
