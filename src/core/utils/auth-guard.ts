import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth-token';
import { AppError } from '@/core/errors/AppError';

export interface UserPayload {
  userId: string;
  role: 'USER' | 'ADMIN' | 'STAFF';
}

export async function getAuthenticatedUser(): Promise<UserPayload> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    throw new AppError({
      message: 'Authentication required',
      statusCode: 401,
      code: 'AUTH_REQUIRED',
    });
  }

  try {
    const payload = await verifyToken(token);
    return { userId: payload.userId, role: payload.role as any };
  } catch (error) {
    throw new AppError({
      message: 'Invalid or expired token',
      statusCode: 401,
      code: 'AUTH_INVALID_TOKEN',
    });
  }
}

export async function ensureAdmin(): Promise<UserPayload> {
  const user = await getAuthenticatedUser();
  if (user.role !== 'ADMIN') {
    throw new AppError({
      message: 'Access denied: Admins only',
      statusCode: 403,
      code: 'AUTH_FORBIDDEN',
    });
  }
  return user;
}
