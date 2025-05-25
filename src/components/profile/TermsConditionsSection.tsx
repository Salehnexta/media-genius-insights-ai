
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, Calendar, Shield, Eye, Gavel } from 'lucide-react';

interface TermsConditionsSectionProps {
  isArabic: boolean;
}

const TermsConditionsSection: React.FC<TermsConditionsSectionProps> = ({ isArabic }) => {
  const [activeTab, setActiveTab] = useState('terms');

  const lastUpdated = new Date('2024-01-15').toLocaleDateString(isArabic ? 'ar' : 'en');

  const termsContent = {
    terms: {
      title: isArabic ? 'شروط الاستخدام' : 'Terms of Use',
      icon: Gavel,
      sections: [
        {
          title: isArabic ? 'القبول بالشروط' : 'Acceptance of Terms',
          content: isArabic 
            ? 'باستخدامك لهذا النظام، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يجب عليك عدم استخدام النظام.'
            : 'By using this system, you agree to be bound by these terms and conditions. If you do not agree to any of these terms, you must not use the system.'
        },
        {
          title: isArabic ? 'استخدام النظام' : 'System Usage',
          content: isArabic 
            ? 'يُسمح لك باستخدام النظام للأغراض المشروعة فقط. لا يجوز لك استخدام النظام لأي أغراض غير قانونية أو محظورة.'
            : 'You are permitted to use the system for lawful purposes only. You may not use the system for any illegal or prohibited purposes.'
        },
        {
          title: isArabic ? 'المسؤولية' : 'Liability',
          content: isArabic 
            ? 'نحن غير مسؤولين عن أي أضرار مباشرة أو غير مباشرة قد تنتج عن استخدام النظام.'
            : 'We are not liable for any direct or indirect damages that may result from the use of the system.'
        }
      ]
    },
    privacy: {
      title: isArabic ? 'سياسة الخصوصية' : 'Privacy Policy',
      icon: Shield,
      sections: [
        {
          title: isArabic ? 'جمع البيانات' : 'Data Collection',
          content: isArabic 
            ? 'نجمع المعلومات التي تقدمها لنا مباشرة، مثل اسمك وعنوان بريدك الإلكتروني ومعلومات الاتصال الأخرى.'
            : 'We collect information you provide directly to us, such as your name, email address, and other contact information.'
        },
        {
          title: isArabic ? 'استخدام البيانات' : 'Data Usage',
          content: isArabic 
            ? 'نستخدم المعلومات التي نجمعها لتقديم الخدمات وتحسينها، والتواصل معك، وحماية النظام.'
            : 'We use the information we collect to provide and improve our services, communicate with you, and protect the system.'
        },
        {
          title: isArabic ? 'مشاركة البيانات' : 'Data Sharing',
          content: isArabic 
            ? 'لا نشارك معلوماتك الشخصية مع أطراف ثالثة إلا في الحالات المحددة في هذه السياسة.'
            : 'We do not share your personal information with third parties except as specified in this policy.'
        }
      ]
    },
    cookies: {
      title: isArabic ? 'سياسة ملفات تعريف الارتباط' : 'Cookie Policy',
      icon: Eye,
      sections: [
        {
          title: isArabic ? 'ما هي ملفات تعريف الارتباط' : 'What are Cookies',
          content: isArabic 
            ? 'ملفات تعريف الارتباط هي ملفات صغيرة يتم حفظها على جهازك عند زيارة موقعنا.'
            : 'Cookies are small files that are saved on your device when you visit our website.'
        },
        {
          title: isArabic ? 'كيف نستخدمها' : 'How We Use Them',
          content: isArabic 
            ? 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك، وحفظ تفضيلاتك، وتحليل استخدام الموقع.'
            : 'We use cookies to improve your experience, save your preferences, and analyze website usage.'
        }
      ]
    }
  };

  const handleDownloadPDF = (type: string) => {
    // Mock PDF download
    const content = termsContent[type as keyof typeof termsContent];
    console.log(`Downloading ${content.title} PDF...`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className={`flex items-center gap-3 text-blue-700 dark:text-blue-300 ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
            <FileText className="h-6 w-6" />
            {isArabic ? 'الشروط والأحكام' : 'Terms & Conditions'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div className={`${isArabic ? 'text-right' : ''}`}>
              <p className={`text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'آخر تحديث:' : 'Last updated:'} {lastUpdated}
              </p>
            </div>
            <Badge className="bg-green-600 text-white">
              <Calendar className="h-4 w-4 mr-1" />
              <span className={isArabic ? 'font-arabic' : ''}>
                {isArabic ? 'محدّث' : 'Updated'}
              </span>
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
            <CardTitle className={`${isArabic ? 'text-right font-arabic' : ''}`}>
              {isArabic ? 'الوثائق القانونية' : 'Legal Documents'}
            </CardTitle>
            <Button 
              variant="outline" 
              onClick={() => handleDownloadPDF(activeTab)}
              className={`${isArabic ? 'flex-row-reverse font-arabic' : ''}`}
            >
              <Download className="h-4 w-4" />
              {isArabic ? 'تحميل PDF' : 'Download PDF'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className={`grid w-full grid-cols-3 ${isArabic ? 'font-arabic' : ''}`}>
              {Object.entries(termsContent).map(([key, content]) => {
                const IconComponent = content.icon;
                return (
                  <TabsTrigger 
                    key={key} 
                    value={key}
                    className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="hidden md:inline">{content.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {Object.entries(termsContent).map(([key, content]) => (
              <TabsContent key={key} value={key} className="mt-8">
                <div className="space-y-6">
                  <div className={`${isArabic ? 'text-right' : ''}`}>
                    <h2 className={`text-2xl font-bold mb-4 ${isArabic ? 'font-arabic' : ''}`}>
                      {content.title}
                    </h2>
                    <p className={`text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                      {isArabic 
                        ? 'يرجى قراءة هذه الوثيقة بعناية قبل استخدام النظام.'
                        : 'Please read this document carefully before using the system.'
                      }
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-8">
                    {content.sections.map((section, index) => (
                      <div key={index} className={`${isArabic ? 'text-right' : ''}`}>
                        <h3 className={`text-lg font-semibold mb-3 text-blue-700 dark:text-blue-300 ${isArabic ? 'font-arabic' : ''}`}>
                          {index + 1}. {section.title}
                        </h3>
                        <div className={`p-4 bg-gray-50 dark:bg-gray-800 rounded-lg ${isArabic ? 'text-right' : ''}`}>
                          <p className={`text-gray-700 dark:text-gray-300 leading-relaxed ${isArabic ? 'font-arabic' : ''}`}>
                            {section.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {key === 'terms' && (
                    <div className={`mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 ${isArabic ? 'text-right' : ''}`}>
                      <h4 className={`font-semibold text-yellow-800 dark:text-yellow-300 mb-2 ${isArabic ? 'font-arabic' : ''}`}>
                        {isArabic ? 'إشعار مهم:' : 'Important Notice:'}
                      </h4>
                      <p className={`text-yellow-700 dark:text-yellow-400 ${isArabic ? 'font-arabic' : ''}`}>
                        {isArabic 
                          ? 'استخدامك المستمر للنظام يعني موافقتك على جميع الشروط والأحكام المذكورة أعلاه.'
                          : 'Your continued use of the system means you agree to all the terms and conditions mentioned above.'
                        }
                      </p>
                    </div>
                  )}

                  {key === 'privacy' && (
                    <div className={`mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 ${isArabic ? 'text-right' : ''}`}>
                      <h4 className={`font-semibold text-blue-800 dark:text-blue-300 mb-2 ${isArabic ? 'font-arabic' : ''}`}>
                        {isArabic ? 'حقوقك في الخصوصية:' : 'Your Privacy Rights:'}
                      </h4>
                      <ul className={`text-blue-700 dark:text-blue-400 space-y-1 ${isArabic ? 'font-arabic' : ''}`}>
                        <li className={`flex items-start gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                          <span className="text-blue-500">•</span>
                          {isArabic ? 'الحق في الوصول إلى بياناتك الشخصية' : 'Right to access your personal data'}
                        </li>
                        <li className={`flex items-start gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                          <span className="text-blue-500">•</span>
                          {isArabic ? 'الحق في تصحيح البيانات غير الصحيحة' : 'Right to correct inaccurate data'}
                        </li>
                        <li className={`flex items-start gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                          <span className="text-blue-500">•</span>
                          {isArabic ? 'الحق في حذف بياناتك الشخصية' : 'Right to delete your personal data'}
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className={`${isArabic ? 'text-right font-arabic' : ''}`}>
            {isArabic ? 'للاستفسارات القانونية' : 'Legal Inquiries'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`space-y-4 ${isArabic ? 'text-right' : ''}`}>
            <p className={`text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic 
                ? 'إذا كان لديك أي أسئلة حول هذه الشروط أو سياسة الخصوصية، يرجى التواصل معنا:'
                : 'If you have any questions about these terms or privacy policy, please contact us:'
              }
            </p>
            <div className={`p-4 bg-gray-50 dark:bg-gray-800 rounded-lg ${isArabic ? 'text-right' : ''}`}>
              <p className={`font-medium ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'البريد الإلكتروني القانوني:' : 'Legal Email:'} legal@example.com
              </p>
              <p className={`font-medium ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'العنوان:' : 'Address:'} {isArabic ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsConditionsSection;
