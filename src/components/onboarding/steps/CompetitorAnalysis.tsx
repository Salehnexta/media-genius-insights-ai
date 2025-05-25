
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { X } from 'lucide-react';
import { OnboardingData } from '../OnboardingWizard';
import CompetitorInput from './competitor/CompetitorInput';
import CompetitorSuggestions from './competitor/CompetitorSuggestions';
import CompetitorList from './competitor/CompetitorList';
import BasicAnalysisPreview from './competitor/BasicAnalysisPreview';
import CompetitorIntelligence from './CompetitorIntelligence';

interface CompetitorAnalysisProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  isArabic: boolean;
}

const CompetitorAnalysis: React.FC<CompetitorAnalysisProps> = ({ data, updateData, isArabic }) => {
  const { t } = useLanguage();
  const [showIntelligence, setShowIntelligence] = useState(false);

  const addCompetitor = (competitor: string) => {
    if (!data.competitors.includes(competitor)) {
      const newCompetitors = [...data.competitors, competitor];
      updateData({ competitors: newCompetitors });
      
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

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-600 dark:text-gray-300">
          {t('onboarding.competitors.description')}
        </p>
      </div>

      {/* Add Competitor Input */}
      <CompetitorInput onAddCompetitor={addCompetitor} isArabic={isArabic} />

      {/* Industry Suggestions */}
      <CompetitorSuggestions
        industry={data.industry || ''}
        competitors={data.competitors}
        onAddCompetitor={addCompetitor}
        isArabic={isArabic}
      />

      {/* Competitors List */}
      <CompetitorList
        competitors={data.competitors}
        onRemoveCompetitor={removeCompetitor}
        onShowIntelligence={() => setShowIntelligence(true)}
        showIntelligence={showIntelligence}
        isArabic={isArabic}
      />

      {/* Basic Analysis Preview */}
      <BasicAnalysisPreview
        competitorsCount={data.competitors.length}
        showIntelligence={showIntelligence}
        isArabic={isArabic}
      />

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
