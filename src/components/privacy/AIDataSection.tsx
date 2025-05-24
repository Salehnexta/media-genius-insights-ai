
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Bot, Shield, AlertTriangle } from 'lucide-react';

const AIDataSection: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-purple-600" />
          {isArabic ? 'بيانات الذكاء الاصطناعي' : 'AI Data Processing'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">
            {isArabic ? 'كيف نستخدم بياناتك مع الذكاء الاصطناعي' : 'How We Use Your Data with AI'}
          </h4>
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>
              {isArabic 
                ? 'تحليل محتوى التسويق لتقديم اقتراحات مخصصة'
                : 'Analyzing marketing content to provide personalized suggestions'
              }
            </li>
            <li>
              {isArabic
                ? 'معالجة بيانات الحملات لتحسين الأداء'
                : 'Processing campaign data to optimize performance'
              }
            </li>
            <li>
              {isArabic
                ? 'إنشاء رؤى تسويقية بناءً على بيانات الصناعة'
                : 'Generating marketing insights based on industry data'
              }
            </li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-green-600" />
            <h4 className="font-semibold text-green-900 dark:text-green-100">
              {isArabic ? 'حماية البيانات' : 'Data Protection'}
            </h4>
          </div>
          <p className="text-sm text-green-800 dark:text-green-200">
            {isArabic
              ? 'جميع البيانات المرسلة إلى خدمات الذكاء الاصطناعي مشفرة ولا يتم تخزينها أو استخدامها لتدريب النماذج.'
              : 'All data sent to AI services is encrypted and not stored or used for model training.'
            }
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h4 className="font-semibold text-amber-900 dark:text-amber-100">
              {isArabic ? 'تحكم المستخدم' : 'User Control'}
            </h4>
          </div>
          <p className="text-sm text-amber-800 dark:text-amber-200">
            {isArabic
              ? 'يمكنك إيقاف معالجة الذكاء الاصطناعي لبياناتك في أي وقت من خلال إعدادات الحساب.'
              : 'You can opt out of AI processing of your data at any time through account settings.'
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIDataSection;
