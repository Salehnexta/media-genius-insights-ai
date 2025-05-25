
import { Translations } from '../types';
import { dashboardTranslations } from './dashboard';
import { authTranslations } from './auth';
import { profileTranslations } from './profile';
import { chartTranslations } from './charts';
import { datetimeTranslations } from './datetime';
import { metricsTranslations } from './metrics';
import { chatTranslations } from './chat';
import { onboardingTranslations } from './onboarding';
import { industriesTranslations } from './industries';

// Helper function to merge translation objects
const mergeTranslations = (...translationObjects: Translations[]): Translations => {
  const merged: Translations = { en: {}, ar: {} };
  
  translationObjects.forEach(translations => {
    Object.assign(merged.en, translations.en);
    Object.assign(merged.ar, translations.ar);
  });
  
  return merged;
};

export const translations = mergeTranslations(
  dashboardTranslations,
  authTranslations,
  profileTranslations,
  chartTranslations,
  datetimeTranslations,
  metricsTranslations,
  chatTranslations,
  onboardingTranslations,
  industriesTranslations
);
