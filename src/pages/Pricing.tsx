
import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle, Zap, Users, Crown, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DynamicPricingCards from '@/components/pricing/DynamicPricingCards';

const Pricing: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const isArabic = language === 'ar';

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.startsWith('/ar')) {
      setLanguage('ar');
    }
  }, [setLanguage]);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 ${isArabic ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {isArabic ? 'خطط الأسعار' : 'Pricing Plans'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {isArabic 
              ? 'اختر الخطة المناسبة لاحتياجات عملك مع قوة الذكاء الاصطناعي'
              : 'Choose the perfect plan for your business needs with AI-powered marketing intelligence'
            }
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>{isArabic ? 'بدون رسوم إعداد' : 'No setup fees'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>{isArabic ? 'إلغاء في أي وقت' : 'Cancel anytime'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>{isArabic ? 'دعم 24/7' : '24/7 support'}</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mb-16">
          <DynamicPricingCards />
        </div>

        {/* AI Features Section */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                🤖 {isArabic ? 'ميزات الذكاء الاصطناعي المتقدمة' : 'Advanced AI Features'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: Users,
                    title: isArabic ? 'وكلاء ذكيون متخصصون' : 'Specialized AI Agents',
                    description: isArabic ? 'وكلاء للاستراتيجية والتحليل والمحتوى' : 'Agents for strategy, analysis, and content'
                  },
                  {
                    icon: Zap,
                    title: isArabic ? 'رؤى فورية' : 'Instant Insights',
                    description: isArabic ? 'تحليلات مدعومة بـ GPT-4' : 'GPT-4 powered analytics'
                  },
                  {
                    icon: Star,
                    title: isArabic ? 'إنتاج المحتوى' : 'Content Generation',
                    description: isArabic ? 'نصوص وصور بالذكاء الاصطناعي' : 'AI-powered text and visuals'
                  },
                  {
                    icon: Crown,
                    title: isArabic ? 'الأتمتة الذكية' : 'Smart Automation',
                    description: isArabic ? 'تحسين سير العمل تلقائياً' : 'Automated workflow optimization'
                  }
                ].map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {isArabic ? 'هل تحتاج مساعدة في الاختيار؟' : 'Need help choosing?'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {isArabic 
              ? 'تحدث مع فريقنا للحصول على توصية مخصصة لاحتياجات عملك'
              : 'Talk to our team for a personalized recommendation for your business needs'
            }
          </p>
          <Button size="lg" variant="outline">
            {isArabic ? 'تحدث مع المبيعات' : 'Talk to Sales'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
