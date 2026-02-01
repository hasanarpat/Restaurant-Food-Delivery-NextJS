import React from 'react';
import Container from '@/components/ui/Container';

import { categoryService } from '@/modules/category/category.service';
import dbConnect from '@/lib/mongodb';
import MenuGrid from '@/components/MenuGrid'; // New Client Component
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const revalidate = 60; // ISR: Revalidate every 60 seconds

const MenuPage = async () => {
  await dbConnect();
  const categories = await categoryService.getAllCategories();

  // Transform to match UI expected format if needed
  // UI expects: { id, slug, title, desc, img, color }
  // DB returns: { _id, slug, title, desc, img, color, ... }
  // We need to map _id to id or ensure MenuList handles _id

  const parsedCategories = JSON.parse(JSON.stringify(categories)); // Serialization for SC -> CC

  return (
    <div className='min-h-screen bg-gradient-to-br from-cream via-white to-primary-50 pt-36 pb-16 md:pt-48 md:pb-24'>
      <Container>
        <Breadcrumbs items={[{ label: 'Menu' }]} />
        <MenuGrid categories={parsedCategories} />
      </Container>
    </div>
  );
};

export default MenuPage;
