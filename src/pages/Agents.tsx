
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import AIMarketingTeam from '@/components/dashboard/AIMarketingTeam';

const Agents: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : ''}`}>
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isArabic ? 'لوحة تحكم فريق التسويق الذكي' : 'AI Marketing Team Dashboard'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {isArabic ? 'راقب وأدر فريق التسويق الذكي الخاص بك' : 'Monitor and manage your AI marketing team members'}
            </p>
          </div>

          <AIMarketingTeam />
        </div>
      </div>
    </div>
  );
};

export default Agents;
