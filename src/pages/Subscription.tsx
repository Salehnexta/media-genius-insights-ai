
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/layout/Header';
import CurrentPlanCard from '@/components/subscription/CurrentPlanCard';
import UsageTrackingCard from '@/components/subscription/UsageTrackingCard';
import PricingPlans from '@/components/subscription/PricingPlans';
import AIFeaturesHighlight from '@/components/subscription/AIFeaturesHighlight';

interface SubscriptionPlan {
  id: string;
  name: string;
  price_sar: number;
  monthly_message_limit: number;
  overage_price_sar: number;
  features: any;
}

interface UserSubscription {
  id: string;
  plan_id: string;
  status: string;
  current_period_start: string;
  current_period_end: string;
}

interface UsageData {
  message_count: number;
  content_generation_count: number;
  api_calls_count: number;
  period_start: string;
  period_end: string;
}

const Subscription: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const isArabic = language === 'ar';
  
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<UserSubscription | null>(null);
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    if (user) {
      fetchSubscriptionData();
    }
  }, [user]);

  const fetchSubscriptionData = async () => {
    try {
      // Fetch subscription plans
      const { data: plansData, error: plansError } = await supabase
        .from('subscription_plans')
        .select('*')
        .order('price_sar', { ascending: true });

      if (plansError) throw plansError;
      setPlans(plansData || []);

      // Fetch current user subscription
      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', user?.id)
        .eq('status', 'active')
        .single();

      if (!subscriptionError) {
        setCurrentSubscription(subscriptionData);

        // Fetch usage data
        const { data: usageData, error: usageError } = await supabase
          .from('usage_tracking')
          .select('*')
          .eq('user_id', user?.id)
          .eq('subscription_id', subscriptionData.id)
          .gte('period_start', subscriptionData.current_period_start)
          .lte('period_end', subscriptionData.current_period_end)
          .single();

        if (!usageError) {
          setUsage(usageData);
        }
      }
    } catch (error) {
      console.error('Error fetching subscription data:', error);
      toast({
        title: "Error",
        description: "Failed to load subscription data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getCurrentPlan = () => {
    if (!currentSubscription) return null;
    return plans.find(plan => plan.id === currentSubscription.plan_id);
  };

  const handleUpgrade = async (planId: string) => {
    toast({
      title: "Upgrade",
      description: "Payment integration coming soon!",
    });
  };

  if (loading) {
    return (
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : ''}`}>
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading subscription data...</div>
        </div>
      </div>
    );
  }

  const currentPlan = getCurrentPlan();

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : ''}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isArabic ? 'خطط التسويق الذكي' : 'AI-Powered Marketing Plans'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {isArabic ? 'اختر الخطة المثالية لاحتياجات التسويق الذكي' : 'Choose the perfect plan for your AI marketing needs'}
            </p>
          </div>

          {/* Current Plan & Usage */}
          {currentPlan && currentSubscription && (
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <CurrentPlanCard 
                plan={currentPlan} 
                subscription={currentSubscription}
                isArabic={isArabic}
              />
              {usage && (
                <UsageTrackingCard 
                  usage={usage} 
                  plan={currentPlan}
                  isArabic={isArabic}
                />
              )}
            </div>
          )}

          {/* Available Plans */}
          <PricingPlans 
            plans={plans}
            currentPlan={currentPlan}
            onUpgrade={handleUpgrade}
            isArabic={isArabic}
          />

          {/* AI Features Highlight */}
          <AIFeaturesHighlight isArabic={isArabic} />
        </div>
      </div>
    </div>
  );
};

export default Subscription;
