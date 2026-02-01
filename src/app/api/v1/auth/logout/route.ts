import { NextRequest } from 'next/server';
import { sendSuccess } from '@/core/utils/response';

export async function POST(req: NextRequest) {
  const response = sendSuccess({ message: 'Logged out successfully' }, 200);

  // Clear the token cookie
  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0, // Expire immediately
    path: '/',
  });

  return response;
}
