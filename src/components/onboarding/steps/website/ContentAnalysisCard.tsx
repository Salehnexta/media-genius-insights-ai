
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { FileText, MessageSquare, Target } from 'lucide-react';
import { RealWebsiteAnalysisResult } from '@/services/realWebsiteAnalysis';

interface ContentAnalysisCardProps {
  analysis: RealWebsiteAnalysisResult;
  isArabic: boolean;
}

const ContentAnalysisCard: React.FC<ContentAnalysisCardProps> = ({ analysis, isArabic }) => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className={`flex items-center ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
          <FileText className="w-5 h-5" />
          {t('onboarding.website.content.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`grid grid-cols-3 gap-4 ${isArabic ? 'text-right' : ''}`}>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {analysis.contentAnalysis.totalPages}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t('onboarding.website.content.pages')}
            </p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {analysis.contentAnalysis.blogPosts}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t('onboarding.website.content.blog-posts')}
            </p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {analysis.contentAnalysis.contentGaps.length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t('onboarding.website.content.gaps')}
            </p>
          </div>
        </div>

        <div>
          <h5 className="font-medium text-gray-900 dark:text-white mb-2">
            Content Opportunities
          </h5>
          <ul className="space-y-1">
            {analysis.contentAnalysis.contentGaps.map((gap: string, index: number) => (
              <li key={index} className={`flex items-start ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'} text-sm text-gray-600 dark:text-gray-300`}>
                <Target className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-500" />
                <span>{gap}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentAnalysisCard;
