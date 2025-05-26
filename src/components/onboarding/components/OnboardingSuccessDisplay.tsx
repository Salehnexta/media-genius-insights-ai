
import React from 'react';
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OnboardingSuccessDisplayProps {
  isArabic: boolean;
  onContinue: () => void;
  userName?: string;
}

const OnboardingSuccessDisplay: React.FC<OnboardingSuccessDisplayProps> = ({
  isArabic,
  onContinue,
  userName
}) => {
  const successTexts = {
    en: {
      title: 'Setup Complete!',
      subtitle: 'Your marketing dashboard is ready',
      greeting: userName ? `Welcome, ${userName}!` : 'Welcome!',
      description: 'We\'ve personalized your experience based on your preferences. You can now access your full marketing toolkit.',
      features: [
        'AI-powered insights dashboard',
        'Automated competitor analysis',
        'Social media management tools',
        'Performance tracking & analytics'
      ],
      button: 'Go to Dashboard',
      note: 'You can always update your preferences in the settings'
    },
    ar: {
      title: 'تم الإعداد بنجاح!',
      subtitle: 'لوحة التحكم التسويقية جاهزة',
      greeting: userName ? `مرحباً، ${userName}!` : 'مرحباً!',
      description: 'لقد قمنا بتخصيص تجربتك بناءً على تفضيلاتك. يمكنك الآن الوصول إلى مجموعة أدواتك التسويقية الكاملة.',
      features: [
        'لوحة تحكم مدعومة بالذكاء الاصطناعي',
        'تحليل تلقائي للمنافسين',
        'أدوات إدارة وسائل التواصل الاجتماعي',
        'تتبع الأداء والتحليلات'
      ],
      button: 'انتقل إلى لوحة التحكم',
      note: 'يمكنك دائماً تحديث تفضيلاتك في الإعدادات'
    }
  };

  const texts = isArabic ? successTexts.ar : successTexts.en;

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 p-4 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <Card className="w-full max-w-2xl shadow-xl border-0">
        <CardHeader className={`text-center pb-6 ${isArabic ? 'text-right' : 'text-left'}`}>
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 relative">
            <CheckCircle className="w-12 h-12 text-green-600" />
            <Sparkles className="w-6 h-6 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <CardTitle className={`text-3xl font-bold text-green-700 dark:text-green-400 mb-2 ${isArabic ? 'font-arabic' : ''}`}>
            {texts.title}
          </CardTitle>
          <p className={`text-xl text-gray-600 dark:text-gray-300 ${isArabic ? 'font-arabic' : ''}`}>
            {texts.subtitle}
          </p>
        </CardHeader>
        
        <CardContent className={`space-y-8 ${isArabic ? 'text-right' : 'text-left'}`}>
          <div className="text-center">
            <h3 className={`text-2xl font-semibold mb-3 ${isArabic ? 'font-arabic' : ''}`}>
              {texts.greeting}
            </h3>
            <p className={`text-gray-700 dark:text-gray-300 leading-relaxed ${isArabic ? 'font-arabic' : ''}`}>
              {texts.description}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <h4 className={`font-semibold mb-4 text-gray-800 dark:text-gray-200 ${isArabic ? 'font-arabic text-right' : ''}`}>
              {isArabic ? 'الميزات المتاحة الآن:' : 'Features now available:'}
            </h4>
            <ul className={`space-y-3 ${isArabic ? 'text-right' : ''}`}>
              {texts.features.map((feature, index) => (
                <li key={index} className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}>
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center space-y-4">
            <Button 
              onClick={onContinue}
              size="lg"
              className={`bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold gap-3 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}
            >
              {texts.button}
              <ArrowRight className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`} />
            </Button>
            
            <p className={`text-sm text-gray-500 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
              {texts.note}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingSuccessDisplay;
