import { partnershipRepository } from './partnership.repository';
import { AppError } from '@/core/errors/AppError';
import { IPartnership } from './partnership.schema';

export class PartnershipService {
  async getAllApplications(query: any = {}) {
    const filter: any = {};
    if (query.status) {
      filter.status = query.status;
    }
    return partnershipRepository.findAll(filter);
  }

  async getApplicationById(id: string) {
    const application = await partnershipRepository.findById(id);
    if (!application) {
      throw new AppError({
        message: 'Partnership application not found',
        statusCode: 404,
        code: 'PARTNERSHIP_NOT_FOUND',
      });
    }
    return application;
  }

  async createApplication(data: Partial<IPartnership>) {
    return partnershipRepository.create(data);
  }

  async updateStatus(id: string, status: IPartnership['status']) {
    const application = await partnershipRepository.update(id, { status });
    if (!application) {
      throw new AppError({
        message: 'Partnership application not found',
        statusCode: 404,
        code: 'PARTNERSHIP_NOT_FOUND',
      });
    }
    return application;
  }
}

export const partnershipService = new PartnershipService();
