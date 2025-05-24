
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Bot, Zap } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const Agents: React.FC = () => {
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
                {isArabic ? 'وكلاء الذكاء الاصطناعي' : 'AI Agents'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {isArabic ? 'أدر وكلاء الذكاء الاصطناعي لأتمتة مهامك التسويقية' : 'Manage AI agents to automate your marketing tasks'}
              </p>
            </div>
            <Button className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Plus className="h-4 w-4" />
              {isArabic ? 'وكيل جديد' : 'New Agent'}
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? 'وكلاء الذكاء الاصطناعي' : 'AI Agents'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {isArabic ? 'لا توجد وكلاء حتى الآن' : 'No agents yet'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {isArabic ? 'أنشئ وكلاء ذكاء اصطناعي لأتمتة مهامك' : 'Create AI agents to automate your tasks'}
                </p>
                <Button className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Plus className="h-4 w-4" />
                  {isArabic ? 'إنشاء وكيل' : 'Create Agent'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Agents;
