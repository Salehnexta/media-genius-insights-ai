
import React from 'react';
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { getOverviewData } from '../ChartConfig';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OverviewTabProps {
  chartConfig: any;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ chartConfig }) => {
  const overviewData = getOverviewData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Website Traffic</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.AreaChart data={overviewData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Area type="monotone" dataKey="Website Traffic" stroke="#4285F4" fill="#4285F4" />
            </RechartsPrimitive.AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Social Media Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.LineChart data={overviewData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Line type="monotone" dataKey="Social Media" stroke="#34A853" />
            </RechartsPrimitive.LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Media Mentions</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.BarChart data={overviewData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Bar dataKey="Website Traffic" fill="#9b87f5" />
            </RechartsPrimitive.BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Conversion Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.LineChart data={overviewData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Line type="monotone" dataKey="Social Media" stroke="#EA4335" />
            </RechartsPrimitive.LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">ROI Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.AreaChart data={overviewData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Area type="monotone" dataKey="Website Traffic" stroke="#FBBC05" fill="#FBBC05" />
            </RechartsPrimitive.AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Content Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.BarChart data={overviewData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Bar dataKey="Social Media" fill="#7E69AB" />
            </RechartsPrimitive.BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Campaign Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.PieChart>
              <RechartsPrimitive.Pie
                data={[
                  { name: 'Email', value: 400 },
                  { name: 'Social', value: 300 },
                  { name: 'Display', value: 250 },
                  { name: 'Search', value: 200 }
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
                dataKey="value"
              />
              <RechartsPrimitive.Tooltip />
            </RechartsPrimitive.PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Channel Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.RadarChart 
              cx="50%" 
              cy="50%" 
              outerRadius="80%" 
              data={[
                { subject: 'Organic', A: 120, fullMark: 150 },
                { subject: 'Social', A: 98, fullMark: 150 },
                { subject: 'Email', A: 86, fullMark: 150 },
                { subject: 'Direct', A: 99, fullMark: 150 },
                { subject: 'Referral', A: 85, fullMark: 150 }
              ]}
            >
              <RechartsPrimitive.PolarGrid />
              <RechartsPrimitive.PolarAngleAxis dataKey="subject" />
              <RechartsPrimitive.PolarRadiusAxis />
              <RechartsPrimitive.Radar name="Channels" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <RechartsPrimitive.Tooltip />
            </RechartsPrimitive.RadarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
