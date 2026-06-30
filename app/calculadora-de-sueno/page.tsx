import type { Metadata } from 'next';
import { LandingContent } from '../../components/LandingContent';

export const metadata: Metadata = {
  title: 'Calculadora de sueño',
  description: 'Calculá a qué hora dormir o despertar según ciclos aproximados de sueño. Gratis, privada y sin tracking.',
};

export default function CalculadoraDeSuenoPage() {
  return <LandingContent lang="es" />;
}
