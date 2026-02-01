import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth-token';
import { sendError } from '@/core/utils/response';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    userId: string;
    role: string;
  };
}

export async function authMiddleware(req: NextRequest) {
  // 1. Get token from cookie
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return sendError('Unauthorized', 401, 'AUTH_REQUIRED');
  }

  try {
    // 2. Verify token
    const payload = await verifyToken(token);

    // 3. Attach user to headers (Since we can't mutate req object easily in Next.js middleware chain for API routes in the same way express does, mostly we verify here and let route continue, or we can clone headers)
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-user-id', payload.userId);
    requestHeaders.set('x-user-role', payload.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    return sendError('Invalid or expired token', 401, 'AUTH_INVALID_TOKEN');
  }
}
