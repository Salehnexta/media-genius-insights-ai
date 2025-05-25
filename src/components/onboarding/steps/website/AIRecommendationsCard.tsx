
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AIRecommendationsCardProps {
  industry?: string;
  isArabic: boolean;
}

const AIRecommendationsCard: React.FC<AIRecommendationsCardProps> = ({ industry, isArabic }) => {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
      <CardHeader>
        <CardTitle className="text-blue-900 dark:text-blue-100">
          AI-Powered Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
              Immediate Actions
            </h5>
            <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
              <li>• Optimize page load speed to under 2 seconds</li>
              <li>• Add missing meta descriptions</li>
              <li>• Implement structured data markup</li>
              <li>• Create {industry} specific landing pages</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
              Strategic Opportunities
            </h5>
            <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
              <li>• Develop content marketing strategy</li>
              <li>• Launch competitor monitoring</li>
              <li>• Improve mobile user experience</li>
              <li>• Build industry-specific partnerships</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIRecommendationsCard;
