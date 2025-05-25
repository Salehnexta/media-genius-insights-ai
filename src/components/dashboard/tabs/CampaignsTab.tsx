
import React from 'react';
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { getOverviewData } from '../ChartConfig';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';

interface CampaignsTabProps {
  chartConfig: any;
}

const CampaignsTab: React.FC<CampaignsTabProps> = ({ chartConfig }) => {
  const overviewData = getOverviewData();
  const { t } = useLanguage();

  const campaignData = [
    { name: t('month.jan'), [t('chart.campaign.a')]: 4000, [t('chart.campaign.b')]: 2400, [t('chart.campaign.c')]: 1800 },
    { name: t('month.feb'), [t('chart.campaign.a')]: 3000, [t('chart.campaign.b')]: 1398, [t('chart.campaign.c')]: 2300 },
    { name: t('month.mar'), [t('chart.campaign.a')]: 2000, [t('chart.campaign.b')]: 9800, [t('chart.campaign.c')]: 2290 },
    { name: t('month.apr'), [t('chart.campaign.a')]: 2780, [t('chart.campaign.b')]: 3908, [t('chart.campaign.c')]: 2000 },
    { name: t('month.may'), [t('chart.campaign.a')]: 1890, [t('chart.campaign.b')]: 4800, [t('chart.campaign.c')]: 2181 },
    { name: t('month.jun'), [t('chart.campaign.a')]: 2390, [t('chart.campaign.b')]: 3800, [t('chart.campaign.c')]: 2500 }
  ];

  const budgetAllocationData = [
    { name: t('chart.campaign.a'), value: 40, fill: '#4285F4' },
    { name: t('chart.campaign.b'), value: 30, fill: '#34A853' },
    { name: t('chart.campaign.c'), value: 20, fill: '#FBBC05' },
    { name: t('chart.campaign.d'), value: 10, fill: '#EA4335' }
  ];

  const engagementData = [
    { subject: t('chart.clicks'), A: 120, B: 110, C: 90, fullMark: 150 },
    { subject: t('chart.views'), A: 98, B: 130, C: 85, fullMark: 150 },
    { subject: t('chart.shares'), A: 86, B: 70, C: 90, fullMark: 150 },
    { subject: t('chart.comments'), A: 99, B: 80, C: 65, fullMark: 150 },
    { subject: t('chart.saves'), A: 85, B: 90, C: 80, fullMark: 150 }
  ];

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="space-y-6 max-w-full">
        <Card className="w-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">{t('chart.campaign.performance')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
                <RechartsPrimitive.BarChart data={campaignData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                  <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                  <RechartsPrimitive.XAxis dataKey="name" />
                  <RechartsPrimitive.YAxis />
                  <RechartsPrimitive.Tooltip />
                  <RechartsPrimitive.Legend />
                  <RechartsPrimitive.Bar dataKey={t('chart.campaign.a')} fill="#4285F4" />
                  <RechartsPrimitive.Bar dataKey={t('chart.campaign.b')} fill="#34A853" />
                  <RechartsPrimitive.Bar dataKey={t('chart.campaign.c')} fill="#FBBC05" />
                </RechartsPrimitive.BarChart>
              </RechartsPrimitive.ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="w-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">{t('chart.budget.allocation')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
                <RechartsPrimitive.PieChart>
                  <defs>
                    {budgetAllocationData.map((entry, index) => (
                      <radialGradient 
                        id={`budgetGradient${index}`} 
                        cx="50%" 
                        cy="50%" 
                        r="50%" 
                        fx="50%" 
                        fy="50%" 
                        key={`gradient-${index}`}
                      >
                        <stop 
                          offset="0%" 
                          stopColor={entry.fill} 
                          stopOpacity={0.9}
                        />
                        <stop 
                          offset="100%" 
                          stopColor={entry.fill} 
                          stopOpacity={0.6}
                        />
                      </radialGradient>
                    ))}
                  </defs>
                  <RechartsPrimitive.Pie
                    data={budgetAllocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {budgetAllocationData.map((entry, index) => (
                      <RechartsPrimitive.Cell 
                        key={`cell-${index}`} 
                        fill={`url(#budgetGradient${index})`} 
                        stroke={entry.fill}
                        strokeWidth={1}
                      />
                    ))}
                  </RechartsPrimitive.Pie>
                  <RechartsPrimitive.Tooltip 
                    formatter={(value) => [`${value}%`, t('chart.budget.label')]}
                    contentStyle={{ 
                      background: 'rgba(255, 255, 255, 0.95)', 
                      border: 'none', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <RechartsPrimitive.Legend />
                  <text 
                    x="50%" 
                    y="50%" 
                    textAnchor="middle" 
                    dominantBaseline="middle" 
                    className="text-xl font-bold fill-current"
                  >
                    40%
                  </text>
                  <text 
                    x="50%" 
                    y="60%" 
                    textAnchor="middle" 
                    dominantBaseline="middle" 
                    className="text-xs fill-gray-500"
                  >
                    {t('chart.campaign.a')}
                  </text>
                </RechartsPrimitive.PieChart>
              </RechartsPrimitive.ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="w-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">{t('chart.campaign.roi')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
                <RechartsPrimitive.LineChart data={campaignData}>
                  <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                  <RechartsPrimitive.XAxis dataKey="name" />
                  <RechartsPrimitive.YAxis />
                  <RechartsPrimitive.Tooltip />
                  <RechartsPrimitive.Legend />
                  <RechartsPrimitive.Line type="monotone" dataKey={t('chart.campaign.a')} stroke="#4285F4" />
                  <RechartsPrimitive.Line type="monotone" dataKey={t('chart.campaign.b')} stroke="#34A853" />
                  <RechartsPrimitive.Line type="monotone" dataKey={t('chart.campaign.c')} stroke="#FBBC05" />
                </RechartsPrimitive.LineChart>
              </RechartsPrimitive.ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="w-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">{t('chart.engagement.metrics')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
                <RechartsPrimitive.RadarChart 
                  cx="50%" 
                  cy="50%" 
                  outerRadius="80%" 
                  data={engagementData}
                >
                  <RechartsPrimitive.PolarGrid />
                  <RechartsPrimitive.PolarAngleAxis dataKey="subject" />
                  <RechartsPrimitive.PolarRadiusAxis />
                  <RechartsPrimitive.Radar name={t('chart.campaign.a')} dataKey="A" stroke="#4285F4" fill="#4285F4" fillOpacity={0.6} />
                  <RechartsPrimitive.Radar name={t('chart.campaign.b')} dataKey="B" stroke="#34A853" fill="#34A853" fillOpacity={0.6} />
                  <RechartsPrimitive.Radar name={t('chart.campaign.c')} dataKey="C" stroke="#FBBC05" fill="#FBBC05" fillOpacity={0.6} />
                  <RechartsPrimitive.Legend />
                  <RechartsPrimitive.Tooltip />
                </RechartsPrimitive.RadarChart>
              </RechartsPrimitive.ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampaignsTab;
