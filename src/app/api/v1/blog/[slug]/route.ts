import { NextRequest } from 'next/server';
import { apiResponse } from '@/core/utils/response';
import { Blog } from '@/modules/blog/blog.schema';
import dbConnect from '@/lib/mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await dbConnect();
    const { slug } = await params;

    const post = await Blog.findOne({ slug: slug, isPublished: true });

    if (!post) {
      return apiResponse.error({
        message: 'Blog post not found',
        statusCode: 404,
      });
    }

    return apiResponse.success(post);
  } catch (error) {
    console.error('Error in GET /blog/[slug]:', error);
    return apiResponse.error({
      message: 'Internal server error',
      statusCode: 500,
    });
  }
}
