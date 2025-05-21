
import React, { useState } from 'react';
import { AreaChart, BarChart, LineChart, PieChart, LayoutGrid, Users, Gauge, TrendingUp } from 'lucide-react';
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";

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
  const overviewData = [
    { name: 'Jan', "Website Traffic": 31, "Social Media": 11 },
    { name: 'Feb', "Website Traffic": 40, "Social Media": 32 },
    { name: 'Mar', "Website Traffic": 28, "Social Media": 45 },
    { name: 'Apr', "Website Traffic": 51, "Social Media": 32 },
    { name: 'May', "Website Traffic": 42, "Social Media": 34 },
    { name: 'Jun', "Website Traffic": 109, "Social Media": 52 },
    { name: 'Jul', "Website Traffic": 100, "Social Media": 41 },
  ];
  
  const sentimentData = [
    { name: 'Mon', "Positive": 44, "Negative": 76, "Neutral": 35 },
    { name: 'Tue', "Positive": 55, "Negative": 85, "Neutral": 41 },
    { name: 'Wed', "Positive": 57, "Negative": 101, "Neutral": 36 },
    { name: 'Thu', "Positive": 56, "Negative": 98, "Neutral": 26 },
    { name: 'Fri', "Positive": 61, "Negative": 87, "Neutral": 45 },
    { name: 'Sat', "Positive": 58, "Negative": 105, "Neutral": 48 },
    { name: 'Sun', "Positive": 63, "Negative": 91, "Neutral": 52 },
  ];

  const shareOfVoiceData = [
    { name: 'Your Brand', value: 42, fill: '#4285F4' },
    { name: 'Competitor A', value: 28, fill: '#34A853' },
    { name: 'Competitor B', value: 19, fill: '#FBBC05' },
    { name: 'Competitor C', value: 11, fill: '#EA4335' }
  ];

  // Chart config needed by the ChartContainer component
  const chartConfig = {
    'Website Traffic': {
      label: 'Website Traffic',
      color: '#4285F4'
    },
    'Social Media': {
      label: 'Social Media',
      color: '#34A853'
    },
    'Positive': {
      label: 'Positive',
      color: '#34A853'
    },
    'Negative': {
      label: 'Negative',
      color: '#EA4335'
    },
    'Neutral': {
      label: 'Neutral',
      color: '#FBBC05'
    },
    'Your Brand': {
      label: 'Your Brand',
      color: '#4285F4'
    },
    'Competitor A': {
      label: 'Competitor A',
      color: '#34A853'
    },
    'Competitor B': {
      label: 'Competitor B',
      color: '#FBBC05'
    },
    'Competitor C': {
      label: 'Competitor C',
      color: '#EA4335'
    }
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
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.AreaChart data={overviewData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Area type="monotone" dataKey="Website Traffic" stroke="#4285F4" fill="#4285F4" />
              <RechartsPrimitive.Area type="monotone" dataKey="Social Media" stroke="#34A853" fill="#34A853" />
            </RechartsPrimitive.AreaChart>
          </ChartContainer>
        </div>
        
        <div className="chart-container">
          <h3 className="font-medium mb-2">Brand Sentiment Analysis</h3>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.LineChart data={sentimentData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Line type="monotone" dataKey="Positive" stroke="#34A853" />
              <RechartsPrimitive.Line type="monotone" dataKey="Negative" stroke="#EA4335" />
              <RechartsPrimitive.Line type="monotone" dataKey="Neutral" stroke="#FBBC05" />
            </RechartsPrimitive.LineChart>
          </ChartContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="chart-container">
          <h3 className="font-medium mb-2">Share of Voice</h3>
          <div className="flex justify-center">
            <ChartContainer config={chartConfig} className="h-[200px]">
              <RechartsPrimitive.PieChart>
                <RechartsPrimitive.Pie
                  data={shareOfVoiceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                  dataKey="value"
                />
                <RechartsPrimitive.Tooltip />
              </RechartsPrimitive.PieChart>
            </ChartContainer>
          </div>
        </div>
        
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
