
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle, Database, User, Shield, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

type TestStatus = 'success' | 'error' | 'warning';

interface TestResult {
  name: string;
  status: TestStatus;
  message: string;
  details?: any;
}

const DatabaseDebugger = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [results, setResults] = useState<TestResult[]>([]);
  const [testing, setTesting] = useState(false);
  const [fixingSubscription, setFixingSubscription] = useState(false);

  const runTests = async () => {
    setTesting(true);
    const testResults: TestResult[] = [];

    // Test 1: Authentication
    testResults.push({
      name: 'Authentication Status',
      status: user ? 'success' : 'error',
      message: user ? `User authenticated: ${user.email}` : 'No user authenticated',
      details: user ? { id: user.id, email: user.email } : null
    });

    if (user) {
      // Test 2: Profile Creation/Access
      try {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) {
          testResults.push({
            name: 'Profile Access',
            status: 'error',
            message: `Profile error: ${profileError.message}`,
            details: profileError
          });
        } else if (profile) {
          testResults.push({
            name: 'Profile Access',
            status: 'success',
            message: 'Profile found and accessible',
            details: profile
          });
        } else {
          testResults.push({
            name: 'Profile Access',
            status: 'warning',
            message: 'No profile found for user',
            details: null
          });
        }
      } catch (error) {
        testResults.push({
          name: 'Profile Access',
          status: 'error',
          message: `Profile test failed: ${error}`,
          details: error
        });
      }

      // Test 3: Subscription Plans Access
      try {
        const { data: plans, error: plansError } = await supabase
          .from('subscription_plans')
          .select('*')
          .order('price_sar', { ascending: true });

        if (plansError) {
          testResults.push({
            name: 'Subscription Plans Access',
            status: 'error',
            message: `Plans error: ${plansError.message}`,
            details: plansError
          });
        } else {
          testResults.push({
            name: 'Subscription Plans Access',
            status: 'success',
            message: `Subscription plans accessible (${plans?.length || 0} plans found)`,
            details: plans
          });
        }
      } catch (error) {
        testResults.push({
          name: 'Subscription Plans Access',
          status: 'error',
          message: `Subscription plans test failed: ${error}`,
          details: error
        });
      }

      // Test 4: User Subscriptions (this is where the 406 error occurs)
      try {
        const { data: subscriptions, error: subscriptionsError } = await supabase
          .from('user_subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active');

        if (subscriptionsError) {
          testResults.push({
            name: 'User Subscriptions Access',
            status: 'error',
            message: `User subscriptions error: ${subscriptionsError.message}`,
            details: subscriptionsError
          });
        } else {
          testResults.push({
            name: 'User Subscriptions Access',
            status: subscriptions && subscriptions.length > 0 ? 'success' : 'warning',
            message: subscriptions && subscriptions.length > 0 
              ? `Active subscription found (${subscriptions.length} subscriptions)`
              : 'No active subscriptions found for user',
            details: subscriptions
          });
        }
      } catch (error) {
        testResults.push({
          name: 'User Subscriptions Access',
          status: 'error',
          message: `User subscriptions test failed: ${error}`,
          details: error
        });
      }

      // Test 5: Campaigns Table Access
      try {
        const { data: campaigns, error: campaignsError } = await supabase
          .from('campaigns')
          .select('*')
          .limit(5);

        if (campaignsError) {
          testResults.push({
            name: 'Campaigns Access',
            status: 'error',
            message: `Campaigns error: ${campaignsError.message}`,
            details: campaignsError
          });
        } else {
          testResults.push({
            name: 'Campaigns Access',
            status: 'success',
            message: `Campaigns accessible (${campaigns?.length || 0} found)`,
            details: campaigns
          });
        }
      } catch (error) {
        testResults.push({
          name: 'Campaigns Access',
          status: 'error',
          message: `Campaigns test failed: ${error}`,
          details: error
        });
      }

      // Test 6: Content Table Access
      try {
        const { data: content, error: contentError } = await supabase
          .from('content')
          .select('*')
          .limit(5);

        if (contentError) {
          testResults.push({
            name: 'Content Access',
            status: 'error',
            message: `Content error: ${contentError.message}`,
            details: contentError
          });
        } else {
          testResults.push({
            name: 'Content Access',
            status: 'success',
            message: `Content accessible (${content?.length || 0} found)`,
            details: content
          });
        }
      } catch (error) {
        testResults.push({
          name: 'Content Access',
          status: 'error',
          message: `Content test failed: ${error}`,
          details: error
        });
      }

      // Test 7: AI Chat Function
      try {
        const { data, error } = await supabase.functions.invoke('ai-chat', {
          body: { 
            message: 'Test message for debugging',
            context: 'general',
            language: 'en'
          }
        });

        if (error) {
          testResults.push({
            name: 'AI Chat Function',
            status: 'error',
            message: `AI Chat function error: ${error.message}`,
            details: error
          });
        } else {
          testResults.push({
            name: 'AI Chat Function',
            status: 'success',
            message: 'AI Chat function working correctly',
            details: data
          });
        }
      } catch (error) {
        testResults.push({
          name: 'AI Chat Function',
          status: 'error',
          message: `AI Chat function test failed: ${error}`,
          details: error
        });
      }

      // Test 8: Image Generation Function
      try {
        const { data, error } = await supabase.functions.invoke('generate-image', {
          body: { 
            prompt: 'A simple test image',
            style: 'realistic',
            size: '1024x1024'
          }
        });

        if (error) {
          testResults.push({
            name: 'Image Generation Function',
            status: 'error',
            message: `Image generation error: ${error.message}`,
            details: error
          });
        } else {
          testResults.push({
            name: 'Image Generation Function',
            status: 'success',
            message: 'Image generation function working correctly',
            details: { hasImageUrl: !!data?.imageUrl }
          });
        }
      } catch (error) {
        testResults.push({
          name: 'Image Generation Function',
          status: 'error',
          message: `Image generation test failed: ${error}`,
          details: error
        });
      }
    }

    setResults(testResults);
    setTesting(false);
  };

  const createDefaultSubscription = async () => {
    if (!user) return;
    
    setFixingSubscription(true);
    try {
      // Get the basic plan (first plan by price)
      const { data: plans } = await supabase
        .from('subscription_plans')
        .select('*')
        .order('price_sar', { ascending: true })
        .limit(1);

      if (plans && plans.length > 0) {
        const basicPlan = plans[0];
        
        // Create a subscription for the user
        const { data: subscription, error } = await supabase
          .from('user_subscriptions')
          .insert([{
            user_id: user.id,
            plan_id: basicPlan.id,
            current_period_start: new Date().toISOString(),
            current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
            status: 'active'
          }])
          .select()
          .single();

        if (error) {
          console.error('Error creating subscription:', error);
        } else {
          console.log('Default subscription created:', subscription);
          // Re-run tests to see the updated status
          await runTests();
        }
      }
    } catch (error) {
      console.error('Failed to create default subscription:', error);
    } finally {
      setFixingSubscription(false);
    }
  };

  const getStatusIcon = (status: TestStatus) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: TestStatus) => {
    const statusText: Record<TestStatus, string> = {
      success: 'success',
      error: 'error',
      warning: 'warning'
    };

    const badgeVariant = status === 'success' ? 'default' : 
                        status === 'error' ? 'destructive' : 'secondary';

    return <Badge variant={badgeVariant}>{statusText[status]}</Badge>;
  };

  const hasSubscriptionIssue = results.some(r => 
    r.name === 'User Subscriptions Access' && (r.status === 'warning' || r.status === 'error')
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <Database className="h-6 w-6" />
          {isArabic ? 'فحص قاعدة البيانات' : 'Database Debugger'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button 
            onClick={runTests} 
            disabled={testing}
            className={`flex-1 ${isArabic ? 'flex-row-reverse' : ''}`}
          >
            {testing ? (isArabic ? 'جاري الفحص...' : 'Running Tests...') : (isArabic ? 'فحص قاعدة البيانات' : 'Run Database Tests')}
          </Button>
          
          {hasSubscriptionIssue && user && (
            <Button 
              onClick={createDefaultSubscription}
              disabled={fixingSubscription}
              variant="outline"
              className={`${isArabic ? 'flex-row-reverse' : ''}`}
            >
              <Plus className="h-4 w-4 mr-2" />
              {fixingSubscription ? 'Creating...' : 'Fix Subscription'}
            </Button>
          )}
        </div>

        {results.length > 0 && (
          <div className="space-y-3">
            <h3 className={`text-lg font-semibold ${isArabic ? 'text-right' : ''}`}>
              {isArabic ? 'نتائج الفحص' : 'Test Results'}
            </h3>
            
            {results.map((result, index) => (
              <Alert key={index} className={`${result.status === 'error' ? 'border-red-200' : result.status === 'warning' ? 'border-yellow-200' : 'border-green-200'}`}>
                <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    {getStatusIcon(result.status)}
                    <span className="font-medium">{result.name}</span>
                    {getStatusBadge(result.status)}
                  </div>
                </div>
                <AlertDescription className={`mt-2 ${isArabic ? 'text-right' : ''}`}>
                  {result.message}
                  {result.details && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-sm opacity-75">
                        {isArabic ? 'التفاصيل' : 'Details'}
                      </summary>
                      <pre className="mt-1 text-xs bg-gray-100 p-2 rounded overflow-auto">
                        {JSON.stringify(result.details, null, 2)}
                      </pre>
                    </details>
                  )}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DatabaseDebugger;
