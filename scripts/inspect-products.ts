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

const listProducts = async () => {
  await dbConnect();
  try {
    const products = await Product.find({}, 'title isFeatured');
    console.log(`Total Products: ${products.length}`);
    const featured = products.filter((p) => p.isFeatured);
    console.log(`Currently Featured: ${featured.length}`);

    const baklavas = products.filter((p) =>
      p.title.toLowerCase().includes('baklava'),
    );
    console.log(`Baklavas found: ${baklavas.length}`);
    baklavas.forEach((p) =>
      console.log(`- ${p.title} (Featured: ${p.isFeatured})`),
    );
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
};

listProducts();
