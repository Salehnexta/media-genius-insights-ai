
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const MediaMentionsStats: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="chart-container col-span-1 lg:col-span-2">
      <h3 className="font-medium mb-2">{t('chart.media.mentions')}</h3>
      <div className="h-[200px] flex items-center justify-center">
        <div className="text-center p-4">
          <div className="text-3xl font-bold text-blue-500 mb-1">267</div>
          <div className="text-sm text-gray-500">{t('chart.mentions.last.7.days')}</div>
          <div className="mt-3 text-sm flex items-center justify-center text-green-500">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>24% {t('chart.increase.from.last.week')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaMentionsStats;
