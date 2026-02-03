import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { Offer } from '../src/modules/offer/offer.schema';

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

const createSampleOffer = async () => {
  await dbConnect();

  try {
    // Deactivate all existing offers first
    await Offer.updateMany({}, { isActive: false });
    console.log('Deactivated all existing offers');

    // Create a new offer
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7); // 7 days from now

    const sampleOffer = await Offer.create({
      title: 'Special Deal of',
      subtitle: 'the Week!',
      description:
        'Indulge in our signature selection! Premium ingredients, authentic taste, and incredible value - all in one amazing deal.',
      image: '/offerProduct.png',
      price: 12.99,
      originalPrice: 19.99,
      buttonText: 'Order Now',
      buttonLink: '/menu',
      endDate: endDate,
      isActive: true,
      badge: 'Limited Time Offer',
      stats: {
        ordersToday: 1234,
        customersServed: 5678,
      },
    });

    console.log('Sample offer created successfully!');
    console.log('Offer ID:', sampleOffer._id);
    console.log('Title:', sampleOffer.title);
    console.log('Price:', sampleOffer.price);
    console.log('End Date:', sampleOffer.endDate);
  } catch (error) {
    console.error('Error creating sample offer:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
};

createSampleOffer();
