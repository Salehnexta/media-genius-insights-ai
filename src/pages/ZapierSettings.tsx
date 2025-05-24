
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import ZapierIntegration from '@/components/campaigns/ZapierIntegration';

const ZapierSettings = () => {
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
        <div className="max-w-4xl mx-auto">
          <ZapierIntegration />
        </div>
      </main>
    </div>
  );
};

export default ZapierSettings;
