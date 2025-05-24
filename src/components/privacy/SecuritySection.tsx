
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

const SecuritySection: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          Data Security & Retention
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Security Measures</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              We implement industry-standard security measures including:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>End-to-end encryption for data transmission</li>
              <li>Secure data storage with access controls</li>
              <li>Regular security audits and monitoring</li>
              <li>AI model access restrictions and logging</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Data Retention</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              We retain your data for as long as your account is active or as needed to provide services. AI conversation history is retained for 12 months to improve service quality, unless you request earlier deletion.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySection;
