
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { AlertTriangle } from 'lucide-react';

const SecuritySection: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          {isArabic ? 'أمان البيانات والاحتفاظ' : 'Data Security & Retention'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">
              {isArabic ? 'إجراءات الأمان' : 'Security Measures'}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {isArabic
                ? 'نطبق إجراءات أمان معيارية في الصناعة تشمل:'
                : 'We implement industry-standard security measures including:'
              }
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>
                {isArabic
                  ? 'التشفير من النهاية إلى النهاية لنقل البيانات'
                  : 'End-to-end encryption for data transmission'
                }
              </li>
              <li>
                {isArabic
                  ? 'تخزين آمن للبيانات مع ضوابط الوصول'
                  : 'Secure data storage with access controls'
                }
              </li>
              <li>
                {isArabic
                  ? 'عمليات تدقيق أمني منتظمة ومراقبة'
                  : 'Regular security audits and monitoring'
                }
              </li>
              <li>
                {isArabic
                  ? 'قيود الوصول لنماذج الذكاء الاصطناعي وتسجيل العمليات'
                  : 'AI model access restrictions and logging'
                }
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">
              {isArabic ? 'الاحتفاظ بالبيانات' : 'Data Retention'}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isArabic
                ? 'نحتفظ ببياناتك طالما كان حسابك نشطاً أو حسب الحاجة لتقديم الخدمات. يتم الاحتفاظ بتاريخ محادثات الذكاء الاصطناعي لمدة 12 شهراً لتحسين جودة الخدمة، ما لم تطلب الحذف المبكر.'
                : 'We retain your data for as long as your account is active or as needed to provide services. AI conversation history is retained for 12 months to improve service quality, unless you request earlier deletion.'
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySection;
