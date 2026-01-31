import Navbar from '@/components/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Outfit, Poppins, Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import Notifications from '@/components/Notifications';
import { CartProvider } from '@/context/CartContext';
import { NotificationProvider } from '@/components/Notifications';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-ui',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kopernik Pizza - Delicious Food Delivery',
  description:
    'Order delicious pizzas, burgers, and pasta from Kopernik Pizza. Fresh ingredients, fast delivery, amazing taste!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${outfit.variable} ${poppins.variable} ${inter.variable}`}
    >
      <body className={`${inter.className} bg-cream text-gray-900`}>
        <NotificationProvider>
          <CartProvider>
            <Navbar />
            <Notifications />
            {children}
            <Footer />
          </CartProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
