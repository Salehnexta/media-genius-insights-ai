
import React from 'react';
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BrandPositioningChartProps {
  chartConfig: any;
}

const BrandPositioningChart: React.FC<BrandPositioningChartProps> = ({ chartConfig }) => {
  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium flex items-center gap-2">
          💎 Brand Positioning
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <ChartContainer config={chartConfig} className="w-full h-[300px] max-h-[300px]">
          <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
            <RechartsPrimitive.ScatterChart margin={{ top: 20, right: 30, bottom: 30, left: 20 }}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <RechartsPrimitive.XAxis 
                type="number" 
                dataKey="quality" 
                name="Quality"
                domain={[0, 10]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
                label={{ value: 'Quality', position: 'bottom', offset: 5 }}
              />
              <RechartsPrimitive.YAxis 
                type="number" 
                dataKey="price" 
                name="Price"
                domain={[0, 10]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
                label={{ value: 'Price', angle: -90, position: 'left', offset: 5 }}
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
                shape={(props) => (
                  <circle 
                    cx={props.cx} 
                    cy={props.cy} 
                    r={10} 
                    fill="#4285F4" 
                    stroke="#fff"
                    strokeWidth={2}
                  />
                )}
              />
              <RechartsPrimitive.Scatter 
                name="Competitor A" 
                data={[{ quality: 7.8, price: 8.1, z: 80 }]} 
                fill="#34A853" 
                shape={(props) => (
                  <circle 
                    cx={props.cx} 
                    cy={props.cy} 
                    r={8} 
                    fill="#34A853" 
                    stroke="#fff"
                    strokeWidth={1}
                  />
                )}
              />
              <RechartsPrimitive.Scatter 
                name="Competitor B" 
                data={[{ quality: 6.9, price: 9.2, z: 60 }]} 
                fill="#FBBC05" 
                shape={(props) => (
                  <circle 
                    cx={props.cx} 
                    cy={props.cy} 
                    r={8} 
                    fill="#FBBC05" 
                    stroke="#fff"
                    strokeWidth={1}
                  />
                )}
              />
              <RechartsPrimitive.Scatter 
                name="Competitor C" 
                data={[{ quality: 6.2, price: 8.8, z: 40 }]} 
                fill="#EA4335" 
                shape={(props) => (
                  <circle 
                    cx={props.cx} 
                    cy={props.cy} 
                    r={7} 
                    fill="#EA4335" 
                    stroke="#fff"
                    strokeWidth={1}
                  />
                )}
              />
              <RechartsPrimitive.Legend layout="horizontal" verticalAlign="bottom" />
            </RechartsPrimitive.ScatterChart>
          </RechartsPrimitive.ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BrandPositioningChart;
