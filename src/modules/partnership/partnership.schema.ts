import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPartnership extends Document {
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  businessType: string;
  message: string;
  status: 'Pending' | 'Reviewed' | 'Contacted' | 'Rejected';
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const PartnershipSchema = new Schema<IPartnership>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: String, required: true },
    companyName: { type: String },
    businessType: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Reviewed', 'Contacted', 'Rejected'],
      default: 'Pending',
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
PartnershipSchema.pre('find', function () {
  this.where({ deletedAt: null });
});

PartnershipSchema.pre('findOne', function () {
  this.where({ deletedAt: null });
});

export const Partnership: Model<IPartnership> =
  mongoose.models.Partnership ||
  mongoose.model<IPartnership>('Partnership', PartnershipSchema);
