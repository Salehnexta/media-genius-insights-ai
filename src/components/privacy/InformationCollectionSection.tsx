
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Database } from 'lucide-react';

const InformationCollectionSection: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5 text-green-600" />
          {isArabic ? 'المعلومات التي نجمعها' : 'Information We Collect'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">
              {isArabic ? 'معلومات الأعمال' : 'Business Information'}
            </h4>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>
                {isArabic
                  ? 'اسم الشركة والصناعة ورابط الموقع الإلكتروني'
                  : 'Company name, industry, and website URL'
                }
              </li>
              <li>
                {isArabic
                  ? 'حسابات وسائل التواصل الاجتماعي والأهداف التسويقية'
                  : 'Social media accounts and marketing goals'
                }
              </li>
              <li>
                {isArabic
                  ? 'معلومات المنافسين وبيانات تحليل السوق'
                  : 'Competitor information and market analysis data'
                }
              </li>
              <li>
                {isArabic
                  ? 'أداء الحملات والبيانات التحليلية'
                  : 'Campaign performance and analytics data'
                }
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">
              {isArabic ? 'بيانات التفاعل مع الذكاء الاصطناعي' : 'AI Interaction Data'}
            </h4>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>
                {isArabic
                  ? 'محادثات الدردشة مع وكلاء الذكاء الاصطناعي'
                  : 'Chat conversations with AI agents'
                }
              </li>
              <li>
                {isArabic
                  ? 'طلبات إنشاء المحتوى والنتائج'
                  : 'Content generation requests and outputs'
                }
              </li>
              <li>
                {isArabic
                  ? 'توصيات ورؤى الذكاء الاصطناعي المعروضة'
                  : 'AI recommendations and insights viewed'
                }
              </li>
              <li>
                {isArabic
                  ? 'أنماط الاستخدام واستخدام الميزات'
                  : 'Usage patterns and feature utilization'
                }
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InformationCollectionSection;
