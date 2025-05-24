
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import RTLMetricCard from './RTLMetricCard';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Eye, 
  MousePointerClick,
  BarChart3,
  Target,
  MessageSquare
} from 'lucide-react';

const RTLDashboardStats: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const metrics = [
    {
      title: isArabic ? 'إجمالي المستخدمين' : 'Total Users',
      value: '24,567',
      trend: 'up' as const,
      trendValue: isArabic ? '+12% هذا الشهر' : '+12% this month',
      icon: <Users className="h-6 w-6" />,
      color: 'bg-blue-500',
      description: isArabic ? 'زيادة مستمرة في قاعدة المستخدمين' : 'Steady growth in user base'
    },
    {
      title: isArabic ? 'معدل التحويل' : 'Conversion Rate',
      value: '3.24%',
      trend: 'up' as const,
      trendValue: isArabic ? '+0.4% من الأسبوع الماضي' : '+0.4% from last week',
      icon: <Target className="h-6 w-6" />,
      color: 'bg-green-500',
      description: isArabic ? 'تحسن ملحوظ في معدل التحويل' : 'Notable improvement in conversions'
    },
    {
      title: isArabic ? 'الإيرادات الشهرية' : 'Monthly Revenue',
      value: isArabic ? '١٢٣,٤٥٦ ر.س' : '$123,456',
      trend: 'up' as const,
      trendValue: isArabic ? '+8.2% شهرياً' : '+8.2% monthly',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'bg-purple-500',
      description: isArabic ? 'نمو مستدام في الإيرادات' : 'Sustainable revenue growth'
    },
    {
      title: isArabic ? 'مشاهدات الصفحة' : 'Page Views',
      value: isArabic ? '٨٩٧,٦٥٤' : '897,654',
      trend: 'up' as const,
      trendValue: isArabic ? '+15% اليوم' : '+15% today',
      icon: <Eye className="h-6 w-6" />,
      color: 'bg-orange-500',
      description: isArabic ? 'زيادة في حركة الزوار' : 'Increased website traffic'
    },
    {
      title: isArabic ? 'معدل النقر' : 'Click-through Rate',
      value: '5.67%',
      trend: 'up' as const,
      trendValue: isArabic ? '+2.1% هذا الأسبوع' : '+2.1% this week',
      icon: <MousePointerClick className="h-6 w-6" />,
      color: 'bg-pink-500',
      description: isArabic ? 'تفاعل أفضل مع المحتوى' : 'Better content engagement'
    },
    {
      title: isArabic ? 'المشاركات الاجتماعية' : 'Social Engagement',
      value: isArabic ? '٤٥,٢٣١' : '45,231',
      trend: 'up' as const,
      trendValue: isArabic ? '+22% هذا الشهر' : '+22% this month',
      icon: <MessageSquare className="h-6 w-6" />,
      color: 'bg-indigo-500',
      description: isArabic ? 'نمو قوي في التفاعل الاجتماعي' : 'Strong social media growth'
    },
    {
      title: isArabic ? 'تقييم الأداء' : 'Performance Score',
      value: isArabic ? '٩٢/١٠٠' : '92/100',
      trend: 'up' as const,
      trendValue: isArabic ? '+5 نقاط' : '+5 points',
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'bg-teal-500',
      description: isArabic ? 'أداء ممتاز عبر جميع المقاييس' : 'Excellent performance across metrics'
    },
    {
      title: isArabic ? 'معدل الاحتفاظ' : 'Retention Rate',
      value: '89.3%',
      trend: 'up' as const,
      trendValue: isArabic ? '+3.2% شهرياً' : '+3.2% monthly',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'bg-cyan-500',
      description: isArabic ? 'احتفاظ ممتاز بالعملاء' : 'Excellent customer retention'
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${isArabic ? 'rtl' : ''}`}>
      {metrics.map((metric, index) => (
        <RTLMetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          trend={metric.trend}
          trendValue={metric.trendValue}
          icon={metric.icon}
          color={metric.color}
          description={metric.description}
        />
      ))}
    </div>
  );
};

export default RTLDashboardStats;
