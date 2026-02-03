import { Offer, type IOffer } from './offer.schema';
import { type QueryFilter } from 'mongoose';

class OfferRepository {
  // Find all offers with optional filters
  async findAll(query: QueryFilter<IOffer> = {}) {
    return await Offer.find(query).sort({ createdAt: -1 }).lean();
  }

  // Find a single offer by ID
  async findById(id: string) {
    return await Offer.findById(id).lean();
  }

  // Find active and valid offer (for public display)
  async findActiveOffer() {
    const now = new Date();
    return await Offer.findOne({
      isActive: true,
      endDate: { $gt: now },
    })
      .sort({ createdAt: -1 })
      .lean();
  }

  // Create a new offer
  async create(data: Partial<IOffer>) {
    const offer = new Offer(data);
    return (await offer.save()).toObject();
  }

  // Update an offer
  async update(id: string, data: Partial<IOffer>) {
    return await Offer.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
  }

  // Delete an offer
  async delete(id: string) {
    return await Offer.findByIdAndDelete(id).lean();
  }

  // Deactivate all offers
  async deactivateAll() {
    return await Offer.updateMany({}, { isActive: false });
  }

  // Update stats
  async updateStats(
    id: string,
    stats: { ordersToday?: number; customersServed?: number },
  ) {
    return await Offer.findByIdAndUpdate(
      id,
      { $set: { stats } },
      { new: true, runValidators: true },
    ).lean();
  }
}

export const offerRepository = new OfferRepository();
