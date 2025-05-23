
import React from 'react';
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { getShareOfVoiceData } from '../../ChartConfig';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';

interface MarketShareChartProps {
  chartConfig: any;
}

const MarketShareChart: React.FC<MarketShareChartProps> = ({ chartConfig }) => {
  const shareOfVoiceData = getShareOfVoiceData();
  const { t } = useLanguage();

  const translatedData = shareOfVoiceData.map(item => ({
    ...item,
    name: t(`chart.${item.name.toLowerCase().replace(' ', '.')}`),
  }));

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium flex items-center gap-2">
          🎯 {t('chart.market.share')}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <ChartContainer config={chartConfig} className="w-full h-[300px] max-h-[300px]">
          <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
            <RechartsPrimitive.PieChart>
              <RechartsPrimitive.Pie
                data={translatedData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {translatedData.map((entry, index) => (
                  <RechartsPrimitive.Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </RechartsPrimitive.Pie>
              <RechartsPrimitive.Tooltip 
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`${value}%`, t('chart.market.share.label')]}
              />
              <RechartsPrimitive.Legend verticalAlign="bottom" layout="horizontal" />
              <text 
                x="50%" 
                y="50%" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                className="text-2xl font-bold fill-current"
              >
                42%
              </text>
            </RechartsPrimitive.PieChart>
          </RechartsPrimitive.ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default MarketShareChart;
