import { NextRequest } from 'next/server';
import { productService } from '@/modules/product/product.service';
import { sendSuccess, sendError } from '@/core/utils/response';
import { ensureAdmin } from '@/core/utils/auth-guard';
import dbConnect from '@/lib/mongodb';
import { z } from 'zod';

const createProductSchema = z.object({
  title: z.string().min(2),
  desc: z.string(),
  img: z.string().optional(),
  price: z.number().min(0),
  isFeatured: z.boolean().optional(),
  isAvailable: z.boolean().optional(),
  category: z.string().optional(), // Category ID
  options: z
    .array(
      z.object({
        title: z.string(),
        additionalPrice: z.number(),
      }),
    )
    .optional(),
});

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url); // Use URL directly for searchParams
    const catSlug = searchParams.get('cat');
    const isFeatured = searchParams.get('featured');

    const products = await productService.getAllProducts({
      catSlug,
      isFeatured,
    });
    return sendSuccess(products);
  } catch (error: any) {
    return sendError(error.message, error.statusCode || 500);
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    await ensureAdmin();

    const body = await req.json();
    const validatedData = createProductSchema.parse(body);

    const product = await productService.createProduct(validatedData as any);
    return sendSuccess(product, 201);
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
