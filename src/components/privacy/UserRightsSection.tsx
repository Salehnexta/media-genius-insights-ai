
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Eye } from 'lucide-react';

const UserRightsSection: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-red-600" />
          {isArabic ? 'حقوقك والتحكم في البيانات' : 'Your Rights & Data Control'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">
              {isArabic ? 'الوصول والنقل' : 'Access & Portability'}
            </h4>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>
                {isArabic ? 'طلب الوصول إلى بياناتك' : 'Request access to your data'}
              </li>
              <li>
                {isArabic ? 'تصدير معلوماتك' : 'Export your information'}
              </li>
              <li>
                {isArabic ? 'عرض تاريخ تفاعل الذكاء الاصطناعي' : 'View AI interaction history'}
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">
              {isArabic ? 'الحذف والتصحيح' : 'Deletion & Correction'}
            </h4>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>
                {isArabic ? 'حذف حسابك وبياناتك' : 'Delete your account and data'}
              </li>
              <li>
                {isArabic ? 'تصحيح المعلومات غير الدقيقة' : 'Correct inaccurate information'}
              </li>
              <li>
                {isArabic ? 'إلغاء الاشتراك في معالجة الذكاء الاصطناعي' : 'Opt-out of AI processing'}
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserRightsSection;
