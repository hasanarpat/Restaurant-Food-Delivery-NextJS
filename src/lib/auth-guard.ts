import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth-token';
import { sendError } from '@/core/utils/response';

export async function authGuard(request: NextRequest, allowedRoles?: string[]) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return sendError('Not authenticated', 401, 'AUTH_REQUIRED');
    }

    const payload = await verifyToken(token);

    if (allowedRoles && !allowedRoles.includes(payload.role)) {
      return sendError('Access denied', 403, 'FORBIDDEN');
    }

    // Attach user to request if needed, but for now just returning null means success (no error response)
    // In Next.js App Router we can't easily attach to request but we verified the token.
    return null;
  } catch (error) {
    return sendError('Invalid or expired token', 401, 'AUTH_INVALID_TOKEN');
  }
}
