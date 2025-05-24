
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import RTLDashboardStats from '@/components/dashboard/RTLDashboardStats';
import EnhancedChatSection from '@/components/dashboard/EnhancedChatSection';
import AIMarketingTeamEnhanced from '@/components/dashboard/AIMarketingTeamEnhanced';

const Dashboard: React.FC = () => {
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
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className={`${isArabic ? 'text-right' : 'text-left'}`}>
            <h1 className={`text-3xl font-bold text-gray-900 dark:text-white mb-2 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'مرحباً بك في لوحة التحكم' : 'Welcome to Your Dashboard'}
            </h1>
            <p className={`text-gray-600 dark:text-gray-300 ${isArabic ? 'leading-relaxed' : ''}`}>
              {isArabic ? 'إليك نظرة شاملة على أداء منصتك التسويقية' : 'Here\'s a comprehensive overview of your marketing platform performance'}
            </p>
          </div>

          {/* Metrics Grid */}
          <RTLDashboardStats />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* AI Marketing Team */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className={`text-2xl font-bold text-gray-900 dark:text-white mb-2 ${isArabic ? 'text-right font-arabic' : ''}`}>
                  {isArabic ? 'فريق التسويق الذكي' : 'AI Marketing Team'}
                </h2>
                <p className={`text-gray-600 dark:text-gray-300 ${isArabic ? 'text-right leading-relaxed' : ''}`}>
                  {isArabic ? 'تفاعل مع فريق التسويق الذكي المتخصص' : 'Interact with your specialized AI marketing team'}
                </p>
              </div>
              <AIMarketingTeamEnhanced />
            </div>

            {/* Enhanced Chat Section */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h2 className={`text-2xl font-bold text-gray-900 dark:text-white mb-2 ${isArabic ? 'text-right font-arabic' : ''}`}>
                  {isArabic ? 'مساعد التسويق الذكي' : 'AI Marketing Assistant'}
                </h2>
                <p className={`text-gray-600 dark:text-gray-300 ${isArabic ? 'text-right leading-relaxed' : ''}`}>
                  {isArabic ? 'احصل على نصائح فورية ومخصصة' : 'Get instant personalized advice'}
                </p>
              </div>
              <div className="h-[600px]">
                <EnhancedChatSection currentMetrics={currentMetrics} />
              </div>
            </div>
          </div>

          {/* Additional Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className={`bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border ${isArabic ? 'rtl' : ''}`}>
              <h3 className={`text-lg font-semibold text-gray-900 dark:text-white mb-4 ${isArabic ? 'text-right font-arabic' : ''}`}>
                {isArabic ? 'الإنجازات الأخيرة' : 'Recent Achievements'}
              </h3>
              <div className="space-y-3">
                <div className={`flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span className={`text-sm font-medium text-green-800 dark:text-green-200 ${isArabic ? 'text-right' : ''}`}>
                    {isArabic ? 'تحسن معدل التحويل بنسبة 24%' : 'Conversion rate improved by 24%'}
                  </span>
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <div className={`flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span className={`text-sm font-medium text-blue-800 dark:text-blue-200 ${isArabic ? 'text-right' : ''}`}>
                    {isArabic ? 'إطلاق 5 حملات تسويقية جديدة' : 'Launched 5 new marketing campaigns'}
                  </span>
                  <span className="text-blue-600 font-bold">✓</span>
                </div>
                <div className={`flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span className={`text-sm font-medium text-purple-800 dark:text-purple-200 ${isArabic ? 'text-right' : ''}`}>
                    {isArabic ? 'زيادة المتابعين بنسبة 35%' : 'Social followers increased by 35%'}
                  </span>
                  <span className="text-purple-600 font-bold">✓</span>
                </div>
              </div>
            </div>

            <div className={`bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border ${isArabic ? 'rtl' : ''}`}>
              <h3 className={`text-lg font-semibold text-gray-900 dark:text-white mb-4 ${isArabic ? 'text-right font-arabic' : ''}`}>
                {isArabic ? 'المهام القادمة' : 'Upcoming Tasks'}
              </h3>
              <div className="space-y-3">
                <div className={`flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span className={`text-sm font-medium text-yellow-800 dark:text-yellow-200 ${isArabic ? 'text-right' : ''}`}>
                    {isArabic ? 'مراجعة محتوى الأسبوع القادم' : 'Review next week\'s content'}
                  </span>
                  <span className="text-yellow-600 font-bold">📋</span>
                </div>
                <div className={`flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span className={`text-sm font-medium text-orange-800 dark:text-orange-200 ${isArabic ? 'text-right' : ''}`}>
                    {isArabic ? 'تحليل أداء الحملة الحالية' : 'Analyze current campaign performance'}
                  </span>
                  <span className="text-orange-600 font-bold">📊</span>
                </div>
                <div className={`flex items-center justify-between p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span className={`text-sm font-medium text-pink-800 dark:text-pink-200 ${isArabic ? 'text-right' : ''}`}>
                    {isArabic ? 'جدولة منشورات وسائل التواصل' : 'Schedule social media posts'}
                  </span>
                  <span className="text-pink-600 font-bold">📱</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
