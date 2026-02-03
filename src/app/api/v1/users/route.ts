import { NextRequest } from 'next/server';
import { apiResponse, sendError } from '@/core/utils/response';
import dbConnect from '@/lib/mongodb';
import { userService } from '@/modules/user/user.service';
import { AppError } from '@/core/errors/AppError';
import { ensureAdmin } from '@/core/utils/auth-guard';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // 1. Auth & Admin Check (Strict)
    await ensureAdmin();

    // 2. Logic - Get All Users
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const result = await userService.getAllUsers({ page, limit });

    return apiResponse.success(result);
  } catch (error) {
    if (error instanceof AppError) {
      return sendError(error.message, error.statusCode, error.code);
    }
    return sendError('Internal Server Error', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // 1. Auth & Admin Check
    await ensureAdmin();

    const body = await req.json();

    // 2. Create User
    const newUser = await userService.createUser(body);

    return apiResponse.created(newUser);
  } catch (error) {
    if (error instanceof AppError) {
      return sendError(error.message, error.statusCode, error.code);
    }
    return sendError('Internal Server Error', 500);
  }
}
