import { Blog, IBlog } from './blog.schema';

export class BlogRepository {
  async findAll(filter: any = {}): Promise<IBlog[]> {
    return Blog.find({ ...filter, deletedAt: null }).sort({
      publishedAt: -1,
      createdAt: -1,
    });
  }

  async findBySlug(slug: string): Promise<IBlog | null> {
    return Blog.findOne({ slug, deletedAt: null });
  }

  async findById(id: string): Promise<IBlog | null> {
    return Blog.findById(id);
  }

  async create(data: Partial<IBlog>): Promise<IBlog> {
    return Blog.create(data);
  }

  async update(id: string, data: Partial<IBlog>): Promise<IBlog | null> {
    return Blog.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<IBlog | null> {
    return Blog.findByIdAndUpdate(
      id,
      { deletedAt: new Date(), isPublished: false },
      { new: true },
    );
  }
}

export const blogRepository = new BlogRepository();
