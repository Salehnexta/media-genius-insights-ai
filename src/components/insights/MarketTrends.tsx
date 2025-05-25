
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Eye, Search, Globe } from 'lucide-react';

interface MarketTrendsProps {
  refreshing?: boolean;
}

const MarketTrends: React.FC<MarketTrendsProps> = ({ refreshing }) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const trendData = [
    { month: isArabic ? 'يناير' : 'Jan', aiTools: 85, digitalMarketing: 78, ecommerce: 92 },
    { month: isArabic ? 'فبراير' : 'Feb', aiTools: 88, digitalMarketing: 82, ecommerce: 89 },
    { month: isArabic ? 'مارس' : 'Mar', aiTools: 92, digitalMarketing: 85, ecommerce: 95 },
    { month: isArabic ? 'أبريل' : 'Apr', aiTools: 96, digitalMarketing: 88, ecommerce: 91 },
    { month: isArabic ? 'مايو' : 'May', aiTools: 98, digitalMarketing: 90, ecommerce: 94 },
    { month: isArabic ? 'يونيو' : 'Jun', aiTools: 100, digitalMarketing: 93, ecommerce: 97 }
  ];

  const trends = [
    {
      id: 1,
      title: isArabic ? 'ازدهار أدوات الذكاء الاصطناعي' : 'AI Tools Boom',
      description: isArabic ? 'نمو هائل في استخدام أدوات الذكاء الاصطناعي في التسويق' : 'Massive growth in AI tool adoption for marketing',
      growth: '+156%',
      impact: 'high',
      icon: TrendingUp,
      color: 'text-green-600',
      category: isArabic ? 'تكنولوجيا' : 'Technology'
    },
    {
      id: 2,
      title: isArabic ? 'التسويق بالفيديو القصير' : 'Short-form Video Marketing',
      description: isArabic ? 'المحتوى المرئي القصير يهيمن على منصات التواصل' : 'Short-form video content dominates social platforms',
      growth: '+89%',
      impact: 'high',
      icon: Eye,
      color: 'text-blue-600',
      category: isArabic ? 'محتوى' : 'Content'
    },
    {
      id: 3,
      title: isArabic ? 'البحث الصوتي' : 'Voice Search Optimization',
      description: isArabic ? 'تزايد عمليات البحث الصوتي وتأثيرها على السيو' : 'Rising voice searches impacting SEO strategies',
      growth: '+67%',
      impact: 'medium',
      icon: Search,
      color: 'text-purple-600',
      category: isArabic ? 'سيو' : 'SEO'
    },
    {
      id: 4,
      title: isArabic ? 'التجارة الاجتماعية' : 'Social Commerce',
      description: isArabic ? 'دمج التسوق مع منصات التواصل الاجتماعي' : 'Integration of shopping with social media platforms',
      growth: '+124%',
      impact: 'high',
      icon: Globe,
      color: 'text-orange-600',
      category: isArabic ? 'تجارة إلكترونية' : 'E-commerce'
    },
    {
      id: 5,
      title: isArabic ? 'التخصيص المدعوم بالذكاء الاصطناعي' : 'AI-Powered Personalization',
      description: isArabic ? 'تخصيص تجربة العملاء باستخدام الذكاء الاصطناعي' : 'AI-driven customer experience personalization',
      growth: '+78%',
      impact: 'medium',
      icon: TrendingUp,
      color: 'text-indigo-600',
      category: isArabic ? 'تخصيص' : 'Personalization'
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
      {/* Market Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <TrendingUp className="h-5 w-5 text-green-600" />
            {isArabic ? 'اتجاهات السوق الرئيسية' : 'Key Market Trends'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="aiTools"
                stroke="#8884d8"
                strokeWidth={2}
                name={isArabic ? 'أدوات الذكاء الاصطناعي' : 'AI Tools'}
              />
              <Line
                type="monotone"
                dataKey="digitalMarketing"
                stroke="#82ca9d"
                strokeWidth={2}
                name={isArabic ? 'التسويق الرقمي' : 'Digital Marketing'}
              />
              <Line
                type="monotone"
                dataKey="ecommerce"
                stroke="#ffc658"
                strokeWidth={2}
                name={isArabic ? 'التجارة الإلكترونية' : 'E-commerce'}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card>
        <CardHeader>
          <CardTitle>
            {isArabic ? 'المواضيع الرائجة' : 'Trending Topics'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {trends.map((trend) => (
              <div key={trend.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className={`flex items-start gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className="flex-shrink-0">
                    <trend.icon className={`h-6 w-6 ${trend.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`flex items-center justify-between mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {trend.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {trend.category}
                        </Badge>
                        <Badge className={`text-xs ${getImpactColor(trend.impact)}`}>
                          {trend.impact}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {trend.description}
                    </p>
                    <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span className="text-lg font-semibold text-green-600">
                        {trend.growth}
                      </span>
                      <span className="text-xs text-gray-500">
                        {isArabic ? 'خلال 6 أشهر' : 'over 6 months'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Industry Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>
              {isArabic ? 'رؤى الصناعة' : 'Industry Insights'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                <h5 className="font-medium text-blue-800 dark:text-blue-400 mb-2">
                  {isArabic ? 'الذكاء الاصطناعي في التسويق' : 'AI in Marketing'}
                </h5>
                <p className="text-sm text-blue-700 dark:text-blue-500 mb-2">
                  {isArabic ? '73% من الشركات تستخدم الآن أدوات الذكاء الاصطناعي' : '73% of companies now use AI tools'}
                </p>
                <div className="text-xs text-blue-600">
                  {isArabic ? 'المصدر: تقرير التسويق الرقمي 2024' : 'Source: Digital Marketing Report 2024'}
                </div>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg">
                <h5 className="font-medium text-green-800 dark:text-green-400 mb-2">
                  {isArabic ? 'نمو التجارة الإلكترونية' : 'E-commerce Growth'}
                </h5>
                <p className="text-sm text-green-700 dark:text-green-500 mb-2">
                  {isArabic ? 'نمو بنسبة 15.6% في مبيعات التجارة الإلكترونية' : '15.6% growth in e-commerce sales'}
                </p>
                <div className="text-xs text-green-600">
                  {isArabic ? 'المصدر: إحصائيات التجارة العالمية' : 'Source: Global Commerce Statistics'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {isArabic ? 'توقعات المستقبل' : 'Future Predictions'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-green-600 mt-1" />
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                    {isArabic ? 'نمو التسويق المؤثر' : 'Influencer Marketing Growth'}
                  </h5>
                  <p className="text-sm text-gray-600">
                    {isArabic ? 'متوقع نمو بنسبة 67% خلال العامين القادمين' : 'Expected 67% growth in next 2 years'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Eye className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                    {isArabic ? 'هيمنة المحتوى المرئي' : 'Visual Content Dominance'}
                  </h5>
                  <p className="text-sm text-gray-600">
                    {isArabic ? '85% من المحتوى سيكون مرئي بحلول 2025' : '85% of content will be visual by 2025'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Search className="h-5 w-5 text-purple-600 mt-1" />
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                    {isArabic ? 'تطور البحث الصوتي' : 'Voice Search Evolution'}
                  </h5>
                  <p className="text-sm text-gray-600">
                    {isArabic ? '50% من البحث سيكون صوتي بحلول 2026' : '50% of searches will be voice by 2026'}
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

export default MarketTrends;
