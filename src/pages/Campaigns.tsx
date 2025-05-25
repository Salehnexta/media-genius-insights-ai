
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Target, BarChart3, Brain, Users, Zap } from 'lucide-react';
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
                {isArabic ? 'مركز التسويق الذكي' : 'AI Marketing Hub'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {isArabic ? 'مركز قيادة شامل لجميع أنشطة فريق التسويق الذكي' : 'Complete command center for all AI marketing team activities'}
              </p>
            </div>
            <Button className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Plus className="h-4 w-4" />
              {isArabic ? 'مبادرة جديدة' : 'New Initiative'}
            </Button>
          </div>

          {/* Team Activity Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Brain className="h-5 w-5" />
                  {isArabic ? 'المبادرات النشطة' : 'Active Initiatives'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600">12</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isArabic ? 'يديرها فريق التسويق الذكي' : 'Managed by AI marketing team'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Users className="h-5 w-5" />
                  {isArabic ? 'أعضاء الفريق النشطون' : 'Active Team Members'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">8</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isArabic ? 'خبراء ذكيين متخصصين' : 'Specialized AI experts'}
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
                <p className="text-3xl font-bold text-purple-600">94%</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isArabic ? 'أداء فائق للفريق' : 'Superior team performance'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Zap className="h-5 w-5" />
                  {isArabic ? 'التوفير' : 'Cost Savings'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-orange-600">85%</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isArabic ? 'مقارنة بفريق تقليدي' : 'vs traditional team'}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{isArabic ? 'مبادرات فريق التسويق الذكي' : 'AI Marketing Team Initiatives'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {isArabic ? 'فريقك جاهز للعمل' : 'Your Team is Ready to Work'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {isArabic ? 'فريق تسويق كامل مدعوم بالذكاء الاصطناعي يعمل 24/7 لنجاح عملك' : 'A complete AI-powered marketing team working 24/7 for your success'}
                </p>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    {isArabic ? '💼 لماذا توظف عندما يمكنك الاعتماد على الذكاء الاصطناعي؟' : '💼 Why hire when you can AI?'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {isArabic ? '🚀 فريق تسويق احترافي لكل ميزانية' : '🚀 Professional marketing for every budget'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {isArabic ? '⚡ فريق لا ينام أبداً - يعمل بلا توقف' : '⚡ A team that never sleeps - always working'}
                  </p>
                </div>
                <Button className={`flex items-center gap-2 mt-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Plus className="h-4 w-4" />
                  {isArabic ? 'ابدأ مبادرة جديدة' : 'Start New Initiative'}
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
