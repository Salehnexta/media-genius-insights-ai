import React, { useState } from 'react';
import { AreaChart, BarChart, LineChart, PieChart, LayoutGrid, Users, Gauge, TrendingUp } from 'lucide-react';
import { ChartContainer as Chart } from "@/components/ui/chart";

interface TabButtonProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, icon, isActive, onClick }) => {
  return (
    <button
      className={`tab-button ${isActive ? 'active' : ''} flex items-center`}
      onClick={onClick}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );
};

const DashboardTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Dummy data for charts
  const overviewData = {
    options: {
      chart: { toolbar: { show: false }, zoom: { enabled: false } },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] },
    },
    series: [
      { name: 'Website Traffic', data: [31, 40, 28, 51, 42, 109, 100] },
      { name: 'Social Media', data: [11, 32, 45, 32, 34, 52, 41] },
    ],
  };
  
  const sentimentData = {
    options: {
      chart: { toolbar: { show: false }, zoom: { enabled: false } },
      xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      colors: ['#34A853', '#EA4335', '#FBBC05'],
    },
    series: [
      { name: 'Positive', data: [44, 55, 57, 56, 61, 58, 63] },
      { name: 'Negative', data: [76, 85, 101, 98, 87, 105, 91] },
      { name: 'Neutral', data: [35, 41, 36, 26, 45, 48, 52] },
    ],
  };

  const shareOfVoiceData = {
    options: {
      chart: { toolbar: { show: false } },
      labels: ['Your Brand', 'Competitor A', 'Competitor B', 'Competitor C'],
      colors: ['#4285F4', '#34A853', '#FBBC05', '#EA4335'],
    },
    series: [42, 28, 19, 11],
  };

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
        <div className="chart-container">
          <h3 className="font-medium mb-2">Performance Trends</h3>
          <Chart
            type="area"
            options={overviewData.options}
            series={overviewData.series}
            height={240}
          />
        </div>
        
        <div className="chart-container">
          <h3 className="font-medium mb-2">Brand Sentiment Analysis</h3>
          <Chart 
            type="line"
            options={sentimentData.options}
            series={sentimentData.series}
            height={240}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="chart-container">
          <h3 className="font-medium mb-2">Share of Voice</h3>
          <div className="flex justify-center">
            <Chart 
              type="donut"
              options={shareOfVoiceData.options}
              series={shareOfVoiceData.series}
              height={200}
            />
          </div>
        </div>
        
        <div className="chart-container col-span-1 lg:col-span-2">
          <h3 className="font-medium mb-2">Media Mentions</h3>
          <div className="h-[200px] flex items-center justify-center">
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-marketing-blue mb-1">267</div>
              <div className="text-sm text-gray-500">Media mentions in the last 7 days</div>
              <div className="mt-3 text-sm flex items-center justify-center text-green-500">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>24% increase from last week</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
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
    </div>
  );
};

export default DashboardTabs;
