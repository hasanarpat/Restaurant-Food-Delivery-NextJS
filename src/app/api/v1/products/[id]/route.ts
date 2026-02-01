import { NextRequest } from 'next/server';
import { productService } from '@/modules/product/product.service';
import { sendSuccess, sendError } from '@/core/utils/response';
import { ensureAdmin } from '@/core/utils/auth-guard';
import dbConnect from '@/lib/mongodb';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await dbConnect();
  try {
    const id = (await params).id;
    const product = await productService.getProductById(id);
    return sendSuccess(product);
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
    await ensureAdmin();

    const id = (await params).id;
    const body = await req.json();
    const updatedProduct = await productService.updateProduct(id, body);
    return sendSuccess(updatedProduct);
  } catch (error: any) {
    return sendError(error.message, error.statusCode || 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await dbConnect();
  try {
    await ensureAdmin();

    const id = (await params).id;
    await productService.deleteProduct(id);
    return sendSuccess({ message: 'Product deleted successfully' });
  } catch (error: any) {
    return sendError(error.message, error.statusCode || 500);
  }
}
