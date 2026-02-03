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
    console.log(`Found ${products.length} products total.`);

    let featuredCount = 0;

    for (const product of products) {
      let shouldFeature = false;

      // Always feature Baklavas
      if (product.title.toLowerCase().includes('baklava')) {
        shouldFeature = true;
      }
      // Feature most others to verify infinite scroll (User asked for +12 items, 8+12=20, total is 21)
      // Let's just feature almost everything except maybe 1 to test filtering if needed,
      // or actually user asked to "add 12 more", so let's just feature 20 products.
      else if (featuredCount < 20) {
        shouldFeature = true;
      }

      if (shouldFeature) {
        product.isFeatured = true;
        await product.save();
        console.log(`Marked ${product.title} as featured.`);
        featuredCount++;
      }
    }

    console.log(`Finished. Total featured items processed: ${featuredCount}`);
  } catch (error) {
    console.error('Error updating products:', error);
  } finally {
    process.exit(0);
  }
};

setFeaturedProducts();
