import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { blogService } from '@/modules/blog/blog.service';
import { apiResponse } from '@/core/utils/response';
import { errorHandler } from '@/core/errors/errorHandler';

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(req: NextRequest, props: Params) {
  try {
    const params = await props.params;
    await dbConnect();
    // This route params is [slug], so it captures the slug
    // But if we want to support operations by ID (typical for admin), we might need another route or logic.
    // However, given SEO friendly URL requirements, operating by slug is also fine for GET.
    // Ideally backend admin panel might use ID.
    // For now, let's assume [slug] is used for public access.
    // If [slug] looks like an ObjectId, we could try ID lookup, but that's ambiguous.
    // Let's stick to slug for GET.

    const post = await blogService.getPostBySlug(params.slug);
    return apiResponse.success(post);
  } catch (error) {
    return errorHandler(error);
  }
}

// Note: For Update/Delete, usually ID is preferred to allow slug changes.
// Since we only have [slug] route here, we might have issues if we want to change the slug itself.
// But we can implement a separate [id] route if needed.
// For now, I will implement Update/Delete here utilizing slug, but beware of slug changes.
// Actually, `blogService.updatePost` takes ID. `getPostBySlug` returns the doc with _id.
// So this route is perfect for GET.
// For PUT/DELETE, let's create `api/v1/blog/id/[id]` to be safe?
// Or just use this route and find by slug, then update/delete.
// Update: `blogService.updatePost` requires ID.
// So I will create `api/v1/blog/id/[id]/route.ts` for management, and `api/v1/blog/[slug]/route.ts` for public viewing.
