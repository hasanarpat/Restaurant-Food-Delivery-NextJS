import { branchRepository } from './branch.repository';
import { AppError } from '@/core/errors/AppError';
import { IBranch } from './branch.schema';

export class BranchService {
  async getAllBranches(query: any = {}) {
    const filter: any = {};
    if (query.city) {
      filter.city = new RegExp(query.city, 'i'); // Case-insensitive search
    }
    if (query.isActive !== undefined) {
      filter.isActive = query.isActive === 'true';
    }
    return branchRepository.findAll(filter);
  }

  async getBranchById(id: string) {
    const branch = await branchRepository.findById(id);
    if (!branch) {
      throw new AppError({
        message: 'Branch not found',
        statusCode: 404,
        code: 'BRANCH_NOT_FOUND',
      });
    }
    return branch;
  }

  async createBranch(data: Partial<IBranch>) {
    return branchRepository.create(data);
  }

  async updateBranch(id: string, data: Partial<IBranch>) {
    const branch = await branchRepository.update(id, data);
    if (!branch) {
      throw new AppError({
        message: 'Branch not found',
        statusCode: 404,
        code: 'BRANCH_NOT_FOUND',
      });
    }
    return branch;
  }

  async deleteBranch(id: string) {
    const branch = await branchRepository.delete(id);
    if (!branch) {
      throw new AppError({
        message: 'Branch not found',
        statusCode: 404,
        code: 'BRANCH_NOT_FOUND',
      });
    }
    return branch;
  }
}

export const branchService = new BranchService();
