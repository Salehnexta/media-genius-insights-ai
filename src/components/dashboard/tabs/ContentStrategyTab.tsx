
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText, TrendingUp, Clock, Eye, Share } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const ContentStrategyTab: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  // Mock data for content strategy
  const contentPerformanceData = [
    { type: isArabic ? 'مقالات' : 'Articles', views: 12500, shares: 450, engagement: 8.2 },
    { type: isArabic ? 'فيديوهات' : 'Videos', views: 18200, shares: 720, engagement: 12.5 },
    { type: isArabic ? 'إنفوجرافيك' : 'Infographics', views: 8900, shares: 380, engagement: 9.1 },
    { type: isArabic ? 'بودكاست' : 'Podcasts', views: 5600, shares: 180, engagement: 15.3 }
  ];

  const engagementTrendData = [
    { week: isArabic ? 'الأسبوع 1' : 'Week 1', engagement: 7.2, views: 8500 },
    { week: isArabic ? 'الأسبوع 2' : 'Week 2', engagement: 8.1, views: 9200 },
    { week: isArabic ? 'الأسبوع 3' : 'Week 3', engagement: 9.5, views: 10800 },
    { week: isArabic ? 'الأسبوع 4' : 'Week 4', engagement: 10.2, views: 12100 }
  ];

  const trendingHashtags = [
    { tag: '#تسويق', frequency: 156, growth: '+15%' },
    { tag: '#تقنية', frequency: 142, growth: '+22%' },
    { tag: '#ابتكار', frequency: 128, growth: '+8%' },
    { tag: '#نجاح', frequency: 115, growth: '+18%' },
    { tag: '#ريادة', frequency: 98, growth: '+12%' }
  ];

  const contentCalendar = [
    {
      title: isArabic ? 'مقال: اتجاهات التسويق 2024' : 'Article: Marketing Trends 2024',
      type: isArabic ? 'مقال' : 'Article',
      platform: 'Blog',
      status: isArabic ? 'مجدول' : 'Scheduled',
      date: '2024-06-15',
      author: isArabic ? 'أحمد محمد' : 'Ahmed Mohamed'
    },
    {
      title: isArabic ? 'فيديو: كيفية زيادة المبيعات' : 'Video: How to Increase Sales',
      type: isArabic ? 'فيديو' : 'Video',
      platform: 'YouTube',
      status: isArabic ? 'قيد الإنتاج' : 'In Production',
      date: '2024-06-18',
      author: isArabic ? 'سارة أحمد' : 'Sara Ahmed'
    },
    {
      title: isArabic ? 'إنفوجرافيك: إحصائيات السوق' : 'Infographic: Market Statistics',
      type: isArabic ? 'إنفوجرافيك' : 'Infographic',
      platform: 'Instagram',
      status: isArabic ? 'تحت المراجعة' : 'Under Review',
      date: '2024-06-20',
      author: isArabic ? 'محمد علي' : 'Mohamed Ali'
    }
  ];

  const topPerformingContent = [
    {
      title: isArabic ? 'دليل التسويق الرقمي الشامل' : 'Complete Digital Marketing Guide',
      type: isArabic ? 'مقال' : 'Article',
      views: 25400,
      shares: 850,
      avgTime: '8:30',
      engagement: 15.2
    },
    {
      title: isArabic ? 'أسرار النجاح في وسائل التواصل' : 'Social Media Success Secrets',
      type: isArabic ? 'فيديو' : 'Video',
      views: 18900,
      shares: 720,
      avgTime: '12:45',
      engagement: 18.7
    },
    {
      title: isArabic ? 'اتجاهات التجارة الإلكترونية' : 'E-commerce Trends',
      type: isArabic ? 'إنفوجرافيك' : 'Infographic',
      views: 12800,
      shares: 480,
      avgTime: '3:20',
      engagement: 12.4
    }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className={`p-6 h-full overflow-y-auto ${isArabic ? 'rtl' : ''}`}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className={`text-2xl font-bold mb-4 ${isArabic ? 'text-right' : 'text-left'}`}>
            {isArabic ? 'لوحة تحكم إنشاء المحتوى والاستراتيجية' : 'Content Creation & Strategy Dashboard'}
          </h2>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Eye className="h-5 w-5 text-blue-600" />
                <Badge variant="secondary">Views</Badge>
              </div>
              <CardTitle className={`text-sm ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'إجمالي المشاهدات' : 'Total Views'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">45.2K</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {isArabic ? '+18% هذا الشهر' : '+18% this month'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Share className="h-5 w-5 text-green-600" />
                <Badge variant="secondary">Shares</Badge>
              </div>
              <CardTitle className={`text-sm ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'إجمالي المشاركات' : 'Total Shares'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">2,140</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {isArabic ? '+25% زيادة' : '+25% increase'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <Badge variant="secondary">Engagement</Badge>
              </div>
              <CardTitle className={`text-sm ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'معدل التفاعل' : 'Engagement Rate'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">11.3%</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {isArabic ? '+2.1% تحسن' : '+2.1% improvement'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Clock className="h-5 w-5 text-orange-600" />
                <Badge variant="secondary">Time</Badge>
              </div>
              <CardTitle className={`text-sm ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'متوسط وقت المشاهدة' : 'Avg View Time'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">6:42</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {isArabic ? '+45 ثانية' : '+45 seconds'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Content Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? 'تقويم المحتوى المرئي' : 'Visual Content Calendar'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contentCalendar.map((content, index) => (
                <div key={index} className={`flex items-center justify-between p-4 border rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex-1 ${isArabic ? 'text-right' : 'text-left'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{content.type}</Badge>
                      <Badge variant="outline">{content.platform}</Badge>
                      <Badge 
                        variant={
                          content.status === (isArabic ? 'مجدول' : 'Scheduled') ? 'default' : 
                          content.status === (isArabic ? 'قيد الإنتاج' : 'In Production') ? 'secondary' : 
                          'outline'
                        }
                      >
                        {content.status}
                      </Badge>
                    </div>
                    <h4 className="font-semibold">{content.title}</h4>
                    <p className="text-sm text-gray-600">
                      {isArabic ? 'الكاتب:' : 'Author:'} {content.author} • {content.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Content Performance by Type */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'أداء المحتوى حسب النوع' : 'Content Performance by Type'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={contentPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="#8884d8" />
                  <Bar dataKey="shares" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Engagement Trend */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'اتجاه تفاعل الجمهور' : 'Audience Engagement Trend'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={engagementTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="engagement" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="views" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Trending Hashtags and Top Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trending Hashtags */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'الهاشتاجات والكلمات الرائجة' : 'Trending Hashtags & Keywords'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trendingHashtags.map((hashtag, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span className="font-medium text-blue-600">{hashtag.tag}</span>
                      <Badge variant="outline">{hashtag.growth}</Badge>
                    </div>
                    <span className="text-sm text-gray-600">{hashtag.frequency} {isArabic ? 'مرة' : 'times'}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Content */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'المحتوى الأكثر أداءً' : 'Top Performing Content'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformingContent.map((content, index) => (
                  <div key={index} className={`p-4 border rounded-lg ${isArabic ? 'text-right' : 'text-left'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{content.type}</Badge>
                      <Badge variant="secondary">{content.engagement}% {isArabic ? 'تفاعل' : 'engagement'}</Badge>
                    </div>
                    <h4 className="font-semibold mb-2">{content.title}</h4>
                    <div className={`grid grid-cols-3 gap-2 text-sm ${isArabic ? 'text-right' : 'text-left'}`}>
                      <div>
                        <p className="text-gray-600">{isArabic ? 'المشاهدات' : 'Views'}</p>
                        <p className="font-semibold">{content.views.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">{isArabic ? 'المشاركات' : 'Shares'}</p>
                        <p className="font-semibold">{content.shares}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">{isArabic ? 'متوسط الوقت' : 'Avg Time'}</p>
                        <p className="font-semibold">{content.avgTime}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContentStrategyTab;
