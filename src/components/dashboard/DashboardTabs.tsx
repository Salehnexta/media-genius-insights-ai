
import React, { useState } from 'react';
import { AreaChart, BarChart, LineChart, PieChart, LayoutGrid, Users, Gauge, TrendingUp, Edit } from 'lucide-react';
import TabButton from './TabButton';
import OverviewTab from './tabs/OverviewTab';
import CampaignsTab from './tabs/CampaignsTab';
import AudienceTab from './tabs/AudienceTab';
import CompetitorsTab from './tabs/CompetitorsTab';
import SentimentTab from './tabs/SentimentTab';
import ContentCreatorTab from './tabs/ContentCreatorTab';
import { getChartConfig } from './ChartConfig';

const DashboardTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const chartConfig = getChartConfig();

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
          <TabButton 
            label="Content Creator" 
            icon={<Edit className="h-4 w-4" />} 
            isActive={activeTab === 'content-creator'}
            onClick={() => setActiveTab('content-creator')}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        {activeTab === 'overview' && <OverviewTab chartConfig={chartConfig} />}
        {activeTab === 'campaigns' && <CampaignsTab chartConfig={chartConfig} />}
        {activeTab === 'audience' && <AudienceTab chartConfig={chartConfig} />}
        {activeTab === 'competitors' && <CompetitorsTab chartConfig={chartConfig} />}
        {activeTab === 'sentiment' && <SentimentTab chartConfig={chartConfig} />}
        {activeTab === 'content-creator' && <ContentCreatorTab chartConfig={chartConfig} />}
      </div>
    </div>
  );
};

export default DashboardTabs;
