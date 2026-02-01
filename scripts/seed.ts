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

// Category data
const categories = [
  {
    slug: 'pizzas',
    title: 'Cheesy Pizzas',
    desc: 'Pizza Paradise: Irresistible slices, mouthwatering toppings, and cheesy perfection.',
    img: '/images/category_pizza.png',
    color: 'bg-gradient-to-br from-red-500 to-orange-500',
    isActive: true,
    sortOrder: 1,
  },
  {
    slug: 'burgers',
    title: 'Juicy Burgers',
    desc: 'Burger Bliss: Juicy patties, bold flavors, and gourmet toppings galore.',
    img: '/images/category_burger.png',
    color: 'bg-gradient-to-br from-yellow-500 to-orange-600',
    isActive: true,
    sortOrder: 2,
  },
  {
    slug: 'pastas',
    title: 'Italian Pastas',
    desc: 'Savor the taste of perfection with our exquisite Italian handmade pasta menu.',
    img: '/images/category_pasta.png',
    color: 'bg-gradient-to-br from-green-500 to-teal-500',
    isActive: true,
    sortOrder: 3,
  },
  {
    slug: 'lahmacun',
    title: 'Crispy Lahmacun',
    desc: 'Traditional taste: Thin, crispy dough with seasoned minced meat.',
    img: '/images/category_lahmacun.png',
    color: 'bg-gradient-to-br from-orange-500 to-red-600',
    isActive: true,
    sortOrder: 4,
  },
  {
    slug: 'baklava',
    title: 'Sweet Baklava',
    desc: 'Dessert delight: Flaky pastry layers with nuts and syrup.',
    img: '/images/category_baklava.png',
    color: 'bg-gradient-to-br from-amber-500 to-yellow-600',
    isActive: true,
    sortOrder: 5,
  },
];

// Product data from src/data.ts
const pizzasData = [
  {
    id: 1,
    title: 'Sicilian',
    desc: 'Ignite your taste buds with a fiery combination of spicy pepperoni, jalapeños, crushed red pepper flakes, and melted mozzarella cheese, delivering a kick with every bite.',
    img: '/temporary/p1.png',
    price: 24.9,
    options: [
      { title: 'Small', additionalPrice: 0 },
      { title: 'Medium', additionalPrice: 4 },
      { title: 'Large', additionalPrice: 6 },
    ],
  },
  {
    id: 2,
    title: 'Mediterranean Delight',
    desc: 'Embark on a culinary journey with this Mediterranean-inspired creation, featuring zesty feta cheese, Kalamata olives, sun-dried tomatoes, and a sprinkle of oregano.',
    img: '/temporary/p8.png',
    price: 32.9,
    options: [
      { title: 'Small', additionalPrice: 0 },
      { title: 'Medium', additionalPrice: 4 },
      { title: 'Large', additionalPrice: 6 },
    ],
  },
  {
    id: 3,
    title: 'Bella Napoli',
    desc: 'A classic Italian delight featuring a thin, crispy crust, tangy tomato sauce, fresh mozzarella, and a medley of aromatic herbs topped with lettuce, tomatoes, and a dollop of tangy mayo.',
    img: '/temporary/p3.png',
    price: 26.9,
    options: [
      { title: 'Small', additionalPrice: 0 },
      { title: 'Medium', additionalPrice: 4 },
      { title: 'Large', additionalPrice: 6 },
    ],
  },
  {
    id: 4,
    title: 'Pesto Primavera',
    desc: 'A classic Italian delight featuring a thin, crispy crust, tangy tomato sauce, fresh mozzarella, and a medley of aromatic herbs topped with lettuce, tomatoes, and a dollop of tangy mayo.',
    img: '/temporary/p10.png',
    price: 28.9,
    options: [
      { title: 'Small', additionalPrice: 0 },
      { title: 'Medium', additionalPrice: 4 },
      { title: 'Large', additionalPrice: 6 },
    ],
  },
  {
    id: 5,
    title: 'Veggie Supreme',
    desc: 'A classic Italian delight featuring a thin, crispy crust, tangy tomato sauce, fresh mozzarella, and a medley of aromatic herbs topped with lettuce, tomatoes, and a dollop of tangy mayo.',
    img: '/temporary/p11.png',
    price: 24.9,
    options: [
      { title: 'Small', additionalPrice: 0 },
      { title: 'Medium', additionalPrice: 4 },
      { title: 'Large', additionalPrice: 6 },
    ],
  },
  {
    id: 6,
    title: 'Four Cheese Fantasy',
    desc: 'Experience pure cheesy bliss with a melty blend of mozzarella, cheddar, provolone, and Parmesan cheeses, creating a rich and indulgent pizza experience.',
    img: '/temporary/p12.png',
    price: 22.9,
    options: [
      { title: 'Small', additionalPrice: 0 },
      { title: 'Medium', additionalPrice: 4 },
      { title: 'Large', additionalPrice: 6 },
    ],
  },
  {
    id: 7,
    title: 'Margherita Magic',
    desc: 'A timeless favorite with a twist, showcasing a thin crust topped with sweet tomatoes, fresh basil, creamy mozzarella, and a drizzle of extra virgin olive oil, fresh arugula, and a drizzle of balsamic glaze.',
    img: '/temporary/p6.png',
    price: 24.9,
    options: [
      { title: 'Small', additionalPrice: 0 },
      { title: 'Medium', additionalPrice: 4 },
      { title: 'Large', additionalPrice: 6 },
    ],
  },
];

const burgersData = [
  {
    id: 21,
    title: 'Classic Burger',
    desc: 'A timeless favorite featuring a juicy beef patty, crisp lettuce, ripe tomatoes, pickles, onions, and our special sauce on a toasted sesame bun.',
    img: '/temporary/p2.png',
    price: 12.9,
    options: [
      { title: 'Small', additionalPrice: 0 },
      { title: 'Medium', additionalPrice: 3 },
      { title: 'Large', additionalPrice: 5 },
    ],
  },
  {
    id: 22,
    title: 'Bacon Deluxe',
    desc: 'Indulge in smoky goodness with a flame-grilled beef patty, topped with crispy bacon, melted cheddar cheese, caramelized onions, and a smattering of tangy BBQ sauce.',
    img: '/temporary/p5.png',
    price: 15.9,
    options: [
      { title: 'Small', additionalPrice: 0 },
      { title: 'Medium', additionalPrice: 3 },
      { title: 'Large', additionalPrice: 5 },
    ],
  },
  {
    id: 23,
    title: 'Jalapeño Fiesta',
    desc: 'Ignite your taste buds with a fiery kick! This burger features a succulent beef patty, fiery jalapeños, pepper jack cheese, and a zesty chipotle mayo sauce.',
    img: '/temporary/p9.png',
    price: 14.9,
    options: [
      { title: 'Small', additionalPrice: 0 },
      { title: 'Medium', additionalPrice: 3 },
      { title: 'Large', additionalPrice: 5 },
    ],
  },
  {
    id: 24,
    title: 'Hawaiian Teriyaki',
    desc: 'Experience a taste of the tropics with a juicy beef patty glazed in tangy teriyaki sauce, topped with grilled pineapple, crispy bacon, and fresh lettuce, and all the classic fixings on a toasted bun.',
    img: '/temporary/p2.png',
    price: 16.9,
    options: [
      { title: 'Small', additionalPrice: 0 },
      { title: 'Medium', additionalPrice: 3 },
      { title: 'Large', additionalPrice: 5 },
    ],
  },
];

const pastasData = [
  {
    id: 41,
    title: 'Spicy Arrabbiata',
    desc: 'Ignite your taste buds with this fiery pasta creation, combining penne in a spicy tomato sauce infused with garlic, red chili flakes, and fresh basil.',
    img: '/temporary/p4.png',
    price: 14.9,
    options: [
      { title: 'Small', additionalPrice: 0 },
      { title: 'Medium', additionalPrice: 4 },
      { title: 'Large', additionalPrice: 6 },
    ],
  },
  {
    id: 42,
    title: 'Garlic Parmesan Linguine',
    desc: "A garlic lover's delight, featuring linguine smothered in a creamy Parmesan sauce, infused with garlic and garnished with chopped parsley.",
    img: '/temporary/p7.png',
    price: 16.9,
    options: [
      { title: 'Small', additionalPrice: 0 },
      { title: 'Medium', additionalPrice: 4 },
      { title: 'Large', additionalPrice: 6 },
    ],
  },
  {
    id: 43,
    title: 'Carbonara Classic',
    desc: 'A Roman masterpiece with spaghetti tossed in a rich sauce of eggs, Pecorino Romano, crispy pancetta, and black pepper.',
    img: '/temporary/p4.png',
    price: 15.9,
    options: [
      { title: 'Small', additionalPrice: 0 },
      { title: 'Medium', additionalPrice: 4 },
      { title: 'Large', additionalPrice: 6 },
    ],
  },
  {
    id: 44,
    title: 'Pesto Primavera',
    desc: 'Fresh fettuccine tossed in vibrant basil pesto with cherry tomatoes, zucchini, and pine nuts for a light yet flavorful dish.',
    img: '/temporary/p7.png',
    price: 17.9,
    options: [
      { title: 'Small', additionalPrice: 0 },
      { title: 'Medium', additionalPrice: 4 },
      { title: 'Large', additionalPrice: 6 },
    ],
  },
];

const lahmacunData = [
  {
    id: 61,
    title: 'Classic Lahmacun',
    desc: 'Crispy thin dough topped with minced meat, fresh herbs, and spices. Served with lemon and parsley.',
    img: '/images/product_lahmacun_classic.png',
    price: 8.9,
    options: [
      { title: 'Small', additionalPrice: 0 },
      { title: 'Large', additionalPrice: 2 },
    ],
  },
  {
    id: 62,
    title: 'Spicy Lahmacun',
    desc: 'Our classic lahmacun with an extra kick of hot peppers and spicy tomato paste.',
    img: '/images/product_lahmacun_classic.png',
    price: 9.9,
    options: [
      { title: 'Small', additionalPrice: 0 },
      { title: 'Large', additionalPrice: 2 },
    ],
  },
  {
    id: 63,
    title: 'Cheese Lahmacun',
    desc: 'A twist on the classic, topped with a blend of melted cheeses for a savory delight.',
    img: '/images/product_lahmacun_cheese.png',
    price: 10.9,
    options: [
      { title: 'Small', additionalPrice: 0 },
      { title: 'Large', additionalPrice: 2 },
    ],
  },
];

const baklavaData = [
  {
    id: 81,
    title: 'Pistachio Baklava',
    desc: 'Layers of phyllo pastry filled with chopped pistachios and sweetened with syrup.',
    img: '/images/product_baklava_pistachio.png',
    price: 15.9,
    options: [
      { title: 'Small', additionalPrice: 0 },
      { title: 'Large', additionalPrice: 10 },
    ],
  },
  {
    id: 82,
    title: 'Walnut Baklava',
    desc: 'Traditional baklava filled with crushed walnuts and soaked in honey syrup.',
    img: '/images/product_baklava_pistachio.png',
    price: 14.9,
    options: [
      { title: 'Small', additionalPrice: 0 },
      { title: 'Large', additionalPrice: 10 },
    ],
  },
  {
    id: 83,
    title: 'Chocolate Baklava',
    desc: 'A modern twist with rich chocolate filling and glaze.',
    img: '/images/product_baklava_chocolate.png',
    price: 16.9,
    options: [
      { title: 'Small', additionalPrice: 0 },
      { title: 'Large', additionalPrice: 10 },
    ],
  },
];

async function seed() {
  if (!uri) {
    console.error('❌ MONGODB_URI is missing in .env.local');
    process.exit(1);
  }

  console.log('🌱 Starting database seeding...\n');

  try {
    // Connect to MongoDB
    await mongoose.connect(uri);
    console.log('✅ MongoDB Connected\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Create categories
    console.log('📁 Creating categories...');
    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ Created ${createdCategories.length} categories\n`);

    // Create maps for category lookup
    const pizzaCat = createdCategories.find((cat) => cat.slug === 'pizzas');
    const burgerCat = createdCategories.find((cat) => cat.slug === 'burgers');
    const pastaCat = createdCategories.find((cat) => cat.slug === 'pastas');
    const lahmacunCat = createdCategories.find(
      (cat) => cat.slug === 'lahmacun',
    );
    const baklavaCat = createdCategories.find((cat) => cat.slug === 'baklava');

    if (!pizzaCat || !burgerCat || !pastaCat || !lahmacunCat || !baklavaCat) {
      throw new Error('Failed to create categories');
    }

    // Prepare products with category IDs
    console.log('🍕 Creating products...');
    const productsToCreate = [
      ...pizzasData.map((p) => ({
        title: p.title,
        desc: p.desc,
        img: p.img,
        price: p.price,
        isFeatured: false,
        isAvailable: true,
        options: p.options,
        categoryId: pizzaCat._id,
      })),
      ...burgersData.map((p) => ({
        title: p.title,
        desc: p.desc,
        img: p.img,
        price: p.price,
        isFeatured: false,
        isAvailable: true,
        options: p.options,
        categoryId: burgerCat._id,
      })),
      ...pastasData.map((p) => ({
        title: p.title,
        desc: p.desc,
        img: p.img,
        price: p.price,
        isFeatured: false,
        isAvailable: true,
        options: p.options,
        categoryId: pastaCat._id,
      })),
      ...lahmacunData.map((p) => ({
        title: p.title,
        desc: p.desc,
        img: p.img,
        price: p.price,
        isFeatured: false,
        isAvailable: true,
        options: p.options,
        categoryId: lahmacunCat._id,
      })),
      ...baklavaData.map((p) => ({
        title: p.title,
        desc: p.desc,
        img: p.img,
        price: p.price,
        isFeatured: false,
        isAvailable: true,
        options: p.options,
        categoryId: baklavaCat._id,
      })),
    ];

    const createdProducts = await Product.insertMany(productsToCreate);
    console.log(`✅ Created ${createdProducts.length} products\n`);

    // Summary
    console.log('📊 Seeding Summary:');
    console.log(`   • Categories: ${createdCategories.length}`);
    console.log(`   • Products: ${createdProducts.length}`);
    console.log(`     - Pizzas: ${pizzasData.length}`);
    console.log(`     - Burgers: ${burgersData.length}`);
    console.log(`     - Pastas: ${pastasData.length}`);
    console.log(`     - Lahmacun: ${lahmacunData.length}`);
    console.log(`     - Baklava: ${baklavaData.length}`);
    console.log('\n✨ Database seeding completed successfully!\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seed();
