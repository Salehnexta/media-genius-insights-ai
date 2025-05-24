
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Target, BarChart3, Brain, Users, Zap, TrendingUp, DollarSign } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { useIsMobile } from '@/hooks/use-mobile';

const Campaigns: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const isMobile = useIsMobile();

  const metrics = [
    {
      title: isArabic ? 'المبادرات النشطة' : 'Active Initiatives',
      value: '12',
      subtitle: isArabic ? 'يديرها فريق التسويق الذكي' : 'Managed by AI marketing team',
      icon: Brain,
      color: 'from-blue-500 to-blue-600',
      change: '+15%'
    },
    {
      title: isArabic ? 'أعضاء الفريق النشطون' : 'Active Team Members',
      value: '8',
      subtitle: isArabic ? 'خبراء ذكيين متخصصين' : 'Specialized AI experts',
      icon: Users,
      color: 'from-green-500 to-green-600',
      change: '+2'
    },
    {
      title: isArabic ? 'معدل النجاح' : 'Success Rate',
      value: '94%',
      subtitle: isArabic ? 'أداء فائق للفريق' : 'Superior team performance',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      change: '+4%'
    },
    {
      title: isArabic ? 'التوفير' : 'Cost Savings',
      value: '85%',
      subtitle: isArabic ? 'مقارنة بفريق تقليدي' : 'vs traditional team',
      icon: DollarSign,
      color: 'from-orange-500 to-orange-600',
      change: '+12%'
    }
  ];

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : ''}`}>
      <DashboardHeader />
      
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section - Mobile Optimized */}
          <div className={`flex flex-col gap-4 mb-8 ${isMobile ? '' : 'lg:flex-row lg:justify-between lg:items-center'}`}>
            <div className={isArabic ? 'text-right' : ''}>
              <h1 className={`text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'مركز التسويق الذكي' : 'AI Marketing Hub'}
              </h1>
              <p className={`text-gray-600 dark:text-gray-300 text-base lg:text-lg ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'مركز قيادة شامل لجميع أنشطة فريق التسويق الذكي' : 'Complete command center for all AI marketing team activities'}
              </p>
            </div>
            
            <Button 
              className={`flex items-center gap-2 h-12 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg touch-manipulation ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}
              style={{ minHeight: '48px' }}
            >
              <Plus className="h-5 w-5" />
              {isArabic ? 'مبادرة جديدة' : 'New Initiative'}
            </Button>
          </div>

          {/* Metrics Overview - Mobile Optimized */}
          <div className={`grid gap-4 mb-8 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
            {metrics.map((metric, index) => (
              <Card 
                key={index} 
                className={`overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-105 ${isMobile ? 'p-2' : ''}`}
              >
                <CardHeader className={`pb-3 ${isMobile ? 'pb-2' : ''}`}>
                  <CardTitle className={`flex items-center gap-3 text-base ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${metric.color} flex items-center justify-center ${isMobile ? 'w-8 h-8' : ''}`}>
                      <metric.icon className={`text-white ${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{metric.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className={isMobile ? 'pt-0' : ''}>
                  <div className={`flex items-center gap-2 mb-2 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
                    <p className={`font-bold text-gray-900 dark:text-white ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
                      {metric.value}
                    </p>
                    <span className={`text-green-600 dark:text-green-400 text-sm font-medium bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full ${isArabic ? 'font-arabic' : ''}`}>
                      {metric.change}
                    </span>
                  </div>
                  <p className={`text-gray-600 dark:text-gray-300 ${isMobile ? 'text-sm' : ''} ${isArabic ? 'text-right font-arabic' : ''}`}>
                    {metric.subtitle}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Card - Mobile Optimized */}
          <Card className="shadow-lg">
            <CardHeader className={isMobile ? 'p-4' : ''}>
              <CardTitle className={`text-xl lg:text-2xl ${isArabic ? 'text-right font-arabic' : ''}`}>
                {isArabic ? 'مبادرات فريق التسويق الذكي' : 'AI Marketing Team Initiatives'}
              </CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? 'p-4 pt-0' : ''}>
              <div className={`text-center ${isMobile ? 'py-8' : 'py-12'}`}>
                <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center ${isMobile ? 'w-12 h-12 mb-4' : ''}`}>
                  <Brain className={`text-blue-600 dark:text-blue-400 ${isMobile ? 'h-8 w-8' : 'h-10 w-10'}`} />
                </div>
                
                <h3 className={`font-semibold text-gray-900 dark:text-white mb-3 ${isMobile ? 'text-lg' : 'text-xl'} ${isArabic ? 'font-arabic' : ''}`}>
                  {isArabic ? 'فريقك جاهز للعمل' : 'Your Team is Ready to Work'}
                </h3>
                
                <p className={`text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto ${isMobile ? 'text-sm px-4' : 'text-base'} ${isArabic ? 'font-arabic' : ''}`}>
                  {isArabic ? 'فريق تسويق كامل مدعوم بالذكاء الاصطناعي يعمل 24/7 لنجاح عملك' : 'A complete AI-powered marketing team working 24/7 for your success'}
                </p>
                
                <div className={`space-y-3 mb-8 ${isMobile ? 'space-y-2 mb-6' : ''}`}>
                  <div className={`flex items-center gap-3 text-gray-600 dark:text-gray-300 ${isMobile ? 'text-sm' : ''} ${isArabic ? 'flex-row-reverse justify-center font-arabic' : 'justify-center'}`}>
                    <span>💼</span>
                    <span>{isArabic ? 'لماذا توظف عندما يمكنك الاعتماد على الذكاء الاصطناعي؟' : 'Why hire when you can AI?'}</span>
                  </div>
                  <div className={`flex items-center gap-3 text-gray-600 dark:text-gray-300 ${isMobile ? 'text-sm' : ''} ${isArabic ? 'flex-row-reverse justify-center font-arabic' : 'justify-center'}`}>
                    <span>🚀</span>
                    <span>{isArabic ? 'فريق تسويق احترافي لكل ميزانية' : 'Professional marketing for every budget'}</span>
                  </div>
                  <div className={`flex items-center gap-3 text-gray-600 dark:text-gray-300 ${isMobile ? 'text-sm' : ''} ${isArabic ? 'flex-row-reverse justify-center font-arabic' : 'justify-center'}`}>
                    <span>⚡</span>
                    <span>{isArabic ? 'فريق لا ينام أبداً - يعمل بلا توقف' : 'A team that never sleeps - always working'}</span>
                  </div>
                </div>
                
                <Button 
                  className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 touch-manipulation ${isMobile ? 'w-full h-12' : 'h-14'} ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}
                >
                  <Plus className="h-5 w-5" />
                  <span className="ml-2">{isArabic ? 'ابدأ مبادرة جديدة' : 'Start New Initiative'}</span>
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
