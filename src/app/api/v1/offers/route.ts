import { NextRequest } from 'next/server';
import { offerService } from '@/modules/offer/offer.service';
import { sendSuccess, sendError } from '../../../../core/utils/response';
import dbConnect from '../../../../lib/mongodb';
import { authGuard } from '../../../../lib/auth-guard';

// GET /api/v1/offers - Get active offer (public)
// POST /api/v1/offers - Create new offer (admin only)
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all');

    // If 'all' query param is present, require admin auth
    if (all === 'true') {
      const authResponse = await authGuard(request, ['ADMIN']);
      if (authResponse) return authResponse;

      const offers = await offerService.getAllOffers();
      return sendSuccess(offers, 200, {
        message: 'Offers retrieved successfully',
      });
    }

    // Public endpoint - get active offer only
    const offer = await offerService.getActiveOffer();

    if (!offer) {
      return sendSuccess(null, 200, { message: 'No active offer available' });
    }

    return sendSuccess(offer, 200, {
      message: 'Active offer retrieved successfully',
    });
  } catch (error: any) {
    console.error('Error fetching offers:', error);
    return sendError(error.message || 'Failed to fetch offers', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Admin only
    const authResponse = await authGuard(request, ['ADMIN']);
    if (authResponse) return authResponse;

    await dbConnect();

    const body = await request.json();
    const offer = await offerService.createOffer(body);

    return sendSuccess(offer, 201, { message: 'Offer created successfully' });
  } catch (error: any) {
    console.error('Error creating offer:', error);
    return sendError(error.message || 'Failed to create offer', 400);
  }
}
