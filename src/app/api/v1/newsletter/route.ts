import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { newsletterService } from '@/modules/newsletter/newsletter.service';
import { apiResponse } from '@/core/utils/response';
import { errorHandler } from '@/core/errors/errorHandler';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const result = await newsletterService.subscribe(body.email);
    return apiResponse.created(result);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const searchParams = req.nextUrl.searchParams;
    const query = Object.fromEntries(searchParams.entries());

    const result = await newsletterService.getAllSubscribers(query);
    return apiResponse.success(result);
  } catch (error) {
    return errorHandler(error);
  }
}
