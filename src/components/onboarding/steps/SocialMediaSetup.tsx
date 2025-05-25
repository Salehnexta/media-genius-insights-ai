
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import { OnboardingData } from '../OnboardingWizard';
import { useRealSocialMediaAnalysis } from '@/hooks/useRealSocialMediaAnalysis';
import { SocialMediaMetrics } from '@/services/realSocialMediaAnalysis';
import SocialPlatformInput from './social/SocialPlatformInput';
import SocialMetricsCard from './social/SocialMetricsCard';
import SocialInsightsSummary from './social/SocialInsightsSummary';

interface SocialMediaSetupProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  isArabic: boolean;
}

const SocialMediaSetup: React.FC<SocialMediaSetupProps> = ({ data, updateData, isArabic }) => {
  const { t } = useLanguage();
  const { analyzeSocialAccount, analyzing } = useRealSocialMediaAnalysis();
  const [socialMetrics, setSocialMetrics] = useState<Record<string, SocialMediaMetrics>>({});
  const [analyzingPlatforms, setAnalyzingPlatforms] = useState<Set<string>>(new Set());

  const socialPlatforms = [
    { id: 'facebook', label: 'Facebook', icon: Facebook, placeholder: 'https://facebook.com/yourpage' },
    { id: 'instagram', label: 'Instagram', icon: Instagram, placeholder: 'https://instagram.com/youraccount' },
    { id: 'twitter', label: 'Twitter/X', icon: Twitter, placeholder: 'https://twitter.com/youraccount' },
    { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/company/yourcompany' },
    { id: 'youtube', label: 'YouTube', icon: Youtube, placeholder: 'https://youtube.com/c/yourchannel' }
  ];

  const handleSocialAccountChange = async (platform: string, value: string) => {
    updateData({
      socialAccounts: {
        ...data.socialAccounts,
        [platform]: value
      }
    });

    // Analyze the social account if URL is valid
    if (value && value.startsWith('http')) {
      setAnalyzingPlatforms(prev => new Set([...prev, platform]));
      
      try {
        const metrics = await analyzeSocialAccount(platform, value);
        if (metrics) {
          setSocialMetrics(prev => ({
            ...prev,
            [platform]: metrics
          }));
        }
      } catch (error) {
        console.error(`Error analyzing ${platform}:`, error);
      } finally {
        setAnalyzingPlatforms(prev => {
          const newSet = new Set(prev);
          newSet.delete(platform);
          return newSet;
        });
      }
    } else {
      // Remove metrics when URL is cleared
      setSocialMetrics(prev => {
        const newMetrics = { ...prev };
        delete newMetrics[platform];
        return newMetrics;
      });
    }
  };

  const connectedPlatforms = Object.keys(data.socialAccounts).filter(platform => data.socialAccounts[platform]);
  const isAnalyzing = analyzingPlatforms.size > 0;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-600 dark:text-gray-300">
          {t('onboarding.social.description')}
        </p>
        {isAnalyzing && (
          <p className="text-sm text-blue-600 mt-2">
            Analyzing social media accounts... This may take a moment.
          </p>
        )}
      </div>

      <div className="space-y-4">
        {socialPlatforms.map((platform) => {
          const metrics = socialMetrics[platform.id];
          const platformAnalyzing = analyzingPlatforms.has(platform.id);

          return (
            <div key={platform.id} className="space-y-3">
              <SocialPlatformInput
                platform={platform}
                value={data.socialAccounts[platform.id]}
                onChange={handleSocialAccountChange}
                isArabic={isArabic}
                isAnalyzing={platformAnalyzing}
              />

              {/* Real Social Metrics Card */}
              {metrics && !platformAnalyzing && (
                <SocialMetricsCard
                  metrics={metrics}
                  isArabic={isArabic}
                />
              )}

              {/* Loading state for individual platform */}
              {platformAnalyzing && (
                <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <div className="animate-pulse">
                    <div className="h-4 bg-blue-200 dark:bg-blue-700 rounded mb-2"></div>
                    <div className="h-3 bg-blue-200 dark:bg-blue-700 rounded w-3/4"></div>
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                    Analyzing {platform.label} account...
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Overall Social Media Insights */}
      {connectedPlatforms.length > 0 && Object.keys(socialMetrics).length > 0 && (
        <SocialInsightsSummary
          connectedPlatforms={connectedPlatforms}
          socialMetrics={socialMetrics}
          isArabic={isArabic}
        />
      )}
    </div>
  );
};

export default SocialMediaSetup;
