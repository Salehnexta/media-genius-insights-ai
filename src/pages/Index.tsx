
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import DashboardNavigation from '@/components/dashboard/DashboardNavigation';

const Index = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : ''}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="container mx-auto px-6 py-8">
        <div className={`mb-8 ${isArabic ? 'text-right' : ''}`}>
          <h1 className="text-3xl font-bold mb-2">
            {isArabic ? 'مرحباً بك في عبقري التسويق الذكي' : 'Welcome to MarketingGenius AI'}
          </h1>
          <p className="text-muted-foreground">
            {isArabic ? 'منصتك الشاملة للتسويق الذكي وإدارة الحملات' : 'Your comprehensive platform for intelligent marketing and campaign management'}
          </p>
        </div>
        <DashboardNavigation />
      </main>
    </div>
  );
};

export default Index;
