import { NextRequest } from 'next/server';
import { offerService } from '@/modules/offer/offer.service';
import { sendSuccess, sendError } from '@/core/utils/response';
import dbConnect from '@/lib/mongodb';
import { authGuard } from '@/lib/auth-guard';

// GET /api/v1/offers/[id] - Get offer by ID (admin only)
export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  try {
    // Admin only
    const authResponse = await authGuard(request, ['ADMIN']);
    if (authResponse) return authResponse;

    await dbConnect();

    const offer = await offerService.getOfferById(params.id);

    if (!offer) {
      return sendError('Offer not found', 404);
    }

    return sendSuccess(offer, 200, { message: 'Offer retrieved successfully' });
  } catch (error: any) {
    console.error('Error fetching offer:', error);
    return sendError(error.message || 'Failed to fetch offer', 500);
  }
}

// PUT /api/v1/offers/[id] - Update offer (admin only)
export async function PUT(
  request: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  try {
    // Admin only
    const authResponse = await authGuard(request, ['ADMIN']);
    if (authResponse) return authResponse;

    await dbConnect();

    const body = await request.json();
    const offer = await offerService.updateOffer(params.id, body);

    return sendSuccess(offer, 200, { message: 'Offer updated successfully' });
  } catch (error: any) {
    console.error('Error updating offer:', error);
    return sendError(error.message || 'Failed to update offer', 400);
  }
}

// DELETE /api/v1/offers/[id] - Delete offer (admin only)
export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  try {
    // Admin only
    const authResponse = await authGuard(request, ['ADMIN']);
    if (authResponse) return authResponse;

    await dbConnect();

    await offerService.deleteOffer(params.id);

    return sendSuccess(null, 200, { message: 'Offer deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting offer:', error);
    return sendError(error.message || 'Failed to delete offer', 400);
  }
}
