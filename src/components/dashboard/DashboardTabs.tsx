
import React, { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const chartConfig = getChartConfig();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="border-b mb-2 sm:mb-4">
        <div className={`flex ${isMobile ? 'overflow-x-auto pb-1' : 'space-x-1'} scrollbar-none`}>
          <TabButton 
            label={isMobile ? "" : "Overview"} 
            icon={<LayoutGrid className="h-4 w-4" />} 
            isActive={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
            isMobile={isMobile}
          />
          <TabButton 
            label={isMobile ? "" : "Campaigns"} 
            icon={<BarChart className="h-4 w-4" />} 
            isActive={activeTab === 'campaigns'}
            onClick={() => setActiveTab('campaigns')}
            isMobile={isMobile}
          />
          <TabButton 
            label={isMobile ? "" : "Audience"} 
            icon={<Users className="h-4 w-4" />} 
            isActive={activeTab === 'audience'}
            onClick={() => setActiveTab('audience')}
            isMobile={isMobile}
          />
          <TabButton 
            label={isMobile ? "" : "Competitors"} 
            icon={<TrendingUp className="h-4 w-4" />} 
            isActive={activeTab === 'competitors'}
            onClick={() => setActiveTab('competitors')}
            isMobile={isMobile}
          />
          <TabButton 
            label={isMobile ? "" : "Sentiment"} 
            icon={<Gauge className="h-4 w-4" />} 
            isActive={activeTab === 'sentiment'}
            onClick={() => setActiveTab('sentiment')}
            isMobile={isMobile}
          />
          <TabButton 
            label={isMobile ? "" : "Content Creator"} 
            icon={<Edit className="h-4 w-4" />} 
            isActive={activeTab === 'content-creator'}
            onClick={() => setActiveTab('content-creator')}
            isMobile={isMobile}
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
