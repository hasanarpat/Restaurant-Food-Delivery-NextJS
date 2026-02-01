import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth-token';
import { sendSuccess, sendError } from '@/core/utils/response';
import { User } from '@/modules/user/user.schema';
import dbConnect from '@/lib/mongodb';

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return sendError('Not authenticated', 401, 'AUTH_REQUIRED');
    }

    const payload = await verifyToken(token);
    const { id: addressId } = await context.params;

    const user = await User.findById(payload.userId);

    if (!user) {
      return sendError('User not found', 404, 'USER_NOT_FOUND');
    }

    // Filter out the address
    const initialLength = user.addresses.length;
    user.addresses = user.addresses.filter(
      (addr) => (addr as any)._id.toString() !== addressId,
    );

    if (user.addresses.length === initialLength) {
      return sendError('Address not found', 404, 'ADDRESS_NOT_FOUND');
    }

    await user.save();

    return sendSuccess({ addresses: user.addresses }, 200);
  } catch (error: any) {
    return sendError(
      error.message || 'Failed to delete address',
      500,
      'DELETE_ADDRESS_FAILED',
    );
  }
}
