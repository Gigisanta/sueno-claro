import type { Metadata } from 'next';
import { LandingContent } from '../../components/LandingContent';

export const metadata: Metadata = {
  title: 'Bedtime Calculator',
  description: 'Find what time to go to bed based on your wake-up target, fall-asleep time and estimated sleep cycles.',
};

export default function BedtimeCalculatorPage() {
  return <LandingContent lang="en" />;
}
