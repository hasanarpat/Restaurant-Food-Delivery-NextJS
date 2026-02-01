export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: 'Galeri - Anlarımız | Antepli Mutfağı',
  description:
    'Mutfağımızdan, ekibimizden ve güzel anlarımızdan fotoğraflar. Antepli Mutfağı ailesini tanıyın.',
  keywords: 'galeri, fotoğraflar, ekip, mutfak, ürünler, atmosfer',
};

export default function GalleryPage() {
  return <GalleryClient />;
}
