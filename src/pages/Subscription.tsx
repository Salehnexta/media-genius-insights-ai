
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { 
  CreditCard, 
  Zap, 
  MessageSquare, 
  Image, 
  BarChart3, 
  CheckCircle,
  Clock,
  Users
} from 'lucide-react';

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
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const isArabic = language === 'ar';
  
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<UserSubscription | null>(null);
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);

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

  const getUsagePercentage = (current: number, limit: number) => {
    return Math.min((current / limit) * 100, 100);
  };

  const handleUpgrade = async (planId: string) => {
    toast({
      title: "Upgrade",
      description: "Payment integration coming soon!",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading subscription data...</div>
      </div>
    );
  }

  const currentPlan = getCurrentPlan();

  return (
    <div className={`container mx-auto px-4 py-8 ${isArabic ? 'rtl' : ''}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AI-Powered Marketing Plans
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Choose the perfect plan for your AI marketing needs
          </p>
        </div>

        {/* Current Plan & Usage */}
        {currentPlan && usage && (
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  Current Plan: {currentPlan.name}
                  <Badge variant="secondary">Active</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">AI Messages</span>
                    </div>
                    <Progress 
                      value={getUsagePercentage(usage.message_count, currentPlan.monthly_message_limit)} 
                      className="h-2 mb-1"
                    />
                    <p className="text-sm text-gray-600">
                      {usage.message_count} / {currentPlan.monthly_message_limit} messages
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Image className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium">Content Generation</span>
                    </div>
                    <Progress 
                      value={getUsagePercentage(usage.content_generation_count, 100)} 
                      className="h-2 mb-1"
                    />
                    <p className="text-sm text-gray-600">
                      {usage.content_generation_count} / 100 pieces
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">API Calls</span>
                    </div>
                    <Progress 
                      value={getUsagePercentage(usage.api_calls_count, 1000)} 
                      className="h-2 mb-1"
                    />
                    <p className="text-sm text-gray-600">
                      {usage.api_calls_count} / 1,000 calls
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>
                    Billing period: {new Date(currentSubscription.current_period_start).toLocaleDateString()} - {new Date(currentSubscription.current_period_end).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Available Plans */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isCurrentPlan = currentPlan?.id === plan.id;
            const features = plan.features || {};
            
            return (
              <Card key={plan.id} className={`relative ${isCurrentPlan ? 'ring-2 ring-blue-500' : ''}`}>
                {isCurrentPlan && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600">
                    Current Plan
                  </Badge>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600">
                    {plan.price_sar} SAR
                    <span className="text-sm font-normal text-gray-600">/month</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{plan.monthly_message_limit.toLocaleString()} AI Messages</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">AI Content Generation</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Advanced Analytics</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Multi-Agent AI System</span>
                    </div>

                    {features.priority_support && (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Priority Support</span>
                      </div>
                    )}

                    {features.team_collaboration && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">Team Collaboration</span>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={isCurrentPlan}
                    className="w-full"
                    variant={isCurrentPlan ? "outline" : "default"}
                  >
                    {isCurrentPlan ? "Current Plan" : "Upgrade"}
                  </Button>

                  {plan.overage_price_sar > 0 && (
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Overage: {plan.overage_price_sar} SAR per additional 100 messages
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* AI Features Highlight */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                🤖 AI-Powered Marketing Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Smart Conversations</h3>
                  <p className="text-sm text-gray-600">Chat with specialized AI agents for strategy, analysis, and content creation</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">AI Analytics</h3>
                  <p className="text-sm text-gray-600">Get intelligent insights and recommendations powered by GPT-4</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Image className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Content Generation</h3>
                  <p className="text-sm text-gray-600">Create compelling content and visuals with AI assistance</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Automation</h3>
                  <p className="text-sm text-gray-600">Intelligent workflow automation and optimization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
