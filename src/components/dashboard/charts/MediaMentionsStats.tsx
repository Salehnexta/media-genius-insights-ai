
import React from 'react';
import { TrendingUp } from 'lucide-react';

const MediaMentionsStats: React.FC = () => {
  return (
    <div className="chart-container col-span-1 lg:col-span-2">
      <h3 className="font-medium mb-2">Media Mentions</h3>
      <div className="h-[200px] flex items-center justify-center">
        <div className="text-center p-4">
          <div className="text-3xl font-bold text-blue-500 mb-1">267</div>
          <div className="text-sm text-gray-500">Media mentions in the last 7 days</div>
          <div className="mt-3 text-sm flex items-center justify-center text-green-500">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>24% increase from last week</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaMentionsStats;
