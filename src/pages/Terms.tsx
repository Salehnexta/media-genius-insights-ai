
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import { Scale, Shield, Users, AlertTriangle, Calendar, Mail } from 'lucide-react';

const Terms = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const sections = [
    {
      title: isArabic ? 'قبول الشروط' : 'Acceptance of Terms',
      icon: Scale,
      content: isArabic 
        ? 'باستخدام منصة التسويق الذكي، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام خدماتنا.'
        : 'By using our AI Marketing Intelligence platform, you agree to be bound by these Terms and Conditions. If you do not agree to any of these terms, please do not use our services.'
    },
    {
      title: isArabic ? 'وصف الخدمة' : 'Service Description',
      icon: Users,
      content: isArabic
        ? 'نحن نقدم منصة تسويق ذكية تعتمد على الذكاء الاصطناعي لتحليل البيانات وتقديم التوصيات والرؤى التسويقية. تشمل خدماتنا إنشاء المحتوى، وتحليل الأداء، وإدارة الحملات التسويقية.'
        : 'We provide an AI-powered marketing intelligence platform that analyzes data and provides marketing recommendations and insights. Our services include content generation, performance analysis, and marketing campaign management.'
    },
    {
      title: isArabic ? 'التزامات المستخدم' : 'User Obligations',
      icon: Shield,
      content: isArabic
        ? 'يجب على المستخدمين تقديم معلومات دقيقة وصحيحة، واستخدام المنصة للأغراض المشروعة فقط، وعدم انتهاك حقوق الملكية الفكرية للآخرين.'
        : 'Users must provide accurate information, use the platform for lawful purposes only, and not violate intellectual property rights of others.'
    },
    {
      title: isArabic ? 'الملكية الفكرية' : 'Intellectual Property',
      icon: AlertTriangle,
      content: isArabic
        ? 'جميع المحتويات والتقنيات المستخدمة في المنصة محمية بحقوق الطبع والنشر والعلامات التجارية. يحتفظ المستخدمون بحقوق المحتوى الذي ينشئونه.'
        : 'All platform content and technology are protected by copyright and trademarks. Users retain rights to content they create.'
    },
    {
      title: isArabic ? 'سياسة الاسترداد' : 'Refund Policy',
      icon: Calendar,
      content: isArabic
        ? 'نقدم ضمان استرداد الأموال خلال 30 يوماً من تاريخ الاشتراك. الطلبات المقدمة بعد هذه المدة لن تكون مؤهلة للاسترداد.'
        : 'We offer a 30-day money-back guarantee from the subscription date. Requests after this period will not be eligible for refunds.'
    }
  ];

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {isArabic ? 'شروط الخدمة' : 'Terms of Service'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {isArabic ? 'آخر تحديث: 25 يناير 2025' : 'Last updated: January 25, 2025'}
          </p>
        </div>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <section.icon className="h-6 w-6 text-blue-600" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {section.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="my-8" />

        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Mail className="h-6 w-6 text-blue-600" />
              {isArabic ? 'تواصل معنا' : 'Contact Us'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {isArabic 
                ? 'إذا كانت لديك أي أسئلة حول هذه الشروط، يرجى التواصل معنا على: support@aimarketing.sa'
                : 'If you have any questions about these terms, please contact us at: support@aimarketing.sa'
              }
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Terms;
