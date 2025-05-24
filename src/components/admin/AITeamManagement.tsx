
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Brain, MessageSquare, TrendingUp } from 'lucide-react';

const AITeamManagement: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className={`space-y-6 ${isArabic ? 'rtl' : 'ltr'}`}>
      <div>
        <h1 className={`text-2xl font-bold text-gray-900 dark:text-white ${isArabic ? 'font-arabic' : ''}`}>
          {isArabic ? 'إدارة فريق الذكاء الاصطناعي' : 'AI Team Management'}
        </h1>
        <p className={`text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
          {isArabic ? 'إدارة وتكوين أعضاء فريق التسويق الذكي' : 'Manage and configure AI marketing team members'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}>
              <Bot className="h-5 w-5" />
              {isArabic ? 'مدير التسويق الذكي' : 'AI Marketing Manager'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-sm text-gray-600 dark:text-gray-400 mb-4 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'المسؤول عن الاستراتيجية والتخطيط' : 'Responsible for strategy and planning'}
            </p>
            <div className="space-y-2 text-sm">
              <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span>{isArabic ? 'المحادثات' : 'Conversations'}:</span>
                <span className="font-medium">1,234</span>
              </div>
              <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span>{isArabic ? 'معدل الرضا' : 'Satisfaction'}:</span>
                <span className="font-medium text-green-600">94%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}>
              <Brain className="h-5 w-5" />
              {isArabic ? 'منشئ المحتوى الذكي' : 'AI Content Creator'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-sm text-gray-600 dark:text-gray-400 mb-4 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'إنتاج المحتوى التسويقي والإبداعي' : 'Marketing content and creative production'}
            </p>
            <div className="space-y-2 text-sm">
              <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span>{isArabic ? 'المحتوى المُنتج' : 'Content Created'}:</span>
                <span className="font-medium">2,567</span>
              </div>
              <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span>{isArabic ? 'معدل الجودة' : 'Quality Score'}:</span>
                <span className="font-medium text-green-600">96%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}>
              <TrendingUp className="h-5 w-5" />
              {isArabic ? 'محلل البيانات الذكي' : 'AI Data Analyst'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-sm text-gray-600 dark:text-gray-400 mb-4 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'تحليل الأداء والإحصائيات' : 'Performance analysis and insights'}
            </p>
            <div className="space-y-2 text-sm">
              <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span>{isArabic ? 'التقارير' : 'Reports'}:</span>
                <span className="font-medium">456</span>
              </div>
              <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span>{isArabic ? 'دقة التنبؤات' : 'Prediction Accuracy'}:</span>
                <span className="font-medium text-green-600">91%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AITeamManagement;
