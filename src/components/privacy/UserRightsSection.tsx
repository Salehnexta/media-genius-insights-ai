
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye } from 'lucide-react';

const UserRightsSection: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-red-600" />
          Your Rights & Data Control
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Access & Portability</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>Request access to your data</li>
              <li>Export your information</li>
              <li>View AI interaction history</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Deletion & Correction</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>Delete your account and data</li>
              <li>Correct inaccurate information</li>
              <li>Opt-out of AI processing</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserRightsSection;
