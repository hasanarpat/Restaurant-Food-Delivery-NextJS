import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Category } from '../src/modules/category/category.schema';
import { Product } from '../src/modules/product/product.schema';

// Load .env.local
dotenv.config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

async function addMultiImageProduct() {
  if (!uri) {
    console.error('❌ MONGODB_URI is missing in .env.local');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB Connected');

    const pizzaCat = await Category.findOne({ slug: 'pizzas' });
    if (!pizzaCat) {
      throw new Error('Pizza category not found');
    }

    const newProduct = {
      title: 'Hawaiian Paradise',
      desc: 'A tropical delight with ham, pineapple, and extra cheese.',
      img: '/temporary/p3.png',
      // Using existing images for demonstration
      images: ['/temporary/p3.png', '/temporary/p4.png', '/temporary/p5.png'],
      price: 26.9,
      isFeatured: true,
      isAvailable: true,
      options: [
        { title: 'Small', additionalPrice: 0 },
        { title: 'Medium', additionalPrice: 4 },
        { title: 'Large', additionalPrice: 6 },
      ],
      categoryId: pizzaCat._id,
    };

    await Product.create(newProduct);
    console.log('✅ Added Hawaiian Paradise with multiple images');
  } catch (error) {
    console.error('Error adding product:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
    process.exit(0);
  }
}

addMultiImageProduct();
