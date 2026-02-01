import { Partnership, IPartnership } from './partnership.schema';

export class PartnershipRepository {
  async findAll(filter: any = {}): Promise<IPartnership[]> {
    return Partnership.find({ ...filter, deletedAt: null }).sort({
      createdAt: -1,
    });
  }

  async findById(id: string): Promise<IPartnership | null> {
    return Partnership.findById(id);
  }

  async create(data: Partial<IPartnership>): Promise<IPartnership> {
    return Partnership.create(data);
  }

  async update(
    id: string,
    data: Partial<IPartnership>,
  ): Promise<IPartnership | null> {
    return Partnership.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<IPartnership | null> {
    return Partnership.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true },
    );
  }
}

export const partnershipRepository = new PartnershipRepository();
