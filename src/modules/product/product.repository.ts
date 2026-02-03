import { Product, IProduct } from './product.schema';
import mongoose from 'mongoose';

export class ProductRepository {
  async findAll(query: any = {}): Promise<any> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter: any = { isAvailable: true }; // Default filter

    if (query.isFeatured) filter.isFeatured = query.isFeatured === 'true';
    if (query.categoryId) filter.categoryId = query.categoryId;
    if (query.search) {
      filter.$or = [
        { title: { $regex: query.search, $options: 'i' } },
        { desc: { $regex: query.search, $options: 'i' } },
      ];
    }

    let sort: any = { createdAt: -1 };
    if (query.sort) {
      switch (query.sort) {
        case 'popular':
          sort = { isFeatured: -1, createdAt: -1 };
          break;
        case 'price-low':
          sort = { price: 1 };
          break;
        case 'price-high':
          sort = { price: -1 };
          break;
        case 'newest':
          sort = { createdAt: -1 };
          break;
        default:
          sort = { createdAt: -1 };
      }
    }

    const [data, total] = await Promise.all([
      Product.find(filter)
        .populate('categoryId')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
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
    return Product.findById(id).populate('categoryId').lean();
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
