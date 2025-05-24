
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, TrendingDown, Target, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface InsightsOverviewProps {
  refreshing?: boolean;
}

const InsightsOverview: React.FC<InsightsOverviewProps> = ({ refreshing }) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [metrics, setMetrics] = useState({
    totalInsights: 24,
    actionableRecommendations: 8,
    performanceScore: 87,
    trendsIdentified: 12,
    opportunitiesFound: 5,
    risksDetected: 2
  });

  const insights = [
    {
      id: 1,
      type: 'opportunity',
      title: isArabic ? 'فرصة نمو في السوق المحلي' : 'Growth opportunity in local market',
      description: isArabic ? 'تحليل البيانات يشير إلى زيادة الطلب بنسبة 23% في منطقتك' : 'Data analysis shows 23% increased demand in your region',
      impact: 'high',
      confidence: 92,
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'risk',
      title: isArabic ? 'تراجع في معدل التفاعل' : 'Declining engagement rate',
      description: isArabic ? 'انخفاض التفاعل بنسبة 8% خلال الأسبوعين الماضيين' : '8% decrease in engagement over the last two weeks',
      impact: 'medium',
      confidence: 78,
      icon: TrendingDown,
      color: 'text-red-600'
    },
    {
      id: 3,
      type: 'trend',
      title: isArabic ? 'اتجاه صاعد في البحث الصوتي' : 'Rising trend in voice search',
      description: isArabic ? 'زيادة 45% في عمليات البحث الصوتي ذات الصلة بمجالك' : '45% increase in voice searches related to your industry',
      impact: 'high',
      confidence: 85,
      icon: Target,
      color: 'text-blue-600'
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              {isArabic ? 'إجمالي الرؤى' : 'Total Insights'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {metrics.totalInsights}
            </div>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              +6 {isArabic ? 'هذا الأسبوع' : 'this week'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              {isArabic ? 'نقاط الأداء' : 'Performance Score'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {metrics.performanceScore}%
            </div>
            <Progress value={metrics.performanceScore} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              {isArabic ? 'التوصيات القابلة للتنفيذ' : 'Actionable Recommendations'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {metrics.actionableRecommendations}
            </div>
            <div className="flex items-center mt-2 text-sm text-blue-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              {isArabic ? 'جاهزة للتطبيق' : 'Ready to apply'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <AlertCircle className="h-5 w-5 text-purple-600" />
            {isArabic ? 'الرؤى الرئيسية' : 'Key Insights'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight) => (
              <div key={insight.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className={`flex items-start gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className="flex-shrink-0">
                    <insight.icon className={`h-5 w-5 ${insight.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`flex items-center justify-between mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {insight.title}
                      </h4>
                      <Badge className={`text-xs ${getImpactColor(insight.impact)}`}>
                        {insight.impact}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {insight.description}
                    </p>
                    <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span className="text-xs text-gray-500">
                        {isArabic ? 'مستوى الثقة:' : 'Confidence:'} {insight.confidence}%
                      </span>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {isArabic ? 'منذ ساعتين' : '2 hours ago'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {isArabic ? 'إجراءات فورية مطلوبة' : 'Immediate Actions Required'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/10 rounded-lg">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-800 dark:text-red-400">
                  {isArabic ? 'تحسين معدل التحويل - أولوية عالية' : 'Optimize conversion rate - High priority'}
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span className="text-sm text-yellow-800 dark:text-yellow-400">
                  {isArabic ? 'مراجعة استراتيجية المحتوى' : 'Review content strategy'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {isArabic ? 'فرص النمو' : 'Growth Opportunities'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800 dark:text-green-400">
                  {isArabic ? 'توسيع في السوق المحلي' : 'Expand into local market'}
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-800 dark:text-blue-400">
                  {isArabic ? 'تحسين البحث الصوتي' : 'Optimize for voice search'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InsightsOverview;
