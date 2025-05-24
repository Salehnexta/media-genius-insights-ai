
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Target, BarChart3 } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const Campaigns: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : ''}`}>
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className={`flex justify-between items-center mb-8 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {isArabic ? 'إدارة الحملات' : 'Campaign Management'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {isArabic ? 'أنشئ وأدر حملاتك التسويقية المدعومة بالذكاء الاصطناعي' : 'Create and manage your AI-powered marketing campaigns'}
              </p>
            </div>
            <Button className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Plus className="h-4 w-4" />
              {isArabic ? 'حملة جديدة' : 'New Campaign'}
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Target className="h-5 w-5" />
                  {isArabic ? 'الحملات النشطة' : 'Active Campaigns'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600">0</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isArabic ? 'حملة نشطة حالياً' : 'Currently active'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <BarChart3 className="h-5 w-5" />
                  {isArabic ? 'معدل النجاح' : 'Success Rate'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">--</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isArabic ? 'متوسط الأداء' : 'Average performance'}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{isArabic ? 'قائمة الحملات' : 'Campaign List'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {isArabic ? 'لا توجد حملات حتى الآن' : 'No campaigns yet'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {isArabic ? 'ابدأ بإنشاء حملتك التسويقية الأولى' : 'Start by creating your first marketing campaign'}
                </p>
                <Button className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Plus className="h-4 w-4" />
                  {isArabic ? 'إنشاء حملة' : 'Create Campaign'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
