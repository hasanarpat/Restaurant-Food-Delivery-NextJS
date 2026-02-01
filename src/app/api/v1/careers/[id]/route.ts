import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { careerService } from '@/modules/career/career.service';
import { apiResponse } from '@/core/utils/response';
import { errorHandler } from '@/core/errors/errorHandler';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, props: Params) {
  try {
    const params = await props.params;
    await dbConnect();
    const career = await careerService.getCareerById(params.id);
    return apiResponse.success(career);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PUT(req: NextRequest, props: Params) {
  try {
    const params = await props.params;
    await dbConnect();
    const body = await req.json();
    const career = await careerService.updateCareer(params.id, body);
    return apiResponse.success(career);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(req: NextRequest, props: Params) {
  try {
    const params = await props.params;
    await dbConnect();
    await careerService.deleteCareer(params.id);
    return apiResponse.success({ message: 'Career deleted successfully' });
  } catch (error) {
    return errorHandler(error);
  }
}
