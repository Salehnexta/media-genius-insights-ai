
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SocialInsightsSummaryProps {
  connectedPlatforms: string[];
  socialMetrics: Record<string, any>;
  isArabic: boolean;
}

const SocialInsightsSummary: React.FC<SocialInsightsSummaryProps> = ({
  connectedPlatforms,
  socialMetrics,
  isArabic
}) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
      <CardHeader>
        <CardTitle className="text-green-900 dark:text-green-100">
          Social Media Intelligence Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">
              Connected Platforms: {connectedPlatforms.length}
            </h5>
            <div className={`flex flex-wrap gap-2 ${isArabic ? 'justify-end' : ''}`}>
              {connectedPlatforms.map(platform => (
                <Badge key={platform} variant="secondary">
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">
              Available Features
            </h5>
            <div className="space-y-1 text-sm text-green-700 dark:text-green-300">
              <div>• Cross-platform analytics</div>
              <div>• Content scheduling</div>
              <div>• Audience insights</div>
              <div>• Performance monitoring</div>
            </div>
          </div>
        </div>

        {Object.keys(socialMetrics).length > 0 && (
          <div className="mt-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">
              Total Reach Potential
            </h5>
            <div className="text-2xl font-bold text-green-600">
              {formatNumber(
                Object.values(socialMetrics).reduce((total: number, metrics: any) => total + metrics.followers, 0)
              )} followers
            </div>
            <div className="text-sm text-green-700 dark:text-green-300">
              Average engagement: {
                Object.values(socialMetrics).length > 0
                  ? (Object.values(socialMetrics).reduce((total: number, metrics: any) => total + metrics.engagement, 0) / Object.values(socialMetrics).length).toFixed(1)
                  : 0
              }%
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SocialInsightsSummary;
