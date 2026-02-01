import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { blogService } from '@/modules/blog/blog.service';
import { apiResponse } from '@/core/utils/response';
import { errorHandler } from '@/core/errors/errorHandler';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const searchParams = req.nextUrl.searchParams;
    const query = Object.fromEntries(searchParams.entries());

    const posts = await blogService.getAllPosts(query);
    return apiResponse.success(posts);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const post = await blogService.createPost(body);
    return apiResponse.created(post);
  } catch (error) {
    return errorHandler(error);
  }
}
