export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import GalleryClient from './GalleryClient';
import { getBaseUrl } from '@/core/utils/base-url';

export const metadata: Metadata = {
  title: 'Galeri - Anlarımız | Antepli Mutfağı',
  description:
    'Mutfağımızdan, ekibimizden ve güzel anlarımızdan fotoğraflar. Antepli Mutfağı ailesini tanıyın.',
  keywords: 'galeri, fotoğraflar, ekip, mutfak, ürünler, atmosfer',
};

const getGalleryItems = async () => {
  try {
    const baseUrl = await getBaseUrl();
    const res = await fetch(`${baseUrl}/api/v1/gallery`, {
      cache: 'no-store', // Next.js 15 might prefer defaults, but no-store is safe for SSR
    });
    if (!res.ok) {
      throw new Error('Failed to fetch gallery items');
    }
    const response = await res.json();
    return response.data || [];
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return [];
  }
};

export default async function GalleryPage() {
  const images = await getGalleryItems();
  return <GalleryClient initialImages={images} />;
}
