
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, DollarSign, Users, Target, Heart } from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const MarketingManagerTab: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  // Mock data for charts
  const budgetData = [
    { name: isArabic ? 'التسويق الرقمي' : 'Digital Marketing', value: 40, amount: 120000 },
    { name: isArabic ? 'وسائل التواصل' : 'Social Media', value: 25, amount: 75000 },
    { name: isArabic ? 'الإعلانات التقليدية' : 'Traditional Ads', value: 20, amount: 60000 },
    { name: isArabic ? 'التسويق بالمحتوى' : 'Content Marketing', value: 15, amount: 45000 }
  ];

  const roiData = [
    { month: isArabic ? 'يناير' : 'Jan', roi: 15 },
    { month: isArabic ? 'فبراير' : 'Feb', roi: 18 },
    { month: isArabic ? 'مارس' : 'Mar', roi: 22 },
    { month: isArabic ? 'أبريل' : 'Apr', roi: 25 },
    { month: isArabic ? 'مايو' : 'May', roi: 28 },
    { month: isArabic ? 'يونيو' : 'Jun', roi: 32 }
  ];

  const marketShareData = [
    { competitor: isArabic ? 'شركتنا' : 'Our Company', share: 35, sentiment: 85 },
    { competitor: isArabic ? 'المنافس أ' : 'Competitor A', share: 28, sentiment: 65 },
    { competitor: isArabic ? 'المنافس ب' : 'Competitor B', share: 22, sentiment: 70 },
    { competitor: isArabic ? 'المنافس ج' : 'Competitor C', share: 15, sentiment: 55 }
  ];

  const sentimentData = [
    { type: isArabic ? 'إيجابي' : 'Positive', value: 65, color: '#10b981' },
    { type: isArabic ? 'محايد' : 'Neutral', value: 25, color: '#f59e0b' },
    { type: isArabic ? 'سلبي' : 'Negative', value: 10, color: '#ef4444' }
  ];

  const topKeywords = [
    { word: isArabic ? 'جودة عالية' : 'High Quality', frequency: 89 },
    { word: isArabic ? 'خدمة ممتازة' : 'Excellent Service', frequency: 76 },
    { word: isArabic ? 'أسعار مناسبة' : 'Fair Prices', frequency: 65 },
    { word: isArabic ? 'تسليم سريع' : 'Fast Delivery', frequency: 58 },
    { word: isArabic ? 'دعم فني' : 'Technical Support', frequency: 45 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className={`p-6 h-full overflow-y-auto ${isArabic ? 'rtl' : ''}`}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className={`text-2xl font-bold mb-4 ${isArabic ? 'text-right' : 'text-left'}`}>
            {isArabic ? 'لوحة تحكم مدير التسويق' : 'Marketing Manager Dashboard'}
          </h2>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <DollarSign className="h-5 w-5 text-green-600" />
                <Badge variant="secondary">ROI</Badge>
              </div>
              <CardTitle className={`text-sm ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'العائد على الاستثمار' : 'Return on Investment'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">32%</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {isArabic ? '+5% من الشهر الماضي' : '+5% from last month'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Users className="h-5 w-5 text-blue-600" />
                <Badge variant="secondary">CAC</Badge>
              </div>
              <CardTitle className={`text-sm ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'تكلفة اكتساب العملاء' : 'Customer Acquisition Cost'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">$45</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {isArabic ? '-12% من الشهر الماضي' : '-12% from last month'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Target className="h-5 w-5 text-purple-600" />
                <Badge variant="secondary">CVR</Badge>
              </div>
              <CardTitle className={`text-sm ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'معدل التحويل' : 'Conversion Rate'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">8.4%</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {isArabic ? '+2.1% من الشهر الماضي' : '+2.1% from last month'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Heart className="h-5 w-5 text-red-600" />
                <Badge variant="secondary">Sentiment</Badge>
              </div>
              <CardTitle className={`text-sm ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'مؤشر المشاعر العام' : 'Overall Sentiment'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">85%</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {isArabic ? '+8% إيجابية' : '+8% positive'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Budget Distribution Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'توزيع الميزانية حسب القنوات' : 'Budget Distribution by Channels'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* ROI Trend Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'اتجاه العائد على الاستثمار' : 'ROI Trend Over Time'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={roiData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="roi" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Market Share vs Competitors */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'حصة السوق مقابل المنافسين' : 'Market Share vs Competitors'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={marketShareData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="competitor" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="share" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Sentiment Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'تحليل المشاعر العام' : 'Overall Sentiment Analysis'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Keywords Cloud and Campaign Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Keywords */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'الكلمات الأكثر ذكراً من العملاء' : 'Top Customer Keywords'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topKeywords.map((keyword, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <span className="font-medium">{keyword.word}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${keyword.frequency}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{keyword.frequency}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Campaign Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'ملخص أداء الحملات' : 'Campaign Performance Summary'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={`flex justify-between items-center p-3 border rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div>
                    <h4 className="font-semibold">{isArabic ? 'حملة الصيف 2024' : 'Summer Campaign 2024'}</h4>
                    <p className="text-sm text-gray-600">{isArabic ? 'الميزانية: $50,000' : 'Budget: $50,000'}</p>
                  </div>
                  <Badge variant="secondary">ROI: 28%</Badge>
                </div>
                
                <div className={`flex justify-between items-center p-3 border rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div>
                    <h4 className="font-semibold">{isArabic ? 'حملة المنتج الجديد' : 'New Product Launch'}</h4>
                    <p className="text-sm text-gray-600">{isArabic ? 'الميزانية: $75,000' : 'Budget: $75,000'}</p>
                  </div>
                  <Badge variant="secondary">ROI: 35%</Badge>
                </div>
                
                <div className={`flex justify-between items-center p-3 border rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div>
                    <h4 className="font-semibold">{isArabic ? 'حملة العلامة التجارية' : 'Brand Awareness Campaign'}</h4>
                    <p className="text-sm text-gray-600">{isArabic ? 'الميزانية: $30,000' : 'Budget: $30,000'}</p>
                  </div>
                  <Badge variant="secondary">ROI: 22%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MarketingManagerTab;
