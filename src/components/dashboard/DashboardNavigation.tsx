
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Campaign, BarChart3, Users, Settings, FileText, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const DashboardNavigation = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isArabic = language === 'ar';

  const navigationItems = [
    {
      title: isArabic ? 'الحملات التسويقية' : 'Marketing Campaigns',
      description: isArabic ? 'إنشاء وإدارة حملاتك التسويقية' : 'Create and manage your marketing campaigns',
      icon: Campaign,
      path: '/campaigns',
      color: 'from-blue-600 to-purple-600'
    },
    {
      title: isArabic ? 'التحليلات والتقارير' : 'Analytics & Reports',
      description: isArabic ? 'عرض أداء حملاتك ومقاييس النجاح' : 'View campaign performance and success metrics',
      icon: BarChart3,
      path: '/analytics',
      color: 'from-green-600 to-teal-600'
    },
    {
      title: isArabic ? 'إدارة الجمهور' : 'Audience Management',
      description: isArabic ? 'إدارة جمهورك المستهدف وقوائم العملاء' : 'Manage your target audience and customer lists',
      icon: Users,
      path: '/audience',
      color: 'from-orange-600 to-red-600'
    },
    {
      title: isArabic ? 'منشئ المحتوى' : 'Content Creator',
      description: isArabic ? 'إنشاء محتوى تسويقي بالذكاء الاصطناعي' : 'Create marketing content with AI assistance',
      icon: FileText,
      path: '/content-creator',
      color: 'from-purple-600 to-pink-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className={isArabic ? 'text-right' : ''}>
        <h2 className="text-2xl font-bold mb-2">
          {isArabic ? 'أدوات التسويق الذكي' : 'Smart Marketing Tools'}
        </h2>
        <p className="text-muted-foreground">
          {isArabic ? 'اختر الأداة التي تريد استخدامها لتنمية عملك' : 'Choose the tool you want to use to grow your business'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {navigationItems.map((item, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => navigate(item.path)}>
            <CardContent className="p-6">
              <div className={`flex items-start gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className={`p-3 rounded-lg bg-gradient-to-r ${item.color} text-white group-hover:scale-110 transition-transform`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <div className={`flex-1 ${isArabic ? 'text-right' : ''}`}>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <div className={`flex items-center gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Target className="h-12 w-12 text-blue-600" />
            <div className={`flex-1 ${isArabic ? 'text-right' : ''}`}>
              <h3 className="font-semibold text-lg mb-2">
                {isArabic ? 'هل تحتاج مساعدة؟' : 'Need Help Getting Started?'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {isArabic ? 'ابدأ بإنشاء حملتك التسويقية الأولى وشاهد النتائج الرائعة' : 'Start by creating your first marketing campaign and see amazing results'}
              </p>
              <Button 
                onClick={() => navigate('/campaigns')}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                {isArabic ? 'إنشاء حملة جديدة' : 'Create New Campaign'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardNavigation;
