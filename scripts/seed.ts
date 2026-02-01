import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { setServers } from 'dns';
import { Category } from '../src/modules/category/category.schema';
import { Product } from '../src/modules/product/product.schema';
import { Career } from '../src/modules/career/career.schema';
import { Partnership } from '../src/modules/partnership/partnership.schema';
import { Branch } from '../src/modules/branch/branch.schema';
import { Gallery } from '../src/modules/gallery/gallery.schema';
import { Blog } from '../src/modules/blog/blog.schema';

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

// Careers Data
const careersData = [
  {
    title: 'Baş Aşçı',
    department: 'Mutfak',
    location: 'Alsancak Şubesi',
    type: 'Tam Zamanlı',
    description:
      'Mutfak ekibimize liderlik edecek, yenilikçi menüler geliştirecek deneyimli bir Baş Aşçı arıyoruz.',
    requirements: [
      '5+ yıl deneyim',
      'Liderlik becerileri',
      'Aşçılık diploması veya sertifikası',
      'Hijyen sertifikası',
    ],
    isActive: true,
  },
  {
    title: 'Pizzacı Ustası',
    department: 'Mutfak',
    location: 'Karşıyaka Şubesi',
    type: 'Tam Zamanlı',
    description:
      'Geleneksel hamur teknikleri bilen, pizza fırını konusunda deneyimli pizzacı ustası aranıyor.',
    requirements: [
      '3+ yıl pizza yapım deneyimi',
      'Fırın kullanımında uzman',
      'Hijyen sertifikası',
    ],
    isActive: true,
  },
  {
    title: 'Kurye',
    department: 'Teslimat',
    location: 'Bornova Şubesi',
    type: 'Yarı Zamanlı',
    description:
      'Akşam saatleri için güvenilir ve zamanında teslimat yapabilecek kurye elemanları aranıyor.',
    requirements: [
      'Geçerli ehliyet',
      'Bölge bilgisi',
      'Güvenilir araç',
      'İletişim becerileri',
    ],
    isActive: true,
  },
  {
    title: 'Restoran Müdürü',
    department: 'Yönetim',
    location: 'Konak Şubesi',
    type: 'Tam Zamanlı',
    description:
      'Günlük operasyonları yönetecek, müşteri memnuniyetini sağlayacak deneyimli restoran müdürü arıyoruz.',
    requirements: [
      '3+ yıl yöneticilik deneyimi',
      'Güçlü iletişim becerileri',
      'Ekip yönetimi deneyimi',
      'Problem çözme yeteneği',
    ],
    isActive: true,
  },
  {
    title: 'Garson / Servis Elemanı',
    department: 'Servis',
    location: 'Alsancak Şubesi',
    type: 'Tam Zamanlı',
    description:
      'Müşteri odaklı, enerjik ve pozitif garson adayları aramaktayız.',
    requirements: [
      'Müşteri hizmetleri deneyimi',
      'İletişim becerileri',
      'Takım çalışmasına yatkınlık',
      'Temiz ve bakımlı görünüm',
    ],
    isActive: true,
  },
  {
    title: 'Kasa Görevlisi',
    department: 'Servis',
    location: 'Buca Şubesi',
    type: 'Yarı Zamanlı',
    description:
      'Kasa ve ödeme işlemlerini yürütecek dikkatli ve güvenilir eleman aranıyor.',
    requirements: [
      'Temel bilgisayar bilgisi',
      'Dikkatli ve düzenli çalışma',
      'Matematikte yetkinlik',
    ],
    isActive: true,
  },
];

// Branches Data
const branchesData = [
  {
    name: 'Alsancak Şubesi',
    address: 'Kıbrıs Şehitleri Caddesi No: 145/A',
    city: 'İzmir',
    district: 'Alsancak',
    phone: '+90 232 421 5050',
    email: 'alsancak@antepli.com',
    workingHours: '09:00 - 23:00',
    coordinates: { lat: 38.4352, lng: 27.1438 },
    isActive: true,
    manager: 'Ahmet Yılmaz',
    rating: 4.8,
    reviews: [
      {
        user: 'Caner K.',
        comment: 'Harika atmosfer ve lezzetli yemekler. Lahmacun efsane!',
        rating: 5,
        date: '2024-01-15',
      },
      {
        user: 'Ayşe T.',
        comment: 'Servis biraz yavaştı ama yemekler sıcaktı.',
        rating: 4,
        date: '2024-01-20',
      },
    ],
  },
  {
    name: 'Karşıyaka Şubesi',
    address: 'Atatürk Bulvarı No: 234',
    city: 'İzmir',
    district: 'Karşıyaka',
    phone: '+90 232 369 7070',
    email: 'karsiyaka@antepli.com',
    workingHours: '10:00 - 23:00',
    coordinates: { lat: 38.4593, lng: 27.1107 },
    isActive: true,
    manager: 'Mehmet Öz',
    rating: 4.6,
    reviews: [
      {
        user: 'Selin B.',
        comment: "Karşıyaka'nın en iyi kebapçısı. Kesinlikle tavsiye ederim.",
        rating: 5,
        date: '2024-01-10',
      },
    ],
  },
  {
    name: 'Bornova Şubesi',
    address: 'Ege Üniversitesi Bulvarı No: 89',
    city: 'İzmir',
    district: 'Bornova',
    phone: '+90 232 373 8080',
    email: 'bornova@antepli.com',
    workingHours: '10:00 - 22:30',
    coordinates: { lat: 38.4622, lng: 27.2156 },
    isActive: true,
    manager: 'Zeynep Kaya',
    rating: 4.7,
    reviews: [
      {
        user: 'Barış D.',
        comment: 'Öğrenci dostu fiyatlar ve lezzetli menüler.',
        rating: 5,
        date: '2024-01-18',
      },
      {
        user: 'Elif S.',
        comment: 'Çok kalabalıktı ama personel ilgiliydi.',
        rating: 4,
        date: '2024-01-22',
      },
    ],
  },
  {
    name: 'Konak Şubesi',
    address: 'Cumhuriyet Meydanı No: 12',
    city: 'İzmir',
    district: 'Konak',
    phone: '+90 232 484 6060',
    email: 'konak@antepli.com',
    workingHours: '09:00 - 00:00',
    coordinates: { lat: 38.4189, lng: 27.1287 },
    isActive: true,
    manager: 'Mustafa Demir',
    rating: 4.9,
    reviews: [
      {
        user: 'Hakan Y.',
        comment: 'Manzara ve yemekler muhteşem. Özel günler için ideal.',
        rating: 5,
        date: '2024-01-05',
      },
    ],
  },
  {
    name: 'Buca Şubesi',
    address: 'Mustafa Kemal Paşa Caddesi No: 567',
    city: 'İzmir',
    district: 'Buca',
    phone: '+90 232 433 9090',
    email: 'buca@antepli.com',
    workingHours: '10:00 - 22:00',
    coordinates: { lat: 38.3927, lng: 27.1774 },
    isActive: true,
    manager: 'Fatma Çelik',
    rating: 4.5,
    reviews: [
      {
        user: 'Emre K.',
        comment: 'Eve sipariş verdik, çok hızlı geldi.',
        rating: 5,
        date: '2024-01-25',
      },
    ],
  },
];

// Gallery Data
const galleryData = [
  {
    title: 'Şık İç Mekan',
    imageUrl: '/images/gallery/interior-1.png',
    category: 'İç Mekan',
    description: 'Ana yemek salonumuzun atmosferi',
    isFeatured: true,
    order: 1,
  },
  {
    title: 'Özel Pizza',
    imageUrl: '/images/gallery/food-1.png',
    category: 'Yemek',
    description: 'Taş fırında pişmiş enfes pizza',
    isFeatured: true,
    order: 2,
  },
  {
    title: 'Canlı Müzik Gecesi',
    imageUrl: '/images/gallery/event-1.png',
    category: 'Etkinlik',
    description: 'Canlı müzik eşliğinde keyifli akşamlar',
    isFeatured: true,
    order: 3,
  },
  {
    title: 'Açık Mutfak',
    imageUrl: '/images/gallery/interior-1.png',
    category: 'İç Mekan',
    description: 'Şeffaf mutfağımızda tüm süreçleri görebilirsiniz',
    isFeatured: false,
    order: 4,
  },
  {
    title: 'Lahmacun Şöleni',
    imageUrl: '/images/gallery/food-1.png',
    category: 'Yemek',
    description: 'Geleneksel usul ince hamurlu lahmacun',
    isFeatured: false,
    order: 5,
  },
  {
    title: 'Aile Toplantısı',
    imageUrl: '/images/gallery/event-1.png',
    category: 'Etkinlik',
    description: 'Ailece keyifli yemek vakitleri',
    isFeatured: false,
    order: 6,
  },
  {
    title: 'Bahçe Alanımız',
    imageUrl: '/images/gallery/interior-1.png',
    category: 'İç Mekan',
    description: 'Açık havada yemek keyfi',
    isFeatured: false,
    order: 7,
  },
  {
    title: 'Tatlı Sunumu',
    imageUrl: '/images/gallery/food-1.png',
    category: 'Yemek',
    description: 'El yapımı fıstıklı baklava',
    isFeatured: false,
    order: 8,
  },
];

// Blog Data
const blogData = [
  {
    title: 'Mükemmel Hamur Yapmanın Sırları',
    slug: 'mukemmel-hamur-yapmak',
    excerpt:
      'Pizza hamurumuzun neden bu kadar hafif ve çıtır olduğunu keşfedin.',
    content:
      '<p>Her şey doğru un seçimi ve sabırla başlar. Hamurumuz 24 saat dinlendirilerek hazırlanır. İtalyan tipo 00 unu ve özel maya karışımımız ile lezzet doruklara ulaşır. Uzman pizzacılarımız her sabah elle yoğurarak hamurumuzu hazırlar.</p><p>Sıcaklık kontrolü ve nem oranı da mükemmel hamur için kritiktir. Özel fermentasyon odalarımızda hamurlarımız ideal koşullarda olgunlaşır.</p>',
    coverImage: '/images/blog/dough.png',
    author: 'Şef Mehmet',
    tags: ['Tarifler', 'Sırlar', 'Pizza'],
    isPublished: true,
    publishedAt: new Date(),
    readTime: 5,
  },
  {
    title: 'Bornova Şubemiz Açıldı!',
    slug: 'bornova-subesi',
    excerpt: "İzmir Bornova'da yeni şubemizi açmanın heyecanını yaşıyoruz!",
    content:
      '<p>Bu Cuma Bornova şubemizin büyük açılışı için sizleri bekliyoruz! İlk 100 müşteriye özel %25 indirim fırsatı. Canlı müzik ve sürpriz ikramlarla dolu bir açılış günü sizi bekliyor.</p><p>Ege Üniversitesi Bulvarı üzerindeki yeni şubemizde 150 kişilik kapalı alan ve açık bahçe mekanımızla hizmetinizdeyiz.</p>',
    coverImage: '/images/blog/opening.png',
    author: 'Yönetim',
    tags: ['Haberler', 'Etkinlik'],
    isPublished: true,
    publishedAt: new Date(),
    readTime: 3,
  },
  {
    title: 'Antep Mutfağının Kadim Lezzetleri',
    slug: 'antep-mutfagi',
    excerpt: "Gaziantep'in asırlık lezzet kültürünü masanıza taşıyoruz.",
    content:
      "<p>Antep mutfağı, Türk mutfağının en zengin ve köklü geleneklerinden birine sahiptir. Biz de bu mirası koruyarak, geleneksel tariflerimizi modern dokunuşlarla harmanlıyoruz.</p><p>Lahmacunumuz babadan oğula geçen tariflere sadık kalınarak hazırlanır. İnce hamur, taze kıyma ve özel baharat karışımı ile Antep sokaklarının tadını İzmir'de yaşatıyoruz.</p>",
    coverImage: '/images/blog/dough.png',
    author: 'Şef Mehmet',
    tags: ['Kültür', 'Antep', 'Geleneksel'],
    isPublished: true,
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    readTime: 6,
  },
  {
    title: 'Fıstıklı Baklavanın Hikayesi',
    slug: 'fistikli-baklava',
    excerpt: 'Antep fıstığının baklavaya dönüşme serüveni.',
    content:
      '<p>Baklava yapmak bir sanattır. Özellikle Antep fıstığı ile yapılan baklava, Türk tatlılarının zirvesidir. Her sabah taze yufkalarımızı açıyor, en kaliteli Antep fıstığı ile dolduruyoruz.</p><p>40 kat yufka, aralarında tereyağ ve fıstık... Fırından çıktığında üzerine sıcak şerbet dökülerek servise hazır hale geliyor. Her lokması bir bayram!</p>',
    coverImage: '/images/blog/opening.png',
    author: 'Tatlı Ustası Ayşe',
    tags: ['Tatlı', 'Baklava', 'Geleneksel'],
    isPublished: true,
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    readTime: 4,
  },
  {
    title: 'Organik Malzemelerle Sağlıklı Lezzet',
    slug: 'organik-malzemeler',
    excerpt: 'Çiftlikten sofraya konseptimizle sağlıklı beslenme.',
    content:
      '<p>Müşterilerimize en taze ve sağlıklı ürünleri sunmak için yerel çiftliklerle çalışıyoruz. Sebzelerimiz organik, etlerimiz hormon kullanılmadan yetiştirilmiş hayvanlardan...</p><p>Sürdürülebilir tarım ve sağlıklı beslenme konusunda bilinçli bir marka olarak, lezzetten ödün vermeden sağlığınızı düşünüyoruz.</p>',
    coverImage: '/images/blog/dough.png',
    author: 'Beslenme Uzmanı Zeynep',
    tags: ['Sağlık', 'Organik', 'Doğal'],
    isPublished: true,
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    readTime: 5,
  },
  {
    title: 'Canlı Müzik Geceleri Başlıyor',
    slug: 'canli-muzik-geceleri',
    excerpt: 'Her Cuma akşamı yerel sanatçılarla müzik dolu akşamlar.',
    content:
      "<p>Alsancak şubemizde her Cuma akşamı canlı müzik etkinlikleri başlıyor! Yerel sanatçılar eşliğinde lezzetli yemeklerinizi yerken müziğin keyfini çıkarın.</p><p>Rezervasyon yaptırmayı unutmayın, yerler sınırlı! Akustik gitardan cazz'a kadar farklı türlerde konserlerimiz olacak.</p>",
    coverImage: '/images/blog/opening.png',
    author: 'Etkinlik Koordinatörü Can',
    tags: ['Etkinlik', 'Müzik', 'Eğlence'],
    isPublished: true,
    publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    readTime: 3,
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
    await Promise.all([
      Product.deleteMany({}),
      Category.deleteMany({}),
      Career.deleteMany({}),
      Branch.deleteMany({}),
      Gallery.deleteMany({}),
      Blog.deleteMany({}),
      Partnership.deleteMany({}),
    ]);
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
        excludableIngredients: [
          'Soğan',
          'Zeytin',
          'Mantar',
          'Biber',
          'Sarımsak',
        ],
        rating: 4 + Math.random(),
        numReviews: Math.floor(Math.random() * 200) + 10,
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
        excludableIngredients: ['Soğan', 'Turşu', 'Marul', 'Domates', 'Peynir'],
        rating: 4 + Math.random(),
        numReviews: Math.floor(Math.random() * 200) + 10,
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
        excludableIngredients: [
          'Sarımsak',
          'Fesleğen',
          'Parmesan',
          'Pul Biber',
        ],
        rating: 4 + Math.random(),
        numReviews: Math.floor(Math.random() * 200) + 10,
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
        excludableIngredients: ['Soğan', 'Maydanoz', 'Limon', 'Domates'],
        rating: 4 + Math.random(),
        numReviews: Math.floor(Math.random() * 200) + 10,
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
        excludableIngredients: [], // Usually no custom exclusions for baklava
        rating: 4.5 + Math.random() * 0.5,
        numReviews: Math.floor(Math.random() * 200) + 10,
      })),
    ];

    const createdProducts = await Product.insertMany(productsToCreate);
    console.log(`✅ Created ${createdProducts.length} products\n`);

    // Creates Careers
    console.log('💼 Creating careers...');
    const createdCareers = await Career.insertMany(careersData);
    console.log(`✅ Created ${createdCareers.length} careers\n`);

    // Create Branches
    console.log('🏢 Creating branches...');
    const createdBranches = await Branch.insertMany(branchesData);
    console.log(`✅ Created ${createdBranches.length} branches\n`);

    // Create Gallery
    console.log('🖼️ Creating gallery items...');
    const createdGallery = await Gallery.insertMany(galleryData);
    console.log(`✅ Created ${createdGallery.length} gallery items\n`);

    // Create Blog
    console.log('📝 Creating blog posts...');
    const createdBlog = await Blog.insertMany(blogData);
    console.log(`✅ Created ${createdBlog.length} blog posts\n`);

    // Summary
    console.log('📊 Seeding Summary:');
    console.log(`   • Categories: ${createdCategories.length}`);
    console.log(`   • Products: ${createdProducts.length}`);
    console.log(`   • Careers: ${createdCareers.length}`);
    console.log(`   • Branches: ${createdBranches.length}`);
    console.log(`   • Gallery Items: ${createdGallery.length}`);
    console.log(`   • Blog Posts: ${createdBlog.length}`);

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
