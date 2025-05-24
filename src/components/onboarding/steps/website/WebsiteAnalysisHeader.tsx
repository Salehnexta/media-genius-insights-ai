
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface WebsiteAnalysisHeaderProps {
  website: string;
  onRefresh: () => void;
  isArabic: boolean;
}

const WebsiteAnalysisHeader: React.FC<WebsiteAnalysisHeaderProps> = ({
  website,
  onRefresh,
  isArabic
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t('onboarding.website.results.title')}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {website}
        </p>
      </div>
      <Button variant="outline" size="sm" onClick={onRefresh}>
        {t('onboarding.website.refresh')}
      </Button>
    </div>
  );
};

export default WebsiteAnalysisHeader;
