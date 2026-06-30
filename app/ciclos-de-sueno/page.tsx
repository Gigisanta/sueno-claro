import type { Metadata } from 'next';
import { LandingContent } from '../../components/LandingContent';

export const metadata: Metadata = {
  title: 'Calculadora de ciclos de sueño',
  description: 'Planificá horarios alrededor de ciclos aproximados de sueño de 70 a 120 minutos.',
};

export default function CiclosDeSuenoPage() {
  return <LandingContent lang="es" />;
}
