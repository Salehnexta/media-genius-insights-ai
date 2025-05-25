
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#10B981', '#3B82F6', '#EF4444', '#F59E0B', '#6366F1', '#06B6D4'];

const MarketingManagerTab: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  // Mock data for customer words (with both English and Arabic examples)
  const customerWordsData = isArabic ? [
    { text: 'ممتاز', value: 85 },
    { text: 'جودة', value: 72 },
    { text: 'خدمة', value: 68 },
    { text: 'سريع', value: 65 },
    { text: 'موصى', value: 58 },
    { text: 'احترافي', value: 55 },
    { text: 'دعم', value: 52 },
    { text: 'فعال', value: 48 },
    { text: 'مفيد', value: 45 },
    { text: 'رائع', value: 42 },
    { text: 'سهل', value: 38 },
    { text: 'موثوق', value: 35 },
    { text: 'نظيف', value: 32 },
    { text: 'أنيق', value: 28 },
    { text: 'مبتكر', value: 25 }
  ] : [
    { text: 'excellent', value: 85 },
    { text: 'quality', value: 72 },
    { text: 'service', value: 68 },
    { text: 'fast', value: 65 },
    { text: 'recommended', value: 58 },
    { text: 'professional', value: 55 },
    { text: 'support', value: 52 },
    { text: 'efficient', value: 48 },
    { text: 'helpful', value: 45 },
    { text: 'amazing', value: 42 },
    { text: 'easy', value: 38 },
    { text: 'reliable', value: 35 },
    { text: 'clean', value: 32 },
    { text: 'elegant', value: 28 },
    { text: 'innovative', value: 25 }
  ];

  // Mock data for customer sentiment
  const sentimentData = [
    { 
      name: isArabic ? 'إيجابي' : 'Positive', 
      value: 65, 
      fill: '#10B981',
      count: 1250 
    },
    { 
      name: isArabic ? 'محايد' : 'Neutral', 
      value: 25, 
      fill: '#F59E0B',
      count: 480 
    },
    { 
      name: isArabic ? 'سلبي' : 'Negative', 
      value: 10, 
      fill: '#EF4444',
      count: 190 
    }
  ];

  // Mock data for key performance indicators (KPIs)
  const kpiData = [
    { 
      name: isArabic ? 'الإيرادات' : 'Revenue', 
      value: 125000, 
      prefix: '$', 
      suffix: 'K', 
      change: 12, 
      isPositive: true 
    },
    { 
      name: isArabic ? 'العملاء الجدد' : 'New Customers', 
      value: 450, 
      prefix: '', 
      suffix: '', 
      change: 8, 
      isPositive: true 
    },
    { 
      name: isArabic ? 'معدل التحويل' : 'Conversion Rate', 
      value: 3.2, 
      prefix: '', 
      suffix: '%', 
      change: 2, 
      isPositive: false 
    }
  ];

  // Mock data for budget distribution
  const budgetData = [
    { name: isArabic ? 'إعلانات السوشيال ميديا' : 'Social Media Ads', value: 40 },
    { name: isArabic ? 'إعلانات محركات البحث' : 'Search Engine Ads', value: 30 },
    { name: isArabic ? 'التسويق بالمحتوى' : 'Content Marketing', value: 20 },
    { name: isArabic ? 'التسويق بالبريد الإلكتروني' : 'Email Marketing', value: 10 }
  ];

  // Mock data for return on investment (ROI)
  const roiData = [
    { name: isArabic ? 'يناير' : 'Jan', ROI: 2.1 },
    { name: isArabic ? 'فبراير' : 'Feb', ROI: 2.5 },
    { name: isArabic ? 'مارس' : 'Mar', ROI: 2.3 },
    { name: isArabic ? 'أبريل' : 'Apr', ROI: 2.8 },
    { name: isArabic ? 'مايو' : 'May', ROI: 2.6 },
    { name: isArabic ? 'يونيو' : 'Jun', ROI: 2.9 }
  ];

  // Mock data for share of voice vs competitors
  const shareOfVoiceData = [
    { name: isArabic ? 'نحن' : 'We', percentage: 45 },
    { name: isArabic ? 'المنافس 1' : 'Competitor 1', percentage: 25 },
    { name: isArabic ? 'المنافس 2' : 'Competitor 2', percentage: 15 },
    { name: isArabic ? 'المنافس 3' : 'Competitor 3', percentage: 10 }
  ];

  // Mock data for competitor comparison
  const competitorData = [
    { 
      name: isArabic ? 'نحن' : 'We', 
      reach: 150000, 
      engagement: 4.5, 
      sentiment: 0.85 
    },
    { 
      name: isArabic ? 'المنافس 1' : 'Competitor 1', 
      reach: 130000, 
      engagement: 4.2, 
      sentiment: 0.78 
    },
    { 
      name: isArabic ? 'المنافس 2' : 'Competitor 2', 
      reach: 110000, 
      engagement: 3.9, 
      sentiment: 0.82 
    }
  ];

  return (
    <div className={`p-4 lg:p-6 space-y-6 max-w-full overflow-x-hidden ${isArabic ? 'rtl' : ''}`}>
      {/* Header Section */}
      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${isArabic ? 'text-right' : 'text-left'}`}>
        <h2 className={`text-xl lg:text-2xl font-bold ${isArabic ? 'font-arabic' : ''}`}>
          {isArabic ? 'نظرة عامة على أداء التسويق' : 'Marketing Performance Overview'}
        </h2>
        <div className={`flex gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">
            {isArabic ? 'تحديث البيانات' : 'Update Data'}
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded text-sm">
            {isArabic ? 'تصدير التقرير' : 'Export Report'}
          </button>
        </div>
      </div>

      {/* Enhanced Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
        {/* Left Column - KPIs and Budget */}
        <div className="lg:col-span-4 space-y-4">
          {/* Key Performance Indicators (KPIs) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {kpiData.map((kpi, index) => (
              <Card key={index} className="min-h-[120px]">
                <CardHeader className="pb-2">
                  <CardTitle className={`text-sm lg:text-base ${isArabic ? 'text-right font-arabic' : ''}`}>
                    {kpi.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className={`text-lg lg:text-2xl font-bold ${isArabic ? 'font-arabic' : ''}`}>
                      {kpi.prefix}{kpi.value.toLocaleString()}{kpi.suffix}
                    </div>
                    <div className={`text-xs lg:text-sm ${kpi.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                      {kpi.isPositive ? '+' : '-'}
                      {kpi.change}%
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Budget Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle className={`text-sm lg:text-base ${isArabic ? 'text-right font-arabic' : ''}`}>
                {isArabic ? 'توزيع الميزانية حسب القنوات' : 'Budget Distribution by Channels'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 lg:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budgetData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={false}
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {budgetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, isArabic ? 'الميزانية' : 'Budget']}
                      labelStyle={{ direction: isArabic ? 'rtl' : 'ltr', fontSize: '12px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center Column - Customer Words Cloud */}
        <div className="lg:col-span-4 space-y-4">
          {/* Customer Words Cloud */}
          <Card>
            <CardHeader>
              <CardTitle className={`text-sm lg:text-base ${isArabic ? 'text-right font-arabic' : ''}`}>
                {isArabic ? 'الكلمات الأكثر ذكراً من العملاء' : 'Most Mentioned Customer Words'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 lg:h-80 flex flex-wrap items-center justify-center p-2 lg:p-4 overflow-hidden">
                {customerWordsData.map((word, index) => {
                  const fontSize = Math.max(10, Math.min(24, word.value / 4));
                  const opacity = Math.max(0.4, word.value / 100);
                  return (
                    <span
                      key={index}
                      className={`inline-block m-1 font-semibold cursor-pointer hover:scale-110 transition-transform ${isArabic ? 'font-arabic' : ''}`}
                      style={{
                        fontSize: `${fontSize}px`,
                        color: COLORS[index % COLORS.length],
                        opacity: opacity
                      }}
                      title={`${isArabic ? 'ذُكرت' : 'Mentioned'} ${word.value} ${isArabic ? 'مرة' : 'times'}`}
                    >
                      {word.text}
                    </span>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Customer Sentiment Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className={`text-sm lg:text-base ${isArabic ? 'text-right font-arabic' : ''}`}>
                {isArabic ? 'تحليل مشاعر العملاء' : 'Customer Sentiment Analysis'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 lg:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={false}
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name, props) => [
                        `${value}% (${props.payload.count} ${isArabic ? 'تعليق' : 'comments'})`, 
                        isArabic ? 'المشاعر' : 'Sentiment'
                      ]}
                      labelStyle={{ direction: isArabic ? 'rtl' : 'ltr', fontSize: '12px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Sentiment Summary */}
              <div className={`mt-4 space-y-2 ${isArabic ? 'text-right' : ''}`}>
                {sentimentData.map((item, index) => (
                  <div key={index} className={`flex items-center justify-between p-2 rounded text-xs lg:text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.fill }}
                      />
                      <span className={`font-medium ${isArabic ? 'font-arabic' : ''}`}>{item.name}</span>
                    </div>
                    <span className={`text-gray-600 ${isArabic ? 'font-arabic' : ''}`}>
                      {item.count} {isArabic ? 'تعليق' : 'comments'}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - ROI and Performance */}
        <div className="lg:col-span-4 space-y-4">
          {/* Return on Investment (ROI) Chart */}
          <Card>
            <CardHeader>
              <CardTitle className={`text-sm lg:text-base ${isArabic ? 'text-right font-arabic' : ''}`}>
                {isArabic ? 'عائد الاستثمار الشهري' : 'Monthly Return on Investment'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 lg:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={roiData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 10 }}
                      interval={0}
                      angle={isArabic ? 45 : -45}
                      textAnchor={isArabic ? 'start' : 'end'}
                      height={60}
                    />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip 
                      formatter={(value) => [`${value}`, isArabic ? 'عائد الاستثمار' : 'ROI']}
                      labelStyle={{ direction: isArabic ? 'rtl' : 'ltr', fontSize: '12px' }}
                    />
                    <Bar dataKey="ROI" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Share of Voice Chart */}
          <Card>
            <CardHeader>
              <CardTitle className={`text-sm lg:text-base ${isArabic ? 'text-right font-arabic' : ''}`}>
                {isArabic ? 'حصة الصوت مقابل المنافسين' : 'Share of Voice vs Competitors'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 lg:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={shareOfVoiceData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 10 }}
                      interval={0}
                      angle={isArabic ? 45 : -45}
                      textAnchor={isArabic ? 'start' : 'end'}
                      height={60}
                    />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, isArabic ? 'حصة الصوت' : 'Share of Voice']}
                      labelStyle={{ direction: isArabic ? 'rtl' : 'ltr', fontSize: '12px' }}
                    />
                    <Bar dataKey="percentage" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Competitor Comparison Section */}
      <Card>
        <CardHeader>
          <CardTitle className={`text-sm lg:text-base ${isArabic ? 'text-right font-arabic' : ''}`}>
            {isArabic ? 'مقارنة الأداء مع المنافسين' : 'Performance Comparison with Competitors'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className={`px-3 lg:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${isArabic ? 'text-right font-arabic' : 'text-left'}`}>
                    {isArabic ? 'المنافس' : 'Competitor'}
                  </th>
                  <th className={`px-3 lg:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${isArabic ? 'text-right font-arabic' : 'text-left'}`}>
                    {isArabic ? 'الوصول' : 'Reach'}
                  </th>
                  <th className={`px-3 lg:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${isArabic ? 'text-right font-arabic' : 'text-left'}`}>
                    {isArabic ? 'التفاعل' : 'Engagement'}
                  </th>
                  <th className={`px-3 lg:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${isArabic ? 'text-right font-arabic' : 'text-left'}`}>
                    {isArabic ? 'المشاعر' : 'Sentiment'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {competitorData.map((competitor, index) => (
                  <tr key={index}>
                    <td className={`px-3 lg:px-6 py-4 whitespace-nowrap text-sm ${isArabic ? 'font-arabic text-right' : 'text-left'}`}>
                      {competitor.name}
                    </td>
                    <td className={`px-3 lg:px-6 py-4 whitespace-nowrap text-sm ${isArabic ? 'font-arabic text-right' : 'text-left'}`}>
                      {competitor.reach.toLocaleString()}
                    </td>
                    <td className={`px-3 lg:px-6 py-4 whitespace-nowrap text-sm ${isArabic ? 'font-arabic text-right' : 'text-left'}`}>
                      {competitor.engagement}
                    </td>
                    <td className={`px-3 lg:px-6 py-4 whitespace-nowrap text-sm ${isArabic ? 'font-arabic text-right' : 'text-left'}`}>
                      {competitor.sentiment}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingManagerTab;
