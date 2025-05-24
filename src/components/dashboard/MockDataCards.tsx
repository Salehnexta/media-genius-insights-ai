
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, Target, Eye, MousePointer } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const MockDataCards: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const mockData = [
    {
      title: isArabic ? 'إجمالي المشاهدات' : 'Total Views',
      value: '2.4M',
      change: '+12.5%',
      icon: Eye,
      color: 'text-blue-600'
    },
    {
      title: isArabic ? 'معدل النقر' : 'Click Rate',
      value: '3.2%',
      change: '+0.8%',
      icon: MousePointer,
      color: 'text-green-600'
    },
    {
      title: isArabic ? 'الوصول' : 'Reach',
      value: '156K',
      change: '+8.3%',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: isArabic ? 'التحويلات' : 'Conversions',
      value: '1.2K',
      change: '+15.2%',
      icon: Target,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {mockData.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${isArabic ? 'text-right' : ''}`}>
              {item.title}
            </CardTitle>
            <item.icon className={`h-4 w-4 ${item.color}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${isArabic ? 'text-right' : ''}`}>
              {item.value}
            </div>
            <p className={`text-xs text-muted-foreground ${isArabic ? 'text-right' : ''}`}>
              <span className="text-green-600">{item.change}</span> {isArabic ? 'من الشهر الماضي' : 'from last month'}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MockDataCards;
