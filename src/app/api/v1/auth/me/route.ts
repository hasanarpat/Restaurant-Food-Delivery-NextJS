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
