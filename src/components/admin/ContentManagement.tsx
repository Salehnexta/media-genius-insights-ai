
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Image, Video, Calendar } from 'lucide-react';

const ContentManagement: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className={`space-y-6 ${isArabic ? 'rtl' : 'ltr'}`}>
      <div>
        <h1 className={`text-2xl font-bold text-gray-900 dark:text-white ${isArabic ? 'font-arabic' : ''}`}>
          {isArabic ? 'إدارة المحتوى' : 'Content Management'}
        </h1>
        <p className={`text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
          {isArabic ? 'مراجعة وإدارة المحتوى المُنتج بواسطة المستخدمين' : 'Review and manage user-generated content'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">1,234</div>
            <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'منشورات نصية' : 'Text Posts'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">567</div>
            <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'صور مُنتجة' : 'Generated Images'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">89</div>
            <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'مقاطع فيديو' : 'Video Content'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">45</div>
            <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'مراجعة مطلوبة' : 'Pending Review'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className={`${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'المحتوى الحديث' : 'Recent Content'}
          </CardTitle>
          <CardDescription className={`${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'آخر المحتوى المُنتج بواسطة المستخدمين' : 'Latest user-generated content'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className={`text-center py-8 text-gray-500 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'سيتم إضافة قائمة المحتوى هنا' : 'Content list will be implemented here'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagement;
