
import React, { useState } from 'react';
import { AreaChart, BarChart, LineChart, PieChart, LayoutGrid, Users, Gauge, TrendingUp } from 'lucide-react';
import TabButton from './TabButton';
import PerformanceTrendsChart from './charts/PerformanceTrendsChart';
import SentimentAnalysisChart from './charts/SentimentAnalysisChart';
import ShareOfVoiceChart from './charts/ShareOfVoiceChart';
import MediaMentionsStats from './charts/MediaMentionsStats';
import MediaAlerts from './MediaAlerts';
import { getChartConfig, getOverviewData, getSentimentData, getShareOfVoiceData } from './ChartConfig';

const DashboardTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Get data and chart configuration
  const chartConfig = getChartConfig();
  const overviewData = getOverviewData();
  const sentimentData = getSentimentData();
  const shareOfVoiceData = getShareOfVoiceData();

  return (
    <div className="flex flex-col h-full">
      <div className="border-b mb-4">
        <div className="flex space-x-1 overflow-x-auto scrollbar-none">
          <TabButton 
            label="Overview" 
            icon={<LayoutGrid className="h-4 w-4" />} 
            isActive={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          />
          <TabButton 
            label="Campaigns" 
            icon={<BarChart className="h-4 w-4" />} 
            isActive={activeTab === 'campaigns'}
            onClick={() => setActiveTab('campaigns')}
          />
          <TabButton 
            label="Audience" 
            icon={<Users className="h-4 w-4" />} 
            isActive={activeTab === 'audience'}
            onClick={() => setActiveTab('audience')}
          />
          <TabButton 
            label="Competitors" 
            icon={<TrendingUp className="h-4 w-4" />} 
            isActive={activeTab === 'competitors'}
            onClick={() => setActiveTab('competitors')}
          />
          <TabButton 
            label="Sentiment" 
            icon={<Gauge className="h-4 w-4" />} 
            isActive={activeTab === 'sentiment'}
            onClick={() => setActiveTab('sentiment')}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <PerformanceTrendsChart data={overviewData} chartConfig={chartConfig} />
        <SentimentAnalysisChart data={sentimentData} chartConfig={chartConfig} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ShareOfVoiceChart data={shareOfVoiceData} chartConfig={chartConfig} />
        <MediaMentionsStats />
      </div>
      
      <MediaAlerts />
    </div>
  );
};

export default DashboardTabs;
