
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Users, TrendingUp, Calendar } from 'lucide-react';
import { OnboardingData } from '../OnboardingWizard';
import { MockDataService } from '@/services/mockDataService';

interface SocialMediaSetupProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  isArabic: boolean;
}

const SocialMediaSetup: React.FC<SocialMediaSetupProps> = ({ data, updateData, isArabic }) => {
  const { t } = useLanguage();
  const [socialMetrics, setSocialMetrics] = useState<Record<string, any>>({});

  const socialPlatforms = [
    { id: 'facebook', label: 'Facebook', icon: Facebook, placeholder: 'https://facebook.com/yourpage' },
    { id: 'instagram', label: 'Instagram', icon: Instagram, placeholder: 'https://instagram.com/youraccount' },
    { id: 'twitter', label: 'Twitter/X', icon: Twitter, placeholder: 'https://twitter.com/youraccount' },
    { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/company/yourcompany' },
    { id: 'youtube', label: 'YouTube', icon: Youtube, placeholder: 'https://youtube.com/c/yourchannel' }
  ];

  const handleSocialAccountChange = (platform: string, value: string) => {
    updateData({
      socialAccounts: {
        ...data.socialAccounts,
        [platform]: value
      }
    });

    // Generate mock metrics when URL is added
    if (value && value.startsWith('http')) {
      const metrics = MockDataService.generateSocialMetrics(platform, data.industry || 'other');
      setSocialMetrics(prev => ({
        ...prev,
        [platform]: metrics
      }));
    } else {
      // Remove metrics when URL is cleared
      setSocialMetrics(prev => {
        const newMetrics = { ...prev };
        delete newMetrics[platform];
        return newMetrics;
      });
    }
  };

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

  const connectedPlatforms = Object.keys(data.socialAccounts).filter(platform => data.socialAccounts[platform]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-600 dark:text-gray-300">
          {t('onboarding.social.description')}
        </p>
      </div>

      <div className="space-y-4">
        {socialPlatforms.map((platform) => {
          const Icon = platform.icon;
          const metrics = socialMetrics[platform.id];
          const hasAccount = data.socialAccounts[platform.id];

          return (
            <div key={platform.id} className="space-y-3">
              <Label 
                htmlFor={platform.id}
                className={`flex items-center ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}
              >
                <Icon className="w-4 h-4" />
                {platform.label}
                {hasAccount && (
                  <Badge variant="secondary" className="ml-auto">
                    Connected
                  </Badge>
                )}
              </Label>
              
              <Input
                id={platform.id}
                type="url"
                value={data.socialAccounts[platform.id] || ''}
                onChange={(e) => handleSocialAccountChange(platform.id, e.target.value)}
                placeholder={platform.placeholder}
                className={isArabic ? 'text-right' : ''}
              />

              {/* Social Metrics Card */}
              {metrics && (
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
                        <div className={`text-lg font-bold ${getEngagementColor(metrics.engagement)}`}>
                          {metrics.engagement.toFixed(1)}%
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">Posts/Week</span>
                        </div>
                        <div className="text-lg font-bold text-purple-600">
                          {metrics.postsPerWeek}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                        <span>Engagement Rate</span>
                        <span>{metrics.engagement.toFixed(1)}%</span>
                      </div>
                      <Progress value={Math.min(metrics.engagement * 20, 100)} className="h-2" />
                    </div>

                    <div className="mt-3">
                      <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Top Content Types
                      </h5>
                      <div className={`flex flex-wrap gap-1 ${isArabic ? 'justify-end' : ''}`}>
                        {metrics.topContent.slice(0, 3).map((content: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {content}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3">
                      <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Audience Demographics
                      </h5>
                      <div className="space-y-1">
                        {metrics.audienceDemographics.ageGroups.slice(0, 2).map((group: any, index: number) => (
                          <div key={index} className="flex justify-between text-xs">
                            <span>{group.range}</span>
                            <span>{group.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          );
        })}
      </div>

      {/* Overall Social Media Insights */}
      {connectedPlatforms.length > 0 && (
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
      )}
    </div>
  );
};

export default SocialMediaSetup;
