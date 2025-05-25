
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactSection: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <Card className="bg-gray-50 dark:bg-gray-800/50">
      <CardContent className="pt-6">
        <div className="text-center">
          <h3 className="font-semibold mb-2">
            {isArabic ? 'اتصل بنا حول الخصوصية' : 'Contact Us About Privacy'}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {isArabic
              ? 'للاستفسارات المتعلقة بالخصوصية أو لممارسة حقوقك، اتصل بمسؤول حماية البيانات:'
              : 'For privacy-related questions or to exercise your rights, contact our Data Protection Officer:'
            }
          </p>
          <div className="space-y-1 text-sm">
            <p><strong>{isArabic ? 'الشركة:' : 'Company:'}</strong> {isArabic ? 'نكستا المملكة العربية السعودية' : 'Nexta Saudi Arabia'}</p>
            <p><strong>{isArabic ? 'البريد الإلكتروني:' : 'Email:'}</strong> info@nexta.sa</p>
            <p><strong>{isArabic ? 'العنوان:' : 'Address:'}</strong> {isArabic ? 'الدمام الخبر، المملكة العربية السعودية' : 'Dammam Khobar, Saudi Arabia'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactSection;
