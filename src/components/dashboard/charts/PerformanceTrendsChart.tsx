
import React from 'react';
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { useLanguage } from '@/contexts/LanguageContext';

interface PerformanceTrendsChartProps {
  data: Array<{
    name: string;
    "Website Traffic": number;
    "Social Media": number;
  }>;
  chartConfig: any;
}

const PerformanceTrendsChart: React.FC<PerformanceTrendsChartProps> = ({ data, chartConfig }) => {
  const { t } = useLanguage();

  const translatedData = data.map(item => ({
    name: t(`month.${item.name.toLowerCase()}`),
    [t('chart.website.traffic')]: item["Website Traffic"],
    [t('chart.social.media')]: item["Social Media"],
  }));

  return (
    <div className="chart-container">
      <h3 className="font-medium mb-2">{t('chart.performance.trends')}</h3>
      <ChartContainer config={chartConfig} className="h-[240px]">
        <RechartsPrimitive.AreaChart data={translatedData}>
          <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
          <RechartsPrimitive.XAxis dataKey="name" />
          <RechartsPrimitive.YAxis />
          <RechartsPrimitive.Tooltip />
          <RechartsPrimitive.Area type="monotone" dataKey={t('chart.website.traffic')} stroke="#4285F4" fill="#4285F4" />
          <RechartsPrimitive.Area type="monotone" dataKey={t('chart.social.media')} stroke="#34A853" fill="#34A853" />
        </RechartsPrimitive.AreaChart>
      </ChartContainer>
    </div>
  );
};

export default PerformanceTrendsChart;
