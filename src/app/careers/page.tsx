import { Metadata } from 'next';
import CareersClient from './CareersClient';

export const metadata: Metadata = {
  title: 'Kariyer - Bize Katılın | Antepli Mutfağı',
  description:
    'Antepli Mutfağı ailesine katılın! Şef, garson, kurye ve daha fazla pozisyon için başvurun.',
  keywords:
    'kariyer, iş ilanları, şef, garson, kurye, restoran işleri, antepli kariyer',
};

export default function CareersPage() {
  return <CareersClient />;
}
