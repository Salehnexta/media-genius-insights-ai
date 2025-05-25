
import React from 'react';
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { useLanguage } from '@/contexts/LanguageContext';

interface ShareOfVoiceChartProps {
  data: Array<{
    name: string;
    value: number;
    fill: string;
  }>;
  chartConfig: any;
}

const ShareOfVoiceChart: React.FC<ShareOfVoiceChartProps> = ({ data, chartConfig }) => {
  const { t } = useLanguage();

  const translatedData = data.map(item => ({
    ...item,
    name: t(`chart.${item.name.toLowerCase().replace(' ', '.')}`),
  }));

  return (
    <div className="chart-container">
      <h3 className="font-medium mb-2">{t('chart.share.voice')}</h3>
      <div className="flex justify-center">
        <ChartContainer config={chartConfig} className="h-[200px]">
          <RechartsPrimitive.PieChart>
            <RechartsPrimitive.Pie
              data={translatedData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
              dataKey="value"
            />
            <RechartsPrimitive.Tooltip />
          </RechartsPrimitive.PieChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default ShareOfVoiceChart;
