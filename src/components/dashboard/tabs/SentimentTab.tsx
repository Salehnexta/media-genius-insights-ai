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
    <div className="p-4 h-full overflow-y-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 max-w-full">
        {/* Modern Sentiment Flow Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium flex items-center gap-2">
              😊 Real-time Sentiment Flow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
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
              </RechartsPrimitive.ResponsiveContainer>
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
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
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
              </RechartsPrimitive.ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Top Keywords Sentiment Breakdown */}
        <Card className="lg:col-span-2 xl:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium flex items-center gap-2">
              🏷️ Top Keywords Sentiment Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
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
                  margin={{ top: 10, right: 10, left: 80, bottom: 10 }}
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
              </RechartsPrimitive.ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SentimentTab;
