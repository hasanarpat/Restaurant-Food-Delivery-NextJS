import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML or Markdown
  coverImage?: string;
  author: string;
  tags: string[];
  isPublished: boolean;
  publishedAt?: Date;
  readTime?: number; // Estimated read time in minutes
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    author: { type: String, required: true },
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date },
    readTime: { type: Number },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
    versionKey: '__v',
  },
);

// Soft delete middleware
BlogSchema.pre('find', function () {
  this.where({ deletedAt: null });
});

BlogSchema.pre('findOne', function () {
  this.where({ deletedAt: null });
});

export const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
