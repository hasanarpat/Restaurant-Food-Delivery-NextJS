import { Career, ICareer } from './career.schema';

export class CareerRepository {
  async findAll(query: any = {}): Promise<any> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter
    const filter: any = { deletedAt: null };
    if (query.type) filter.type = query.type;
    if (query.department) filter.department = query.department;
    if (query.active) filter.isActive = query.active === 'true';

    const [data, total] = await Promise.all([
      Career.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Career.countDocuments(filter),
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

  async findById(id: string): Promise<ICareer | null> {
    return Career.findById(id);
  }

  async create(data: Partial<ICareer>): Promise<ICareer> {
    return Career.create(data);
  }

  async update(id: string, data: Partial<ICareer>): Promise<ICareer | null> {
    return Career.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<ICareer | null> {
    return Career.findByIdAndUpdate(
      id,
      { deletedAt: new Date(), isActive: false },
      { new: true },
    );
  }
}

export const careerRepository = new CareerRepository();
