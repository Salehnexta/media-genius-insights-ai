
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import AIMarketingTeamEnhanced from '@/components/dashboard/AIMarketingTeamEnhanced';
import EnhancedChatSection from '@/components/dashboard/EnhancedChatSection';

const Agents: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  // Mock current metrics for chat context
  const currentMetrics = {
    totalUsers: 24567,
    conversionRate: 3.24,
    monthlyRevenue: 123456,
    pageViews: 897654,
    performance: 92
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl font-arabic' : ''}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className={`text-3xl font-bold text-gray-900 dark:text-white mb-2 ${isArabic ? 'text-right font-arabic' : ''}`}>
              {isArabic ? 'فريق التسويق الذكي' : 'AI Marketing Team'}
            </h1>
            <p className={`text-gray-600 dark:text-gray-300 ${isArabic ? 'text-right leading-relaxed' : ''}`}>
              {isArabic ? 'تفاعل مع فريق التسويق الذكي الخاص بك' : 'Interact with your AI marketing specialists'}
            </p>
          </div>

          {/* Main Content Grid with Persistent Chat */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* AI Marketing Team - Takes 3 columns */}
            <div className="lg:col-span-3">
              <AIMarketingTeamEnhanced />
            </div>

            {/* Persistent Chat Sidebar - Takes 1 column */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="mb-4">
                  <h2 className={`text-xl font-bold text-gray-900 dark:text-white mb-2 ${isArabic ? 'text-right font-arabic' : ''}`}>
                    {isArabic ? 'مساعد التسويق الذكي' : 'AI Marketing Assistant'}
                  </h2>
                  <p className={`text-sm text-gray-600 dark:text-gray-300 ${isArabic ? 'text-right leading-relaxed' : ''}`}>
                    {isArabic ? 'احصل على نصائح فورية ومخصصة' : 'Get instant personalized advice'}
                  </p>
                </div>
                <div className="h-[calc(100vh-12rem)]">
                  <EnhancedChatSection currentMetrics={currentMetrics} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agents;
