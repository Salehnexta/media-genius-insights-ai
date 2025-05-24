
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle, Zap, Users, Crown, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pricing: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const isArabic = language === 'ar';
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.startsWith('/ar')) {
      setLanguage('ar');
    }
  }, [setLanguage]);

  const plans = [
    {
      id: 'starter',
      name: isArabic ? 'المبتدئ' : 'Starter',
      price: 99,
      popular: false,
      description: isArabic ? 'مثالي للشركات الناشئة' : 'Perfect for startups',
      messageLimit: 1000,
      icon: Zap,
      features: [
        isArabic ? '1,000 رسالة ذكية شهرياً' : '1,000 AI messages monthly',
        isArabic ? 'تحليلات أساسية' : 'Basic analytics',
        isArabic ? 'إنتاج المحتوى' : 'Content generation',
        isArabic ? 'دعم بالبريد الإلكتروني' : 'Email support',
        isArabic ? 'تكامل الوسائل الاجتماعية' : 'Social media integration'
      ]
    },
    {
      id: 'professional',
      name: isArabic ? 'المحترف' : 'Professional',
      price: 299,
      popular: true,
      description: isArabic ? 'الأفضل للشركات المتنامية' : 'Best for growing businesses',
      messageLimit: 5000,
      icon: Star,
      features: [
        isArabic ? '5,000 رسالة ذكية شهرياً' : '5,000 AI messages monthly',
        isArabic ? 'تحليلات متقدمة' : 'Advanced analytics',
        isArabic ? 'إنتاج محتوى غير محدود' : 'Unlimited content generation',
        isArabic ? 'دعم ذو أولوية' : 'Priority support',
        isArabic ? 'تحليل المنافسين' : 'Competitor analysis',
        isArabic ? 'تقارير مخصصة' : 'Custom reports',
        isArabic ? 'تكامل متقدم' : 'Advanced integrations'
      ]
    },
    {
      id: 'enterprise',
      name: isArabic ? 'المؤسسات' : 'Enterprise',
      price: 999,
      popular: false,
      description: isArabic ? 'للمؤسسات الكبيرة' : 'For large organizations',
      messageLimit: 25000,
      icon: Crown,
      features: [
        isArabic ? '25,000 رسالة ذكية شهرياً' : '25,000 AI messages monthly',
        isArabic ? 'تحليلات مؤسسية' : 'Enterprise analytics',
        isArabic ? 'نظام ذكي متعدد الوكلاء' : 'Multi-agent AI system',
        isArabic ? 'دعم مخصص 24/7' : 'Dedicated 24/7 support',
        isArabic ? 'تعاون الفريق' : 'Team collaboration',
        isArabic ? 'تخصيص كامل' : 'Full customization',
        isArabic ? 'تكامل مؤسسي' : 'Enterprise integrations',
        isArabic ? 'إدارة المستخدمين' : 'User management'
      ]
    }
  ];

  const handleGetStarted = (planId: string) => {
    navigate('/auth');
  };

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
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''} transition-all duration-300 hover:shadow-2xl`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1">
                  {isArabic ? 'الأكثر شعبية' : 'Most Popular'}
                </Badge>
              )}
              
              <CardHeader className="text-center pb-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <plan.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <p className="text-gray-600 dark:text-gray-400">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-1">
                    {isArabic ? 'ريال/شهر' : 'SAR/month'}
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleGetStarted(plan.id)}
                  className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {isArabic ? 'ابدأ الآن' : 'Get Started'}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-3">
                  {isArabic 
                    ? 'إضافي: 0.20 ريال لكل 100 رسالة إضافية'
                    : 'Overage: 0.20 SAR per additional 100 messages'
                  }
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
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
