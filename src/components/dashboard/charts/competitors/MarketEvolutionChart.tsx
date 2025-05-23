
import React from 'react';
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MarketEvolutionChartProps {
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

const MarketEvolutionChart: React.FC<MarketEvolutionChartProps> = ({ chartConfig }) => {
  return (
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
  );
};

export default MarketEvolutionChart;
