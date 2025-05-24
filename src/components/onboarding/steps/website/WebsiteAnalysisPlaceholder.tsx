
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, Loader } from 'lucide-react';

interface WebsiteAnalysisPlaceholderProps {
  type: 'no-website' | 'analyzing' | 'start-analysis';
  onStartAnalysis?: () => void;
  isArabic: boolean;
}

const WebsiteAnalysisPlaceholder: React.FC<WebsiteAnalysisPlaceholderProps> = ({
  type,
  onStartAnalysis,
  isArabic
}) => {
  const { t } = useLanguage();

  if (type === 'no-website') {
    return (
      <div className="text-center py-12">
        <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {t('onboarding.website.no-url.title')}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {t('onboarding.website.no-url.description')}
        </p>
      </div>
    );
  }

  if (type === 'analyzing') {
    return (
      <div className="text-center py-12">
        <Loader className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-spin" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {t('onboarding.website.analyzing.title')}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {t('onboarding.website.analyzing.description')}
        </p>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Analyzing SEO • Checking performance • Scanning content • Reviewing competitors
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <Button onClick={onStartAnalysis} className="bg-blue-600 hover:bg-blue-700">
        <Globe className={`w-4 h-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
        {t('onboarding.website.analyze.button')}
      </Button>
    </div>
  );
};

export default WebsiteAnalysisPlaceholder;
