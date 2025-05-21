
import React from 'react';
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { getSentimentData } from '../ChartConfig';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SentimentTabProps {
  chartConfig: any;
}

const sentimentTrendData = [
  { name: 'Jan', "Positive": 65, "Negative": 25, "Neutral": 10 },
  { name: 'Feb', "Positive": 68, "Negative": 22, "Neutral": 10 },
  { name: 'Mar', "Positive": 55, "Negative": 35, "Neutral": 10 },
  { name: 'Apr', "Positive": 70, "Negative": 20, "Neutral": 10 },
  { name: 'May', "Positive": 72, "Negative": 18, "Neutral": 10 },
  { name: 'Jun', "Positive": 75, "Negative": 15, "Neutral": 10 }
];

const sentimentByChannelData = [
  { name: 'Twitter', "Positive": 55, "Negative": 35, "Neutral": 10 },
  { name: 'Facebook', "Positive": 65, "Negative": 25, "Neutral": 10 },
  { name: 'Instagram', "Positive": 75, "Negative": 15, "Neutral": 10 },
  { name: 'YouTube', "Positive": 60, "Negative": 30, "Neutral": 10 },
  { name: 'LinkedIn', "Positive": 70, "Negative": 20, "Neutral": 10 },
  { name: 'Blog', "Positive": 65, "Negative": 25, "Neutral": 10 }
];

const sentimentByProductData = [
  { name: 'Product A', "Positive": 70, "Negative": 20, "Neutral": 10 },
  { name: 'Product B', "Positive": 60, "Negative": 30, "Neutral": 10 },
  { name: 'Product C', "Positive": 75, "Negative": 15, "Neutral": 10 },
  { name: 'Product D', "Positive": 55, "Negative": 35, "Neutral": 10 },
  { name: 'Product E', "Positive": 65, "Negative": 25, "Neutral": 10 }
];

const SentimentTab: React.FC<SentimentTabProps> = ({ chartConfig }) => {
  const sentimentData = getSentimentData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Sentiment Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.LineChart data={sentimentData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Line type="monotone" dataKey="Positive" stroke="#34A853" />
              <RechartsPrimitive.Line type="monotone" dataKey="Negative" stroke="#EA4335" />
              <RechartsPrimitive.Line type="monotone" dataKey="Neutral" stroke="#FBBC05" />
            </RechartsPrimitive.LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Current Sentiment Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.PieChart>
              <RechartsPrimitive.Pie
                data={[
                  { name: 'Positive', value: 65, fill: '#34A853' },
                  { name: 'Negative', value: 25, fill: '#EA4335' },
                  { name: 'Neutral', value: 10, fill: '#FBBC05' }
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
          <CardTitle className="text-md font-medium">Sentiment Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.AreaChart data={sentimentTrendData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Area type="monotone" dataKey="Positive" stroke="#34A853" fill="#34A853" />
              <RechartsPrimitive.Area type="monotone" dataKey="Negative" stroke="#EA4335" fill="#EA4335" />
              <RechartsPrimitive.Area type="monotone" dataKey="Neutral" stroke="#FBBC05" fill="#FBBC05" />
            </RechartsPrimitive.AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Sentiment by Channel</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.BarChart data={sentimentByChannelData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Bar dataKey="Positive" stackId="a" fill="#34A853" />
              <RechartsPrimitive.Bar dataKey="Negative" stackId="a" fill="#EA4335" />
              <RechartsPrimitive.Bar dataKey="Neutral" stackId="a" fill="#FBBC05" />
            </RechartsPrimitive.BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Sentiment by Product</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.BarChart data={sentimentByProductData} layout="vertical">
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis type="number" />
              <RechartsPrimitive.YAxis dataKey="name" type="category" />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Bar dataKey="Positive" stackId="a" fill="#34A853" />
              <RechartsPrimitive.Bar dataKey="Negative" stackId="a" fill="#EA4335" />
              <RechartsPrimitive.Bar dataKey="Neutral" stackId="a" fill="#FBBC05" />
            </RechartsPrimitive.BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Key Term Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.LineChart data={sentimentTrendData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Line type="monotone" dataKey="Positive" stroke="#9b87f5" />
              <RechartsPrimitive.Line type="monotone" dataKey="Negative" stroke="#7E69AB" />
              <RechartsPrimitive.Line type="monotone" dataKey="Neutral" stroke="#6E59A5" />
            </RechartsPrimitive.LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Sentiment Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.RadarChart 
              cx="50%" 
              cy="50%" 
              outerRadius="80%" 
              data={[
                { subject: 'Brand Image', A: 120, B: 70, fullMark: 150 },
                { subject: 'Sales', A: 98, B: 60, fullMark: 150 },
                { subject: 'Engagement', A: 86, B: 90, fullMark: 150 },
                { subject: 'Loyalty', A: 99, B: 65, fullMark: 150 },
                { subject: 'Growth', A: 85, B: 70, fullMark: 150 }
              ]}
            >
              <RechartsPrimitive.PolarGrid />
              <RechartsPrimitive.PolarAngleAxis dataKey="subject" />
              <RechartsPrimitive.PolarRadiusAxis />
              <RechartsPrimitive.Radar name="Positive Impact" dataKey="A" stroke="#34A853" fill="#34A853" fillOpacity={0.6} />
              <RechartsPrimitive.Radar name="Negative Impact" dataKey="B" stroke="#EA4335" fill="#EA4335" fillOpacity={0.6} />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Tooltip />
            </RechartsPrimitive.RadarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Sentiment Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.ComposedChart data={sentimentTrendData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Bar dataKey="Positive" fill="#34A853" />
              <RechartsPrimitive.Line type="monotone" dataKey="Negative" stroke="#EA4335" />
              <RechartsPrimitive.Line type="monotone" dataKey="Neutral" stroke="#FBBC05" />
            </RechartsPrimitive.ComposedChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default SentimentTab;
