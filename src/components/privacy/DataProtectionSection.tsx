
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield } from 'lucide-react';

const DataProtectionSection: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          {isArabic ? 'حماية البيانات ومعالجة الذكاء الاصطناعي' : 'Data Protection & AI Processing'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700 dark:text-gray-300">
          {isArabic
            ? 'يلتزم فريق التسويق بحماية خصوصيتك وضمان التعامل الآمن مع بياناتك في منصة التسويق المدعومة بالذكاء الاصطناعي.'
            : 'MarketingGenius AI is committed to protecting your privacy and ensuring the secure handling of your data in our AI-powered marketing platform.'
          }
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            {isArabic ? 'معالجة بيانات الذكاء الاصطناعي' : 'AI Data Processing'}
          </h4>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            {isArabic
              ? 'قد تتم معالجة بياناتك بواسطة أنظمة الذكاء الاصطناعي (بما في ذلك نماذج GPT من OpenAI) لتقديم رؤى تسويقية مخصصة وإنشاء المحتوى والتوصيات الاستراتيجية. تتم جميع عمليات معالجة الذكاء الاصطناعي بشكل آمن ووفقاً للوائح حماية البيانات.'
              : 'Your data may be processed by AI systems (including OpenAI\'s GPT models) to provide personalized marketing insights, content generation, and strategic recommendations. All AI processing is done securely and in compliance with data protection regulations.'
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataProtectionSection;
