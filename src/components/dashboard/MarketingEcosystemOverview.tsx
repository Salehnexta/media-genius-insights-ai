
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, Users, Calendar, DollarSign, Heart, Eye, MessageSquare } from 'lucide-react';

const MarketingEcosystemOverview: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const ecosystemMetrics = [
    {
      title: isArabic ? 'صحة العلامة التجارية' : 'Brand Health Score',
      value: 87,
      trend: '+12%',
      icon: <Heart className="h-5 w-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: isArabic ? 'قوة العلامة التجارية ومعدل التفاعل' : 'Brand strength and engagement rate'
    },
    {
      title: isArabic ? 'حالة محتوى التسويق' : 'Content Pipeline Status',
      value: 72,
      trend: '+8%',
      icon: <Eye className="h-5 w-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: isArabic ? 'المحتوى في الإنتاج والنشر' : 'Content in production and publishing'
    },
    {
      title: isArabic ? 'عائد الاستثمار التسويقي' : 'Marketing ROI',
      value: 234,
      trend: '+45%',
      icon: <DollarSign className="h-5 w-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: isArabic ? 'العائد لكل ريال مستثمر' : 'Return per dollar invested'
    },
    {
      title: isArabic ? 'توليد العملاء المحتملين' : 'Lead Generation',
      value: 156,
      trend: '+28%',
      icon: <Target className="h-5 w-5" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      description: isArabic ? 'عملاء جدد هذا الشهر' : 'New leads this month'
    },
    {
      title: isArabic ? 'نمو وسائل التواصل' : 'Social Media Growth',
      value: 42,
      trend: '+18%',
      icon: <Users className="h-5 w-5" />,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      description: isArabic ? 'نمو المتابعين والتفاعل' : 'Follower and engagement growth'
    }
  ];

  const upcomingActivities = [
    {
      date: isArabic ? 'اليوم' : 'Today',
      title: isArabic ? 'نشر 3 منشورات على وسائل التواصل' : 'Publish 3 social media posts',
      type: isArabic ? 'وسائل التواصل' : 'Social Media',
      assignedTo: isArabic ? 'مدير وسائل التواصل الذكي' : 'Social Media Manager AI'
    },
    {
      date: isArabic ? 'غداً' : 'Tomorrow',
      title: isArabic ? 'إرسال النشرة الإخبارية الأسبوعية' : 'Send weekly newsletter',
      type: isArabic ? 'التسويق عبر البريد' : 'Email Marketing',
      assignedTo: isArabic ? 'خبير التسويق الإلكتروني' : 'Email Marketing AI'
    },
    {
      date: isArabic ? 'الاثنين' : 'Monday',
      title: isArabic ? 'نشر مقال جديد في المدونة' : 'Publish new blog article',
      type: isArabic ? 'إنتاج المحتوى' : 'Content',
      assignedTo: isArabic ? 'منشئ المحتوى الذكي' : 'Content Creator AI'
    },
    {
      date: isArabic ? 'الثلاثاء' : 'Tuesday',
      title: isArabic ? 'تحليل أداء الحملات الشهرية' : 'Monthly campaign performance review',
      type: isArabic ? 'التحليلات' : 'Analytics',
      assignedTo: isArabic ? 'خبير التحليلات' : 'Analytics Expert AI'
    }
  ];

  return (
    <div className={`space-y-6 ${isArabic ? 'rtl' : ''}`}>
      {/* Ecosystem Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ecosystemMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <div className={metric.color}>{metric.icon}</div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {metric.trend}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <h3 className={`font-semibold text-sm ${isArabic ? 'text-right' : ''}`}>
                  {metric.title}
                </h3>
                <div className={`flex items-baseline gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span className="text-2xl font-bold">{metric.value}</span>
                  {metric.title.includes('ROI') ? (
                    <span className="text-sm text-gray-600">%</span>
                  ) : null}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {metric.description}
                </p>
                {metric.title.includes('Score') || metric.title.includes('Pipeline') ? (
                  <Progress value={metric.value} className="h-2 mt-2" />
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Marketing Calendar Preview */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Calendar className="h-5 w-5" />
            {isArabic ? 'التقويم التسويقي الموحد' : 'Unified Marketing Calendar'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingActivities.map((activity, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 ${isArabic ? 'flex-row-reverse' : ''}`}
              >
                <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{activity.title}</span>
                    <span className="text-xs text-gray-600">{activity.assignedTo}</span>
                  </div>
                </div>
                <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                  <span className="text-sm font-medium text-blue-600">
                    {activity.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <TrendingUp className="h-5 w-5" />
              {isArabic ? 'رؤى سريعة' : 'Quick Insights'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className={`p-3 bg-green-50 border border-green-200 rounded-lg ${isArabic ? 'text-right' : ''}`}>
                <p className="text-sm font-medium text-green-800">
                  {isArabic ? '✅ تحسن كبير في معدل التفاعل (+32%)' : '✅ Significant engagement improvement (+32%)'}
                </p>
              </div>
              <div className={`p-3 bg-blue-50 border border-blue-200 rounded-lg ${isArabic ? 'text-right' : ''}`}>
                <p className="text-sm font-medium text-blue-800">
                  {isArabic ? '📈 نمو العملاء المحتملين يتجاوز الهدف بـ 15%' : '📈 Lead generation exceeding target by 15%'}
                </p>
              </div>
              <div className={`p-3 bg-orange-50 border border-orange-200 rounded-lg ${isArabic ? 'text-right' : ''}`}>
                <p className="text-sm font-medium text-orange-800">
                  {isArabic ? '⚡ فرصة: اتجاه جديد في الصناعة للاستفادة منه' : '⚡ Opportunity: New industry trend to leverage'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <MessageSquare className="h-5 w-5" />
              {isArabic ? 'التوصيات الذكية' : 'AI Recommendations'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className={`p-3 border rounded-lg ${isArabic ? 'text-right' : ''}`}>
                <h4 className="font-medium text-sm mb-1">
                  {isArabic ? 'زيادة ميزانية الإعلانات الاجتماعية' : 'Increase social ads budget'}
                </h4>
                <p className="text-xs text-gray-600">
                  {isArabic ? 'أداء ممتاز - ROI 340%' : 'Excellent performance - 340% ROI'}
                </p>
              </div>
              <div className={`p-3 border rounded-lg ${isArabic ? 'text-right' : ''}`}>
                <h4 className="font-medium text-sm mb-1">
                  {isArabic ? 'إنشاء محتوى فيديو أكثر' : 'Create more video content'}
                </h4>
                <p className="text-xs text-gray-600">
                  {isArabic ? 'تفاعل أعلى بـ 5 أضعاف من النصوص' : '5x higher engagement than text posts'}
                </p>
              </div>
              <div className={`p-3 border rounded-lg ${isArabic ? 'text-right' : ''}`}>
                <h4 className="font-medium text-sm mb-1">
                  {isArabic ? 'استهداف شريحة عمرية جديدة' : 'Target new age demographic'}
                </h4>
                <p className="text-xs text-gray-600">
                  {isArabic ? 'فرصة نمو في الفئة 25-34' : 'Growth opportunity in 25-34 segment'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketingEcosystemOverview;
