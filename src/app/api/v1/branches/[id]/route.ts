import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { branchService } from '@/modules/branch/branch.service';
import { apiResponse } from '@/core/utils/response';
import { errorHandler } from '@/core/errors/errorHandler';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, props: Params) {
  try {
    const params = await props.params;
    await dbConnect();
    const branch = await branchService.getBranchById(params.id);
    return apiResponse.success(branch);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PUT(req: NextRequest, props: Params) {
  try {
    const params = await props.params;
    await dbConnect();
    const body = await req.json();
    const branch = await branchService.updateBranch(params.id, body);
    return apiResponse.success(branch);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(req: NextRequest, props: Params) {
  try {
    const params = await props.params;
    await dbConnect();
    await branchService.deleteBranch(params.id);
    return apiResponse.success({ message: 'Branch deleted successfully' });
  } catch (error) {
    return errorHandler(error);
  }
}
