
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, DollarSign, Target, Star, Heart, MessageSquare } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const ExecutiveDashboardTab: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const kpiData = [
    { month: isArabic ? 'يناير' : 'Jan', revenue: 120000, customers: 1250, satisfaction: 4.2, engagement: 3.8 },
    { month: isArabic ? 'فبراير' : 'Feb', revenue: 145000, customers: 1380, satisfaction: 4.3, engagement: 4.1 },
    { month: isArabic ? 'مارس' : 'Mar', revenue: 165000, customers: 1520, satisfaction: 4.5, engagement: 4.3 },
    { month: isArabic ? 'أبريل' : 'Apr', revenue: 180000, customers: 1650, satisfaction: 4.4, engagement: 4.2 },
    { month: isArabic ? 'مايو' : 'May', revenue: 195000, customers: 1750, satisfaction: 4.6, engagement: 4.5 },
    { month: isArabic ? 'يونيو' : 'Jun', revenue: 210000, customers: 1820, satisfaction: 4.7, engagement: 4.6 }
  ];

  const socialListeningTrends = [
    { week: 'W1', mentions: 245, sentiment: 75, reach: 125000 },
    { week: 'W2', mentions: 289, sentiment: 72, reach: 145000 },
    { week: 'W3', mentions: 321, sentiment: 78, reach: 167000 },
    { week: 'W4', mentions: 298, sentiment: 80, reach: 189000 }
  ];

  const customerExperience = [
    {
      metric: isArabic ? 'مؤشر رضا العملاء' : 'Customer Satisfaction Index',
      value: '4.6/5',
      change: '+8%',
      trend: 'up'
    },
    {
      metric: isArabic ? 'وقت الاستجابة المتوسط' : 'Average Response Time',
      value: '12m',
      change: '-15%',
      trend: 'down'
    },
    {
      metric: isArabic ? 'معدل الاحتفاظ بالعملاء' : 'Customer Retention Rate',
      value: '89%',
      change: '+3%',
      trend: 'up'
    },
    {
      metric: isArabic ? 'نقاط اللمس الحرجة' : 'Critical Touchpoints',
      value: '7',
      change: '-2',
      trend: 'down'
    }
  ];

  return (
    <div className={`p-6 h-full overflow-y-auto ${isArabic ? 'rtl' : ''}`}>
      <div className="space-y-6">
        {/* Executive KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <CardHeader className="pb-2">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <DollarSign className="h-5 w-5 text-blue-600" />
                <Badge variant="default">+12%</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`${isArabic ? 'text-right' : 'text-left'}`}>
                <div className="text-2xl font-bold text-blue-700">$210K</div>
                <p className="text-sm text-blue-600">
                  {isArabic ? 'الإيرادات الشهرية' : 'Monthly Revenue'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
            <CardHeader className="pb-2">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Users className="h-5 w-5 text-green-600" />
                <Badge variant="default">+8%</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`${isArabic ? 'text-right' : 'text-left'}`}>
                <div className="text-2xl font-bold text-green-700">1,820</div>
                <p className="text-sm text-green-600">
                  {isArabic ? 'عملاء نشطون' : 'Active Customers'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <CardHeader className="pb-2">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Star className="h-5 w-5 text-purple-600" />
                <Badge variant="default">+2%</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`${isArabic ? 'text-right' : 'text-left'}`}>
                <div className="text-2xl font-bold text-purple-700">4.7</div>
                <p className="text-sm text-purple-600">
                  {isArabic ? 'تقييم العملاء' : 'Customer Rating'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
            <CardHeader className="pb-2">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <TrendingUp className="h-5 w-5 text-orange-600" />
                <Badge variant="default">+15%</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`${isArabic ? 'text-right' : 'text-left'}`}>
                <div className="text-2xl font-bold text-orange-700">4.6</div>
                <p className="text-sm text-orange-600">
                  {isArabic ? 'مؤشر المشاركة' : 'Engagement Index'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? 'مؤشرات الأداء الرئيسية - اتجاهات 6 أشهر' : 'Key Performance Indicators - 6 Month Trends'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={kpiData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name={isArabic ? 'الإيرادات ($)' : 'Revenue ($)'}
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="customers" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name={isArabic ? 'العملاء' : 'Customers'}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Social Listening & Customer Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Brandwatch Social Listening */}
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                <MessageSquare className="h-5 w-5" />
                {isArabic ? 'تقارير الاتجاهات - Brandwatch الاستماع الاجتماعي' : 'Trend Reports - Brandwatch Social Listening'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={socialListeningTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="mentions" 
                    stackId="1" 
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    name={isArabic ? 'الإشارات' : 'Mentions'}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sentiment" 
                    stackId="1" 
                    stroke="#82ca9d" 
                    fill="#82ca9d" 
                    name={isArabic ? 'المشاعر الإيجابية %' : 'Positive Sentiment %'}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Customer Experience Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                <Heart className="h-5 w-5" />
                {isArabic ? 'مقاييس Lucidya CXM لتجربة العملاء' : 'Lucidya CXM Customer Experience Metrics'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerExperience.map((item, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 border rounded-lg ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                    <div>
                      <p className="font-semibold">{item.metric}</p>
                      <p className="text-2xl font-bold mt-1">{item.value}</p>
                    </div>
                    <div className={`flex items-center gap-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span className={`text-sm font-semibold ${
                        item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.change}
                      </span>
                      <TrendingUp className={`h-4 w-4 ${
                        item.trend === 'up' ? 'text-green-600' : 'text-red-600 rotate-180'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Executive Insights */}
        <Card>
          <CardHeader>
            <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? 'رؤى تنفيذية سريعة' : 'Executive Quick Insights'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg ${isArabic ? 'text-right' : 'text-left'}`}>
                <h4 className="font-semibold mb-2">
                  {isArabic ? 'أهم الإنجازات' : 'Top Achievements'}
                </h4>
                <ul className="text-sm space-y-1">
                  <li>• {isArabic ? 'زيادة الإيرادات بنسبة 12%' : '12% revenue increase'}</li>
                  <li>• {isArabic ? 'تحسين رضا العملاء' : 'Improved customer satisfaction'}</li>
                  <li>• {isArabic ? 'نمو قاعدة العملاء' : 'Customer base growth'}</li>
                </ul>
              </div>
              
              <div className={`p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg ${isArabic ? 'text-right' : 'text-left'}`}>
                <h4 className="font-semibold mb-2">
                  {isArabic ? 'التحديات' : 'Challenges'}
                </h4>
                <ul className="text-sm space-y-1">
                  <li>• {isArabic ? 'زيادة المنافسة' : 'Increased competition'}</li>
                  <li>• {isArabic ? 'تقلبات السوق' : 'Market fluctuations'}</li>
                  <li>• {isArabic ? 'توقعات العملاء المتزايدة' : 'Rising customer expectations'}</li>
                </ul>
              </div>
              
              <div className={`p-4 bg-green-50 dark:bg-green-900/20 rounded-lg ${isArabic ? 'text-right' : 'text-left'}`}>
                <h4 className="font-semibold mb-2">
                  {isArabic ? 'الفرص' : 'Opportunities'}
                </h4>
                <ul className="text-sm space-y-1">
                  <li>• {isArabic ? 'أسواق جديدة' : 'New market segments'}</li>
                  <li>• {isArabic ? 'تقنيات الذكاء الاصطناعي' : 'AI technology adoption'}</li>
                  <li>• {isArabic ? 'شراكات استراتيجية' : 'Strategic partnerships'}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExecutiveDashboardTab;
