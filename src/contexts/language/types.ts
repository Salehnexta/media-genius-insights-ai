
export type Language = 'en' | 'ar';

export interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

export interface TranslationKeys {
  [key: string]: string;
}

export interface Translations {
  en: TranslationKeys;
  ar: TranslationKeys;
}
