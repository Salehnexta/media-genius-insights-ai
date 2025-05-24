
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp } from 'lucide-react';

interface BasicAnalysisPreviewProps {
  competitorsCount: number;
  showIntelligence: boolean;
  isArabic: boolean;
}

const BasicAnalysisPreview: React.FC<BasicAnalysisPreviewProps> = ({
  competitorsCount,
  showIntelligence,
  isArabic
}) => {
  const { t } = useLanguage();

  if (competitorsCount === 0 || competitorsCount >= 3 || showIntelligence) {
    return null;
  }

  return (
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
  );
};

export default BasicAnalysisPreview;
