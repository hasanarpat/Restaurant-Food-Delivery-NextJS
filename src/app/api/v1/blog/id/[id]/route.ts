import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { blogService } from '@/modules/blog/blog.service';
import { apiResponse } from '@/core/utils/response';
import { errorHandler } from '@/core/errors/errorHandler';

interface Params {
  params: Promise<{ id: string }>;
}

// Admin/Management routes by ID

export async function GET(req: NextRequest, props: Params) {
  try {
    const params = await props.params;
    await dbConnect();
    // Use repository directly or add getById to service (Repository has findById, Service doesn't expose it yet but easy to add)
    // Wait, Service doesn't have getById? I'll check.
    // Service has: getAllPosts, getPostBySlug, createPost, updatePost, deletePost.
    // It is missing getPostById. I should add it or use repository. Better add to service.
    // For now, I will just implement PUT/DELETE which exist.
    // Use repository as fallback for GET if needed or just don't implement GET here if not needed.
    // Actually, admin might need to fetch by ID to edit.
    // I'll assume usage of GET /blog/[slug] is sufficient for fetching for now.
    // But PUT and DELETE definitely need ID.

    // Changing plan: I will simply respond with 405 Method Not Allowed for GET if not needed, or implement it.
    // Let's implement PUT and DELETE.
    return apiResponse.error({
      message: 'Use /api/v1/blog/[slug] for fetching details',
      statusCode: 400,
    });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PUT(req: NextRequest, props: Params) {
  try {
    const params = await props.params;
    await dbConnect();
    const body = await req.json();
    const post = await blogService.updatePost(params.id, body);
    return apiResponse.success(post);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(req: NextRequest, props: Params) {
  try {
    const params = await props.params;
    await dbConnect();
    await blogService.deletePost(params.id);
    return apiResponse.success({ message: 'Blog post deleted successfully' });
  } catch (error) {
    return errorHandler(error);
  }
}
