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
  paymentInfo: z
    .object({
      cardNumber: z.string(),
      expiryDate: z.string(),
      cvv: z.string(),
    })
    .optional(),
});

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const user = await getAuthenticatedUser();
    const { searchParams } = new URL(req.url);
    const query = Object.fromEntries(searchParams.entries());

    if (user.role === 'ADMIN') {
      // Admin gets all orders by default, or filtered
      // If query has 'userId', can filter by user. If not, all.
      // Assuming admin wants to see all orders for dashboard.
      const orders = await orderService.getAllOrders(query);
      return sendSuccess(orders);
    } else {
      // Normal user gets their own orders
      const orders = await orderService.getUserOrders(user.userId, query);
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
      paymentInfo: validatedData.paymentInfo,
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
