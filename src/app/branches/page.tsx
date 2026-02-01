export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import BranchesClient from './BranchesClient';
import { getBaseUrl } from '@/core/utils/base-url';

export const metadata: Metadata = {
  title: 'Şubelerimiz | Antepli Mutfağı',
  description:
    "Antepli Mutfağı şubelerimiz. İzmir'deki 5 farklı lokasyonumuzdan hizmet veriyoruz.",
  keywords: 'şubeler, lokasyonlar, adres, telefon, çalışma saatleri, İzmir',
};

const getBranches = async () => {
  try {
    const baseUrl = await getBaseUrl();
    const res = await fetch(`${baseUrl}/api/v1/branches`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch branches');
    }
    const response = await res.json();
    return response.data || [];
  } catch (error) {
    console.error('Error fetching branches:', error);
    return [];
  }
};

export default async function BranchesPage() {
  const branches = await getBranches();
  return <BranchesClient initialBranches={branches} />;
}
