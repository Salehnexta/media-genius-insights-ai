
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, LanguageContextType } from './language/types';
import { translations } from './language/translations';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Initialize language from localStorage or URL path
  const getInitialLanguage = (): Language => {
    // Check if current path starts with /ar
    const currentPath = window.location.pathname;
    if (currentPath.startsWith('/ar')) {
      return 'ar';
    }
    
    // Check localStorage for saved preference
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    if (savedLanguage && ['en', 'ar'].includes(savedLanguage)) {
      return savedLanguage;
    }
    
    return 'en';
  };

  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  // Save language preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('preferred-language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const setLanguagePreference = (lang: Language) => {
    setLanguage(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    toggleLanguage,
    setLanguage: setLanguagePreference,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Re-export types for convenience
export type { Language };
