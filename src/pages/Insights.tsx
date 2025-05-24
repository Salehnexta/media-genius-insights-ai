
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, Target } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const Insights: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : ''}`}>
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isArabic ? 'الرؤى والتحليلات' : 'Insights & Analytics'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {isArabic ? 'احصل على رؤى عميقة حول أداء حملاتك التسويقية' : 'Get deep insights into your marketing campaign performance'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className={`flex items-center gap-2 text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <BarChart3 className="h-4 w-4" />
                  {isArabic ? 'إجمالي المشاهدات' : 'Total Views'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">0</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className={`flex items-center gap-2 text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Users className="h-4 w-4" />
                  {isArabic ? 'المتفاعلون' : 'Engagements'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">0</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className={`flex items-center gap-2 text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Target className="h-4 w-4" />
                  {isArabic ? 'معدل التحويل' : 'Conversion Rate'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">0%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className={`flex items-center gap-2 text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <TrendingUp className="h-4 w-4" />
                  {isArabic ? 'النمو' : 'Growth'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">0%</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? 'تحليلات مفصلة' : 'Detailed Analytics'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {isArabic ? 'لا توجد بيانات حتى الآن' : 'No data available yet'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {isArabic ? 'ابدأ بإنشاء حملات لرؤية التحليلات' : 'Start creating campaigns to see analytics'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Insights;
