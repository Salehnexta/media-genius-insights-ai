import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Building, Globe, Target } from 'lucide-react';
import { OnboardingData } from '../OnboardingWizard';

interface BusinessInfoProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  isArabic: boolean;
}

const BusinessInfo: React.FC<BusinessInfoProps> = ({ data, updateData, isArabic }) => {
  const { t } = useLanguage();

  const industries = [
    { id: 'technology', label: t('industry.technology') },
    { id: 'healthcare', label: t('industry.healthcare') },
    { id: 'finance', label: t('industry.finance') },
    { id: 'retail', label: t('industry.retail') },
    { id: 'education', label: t('industry.education') },
    { id: 'food', label: t('industry.food') },
    { id: 'travel', label: t('industry.travel') },
    { id: 'real-estate', label: t('industry.real-estate') },
    { id: 'consulting', label: t('industry.consulting') },
    { id: 'other', label: t('industry.other') }
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Business Name */}
        <div className="space-y-2">
          <Label htmlFor="businessName" className={`flex items-center ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
            <Building className="w-4 h-4" />
            {t('onboarding.business.name')}
          </Label>
          <Input
            id="businessName"
            value={data.businessName}
            onChange={(e) => updateData({ businessName: e.target.value })}
            placeholder={t('onboarding.business.name.placeholder')}
            className={isArabic ? 'text-right' : ''}
          />
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <Label className={`flex items-center ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
            <Target className="w-4 h-4" />
            {t('onboarding.business.industry')}
          </Label>
          <Select value={data.industry} onValueChange={(value) => updateData({ industry: value })}>
            <SelectTrigger>
              <SelectValue placeholder={t('onboarding.business.industry.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry.id} value={industry.id}>
                  {industry.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Website URL */}
      <div className="space-y-2">
        <Label htmlFor="website" className={`flex items-center ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
          <Globe className="w-4 h-4" />
          {t('onboarding.business.website')}
        </Label>
        <Input
          id="website"
          type="url"
          value={data.website}
          onChange={(e) => updateData({ website: e.target.value })}
          placeholder={t('onboarding.business.website.placeholder')}
          className={isArabic ? 'text-right' : ''}
        />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t('onboarding.business.website.help')}
        </p>
      </div>

      {/* Industry Insights Preview */}
      {data.industry && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-3">
              {t('onboarding.business.insights.title')}
            </h4>
            <div className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
              <p>• {t('onboarding.business.insights.templates', { industry: industries.find(i => i.id === data.industry)?.label })}</p>
              <p>• {t('onboarding.business.insights.benchmarks')}</p>
              <p>• {t('onboarding.business.insights.competitors')}</p>
              <p>• {t('onboarding.business.insights.trends')}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BusinessInfo;
