import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth-token';
import { sendSuccess, sendError } from '@/core/utils/response';
import { User } from '@/modules/user/user.schema';
import dbConnect from '@/lib/mongodb';
import { z } from 'zod';

const addressSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  line1: z.string().min(5, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  zip: z.string().min(1, 'Zip code is required'),
});

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return sendError('Not authenticated', 401, 'AUTH_REQUIRED');
    }

    const payload = await verifyToken(token);
    const body = await req.json();

    const validatedAddress = addressSchema.parse(body);

    const user = await User.findById(payload.userId);
    if (!user) {
      return sendError('User not found', 404, 'USER_NOT_FOUND');
    }

    if (user.addresses.length >= 10) {
      return sendError(
        'Limit reached. Please delete one of your unused addresses.',
        400,
        'ADDRESS_LIMIT_REACHED',
      );
    }

    // Add address
    user.addresses.push(validatedAddress);
    await user.save();

    return sendSuccess({ addresses: user.addresses }, 201);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return sendError(
        'Validation Error',
        400,
        'VALIDATION_ERROR',
        error.errors,
      );
    }
    return sendError(
      error.message || 'Failed to add address',
      500,
      'ADD_ADDRESS_FAILED',
    );
  }
}
