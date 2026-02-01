import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { setServers } from 'dns';
import { Category } from '../src/modules/category/category.schema';
import { Product } from '../src/modules/product/product.schema';

// Force Google DNS to bypass local ISP filtering
setServers(['8.8.8.8']);

// Load .env.local
dotenv.config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

async function clearDatabase() {
  if (!uri) {
    console.error('❌ MONGODB_URI is missing in .env.local');
    process.exit(1);
  }

  console.log('🗑️  Starting database cleanup...\n');

  try {
    // Connect to MongoDB
    await mongoose.connect(uri);
    console.log('✅ MongoDB Connected\n');

    // Clear data
    console.log('🧹 Clearing collections...');
    const productCount = await Product.countDocuments();
    const categoryCount = await Category.countDocuments();

    await Product.deleteMany({});
    await Category.deleteMany({});

    console.log(`✅ Deleted ${productCount} products`);
    console.log(`✅ Deleted ${categoryCount} categories\n`);

    console.log('✨ Database cleared successfully!\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Cleanup failed:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

clearDatabase();
