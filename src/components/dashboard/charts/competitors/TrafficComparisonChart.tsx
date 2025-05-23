
import React from 'react';
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';

interface TrafficComparisonChartProps {
  chartConfig: any;
}

const TrafficComparisonChart: React.FC<TrafficComparisonChartProps> = ({ chartConfig }) => {
  const { t } = useLanguage();

  const competitorData = [
    { name: t('month.jan'), [t('chart.your.brand')]: 400, [t('chart.competitor.a')]: 240, [t('chart.competitor.b')]: 320, [t('chart.competitor.c')]: 180 },
    { name: t('month.feb'), [t('chart.your.brand')]: 300, [t('chart.competitor.a')]: 398, [t('chart.competitor.b')]: 230, [t('chart.competitor.c')]: 190 },
    { name: t('month.mar'), [t('chart.your.brand')]: 200, [t('chart.competitor.a')]: 480, [t('chart.competitor.b')]: 270, [t('chart.competitor.c')]: 220 },
    { name: t('month.apr'), [t('chart.your.brand')]: 278, [t('chart.competitor.a')]: 390, [t('chart.competitor.b')]: 290, [t('chart.competitor.c')]: 250 },
    { name: t('month.may'), [t('chart.your.brand')]: 189, [t('chart.competitor.a')]: 480, [t('chart.competitor.b')]: 310, [t('chart.competitor.c')]: 230 },
    { name: t('month.jun'), [t('chart.your.brand')]: 239, [t('chart.competitor.a')]: 380, [t('chart.competitor.b')]: 320, [t('chart.competitor.c')]: 270 }
  ];

  return (
    <Card className="lg:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium flex items-center gap-2">
          🚀 {t('chart.traffic.comparison')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <RechartsPrimitive.AreaChart data={competitorData}>
            <defs>
              <linearGradient id="yourBrandGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4285F4" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4285F4" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="competitorAGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34A853" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#34A853" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
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
            <RechartsPrimitive.Area 
              type="monotone" 
              dataKey={t('chart.your.brand')} 
              stroke="#4285F4" 
              fill="url(#yourBrandGradient)"
              strokeWidth={3}
            />
            <RechartsPrimitive.Area 
              type="monotone" 
              dataKey={t('chart.competitor.a')} 
              stroke="#34A853" 
              fill="url(#competitorAGradient)"
              strokeWidth={2}
            />
            <RechartsPrimitive.Line 
              type="monotone" 
              dataKey={t('chart.competitor.b')} 
              stroke="#FBBC05"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
            <RechartsPrimitive.Line 
              type="monotone" 
              dataKey={t('chart.competitor.c')} 
              stroke="#EA4335"
              strokeWidth={2}
              strokeDasharray="3 3"
            />
            <RechartsPrimitive.Legend />
          </RechartsPrimitive.AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TrafficComparisonChart;
