import PartnershipClient from '@/app/partnership/PartnershipClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Franchise - İş Ortaklığı | Antepli Mutfağı',
  description:
    'Antepli Mutfağı franchise fırsatları ile kendi işinizin sahibi olun. Başarılı bir restoran zincirinin parçası olun.',
  keywords:
    'franchise, iş ortaklığı, yatırım, restoran franchise, antepli franchise',
};

export default function PartnershipPage() {
  return <PartnershipClient />;
}
