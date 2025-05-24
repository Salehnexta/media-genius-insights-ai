
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, X, Target } from 'lucide-react';

interface CompetitorListProps {
  competitors: string[];
  onRemoveCompetitor: (competitor: string) => void;
  onShowIntelligence: () => void;
  showIntelligence: boolean;
  isArabic: boolean;
}

const CompetitorList: React.FC<CompetitorListProps> = ({
  competitors,
  onRemoveCompetitor,
  onShowIntelligence,
  showIntelligence,
  isArabic
}) => {
  const { t } = useLanguage();

  if (competitors.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900 dark:text-white">
          {t('onboarding.competitors.list')} ({competitors.length})
        </h4>
        {competitors.length > 0 && !showIntelligence && (
          <Button
            variant="outline"
            size="sm"
            onClick={onShowIntelligence}
            className="text-xs"
          >
            <Target className="w-3 h-3 mr-1" />
            Analyze Competitors
          </Button>
        )}
      </div>
      
      <div className={`flex flex-wrap gap-2 ${isArabic ? 'justify-end' : ''}`}>
        {competitors.map((competitor, index) => (
          <Badge key={index} variant="outline" className="px-3 py-1">
            <Globe className="w-3 h-3 mr-1" />
            {competitor}
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 h-auto p-0"
              onClick={() => onRemoveCompetitor(competitor)}
            >
              <X className="w-3 h-3" />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default CompetitorList;
