
import React from 'react';
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";

interface PerformanceTrendsChartProps {
  data: Array<{
    name: string;
    "Website Traffic": number;
    "Social Media": number;
  }>;
  chartConfig: any;
}

const PerformanceTrendsChart: React.FC<PerformanceTrendsChartProps> = ({ data, chartConfig }) => {
  return (
    <div className="chart-container">
      <h3 className="font-medium mb-2">Performance Trends</h3>
      <ChartContainer config={chartConfig} className="h-[240px]">
        <RechartsPrimitive.AreaChart data={data}>
          <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
          <RechartsPrimitive.XAxis dataKey="name" />
          <RechartsPrimitive.YAxis />
          <RechartsPrimitive.Tooltip />
          <RechartsPrimitive.Area type="monotone" dataKey="Website Traffic" stroke="#4285F4" fill="#4285F4" />
          <RechartsPrimitive.Area type="monotone" dataKey="Social Media" stroke="#34A853" fill="#34A853" />
        </RechartsPrimitive.AreaChart>
      </ChartContainer>
    </div>
  );
};

export default PerformanceTrendsChart;
