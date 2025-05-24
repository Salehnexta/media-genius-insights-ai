
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import { OnboardingData } from '../OnboardingWizard';
import { MockDataService } from '@/services/mockDataService';
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
          const metrics = socialMetrics[platform.id];

          return (
            <div key={platform.id} className="space-y-3">
              <SocialPlatformInput
                platform={platform}
                value={data.socialAccounts[platform.id]}
                onChange={handleSocialAccountChange}
                isArabic={isArabic}
              />

              {/* Social Metrics Card */}
              {metrics && (
                <SocialMetricsCard
                  metrics={metrics}
                  isArabic={isArabic}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Overall Social Media Insights */}
      {connectedPlatforms.length > 0 && (
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
