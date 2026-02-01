import { careerRepository } from './career.repository';
import { AppError } from '@/core/errors/AppError';
import { ICareer } from './career.schema';

export class CareerService {
  async getAllCareers(query: any = {}) {
    const filter: any = {};
    if (query.isActive !== undefined) {
      filter.isActive = query.isActive === 'true';
    }
    // Default to showing only active careers for public view if not specified?
    // For now, let's allow filtering. If no filter, show all non-deleted.

    return careerRepository.findAll(filter);
  }

  async getCareerById(id: string) {
    const career = await careerRepository.findById(id);
    if (!career) {
      throw new AppError({
        message: 'Career opportunity not found',
        statusCode: 404,
        code: 'CAREER_NOT_FOUND',
      });
    }
    return career;
  }

  async createCareer(data: Partial<ICareer>) {
    return careerRepository.create(data);
  }

  async updateCareer(id: string, data: Partial<ICareer>) {
    const career = await careerRepository.update(id, data);
    if (!career) {
      throw new AppError({
        message: 'Career opportunity not found',
        statusCode: 404,
        code: 'CAREER_NOT_FOUND',
      });
    }
    return career;
  }

  async deleteCareer(id: string) {
    const career = await careerRepository.delete(id);
    if (!career) {
      throw new AppError({
        message: 'Career opportunity not found',
        statusCode: 404,
        code: 'CAREER_NOT_FOUND',
      });
    }
    return career;
  }
}

export const careerService = new CareerService();
