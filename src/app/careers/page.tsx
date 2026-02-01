import { Metadata } from 'next';
import CareersClient from './CareersClient';
import { getBaseUrl } from '@/core/utils/base-url';

export const metadata: Metadata = {
  title: 'Kariyer - Bize Katılın | Antepli Mutfağı',
  description:
    'Antepli Mutfağı ailesine katılın! Şef, garson, kurye ve daha fazla pozisyon için başvurun.',
  keywords:
    'kariyer, iş ilanları, şef, garson, kurye, restoran işleri, antepli kariyer',
};

const getCareers = async () => {
  try {
    const baseUrl = await getBaseUrl();
    const res = await fetch(`${baseUrl}/api/v1/careers`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch careers');
    }
    const response = await res.json();
    return response.data || [];
  } catch (error) {
    console.error('Error fetching careers:', error);
    return [];
  }
};

export default async function CareersPage() {
  const careers = await getCareers();
  return <CareersClient initialPositions={careers} />;
}
