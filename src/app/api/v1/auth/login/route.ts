import { NextRequest } from 'next/server';
import { LoginSchema } from '@/modules/auth/auth.schema';
import { authService } from '@/modules/auth/auth.service';
import { sendSuccess, sendError } from '@/core/utils/response';
import { AppError } from '@/core/errors/AppError';
import { z } from 'zod';
import dbConnect from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    // 1. Validation
    const validatedData = LoginSchema.parse(body);

    // 2. Service Call
    const { user, token } = await authService.login(validatedData);

    // 3. Response with Cookie
    const response = sendSuccess({ user }, 200);

    // Set HttpOnly Cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7200, // 2 hours
      path: '/',
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return sendError(
        'Validation Error',
        400,
        'VALIDATION_ERROR',
        error.errors,
      );
    }
    if (error instanceof AppError) {
      return sendError(error.message, error.statusCode, error.code);
    }
    console.error(error); // PENDING: Replace with structured logger
    return sendError('Internal Server Error', 500);
  }
}
