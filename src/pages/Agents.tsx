
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import AIMarketingTeamEnhanced from '@/components/dashboard/AIMarketingTeamEnhanced';

const Agents: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : ''}`}>
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isArabic ? 'فريق التسويق الذكي' : 'AI Marketing Team'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {isArabic ? 'تفاعل مع فريق التسويق الذكي الخاص بك' : 'Interact with your AI marketing specialists'}
            </p>
          </div>

          <AIMarketingTeamEnhanced />
        </div>
      </div>
    </div>
  );
};

export default Agents;
