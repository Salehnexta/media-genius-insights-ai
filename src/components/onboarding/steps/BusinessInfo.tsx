
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Building, Globe, Target, TrendingUp, Users, BarChart3, Calendar } from 'lucide-react';
import { OnboardingData } from '../OnboardingWizard';
import { MockDataService } from '@/services/mockDataService';

interface BusinessInfoProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  isArabic: boolean;
}

const BusinessInfo: React.FC<BusinessInfoProps> = ({ data, updateData, isArabic }) => {
  const { t } = useLanguage();
  const [industryBenchmarks, setIndustryBenchmarks] = useState<any>(null);

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

  // Generate industry benchmarks when industry is selected
  useEffect(() => {
    if (data.industry) {
      const benchmarks = MockDataService.generateIndustryBenchmarks(data.industry);
      setIndustryBenchmarks(benchmarks);
    }
  }, [data.industry]);

  const handleIndustryChange = (value: string) => {
    updateData({ industry: value });
  };

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
          <Select value={data.industry} onValueChange={handleIndustryChange}>
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

      {/* Industry Benchmarks & Insights */}
      {industryBenchmarks && (
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle className={`flex items-center ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                <BarChart3 className="w-5 h-5" />
                {t('onboarding.business.insights.title')} - {industries.find(i => i.id === data.industry)?.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {industryBenchmarks.avgConversionRate}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Avg Conversion Rate
                  </div>
                </div>
                <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {industryBenchmarks.avgCTR}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Avg Click-Through Rate
                  </div>
                </div>
                <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    ${industryBenchmarks.avgCPM}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Avg CPM
                  </div>
                </div>
              </div>

              {/* Top Marketing Channels */}
              <div>
                <h5 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
                  Most Effective Marketing Channels
                </h5>
                <div className={`flex flex-wrap gap-2 ${isArabic ? 'justify-end' : ''}`}>
                  {industryBenchmarks.topChannels.map((channel: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                      {channel}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Competitor Landscape */}
              <div>
                <h5 className="font-medium text-purple-900 dark:text-purple-100 mb-3">
                  Competitive Landscape Analysis
                </h5>
                <div className="space-y-2">
                  {industryBenchmarks.competitorAnalysis.map((competitor: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-white/30 dark:bg-gray-800/30 rounded">
                      <div>
                        <div className="font-medium text-sm">{competitor.name}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          Market Share: {competitor.marketShare}%
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-green-600 font-medium">
                          {competitor.strengths[0]}
                        </div>
                        <div className="text-xs text-red-600">
                          {competitor.weaknesses[0]}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seasonal Trends */}
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                <Calendar className="w-5 h-5" />
                Seasonal Performance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-12 gap-1">
                {industryBenchmarks.seasonalTrends.map((trend: any, index: number) => (
                  <div key={index} className="text-center">
                    <div className={`h-16 bg-gradient-to-t from-blue-200 to-blue-500 rounded-sm mb-1 relative ${
                      trend.performance >= 110 ? 'from-green-200 to-green-500' : 
                      trend.performance <= 90 ? 'from-red-200 to-red-500' : ''
                    }`} style={{ height: `${Math.max(trend.performance * 0.6, 20)}px` }}>
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium">
                        {trend.performance}
                      </div>
                    </div>
                    <div className="text-xs font-medium">{trend.month}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center justify-between">
                  <span>Performance Index (100 = Average)</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
                      <span className="text-xs">High (110+)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
                      <span className="text-xs">Normal (90-110)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded mr-1"></div>
                      <span className="text-xs">Low (&lt;90)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
            <CardHeader>
              <CardTitle className="text-blue-900 dark:text-blue-100">
                AI-Powered Industry Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    Focus on {industryBenchmarks.topChannels[0]} and {industryBenchmarks.topChannels[1]} for maximum ROI in the {data.industry} industry
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Users className="w-4 h-4 text-green-600 mt-0.5" />
                  <div className="text-sm text-green-800 dark:text-green-200">
                    Target conversion rate of {industryBenchmarks.avgConversionRate}% based on industry benchmarks
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Calendar className="w-4 h-4 text-purple-600 mt-0.5" />
                  <div className="text-sm text-purple-800 dark:text-purple-200">
                    Plan budget increases for peak months and optimize campaigns during low seasons
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BusinessInfo;
