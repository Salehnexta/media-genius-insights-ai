
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import CurrentPlanCard from '@/components/subscription/CurrentPlanCard';
import UsageTrackingCard from '@/components/subscription/UsageTrackingCard';
import PricingPlans from '@/components/subscription/PricingPlans';
import AIFeaturesHighlight from '@/components/subscription/AIFeaturesHighlight';
import { Loader2 } from 'lucide-react';

const Subscription: React.FC = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const { toast } = useToast();
  const isArabic = language === 'ar';
  
  const [loading, setLoading] = useState(true);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [usage, setUsage] = useState(null);
  const [availablePlans, setAvailablePlans] = useState([]);

  useEffect(() => {
    if (user) {
      fetchSubscriptionData();
    }
  }, [user]);

  const fetchSubscriptionData = async () => {
    try {
      setLoading(true);

      // Fetch current subscription
      const { data: subscription, error: subError } = await supabase
        .from('user_subscriptions')
        .select(`
          *,
          subscription_plans(*)
        `)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();

      if (subError && subError.code !== 'PGRST116') throw subError;

      if (subscription) {
        setCurrentSubscription(subscription);
        setCurrentPlan(subscription.subscription_plans);
      }

      // Fetch usage data
      const { data: usageData, error: usageError } = await supabase
        .from('usage_tracking')
        .select('*')
        .eq('user_id', user.id)
        .gte('period_start', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())
        .single();

      if (usageError && usageError.code !== 'PGRST116') throw usageError;

      setUsage(usageData || {
        message_count: 0,
        content_generation_count: 0,
        api_calls_count: 0
      });

      // Fetch all available plans
      const { data: plans, error: plansError } = await supabase
        .from('subscription_plans')
        .select('*')
        .order('price_sar', { ascending: true });

      if (plansError) throw plansError;
      setAvailablePlans(plans || []);

    } catch (error) {
      console.error('Error fetching subscription data:', error);
      toast({
        title: isArabic ? "خطأ في تحميل البيانات" : "Error loading data",
        description: isArabic ? "فشل في تحميل بيانات الاشتراك" : "Failed to load subscription data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (planId: string) => {
    // This would typically integrate with a payment provider like Stripe
    toast({
      title: isArabic ? "قريباً" : "Coming Soon",
      description: isArabic ? "سيتم تفعيل نظام الدفع قريباً" : "Payment system will be activated soon",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>{isArabic ? 'جاري التحميل...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isArabic ? 'إدارة الاشتراك' : 'Subscription Management'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {isArabic ? 'إدارة خطتك واستخدام الذكاء الاصطناعي' : 'Manage your plan and AI usage'}
            </p>
          </div>

          {/* Current Plan and Usage */}
          {currentPlan && currentSubscription && (
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
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
          {availablePlans.length > 0 && (
            <PricingPlans
              plans={availablePlans}
              currentPlan={currentPlan}
              onUpgrade={handleUpgrade}
              isArabic={isArabic}
            />
          )}

          {/* AI Features Highlight */}
          <AIFeaturesHighlight isArabic={isArabic} />
        </div>
      </div>
    </div>
  );
};

export default Subscription;
