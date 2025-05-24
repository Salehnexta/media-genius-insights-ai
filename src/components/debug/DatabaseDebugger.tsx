
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle, Database, User, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

interface TestResult {
  name: string;
  status: 'success' | 'error' | 'warning';
  message: string;
  details?: any;
}

const DatabaseDebugger = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [results, setResults] = useState<TestResult[]>([]);
  const [testing, setTesting] = useState(false);

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

      // Test 3: Campaigns Table Access
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

      // Test 4: Content Table Access
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

      // Test 5: Test Campaign Creation
      try {
        const testCampaign = {
          name: 'Test Campaign',
          description: 'Database test campaign',
          status: 'draft',
          user_id: user.id
        };

        const { data: newCampaign, error: createError } = await supabase
          .from('campaigns')
          .insert([testCampaign])
          .select()
          .single();

        if (createError) {
          testResults.push({
            name: 'Campaign Creation',
            status: 'error',
            message: `Campaign creation error: ${createError.message}`,
            details: createError
          });
        } else {
          testResults.push({
            name: 'Campaign Creation',
            status: 'success',
            message: 'Campaign created successfully',
            details: newCampaign
          });

          // Clean up test campaign
          await supabase.from('campaigns').delete().eq('id', newCampaign.id);
        }
      } catch (error) {
        testResults.push({
          name: 'Campaign Creation',
          status: 'error',
          message: `Campaign creation test failed: ${error}`,
          details: error
        });
      }
    }

    // Test 6: RLS Policies Test
    try {
      const { data: policies, error: policiesError } = await supabase
        .rpc('pg_policies')
        .select('*');

      testResults.push({
        name: 'RLS Policies',
        status: policiesError ? 'warning' : 'success',
        message: policiesError ? 'Could not verify RLS policies' : 'RLS policies check completed',
        details: policies
      });
    } catch (error) {
      testResults.push({
        name: 'RLS Policies',
        status: 'warning',
        message: 'RLS policies verification not available',
        details: null
      });
    }

    setResults(testResults);
    setTesting(false);
  };

  const getStatusIcon = (status: string) => {
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

  const getStatusBadge = (status: 'success' | 'error' | 'warning') => {
    const variants = {
      success: 'default' as const,
      error: 'destructive' as const,
      warning: 'secondary' as const
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <Database className="h-6 w-6" />
          {isArabic ? 'فحص قاعدة البيانات' : 'Database Debugger'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={runTests} 
          disabled={testing}
          className={`w-full ${isArabic ? 'flex-row-reverse' : ''}`}
        >
          {testing ? (isArabic ? 'جاري الفحص...' : 'Running Tests...') : (isArabic ? 'فحص قاعدة البيانات' : 'Run Database Tests')}
        </Button>

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
