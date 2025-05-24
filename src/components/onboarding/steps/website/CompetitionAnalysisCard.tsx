
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, Users, Link2 } from 'lucide-react';
import { RealWebsiteAnalysisResult } from '@/services/realWebsiteAnalysis';

interface CompetitionAnalysisCardProps {
  analysis: RealWebsiteAnalysisResult;
  isArabic: boolean;
}

const CompetitionAnalysisCard: React.FC<CompetitionAnalysisCardProps> = ({ analysis, isArabic }) => {
  const { t } = useLanguage();

  const getRankingBadge = (ranking: string) => {
    switch (ranking.toLowerCase()) {
      case 'leader':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'challenger':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'follower':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className={`flex items-center ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
          <TrendingUp className="w-5 h-5" />
          {t('onboarding.website.competition.title')}
          <Badge className={getRankingBadge(analysis.competitiveAnalysis.marketPosition)}>
            {analysis.competitiveAnalysis.marketPosition}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`grid grid-cols-3 gap-4 ${isArabic ? 'text-right' : ''}`}>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              #{analysis.competitiveAnalysis.marketRanking}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t('onboarding.website.competition.ranking')}
            </p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {analysis.competitiveAnalysis.keywordRankings}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t('onboarding.website.competition.keywords')}
            </p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {analysis.competitiveAnalysis.backlinks}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t('onboarding.website.competition.backlinks')}
            </p>
          </div>
        </div>

        <div>
          <h5 className="font-medium text-gray-900 dark:text-white mb-2">
            Competitive Advantages
          </h5>
          <ul className="space-y-1">
            {analysis.competitiveAnalysis.competitiveAdvantages.map((advantage: string, index: number) => (
              <li key={index} className={`flex items-start ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'} text-sm text-gray-600 dark:text-gray-300`}>
                <Users className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500" />
                <span>{advantage}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitionAnalysisCard;
