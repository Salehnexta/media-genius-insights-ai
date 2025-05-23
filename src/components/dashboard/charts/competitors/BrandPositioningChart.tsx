
import React from 'react';
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BrandPositioningChartProps {
  chartConfig: any;
}

const BrandPositioningChart: React.FC<BrandPositioningChartProps> = ({ chartConfig }) => {
  return (
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
  );
};

export default BrandPositioningChart;
