import mongoose, { Schema, Document } from 'mongoose';

export interface IOffer extends Document {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  buttonText: string;
  buttonLink?: string;
  endDate: Date;
  isActive: boolean;
  badge?: string;
  stats?: {
    ordersToday: number;
    customersServed: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const OfferSchema = new Schema<IOffer>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    subtitle: {
      type: String,
      trim: true,
      maxlength: [100, 'Subtitle cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    originalPrice: {
      type: Number,
      min: [0, 'Original price cannot be negative'],
    },
    buttonText: {
      type: String,
      required: [true, 'Button text is required'],
      default: 'Order Now',
      maxlength: [50, 'Button text cannot exceed 50 characters'],
    },
    buttonLink: {
      type: String,
      default: '/menu',
      trim: true,
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    badge: {
      type: String,
      trim: true,
      maxlength: [30, 'Badge cannot exceed 30 characters'],
    },
    stats: {
      ordersToday: {
        type: Number,
        default: 0,
        min: 0,
      },
      customersServed: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
  },
  {
    timestamps: true,
  },
);

// Index for finding active offers
OfferSchema.index({ isActive: 1, endDate: 1 });

// Virtual for discount percentage
OfferSchema.virtual('discountPercentage').get(function () {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(
      ((this.originalPrice - this.price) / this.originalPrice) * 100,
    );
  }
  return 0;
});

// Method to check if offer is still valid
OfferSchema.methods.isValid = function () {
  return this.isActive && new Date(this.endDate) > new Date();
};

export const Offer =
  mongoose.models.Offer || mongoose.model<IOffer>('Offer', OfferSchema);
