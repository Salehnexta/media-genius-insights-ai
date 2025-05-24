
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TestResult } from './types';
import {
  runAuthenticationTest,
  runProfileTest,
  runSubscriptionPlansTest,
  runUserSubscriptionsTest,
  runCampaignsTest,
  runContentTest,
  runAiChatTest,
  runImageGenerationTest
} from './utils/testRunners';
import { createDefaultSubscription } from './utils/subscriptionFixer';
import DebugHeader from './components/DebugHeader';
import DebugActions from './components/DebugActions';
import TestResultCard from './components/TestResultCard';

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
    testResults.push(runAuthenticationTest(user));

    if (user) {
      // Test 2: Profile Creation/Access
      testResults.push(await runProfileTest(user));

      // Test 3: Subscription Plans Access
      testResults.push(await runSubscriptionPlansTest());

      // Test 4: User Subscriptions
      testResults.push(await runUserSubscriptionsTest(user));

      // Test 5: Campaigns Table Access
      testResults.push(await runCampaignsTest());

      // Test 6: Content Table Access
      testResults.push(await runContentTest());

      // Test 7: AI Chat Function
      testResults.push(await runAiChatTest());

      // Test 8: Image Generation Function
      testResults.push(await runImageGenerationTest());
    }

    setResults(testResults);
    setTesting(false);
  };

  const handleFixSubscription = async () => {
    if (!user) return;
    
    setFixingSubscription(true);
    try {
      const result = await createDefaultSubscription(user);
      if (result.success) {
        // Re-run tests to see the updated status
        await runTests();
      }
    } catch (error) {
      console.error('Failed to create default subscription:', error);
    } finally {
      setFixingSubscription(false);
    }
  };

  const hasSubscriptionIssue = results.some(r => 
    r.name === 'User Subscriptions Access' && (r.status === 'warning' || r.status === 'error')
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <DebugHeader isArabic={isArabic} />
      <CardContent className="space-y-4">
        <DebugActions
          onRunTests={runTests}
          onFixSubscription={handleFixSubscription}
          testing={testing}
          fixingSubscription={fixingSubscription}
          hasSubscriptionIssue={hasSubscriptionIssue}
          user={user}
          isArabic={isArabic}
        />

        {results.length > 0 && (
          <div className="space-y-3">
            <h3 className={`text-lg font-semibold ${isArabic ? 'text-right' : ''}`}>
              {isArabic ? 'نتائج الفحص' : 'Test Results'}
            </h3>
            
            {results.map((result, index) => (
              <TestResultCard
                key={index}
                result={result}
                isArabic={isArabic}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DatabaseDebugger;
