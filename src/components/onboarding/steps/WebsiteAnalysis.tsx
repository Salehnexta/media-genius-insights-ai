
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, CheckCircle, AlertCircle, Loader, TrendingUp, Users, Search, Code, Target, BarChart3 } from 'lucide-react';
import { OnboardingData } from '../OnboardingWizard';
import { MockDataService } from '@/services/mockDataService';

interface WebsiteAnalysisProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  isArabic: boolean;
}

const WebsiteAnalysis: React.FC<WebsiteAnalysisProps> = ({ data, updateData, isArabic }) => {
  const { t } = useLanguage();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const startAnalysis = () => {
    if (!data.website) return;
    
    setIsAnalyzing(true);
    // Simulate API call with enhanced mock data
    setTimeout(() => {
      const mockAnalysis = MockDataService.generateWebsiteAnalysis(data.website, data.industry || 'other');
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  useEffect(() => {
    if (data.website && !analysis && !isAnalyzing) {
      startAnalysis();
    }
  }, [data.website]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
  };

  if (!data.website) {
    return (
      <div className="text-center py-12">
        <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {t('onboarding.website.no-url.title')}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {t('onboarding.website.no-url.description')}
        </p>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="text-center py-12">
        <Loader className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-spin" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {t('onboarding.website.analyzing.title')}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {t('onboarding.website.analyzing.description')}
        </p>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Analyzing SEO • Checking performance • Scanning content • Reviewing competitors
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="text-center py-12">
        <Button onClick={startAnalysis} className="bg-blue-600 hover:bg-blue-700">
          <Globe className={`w-4 h-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
          {t('onboarding.website.analyze.button')}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Analysis Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('onboarding.website.results.title')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {data.website}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={startAnalysis}>
          {t('onboarding.website.refresh')}
        </Button>
      </div>

      {/* Analysis Results Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* SEO Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <Search className="w-5 h-5" />
              {t('onboarding.website.seo.title')}
              <Badge className={getScoreBadge(analysis.seo.score)}>
                {analysis.seo.score}/100
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                Technical Stack Detected
              </h5>
              <div className={`flex flex-wrap gap-1 ${isArabic ? 'justify-end' : ''}`}>
                {analysis.seo.technicalStack.map((tech: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                {t('onboarding.website.seo.strengths')}
              </h5>
              <ul className="space-y-1">
                {analysis.seo.strengths.map((strength: string, index: number) => (
                  <li key={index} className={`flex items-start ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'} text-sm text-green-700 dark:text-green-300`}>
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                Optimization Opportunities
              </h5>
              <ul className="space-y-1">
                {analysis.seo.issues.map((issue: string, index: number) => (
                  <li key={index} className={`flex items-start ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'} text-sm text-yellow-700 dark:text-yellow-300`}>
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Performance Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <TrendingUp className="w-5 h-5" />
              {t('onboarding.website.performance.title')}
              <Badge className={getScoreBadge(analysis.performance.score)}>
                {analysis.performance.score}/100
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Load Time
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {analysis.performance.loadTime}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Mobile Score
                </p>
                <p className={`text-lg font-semibold ${getScoreColor(analysis.performance.mobileScore)}`}>
                  {analysis.performance.mobileScore}/100
                </p>
              </div>
            </div>

            <div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                Core Web Vitals
              </h5>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <div className="font-medium">LCP</div>
                  <div className="text-gray-600 dark:text-gray-300">{analysis.performance.coreWebVitals.lcp}</div>
                </div>
                <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <div className="font-medium">FID</div>
                  <div className="text-gray-600 dark:text-gray-300">{analysis.performance.coreWebVitals.fid}</div>
                </div>
                <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <div className="font-medium">CLS</div>
                  <div className="text-gray-600 dark:text-gray-300">{analysis.performance.coreWebVitals.cls}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <Users className="w-5 h-5" />
              Content Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Total Pages
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {analysis.content.pages}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Blog Posts
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {analysis.content.blogPosts}
                </p>
              </div>
            </div>

            <div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                Top Keywords
              </h5>
              <div className={`flex flex-wrap gap-1 ${isArabic ? 'justify-end' : ''}`}>
                {analysis.content.topKeywords.map((keyword: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                Content Opportunities
              </h5>
              <ul className="space-y-1">
                {analysis.content.contentGaps.map((gap: string, index: number) => (
                  <li key={index} className="text-sm text-blue-700 dark:text-blue-300">
                    • {gap}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Competition Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <BarChart3 className="w-5 h-5" />
              Market Position
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Current Ranking
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {analysis.competition.ranking}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Market Share: {analysis.competition.marketShare}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Ranking Keywords
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {analysis.competition.keywords}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Backlinks
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {analysis.competition.backlinks}
                </p>
              </div>
            </div>

            <div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                Competitive Advantages
              </h5>
              <ul className="space-y-1">
                {analysis.competition.competitorGaps.map((gap: string, index: number) => (
                  <li key={index} className="text-sm text-purple-700 dark:text-purple-300">
                    • {gap}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardHeader>
          <CardTitle className="text-blue-900 dark:text-blue-100">
            AI-Powered Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                Immediate Actions
              </h5>
              <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                <li>• Optimize page load speed to under 2 seconds</li>
                <li>• Add missing meta descriptions</li>
                <li>• Implement structured data markup</li>
                <li>• Create {data.industry} specific landing pages</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                Strategic Opportunities
              </h5>
              <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                <li>• Develop content marketing strategy</li>
                <li>• Launch competitor monitoring</li>
                <li>• Improve mobile user experience</li>
                <li>• Build industry-specific partnerships</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsiteAnalysis;
