
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, CheckCircle, AlertCircle } from 'lucide-react';
import { RealWebsiteAnalysisResult } from '@/services/realWebsiteAnalysis';

interface SEOAnalysisCardProps {
  analysis: RealWebsiteAnalysisResult;
  isArabic: boolean;
}

const SEOAnalysisCard: React.FC<SEOAnalysisCardProps> = ({ analysis, isArabic }) => {
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
          <Search className="w-5 h-5" />
          {t('onboarding.website.seo.title')}
          <Badge className={getScoreBadge(analysis.seoScore)}>
            {analysis.seoScore}/100
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h5 className="font-medium text-gray-900 dark:text-white mb-2">
            Technical Stack Detected
          </h5>
          <div className={`flex flex-wrap gap-1 ${isArabic ? 'justify-end' : ''}`}>
            {analysis.technicalDetails.techStack.map((tech: string, index: number) => (
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
            {analysis.seoAnalysis.strengths.map((strength: string, index: number) => (
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
            {analysis.seoAnalysis.issues.map((issue: string, index: number) => (
              <li key={index} className={`flex items-start ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'} text-sm text-yellow-700 dark:text-yellow-300`}>
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SEOAnalysisCard;
