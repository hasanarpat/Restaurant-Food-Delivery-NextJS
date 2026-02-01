import { galleryRepository } from './gallery.repository';
import { AppError } from '@/core/errors/AppError';
import { IGallery } from './gallery.schema';

export class GalleryService {
  async getAllImages(query: any = {}) {
    const filter: any = {};
    if (query.category) {
      filter.category = query.category;
    }
    if (query.isFeatured === 'true') {
      filter.isFeatured = true;
    }
    return galleryRepository.findAll(filter);
  }

  async getImageById(id: string) {
    const image = await galleryRepository.findById(id);
    if (!image) {
      throw new AppError({
        message: 'Gallery image not found',
        statusCode: 404,
        code: 'IMAGE_NOT_FOUND',
      });
    }
    return image;
  }

  async createImage(data: Partial<IGallery>) {
    return galleryRepository.create(data);
  }

  async updateImage(id: string, data: Partial<IGallery>) {
    const image = await galleryRepository.update(id, data);
    if (!image) {
      throw new AppError({
        message: 'Gallery image not found',
        statusCode: 404,
        code: 'IMAGE_NOT_FOUND',
      });
    }
    return image;
  }

  async deleteImage(id: string) {
    const image = await galleryRepository.delete(id);
    if (!image) {
      throw new AppError({
        message: 'Gallery image not found',
        statusCode: 404,
        code: 'IMAGE_NOT_FOUND',
      });
    }
    return image;
  }
}

export const galleryService = new GalleryService();
