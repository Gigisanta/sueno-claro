import type { Metadata } from 'next';
import { LandingContent } from '../../components/LandingContent';

export const metadata: Metadata = {
  title: 'Nap Calculator',
  description: 'Plan a 20-minute power nap or a full-cycle nap with a private sleep calculator.',
};

export default function NapCalculatorPage() {
  return <LandingContent lang="en" />;
}
