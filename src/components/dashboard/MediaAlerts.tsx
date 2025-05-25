
import React from 'react';

const MediaAlerts: React.FC = () => {
  return (
    <div className="mt-4">
      <h3 className="font-medium mb-2">Latest Media Alerts</h3>
      <div className="space-y-2">
        <div className="alert-info p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md">
          TechCrunch published an article mentioning your latest product launch
        </div>
        <div className="alert-warning p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 rounded-md">
          Competitor B launched a new marketing campaign targeting your customer base
        </div>
      </div>
    </div>
  );
};

export default MediaAlerts;
