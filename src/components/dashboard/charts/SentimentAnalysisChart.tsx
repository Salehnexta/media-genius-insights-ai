
import React from 'react';
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { t } = useLanguage();

  const translatedData = data.map(item => ({
    name: t(`day.${item.name.toLowerCase()}`),
    [t('chart.positive')]: item["Positive"],
    [t('chart.negative')]: item["Negative"],
    [t('chart.neutral')]: item["Neutral"],
  }));

  return (
    <div className="chart-container">
      <h3 className="font-medium mb-2">{t('chart.sentiment.analysis')}</h3>
      <ChartContainer config={chartConfig} className="h-[240px]">
        <RechartsPrimitive.LineChart data={translatedData}>
          <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
          <RechartsPrimitive.XAxis dataKey="name" />
          <RechartsPrimitive.YAxis />
          <RechartsPrimitive.Tooltip />
          <RechartsPrimitive.Line type="monotone" dataKey={t('chart.positive')} stroke="#34A853" />
          <RechartsPrimitive.Line type="monotone" dataKey={t('chart.negative')} stroke="#EA4335" />
          <RechartsPrimitive.Line type="monotone" dataKey={t('chart.neutral')} stroke="#FBBC05" />
        </RechartsPrimitive.LineChart>
      </ChartContainer>
    </div>
  );
};

export default SentimentAnalysisChart;
