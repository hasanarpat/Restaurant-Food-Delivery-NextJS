import Featured from '@/components/Featured';
import Offer from '@/components/Offer';
import Slider from '@/components/Slider';
import AppDownload from '@/components/AppDownload';
import BenefitsShowcase from '@/components/BenefitsShowcase';
import HowItWorks from '@/components/HowItWorks';
import Partnership from '@/components/Partnership';

export default function Home() {
  return (
    <main>
      <Slider />
      <Featured />
      <Offer />
      <BenefitsShowcase />
      <HowItWorks />
      <AppDownload />
      <Partnership />
    </main>
  );
}
