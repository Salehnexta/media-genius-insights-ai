
import React from 'react';
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { getShareOfVoiceData } from '../ChartConfig';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CompetitorsTabProps {
  chartConfig: any;
}

const competitorData = [
  { name: 'Jan', "Your Brand": 400, "Competitor A": 240, "Competitor B": 320, "Competitor C": 180 },
  { name: 'Feb', "Your Brand": 300, "Competitor A": 398, "Competitor B": 230, "Competitor C": 190 },
  { name: 'Mar', "Your Brand": 200, "Competitor A": 480, "Competitor B": 270, "Competitor C": 220 },
  { name: 'Apr', "Your Brand": 278, "Competitor A": 390, "Competitor B": 290, "Competitor C": 250 },
  { name: 'May', "Your Brand": 189, "Competitor A": 480, "Competitor B": 310, "Competitor C": 230 },
  { name: 'Jun', "Your Brand": 239, "Competitor A": 380, "Competitor B": 320, "Competitor C": 270 }
];

const CompetitorsTab: React.FC<CompetitorsTabProps> = ({ chartConfig }) => {
  const shareOfVoiceData = getShareOfVoiceData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Share of Voice</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
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
              <RechartsPrimitive.Legend />
            </RechartsPrimitive.PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Website Traffic Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.LineChart data={competitorData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Line type="monotone" dataKey="Your Brand" stroke="#4285F4" />
              <RechartsPrimitive.Line type="monotone" dataKey="Competitor A" stroke="#34A853" />
              <RechartsPrimitive.Line type="monotone" dataKey="Competitor B" stroke="#FBBC05" />
              <RechartsPrimitive.Line type="monotone" dataKey="Competitor C" stroke="#EA4335" />
            </RechartsPrimitive.LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Social Media Followers</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.BarChart data={competitorData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Bar dataKey="Your Brand" fill="#4285F4" />
              <RechartsPrimitive.Bar dataKey="Competitor A" fill="#34A853" />
              <RechartsPrimitive.Bar dataKey="Competitor B" fill="#FBBC05" />
              <RechartsPrimitive.Bar dataKey="Competitor C" fill="#EA4335" />
            </RechartsPrimitive.BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Engagement Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.LineChart data={competitorData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Line type="monotone" dataKey="Your Brand" stroke="#9b87f5" />
              <RechartsPrimitive.Line type="monotone" dataKey="Competitor A" stroke="#7E69AB" />
              <RechartsPrimitive.Line type="monotone" dataKey="Competitor B" stroke="#6E59A5" />
            </RechartsPrimitive.LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Brand Mentions</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.AreaChart data={competitorData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Area type="monotone" dataKey="Your Brand" stroke="#4285F4" fill="#4285F4" />
              <RechartsPrimitive.Area type="monotone" dataKey="Competitor A" stroke="#34A853" fill="#34A853" />
              <RechartsPrimitive.Area type="monotone" dataKey="Competitor B" stroke="#FBBC05" fill="#FBBC05" />
              <RechartsPrimitive.Area type="monotone" dataKey="Competitor C" stroke="#EA4335" fill="#EA4335" />
            </RechartsPrimitive.AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Market Share</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.PieChart>
              <RechartsPrimitive.Pie
                data={[
                  { name: 'Your Brand', value: 35 },
                  { name: 'Competitor A', value: 30 },
                  { name: 'Competitor B', value: 20 },
                  { name: 'Competitor C', value: 15 }
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
          <CardTitle className="text-md font-medium">Pricing Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.RadarChart 
              cx="50%" 
              cy="50%" 
              outerRadius="80%" 
              data={[
                { subject: 'Product A', A: 120, B: 110, C: 90, D: 60, fullMark: 150 },
                { subject: 'Product B', A: 98, B: 130, C: 85, D: 70, fullMark: 150 },
                { subject: 'Product C', A: 86, B: 130, C: 90, D: 65, fullMark: 150 },
                { subject: 'Product D', A: 99, B: 100, C: 95, D: 85, fullMark: 150 }
              ]}
            >
              <RechartsPrimitive.PolarGrid />
              <RechartsPrimitive.PolarAngleAxis dataKey="subject" />
              <RechartsPrimitive.PolarRadiusAxis />
              <RechartsPrimitive.Radar name="Your Brand" dataKey="A" stroke="#4285F4" fill="#4285F4" fillOpacity={0.6} />
              <RechartsPrimitive.Radar name="Competitor A" dataKey="B" stroke="#34A853" fill="#34A853" fillOpacity={0.6} />
              <RechartsPrimitive.Radar name="Competitor B" dataKey="C" stroke="#FBBC05" fill="#FBBC05" fillOpacity={0.6} />
              <RechartsPrimitive.Radar name="Competitor C" dataKey="D" stroke="#EA4335" fill="#EA4335" fillOpacity={0.6} />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Tooltip />
            </RechartsPrimitive.RadarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Customer Satisfaction</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.BarChart data={competitorData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Bar dataKey="Your Brand" fill="#9b87f5" />
              <RechartsPrimitive.Bar dataKey="Competitor A" fill="#7E69AB" />
              <RechartsPrimitive.Bar dataKey="Competitor B" fill="#6E59A5" />
            </RechartsPrimitive.BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompetitorsTab;
