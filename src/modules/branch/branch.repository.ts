import { Branch, IBranch } from './branch.schema';

export class BranchRepository {
  async findAll(filter: any = {}): Promise<IBranch[]> {
    return Branch.find({ ...filter, deletedAt: null }).sort({ createdAt: -1 });
  }

  async findById(id: string): Promise<IBranch | null> {
    return Branch.findById(id);
  }

  async create(data: Partial<IBranch>): Promise<IBranch> {
    return Branch.create(data);
  }

  async update(id: string, data: Partial<IBranch>): Promise<IBranch | null> {
    return Branch.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<IBranch | null> {
    return Branch.findByIdAndUpdate(
      id,
      { deletedAt: new Date(), isActive: false },
      { new: true },
    );
  }
}

export const branchRepository = new BranchRepository();
