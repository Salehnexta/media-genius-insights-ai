
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Users } from 'lucide-react';

const DataSharingSection: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-orange-600" />
          {isArabic ? 'مشاركة البيانات والأطراف الثالثة' : 'Data Sharing & Third Parties'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
              {isArabic ? 'مقدمي خدمات الذكاء الاصطناعي' : 'AI Service Providers'}
            </h4>
            <p className="text-sm text-orange-800 dark:text-orange-200">
              {isArabic
                ? 'نستخدم OpenAI ومقدمي خدمات الذكاء الاصطناعي الآخرين لتقديم ميزاتنا الذكية. تتم معالجة بياناتك وفقاً لسياسات الخصوصية الخاصة بهم واتفاقيات معالجة البيانات.'
                : 'We use OpenAI and other AI service providers to deliver our intelligent features. Your data is processed according to their privacy policies and our data processing agreements.'
              }
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">
              {isArabic ? 'قد نشارك المعلومات مع:' : 'We may share information with:'}
            </h4>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>
                {isArabic
                  ? 'مقدمي خدمات الذكاء الاصطناعي (OpenAI، إلخ) للمعالجة والتحليل'
                  : 'AI service providers (OpenAI, etc.) for processing and analysis'
                }
              </li>
              <li>
                {isArabic
                  ? 'مقدمي التحليلات لمراقبة أداء المنصة'
                  : 'Analytics providers for platform performance monitoring'
                }
              </li>
              <li>
                {isArabic
                  ? 'معالجي المدفوعات لإدارة الاشتراكات'
                  : 'Payment processors for subscription management'
                }
              </li>
              <li>
                {isArabic
                  ? 'السلطات القانونية عند الطلب بموجب القانون'
                  : 'Legal authorities when required by law'
                }
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataSharingSection;
