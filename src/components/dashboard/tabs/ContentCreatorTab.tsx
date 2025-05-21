
import React from 'react';
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ContentCreatorTabProps {
  chartConfig: any;
}

const contentData = [
  { name: 'Jan', "Blog Posts": 12, "Videos": 8, "Images": 24, "Podcasts": 4 },
  { name: 'Feb', "Blog Posts": 15, "Videos": 10, "Images": 28, "Podcasts": 6 },
  { name: 'Mar', "Blog Posts": 18, "Videos": 12, "Images": 32, "Podcasts": 8 },
  { name: 'Apr', "Blog Posts": 14, "Videos": 9, "Images": 26, "Podcasts": 5 },
  { name: 'May', "Blog Posts": 16, "Videos": 11, "Images": 30, "Podcasts": 7 },
  { name: 'Jun', "Blog Posts": 20, "Videos": 14, "Images": 34, "Podcasts": 9 }
];

const engagementData = [
  { name: 'Jan', "Likes": 320, "Comments": 180, "Shares": 90 },
  { name: 'Feb', "Likes": 380, "Comments": 210, "Shares": 110 },
  { name: 'Mar', "Likes": 420, "Comments": 240, "Shares": 130 },
  { name: 'Apr', "Likes": 450, "Comments": 260, "Shares": 140 },
  { name: 'May', "Likes": 480, "Comments": 290, "Shares": 160 },
  { name: 'Jun', "Likes": 520, "Comments": 320, "Shares": 180 }
];

const contentQualityData = [
  { name: "SEO Score", value: 78 },
  { name: "Readability", value: 85 },
  { name: "Engagement", value: 72 },
  { name: "Originality", value: 90 }
];

const ContentCreatorTab: React.FC<ContentCreatorTabProps> = ({ chartConfig }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Content Production</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.BarChart data={contentData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Bar dataKey="Blog Posts" fill="#4285F4" />
              <RechartsPrimitive.Bar dataKey="Videos" fill="#34A853" />
              <RechartsPrimitive.Bar dataKey="Images" fill="#FBBC05" />
              <RechartsPrimitive.Bar dataKey="Podcasts" fill="#EA4335" />
            </RechartsPrimitive.BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Content Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.LineChart data={engagementData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Line type="monotone" dataKey="Likes" stroke="#4285F4" />
              <RechartsPrimitive.Line type="monotone" dataKey="Comments" stroke="#34A853" />
              <RechartsPrimitive.Line type="monotone" dataKey="Shares" stroke="#FBBC05" />
            </RechartsPrimitive.LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Content Quality Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.RadarChart 
              cx="50%" 
              cy="50%" 
              outerRadius="80%" 
              data={contentQualityData}>
              <RechartsPrimitive.PolarGrid />
              <RechartsPrimitive.PolarAngleAxis dataKey="name" />
              <RechartsPrimitive.PolarRadiusAxis angle={30} domain={[0, 100]} />
              <RechartsPrimitive.Radar name="Quality Score" dataKey="value" stroke="#9b87f5" fill="#9b87f5" fillOpacity={0.6} />
              <RechartsPrimitive.Tooltip />
            </RechartsPrimitive.RadarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Content Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.PieChart>
              <RechartsPrimitive.Pie
                data={[
                  { name: 'Website', value: 35 },
                  { name: 'Social Media', value: 40 },
                  { name: 'Email', value: 15 },
                  { name: 'Partners', value: 10 }
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
          <CardTitle className="text-md font-medium">Content Performance by Type</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.AreaChart data={contentData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Area type="monotone" dataKey="Blog Posts" stroke="#4285F4" fill="#4285F4" fillOpacity={0.6} />
              <RechartsPrimitive.Area type="monotone" dataKey="Videos" stroke="#34A853" fill="#34A853" fillOpacity={0.6} />
              <RechartsPrimitive.Area type="monotone" dataKey="Images" stroke="#FBBC05" fill="#FBBC05" fillOpacity={0.6} />
            </RechartsPrimitive.AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Audience Response</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.ComposedChart data={engagementData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Bar dataKey="Comments" fill="#7E69AB" />
              <RechartsPrimitive.Line type="monotone" dataKey="Shares" stroke="#EA4335" />
            </RechartsPrimitive.ComposedChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Publishing Frequency</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.BarChart data={contentData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Bar dataKey="Blog Posts" fill="#9b87f5" />
              <RechartsPrimitive.Bar dataKey="Videos" fill="#6E59A5" />
            </RechartsPrimitive.BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Content ROI</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.LineChart data={contentData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Line type="monotone" dataKey="Blog Posts" stroke="#4285F4" />
              <RechartsPrimitive.Line type="monotone" dataKey="Videos" stroke="#EA4335" />
            </RechartsPrimitive.LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentCreatorTab;
