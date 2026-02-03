import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProductOption {
  title: string;
  additionalPrice: number;
  maxSelect?: number;
}

export interface IProduct extends Document {
  title: string;
  desc: string;
  img?: string;
  images?: string[];
  price: number;
  isFeatured: boolean;
  isAvailable: boolean;
  prepTime?: number;
  calories?: number;
  allergens?: string[];
  excludableIngredients?: string[];
  rating?: number;
  numReviews?: number;
  options: IProductOption[];
  categoryId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const ProductOptionSchema = new Schema<IProductOption>({
  title: { type: String, required: true },
  additionalPrice: { type: Number, required: true },
  maxSelect: { type: Number },
});

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true, index: true },
    desc: { type: String, required: true },
    img: { type: String },
    images: [{ type: String }],
    price: { type: Number, required: true },
    isFeatured: { type: Boolean, default: false, index: true },
    isAvailable: { type: Boolean, default: true },
    prepTime: { type: Number }, // in minutes
    calories: { type: Number },
    allergens: [{ type: String }],
    excludableIngredients: [{ type: String }],
    rating: { type: Number, default: 0, min: 0, max: 5 },
    numReviews: { type: Number, default: 0 },
    options: [ProductOptionSchema],
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      index: true,
    },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
    versionKey: '__v',
  },
);

// Soft delete middleware
ProductSchema.pre('find', function () {
  this.where({ deletedAt: null });
});

ProductSchema.pre('findOne', function () {
  this.where({ deletedAt: null });
});

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
