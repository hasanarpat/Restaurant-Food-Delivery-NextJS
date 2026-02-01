import { NextRequest } from 'next/server';
import { orderService } from '@/modules/order/order.service';
import { sendSuccess, sendError } from '@/core/utils/response';
import { getAuthenticatedUser, ensureAdmin } from '@/core/utils/auth-guard';
import dbConnect from '@/lib/mongodb';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await dbConnect();
  try {
    const user = await getAuthenticatedUser();
    const id = (await params).id;
    const order = await orderService.getOrderById(id);

    // Security check: only owner or admin can view
    if (order.userId.toString() !== user.userId && user.role !== 'ADMIN') {
      return sendError('Access denied', 403, 'AUTH_FORBIDDEN');
    }

    return sendSuccess(order);
  } catch (error: any) {
    return sendError(error.message, error.statusCode || 500);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await dbConnect();
  try {
    await ensureAdmin(); // Only admin can update status

    const id = (await params).id;
    const body = await req.json();

    // Expect { status: 'PREPARING' } etc.
    if (!body.status) {
      return sendError('Status required', 400, 'VALIDATION_ERROR');
    }

    const updatedOrder = await orderService.updateOrderStatus(id, body.status);
    return sendSuccess(updatedOrder);
  } catch (error: any) {
    return sendError(error.message, error.statusCode || 500);
  }
}
