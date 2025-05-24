
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, Activity } from 'lucide-react';

const AnalyticsReporting: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className={`space-y-6 ${isArabic ? 'rtl' : 'ltr'}`}>
      <div>
        <h1 className={`text-2xl font-bold text-gray-900 dark:text-white ${isArabic ? 'font-arabic' : ''}`}>
          {isArabic ? 'التحليلات والتقارير' : 'Analytics & Reporting'}
        </h1>
        <p className={`text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
          {isArabic ? 'تحليل شامل لأداء المنصة والمستخدمين' : 'Comprehensive platform and user performance analysis'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">1,234</div>
            <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'جلسات اليوم' : "Today's Sessions"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">67%</div>
            <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'معدل المشاركة' : 'Engagement Rate'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">4.8</div>
            <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'متوسط التقييم' : 'Average Rating'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">89%</div>
            <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'رضا المستخدمين' : 'User Satisfaction'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className={`${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'إحصائيات مفصلة' : 'Detailed Analytics'}
          </CardTitle>
          <CardDescription className={`${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'تحليل شامل لاستخدام المنصة والأداء' : 'Comprehensive platform usage and performance analysis'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className={`text-center py-8 text-gray-500 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'سيتم إضافة الرسوم البيانية والتحليلات هنا' : 'Charts and detailed analytics will be implemented here'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsReporting;
