
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/layout/Header';
import { Check, Star, Zap, Crown } from 'lucide-react';

interface SubscriptionPlan {
  id: string;
  name: string;
  price_sar: number;
  monthly_message_limit: number;
  overage_price_sar: number;
  features: any;
}

const Pricing = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const isArabic = language === 'ar';
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .order('price_sar', { ascending: true });

      if (error) throw error;
      setPlans(data || []);
    } catch (error) {
      console.error('Error fetching plans:', error);
      toast({
        title: "Error",
        description: "Failed to load pricing plans",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      toast({
        title: isArabic ? "يجب تسجيل الدخول" : "Login Required",
        description: isArabic ? "يرجى تسجيل الدخول أولاً" : "Please login first",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: isArabic ? "قريباً" : "Coming Soon",
      description: isArabic ? "سيتم إضافة نظام الدفع قريباً" : "Payment integration coming soon!",
    });
  };

  const getPlanIcon = (planName: string) => {
    if (planName.toLowerCase().includes('basic')) return Star;
    if (planName.toLowerCase().includes('pro')) return Zap;
    if (planName.toLowerCase().includes('enterprise')) return Crown;
    return Star;
  };

  const getPlanColor = (planName: string) => {
    if (planName.toLowerCase().includes('basic')) return 'bg-blue-50 border-blue-200 dark:bg-blue-900/10';
    if (planName.toLowerCase().includes('pro')) return 'bg-purple-50 border-purple-200 dark:bg-purple-900/10';
    if (planName.toLowerCase().includes('enterprise')) return 'bg-orange-50 border-orange-200 dark:bg-orange-900/10';
    return 'bg-gray-50 border-gray-200 dark:bg-gray-900/10';
  };

  if (loading) {
    return (
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : 'ltr'}`}>
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading pricing plans...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {isArabic ? 'خطط الأسعار' : 'Pricing Plans'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {isArabic ? 'اختر الخطة المناسبة لاحتياجاتك' : 'Choose the perfect plan for your needs'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => {
            const IconComponent = getPlanIcon(plan.name);
            const isPopular = plan.name.toLowerCase().includes('pro');
            
            return (
              <Card key={plan.id} className={`relative ${getPlanColor(plan.name)} ${isPopular ? 'ring-2 ring-purple-500' : ''}`}>
                {isPopular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white">
                    {isArabic ? 'الأكثر شعبية' : 'Most Popular'}
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <IconComponent className="h-12 w-12 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    {isArabic 
                      ? plan.name.replace('Plan', 'خطة').replace('Basic', 'أساسية').replace('Pro', 'احترافية').replace('Enterprise', 'مؤسسية')
                      : plan.name
                    }
                  </CardTitle>
                  <div className="text-3xl font-bold text-blue-600">
                    {plan.price_sar} {isArabic ? 'ريال' : 'SAR'}
                    <span className="text-base font-normal text-gray-500">
                      /{isArabic ? 'شهر' : 'month'}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="text-center mb-6">
                    <p className="text-gray-600 dark:text-gray-400">
                      {plan.monthly_message_limit.toLocaleString()} {isArabic ? 'رسالة شهرياً' : 'messages/month'}
                    </p>
                    {plan.overage_price_sar > 0 && (
                      <p className="text-sm text-gray-500">
                        {plan.overage_price_sar} {isArabic ? 'ريال للرسالة الإضافية' : 'SAR per extra message'}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    {Object.entries(plan.features).map(([feature, included]) => (
                      included && (
                        <div key={feature} className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                          <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {isArabic ? {
                              'ai_insights': 'رؤى ذكية بالذكاء الاصطناعي',
                              'content_generation': 'إنشاء المحتوى',
                              'basic_analytics': 'تحليلات أساسية',
                              'advanced_analytics': 'تحليلات متقدمة',
                              'email_support': 'دعم عبر البريد الإلكتروني',
                              'priority_support': 'دعم أولوية',
                              'team_collaboration': 'تعاون الفريق',
                              'custom_reports': 'تقارير مخصصة',
                              'dedicated_account_manager': 'مدير حساب مخصص',
                              'custom_integrations': 'تكاملات مخصصة',
                              'unlimited_users': 'مستخدمين غير محدودين'
                            }[feature] || feature : feature.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </div>
                      )
                    ))}
                  </div>

                  <Button 
                    className="w-full mt-6" 
                    onClick={() => handleSubscribe(plan.id)}
                    variant={isPopular ? 'default' : 'outline'}
                  >
                    {isArabic ? 'اشترك الآن' : 'Subscribe Now'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="text-center p-8">
          <CardHeader>
            <CardTitle className="text-2xl">
              {isArabic ? 'هل تحتاج خطة مخصصة؟' : 'Need a Custom Plan?'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {isArabic 
                ? 'تواصل معنا لمناقشة احتياجاتك الخاصة والحصول على عرض مخصص'
                : 'Contact us to discuss your specific needs and get a custom quote'
              }
            </p>
            <Button variant="outline" size="lg">
              {isArabic ? 'تواصل معنا' : 'Contact Sales'}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Pricing;
