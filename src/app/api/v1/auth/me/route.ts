import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth-token';
import { sendSuccess, sendError } from '@/core/utils/response';
import { User } from '@/modules/user/user.schema';
import dbConnect from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return sendError('Not authenticated', 401, 'AUTH_REQUIRED');
    }

    const payload = await verifyToken(token);

    // Fetch user from database
    const user = await User.findById(payload.userId).select('-passwordHash');

    if (!user) {
      return sendError('User not found', 404, 'USER_NOT_FOUND');
    }

    return sendSuccess({ user }, 200);
  } catch (error) {
    return sendError('Invalid or expired token', 401, 'AUTH_INVALID_TOKEN');
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return sendError('Not authenticated', 401, 'AUTH_REQUIRED');
    }

    const payload = await verifyToken(token);
    const body = await req.json();

    // prevent updating sensitive fields directly here if needed (e.g. role, password)
    // For now allow upgrading profile info
    const updateData: any = {};
    if (body.fullName) updateData['profile.fullName'] = body.fullName;
    if (body.phone) updateData.phone = body.phone;
    if (body.address) updateData.address = body.address; // user schema check needed

    // Check if phone or fullName is empty strings specifically if we want to allow clearing?
    // Usually we update what is provided.

    const updatedUser = await User.findByIdAndUpdate(
      payload.userId,
      { $set: updateData },
      { new: true, runValidators: true },
    ).select('-passwordHash');

    if (!updatedUser) {
      return sendError('User not found', 404, 'USER_NOT_FOUND');
    }

    return sendSuccess({ user: updatedUser }, 200);
  } catch (error: any) {
    return sendError(
      error.message || 'Failed to update profile',
      500,
      'UPDATE_FAILED',
    );
  }
}
