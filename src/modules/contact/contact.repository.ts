import { Contact, IContact } from './contact.schema';

export class ContactRepository {
  async create(data: Partial<IContact>) {
    return Contact.create(data);
  }

  async findAll(filter: any = {}, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      Contact.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Contact.countDocuments(filter),
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async markAsRead(id: string) {
    return Contact.findByIdAndUpdate(id, { isRead: true }, { new: true });
  }

  async delete(id: string) {
    return Contact.findByIdAndDelete(id);
  }
}

export const contactRepository = new ContactRepository();
