
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Database, Shield, Globe } from 'lucide-react';

const SystemConfiguration: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className={`space-y-6 ${isArabic ? 'rtl' : 'ltr'}`}>
      <div>
        <h1 className={`text-2xl font-bold text-gray-900 dark:text-white ${isArabic ? 'font-arabic' : ''}`}>
          {isArabic ? 'إعدادات النظام' : 'System Configuration'}
        </h1>
        <p className={`text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
          {isArabic ? 'إدارة إعدادات المنصة والأمان' : 'Manage platform settings and security'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}>
              <Settings className="h-5 w-5" />
              {isArabic ? 'إعدادات عامة' : 'General Settings'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`space-y-3 ${isArabic ? 'font-arabic' : ''}`}>
              <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span>{isArabic ? 'وضع الصيانة' : 'Maintenance Mode'}</span>
                <span className="text-green-600">{isArabic ? 'معطل' : 'Disabled'}</span>
              </div>
              <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span>{isArabic ? 'التسجيل الجديد' : 'New Registrations'}</span>
                <span className="text-green-600">{isArabic ? 'مفعل' : 'Enabled'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}>
              <Shield className="h-5 w-5" />
              {isArabic ? 'الأمان' : 'Security'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`space-y-3 ${isArabic ? 'font-arabic' : ''}`}>
              <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span>{isArabic ? 'المصادقة الثنائية' : '2FA Required'}</span>
                <span className="text-yellow-600">{isArabic ? 'اختياري' : 'Optional'}</span>
              </div>
              <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span>{isArabic ? 'تشفير البيانات' : 'Data Encryption'}</span>
                <span className="text-green-600">{isArabic ? 'مفعل' : 'Enabled'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemConfiguration;
