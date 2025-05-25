
import React from 'react';
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { getOverviewData } from '../ChartConfig';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CampaignsTabProps {
  chartConfig: any;
}

const campaignData = [
  { name: 'Jan', "Campaign A": 4000, "Campaign B": 2400, "Campaign C": 1800 },
  { name: 'Feb', "Campaign A": 3000, "Campaign B": 1398, "Campaign C": 2300 },
  { name: 'Mar', "Campaign A": 2000, "Campaign B": 9800, "Campaign C": 2290 },
  { name: 'Apr', "Campaign A": 2780, "Campaign B": 3908, "Campaign C": 2000 },
  { name: 'May', "Campaign A": 1890, "Campaign B": 4800, "Campaign C": 2181 },
  { name: 'Jun', "Campaign A": 2390, "Campaign B": 3800, "Campaign C": 2500 }
];

const budgetAllocationData = [
  { name: 'Campaign A', value: 40, fill: '#4285F4' },
  { name: 'Campaign B', value: 30, fill: '#34A853' },
  { name: 'Campaign C', value: 20, fill: '#FBBC05' },
  { name: 'Campaign D', value: 10, fill: '#EA4335' }
];

const CampaignsTab: React.FC<CampaignsTabProps> = ({ chartConfig }) => {
  const overviewData = getOverviewData();

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="space-y-6 max-w-full">
        <Card className="w-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">Campaign Performance</CardTitle>
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
                  <RechartsPrimitive.Bar dataKey="Campaign A" fill="#4285F4" />
                  <RechartsPrimitive.Bar dataKey="Campaign B" fill="#34A853" />
                  <RechartsPrimitive.Bar dataKey="Campaign C" fill="#FBBC05" />
                </RechartsPrimitive.BarChart>
              </RechartsPrimitive.ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="w-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">Budget Allocation</CardTitle>
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
                    formatter={(value) => [`${value}%`, 'Budget']}
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
                    Campaign A
                  </text>
                </RechartsPrimitive.PieChart>
              </RechartsPrimitive.ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="w-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">Campaign ROI</CardTitle>
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
                  <RechartsPrimitive.Line type="monotone" dataKey="Campaign A" stroke="#4285F4" />
                  <RechartsPrimitive.Line type="monotone" dataKey="Campaign B" stroke="#34A853" />
                  <RechartsPrimitive.Line type="monotone" dataKey="Campaign C" stroke="#FBBC05" />
                </RechartsPrimitive.LineChart>
              </RechartsPrimitive.ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="w-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">Engagement Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
                <RechartsPrimitive.RadarChart 
                  cx="50%" 
                  cy="50%" 
                  outerRadius="80%" 
                  data={[
                    { subject: 'Clicks', A: 120, B: 110, C: 90, fullMark: 150 },
                    { subject: 'Views', A: 98, B: 130, C: 85, fullMark: 150 },
                    { subject: 'Shares', A: 86, B: 70, C: 90, fullMark: 150 },
                    { subject: 'Comments', A: 99, B: 80, C: 65, fullMark: 150 },
                    { subject: 'Saves', A: 85, B: 90, C: 80, fullMark: 150 }
                  ]}
                >
                  <RechartsPrimitive.PolarGrid />
                  <RechartsPrimitive.PolarAngleAxis dataKey="subject" />
                  <RechartsPrimitive.PolarRadiusAxis />
                  <RechartsPrimitive.Radar name="Campaign A" dataKey="A" stroke="#4285F4" fill="#4285F4" fillOpacity={0.6} />
                  <RechartsPrimitive.Radar name="Campaign B" dataKey="B" stroke="#34A853" fill="#34A853" fillOpacity={0.6} />
                  <RechartsPrimitive.Radar name="Campaign C" dataKey="C" stroke="#FBBC05" fill="#FBBC05" fillOpacity={0.6} />
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
