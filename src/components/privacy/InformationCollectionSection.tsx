
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database } from 'lucide-react';

const InformationCollectionSection: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5 text-green-600" />
          Information We Collect
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Business Information</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>Company name, industry, and website URL</li>
              <li>Social media accounts and marketing goals</li>
              <li>Competitor information and market analysis data</li>
              <li>Campaign performance and analytics data</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">AI Interaction Data</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>Chat conversations with AI agents</li>
              <li>Content generation requests and outputs</li>
              <li>AI recommendations and insights viewed</li>
              <li>Usage patterns and feature utilization</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InformationCollectionSection;
