
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const MediaAlerts: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="mt-4">
      <h3 className="font-medium mb-2">{t('alert.media.title')}</h3>
      <div className="space-y-2">
        <div className="alert-info p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md">
          {t('alert.media.tech')}
        </div>
        <div className="alert-warning p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 rounded-md">
          {t('alert.media.competitor')}
        </div>
      </div>
    </div>
  );
};

export default MediaAlerts;
