
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Target, TrendingUp, Calendar, Zap } from 'lucide-react';

interface PerformanceForecastProps {
  refreshing?: boolean;
}

const PerformanceForecast: React.FC<PerformanceForecastProps> = ({ refreshing }) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const forecastData = [
    { 
      month: isArabic ? 'يناير' : 'Jan', 
      actual: 12000, 
      forecast: null, 
      optimistic: null, 
      pessimistic: null 
    },
    { 
      month: isArabic ? 'فبراير' : 'Feb', 
      actual: 15000, 
      forecast: null, 
      optimistic: null, 
      pessimistic: null 
    },
    { 
      month: isArabic ? 'مارس' : 'Mar', 
      actual: 18000, 
      forecast: null, 
      optimistic: null, 
      pessimistic: null 
    },
    { 
      month: isArabic ? 'أبريل' : 'Apr', 
      actual: null, 
      forecast: 22000, 
      optimistic: 26000, 
      pessimistic: 19000 
    },
    { 
      month: isArabic ? 'مايو' : 'May', 
      actual: null, 
      forecast: 26000, 
      optimistic: 31000, 
      pessimistic: 22000 
    },
    { 
      month: isArabic ? 'يونيو' : 'Jun', 
      actual: null, 
      forecast: 30000, 
      optimistic: 36000, 
      pessimistic: 25000 
    },
    { 
      month: isArabic ? 'يوليو' : 'Jul', 
      actual: null, 
      forecast: 34000, 
      optimistic: 41000, 
      pessimistic: 28000 
    },
    { 
      month: isArabic ? 'أغسطس' : 'Aug', 
      actual: null, 
      forecast: 38000, 
      optimistic: 46000, 
      pessimistic: 31000 
    }
  ];

  const scenarios = [
    {
      id: 1,
      name: isArabic ? 'السيناريو المتفائل' : 'Optimistic Scenario',
      description: isArabic ? 'نمو قوي مع تحسينات كبيرة' : 'Strong growth with major improvements',
      probability: 25,
      outcome: '+67%',
      color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      factors: [
        isArabic ? 'إطلاق منتج جديد ناجح' : 'Successful new product launch',
        isArabic ? 'حملة تسويقية فعالة' : 'Effective marketing campaign',
        isArabic ? 'نمو السوق المتسارع' : 'Accelerated market growth'
      ]
    },
    {
      id: 2,
      name: isArabic ? 'السيناريو الواقعي' : 'Realistic Scenario',
      description: isArabic ? 'نمو مستقر ومتوقع' : 'Stable and expected growth',
      probability: 50,
      outcome: '+44%',
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      factors: [
        isArabic ? 'نمو تدريجي مستمر' : 'Consistent gradual growth',
        isArabic ? 'تحسينات تشغيلية' : 'Operational improvements',
        isArabic ? 'استقرار السوق' : 'Market stability'
      ]
    },
    {
      id: 3,
      name: isArabic ? 'السيناريو المتشائم' : 'Pessimistic Scenario',
      description: isArabic ? 'نمو بطيء مع تحديات' : 'Slow growth with challenges',
      probability: 25,
      outcome: '+22%',
      color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      factors: [
        isArabic ? 'تحديات اقتصادية' : 'Economic challenges',
        isArabic ? 'منافسة متزايدة' : 'Increased competition',
        isArabic ? 'تراجع في الطلب' : 'Demand decline'
      ]
    }
  ];

  const kpiForecast = [
    {
      metric: isArabic ? 'الإيرادات' : 'Revenue',
      current: '$18,000',
      forecast: '$30,000',
      growth: '+67%',
      confidence: 78
    },
    {
      metric: isArabic ? 'العملاء الجدد' : 'New Customers',
      current: '1,250',
      forecast: '2,100',
      growth: '+68%',
      confidence: 82
    },
    {
      metric: isArabic ? 'معدل التحويل' : 'Conversion Rate',
      current: '4.1%',
      forecast: '5.8%',
      growth: '+41%',
      confidence: 75
    },
    {
      metric: isArabic ? 'قيمة الطلب المتوسطة' : 'Average Order Value',
      current: '$65',
      forecast: '$78',
      growth: '+20%',
      confidence: 85
    }
  ];

  return (
    <div className="space-y-6">
      {/* Performance Forecast Chart */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Target className="h-5 w-5 text-purple-600" />
            {isArabic ? 'توقعات الأداء المستقبلي' : 'Future Performance Forecast'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="optimistic"
                fill="#82ca9d"
                fillOpacity={0.3}
                stroke="none"
                name={isArabic ? 'متفائل' : 'Optimistic'}
              />
              <Area
                type="monotone"
                dataKey="pessimistic"
                fill="#ffc658"
                fillOpacity={0.3}
                stroke="none"
                name={isArabic ? 'متشائم' : 'Pessimistic'}
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#8884d8"
                strokeWidth={3}
                name={isArabic ? 'الفعلي' : 'Actual'}
              />
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#82ca9d"
                strokeWidth={2}
                strokeDasharray="5 5"
                name={isArabic ? 'المتوقع' : 'Forecast'}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Scenario Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Calendar className="h-5 w-5 text-blue-600" />
            {isArabic ? 'تحليل السيناريوهات' : 'Scenario Analysis'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {scenarios.map((scenario) => (
              <div key={scenario.id} className="border rounded-lg p-4">
                <div className={`flex items-center justify-between mb-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {scenario.name}
                  </h4>
                  <Badge className={`text-xs ${scenario.color}`}>
                    {scenario.probability}%
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {scenario.description}
                </p>
                
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {scenario.outcome}
                  </div>
                  <div className="text-xs text-gray-500">
                    {isArabic ? 'نمو متوقع' : 'Expected Growth'}
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    {isArabic ? 'العوامل الرئيسية:' : 'Key Factors:'}
                  </h5>
                  <ul className="space-y-1">
                    {scenario.factors.map((factor, index) => (
                      <li key={index} className="text-xs text-gray-600 flex items-center gap-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full" />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* KPI Forecasts */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <TrendingUp className="h-5 w-5 text-green-600" />
            {isArabic ? 'توقعات المؤشرات الرئيسية' : 'Key Performance Indicators Forecast'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {kpiForecast.map((kpi, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className={`flex items-center justify-between mb-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {kpi.metric}
                  </h4>
                  <Badge variant="secondary" className="text-xs">
                    {isArabic ? 'ثقة' : 'Confidence'} {kpi.confidence}%
                  </Badge>
                </div>
                
                <div className={`grid grid-cols-2 gap-4 ${isArabic ? 'text-right' : 'text-left'}`}>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">
                      {isArabic ? 'الحالي' : 'Current'}
                    </div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      {kpi.current}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">
                      {isArabic ? 'المتوقع' : 'Forecast'}
                    </div>
                    <div className="text-lg font-semibold text-green-600">
                      {kpi.forecast}
                    </div>
                  </div>
                </div>
                
                <div className={`flex items-center justify-between mt-3 pt-3 border-t ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span className="text-sm text-gray-600">
                    {isArabic ? 'النمو المتوقع:' : 'Expected Growth:'}
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    {kpi.growth}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Forecast Accuracy & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Zap className="h-5 w-5 text-yellow-600" />
              {isArabic ? 'دقة التوقعات' : 'Forecast Accuracy'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span className="text-sm text-gray-600">
                  {isArabic ? 'دقة النموذج الحالي:' : 'Current Model Accuracy:'}
                </span>
                <Badge className="bg-green-100 text-green-800">87%</Badge>
              </div>
              
              <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span className="text-sm text-gray-600">
                  {isArabic ? 'فترة التوقع:' : 'Forecast Period:'}
                </span>
                <span className="text-sm font-medium">6 {isArabic ? 'أشهر' : 'months'}</span>
              </div>
              
              <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span className="text-sm text-gray-600">
                  {isArabic ? 'آخر تحديث:' : 'Last Updated:'}
                </span>
                <span className="text-sm font-medium">
                  {isArabic ? 'منذ ساعتين' : '2 hours ago'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {isArabic ? 'توصيات لتحسين الأداء' : 'Performance Improvement Recommendations'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-4 w-4 text-green-600 mt-1" />
                <div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                    {isArabic ? 'زيادة الاستثمار في التسويق' : 'Increase Marketing Investment'}
                  </h5>
                  <p className="text-xs text-gray-600">
                    {isArabic ? 'زيادة بنسبة 15% لتحقيق النمو المستهدف' : '15% increase to achieve target growth'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Target className="h-4 w-4 text-blue-600 mt-1" />
                <div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                    {isArabic ? 'تحسين معدل التحويل' : 'Optimize Conversion Rate'}
                  </h5>
                  <p className="text-xs text-gray-600">
                    {isArabic ? 'تطوير صفحات الهبوط وتجربة المستخدم' : 'Improve landing pages and user experience'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Zap className="h-4 w-4 text-purple-600 mt-1" />
                <div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                    {isArabic ? 'تنويع قنوات الإيرادات' : 'Diversify Revenue Channels'}
                  </h5>
                  <p className="text-xs text-gray-600">
                    {isArabic ? 'استكشاف مصادر دخل جديدة لتقليل المخاطر' : 'Explore new revenue sources to reduce risk'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceForecast;
