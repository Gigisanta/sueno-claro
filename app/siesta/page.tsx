import type { Metadata } from 'next';
import { LandingContent } from '../../components/LandingContent';

export const metadata: Metadata = {
  title: 'Calculadora de siesta',
  description: 'Planificá una siesta corta o de ciclo completo con una calculadora privada, gratis y sin tracking.',
};

export default function SiestaPage() {
  return <LandingContent lang="es" />;
}
