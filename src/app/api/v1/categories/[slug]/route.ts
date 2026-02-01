import { NextRequest } from 'next/server';
import { categoryService } from '@/modules/category/category.service';
import { sendSuccess, sendError } from '@/core/utils/response';
import dbConnect from '@/lib/mongodb';

import { ensureAdmin } from '@/core/utils/auth-guard';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  await dbConnect();
  try {
    const slug = (await params).slug;
    const category = await categoryService.getCategoryBySlug(slug);
    return sendSuccess(category);
  } catch (error: any) {
    return sendError(error.message, error.statusCode || 500);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  await dbConnect();
  try {
    await ensureAdmin(); // Secure endpoint

    const slug = (await params).slug;
    const body = await req.json();
    const updatedCategory = await categoryService.updateCategory(slug, body);
    return sendSuccess(updatedCategory);
  } catch (error: any) {
    return sendError(error.message, error.statusCode || 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  await dbConnect();
  try {
    await ensureAdmin(); // Secure endpoint

    const slug = (await params).slug;
    await categoryService.deleteCategory(slug);
    return sendSuccess({ message: 'Category deleted successfully' });
  } catch (error: any) {
    return sendError(error.message, error.statusCode || 500);
  }
}
