
import React from 'react';
import WebsiteScrapingTest from '@/components/debug/WebsiteScrapingTest';

const ScrapingTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            اختبار RapidAPI Scraping
          </h1>
          <WebsiteScrapingTest />
        </div>
      </div>
    </div>
  );
};

export default ScrapingTest;
