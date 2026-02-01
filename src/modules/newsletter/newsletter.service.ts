import { newsletterRepository } from './newsletter.repository';
import { AppError } from '@/core/errors/AppError';

export class NewsletterService {
  async subscribe(email: string) {
    if (!email) {
      throw new AppError({
        message: 'Email is required',
        statusCode: 400,
        code: 'EMAIL_REQUIRED',
      });
    }

    const existing = await newsletterRepository.findByEmail(email);
    if (existing) {
      throw new AppError({
        message: 'Email is already subscribed',
        statusCode: 400,
        code: 'EMAIL_ALREADY_SUBSCRIBED',
      });
    }

    return newsletterRepository.create({ email, isActive: true });
  }

  async getAllSubscribers(query: any = {}) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    return newsletterRepository.findAll({}, page, limit);
  }
}

export const newsletterService = new NewsletterService();
