
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Gauge, Clock, Smartphone } from 'lucide-react';
import { RealWebsiteAnalysisResult } from '@/services/realWebsiteAnalysis';

interface PerformanceAnalysisCardProps {
  analysis: RealWebsiteAnalysisResult;
  isArabic: boolean;
}

const PerformanceAnalysisCard: React.FC<PerformanceAnalysisCardProps> = ({ analysis, isArabic }) => {
  const { t } = useLanguage();

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className={`flex items-center ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
          <Gauge className="w-5 h-5" />
          {t('onboarding.website.performance.title')}
          <Badge className={getScoreBadge(analysis.performanceScore)}>
            {analysis.performanceScore}/100
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`grid grid-cols-2 gap-4 ${isArabic ? 'text-right' : ''}`}>
          <div className="space-y-1">
            <div className={`flex items-center ${isArabic ? 'space-x-reverse space-x-1' : 'space-x-1'} text-sm text-gray-600 dark:text-gray-300`}>
              <Clock className="w-4 h-4" />
              <span>{t('onboarding.website.performance.load-time')}</span>
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {analysis.performanceMetrics.loadTime}ms
            </p>
          </div>

          <div className="space-y-1">
            <div className={`flex items-center ${isArabic ? 'space-x-reverse space-x-1' : 'space-x-1'} text-sm text-gray-600 dark:text-gray-300`}>
              <Smartphone className="w-4 h-4" />
              <span>{t('onboarding.website.performance.mobile')}</span>
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {analysis.mobileScore}/100
            </p>
          </div>
        </div>

        <div>
          <h5 className="font-medium text-gray-900 dark:text-white mb-2">
            Performance Insights
          </h5>
          <ul className="space-y-1">
            {analysis.performanceMetrics.recommendations.map((recommendation: string, index: number) => (
              <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
                • {recommendation}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceAnalysisCard;
