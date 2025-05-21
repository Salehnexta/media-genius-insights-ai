
import React from 'react';
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AudienceTabProps {
  chartConfig: any;
}

const demographicData = [
  { name: '18-24', value: 31 },
  { name: '25-34', value: 40 },
  { name: '35-44', value: 28 },
  { name: '45-54', value: 15 },
  { name: '55-64', value: 9 },
  { name: '65+', value: 6 }
];

const geoData = [
  { name: 'North America', value: 45 },
  { name: 'Europe', value: 30 },
  { name: 'Asia', value: 15 },
  { name: 'South America', value: 5 },
  { name: 'Africa', value: 3 },
  { name: 'Oceania', value: 2 }
];

const deviceData = [
  { name: 'Mobile', value: 65 },
  { name: 'Desktop', value: 30 },
  { name: 'Tablet', value: 5 }
];

const interestData = [
  { name: 'Technology', value: 400 },
  { name: 'Fashion', value: 300 },
  { name: 'Travel', value: 250 },
  { name: 'Food', value: 200 },
  { name: 'Sports', value: 150 },
  { name: 'Music', value: 100 }
];

const engagementData = [
  { name: 'Jan', "New Users": 200, "Returning Users": 800 },
  { name: 'Feb', "New Users": 300, "Returning Users": 900 },
  { name: 'Mar', "New Users": 400, "Returning Users": 950 },
  { name: 'Apr', "New Users": 500, "Returning Users": 1000 },
  { name: 'May', "New Users": 600, "Returning Users": 1050 },
  { name: 'Jun', "New Users": 700, "Returning Users": 1200 }
];

const AudienceTab: React.FC<AudienceTabProps> = ({ chartConfig }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Age Demographics</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.BarChart data={demographicData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Bar dataKey="value" fill="#4285F4" />
            </RechartsPrimitive.BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Geographic Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.PieChart>
              <RechartsPrimitive.Pie
                data={geoData}
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
          <CardTitle className="text-md font-medium">Device Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.PieChart>
              <RechartsPrimitive.Pie
                data={deviceData}
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
          <CardTitle className="text-md font-medium">User Interests</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.BarChart data={interestData} layout="vertical">
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis type="number" />
              <RechartsPrimitive.YAxis type="category" dataKey="name" />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Bar dataKey="value" fill="#34A853" />
            </RechartsPrimitive.BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">New vs Returning Users</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.AreaChart data={engagementData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Area type="monotone" dataKey="New Users" stroke="#9b87f5" fill="#9b87f5" />
              <RechartsPrimitive.Area type="monotone" dataKey="Returning Users" stroke="#6E59A5" fill="#6E59A5" />
            </RechartsPrimitive.AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Session Duration</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.LineChart data={engagementData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Line type="monotone" dataKey="New Users" stroke="#FBBC05" />
            </RechartsPrimitive.LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Audience Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.ComposedChart data={engagementData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Bar dataKey="New Users" fill="#34A853" />
              <RechartsPrimitive.Line type="monotone" dataKey="Returning Users" stroke="#4285F4" />
            </RechartsPrimitive.ComposedChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Engagement Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.RadarChart 
              cx="50%" 
              cy="50%" 
              outerRadius="80%" 
              data={[
                { subject: 'Shares', A: 120, B: 110, fullMark: 150 },
                { subject: 'Comments', A: 98, B: 130, fullMark: 150 },
                { subject: 'Likes', A: 86, B: 70, fullMark: 150 },
                { subject: 'Saves', A: 99, B: 80, fullMark: 150 },
                { subject: 'Views', A: 85, B: 90, fullMark: 150 }
              ]}
            >
              <RechartsPrimitive.PolarGrid />
              <RechartsPrimitive.PolarAngleAxis dataKey="subject" />
              <RechartsPrimitive.PolarRadiusAxis />
              <RechartsPrimitive.Radar name="This Month" dataKey="A" stroke="#EA4335" fill="#EA4335" fillOpacity={0.6} />
              <RechartsPrimitive.Radar name="Last Month" dataKey="B" stroke="#FBBC05" fill="#FBBC05" fillOpacity={0.6} />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Tooltip />
            </RechartsPrimitive.RadarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AudienceTab;
