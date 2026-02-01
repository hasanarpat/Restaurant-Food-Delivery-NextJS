export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import BranchesClient from './BranchesClient';

export const metadata: Metadata = {
  title: 'Şubelerimiz | Antepli Mutfağı',
  description:
    "Antepli Mutfağı şubelerimiz. İzmir'deki 5 farklı lokasyonumuzdan hizmet veriyoruz.",
  keywords: 'şubeler, lokasyonlar, adres, telefon, çalışma saatleri, İzmir',
};

export default function BranchesPage() {
  return <BranchesClient />;
}
