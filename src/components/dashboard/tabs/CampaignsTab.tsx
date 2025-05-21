
import React from 'react';
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { getOverviewData } from '../ChartConfig';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CampaignsTabProps {
  chartConfig: any;
}

const campaignData = [
  { name: 'Jan', "Campaign A": 4000, "Campaign B": 2400, "Campaign C": 1800 },
  { name: 'Feb', "Campaign A": 3000, "Campaign B": 1398, "Campaign C": 2300 },
  { name: 'Mar', "Campaign A": 2000, "Campaign B": 9800, "Campaign C": 2290 },
  { name: 'Apr', "Campaign A": 2780, "Campaign B": 3908, "Campaign C": 2000 },
  { name: 'May', "Campaign A": 1890, "Campaign B": 4800, "Campaign C": 2181 },
  { name: 'Jun', "Campaign A": 2390, "Campaign B": 3800, "Campaign C": 2500 }
];

const CampaignsTab: React.FC<CampaignsTabProps> = ({ chartConfig }) => {
  const overviewData = getOverviewData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.BarChart data={campaignData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Bar dataKey="Campaign A" fill="#4285F4" />
              <RechartsPrimitive.Bar dataKey="Campaign B" fill="#34A853" />
              <RechartsPrimitive.Bar dataKey="Campaign C" fill="#FBBC05" />
            </RechartsPrimitive.BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Campaign ROI</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.LineChart data={campaignData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Line type="monotone" dataKey="Campaign A" stroke="#4285F4" />
              <RechartsPrimitive.Line type="monotone" dataKey="Campaign B" stroke="#34A853" />
              <RechartsPrimitive.Line type="monotone" dataKey="Campaign C" stroke="#FBBC05" />
            </RechartsPrimitive.LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Campaign Impressions</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.AreaChart data={campaignData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Area type="monotone" dataKey="Campaign A" stroke="#4285F4" fill="#4285F4" />
              <RechartsPrimitive.Area type="monotone" dataKey="Campaign B" stroke="#34A853" fill="#34A853" />
              <RechartsPrimitive.Area type="monotone" dataKey="Campaign C" stroke="#FBBC05" fill="#FBBC05" />
            </RechartsPrimitive.AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Campaign Clicks</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.LineChart data={campaignData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Line type="monotone" dataKey="Campaign A" stroke="#9b87f5" />
              <RechartsPrimitive.Line type="monotone" dataKey="Campaign B" stroke="#7E69AB" />
              <RechartsPrimitive.Line type="monotone" dataKey="Campaign C" stroke="#6E59A5" />
            </RechartsPrimitive.LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Budget Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.PieChart>
              <RechartsPrimitive.Pie
                data={[
                  { name: 'Campaign A', value: 4000 },
                  { name: 'Campaign B', value: 3000 },
                  { name: 'Campaign C', value: 2000 },
                  { name: 'Campaign D', value: 1000 }
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
                dataKey="value"
              />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
            </RechartsPrimitive.PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Conversion Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.BarChart data={campaignData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Bar dataKey="Campaign A" fill="#EA4335" />
              <RechartsPrimitive.Bar dataKey="Campaign B" fill="#FBBC05" />
              <RechartsPrimitive.Bar dataKey="Campaign C" fill="#4285F4" />
            </RechartsPrimitive.BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Campaign Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.LineChart data={campaignData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Line type="monotone" dataKey="Campaign A" stroke="#4285F4" />
              <RechartsPrimitive.Line type="monotone" dataKey="Campaign B" stroke="#34A853" />
              <RechartsPrimitive.Line type="monotone" dataKey="Campaign C" stroke="#FBBC05" />
            </RechartsPrimitive.LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Engagement Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.RadarChart 
              cx="50%" 
              cy="50%" 
              outerRadius="80%" 
              data={[
                { subject: 'Clicks', A: 120, B: 110, C: 90, fullMark: 150 },
                { subject: 'Views', A: 98, B: 130, C: 85, fullMark: 150 },
                { subject: 'Shares', A: 86, B: 70, C: 90, fullMark: 150 },
                { subject: 'Comments', A: 99, B: 80, C: 65, fullMark: 150 },
                { subject: 'Saves', A: 85, B: 90, C: 80, fullMark: 150 }
              ]}
            >
              <RechartsPrimitive.PolarGrid />
              <RechartsPrimitive.PolarAngleAxis dataKey="subject" />
              <RechartsPrimitive.PolarRadiusAxis />
              <RechartsPrimitive.Radar name="Campaign A" dataKey="A" stroke="#4285F4" fill="#4285F4" fillOpacity={0.6} />
              <RechartsPrimitive.Radar name="Campaign B" dataKey="B" stroke="#34A853" fill="#34A853" fillOpacity={0.6} />
              <RechartsPrimitive.Radar name="Campaign C" dataKey="C" stroke="#FBBC05" fill="#FBBC05" fillOpacity={0.6} />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Tooltip />
            </RechartsPrimitive.RadarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignsTab;
