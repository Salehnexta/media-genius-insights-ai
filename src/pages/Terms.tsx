
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { FileText, Scale, AlertCircle, CreditCard, Bot, Shield } from 'lucide-react';

const Terms: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const isArabic = language === 'ar';

  // Check if user came from Arabic path and set language accordingly
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.startsWith('/ar')) {
      setLanguage('ar');
    }
  }, [setLanguage]);

  return (
    <div className={`container mx-auto px-4 py-8 ${isArabic ? 'rtl' : ''}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {isArabic ? 'شروط الخدمة' : 'Terms of Service'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {isArabic ? 'آخر تحديث:' : 'Last updated:'} {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                {isArabic ? 'الموافقة على الشروط' : 'Agreement to Terms'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {isArabic 
                  ? 'باستخدام منصة MarketingGenius AI، فإنك توافق على الالتزام بشروط الخدمة هذه وجميع القوانين واللوائح المعمول بها. إذا كنت لا توافق على أي من هذه الشروط، فأنت ممنوع من استخدام هذه الخدمة أو الوصول إليها.'
                  : 'By accessing and using MarketingGenius AI platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service.'
                }
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  {isArabic ? 'خدمة مدعومة بالذكاء الاصطناعي' : 'AI-Powered Service'}
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  {isArabic
                    ? 'يستخدم MarketingGenius AI الذكاء الاصطناعي، بما في ذلك نماذج اللغة الكبيرة، لتقديم رؤى تسويقية وإنتاج المحتوى والتوصيات الاستراتيجية. باستخدام خدمتنا، فإنك تقر وتوافق على معالجة الذكاء الاصطناعي لبياناتك.'
                    : 'MarketingGenius AI uses artificial intelligence, including large language models, to provide marketing insights, content generation, and strategic recommendations. By using our service, you acknowledge and agree to AI processing of your data.'
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-600" />
                {isArabic ? 'خدمات الذكاء الاصطناعي والقيود' : 'AI Services & Limitations'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">
                  {isArabic ? 'المحتوى المُنتج بالذكاء الاصطناعي' : 'AI-Generated Content'}
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>
                    {isArabic 
                      ? 'المحتوى المُنتج بالذكاء الاصطناعي مُقدم لأغراض إعلامية وإبداعية'
                      : 'AI-generated content is provided for informational and creative purposes'
                    }
                  </li>
                  <li>
                    {isArabic
                      ? 'أنت مسؤول عن مراجعة والتحقق من جميع توصيات الذكاء الاصطناعي'
                      : 'You are responsible for reviewing and validating all AI recommendations'
                    }
                  </li>
                  <li>
                    {isArabic
                      ? 'رؤى الذكاء الاصطناعي لا يجب اعتبارها نصائح مالية أو قانونية مهنية'
                      : 'AI insights should not be considered as professional financial or legal advice'
                    }
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                {isArabic ? 'الاشتراك والفوترة' : 'Subscription & Billing'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">
                  {isArabic ? 'خطط الاشتراك' : 'Subscription Plans'}
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>
                    {isArabic
                      ? 'دورات فوترة شهرية مع التجديد التلقائي'
                      : 'Monthly billing cycles with automatic renewal'
                    }
                  </li>
                  <li>
                    {isArabic
                      ? 'حدود رسائل الذكاء الاصطناعي حسب طبقة الاشتراك'
                      : 'AI message limits based on subscription tier'
                    }
                  </li>
                  <li>
                    {isArabic
                      ? 'قد تنطبق رسوم إضافية للاستخدام فوق حدود الخطة'
                      : 'Overage charges may apply for usage beyond plan limits'
                    }
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-orange-600" />
                {isArabic ? 'سياسة الاستخدام المقبول' : 'Acceptable Use Policy'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">
                    {isArabic ? 'الاستخدامات المحظورة' : 'Prohibited Uses'}
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>
                      {isArabic
                        ? 'إنتاج محتوى تسويقي مضلل أو كاذب أو خادع'
                        : 'Generating misleading, false, or deceptive marketing content'
                      }
                    </li>
                    <li>
                      {isArabic
                        ? 'إنشاء محتوى ينتهك حقوق الملكية الفكرية'
                        : 'Creating content that violates intellectual property rights'
                      }
                    </li>
                    <li>
                      {isArabic
                        ? 'مشاركة بيانات اعتماد الحساب أو إعادة بيع الوصول للذكاء الاصطناعي'
                        : 'Sharing account credentials or reselling AI access'
                      }
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-600" />
                {isArabic ? 'الملكية الفكرية' : 'Intellectual Property'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">
                    {isArabic ? 'ملكية المنصة' : 'Platform Ownership'}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isArabic
                      ? 'منصة MarketingGenius AI، بما في ذلك نماذج الذكاء الاصطناعي والخوارزميات والواجهة، مملوكة لنا ومحمية بقوانين الملكية الفكرية.'
                      : 'MarketingGenius AI platform, including its AI models, algorithms, and interface, is owned by us and protected by intellectual property laws.'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                {isArabic ? 'إخلاء المسؤولية والقيود' : 'Disclaimers & Limitations'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">
                    {isArabic ? 'توفر الخدمة' : 'Service Availability'}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isArabic
                      ? 'خدمات الذكاء الاصطناعي مُقدمة "كما هي" وقد تواجه توقفاً بسبب الصيانة أو التحديثات. نسعى لتحقيق 99.9% وقت تشغيل لكن لا يمكننا ضمان خدمة غير منقطعة.'
                      : 'AI services are provided "as is" and may experience downtime due to maintenance or updates. We strive for 99.9% uptime but cannot guarantee uninterrupted service.'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-800/50">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="font-semibold mb-2">
                  {isArabic ? 'معلومات الاتصال' : 'Contact Information'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {isArabic
                    ? 'للأسئلة حول هذه الشروط أو خدمات الذكاء الاصطناعي:'
                    : 'For questions about these terms or our AI services:'
                  }
                </p>
                <div className="space-y-1 text-sm">
                  <p>Email: legal@marketinggenius.ai</p>
                  <p>{isArabic ? 'عنوان العمل:' : 'Business Address:'} [Your Business Address]</p>
                  <p>{isArabic ? 'الهاتف:' : 'Phone:'} [Your Contact Number]</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms;
