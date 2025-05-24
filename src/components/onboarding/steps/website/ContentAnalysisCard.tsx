
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

interface ContentAnalysisCardProps {
  analysis: any;
  isArabic: boolean;
}

const ContentAnalysisCard: React.FC<ContentAnalysisCardProps> = ({ analysis, isArabic }) => {
  return (
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
  );
};

export default ContentAnalysisCard;
