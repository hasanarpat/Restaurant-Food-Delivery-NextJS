import { Category, ICategory } from './category.schema';

export class CategoryRepository {
  async findAll(filter: Partial<ICategory> = {}): Promise<ICategory[]> {
    return Category.find({
      ...filter,
      isActive: true,
    } as any).sort({ sortOrder: 1 });
  }

  async findBySlug(slug: string): Promise<ICategory | null> {
    return Category.findOne({ slug });
  }

  async findById(id: string): Promise<ICategory | null> {
    return Category.findById(id);
  }

  async create(data: Partial<ICategory>): Promise<ICategory> {
    return Category.create(data);
  }

  async update(
    id: string,
    data: Partial<ICategory>,
  ): Promise<ICategory | null> {
    return Category.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<ICategory | null> {
    return Category.findByIdAndUpdate(
      id,
      { deletedAt: new Date(), isActive: false },
      { new: true },
    );
  }
}

export const categoryRepository = new CategoryRepository();
