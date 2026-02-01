import { Gallery, IGallery } from './gallery.schema';

export class GalleryRepository {
  async findAll(filter: any = {}): Promise<IGallery[]> {
    return Gallery.find({ ...filter, deletedAt: null }).sort({
      order: 1,
      createdAt: -1,
    }); // Sort by order first, then newest
  }

  async findById(id: string): Promise<IGallery | null> {
    return Gallery.findById(id);
  }

  async create(data: Partial<IGallery>): Promise<IGallery> {
    return Gallery.create(data);
  }

  async update(id: string, data: Partial<IGallery>): Promise<IGallery | null> {
    return Gallery.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<IGallery | null> {
    return Gallery.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true },
    );
  }
}

export const galleryRepository = new GalleryRepository();
