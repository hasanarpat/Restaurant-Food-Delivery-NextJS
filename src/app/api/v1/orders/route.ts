import { NextRequest } from 'next/server';
import { orderService } from '@/modules/order/order.service';
import { sendSuccess, sendError } from '@/core/utils/response';
import { getAuthenticatedUser, ensureAdmin } from '@/core/utils/auth-guard';
import dbConnect from '@/lib/mongodb';
import { z } from 'zod';

const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().min(1),
        selectedOptions: z
          .array(
            z.object({
              title: z.string(),
              additionalPrice: z.number(),
            }),
          )
          .optional(),
      }),
    )
    .min(1),
  customerNote: z.string().optional(),
});

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const user = await getAuthenticatedUser();

    // Admin can see all orders, User sees only distinct?
    // Actually typically GET /orders is for "My Orders" if user, or all if Admin + filtered?
    // Let's implement: User gets their orders. Admin should use a separate route or query param?
    // Project usually has /api/v1/orders for User and /api/v1/admin/orders for Admin.
    // Or we filter by role inside here.

    if (user.role === 'ADMIN') {
      // Check for ?all=true or query params
      // For now, let's just return user orders if they are asking.
      // Start with "My Orders" behavior.
      // Actually, users need to see THEIR orders.
      const orders = await orderService.getUserOrders(user.userId);
      return sendSuccess(orders);
    } else {
      const orders = await orderService.getUserOrders(user.userId);
      return sendSuccess(orders);
    }
  } catch (error: any) {
    return sendError(error.message, error.statusCode || 500);
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const user = await getAuthenticatedUser(); // Must be logged in

    const body = await req.json();
    const validatedData = createOrderSchema.parse(body);

    const order = await orderService.createOrder({
      userId: user.userId,
      items: validatedData.items,
      customerNote: validatedData.customerNote,
    });

    return sendSuccess(order, 201);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return sendError(
        'Validation Error',
        400,
        'VALIDATION_ERROR',
        error.errors,
      );
    }
    return sendError(error.message, error.statusCode || 500);
  }
}
