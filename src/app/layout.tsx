import Navbar from '@/components/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Outfit, Poppins, Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import Notifications from '@/components/Notifications';
import { CartProvider } from '@/context/CartContext';
import { NotificationProvider } from '@/components/Notifications';
import { AuthProvider } from '@/contexts/AuthContext';

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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  ),
  title: {
    default: 'Antepli Pizza - Delicious Food Delivery',
    template: '%s | Antepli Pizza',
  },
  description:
    'Order delicious pizzas, burgers, and pasta from Antepli Pizza. Fresh ingredients, fast delivery, amazing taste!',
  openGraph: {
    title: 'Antepli Pizza - Delicious Food Delivery',
    description:
      'Order delicious pizzas, burgers, and pasta from Antepli Pizza. Fresh ingredients, fast delivery, amazing taste!',
    url: '/',
    siteName: 'Antepli Pizza',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Antepli Pizza - Delicious Food Delivery',
    description:
      'Order delicious pizzas, burgers, and pasta from Antepli Pizza. Fresh ingredients, fast delivery, amazing taste!',
  },
  icons: {
    icon: '/icon.png',
  },
  verification: {
    google: 'vV8iTEK_cYvsYsgwwxm3_6uc-eV3yekg0TBaaioRgaE',
  },
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
          <AuthProvider>
            <CartProvider>
              <Navbar />
              <Notifications />
              {children}
              <Footer />
            </CartProvider>
          </AuthProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
