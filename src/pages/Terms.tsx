
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const sections = [
    {
      title: isArabic ? 'الشروط والأحكام' : 'Terms and Conditions',
      content: isArabic 
        ? 'مرحباً بك في منصة التسويق الذكي. باستخدام خدماتنا، فإنك توافق على هذه الشروط والأحكام.'
        : 'Welcome to our AI Marketing Platform. By using our services, you agree to these terms and conditions.'
    },
    {
      title: isArabic ? 'استخدام الخدمة' : 'Use of Service',
      content: isArabic
        ? 'يحق لك استخدام منصتنا للأغراض التجارية المشروعة. يُمنع استخدام الخدمة لأي أنشطة غير قانونية أو ضارة.'
        : 'You may use our platform for legitimate business purposes. Use of the service for any illegal or harmful activities is prohibited.'
    },
    {
      title: isArabic ? 'المحتوى المُنتج بالذكاء الاصطناعي' : 'AI-Generated Content',
      content: isArabic
        ? 'المحتوى المُنتج بواسطة الذكاء الاصطناعي مقدم "كما هو". أنت مسؤول عن مراجعة وتحرير أي محتوى قبل النشر.'
        : 'AI-generated content is provided "as is". You are responsible for reviewing and editing any content before publication.'
    },
    {
      title: isArabic ? 'الملكية الفكرية' : 'Intellectual Property',
      content: isArabic
        ? 'تحتفظ الشركة بجميع حقوق الملكية الفكرية للمنصة. المحتوى الذي تقوم بإنشاؤه يبقى ملكاً لك.'
        : 'We retain all intellectual property rights to the platform. Content you create remains your property.'
    },
    {
      title: isArabic ? 'قيود الاستخدام' : 'Usage Limitations',
      content: isArabic
        ? 'استخدام الخدمة محدود بحسب خطة اشتراكك. الاستخدام المفرط قد يؤدي إلى رسوم إضافية أو تقييد الحساب.'
        : 'Service usage is limited by your subscription plan. Excessive usage may result in additional charges or account restrictions.'
    },
    {
      title: isArabic ? 'الدفع والفوترة' : 'Payment and Billing',
      content: isArabic
        ? 'الدفع مطلوب مقدماً شهرياً. الأسعار قابلة للتغيير مع إشعار مسبق 30 يوماً.'
        : 'Payment is required monthly in advance. Prices are subject to change with 30 days notice.'
    },
    {
      title: isArabic ? 'إنهاء الخدمة' : 'Service Termination',
      content: isArabic
        ? 'يمكنك إلغاء اشتراكك في أي وقت. نحتفظ بالحق في إنهاء الحسابات التي تنتهك شروط الخدمة.'
        : 'You may cancel your subscription at any time. We reserve the right to terminate accounts that violate our terms of service.'
    },
    {
      title: isArabic ? 'إخلاء المسؤولية' : 'Disclaimer',
      content: isArabic
        ? 'الخدمة مقدمة "كما هي" بدون ضمانات. لا نتحمل مسؤولية أي أضرار ناتجة عن استخدام الخدمة.'
        : 'The service is provided "as is" without warranties. We are not liable for any damages resulting from use of the service.'
    },
    {
      title: isArabic ? 'القانون الساري' : 'Governing Law',
      content: isArabic
        ? 'تخضع هذه الشروط لقوانين المملكة العربية السعودية.'
        : 'These terms are governed by the laws of Saudi Arabia.'
    },
    {
      title: isArabic ? 'تعديل الشروط' : 'Terms Modification',
      content: isArabic
        ? 'نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إشعارك بأي تغييرات جوهرية.'
        : 'We reserve the right to modify these terms at any time. You will be notified of any material changes.'
    }
  ];

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isArabic ? 'الشروط والأحكام' : 'Terms of Service'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {isArabic ? 'آخر تحديث:' : 'Last updated:'} {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Information */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{isArabic ? 'اتصل بنا' : 'Contact Us'}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                {isArabic 
                  ? 'إذا كان لديك أسئلة حول هذه الشروط، يرجى التواصل معنا على:'
                  : 'If you have questions about these terms, please contact us at:'
                }
              </p>
              <p className="mt-2 font-medium">support@aimarketing.sa</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms;
