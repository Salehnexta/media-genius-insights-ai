
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Bot, Brain, Palette, Share2, Search, Mail, Image, BarChart3, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const AIMarketingTeam: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const teamMembers = [
    {
      id: 'marketing-manager',
      name: isArabic ? 'مدير التسويق الذكي' : 'Marketing Manager AI',
      role: isArabic ? 'الاستراتيجية والتنسيق' : 'Strategy & Coordination',
      icon: <Brain className="h-6 w-6" />,
      status: 'active',
      currentTask: isArabic ? 'تطوير استراتيجية الربع الجديد' : 'Developing Q1 strategy',
      completedTasks: 8,
      bgColor: 'bg-blue-500',
      expertise: isArabic ? 'التخطيط الاستراتيجي' : 'Strategic Planning'
    },
    {
      id: 'brand-strategist',
      name: isArabic ? 'استراتيجي العلامة التجارية' : 'Brand Strategist AI',
      role: isArabic ? 'هوية العلامة والرسائل' : 'Brand Identity & Messaging',
      icon: <Palette className="h-6 w-6" />,
      status: 'working',
      currentTask: isArabic ? 'تحديث دليل العلامة التجارية' : 'Updating brand guidelines',
      completedTasks: 12,
      bgColor: 'bg-purple-500',
      expertise: isArabic ? 'بناء العلامة التجارية' : 'Brand Building'
    },
    {
      id: 'content-creator',
      name: isArabic ? 'منشئ المحتوى الذكي' : 'Content Creator AI',
      role: isArabic ? 'إنتاج المحتوى' : 'Content Production',
      icon: <Bot className="h-6 w-6" />,
      status: 'active',
      currentTask: isArabic ? 'كتابة 5 مقالات للمدونة' : 'Writing 5 blog articles',
      completedTasks: 24,
      bgColor: 'bg-green-500',
      expertise: isArabic ? 'كتابة المحتوى' : 'Content Writing'
    },
    {
      id: 'social-manager',
      name: isArabic ? 'مدير وسائل التواصل' : 'Social Media Manager AI',
      role: isArabic ? 'إدارة المنصات' : 'Platform Management',
      icon: <Share2 className="h-6 w-6" />,
      status: 'active',
      currentTask: isArabic ? 'جدولة منشورات الأسبوع' : 'Scheduling weekly posts',
      completedTasks: 18,
      bgColor: 'bg-pink-500',
      expertise: isArabic ? 'التفاعل الاجتماعي' : 'Social Engagement'
    },
    {
      id: 'seo-specialist',
      name: isArabic ? 'خبير السيو الذكي' : 'SEO Specialist AI',
      role: isArabic ? 'تحسين محركات البحث' : 'Search Optimization',
      icon: <Search className="h-6 w-6" />,
      status: 'working',
      currentTask: isArabic ? 'تحليل الكلمات المفتاحية' : 'Analyzing keywords',
      completedTasks: 15,
      bgColor: 'bg-orange-500',
      expertise: isArabic ? 'تحسين البحث' : 'Search Optimization'
    },
    {
      id: 'email-marketer',
      name: isArabic ? 'خبير التسويق الإلكتروني' : 'Email Marketing AI',
      role: isArabic ? 'حملات البريد الإلكتروني' : 'Email Campaigns',
      icon: <Mail className="h-6 w-6" />,
      status: 'standby',
      currentTask: isArabic ? 'تحضير النشرة الشهرية' : 'Preparing monthly newsletter',
      completedTasks: 9,
      bgColor: 'bg-indigo-500',
      expertise: isArabic ? 'التسويق عبر البريد' : 'Email Marketing'
    },
    {
      id: 'graphic-designer',
      name: isArabic ? 'المصمم الجرافيكي الذكي' : 'Graphic Designer AI',
      role: isArabic ? 'الأصول المرئية' : 'Visual Assets',
      icon: <Image className="h-6 w-6" />,
      status: 'active',
      currentTask: isArabic ? 'تصميم 10 منشورات' : 'Designing 10 social posts',
      completedTasks: 21,
      bgColor: 'bg-teal-500',
      expertise: isArabic ? 'التصميم المرئي' : 'Visual Design'
    },
    {
      id: 'analytics-expert',
      name: isArabic ? 'خبير التحليلات' : 'Analytics Expert AI',
      role: isArabic ? 'تتبع الأداء' : 'Performance Tracking',
      icon: <BarChart3 className="h-6 w-6" />,
      status: 'active',
      currentTask: isArabic ? 'تحليل أداء الحملات' : 'Analyzing campaign performance',
      completedTasks: 16,
      bgColor: 'bg-red-500',
      expertise: isArabic ? 'تحليل البيانات' : 'Data Analysis'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'working':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'standby':
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return isArabic ? 'نشط' : 'Active';
      case 'working':
        return isArabic ? 'يعمل' : 'Working';
      case 'standby':
        return isArabic ? 'في الانتظار' : 'Standby';
      default:
        return isArabic ? 'غير متاح' : 'Offline';
    }
  };

  return (
    <div className={`space-y-6 ${isArabic ? 'rtl' : ''}`}>
      {/* Team Overview Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {isArabic ? 'فريق التسويق الذكي الخاص بك' : 'Your AI Marketing Team'}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {isArabic 
            ? 'فريق تسويق كامل مدعوم بالذكاء الاصطناعي - لماذا توظف عندما يمكنك الاعتماد على الذكاء الاصطناعي؟'
            : 'A complete AI-powered marketing team - Why hire when you can AI?'
          }
        </p>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div>
                <p className="text-2xl font-bold text-green-600">8</p>
                <p className="text-sm text-gray-600">{isArabic ? 'أعضاء نشطون' : 'Active Members'}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div>
                <p className="text-2xl font-bold text-blue-600">123</p>
                <p className="text-sm text-gray-600">{isArabic ? 'مهام مكتملة' : 'Tasks Completed'}</p>
              </div>
              <Bot className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div>
                <p className="text-2xl font-bold text-purple-600">94%</p>
                <p className="text-sm text-gray-600">{isArabic ? 'معدل الإنجاز' : 'Completion Rate'}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div>
                <p className="text-2xl font-bold text-orange-600">24/7</p>
                <p className="text-sm text-gray-600">{isArabic ? 'العمل المستمر' : 'Always Working'}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {teamMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className={`p-2 rounded-lg ${member.bgColor} text-white`}>
                  {member.icon}
                </div>
                <div className={`flex-1 ${isArabic ? 'text-right' : ''}`}>
                  <CardTitle className="text-sm font-semibold">{member.name}</CardTitle>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{member.role}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {/* Status */}
                <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  {getStatusIcon(member.status)}
                  <span className="text-sm font-medium">{getStatusText(member.status)}</span>
                </div>

                {/* Current Task */}
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    {isArabic ? 'المهمة الحالية:' : 'Current Task:'}
                  </p>
                  <p className="text-sm">{member.currentTask}</p>
                </div>

                {/* Progress */}
                <div>
                  <div className={`flex justify-between items-center mb-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <span className="text-xs text-gray-600">
                      {isArabic ? 'المهام المكتملة' : 'Completed Tasks'}
                    </span>
                    <span className="text-xs font-medium">{member.completedTasks}</span>
                  </div>
                  <Progress value={(member.completedTasks / 30) * 100} className="h-2" />
                </div>

                {/* Expertise Badge */}
                <Badge variant="secondary" className="text-xs">
                  {member.expertise}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Team Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Brain className="h-5 w-5" />
            {isArabic ? 'ملخص أداء الفريق' : 'Team Performance Summary'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`text-center ${isArabic ? 'text-right' : ''}`}>
              <h3 className="font-semibold mb-2">{isArabic ? 'إنتاجية عالية' : 'High Productivity'}</h3>
              <p className="text-sm text-gray-600">
                {isArabic 
                  ? 'فريقك ينجز 5 أضعاف المهام مقارنة بالفرق التقليدية'
                  : 'Your team completes 5x more tasks than traditional teams'
                }
              </p>
            </div>
            <div className={`text-center ${isArabic ? 'text-right' : ''}`}>
              <h3 className="font-semibold mb-2">{isArabic ? 'توفير في التكاليف' : 'Cost Savings'}</h3>
              <p className="text-sm text-gray-600">
                {isArabic 
                  ? 'وفر أكثر من 85% من تكلفة توظيف فريق تسويق كامل'
                  : 'Save 85%+ compared to hiring a full marketing team'
                }
              </p>
            </div>
            <div className={`text-center ${isArabic ? 'text-right' : ''}`}>
              <h3 className="font-semibold mb-2">{isArabic ? 'عمل متواصل' : 'Always On'}</h3>
              <p className="text-sm text-gray-600">
                {isArabic 
                  ? 'فريق لا ينام أبداً - يعمل 24/7 لنجاح عملك'
                  : 'A team that never sleeps - working 24/7 for your success'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIMarketingTeam;
