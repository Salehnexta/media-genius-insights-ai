
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    'app.title': 'MarketingGenius AI',
    'search.placeholder': 'Search dashboards...',
    'profile': 'Profile',
    'settings': 'Settings',
    'signout': 'Sign out',
    'chat.insights': 'Chat with Insights',
    'dashboard.title': 'Marketing Intelligence Dashboard',
    'dashboard.subtitle': 'Get comprehensive insights into your marketing performance',
    'time.today': 'Today',
    'time.yesterday': 'Yesterday',
    'time.7days': 'Last 7 days',
    'time.30days': 'Last 30 days',
    'time.90days': 'Last 90 days',
    'time.custom': 'Custom Range',
    'export': 'Export'
  },
  ar: {
    'app.title': 'عبقري التسويق الذكي',
    'search.placeholder': 'البحث في لوحات المعلومات...',
    'profile': 'الملف الشخصي',
    'settings': 'الإعدادات',
    'signout': 'تسجيل الخروج',
    'chat.insights': 'الدردشة مع الرؤى',
    'dashboard.title': 'لوحة معلومات الذكاء التسويقي',
    'dashboard.subtitle': 'احصل على رؤى شاملة حول أداء التسويق الخاص بك',
    'time.today': 'اليوم',
    'time.yesterday': 'أمس',
    'time.7days': 'آخر 7 أيام',
    'time.30days': 'آخر 30 يوماً',
    'time.90days': 'آخر 90 يوماً',
    'time.custom': 'نطاق مخصص',
    'export': 'تصدير'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
