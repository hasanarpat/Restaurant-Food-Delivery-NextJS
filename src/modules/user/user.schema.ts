import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAddress {
  title: string;
  line1: string;
  city: string;
  zip: string;
}

export interface IUser extends Document {
  email: string;
  passwordHash?: string;
  role: 'USER' | 'ADMIN' | 'STAFF';
  isVerified: boolean;
  phone?: string;
  profile: {
    fullName: string;
  };
  addresses: IAddress[];
  marketingOptIn: boolean;
  sessionVersion: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const AddressSchema = new Schema<IAddress>({
  title: { type: String, required: true },
  line1: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
});

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, select: false },
    role: {
      type: String,
      enum: ['USER', 'ADMIN', 'STAFF'],
      default: 'USER',
    },
    isVerified: { type: Boolean, default: false },
    phone: { type: String },
    profile: {
      fullName: { type: String, required: true },
    },
    addresses: [AddressSchema],
    marketingOptIn: { type: Boolean, default: false },
    sessionVersion: { type: Number, default: 1 },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
    versionKey: '__v',
  },
);

// Soft delete middleware
UserSchema.pre('find', function () {
  this.where({ deletedAt: null });
});

UserSchema.pre('findOne', function () {
  this.where({ deletedAt: null });
});

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
