import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { partnershipService } from '@/modules/partnership/partnership.service';
import { apiResponse } from '@/core/utils/response';
import { errorHandler } from '@/core/errors/errorHandler';
import { IPartnership } from '@/modules/partnership/partnership.schema';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, props: Params) {
  try {
    const params = await props.params;
    await dbConnect();
    const application = await partnershipService.getApplicationById(params.id);
    return apiResponse.success(application);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PUT(req: NextRequest, props: Params) {
  try {
    const params = await props.params;
    await dbConnect();
    const body: { status: IPartnership['status'] } = await req.json();

    // Simplification: only allowing status update here as per typical workflow
    const application = await partnershipService.updateStatus(
      params.id,
      body.status,
    );
    return apiResponse.success(application);
  } catch (error) {
    return errorHandler(error);
  }
}
