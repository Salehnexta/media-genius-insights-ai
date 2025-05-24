
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

interface CompetitionAnalysisCardProps {
  analysis: any;
  isArabic: boolean;
}

const CompetitionAnalysisCard: React.FC<CompetitionAnalysisCardProps> = ({ analysis, isArabic }) => {
  return (
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
  );
};

export default CompetitionAnalysisCard;
