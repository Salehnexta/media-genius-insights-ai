
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Target, Calendar, AlertTriangle } from 'lucide-react';

interface PredictiveAnalyticsProps {
  refreshing?: boolean;
}

const PredictiveAnalytics: React.FC<PredictiveAnalyticsProps> = ({ refreshing }) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const revenueData = [
    { month: isArabic ? 'يناير' : 'Jan', actual: 12000, predicted: 12500, confidence: 95 },
    { month: isArabic ? 'فبراير' : 'Feb', actual: 15000, predicted: 14800, confidence: 92 },
    { month: isArabic ? 'مارس' : 'Mar', actual: 18000, predicted: 17200, confidence: 88 },
    { month: isArabic ? 'أبريل' : 'Apr', actual: null, predicted: 21000, confidence: 85 },
    { month: isArabic ? 'مايو' : 'May', actual: null, predicted: 24500, confidence: 82 },
    { month: isArabic ? 'يونيو' : 'Jun', actual: null, predicted: 28000, confidence: 78 }
  ];

  const conversionData = [
    { week: 'W1', actual: 3.2, predicted: 3.5 },
    { week: 'W2', actual: 3.8, predicted: 3.9 },
    { week: 'W3', actual: 4.1, predicted: 4.2 },
    { week: 'W4', actual: null, predicted: 4.8 },
    { week: 'W5', actual: null, predicted: 5.2 },
    { week: 'W6', actual: null, predicted: 5.7 }
  ];

  const predictions = [
    {
      id: 1,
      title: isArabic ? 'نمو الإيرادات المتوقع' : 'Expected Revenue Growth',
      prediction: '+45%',
      timeframe: isArabic ? 'خلال 6 أشهر' : 'in 6 months',
      confidence: 85,
      impact: 'high',
      factors: [
        isArabic ? 'زيادة حركة المرور' : 'Increased traffic',
        isArabic ? 'تحسين التحويل' : 'Better conversion',
        isArabic ? 'نمو السوق' : 'Market growth'
      ]
    },
    {
      id: 2,
      title: isArabic ? 'معدل التحويل المتوقع' : 'Predicted Conversion Rate',
      prediction: '5.7%',
      timeframe: isArabic ? 'بحلول الشهر القادم' : 'by next month',
      confidence: 78,
      impact: 'medium',
      factors: [
        isArabic ? 'تحسين UX' : 'UX improvements',
        isArabic ? 'حملات مستهدفة' : 'Targeted campaigns',
        isArabic ? 'تحسين المحتوى' : 'Content optimization'
      ]
    },
    {
      id: 3,
      title: isArabic ? 'نمو الجمهور المتوقع' : 'Predicted Audience Growth',
      prediction: '+120%',
      timeframe: isArabic ? 'في الربع القادم' : 'next quarter',
      confidence: 72,
      impact: 'high',
      factors: [
        isArabic ? 'الاتجاهات الموسمية' : 'Seasonal trends',
        isArabic ? 'حملات التسويق' : 'Marketing campaigns',
        isArabic ? 'الإحالات' : 'Referrals'
      ]
    }
  ];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    if (confidence >= 60) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'medium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'low': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Revenue Prediction Chart */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <TrendingUp className="h-5 w-5 text-blue-600" />
            {isArabic ? 'توقعات الإيرادات' : 'Revenue Predictions'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="actual"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
                name={isArabic ? 'الفعلي' : 'Actual'}
              />
              <Area
                type="monotone"
                dataKey="predicted"
                stackId="2"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.6}
                name={isArabic ? 'المتوقع' : 'Predicted'}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Conversion Rate Prediction */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Target className="h-5 w-5 text-green-600" />
            {isArabic ? 'توقعات معدل التحويل' : 'Conversion Rate Predictions'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#8884d8"
                strokeWidth={2}
                name={isArabic ? 'الفعلي' : 'Actual'}
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#82ca9d"
                strokeWidth={2}
                strokeDasharray="5 5"
                name={isArabic ? 'المتوقع' : 'Predicted'}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Prediction Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {predictions.map((prediction) => (
          <Card key={prediction.id} className="h-full">
            <CardHeader className="pb-3">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <CardTitle className="text-lg">{prediction.title}</CardTitle>
                <Badge className={`text-xs ${getImpactColor(prediction.impact)}`}>
                  {prediction.impact}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {prediction.prediction}
                </div>
                <div className="text-sm text-gray-600">
                  {prediction.timeframe}
                </div>
              </div>

              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span className="text-sm text-gray-600">
                  {isArabic ? 'مستوى الثقة:' : 'Confidence:'}
                </span>
                <Badge className={`text-xs ${getConfidenceColor(prediction.confidence)}`}>
                  {prediction.confidence}%
                </Badge>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  {isArabic ? 'العوامل المؤثرة:' : 'Key Factors:'}
                </h4>
                <ul className="space-y-1">
                  {prediction.factors.map((factor, index) => (
                    <li key={index} className="text-xs text-gray-600 flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-600 rounded-full" />
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant="outline" size="sm" className="w-full">
                {isArabic ? 'عرض التفاصيل' : 'View Details'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Risk Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            {isArabic ? 'تحذيرات المخاطر' : 'Risk Alerts'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/10 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-orange-800 dark:text-orange-400">
                  {isArabic ? 'انخفاض متوقع في الحركة الموسمية' : 'Expected seasonal traffic decline'}
                </p>
                <p className="text-xs text-orange-600">
                  {isArabic ? 'احتمالية 68% لانخفاض 15% في الحركة خلال الشهرين القادمين' : '68% probability of 15% traffic decline in next 2 months'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg">
              <Calendar className="h-4 w-4 text-yellow-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
                  {isArabic ? 'تقلبات في معدل التحويل' : 'Conversion rate volatility'}
                </p>
                <p className="text-xs text-yellow-600">
                  {isArabic ? 'توقع تقلبات بنسبة ±0.5% في معدل التحويل' : 'Expect ±0.5% volatility in conversion rates'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictiveAnalytics;
