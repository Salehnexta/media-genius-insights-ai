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

  // Enhanced data for more sophisticated charts
  const revenueData = [
    { name: 'Jan', revenue: 45000, profit: 12000, expenses: 33000 },
    { name: 'Feb', revenue: 52000, profit: 16000, expenses: 36000 },
    { name: 'Mar', revenue: 48000, profit: 14000, expenses: 34000 },
    { name: 'Apr', revenue: 61000, profit: 20000, expenses: 41000 },
    { name: 'May', revenue: 55000, profit: 18000, expenses: 37000 },
    { name: 'Jun', revenue: 67000, profit: 24000, expenses: 43000 },
    { name: 'Jul', revenue: 71000, profit: 28000, expenses: 43000 },
  ];

  const conversionFunnelData = [
    { name: 'Visitors', value: 10000, fill: '#8884d8' },
    { name: 'Leads', value: 3000, fill: '#82ca9d' },
    { name: 'Qualified', value: 1200, fill: '#ffc658' },
    { name: 'Customers', value: 400, fill: '#ff7300' }
  ];

  const performanceMetrics = [
    { name: 'CTR', value: 3.2, benchmark: 2.8 },
    { name: 'Conv Rate', value: 4.5, benchmark: 3.9 },
    { name: 'ROAS', value: 5.8, benchmark: 4.2 },
    { name: 'Engagement', value: 7.2, benchmark: 6.1 },
    { name: 'Retention', value: 8.1, benchmark: 7.5 }
  ];

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="space-y-6 max-w-full">
        {/* Modern Area Chart with Gradient */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium flex items-center gap-2">
              📈 Revenue & Profit Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
                <RechartsPrimitive.ComposedChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4285F4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4285F4" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34A853" stopOpacity={0.8}/>
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
                    dataKey="revenue" 
                    stroke="#4285F4" 
                    fill="url(#revenueGradient)"
                    strokeWidth={3}
                  />
                  <RechartsPrimitive.Area 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="#34A853" 
                    fill="url(#profitGradient)"
                    strokeWidth={3}
                  />
                  <RechartsPrimitive.Bar dataKey="expenses" fill="#EA4335" opacity={0.7} />
                </RechartsPrimitive.ComposedChart>
              </RechartsPrimitive.ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Modern Donut Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium flex items-center gap-2">
              🎯 Conversion Funnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
                <RechartsPrimitive.PieChart>
                  <RechartsPrimitive.Pie
                    data={conversionFunnelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {conversionFunnelData.map((entry, index) => (
                      <RechartsPrimitive.Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </RechartsPrimitive.Pie>
                  <RechartsPrimitive.Tooltip 
                    contentStyle={{ 
                      background: 'rgba(255, 255, 255, 0.95)', 
                      border: 'none', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <RechartsPrimitive.Legend />
                </RechartsPrimitive.PieChart>
              </RechartsPrimitive.ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Performance Radar Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium flex items-center gap-2">
              ⚡ Performance vs Benchmark
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
                <RechartsPrimitive.RadarChart 
                  cx="50%" 
                  cy="50%" 
                  outerRadius="80%" 
                  data={performanceMetrics}
                >
                  <RechartsPrimitive.PolarGrid stroke="#e2e8f0" />
                  <RechartsPrimitive.PolarAngleAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12, fill: '#666' }}
                  />
                  <RechartsPrimitive.PolarRadiusAxis 
                    tick={{ fontSize: 10, fill: '#999' }}
                    domain={[0, 10]}
                  />
                  <RechartsPrimitive.Radar 
                    name="Current" 
                    dataKey="value" 
                    stroke="#4285F4" 
                    fill="#4285F4" 
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <RechartsPrimitive.Radar 
                    name="Benchmark" 
                    dataKey="benchmark" 
                    stroke="#34A853" 
                    fill="#34A853" 
                    fillOpacity={0.1}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                  <RechartsPrimitive.Legend />
                  <RechartsPrimitive.Tooltip />
                </RechartsPrimitive.RadarChart>
              </RechartsPrimitive.ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Modern Line Chart with Multiple Y-Axes */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium flex items-center gap-2">
              📊 Multi-Metric Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <RechartsPrimitive.ComposedChart data={overviewData}>
                <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <RechartsPrimitive.XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <RechartsPrimitive.YAxis 
                  yAxisId="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <RechartsPrimitive.YAxis 
                  yAxisId="right" 
                  orientation="right"
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
                <RechartsPrimitive.Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="Website Traffic" 
                  stroke="#4285F4" 
                  strokeWidth={3}
                  dot={{ fill: '#4285F4', strokeWidth: 2, r: 4 }}
                />
                <RechartsPrimitive.Bar 
                  yAxisId="right"
                  dataKey="Social Media" 
                  fill="#34A853"
                  opacity={0.7}
                />
              </RechartsPrimitive.ComposedChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Stacked Area Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium flex items-center gap-2">
              📱 Channel Performance Stack
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <RechartsPrimitive.AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ffc658" stopOpacity={0.1}/>
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
                  dataKey="revenue" 
                  stackId="1" 
                  stroke="#8884d8" 
                  fill="url(#colorRevenue)" 
                />
                <RechartsPrimitive.Area 
                  type="monotone" 
                  dataKey="profit" 
                  stackId="1" 
                  stroke="#82ca9d" 
                  fill="url(#colorProfit)" 
                />
                <RechartsPrimitive.Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stackId="1" 
                  stroke="#ffc658" 
                  fill="url(#colorExpenses)" 
                />
                <RechartsPrimitive.Legend />
              </RechartsPrimitive.AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Modern Gauge-style Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium flex items-center gap-2">
              🎪 Campaign ROI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <RechartsPrimitive.PieChart>
                <RechartsPrimitive.Pie
                  data={[
                    { name: 'ROI', value: 75, fill: '#4285F4' },
                    { name: 'Remaining', value: 25, fill: '#f0f0f0' }
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
                  y="50%" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  className="text-2xl font-bold fill-current"
                >
                  75%
                </text>
                <text 
                  x="50%" 
                  y="60%" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  className="text-sm fill-gray-500"
                >
                  ROI Score
                </text>
              </RechartsPrimitive.PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;
