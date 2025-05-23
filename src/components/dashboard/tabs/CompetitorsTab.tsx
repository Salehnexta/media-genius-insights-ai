
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

const competitorPerformance = [
  { metric: 'Market Share', yours: 42, competitorA: 28, competitorB: 19, competitorC: 11 },
  { metric: 'Brand Awareness', yours: 65, competitorA: 58, competitorB: 45, competitorC: 32 },
  { metric: 'Customer Satisfaction', yours: 8.2, competitorA: 7.8, competitorB: 7.1, competitorC: 6.9 },
  { metric: 'Innovation Index', yours: 7.5, competitorA: 8.1, competitorB: 6.8, competitorC: 6.2 },
  { metric: 'Price Competitiveness', yours: 6.8, competitorA: 7.2, competitorB: 8.5, competitorC: 7.9 }
];

const CompetitorsTab: React.FC<CompetitorsTabProps> = ({ chartConfig }) => {
  const shareOfVoiceData = getShareOfVoiceData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Modern Share of Voice with Donut */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium flex items-center gap-2">
            🎯 Market Share Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <RechartsPrimitive.PieChart>
              <RechartsPrimitive.Pie
                data={shareOfVoiceData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              />
              <RechartsPrimitive.Tooltip 
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <RechartsPrimitive.Legend />
              <text 
                x="50%" 
                y="50%" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                className="text-lg font-bold fill-current"
              >
                42%
              </text>
            </RechartsPrimitive.PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      {/* Advanced Multi-Metric Comparison */}
      <Card className="lg:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium flex items-center gap-2">
            📊 Performance Benchmark Matrix
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <RechartsPrimitive.RadarChart 
              cx="50%" 
              cy="50%" 
              outerRadius="80%" 
              data={competitorPerformance}
            >
              <RechartsPrimitive.PolarGrid stroke="#e2e8f0" />
              <RechartsPrimitive.PolarAngleAxis 
                dataKey="metric" 
                tick={{ fontSize: 10, fill: '#666' }}
              />
              <RechartsPrimitive.PolarRadiusAxis 
                tick={{ fontSize: 9, fill: '#999' }}
                domain={[0, 100]}
              />
              <RechartsPrimitive.Radar 
                name="Your Brand" 
                dataKey="yours" 
                stroke="#4285F4" 
                fill="#4285F4" 
                fillOpacity={0.3}
                strokeWidth={3}
              />
              <RechartsPrimitive.Radar 
                name="Competitor A" 
                dataKey="competitorA" 
                stroke="#34A853" 
                fill="#34A853" 
                fillOpacity={0.1}
                strokeWidth={2}
                strokeDasharray="5 5"
              />
              <RechartsPrimitive.Radar 
                name="Competitor B" 
                dataKey="competitorB" 
                stroke="#FBBC05" 
                fill="#FBBC05" 
                fillOpacity={0.1}
                strokeWidth={2}
                strokeDasharray="3 3"
              />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Tooltip />
            </RechartsPrimitive.RadarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      {/* Modern Traffic Comparison with Gradients */}
      <Card className="lg:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium flex items-center gap-2">
            🚀 Traffic Growth Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <RechartsPrimitive.AreaChart data={competitorData}>
              <defs>
                <linearGradient id="yourBrandGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4285F4" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4285F4" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="competitorAGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34A853" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#34A853" stopOpacity={0.1}/>
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
                dataKey="Your Brand" 
                stroke="#4285F4" 
                fill="url(#yourBrandGradient)"
                strokeWidth={3}
              />
              <RechartsPrimitive.Area 
                type="monotone" 
                dataKey="Competitor A" 
                stroke="#34A853" 
                fill="url(#competitorAGradient)"
                strokeWidth={2}
              />
              <RechartsPrimitive.Line 
                type="monotone" 
                dataKey="Competitor B" 
                stroke="#FBBC05"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
              <RechartsPrimitive.Line 
                type="monotone" 
                dataKey="Competitor C" 
                stroke="#EA4335"
                strokeWidth={2}
                strokeDasharray="3 3"
              />
              <RechartsPrimitive.Legend />
            </RechartsPrimitive.AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Competitive Positioning Bubble Chart Effect */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium flex items-center gap-2">
            💎 Brand Positioning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <RechartsPrimitive.ScatterChart>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <RechartsPrimitive.XAxis 
                type="number" 
                dataKey="quality" 
                name="Quality"
                domain={[0, 10]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <RechartsPrimitive.YAxis 
                type="number" 
                dataKey="price" 
                name="Price"
                domain={[0, 10]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <RechartsPrimitive.Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <RechartsPrimitive.Scatter 
                name="Your Brand" 
                data={[{ quality: 8.5, price: 7.2, z: 100 }]} 
                fill="#4285F4" 
              />
              <RechartsPrimitive.Scatter 
                name="Competitor A" 
                data={[{ quality: 7.8, price: 8.1, z: 80 }]} 
                fill="#34A853" 
              />
              <RechartsPrimitive.Scatter 
                name="Competitor B" 
                data={[{ quality: 6.9, price: 9.2, z: 60 }]} 
                fill="#FBBC05" 
              />
              <RechartsPrimitive.Scatter 
                name="Competitor C" 
                data={[{ quality: 6.2, price: 8.8, z: 40 }]} 
                fill="#EA4335" 
              />
              <RechartsPrimitive.Legend />
            </RechartsPrimitive.ScatterChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Market Evolution Timeline */}
      <Card className="lg:col-span-3">
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium flex items-center gap-2">
            📈 Market Evolution & Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <RechartsPrimitive.ComposedChart data={competitorData}>
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
              <RechartsPrimitive.Bar dataKey="Your Brand" fill="#4285F4" opacity={0.7} />
              <RechartsPrimitive.Line 
                type="monotone" 
                dataKey="Competitor A" 
                stroke="#34A853" 
                strokeWidth={3}
                dot={{ fill: '#34A853', strokeWidth: 2, r: 4 }}
              />
              <RechartsPrimitive.Line 
                type="monotone" 
                dataKey="Competitor B" 
                stroke="#FBBC05" 
                strokeWidth={2}
                strokeDasharray="5 5"
              />
              <RechartsPrimitive.Line 
                type="monotone" 
                dataKey="Competitor C" 
                stroke="#EA4335" 
                strokeWidth={2}
                strokeDasharray="3 3"
              />
              <RechartsPrimitive.Legend />
            </RechartsPrimitive.ComposedChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompetitorsTab;
