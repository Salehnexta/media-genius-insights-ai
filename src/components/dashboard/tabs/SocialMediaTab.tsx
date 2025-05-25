
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Heart, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const SocialMediaTab: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  // Mock data for social media analytics
  const sentimentData = [
    { type: isArabic ? 'إيجابي' : 'Positive', value: 68, color: '#10b981' },
    { type: isArabic ? 'محايد' : 'Neutral', value: 22, color: '#f59e0b' },
    { type: isArabic ? 'سلبي' : 'Negative', value: 10, color: '#ef4444' }
  ];

  const sentimentTrendData = [
    { date: '2024-01', positive: 65, negative: 12, neutral: 23 },
    { date: '2024-02', positive: 70, negative: 10, neutral: 20 },
    { date: '2024-03', positive: 68, negative: 10, neutral: 22 },
    { date: '2024-04', positive: 72, negative: 8, neutral: 20 },
    { date: '2024-05', positive: 75, negative: 7, neutral: 18 },
    { date: '2024-06', positive: 68, negative: 10, neutral: 22 }
  ];

  const platformActivity = [
    { platform: 'Instagram', mentions: 1250, sentiment: 72 },
    { platform: 'Twitter', mentions: 980, sentiment: 65 },
    { platform: 'Facebook', mentions: 750, sentiment: 70 },
    { platform: 'LinkedIn', mentions: 420, sentiment: 80 },
    { platform: 'TikTok', mentions: 680, sentiment: 68 }
  ];

  const responseTimeData = [
    { hour: '09:00', avgResponse: 15 },
    { hour: '12:00', avgResponse: 8 },
    { hour: '15:00', avgResponse: 12 },
    { hour: '18:00', avgResponse: 25 },
    { hour: '21:00', avgResponse: 45 }
  ];

  const negativeKeywords = [
    { word: isArabic ? 'بطيء' : 'Slow', frequency: 45, impact: 'high' },
    { word: isArabic ? 'مكلف' : 'Expensive', frequency: 38, impact: 'medium' },
    { word: isArabic ? 'معقد' : 'Complicated', frequency: 32, impact: 'medium' },
    { word: isArabic ? 'عطل' : 'Bug', frequency: 28, impact: 'high' },
    { word: isArabic ? 'انتظار' : 'Waiting', frequency: 25, impact: 'low' }
  ];

  const positiveKeywords = [
    { word: isArabic ? 'ممتاز' : 'Excellent', frequency: 85, impact: 'high' },
    { word: isArabic ? 'سريع' : 'Fast', frequency: 72, impact: 'high' },
    { word: isArabic ? 'مفيد' : 'Helpful', frequency: 68, impact: 'medium' },
    { word: isArabic ? 'جودة' : 'Quality', frequency: 65, impact: 'high' },
    { word: isArabic ? 'رائع' : 'Amazing', frequency: 58, impact: 'medium' }
  ];

  const recentPosts = [
    {
      platform: 'Instagram',
      content: isArabic ? 'منتجنا الجديد متوفر الآن!' : 'Our new product is now available!',
      engagement: 1250,
      sentiment: 'positive',
      time: '2 hours ago'
    },
    {
      platform: 'Twitter',
      content: isArabic ? 'شكراً لثقتكم بنا' : 'Thank you for trusting us',
      engagement: 850,
      sentiment: 'positive',
      time: '4 hours ago'
    },
    {
      platform: 'Facebook',
      content: isArabic ? 'تحديث مهم حول خدماتنا' : 'Important update about our services',
      engagement: 620,
      sentiment: 'neutral',
      time: '6 hours ago'
    }
  ];

  return (
    <div className={`p-6 h-full overflow-y-auto ${isArabic ? 'rtl' : ''}`}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className={`text-2xl font-bold mb-4 ${isArabic ? 'text-right' : 'text-left'}`}>
            {isArabic ? 'لوحة تحكم السوشال ميديا وتجربة العملاء' : 'Social Media & Customer Experience Dashboard'}
          </h2>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Heart className="h-5 w-5 text-red-600" />
                <Badge variant="secondary">Sentiment</Badge>
              </div>
              <CardTitle className={`text-sm ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'مؤشر المشاعر الإيجابي' : 'Positive Sentiment'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">68%</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {isArabic ? '+5% من الأسبوع الماضي' : '+5% from last week'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Clock className="h-5 w-5 text-blue-600" />
                <Badge variant="secondary">Response</Badge>
              </div>
              <CardTitle className={`text-sm ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'متوسط وقت الاستجابة' : 'Avg Response Time'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">18 min</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {isArabic ? '-5 دقائق تحسن' : '-5min improvement'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <MessageSquare className="h-5 w-5 text-green-600" />
                <Badge variant="secondary">Mentions</Badge>
              </div>
              <CardTitle className={`text-sm ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'إجمالي الإشارات' : 'Total Mentions'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">4,080</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {isArabic ? '+12% هذا الأسبوع' : '+12% this week'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <Badge variant="secondary">Alerts</Badge>
              </div>
              <CardTitle className={`text-sm ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'التنبيهات الحرجة' : 'Critical Alerts'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">3</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {isArabic ? 'تتطلب اهتماماً فورياً' : 'Need immediate attention'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Real-time Sentiment Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'تحليل المشاعر في الوقت الفعلي' : 'Real-time Sentiment Analysis'}
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

          {/* Sentiment Trends Over Time */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'اتجاهات المشاعر عبر الوقت' : 'Sentiment Trends Over Time'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={sentimentTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="positive" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="neutral" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Platform Activity Heatmap */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'نشاط المنصات والمشاعر' : 'Platform Activity & Sentiment'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={platformActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="platform" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="mentions" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Response Time Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'تحليل أوقات الاستجابة' : 'Response Time Analysis'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="avgResponse" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Keywords Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Negative Keywords */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'الكلمات المفتاحية في التعليقات السلبية' : 'Negative Keywords Analysis'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {negativeKeywords.map((keyword, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <span className="font-medium">{keyword.word}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant={keyword.impact === 'high' ? 'destructive' : keyword.impact === 'medium' ? 'secondary' : 'outline'}>
                        {keyword.impact}
                      </Badge>
                      <span className="text-sm text-gray-600">{keyword.frequency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Positive Keywords */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'الكلمات المفتاحية في التعليقات الإيجابية' : 'Positive Keywords Analysis'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {positiveKeywords.map((keyword, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <span className="font-medium">{keyword.word}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant={keyword.impact === 'high' ? 'default' : 'secondary'}>
                        {keyword.impact}
                      </Badge>
                      <span className="text-sm text-gray-600">{keyword.frequency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Social Media Posts */}
        <Card>
          <CardHeader>
            <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? 'آخر منشورات وسائل التواصل الاجتماعي' : 'Recent Social Media Posts'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post, index) => (
                <div key={index} className={`flex items-center justify-between p-4 border rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex-1 ${isArabic ? 'text-right' : 'text-left'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{post.platform}</Badge>
                      <Badge variant={post.sentiment === 'positive' ? 'default' : post.sentiment === 'negative' ? 'destructive' : 'secondary'}>
                        {post.sentiment}
                      </Badge>
                    </div>
                    <p className="font-medium">{post.content}</p>
                    <p className="text-sm text-gray-600">{post.time} • {post.engagement} {isArabic ? 'تفاعل' : 'engagements'}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SocialMediaTab;
