import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { setServers } from 'dns';

// Force Google DNS
try {
  setServers(['8.8.8.8']);
} catch (e) {}

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined');
  process.exit(1);
}

// Inline Schema Definition to avoid Import issues in scripts
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
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
    addresses: [],
    marketingOptIn: { type: Boolean, default: false },
    sessionVersion: { type: Number, default: 1 },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

// Get or Create Model
const User = mongoose.models.User || mongoose.model('User', UserSchema);

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('🔌 Connected to MongoDB');

    const adminEmail = 'admin@antepli.com';
    const password = 'admin123';

    const existing = await User.findOne({ email: adminEmail });
    if (existing) {
      console.log('⚠️ Admin user already exists. Updating role...');
      existing.role = 'ADMIN';
      existing.passwordHash = await bcrypt.hash(password, 12);
      await existing.save();
      console.log('✅ Admin updated.');
    } else {
      const passwordHash = await bcrypt.hash(password, 12);
      await User.create({
        email: adminEmail,
        passwordHash,
        role: 'ADMIN',
        isVerified: true,
        profile: { fullName: 'Super Admin' },
        addresses: [],
        phone: '1112223344',
      });
      console.log('✅ Admin created.');
    }
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

createAdmin();
