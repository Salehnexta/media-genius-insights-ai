
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

const sentimentHourlyData = [
  { hour: '00:00', sentiment: 4.2 }, { hour: '02:00', sentiment: 3.8 },
  { hour: '04:00', sentiment: 3.5 }, { hour: '06:00', sentiment: 4.1 },
  { hour: '08:00', sentiment: 4.8 }, { hour: '10:00', sentiment: 5.2 },
  { hour: '12:00', sentiment: 5.8 }, { hour: '14:00', sentiment: 6.1 },
  { hour: '16:00', sentiment: 5.9 }, { hour: '18:00', sentiment: 5.5 },
  { hour: '20:00', sentiment: 5.0 }, { hour: '22:00', sentiment: 4.5 }
];

const SentimentTab: React.FC<SentimentTabProps> = ({ chartConfig }) => {
  const sentimentData = getSentimentData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Modern Sentiment Flow Chart */}
      <Card className="lg:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium flex items-center gap-2">
            😊 Real-time Sentiment Flow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <RechartsPrimitive.AreaChart data={sentimentData}>
              <defs>
                <linearGradient id="positiveGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34A853" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#34A853" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="negativeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EA4335" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#EA4335" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="neutralGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FBBC05" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#FBBC05" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <RechartsPrimitive.XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <RechartsPrimitive.YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <RechartsPrimitive.Tooltip 
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <RechartsPrimitive.Area 
                type="monotone" 
                dataKey="Positive" 
                stroke="#34A853" 
                fill="url(#positiveGradient)"
                strokeWidth={3}
              />
              <RechartsPrimitive.Area 
                type="monotone" 
                dataKey="Negative" 
                stroke="#EA4335" 
                fill="url(#negativeGradient)"
                strokeWidth={3}
              />
              <RechartsPrimitive.Area 
                type="monotone" 
                dataKey="Neutral" 
                stroke="#FBBC05" 
                fill="url(#neutralGradient)"
                strokeWidth={3}
              />
              <RechartsPrimitive.Legend />
            </RechartsPrimitive.AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Sentiment Score Gauge */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium flex items-center gap-2">
            🎯 Sentiment Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <RechartsPrimitive.PieChart>
              <RechartsPrimitive.Pie
                data={[
                  { name: 'Score', value: 73, fill: '#34A853' },
                  { name: 'Remaining', value: 27, fill: '#f0f0f0' }
                ]}
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
              />
              <text 
                x="50%" 
                y="45%" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                className="text-3xl font-bold fill-current"
              >
                73
              </text>
              <text 
                x="50%" 
                y="55%" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                className="text-sm fill-gray-500"
              >
                Overall Score
              </text>
            </RechartsPrimitive.PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Hourly Sentiment Heatmap Style */}
      <Card className="lg:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium flex items-center gap-2">
            ⏰ Hourly Sentiment Pattern
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <RechartsPrimitive.AreaChart data={sentimentHourlyData}>
              <defs>
                <linearGradient id="sentimentFlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4285F4" stopOpacity={0.8}/>
                  <stop offset="50%" stopColor="#34A853" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#FBBC05" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <RechartsPrimitive.XAxis 
                dataKey="hour" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#666' }}
              />
              <RechartsPrimitive.YAxis 
                domain={[0, 7]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <RechartsPrimitive.Tooltip 
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <RechartsPrimitive.Area 
                type="monotone" 
                dataKey="sentiment" 
                stroke="#4285F4" 
                fill="url(#sentimentFlow)"
                strokeWidth={3}
              />
            </RechartsPrimitive.AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Sentiment Comparison Radar */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium flex items-center gap-2">
            🔍 Platform Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <RechartsPrimitive.RadarChart 
              cx="50%" 
              cy="50%" 
              outerRadius="80%" 
              data={[
                { platform: 'Twitter', sentiment: 7.2, engagement: 8.1 },
                { platform: 'Facebook', sentiment: 8.5, engagement: 6.8 },
                { platform: 'Instagram', sentiment: 9.1, engagement: 9.2 },
                { platform: 'LinkedIn', sentiment: 8.8, engagement: 7.5 },
                { platform: 'YouTube', sentiment: 7.9, engagement: 8.7 }
              ]}
            >
              <RechartsPrimitive.PolarGrid stroke="#e2e8f0" />
              <RechartsPrimitive.PolarAngleAxis 
                dataKey="platform" 
                tick={{ fontSize: 11, fill: '#666' }}
              />
              <RechartsPrimitive.PolarRadiusAxis 
                tick={{ fontSize: 10, fill: '#999' }}
                domain={[0, 10]}
              />
              <RechartsPrimitive.Radar 
                name="Sentiment" 
                dataKey="sentiment" 
                stroke="#34A853" 
                fill="#34A853" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <RechartsPrimitive.Radar 
                name="Engagement" 
                dataKey="engagement" 
                stroke="#4285F4" 
                fill="#4285F4" 
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Tooltip />
            </RechartsPrimitive.RadarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Modern Stacked Bar for Keywords */}
      <Card className="lg:col-span-3">
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium flex items-center gap-2">
            🏷️ Top Keywords Sentiment Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <RechartsPrimitive.BarChart 
              data={[
                { keyword: 'Product Quality', positive: 85, negative: 10, neutral: 5 },
                { keyword: 'Customer Service', positive: 72, negative: 20, neutral: 8 },
                { keyword: 'Pricing', positive: 45, negative: 40, neutral: 15 },
                { keyword: 'Delivery', positive: 60, negative: 25, neutral: 15 },
                { keyword: 'User Experience', positive: 78, negative: 15, neutral: 7 },
                { keyword: 'Innovation', positive: 88, negative: 8, neutral: 4 }
              ]}
              layout="horizontal"
            >
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <RechartsPrimitive.XAxis type="number" domain={[0, 100]} />
              <RechartsPrimitive.YAxis 
                dataKey="keyword" 
                type="category" 
                tick={{ fontSize: 11, fill: '#666' }}
                width={100}
              />
              <RechartsPrimitive.Tooltip 
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <RechartsPrimitive.Bar dataKey="positive" stackId="a" fill="#34A853" />
              <RechartsPrimitive.Bar dataKey="negative" stackId="a" fill="#EA4335" />
              <RechartsPrimitive.Bar dataKey="neutral" stackId="a" fill="#FBBC05" />
            </RechartsPrimitive.BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default SentimentTab;
