import type { Metadata } from 'next';
import { LandingContent } from '../../components/LandingContent';

export const metadata: Metadata = {
  title: 'Sleep Calculator',
  description: 'Calculate bedtime and wake-up options around estimated 90-minute sleep cycles. Private, fast and free.',
};

export default function SleepCalculatorPage() {
  return <LandingContent lang="en" />;
}
