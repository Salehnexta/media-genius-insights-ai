
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Lock, Eye, Database, Users, AlertTriangle } from 'lucide-react';

const Privacy: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className={`container mx-auto px-4 py-8 ${isArabic ? 'rtl' : ''}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Data Protection & AI Processing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                MarketingGenius AI is committed to protecting your privacy and ensuring the secure handling of your data in our AI-powered marketing platform.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">AI Data Processing</h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Your data may be processed by AI systems (including OpenAI's GPT models) to provide personalized marketing insights, content generation, and strategic recommendations. All AI processing is done securely and in compliance with data protection regulations.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-green-600" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Business Information</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>Company name, industry, and website URL</li>
                    <li>Social media accounts and marketing goals</li>
                    <li>Competitor information and market analysis data</li>
                    <li>Campaign performance and analytics data</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">AI Interaction Data</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>Chat conversations with AI agents</li>
                    <li>Content generation requests and outputs</li>
                    <li>AI recommendations and insights viewed</li>
                    <li>Usage patterns and feature utilization</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-600" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">AI-Powered Insights</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Generate personalized marketing strategies and recommendations using advanced AI analysis</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Content Creation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Create customized marketing content, copy, and visual assets using AI models</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Performance Analysis</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Analyze your marketing performance and provide AI-driven optimization suggestions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Service Improvement</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Enhance our AI models and platform features based on aggregated usage patterns</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-600" />
                Data Sharing & Third Parties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">AI Service Providers</h4>
                  <p className="text-sm text-orange-800 dark:text-orange-200">
                    We use OpenAI and other AI service providers to deliver our intelligent features. Your data is processed according to their privacy policies and our data processing agreements.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">We may share information with:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>AI service providers (OpenAI, etc.) for processing and analysis</li>
                    <li>Analytics providers for platform performance monitoring</li>
                    <li>Payment processors for subscription management</li>
                    <li>Legal authorities when required by law</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-red-600" />
                Your Rights & Data Control
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Access & Portability</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>Request access to your data</li>
                    <li>Export your information</li>
                    <li>View AI interaction history</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Deletion & Correction</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>Delete your account and data</li>
                    <li>Correct inaccurate information</li>
                    <li>Opt-out of AI processing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                Data Security & Retention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Security Measures</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    We implement industry-standard security measures including:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>End-to-end encryption for data transmission</li>
                    <li>Secure data storage with access controls</li>
                    <li>Regular security audits and monitoring</li>
                    <li>AI model access restrictions and logging</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Data Retention</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We retain your data for as long as your account is active or as needed to provide services. AI conversation history is retained for 12 months to improve service quality, unless you request earlier deletion.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-800/50">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="font-semibold mb-2">Contact Us About Privacy</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  For privacy-related questions or to exercise your rights, contact our Data Protection Officer:
                </p>
                <div className="space-y-1 text-sm">
                  <p>Email: privacy@marketinggenius.ai</p>
                  <p>Address: [Your Business Address]</p>
                  <p>Phone: [Your Contact Number]</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
