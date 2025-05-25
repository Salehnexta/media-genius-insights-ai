
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, TrendingUp, Calendar } from 'lucide-react';
import { SocialMediaMetrics } from '@/services/realSocialMediaAnalysis';

interface SocialMetricsCardProps {
  metrics: SocialMediaMetrics;
  isArabic: boolean;
}

const SocialMetricsCard: React.FC<SocialMetricsCardProps> = ({ metrics, isArabic }) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getEngagementColor = (rate: number): string => {
    if (rate >= 3) return 'text-green-600';
    if (rate >= 2) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Extract top content types from recent posts
  const topContent = metrics.recent_posts?.slice(0, 3).map(post => 
    post.content.split(' ').slice(0, 2).join(' ') + '...'
  ) || ['Photos', 'Videos', 'Stories'];

  return (
    <Card className="bg-gray-50 dark:bg-gray-800/50">
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-3">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Users className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">Followers</span>
            </div>
            <div className="text-lg font-bold text-blue-600">
              {formatNumber(metrics.followers)}
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">Engagement</span>
            </div>
            <div className={`text-lg font-bold ${getEngagementColor(metrics.engagement_rate)}`}>
              {metrics.engagement_rate.toFixed(1)}%
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Calendar className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">Posts/Week</span>
            </div>
            <div className="text-lg font-bold text-purple-600">
              {metrics.growth_metrics?.posting_frequency || 0}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>Engagement Rate</span>
            <span>{metrics.engagement_rate.toFixed(1)}%</span>
          </div>
          <Progress value={Math.min(metrics.engagement_rate * 20, 100)} className="h-2" />
        </div>

        <div className="mt-3">
          <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Recent Content
          </h5>
          <div className={`flex flex-wrap gap-1 ${isArabic ? 'justify-end' : ''}`}>
            {topContent.map((content: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {content}
              </Badge>
            ))}
          </div>
        </div>

        {metrics.profile_info.verified && (
          <div className="mt-3">
            <Badge variant="secondary" className="text-xs">
              ✓ Verified Account
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SocialMetricsCard;
