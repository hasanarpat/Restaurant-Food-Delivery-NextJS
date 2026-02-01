import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { careerService } from '@/modules/career/career.service';
import { apiResponse } from '@/core/utils/response';
import { errorHandler } from '@/core/errors/errorHandler';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const searchParams = req.nextUrl.searchParams;
    const query = Object.fromEntries(searchParams.entries());

    const careers = await careerService.getAllCareers(query);
    return apiResponse.success(careers);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const career = await careerService.createCareer(body);
    return apiResponse.created(career);
  } catch (error) {
    return errorHandler(error);
  }
}
