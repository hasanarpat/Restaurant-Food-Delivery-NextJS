import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { galleryService } from '@/modules/gallery/gallery.service';
import { apiResponse } from '@/core/utils/response';
import { errorHandler } from '@/core/errors/errorHandler';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, props: Params) {
  try {
    const params = await props.params;
    await dbConnect();
    const image = await galleryService.getImageById(params.id);
    return apiResponse.success(image);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PUT(req: NextRequest, props: Params) {
  try {
    const params = await props.params;
    await dbConnect();
    const body = await req.json();
    const image = await galleryService.updateImage(params.id, body);
    return apiResponse.success(image);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(req: NextRequest, props: Params) {
  try {
    const params = await props.params;
    await dbConnect();
    await galleryService.deleteImage(params.id);
    return apiResponse.success({
      message: 'Gallery image deleted successfully',
    });
  } catch (error) {
    return errorHandler(error);
  }
}
