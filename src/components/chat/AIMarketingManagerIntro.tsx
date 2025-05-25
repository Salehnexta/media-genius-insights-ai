
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Users, Target, Zap } from 'lucide-react';

const AIMarketingManagerIntro: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className={`space-y-4 ${isArabic ? 'rtl' : ''}`}>
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
        <CardContent className="p-4">
          <div className={`flex items-start gap-3 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
            <div className="p-2 bg-blue-500 text-white rounded-lg">
              <Brain className="h-5 w-5" />
            </div>
            <div className={`flex-1 ${isArabic ? 'text-right' : ''}`}>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                {isArabic ? 'مرحباً! أنا مدير التسويق الذكي' : 'Hello! I\'m your AI Marketing Manager'}
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                {isArabic 
                  ? 'مرحباً بك في فريق التسويق الذكي الخاص بك! أنا هنا لتنسيق جميع الأنشطة التسويقية وضمان نجاح عملك.'
                  : 'Welcome to your AI Marketing Team! I\'m here to coordinate all marketing activities and ensure your business success.'
                }
              </p>
              
              <div className="space-y-2">
                <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">
                    {isArabic ? 'إدارة فريق من 8 خبراء تسويق ذكيين' : 'Managing a team of 8 AI marketing experts'}
                  </span>
                </div>
                <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Target className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">
                    {isArabic ? 'تطوير استراتيجيات تسويقية مخصصة' : 'Developing personalized marketing strategies'}
                  </span>
                </div>
                <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Zap className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">
                    {isArabic ? 'عمل متواصل 24/7 لضمان نمو عملك' : 'Working 24/7 to ensure your business growth'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h4 className={`font-semibold mb-3 ${isArabic ? 'text-right' : ''}`}>
            {isArabic ? 'كيف يمكنني مساعدتك اليوم؟' : 'How can I help you today?'}
          </h4>
          <div className="grid grid-cols-1 gap-2">
            <button className={`p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? '📊 عرض تقرير الأداء الأسبوعي' : '📊 Show weekly performance report'}
            </button>
            <button className={`p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? '🎯 تطوير استراتيجية تسويقية جديدة' : '🎯 Develop new marketing strategy'}
            </button>
            <button className={`p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? '👥 تعيين مهام للفريق' : '👥 Assign tasks to team members'}
            </button>
            <button className={`p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? '💡 اقتراح أفكار محتوى جديدة' : '💡 Suggest new content ideas'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIMarketingManagerIntro;
