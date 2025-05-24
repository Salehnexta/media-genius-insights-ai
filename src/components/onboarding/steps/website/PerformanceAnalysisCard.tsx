
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp } from 'lucide-react';

interface PerformanceAnalysisCardProps {
  analysis: any;
  isArabic: boolean;
}

const PerformanceAnalysisCard: React.FC<PerformanceAnalysisCardProps> = ({ analysis, isArabic }) => {
  const { t } = useLanguage();

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

  return (
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
  );
};

export default PerformanceAnalysisCard;
