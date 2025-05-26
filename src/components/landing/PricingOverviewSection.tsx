
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PricingOverviewSectionProps {
  isArabic?: boolean;
}

const PricingOverviewSection: React.FC<PricingOverviewSectionProps> = ({ isArabic = false }) => {
  const navigate = useNavigate();

  const plans = [
    {
      name: isArabic ? 'البداية' : 'Starter',
      price: isArabic ? '99 ر.س' : '$29',
      period: isArabic ? '/شهرياً' : '/month',
      description: isArabic ? 'مثالي للشركات الناشئة' : 'Perfect for startups',
      features: [
        isArabic ? '3 وكلاء ذكيين' : '3 AI Agents',
        isArabic ? 'تحليلات أساسية' : 'Basic Analytics',
        isArabic ? 'دعم عبر البريد' : 'Email Support',
        isArabic ? '10 حملات شهرياً' : '10 Campaigns/month'
      ],
      recommended: false
    },
    {
      name: isArabic ? 'المحترف' : 'Professional',
      price: isArabic ? '299 ر.س' : '$79',
      period: isArabic ? '/شهرياً' : '/month',
      description: isArabic ? 'الأفضل للشركات المتوسطة' : 'Best for growing businesses',
      features: [
        isArabic ? '10 وكلاء ذكيين' : '10 AI Agents',
        isArabic ? 'تحليلات متقدمة' : 'Advanced Analytics',
        isArabic ? 'دعم مباشر 24/7' : '24/7 Live Support',
        isArabic ? 'حملات غير محدودة' : 'Unlimited Campaigns',
        isArabic ? 'تكاملات متقدمة' : 'Advanced Integrations'
      ],
      recommended: true
    },
    {
      name: isArabic ? 'المؤسسات' : 'Enterprise',
      price: isArabic ? 'اتصل بنا' : 'Contact Us',
      period: '',
      description: isArabic ? 'حلول مخصصة للمؤسسات' : 'Custom solutions for enterprises',
      features: [
        isArabic ? 'وكلاء ذكيين غير محدودين' : 'Unlimited AI Agents',
        isArabic ? 'تحليلات مخصصة' : 'Custom Analytics',
        isArabic ? 'مدير حساب مخصص' : 'Dedicated Account Manager',
        isArabic ? 'API مخصص' : 'Custom API',
        isArabic ? 'تدريب للفريق' : 'Team Training'
      ],
      recommended: false
    }
  ];

  const handleViewPlans = () => {
    navigate(isArabic ? '/pricing-ar' : '/pricing');
  };

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'خطط مرنة لكل حجم أعمال' : 'Flexible Plans for Every Business Size'}
          </h2>
          <p className={`text-xl text-gray-600 max-w-2xl mx-auto ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic 
              ? 'اختر الخطة التي تناسب احتياجاتك وابدأ رحلتك نحو النجاح'
              : 'Choose the plan that fits your needs and start your journey to success'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative hover:shadow-lg transition-shadow ${plan.recommended ? 'border-blue-500 shadow-lg scale-105' : ''}`}
            >
              {plan.recommended && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                  {isArabic ? 'الأكثر شعبية' : 'Most Popular'}
                </Badge>
              )}
              
              <CardHeader className={`text-center ${isArabic ? 'font-arabic' : ''}`}>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className={`text-gray-600 ${isArabic ? 'font-arabic text-right' : ''}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full mt-6 ${plan.recommended ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'} ${isArabic ? 'font-arabic' : ''}`}
                  onClick={handleViewPlans}
                >
                  {plan.name === (isArabic ? 'المؤسسات' : 'Enterprise') 
                    ? (isArabic ? 'اتصل بالمبيعات' : 'Contact Sales')
                    : (isArabic ? 'ابدأ الآن' : 'Get Started')
                  }
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleViewPlans}
            className={`${isArabic ? 'font-arabic' : ''}`}
          >
            {isArabic ? (
              <>
                شاهد جميع الخطط والأسعار
                <ArrowLeft className="w-5 h-5 mr-2 rotate-180" />
              </>
            ) : (
              <>
                <ArrowLeft className="w-5 h-5 ml-2" />
                View All Plans & Pricing
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingOverviewSection;
