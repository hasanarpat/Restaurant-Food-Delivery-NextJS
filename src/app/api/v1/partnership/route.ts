import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { partnershipService } from '@/modules/partnership/partnership.service';
import { apiResponse } from '@/core/utils/response';
import { errorHandler } from '@/core/errors/errorHandler';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const searchParams = req.nextUrl.searchParams;
    const query = Object.fromEntries(searchParams.entries());

    const applications = await partnershipService.getAllApplications(query);
    return apiResponse.success(applications);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const application = await partnershipService.createApplication(body);
    return apiResponse.created(application);
  } catch (error) {
    return errorHandler(error);
  }
}
