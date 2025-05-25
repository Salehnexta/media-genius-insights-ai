
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface SubscriptionPlan {
  id: string;
  name: string;
  price_sar: number;
  monthly_message_limit: number;
  overage_price_sar: number;
  features: any; // Changed from string[] to any to match Json type
}

interface DynamicPricingCardsProps {
  onSelectPlan?: (planId: string) => void;
}

const DynamicPricingCards: React.FC<DynamicPricingCardsProps> = ({ onSelectPlan }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isArabic = language === 'ar';
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    } catch (err) {
      console.error('Error fetching plans:', err);
      setError(isArabic ? 'فشل في تحميل الخطط' : 'Failed to load plans');
      
      // Fallback to static plans with correct prices
      setPlans([
        {
          id: 'starter',
          name: isArabic ? 'المبتدئ' : 'Starter',
          price_sar: 599,
          monthly_message_limit: 1000,
          overage_price_sar: 0.20,
          features: [
            isArabic ? '1,000 رسالة ذكية شهرياً' : '1,000 AI messages monthly',
            isArabic ? 'تحليلات أساسية' : 'Basic analytics',
            isArabic ? 'دعم بالبريد الإلكتروني' : 'Email support'
          ]
        },
        {
          id: 'professional',
          name: isArabic ? 'المحترف' : 'Professional',
          price_sar: 899,
          monthly_message_limit: 5000,
          overage_price_sar: 0.15,
          features: [
            isArabic ? '5,000 رسالة ذكية شهرياً' : '5,000 AI messages monthly',
            isArabic ? 'تحليلات متقدمة' : 'Advanced analytics',
            isArabic ? 'دعم ذو أولوية' : 'Priority support',
            isArabic ? 'تحليل المنافسين' : 'Competitor analysis'
          ]
        },
        {
          id: 'enterprise',
          name: isArabic ? 'المؤسسات' : 'Enterprise',
          price_sar: 1199,
          monthly_message_limit: 25000,
          overage_price_sar: 0.10,
          features: [
            isArabic ? '25,000 رسالة ذكية شهرياً' : '25,000 AI messages monthly',
            isArabic ? 'تحليلات مؤسسية' : 'Enterprise analytics',
            isArabic ? 'دعم مخصص 24/7' : 'Dedicated 24/7 support',
            isArabic ? 'تكامل مخصص' : 'Custom integrations'
          ]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlan = (planId: string) => {
    if (onSelectPlan) {
      onSelectPlan(planId);
    } else {
      navigate('/auth');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {plans.map((plan, index) => {
        const isPopular = index === 1; // Middle plan is popular
        const planFeatures = Array.isArray(plan.features) ? plan.features : [];
        
        return (
          <Card 
            key={plan.id} 
            className={`relative ${isPopular ? 'ring-2 ring-blue-500 scale-105' : ''} transition-all duration-300 hover:shadow-2xl`}
          >
            {isPopular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1">
                {isArabic ? 'الأكثر شعبية' : 'Most Popular'}
              </Badge>
            )}
            
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold text-blue-600">{plan.price_sar}</span>
                <span className="text-gray-600 dark:text-gray-400 ml-1">
                  {isArabic ? 'ريال/شهر' : 'SAR/month'}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {plan.monthly_message_limit.toLocaleString()} {isArabic ? 'رسالة شهرياً' : 'messages/month'}
              </p>
            </CardHeader>

            <CardContent>
              <ul className="space-y-3 mb-8">
                {planFeatures.map((feature: string, featureIndex: number) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full ${isPopular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                variant={isPopular ? 'default' : 'outline'}
              >
                {isArabic ? 'ابدأ الآن' : 'Get Started'}
              </Button>

              <p className="text-xs text-gray-500 text-center mt-3">
                {isArabic 
                  ? `إضافي: ${plan.overage_price_sar} ريال لكل رسالة إضافية`
                  : `Overage: ${plan.overage_price_sar} SAR per additional message`
                }
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DynamicPricingCards;
