import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { galleryService } from '@/modules/gallery/gallery.service';
import { apiResponse } from '@/core/utils/response';
import { errorHandler } from '@/core/errors/errorHandler';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const searchParams = req.nextUrl.searchParams;
    const query = Object.fromEntries(searchParams.entries());

    const images = await galleryService.getAllImages(query);
    return apiResponse.success(images);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const image = await galleryService.createImage(body);
    return apiResponse.created(image);
  } catch (error) {
    return errorHandler(error);
  }
}
