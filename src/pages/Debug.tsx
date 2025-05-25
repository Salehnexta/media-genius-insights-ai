
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bug, Code } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const Debug: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : ''}`}>
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isArabic ? 'أدوات التطوير' : 'Debug Tools'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {isArabic ? 'أدوات للمطورين واستكشاف الأخطاء' : 'Developer tools and debugging utilities'}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Bug className="h-5 w-5" />
                {isArabic ? 'أدوات التطوير' : 'Development Tools'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {isArabic ? 'وضع المطور' : 'Developer Mode'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {isArabic ? 'أدوات لاستكشاف الأخطاء وإصلاحها' : 'Tools for debugging and troubleshooting'}
                </p>
                <Button className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Bug className="h-4 w-4" />
                  {isArabic ? 'تفعيل وضع التطوير' : 'Enable Debug Mode'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Debug;
