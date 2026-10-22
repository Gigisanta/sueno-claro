import { en, type LocaleCopy } from './en';
import { es } from './es';
import { ptBR } from './pt-BR';
import { fr } from './fr';
import { de } from './de';
import { it } from './it';
import type { Locale } from '../i18n';

// Select on the server; interactive components receive only the current copy.
export const localeCopy: Record<Locale, LocaleCopy> = { en, es, 'pt-BR': ptBR, fr, de, it };
