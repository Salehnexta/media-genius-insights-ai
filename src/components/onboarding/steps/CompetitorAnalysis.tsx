
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, Plus, X, TrendingUp } from 'lucide-react';
import { OnboardingData } from '../OnboardingWizard';

interface CompetitorAnalysisProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  isArabic: boolean;
}

const CompetitorAnalysis: React.FC<CompetitorAnalysisProps> = ({ data, updateData, isArabic }) => {
  const { t } = useLanguage();
  const [competitorInput, setCompetitorInput] = useState('');

  const addCompetitor = () => {
    if (competitorInput.trim() && !data.competitors.includes(competitorInput.trim())) {
      updateData({
        competitors: [...data.competitors, competitorInput.trim()]
      });
      setCompetitorInput('');
    }
  };

  const removeCompetitor = (competitor: string) => {
    updateData({
      competitors: data.competitors.filter(c => c !== competitor)
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addCompetitor();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-600 dark:text-gray-300">
          {t('onboarding.competitors.description')}
        </p>
      </div>

      {/* Add Competitor Input */}
      <div className="space-y-2">
        <Label htmlFor="competitor" className={`flex items-center ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
          <Search className="w-4 h-4" />
          {t('onboarding.competitors.add')}
        </Label>
        <div className={`flex gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <Input
            id="competitor"
            value={competitorInput}
            onChange={(e) => setCompetitorInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('onboarding.competitors.placeholder')}
            className={`flex-1 ${isArabic ? 'text-right' : ''}`}
          />
          <Button onClick={addCompetitor} disabled={!competitorInput.trim()}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Competitors List */}
      {data.competitors.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 dark:text-white">
            {t('onboarding.competitors.list')}
          </h4>
          <div className={`flex flex-wrap gap-2 ${isArabic ? 'justify-end' : ''}`}>
            {data.competitors.map((competitor, index) => (
              <Badge key={index} variant="outline" className="px-3 py-1">
                {competitor}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-auto p-0"
                  onClick={() => removeCompetitor(competitor)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Analysis Preview */}
      {data.competitors.length > 0 && (
        <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-6">
            <div className={`flex items-center mb-3 ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <TrendingUp className="w-5 h-5 text-orange-600" />
              <h4 className="font-semibold text-orange-900 dark:text-orange-100">
                {t('onboarding.competitors.analysis.title')}
              </h4>
            </div>
            <div className="space-y-2 text-sm text-orange-800 dark:text-orange-200">
              <p>• {t('onboarding.competitors.analysis.performance')}</p>
              <p>• {t('onboarding.competitors.analysis.keywords')}</p>
              <p>• {t('onboarding.competitors.analysis.content')}</p>
              <p>• {t('onboarding.competitors.analysis.social')}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CompetitorAnalysis;
