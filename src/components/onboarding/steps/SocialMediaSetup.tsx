
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import { OnboardingData } from '../OnboardingWizard';

interface SocialMediaSetupProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  isArabic: boolean;
}

const SocialMediaSetup: React.FC<SocialMediaSetupProps> = ({ data, updateData, isArabic }) => {
  const { t } = useLanguage();

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
  };

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
          return (
            <div key={platform.id} className="space-y-2">
              <Label 
                htmlFor={platform.id}
                className={`flex items-center ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}
              >
                <Icon className="w-4 h-4" />
                {platform.label}
              </Label>
              <Input
                id={platform.id}
                type="url"
                value={data.socialAccounts[platform.id] || ''}
                onChange={(e) => handleSocialAccountChange(platform.id, e.target.value)}
                placeholder={platform.placeholder}
                className={isArabic ? 'text-right' : ''}
              />
            </div>
          );
        })}
      </div>

      {Object.keys(data.socialAccounts).length > 0 && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3">
              {t('onboarding.social.insights.title')}
            </h4>
            <div className={`flex flex-wrap gap-2 ${isArabic ? 'justify-end' : ''}`}>
              <Badge variant="secondary">{t('onboarding.social.feature.analytics')}</Badge>
              <Badge variant="secondary">{t('onboarding.social.feature.scheduling')}</Badge>
              <Badge variant="secondary">{t('onboarding.social.feature.monitoring')}</Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SocialMediaSetup;
