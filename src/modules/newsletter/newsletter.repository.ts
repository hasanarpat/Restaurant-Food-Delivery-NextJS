import { Newsletter, INewsletter } from './newsletter.schema';

export class NewsletterRepository {
  async create(data: Partial<INewsletter>) {
    return Newsletter.create(data);
  }

  async findByEmail(email: string) {
    return Newsletter.findOne({ email });
  }

  async findAll(filter: any = {}, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      Newsletter.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Newsletter.countDocuments(filter),
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

  async delete(email: string) {
    return Newsletter.findOneAndDelete({ email });
  }
}

export const newsletterRepository = new NewsletterRepository();
