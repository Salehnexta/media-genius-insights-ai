
import { Translations } from '../../types';
import { skillTranslations } from './skill';
import { businessTranslations } from './business';
import { websiteTranslations } from './website';
import { socialTranslations } from './social';
import { competitorsTranslations } from './competitors';
import { strategyTranslations } from './strategy';

// Base onboarding translations
const baseOnboardingTranslations: Translations = {
  en: {
    'onboarding.title': 'Welcome to Your AI Marketing Team',
    'onboarding.subtitle': 'Let\'s set up your personalized marketing dashboard in just a few steps',
    'onboarding.step': 'Step {{current}} of {{total}}',
    'onboarding.complete': 'Complete',
    'onboarding.next': 'Next',
    'onboarding.previous': 'Previous',
  },
  ar: {
    'onboarding.title': 'مرحباً بك في فريق التسويق الذكي',
    'onboarding.subtitle': 'دعنا نقوم بإعداد لوحة التسويق الشخصية الخاصة بك في بضع خطوات فقط',
    'onboarding.step': 'الخطوة {{current}} من {{total}}',
    'onboarding.complete': 'إكمال',
    'onboarding.next': 'التالي',
    'onboarding.previous': 'السابق',
  }
};

// Helper function to merge translation objects
const mergeTranslations = (...translationObjects: Translations[]): Translations => {
  const merged: Translations = { en: {}, ar: {} };
  
  translationObjects.forEach(translations => {
    Object.assign(merged.en, translations.en);
    Object.assign(merged.ar, translations.ar);
  });
  
  return merged;
};

export const onboardingTranslations = mergeTranslations(
  baseOnboardingTranslations,
  skillTranslations,
  businessTranslations,
  websiteTranslations,
  socialTranslations,
  competitorsTranslations,
  strategyTranslations
);
