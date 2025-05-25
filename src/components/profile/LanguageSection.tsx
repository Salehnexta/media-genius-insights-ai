
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Languages, Check, Globe } from 'lucide-react';

interface LanguageSectionProps {
  currentLanguage: string;
  isArabic: boolean;
  onLanguageChange: () => void;
}

const LanguageSection: React.FC<LanguageSectionProps> = ({
  currentLanguage,
  isArabic,
  onLanguageChange
}) => {
  const languages = [
    {
      code: 'ar',
      name: 'العربية',
      englishName: 'Arabic',
      flag: '🇸🇦',
      direction: 'rtl'
    },
    {
      code: 'en',
      name: 'English',
      englishName: 'English',
      flag: '🇺🇸',
      direction: 'ltr'
    }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="space-y-8">
      {/* Current Language */}
      <Card className="border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className={`flex items-center gap-3 text-blue-700 dark:text-blue-300 ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
            <Globe className="h-6 w-6" />
            {isArabic ? 'اللغة الحالية' : 'Current Language'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div className="text-3xl">{currentLang?.flag}</div>
            <div className={`flex-1 ${isArabic ? 'text-right' : ''}`}>
              <h3 className={`text-lg font-semibold ${isArabic ? 'font-arabic' : ''}`}>
                {currentLang?.name}
              </h3>
              <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? `الاتجاه: ${currentLang?.direction === 'rtl' ? 'من اليمين إلى اليسار' : 'من اليسار إلى اليمين'}` : `Direction: ${currentLang?.direction?.toUpperCase()}`}
              </p>
            </div>
            <Badge className="bg-green-600 text-white">
              <Check className="h-4 w-4" />
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Language Selection */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
            <Languages className="h-5 w-5" />
            {isArabic ? 'اختيار اللغة' : 'Language Selection'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className={`text-gray-600 dark:text-gray-400 ${isArabic ? 'text-right font-arabic' : ''}`}>
              {isArabic 
                ? 'اختر اللغة المفضلة لعرض واجهة النظام. سيتم تطبيق التغيير فوراً على جميع أجزاء التطبيق.'
                : 'Choose your preferred language for the system interface. The change will be applied immediately across all parts of the application.'
              }
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {languages.map((language) => (
                <div
                  key={language.code}
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:border-blue-300 hover:shadow-md ${
                    currentLanguage === language.code 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-700'
                  } ${isArabic ? 'text-right' : ''}`}
                  onClick={() => {
                    if (currentLanguage !== language.code) {
                      onLanguageChange();
                    }
                  }}
                >
                  <div className={`flex items-center gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className="text-3xl">{language.flag}</div>
                    <div className={`flex-1 ${isArabic ? 'text-right' : ''}`}>
                      <h3 className={`text-lg font-semibold ${isArabic ? 'font-arabic' : ''}`}>
                        {language.name}
                      </h3>
                      <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                        {language.englishName}
                      </p>
                      <p className={`text-xs text-gray-500 ${isArabic ? 'font-arabic' : ''}`}>
                        {isArabic ? `الاتجاه: ${language.direction === 'rtl' ? 'من اليمين إلى اليسار' : 'من اليسار إلى اليمين'}` : `Direction: ${language.direction?.toUpperCase()}`}
                      </p>
                    </div>
                    {currentLanguage === language.code && (
                      <Badge className="bg-green-600 text-white">
                        <Check className="h-4 w-4" />
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Language Change Button */}
            <div className={`pt-4 ${isArabic ? 'text-right' : ''}`}>
              <Button 
                onClick={onLanguageChange}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Languages className="h-4 w-4 mr-2" />
                <span className={isArabic ? 'font-arabic' : ''}>
                  {isArabic 
                    ? `التبديل إلى ${currentLanguage === 'ar' ? 'English' : 'العربية'}`
                    : `Switch to ${currentLanguage === 'ar' ? 'English' : 'العربية'}`
                  }
                </span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language Information */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
            <Globe className="h-5 w-5" />
            {isArabic ? 'معلومات حول اللغات' : 'Language Information'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className={`p-4 bg-gray-50 dark:bg-gray-800 rounded-lg ${isArabic ? 'text-right' : ''}`}>
              <h4 className={`font-semibold mb-2 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'ملاحظات مهمة:' : 'Important Notes:'}
              </h4>
              <ul className={`space-y-2 text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                <li className={`flex items-start gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                  <span className="text-blue-500">•</span>
                  {isArabic 
                    ? 'سيتم تطبيق تغيير اللغة فوراً على جميع أجزاء التطبيق'
                    : 'Language changes will be applied immediately across the entire application'
                  }
                </li>
                <li className={`flex items-start gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                  <span className="text-blue-500">•</span>
                  {isArabic 
                    ? 'سيتم تغيير اتجاه النص تلقائياً حسب اللغة المختارة'
                    : 'Text direction will automatically adjust based on the selected language'
                  }
                </li>
                <li className={`flex items-start gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                  <span className="text-blue-500">•</span>
                  {isArabic 
                    ? 'ستبقى بياناتك وإعداداتك محفوظة عند تغيير اللغة'
                    : 'Your data and settings will remain preserved when changing languages'
                  }
                </li>
                <li className={`flex items-start gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                  <span className="text-blue-500">•</span>
                  {isArabic 
                    ? 'يمكنك التبديل بين اللغات في أي وقت'
                    : 'You can switch between languages at any time'
                  }
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguageSection;
