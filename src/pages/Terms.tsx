
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { FileText, Scale, AlertCircle, CreditCard, Bot, Shield } from 'lucide-react';

const Terms: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const isArabic = language === 'ar';

  // Check if user came from Arabic path and set language accordingly
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.startsWith('/ar')) {
      setLanguage('ar');
    }
  }, [setLanguage]);

  return (
    <div className={`container mx-auto px-4 py-8 ${isArabic ? 'rtl' : ''}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Terms of Service
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Agreement to Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                By accessing and using MarketingGenius AI platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">AI-Powered Service</h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  MarketingGenius AI uses artificial intelligence, including large language models, to provide marketing insights, content generation, and strategic recommendations. By using our service, you acknowledge and agree to AI processing of your data.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-600" />
                AI Services & Limitations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">AI-Generated Content</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>AI-generated content is provided for informational and creative purposes</li>
                  <li>You are responsible for reviewing and validating all AI recommendations</li>
                  <li>AI insights should not be considered as professional financial or legal advice</li>
                  <li>We do not guarantee the accuracy or completeness of AI-generated content</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Usage Limits</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>AI interactions are subject to subscription plan limits</li>
                  <li>Excessive use may result in temporary service restrictions</li>
                  <li>Commercial use of AI-generated content must comply with licensing terms</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                Subscription & Billing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Subscription Plans</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  MarketingGenius AI offers various subscription tiers with different AI feature limits:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>Monthly billing cycles with automatic renewal</li>
                  <li>AI message limits based on subscription tier</li>
                  <li>Overage charges may apply for usage beyond plan limits</li>
                  <li>Plan changes take effect at the next billing cycle</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Refund Policy</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Refunds are provided on a case-by-case basis within 30 days of subscription purchase. AI usage limits that have been consumed are non-refundable.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-orange-600" />
                Acceptable Use Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Prohibited Uses</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    You agree not to use the AI service for:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>Generating misleading, false, or deceptive marketing content</li>
                    <li>Creating content that violates intellectual property rights</li>
                    <li>Attempting to reverse-engineer or circumvent AI limitations</li>
                    <li>Sharing account credentials or reselling AI access</li>
                    <li>Using the service for illegal or harmful activities</li>
                  </ul>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Content Responsibility</h4>
                  <p className="text-sm text-orange-800 dark:text-orange-200">
                    You are solely responsible for the content you create using our AI tools and must ensure compliance with applicable laws and regulations in your jurisdiction.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-600" />
                Intellectual Property
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Platform Ownership</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    MarketingGenius AI platform, including its AI models, algorithms, and interface, is owned by us and protected by intellectual property laws.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">User-Generated Content</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>You retain rights to your original input data and business information</li>
                    <li>AI-generated content may be subject to third-party model licensing terms</li>
                    <li>You grant us limited rights to use your data for service improvement</li>
                    <li>We may use aggregated, anonymized data for AI model training</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                Disclaimers & Limitations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Service Availability</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    AI services are provided "as is" and may experience downtime due to maintenance, updates, or third-party service dependencies. We strive for 99.9% uptime but cannot guarantee uninterrupted service.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Limitation of Liability</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of AI-generated content or platform services. Our liability is limited to the amount paid for the service.
                  </p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">AI Accuracy Disclaimer</h4>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    AI-generated insights and recommendations are based on available data and algorithms. Results may vary and should be validated before implementation in business decisions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Termination & Account Suspension</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-2">Termination Rights</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>You may cancel your subscription at any time</li>
                    <li>We may suspend accounts for terms violations</li>
                    <li>Data export is available for 30 days after termination</li>
                    <li>AI conversation history may be retained per privacy policy</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-800/50">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="font-semibold mb-2">Contact Information</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  For questions about these terms or our AI services:
                </p>
                <div className="space-y-1 text-sm">
                  <p>Email: legal@marketinggenius.ai</p>
                  <p>Business Address: [Your Business Address]</p>
                  <p>Phone: [Your Contact Number]</p>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  These terms are governed by [Your Jurisdiction] law. Any disputes will be resolved through arbitration.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms;
