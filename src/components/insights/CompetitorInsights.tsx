
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Users, TrendingUp, AlertTriangle, Target } from 'lucide-react';

interface CompetitorInsightsProps {
  refreshing?: boolean;
}

const CompetitorInsights: React.FC<CompetitorInsightsProps> = ({ refreshing }) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const competitorData = [
    {
      name: 'Competitor A',
      marketShare: 35,
      growth: 12,
      engagement: 8.5,
      satisfaction: 4.2
    },
    {
      name: isArabic ? 'شركتك' : 'Your Company',
      marketShare: 28,
      growth: 18,
      engagement: 9.2,
      satisfaction: 4.6
    },
    {
      name: 'Competitor B',
      marketShare: 22,
      growth: 8,
      engagement: 7.8,
      satisfaction: 4.0
    },
    {
      name: 'Competitor C',
      marketShare: 15,
      growth: 15,
      engagement: 8.8,
      satisfaction: 4.3
    }
  ];

  const radarData = [
    {
      subject: isArabic ? 'الجودة' : 'Quality',
      yourCompany: 85,
      competitorA: 78,
      competitorB: 72
    },
    {
      subject: isArabic ? 'السعر' : 'Price',
      yourCompany: 72,
      competitorA: 85,
      competitorB: 90
    },
    {
      subject: isArabic ? 'الخدمة' : 'Service',
      yourCompany: 88,
      competitorA: 75,
      competitorB: 68
    },
    {
      subject: isArabic ? 'الابتكار' : 'Innovation',
      yourCompany: 92,
      competitorA: 68,
      competitorB: 75
    },
    {
      subject: isArabic ? 'التسويق' : 'Marketing',
      yourCompany: 80,
      competitorA: 88,
      competitorB: 82
    },
    {
      subject: isArabic ? 'الوصول' : 'Reach',
      yourCompany: 75,
      competitorA: 92,
      competitorB: 85
    }
  ];

  const insights = [
    {
      id: 1,
      type: 'opportunity',
      title: isArabic ? 'تفوق في خدمة العملاء' : 'Customer Service Excellence',
      description: isArabic ? 'تتفوق شركتك في خدمة العملاء بنسبة 15% على المنافسين' : 'Your company excels in customer service by 15% over competitors',
      impact: 'high',
      action: isArabic ? 'استمر في تطوير الخدمة' : 'Continue service development'
    },
    {
      id: 2,
      type: 'threat',
      title: isArabic ? 'منافسة سعرية قوية' : 'Strong Price Competition',
      description: isArabic ? 'المنافس B يقدم أسعار أقل بنسبة 18%' : 'Competitor B offers 18% lower prices',
      impact: 'medium',
      action: isArabic ? 'مراجعة استراتيجية التسعير' : 'Review pricing strategy'
    },
    {
      id: 3,
      type: 'advantage',
      title: isArabic ? 'ريادة في الابتكار' : 'Innovation Leadership',
      description: isArabic ? 'تتصدر شركتك في الابتكار والتطوير التقني' : 'Your company leads in innovation and technical development',
      impact: 'high',
      action: isArabic ? 'الاستفادة من هذه القوة' : 'Leverage this strength'
    }
  ];

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800';
      case 'threat': return 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800';
      case 'advantage': return 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800';
      default: return 'bg-gray-50 dark:bg-gray-900/10 border-gray-200 dark:border-gray-800';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return TrendingUp;
      case 'threat': return AlertTriangle;
      case 'advantage': return Target;
      default: return Users;
    }
  };

  return (
    <div className="space-y-6">
      {/* Market Position Chart */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Users className="h-5 w-5 text-blue-600" />
            {isArabic ? 'الموقع في السوق' : 'Market Position'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={competitorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="marketShare" fill="#8884d8" name={isArabic ? 'حصة السوق %' : 'Market Share %'} />
              <Bar dataKey="growth" fill="#82ca9d" name={isArabic ? 'النمو %' : 'Growth %'} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Competitive Analysis Radar */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Target className="h-5 w-5 text-green-600" />
            {isArabic ? 'التحليل التنافسي' : 'Competitive Analysis'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name={isArabic ? 'شركتك' : 'Your Company'}
                dataKey="yourCompany"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
              />
              <Radar
                name="Competitor A"
                dataKey="competitorA"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.3}
              />
              <Radar
                name="Competitor B"
                dataKey="competitorB"
                stroke="#ffc658"
                fill="#ffc658"
                fillOpacity={0.3}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Competitive Insights */}
      <Card>
        <CardHeader>
          <CardTitle>
            {isArabic ? 'رؤى تنافسية' : 'Competitive Insights'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight) => {
              const IconComponent = getInsightIcon(insight.type);
              return (
                <div key={insight.id} className={`border rounded-lg p-4 ${getInsightColor(insight.type)}`}>
                  <div className={`flex items-start gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className="flex-shrink-0">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`flex items-center justify-between mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {insight.title}
                        </h4>
                        <Badge variant="secondary" className="text-xs">
                          {insight.impact}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {insight.description}
                      </p>
                      <p className="text-xs font-medium text-gray-800 dark:text-gray-300">
                        {isArabic ? 'الإجراء المقترح:' : 'Recommended Action:'} {insight.action}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Competitor Performance Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>
              {isArabic ? 'مقارنة الأداء' : 'Performance Comparison'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {competitorData.map((competitor, index) => (
                <div key={index} className="space-y-3">
                  <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {competitor.name}
                    </h4>
                    <Badge variant={competitor.name.includes(isArabic ? 'شركتك' : 'Your') ? 'default' : 'secondary'}>
                      {competitor.marketShare}% {isArabic ? 'حصة السوق' : 'market share'}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className={`flex justify-between text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span>{isArabic ? 'التفاعل:' : 'Engagement:'}</span>
                      <span>{competitor.engagement}/10</span>
                    </div>
                    <Progress value={competitor.engagement * 10} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className={`flex justify-between text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span>{isArabic ? 'رضا العملاء:' : 'Customer Satisfaction:'}</span>
                      <span>{competitor.satisfaction}/5</span>
                    </div>
                    <Progress value={competitor.satisfaction * 20} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {isArabic ? 'نقاط القوة والضعف' : 'Strengths & Weaknesses'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-green-800 dark:text-green-400 mb-2">
                  {isArabic ? 'نقاط القوة' : 'Strengths'}
                </h5>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-600 rounded-full" />
                    {isArabic ? 'خدمة عملاء متميزة' : 'Excellent customer service'}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-600 rounded-full" />
                    {isArabic ? 'ابتكار تقني متقدم' : 'Advanced technical innovation'}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-600 rounded-full" />
                    {isArabic ? 'نمو سريع' : 'Rapid growth'}
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-red-800 dark:text-red-400 mb-2">
                  {isArabic ? 'نقاط الضعف' : 'Weaknesses'}
                </h5>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-red-600 rounded-full" />
                    {isArabic ? 'حصة سوق أقل' : 'Lower market share'}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-red-600 rounded-full" />
                    {isArabic ? 'وصول محدود' : 'Limited reach'}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-red-600 rounded-full" />
                    {isArabic ? 'أسعار أعلى' : 'Higher pricing'}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompetitorInsights;
