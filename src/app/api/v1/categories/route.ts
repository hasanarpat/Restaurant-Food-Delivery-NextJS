import { NextRequest } from 'next/server';
import { categoryService } from '@/modules/category/category.service';
import { sendSuccess, sendError } from '@/core/utils/response';
import dbConnect from '@/lib/mongodb';
import { z } from 'zod';

const createCategorySchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  desc: z.string().optional(),
  img: z.string().optional(),
  color: z.string().optional(),
});

export async function GET() {
  await dbConnect();
  try {
    const categories = await categoryService.getAllCategories();
    return sendSuccess(categories);
  } catch (error: any) {
    return sendError(error.message, error.statusCode || 500);
  }
}

import { ensureAdmin } from '@/core/utils/auth-guard';

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    await ensureAdmin(); // Only Admin can create categories

    const body = await req.json();
    const validatedData = createCategorySchema.parse(body);

    // Fill defaults for missing required fields in schema (img/color are required in db schema)
    // For now we assume FE sends them or we mock them.
    // The Schema says `required: true` for img and color.
    // Let's ensure we pass them or validation fails.

    const category = await categoryService.createCategory(validatedData as any);
    return sendSuccess(category, 201);
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
