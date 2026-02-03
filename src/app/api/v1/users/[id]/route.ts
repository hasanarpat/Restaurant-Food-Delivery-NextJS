import { NextRequest } from 'next/server';
import { apiResponse, sendError } from '@/core/utils/response';
import dbConnect from '@/lib/mongodb';
import { userService } from '@/modules/user/user.service';
import { AppError } from '@/core/errors/AppError';
import { ensureAdmin } from '@/core/utils/auth-guard';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    await ensureAdmin();

    const { id } = await params;
    const user = await userService.getUser(id);

    return apiResponse.success(user);
  } catch (error) {
    if (error instanceof AppError) {
      return sendError(error.message, error.statusCode, error.code);
    }
    return sendError('Internal Server Error', 500);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    await ensureAdmin();

    const { id } = await params;
    const body = await req.json();

    // userService.updateUser handles filtering valid fields via logic or DTO if strictly enforced.
    // In current userService implementation, it passes partial data.
    const updatedUser = await userService.updateUser(id, body);

    return apiResponse.success(updatedUser);
  } catch (error) {
    if (error instanceof AppError) {
      return sendError(error.message, error.statusCode, error.code);
    }
    return sendError('Internal Server Error', 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    await ensureAdmin();

    const { id } = await params;
    await userService.deleteUser(id);

    return apiResponse.success({ message: 'User deleted successfully' });
  } catch (error) {
    if (error instanceof AppError) {
      return sendError(error.message, error.statusCode, error.code);
    }
    return sendError('Internal Server Error', 500);
  }
}
