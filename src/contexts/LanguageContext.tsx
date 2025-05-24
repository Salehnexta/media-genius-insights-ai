
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation object
const translations = {
  en: {
    'dashboard.title': 'Marketing Analytics Dashboard',
    'dashboard.subtitle': 'Track your marketing performance and insights',
    'time.today': 'Today',
    'time.yesterday': 'Yesterday',
    'time.7days': 'Last 7 days',
    'time.30days': 'Last 30 days',
    'time.90days': 'Last 90 days',
    'time.custom': 'Custom range',
    'export': 'Export',
    'chat.insights': 'AI Insights',
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.fullName': 'Full Name',
    'auth.username': 'Username',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.noAccount': "Don't have an account?",
    'auth.hasAccount': 'Already have an account?',
    'profile.title': 'Profile',
    'profile.personalInfo': 'Personal Information',
    'profile.companyInfo': 'Company Information',
    'campaigns.title': 'Campaigns',
    'campaigns.create': 'Create Campaign',
    'campaigns.name': 'Campaign Name',
    'campaigns.description': 'Description',
    'campaigns.budget': 'Budget',
    'campaigns.startDate': 'Start Date',
    'campaigns.endDate': 'End Date',
    'campaigns.status': 'Status',
    'campaigns.active': 'Active',
    'campaigns.paused': 'Paused',
    'campaigns.completed': 'Completed',
    'overview': 'Overview',
    'audience': 'Audience',
    'competitors': 'Competitors',
    'sentiment': 'Sentiment',
    'content.creator': 'Content Creator'
  },
  ar: {
    'dashboard.title': 'لوحة تحليلات التسويق',
    'dashboard.subtitle': 'تتبع أداء التسويق والرؤى الخاصة بك',
    'time.today': 'اليوم',
    'time.yesterday': 'أمس',
    'time.7days': 'آخر 7 أيام',
    'time.30days': 'آخر 30 يوم',
    'time.90days': 'آخر 90 يوم',
    'time.custom': 'فترة مخصصة',
    'export': 'تصدير',
    'chat.insights': 'رؤى الذكي الاصطناعي',
    'auth.login': 'تسجيل الدخول',
    'auth.signup': 'إنشاء حساب',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.confirmPassword': 'تأكيد كلمة المرور',
    'auth.fullName': 'الاسم الكامل',
    'auth.username': 'اسم المستخدم',
    'auth.forgotPassword': 'نسيت كلمة المرور؟',
    'auth.noAccount': 'ليس لديك حساب؟',
    'auth.hasAccount': 'لديك حساب بالفعل؟',
    'profile.title': 'الملف الشخصي',
    'profile.personalInfo': 'المعلومات الشخصية',
    'profile.companyInfo': 'معلومات الشركة',
    'campaigns.title': 'الحملات',
    'campaigns.create': 'إنشاء حملة',
    'campaigns.name': 'اسم الحملة',
    'campaigns.description': 'الوصف',
    'campaigns.budget': 'الميزانية',
    'campaigns.startDate': 'تاريخ البداية',
    'campaigns.endDate': 'تاريخ النهاية',
    'campaigns.status': 'الحالة',
    'campaigns.active': 'نشط',
    'campaigns.paused': 'متوقف',
    'campaigns.completed': 'مكتمل',
    'overview': 'نظرة عامة',
    'audience': 'الجمهور',
    'competitors': 'المنافسون',
    'sentiment': 'المشاعر',
    'content.creator': 'منشئ المحتوى'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    toggleLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
