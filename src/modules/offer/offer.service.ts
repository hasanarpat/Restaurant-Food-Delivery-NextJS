import { offerRepository } from './offer.repository';
import { IOffer } from './offer.schema';

class OfferService {
  // Get all offers (admin only)
  async getAllOffers() {
    return await offerRepository.findAll();
  }

  // Get active offer (public)
  async getActiveOffer() {
    const offer = await offerRepository.findActiveOffer();

    if (!offer) {
      return null;
    }

    // Calculate if offer is still valid
    const now = new Date();
    if (new Date(offer.endDate) <= now) {
      return null;
    }

    return offer;
  }

  // Get offer by ID (admin only)
  async getOfferById(id: string) {
    return await offerRepository.findById(id);
  }

  // Create new offer
  async createOffer(data: Partial<IOffer>) {
    // Validate end date is in the future
    if (new Date(data.endDate!) <= new Date()) {
      throw new Error('End date must be in the future');
    }

    // If this is set as active, deactivate all other offers
    if (data.isActive) {
      await offerRepository.deactivateAll();
    }

    return await offerRepository.create(data);
  }

  // Update offer
  async updateOffer(id: string, data: Partial<IOffer>) {
    // Validate end date if provided
    if (data.endDate && new Date(data.endDate) <= new Date()) {
      throw new Error('End date must be in the future');
    }

    // If setting this offer as active, deactivate all others
    if (data.isActive) {
      await offerRepository.deactivateAll();
    }

    const updated = await offerRepository.update(id, data);

    if (!updated) {
      throw new Error('Offer not found');
    }

    return updated;
  }

  // Delete offer
  async deleteOffer(id: string) {
    const deleted = await offerRepository.delete(id);

    if (!deleted) {
      throw new Error('Offer not found');
    }

    return deleted;
  }

  // Update offer stats
  async updateOfferStats(
    id: string,
    stats: { ordersToday?: number; customersServed?: number },
  ) {
    return await offerRepository.updateStats(id, stats);
  }
}

export const offerService = new OfferService();
