import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBranch extends Document {
  name: string;
  address: string;
  city: string;
  district: string;
  phone: string;
  email?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  workingHours: string; // e.g. "09:00 - 23:00"
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const BranchSchema = new Schema<IBranch>(
  {
    name: { type: String, required: true, index: true },
    address: { type: String, required: true },
    city: { type: String, required: true, index: true },
    district: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    workingHours: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
    versionKey: '__v',
  },
);

// Soft delete middleware
BranchSchema.pre('find', function () {
  this.where({ deletedAt: null });
});

BranchSchema.pre('findOne', function () {
  this.where({ deletedAt: null });
});

export const Branch: Model<IBranch> =
  mongoose.models.Branch || mongoose.model<IBranch>('Branch', BranchSchema);
