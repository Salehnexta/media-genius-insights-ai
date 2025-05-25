
import React from 'react';
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TrafficComparisonChartProps {
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

const TrafficComparisonChart: React.FC<TrafficComparisonChartProps> = ({ chartConfig }) => {
  return (
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
  );
};

export default TrafficComparisonChart;
