
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

const DataSharingSection: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-orange-600" />
          Data Sharing & Third Parties
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">AI Service Providers</h4>
            <p className="text-sm text-orange-800 dark:text-orange-200">
              We use OpenAI and other AI service providers to deliver our intelligent features. Your data is processed according to their privacy policies and our data processing agreements.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">We may share information with:</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>AI service providers (OpenAI, etc.) for processing and analysis</li>
              <li>Analytics providers for platform performance monitoring</li>
              <li>Payment processors for subscription management</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataSharingSection;
