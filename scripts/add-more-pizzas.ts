import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Category } from '../src/modules/category/category.schema';
import { Product } from '../src/modules/product/product.schema';

// Load .env.local
dotenv.config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

async function addPizzas() {
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

    const newPizzas = [
      {
        title: 'Supreme Meat',
        desc: 'Loaded with pepperoni, sausage, ham, bacon, and beef.',
        img: '/temporary/p1.png',
        price: 28.9,
        isFeatured: false,
        isAvailable: true,
        options: [
          { title: 'Small', additionalPrice: 0 },
          { title: 'Medium', additionalPrice: 4 },
          { title: 'Large', additionalPrice: 6 },
        ],
        categoryId: pizzaCat._id,
      },
      {
        title: 'Veggie Garden',
        desc: 'Fresh onions, peppers, mushrooms, olives, and tomatoes.',
        img: '/temporary/p11.png',
        price: 25.9,
        isFeatured: false,
        isAvailable: true,
        options: [
          { title: 'Small', additionalPrice: 0 },
          { title: 'Medium', additionalPrice: 4 },
          { title: 'Large', additionalPrice: 6 },
        ],
        categoryId: pizzaCat._id,
      },
      {
        title: 'Spicy Sausage',
        desc: 'Italian sausage, roasted red peppers, and chili flakes.',
        img: '/temporary/p12.png',
        price: 27.9,
        isFeatured: false,
        isAvailable: true,
        options: [
          { title: 'Small', additionalPrice: 0 },
          { title: 'Medium', additionalPrice: 4 },
          { title: 'Large', additionalPrice: 6 },
        ],
        categoryId: pizzaCat._id,
      },
    ];

    await Product.insertMany(newPizzas);
    console.log('✅ Added 3 new pizzas');
  } catch (error) {
    console.error('Error adding pizzas:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
    process.exit(0);
  }
}

addPizzas();
