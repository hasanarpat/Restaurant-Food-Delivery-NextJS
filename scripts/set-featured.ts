import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { Product } from '../src/modules/product/product.schema';

dotenv.config({ path: '.env.local' });
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined');
  process.exit(1);
}

const dbConnect = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('DB connection error:', error);
    process.exit(1);
  }
};

const setFeaturedProducts = async () => {
  await dbConnect();

  try {
    const products = await Product.find({});
    console.log(`Found ${products.length} products.`);

    if (products.length === 0) {
      console.log('No products found to update.');
      return;
    }

    // Set first 8 products as featured
    let count = 0;
    for (const product of products) {
      if (count < 8) {
        product.isFeatured = true;
        await product.save();
        console.log(`Marked ${product.title} as featured.`);
        count++;
      } else {
        // Un-feature others to keep it clean
        product.isFeatured = false;
        await product.save();
      }
    }

    console.log('Successfully updated featured products.');
  } catch (error) {
    console.error('Error updating products:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
};

setFeaturedProducts();
