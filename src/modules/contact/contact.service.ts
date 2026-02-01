import { contactRepository } from './contact.repository';
import { AppError } from '@/core/errors/AppError';
import { IContact } from './contact.schema';

export class ContactService {
  async submitContactForm(data: Partial<IContact>) {
    if (!data.name || !data.email || !data.message || !data.subject) {
      throw new AppError({
        message: 'All fields are required',
        statusCode: 400,
        code: 'VALIDATION_ERROR',
      });
    }

    return contactRepository.create(data);
  }

  async getAllSubmissions(query: any = {}) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    return contactRepository.findAll({}, page, limit);
  }

  async markAsRead(id: string) {
    const contact = await contactRepository.markAsRead(id);
    if (!contact) {
      throw new AppError({
        message: 'Contact submission not found',
        statusCode: 404,
        code: 'NOT_FOUND',
      });
    }
    return contact;
  }
}

export const contactService = new ContactService();
