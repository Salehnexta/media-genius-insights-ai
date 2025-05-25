
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Clock, Database } from 'lucide-react';

const DataRetentionSection: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-600" />
          {isArabic ? 'الاحتفاظ بالبيانات' : 'Data Retention'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">
            {isArabic ? 'فترات الاحتفاظ' : 'Retention Periods'}
          </h4>
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>
              {isArabic 
                ? 'بيانات الحساب: يتم الاحتفاظ بها طالما كان الحساب نشطاً'
                : 'Account data: Retained while account is active'
              }
            </li>
            <li>
              {isArabic
                ? 'محادثات الذكاء الاصطناعي: 90 يوماً من آخر نشاط'
                : 'AI conversations: 90 days from last activity'
              }
            </li>
            <li>
              {isArabic
                ? 'البيانات التحليلية: 2 سنة لأغراض التحسين'
                : 'Analytics data: 2 years for improvement purposes'
              }
            </li>
            <li>
              {isArabic
                ? 'ملفات السجل: 30 يوماً لأغراض الأمان'
                : 'Log files: 30 days for security purposes'
              }
            </li>
          </ul>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-4 h-4 text-blue-600" />
            <h4 className="font-semibold text-blue-900 dark:text-blue-100">
              {isArabic ? 'حذف البيانات' : 'Data Deletion'}
            </h4>
          </div>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            {isArabic
              ? 'يمكنك طلب حذف جميع بياناتك في أي وقت من خلال إعدادات الحساب أو بالاتصال بنا. سيتم الحذف خلال 30 يوماً من الطلب.'
              : 'You can request deletion of all your data at any time through account settings or by contacting us. Deletion will occur within 30 days of request.'
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataRetentionSection;
