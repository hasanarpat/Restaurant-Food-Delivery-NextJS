import { Career, ICareer } from './career.schema';

export class CareerRepository {
  async findAll(filter: any = {}): Promise<ICareer[]> {
    return Career.find({ ...filter, deletedAt: null }).sort({ createdAt: -1 });
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
