import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { branchService } from '@/modules/branch/branch.service';
import { apiResponse } from '@/core/utils/response';
import { errorHandler } from '@/core/errors/errorHandler';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const searchParams = req.nextUrl.searchParams;
    const query = Object.fromEntries(searchParams.entries());

    const branches = await branchService.getAllBranches(query);
    return apiResponse.success(branches);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const branch = await branchService.createBranch(body);
    return apiResponse.created(branch);
  } catch (error) {
    return errorHandler(error);
  }
}
