
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, TrendingUp, AlertTriangle, Target, Users, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const CompetitorAnalysisTab: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const competitorData = [
    { 
      name: 'Competitor A', 
      marketShare: 35, 
      sentiment: 72, 
      mentions: 1250, 
      engagement: 4.2,
      trend: 'up'
    },
    { 
      name: isArabic ? 'شركتنا' : 'Our Company', 
      marketShare: 28, 
      sentiment: 78, 
      mentions: 980, 
      engagement: 4.6,
      trend: 'up'
    },
    { 
      name: 'Competitor B', 
      marketShare: 22, 
      sentiment: 65, 
      mentions: 850, 
      engagement: 3.8,
      trend: 'down'
    },
    { 
      name: 'Competitor C', 
      marketShare: 15, 
      sentiment: 70, 
      mentions: 720, 
      engagement: 4.0,
      trend: 'stable'
    }
  ];

  const sentimentComparison = [
    { 
      competitor: 'Competitor A', 
      positive: 72, 
      neutral: 20, 
      negative: 8 
    },
    { 
      competitor: isArabic ? 'شركتنا' : 'Our Company', 
      positive: 78, 
      neutral: 18, 
      negative: 4 
    },
    { 
      competitor: 'Competitor B', 
      positive: 65, 
      neutral: 25, 
      negative: 10 
    },
    { 
      competitor: 'Competitor C', 
      positive: 70, 
      neutral: 22, 
      negative: 8 
    }
  ];

  const radarData = [
    {
      subject: isArabic ? 'جودة المنتج' : 'Product Quality',
      'Our Company': 90,
      'Competitor A': 85,
      'Competitor B': 75,
      fullMark: 100
    },
    {
      subject: isArabic ? 'خدمة العملاء' : 'Customer Service',
      'Our Company': 85,
      'Competitor A': 78,
      'Competitor B': 70,
      fullMark: 100
    },
    {
      subject: isArabic ? 'التسعير' : 'Pricing',
      'Our Company': 75,
      'Competitor A': 90,
      'Competitor B': 85,
      fullMark: 100
    },
    {
      subject: isArabic ? 'الابتكار' : 'Innovation',
      'Our Company': 95,
      'Competitor A': 80,
      'Competitor B': 65,
      fullMark: 100
    },
    {
      subject: isArabic ? 'الوصول للسوق' : 'Market Reach',
      'Our Company': 70,
      'Competitor A': 95,
      'Competitor B': 80,
      fullMark: 100
    }
  ];

  const competitorAlerts = [
    {
      type: 'new_product',
      competitor: 'Competitor A',
      message: isArabic ? 'أطلق منتج جديد في فئة التكنولوجيا' : 'Launched new product in tech category',
      severity: 'high',
      date: '2024-01-15'
    },
    {
      type: 'price_change',
      competitor: 'Competitor B',
      message: isArabic ? 'خفض الأسعار بنسبة 15%' : 'Reduced prices by 15%',
      severity: 'medium',
      date: '2024-01-10'
    },
    {
      type: 'marketing_campaign',
      competitor: 'Competitor C',
      message: isArabic ? 'بدأ حملة تسويقية جديدة' : 'Started new marketing campaign',
      severity: 'low',
      date: '2024-01-08'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200';
      case 'medium':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200';
      case 'low':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'medium':
        return <TrendingUp className="h-4 w-4 text-yellow-600" />;
      case 'low':
        return <Activity className="h-4 w-4 text-blue-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className={`p-6 h-full overflow-y-auto ${isArabic ? 'rtl' : ''}`}>
      <div className="space-y-6">
        {/* Competitor Monitoring Overview */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
              <Eye className="h-5 w-5" />
              {isArabic ? 'مراقبة المنافسين من Brandwatch' : 'Competitor Monitoring from Brandwatch'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {competitorData.map((competitor, index) => (
                <div key={index} className={`p-4 border rounded-lg ${competitor.name.includes(isArabic ? 'شركتنا' : 'Our Company') ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                  <div className={`flex items-center justify-between mb-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                    <h3 className="font-semibold">{competitor.name}</h3>
                    <Badge variant={competitor.trend === 'up' ? 'default' : competitor.trend === 'down' ? 'destructive' : 'secondary'}>
                      {competitor.trend === 'up' ? '↗' : competitor.trend === 'down' ? '↘' : '→'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span className="text-sm text-gray-600">{isArabic ? 'حصة السوق:' : 'Market Share:'}</span>
                      <span className="font-semibold">{competitor.marketShare}%</span>
                    </div>
                    <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span className="text-sm text-gray-600">{isArabic ? 'المشاعر:' : 'Sentiment:'}</span>
                      <span className="font-semibold">{competitor.sentiment}%</span>
                    </div>
                    <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span className="text-sm text-gray-600">{isArabic ? 'الإشارات:' : 'Mentions:'}</span>
                      <span className="font-semibold">{competitor.mentions}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sentiment Analysis Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'تحليل المشاعر مقارنة بالمنافسين' : 'Sentiment Analysis vs Competitors'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sentimentComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="competitor" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="positive" stackId="a" fill="#10B981" name={isArabic ? 'إيجابي' : 'Positive'} />
                  <Bar dataKey="neutral" stackId="a" fill="#F59E0B" name={isArabic ? 'محايد' : 'Neutral'} />
                  <Bar dataKey="negative" stackId="a" fill="#EF4444" name={isArabic ? 'سلبي' : 'Negative'} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Competitive Positioning Radar */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'تحليل الموقع التنافسي' : 'Competitive Positioning Analysis'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Our Company" dataKey="Our Company" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.2} />
                  <Radar name="Competitor A" dataKey="Competitor A" stroke="#EF4444" fill="#EF4444" fillOpacity={0.2} />
                  <Radar name="Competitor B" dataKey="Competitor B" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.2} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Competitor Movement Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
              <AlertTriangle className="h-5 w-5" />
              {isArabic ? 'تنبيهات حول تحركات المنافسين' : 'Competitor Movement Alerts'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {competitorAlerts.map((alert, index) => (
                <div key={index} className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)} ${isArabic ? 'text-right' : 'text-left'}`}>
                  <div className={`flex items-center justify-between mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      {getSeverityIcon(alert.severity)}
                      <span className="font-semibold">{alert.competitor}</span>
                    </div>
                    <Badge variant="outline">
                      {new Date(alert.date).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
                    </Badge>
                  </div>
                  <p className="text-sm">{alert.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Intelligence Summary */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
              <Target className="h-5 w-5" />
              {isArabic ? 'ملخص الذكاء التنافسي' : 'Competitive Intelligence Summary'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-4 bg-green-50 dark:bg-green-900/20 rounded-lg ${isArabic ? 'text-right' : 'text-left'}`}>
                <h4 className="font-semibold mb-2 text-green-800">
                  {isArabic ? 'نقاط القوة' : 'Our Strengths'}
                </h4>
                <ul className="text-sm space-y-1">
                  <li>• {isArabic ? 'أعلى معدل مشاعر إيجابية' : 'Highest positive sentiment'}</li>
                  <li>• {isArabic ? 'قيادة في الابتكار' : 'Innovation leadership'}</li>
                  <li>• {isArabic ? 'جودة خدمة العملاء' : 'Superior customer service'}</li>
                </ul>
              </div>
              
              <div className={`p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg ${isArabic ? 'text-right' : 'text-left'}`}>
                <h4 className="font-semibold mb-2 text-yellow-800">
                  {isArabic ? 'فرص التحسين' : 'Improvement Opportunities'}
                </h4>
                <ul className="text-sm space-y-1">
                  <li>• {isArabic ? 'توسيع الوصول للسوق' : 'Expand market reach'}</li>
                  <li>• {isArabic ? 'تحسين استراتيجية التسعير' : 'Optimize pricing strategy'}</li>
                  <li>• {isArabic ? 'زيادة الإشارات الإعلامية' : 'Increase media mentions'}</li>
                </ul>
              </div>
              
              <div className={`p-4 bg-red-50 dark:bg-red-900/20 rounded-lg ${isArabic ? 'text-right' : 'text-left'}`}>
                <h4 className="font-semibold mb-2 text-red-800">
                  {isArabic ? 'تهديدات تنافسية' : 'Competitive Threats'}
                </h4>
                <ul className="text-sm space-y-1">
                  <li>• {isArabic ? 'إطلاقات منتجات جديدة' : 'New product launches'}</li>
                  <li>• {isArabic ? 'حروب الأسعار' : 'Price wars'}</li>
                  <li>• {isArabic ? 'تغيرات في السوق' : 'Market shifts'}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompetitorAnalysisTab;
