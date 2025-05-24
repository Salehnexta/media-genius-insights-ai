
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, Plus, X, TrendingUp, Target, Globe } from 'lucide-react';
import { OnboardingData } from '../OnboardingWizard';
import CompetitorIntelligence from './CompetitorIntelligence';

interface CompetitorAnalysisProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  isArabic: boolean;
}

const CompetitorAnalysis: React.FC<CompetitorAnalysisProps> = ({ data, updateData, isArabic }) => {
  const { t } = useLanguage();
  const [competitorInput, setCompetitorInput] = useState('');
  const [showIntelligence, setShowIntelligence] = useState(false);

  const addCompetitor = () => {
    if (competitorInput.trim() && !data.competitors.includes(competitorInput.trim())) {
      const newCompetitors = [...data.competitors, competitorInput.trim()];
      updateData({ competitors: newCompetitors });
      setCompetitorInput('');
      
      // Auto-show intelligence when we have competitors
      if (newCompetitors.length >= 1) {
        setShowIntelligence(true);
      }
    }
  };

  const removeCompetitor = (competitor: string) => {
    const newCompetitors = data.competitors.filter(c => c !== competitor);
    updateData({ competitors: newCompetitors });
    
    // Hide intelligence if no competitors
    if (newCompetitors.length === 0) {
      setShowIntelligence(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addCompetitor();
    }
  };

  const suggestedCompetitors = {
    technology: ['Microsoft', 'Google', 'Amazon', 'Apple', 'Meta'],
    retail: ['Amazon', 'Walmart', 'Target', 'Best Buy', 'Costco'],
    food: ['McDonald\'s', 'Starbucks', 'Subway', 'KFC', 'Pizza Hut'],
    healthcare: ['Johnson & Johnson', 'Pfizer', 'UnitedHealth', 'CVS Health', 'Anthem'],
    finance: ['JPMorgan Chase', 'Bank of America', 'Wells Fargo', 'Citigroup', 'Goldman Sachs'],
    education: ['Coursera', 'Udemy', 'Khan Academy', 'edX', 'Skillshare'],
    travel: ['Booking.com', 'Expedia', 'Airbnb', 'TripAdvisor', 'Kayak'],
    'real-estate': ['Zillow', 'Realtor.com', 'Redfin', 'Compass', 'Century 21'],
    consulting: ['McKinsey', 'BCG', 'Bain', 'Deloitte', 'PwC'],
    other: ['Company A', 'Company B', 'Company C', 'Company D', 'Company E']
  };

  const suggestions = data.industry ? 
    suggestedCompetitors[data.industry as keyof typeof suggestedCompetitors] || suggestedCompetitors.other :
    [];

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

      {/* Industry Suggestions */}
      {suggestions.length > 0 && data.competitors.length < 3 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Popular {data.industry} competitors:
          </Label>
          <div className={`flex flex-wrap gap-2 ${isArabic ? 'justify-end' : ''}`}>
            {suggestions.slice(0, 5).map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                onClick={() => {
                  if (!data.competitors.includes(suggestion)) {
                    const newCompetitors = [...data.competitors, suggestion];
                    updateData({ competitors: newCompetitors });
                    if (newCompetitors.length >= 1) {
                      setShowIntelligence(true);
                    }
                  }
                }}
                disabled={data.competitors.includes(suggestion)}
                className="text-xs"
              >
                <Plus className="w-3 h-3 mr-1" />
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Competitors List */}
      {data.competitors.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 dark:text-white">
              {t('onboarding.competitors.list')} ({data.competitors.length})
            </h4>
            {data.competitors.length > 0 && !showIntelligence && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowIntelligence(true)}
                className="text-xs"
              >
                <Target className="w-3 h-3 mr-1" />
                Analyze Competitors
              </Button>
            )}
          </div>
          
          <div className={`flex flex-wrap gap-2 ${isArabic ? 'justify-end' : ''}`}>
            {data.competitors.map((competitor, index) => (
              <Badge key={index} variant="outline" className="px-3 py-1">
                <Globe className="w-3 h-3 mr-1" />
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

      {/* Basic Analysis Preview for fewer competitors */}
      {data.competitors.length > 0 && data.competitors.length < 3 && !showIntelligence && (
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
            <div className="mt-4">
              <p className="text-xs text-orange-700 dark:text-orange-300">
                Add more competitors for comprehensive intelligence analysis
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comprehensive Intelligence Analysis */}
      {showIntelligence && data.competitors.length > 0 && (
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Competitive Intelligence Report
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowIntelligence(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <CompetitorIntelligence
            data={data}
            updateData={updateData}
            isArabic={isArabic}
          />
        </div>
      )}
    </div>
  );
};

export default CompetitorAnalysis;
