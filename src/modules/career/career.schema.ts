import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICareer extends Document {
  title: string;
  department: string;
  location: string;
  type:
    | 'Full-time'
    | 'Part-time'
    | 'Contract'
    | 'Internship'
    | 'Tam Zamanlı'
    | 'Yarı Zamanlı'
    | 'Sözleşmeli'
    | 'Staj';
  description: string;
  requirements: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const CareerSchema = new Schema<ICareer>(
  {
    title: { type: String, required: true, index: true },
    department: { type: String, required: true },
    location: { type: String, required: true },
    type: {
      type: String,
      enum: [
        'Full-time',
        'Part-time',
        'Contract',
        'Internship',
        'Tam Zamanlı',
        'Yarı Zamanlı',
        'Sözleşmeli',
        'Staj',
      ],
      required: true,
    },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    isActive: { type: Boolean, default: true, index: true },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
    versionKey: '__v',
  },
);

// Soft delete middleware
CareerSchema.pre('find', function () {
  this.where({ deletedAt: null });
});

CareerSchema.pre('findOne', function () {
  this.where({ deletedAt: null });
});

export const Career: Model<ICareer> =
  mongoose.models.Career || mongoose.model<ICareer>('Career', CareerSchema);
