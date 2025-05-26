
import React from 'react';
import OpenAITest from '@/components/debug/OpenAITest';

const OpenAITestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            اختبار OpenAI API
          </h1>
          <OpenAITest />
        </div>
      </div>
    </div>
  );
};

export default OpenAITestPage;
