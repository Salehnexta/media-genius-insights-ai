
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, CheckCircle, AlertCircle, Loader, TrendingUp, Users, Search } from 'lucide-react';
import { OnboardingData } from '../OnboardingWizard';

interface WebsiteAnalysisProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  isArabic: boolean;
}

// Mock website analysis data
const mockWebsiteAnalysis = {
  seo: {
    score: 78,
    issues: [
      'Missing meta description on 3 pages',
      'Page load speed could be improved',
      'Alt text missing on 5 images'
    ],
    strengths: [
      'Good title tag optimization',
      'Mobile-friendly design',
      'SSL certificate installed'
    ]
  },
  performance: {
    score: 85,
    loadTime: '2.1s',
    mobileScore: 82,
    desktopScore: 88
  },
  content: {
    pages: 12,
    blogPosts: 8,
    lastUpdated: '2024-01-15',
    contentGaps: [
      'Product comparison guides',
      'Customer testimonials',
      'FAQ section needs expansion'
    ]
  },
  competition: {
    ranking: 'Top 3 in local market',
    keywords: 45,
    backlinks: 234
  }
};

const WebsiteAnalysis: React.FC<WebsiteAnalysisProps> = ({ data, updateData, isArabic }) => {
  const { t } = useLanguage();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<typeof mockWebsiteAnalysis | null>(null);

  const startAnalysis = () => {
    if (!data.website) return;
    
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setAnalysis(mockWebsiteAnalysis);
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
          {t('onboarding.website.analyzing.steps')}
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

      {/* Analysis Results */}
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
                {t('onboarding.website.seo.strengths')}
              </h5>
              <ul className="space-y-1">
                {analysis.seo.strengths.map((strength, index) => (
                  <li key={index} className={`flex items-start ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'} text-sm text-green-700 dark:text-green-300`}>
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                {t('onboarding.website.seo.issues')}
              </h5>
              <ul className="space-y-1">
                {analysis.seo.issues.map((issue, index) => (
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
                  {t('onboarding.website.performance.load-time')}
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {analysis.performance.loadTime}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('onboarding.website.performance.mobile')}
                </p>
                <p className={`text-lg font-semibold ${getScoreColor(analysis.performance.mobileScore)}`}>
                  {analysis.performance.mobileScore}/100
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <Users className="w-5 h-5" />
              {t('onboarding.website.content.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('onboarding.website.content.pages')}
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {analysis.content.pages}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('onboarding.website.content.blog-posts')}
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {analysis.content.blogPosts}
                </p>
              </div>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                {t('onboarding.website.content.gaps')}
              </h5>
              <ul className="space-y-1">
                {analysis.content.contentGaps.map((gap, index) => (
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
            <CardTitle>
              {t('onboarding.website.competition.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t('onboarding.website.competition.ranking')}
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {analysis.competition.ranking}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('onboarding.website.competition.keywords')}
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {analysis.competition.keywords}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('onboarding.website.competition.backlinks')}
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {analysis.competition.backlinks}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardHeader>
          <CardTitle className="text-blue-900 dark:text-blue-100">
            {t('onboarding.website.recommendations.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li>• {t('onboarding.website.recommendations.seo')}</li>
            <li>• {t('onboarding.website.recommendations.content')}</li>
            <li>• {t('onboarding.website.recommendations.performance')}</li>
            <li>• {t('onboarding.website.recommendations.competition')}</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsiteAnalysis;
