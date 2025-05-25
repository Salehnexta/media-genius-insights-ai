
import React from 'react';
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';

interface PerformanceBenchmarkChartProps {
  chartConfig: any;
}

const PerformanceBenchmarkChart: React.FC<PerformanceBenchmarkChartProps> = ({ chartConfig }) => {
  const { t } = useLanguage();

  const competitorPerformance = [
    { metric: t('metric.market.share'), yours: 42, competitorA: 28, competitorB: 19, competitorC: 11 },
    { metric: t('metric.brand.awareness'), yours: 65, competitorA: 58, competitorB: 45, competitorC: 32 },
    { metric: t('metric.customer.satisfaction'), yours: 8.2, competitorA: 7.8, competitorB: 7.1, competitorC: 6.9 },
    { metric: t('metric.innovation.index'), yours: 7.5, competitorA: 8.1, competitorB: 6.8, competitorC: 6.2 },
    { metric: t('metric.price.competitiveness'), yours: 6.8, competitorA: 7.2, competitorB: 8.5, competitorC: 7.9 }
  ];

  return (
    <Card className="lg:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium flex items-center gap-2">
          📊 {t('chart.performance.benchmark')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <RechartsPrimitive.RadarChart 
            cx="50%" 
            cy="50%" 
            outerRadius="80%" 
            data={competitorPerformance}
          >
            <RechartsPrimitive.PolarGrid stroke="#e2e8f0" />
            <RechartsPrimitive.PolarAngleAxis 
              dataKey="metric" 
              tick={{ fontSize: 10, fill: '#666' }}
            />
            <RechartsPrimitive.PolarRadiusAxis 
              tick={{ fontSize: 9, fill: '#999' }}
              domain={[0, 100]}
            />
            <RechartsPrimitive.Radar 
              name={t('chart.your.brand')} 
              dataKey="yours" 
              stroke="#4285F4" 
              fill="#4285F4" 
              fillOpacity={0.3}
              strokeWidth={3}
            />
            <RechartsPrimitive.Radar 
              name={t('chart.competitor.a')} 
              dataKey="competitorA" 
              stroke="#34A853" 
              fill="#34A853" 
              fillOpacity={0.1}
              strokeWidth={2}
              strokeDasharray="5 5"
            />
            <RechartsPrimitive.Radar 
              name={t('chart.competitor.b')} 
              dataKey="competitorB" 
              stroke="#FBBC05" 
              fill="#FBBC05" 
              fillOpacity={0.1}
              strokeWidth={2}
              strokeDasharray="3 3"
            />
            <RechartsPrimitive.Legend />
            <RechartsPrimitive.Tooltip />
          </RechartsPrimitive.RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceBenchmarkChart;
