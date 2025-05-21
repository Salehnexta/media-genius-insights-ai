
import React from 'react';

const MediaAlerts: React.FC = () => {
  return (
    <div className="mt-4">
      <h3 className="font-medium mb-2">Latest Media Alerts</h3>
      <div className="space-y-2">
        <div className="alert-info">
          TechCrunch published an article mentioning your latest product launch
        </div>
        <div className="alert-warning">
          Competitor B launched a new marketing campaign targeting your customer base
        </div>
      </div>
    </div>
  );
};

export default MediaAlerts;
