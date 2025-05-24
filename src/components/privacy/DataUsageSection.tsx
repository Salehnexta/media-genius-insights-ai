
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock } from 'lucide-react';

const DataUsageSection: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-purple-600" />
          How We Use Your Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
            <div>
              <h4 className="font-semibold">AI-Powered Insights</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Generate personalized marketing strategies and recommendations using advanced AI analysis</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
            <div>
              <h4 className="font-semibold">Content Creation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Create customized marketing content, copy, and visual assets using AI models</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
            <div>
              <h4 className="font-semibold">Performance Analysis</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Analyze your marketing performance and provide AI-driven optimization suggestions</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
            <div>
              <h4 className="font-semibold">Service Improvement</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Enhance our AI models and platform features based on aggregated usage patterns</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataUsageSection;
