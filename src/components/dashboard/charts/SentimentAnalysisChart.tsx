
import React from 'react';
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";

interface SentimentAnalysisChartProps {
  data: Array<{
    name: string;
    "Positive": number;
    "Negative": number;
    "Neutral": number;
  }>;
  chartConfig: any;
}

const SentimentAnalysisChart: React.FC<SentimentAnalysisChartProps> = ({ data, chartConfig }) => {
  return (
    <div className="chart-container">
      <h3 className="font-medium mb-2">Brand Sentiment Analysis</h3>
      <ChartContainer config={chartConfig} className="h-[240px]">
        <RechartsPrimitive.LineChart data={data}>
          <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
          <RechartsPrimitive.XAxis dataKey="name" />
          <RechartsPrimitive.YAxis />
          <RechartsPrimitive.Tooltip />
          <RechartsPrimitive.Line type="monotone" dataKey="Positive" stroke="#34A853" />
          <RechartsPrimitive.Line type="monotone" dataKey="Negative" stroke="#EA4335" />
          <RechartsPrimitive.Line type="monotone" dataKey="Neutral" stroke="#FBBC05" />
        </RechartsPrimitive.LineChart>
      </ChartContainer>
    </div>
  );
};

export default SentimentAnalysisChart;
