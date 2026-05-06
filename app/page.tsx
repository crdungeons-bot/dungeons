import { Navigation } from '@/components';
import Hero from '@/components/home/hero';
import Features from '@/components/home/features';
import CTA from '@/components/home/cta';

export default function Home() {
  return (
    <div>
      <Navigation />
      <Hero />
      <Features />
      <CTA />
    </div>
  );
}