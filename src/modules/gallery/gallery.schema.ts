import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGallery extends Document {
  title: string;
  imageUrl: string;
  category: string; // e.g. "Interior", "Food", "Events"
  description?: string;
  isFeatured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const GallerySchema = new Schema<IGallery>(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true, index: true },
    description: { type: String },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
    versionKey: '__v',
  },
);

// Soft delete middleware
GallerySchema.pre('find', function () {
  this.where({ deletedAt: null });
});

GallerySchema.pre('findOne', function () {
  this.where({ deletedAt: null });
});

export const Gallery: Model<IGallery> =
  mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);
