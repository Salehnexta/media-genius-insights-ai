
import React from 'react';
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { getShareOfVoiceData } from '../../ChartConfig';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MarketShareChartProps {
  chartConfig: any;
}

const MarketShareChart: React.FC<MarketShareChartProps> = ({ chartConfig }) => {
  const shareOfVoiceData = getShareOfVoiceData();

  return (
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
  );
};

export default MarketShareChart;
