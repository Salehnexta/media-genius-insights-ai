
export type Language = 'en' | 'ar';

export interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

export interface TranslationKeys {
  [key: string]: string;
}

export interface Translations {
  en: TranslationKeys;
  ar: TranslationKeys;
}
