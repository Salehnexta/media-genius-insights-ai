
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Agents = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Agents
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Agents page content will be added here.
        </p>
      </div>
    </div>
  );
};

export default Agents;
