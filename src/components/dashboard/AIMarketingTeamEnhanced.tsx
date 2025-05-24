
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Bot, Brain, Palette, Share2, Search, Mail, Image, BarChart3, Clock, CheckCircle, AlertCircle, MessageCircle, Settings, Play, Pause } from 'lucide-react';
import AgentWorkspace from '@/components/agents/AgentWorkspace';

const AIMarketingTeamEnhanced: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const teamMembers = [
    {
      id: 'marketing-manager',
      name: isArabic ? 'مدير التسويق الذكي' : 'Marketing Manager AI',
      role: isArabic ? 'التنسيق والاستراتيجية' : 'Strategy & Coordination',
      icon: <Brain className="h-6 w-6" />,
      status: 'active',
      currentTask: isArabic ? 'تطوير استراتيجية الربع الجديد' : 'Developing Q1 strategy',
      completedTasks: 8,
      bgColor: 'bg-blue-500',
      expertise: isArabic ? 'التخطيط الاستراتيجي' : 'Strategic Planning',
      capabilities: ['Strategy Planning', 'Team Coordination', 'ROI Analysis', 'Budget Management'],
      progress: 85,
      specialization: 'marketing-strategy'
    },
    {
      id: 'communication-manager',
      name: isArabic ? 'مدير التواصل الذكي' : 'Communication Manager AI',
      role: isArabic ? 'إدارة التواصل والمنصات' : 'Social Media & Communication',
      icon: <Share2 className="h-6 w-6" />,
      status: 'active',
      currentTask: isArabic ? 'جدولة منشورات الأسبوع' : 'Scheduling weekly posts',
      completedTasks: 18,
      bgColor: 'bg-pink-500',
      expertise: isArabic ? 'التفاعل الاجتماعي' : 'Social Engagement',
      capabilities: ['Social Scheduling', 'Community Management', 'Crisis Communication', 'Brand Voice'],
      progress: 92,
      specialization: 'social-media'
    },
    {
      id: 'content-strategist',
      name: isArabic ? 'استراتيجي المحتوى' : 'Content Strategist AI',
      role: isArabic ? 'استراتيجية المحتوى' : 'Content Strategy',
      icon: <Bot className="h-6 w-6" />,
      status: 'working',
      currentTask: isArabic ? 'تحليل الترندات الجديدة' : 'Analyzing new trends',
      completedTasks: 24,
      bgColor: 'bg-green-500',
      expertise: isArabic ? 'استراتيجية المحتوى' : 'Content Strategy',
      capabilities: ['Content Planning', 'Trend Analysis', 'SEO Content', 'Editorial Calendar'],
      progress: 78,
      specialization: 'content-strategy'
    },
    {
      id: 'brand-manager',
      name: isArabic ? 'مدير العلامة التجارية' : 'Brand Manager AI',
      role: isArabic ? 'هوية العلامة والرسائل' : 'Brand Identity & Guidelines',
      icon: <Palette className="h-6 w-6" />,
      status: 'active',
      currentTask: isArabic ? 'تحديث دليل العلامة التجارية' : 'Updating brand guidelines',
      completedTasks: 12,
      bgColor: 'bg-purple-500',
      expertise: isArabic ? 'بناء العلامة التجارية' : 'Brand Building',
      capabilities: ['Brand Guidelines', 'Visual Identity', 'Brand Positioning', 'Competitor Analysis'],
      progress: 88,
      specialization: 'brand-management'
    },
    {
      id: 'analytics-expert',
      name: isArabic ? 'خبير التحليلات' : 'Analytics Expert AI',
      role: isArabic ? 'تتبع الأداء والتحليل' : 'Performance Analytics',
      icon: <BarChart3 className="h-6 w-6" />,
      status: 'active',
      currentTask: isArabic ? 'تحليل أداء الحملات' : 'Analyzing campaign performance',
      completedTasks: 16,
      bgColor: 'bg-red-500',
      expertise: isArabic ? 'تحليل البيانات' : 'Data Analysis',
      capabilities: ['Data Analysis', 'Report Generation', 'A/B Testing', 'Predictive Analytics'],
      progress: 95,
      specialization: 'analytics'
    },
    {
      id: 'graphic-designer',
      name: isArabic ? 'المصمم الجرافيكي الذكي' : 'Graphic Designer AI',
      role: isArabic ? 'الأصول المرئية والتصميم' : 'Visual Assets & Design',
      icon: <Image className="h-6 w-6" />,
      status: 'active',
      currentTask: isArabic ? 'تصميم 10 منشورات' : 'Designing 10 social posts',
      completedTasks: 21,
      bgColor: 'bg-teal-500',
      expertise: isArabic ? 'التصميم المرئي' : 'Visual Design',
      capabilities: ['Design Generation', 'Brand Assets', 'Image Optimization', 'Template Creation'],
      progress: 73,
      specialization: 'graphic-design'
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
      expertise: isArabic ? 'التسويق عبر البريد' : 'Email Marketing',
      capabilities: ['Campaign Automation', 'List Segmentation', 'A/B Testing', 'Deliverability'],
      progress: 67,
      specialization: 'email-marketing'
    },
    {
      id: 'seo-expert',
      name: isArabic ? 'خبير السيو الذكي' : 'SEO Expert AI',
      role: isArabic ? 'تحسين محركات البحث' : 'Search Optimization',
      icon: <Search className="h-6 w-6" />,
      status: 'working',
      currentTask: isArabic ? 'تحليل الكلمات المفتاحية' : 'Analyzing keywords',
      completedTasks: 15,
      bgColor: 'bg-orange-500',
      expertise: isArabic ? 'تحسين البحث' : 'Search Optimization',
      capabilities: ['Keyword Research', 'Technical SEO', 'Content Optimization', 'Ranking Monitor'],
      progress: 81,
      specialization: 'seo'
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

  const handleAgentClick = (agentId: string) => {
    setSelectedAgent(agentId);
  };

  const handleCloseWorkspace = () => {
    setSelectedAgent(null);
  };

  if (selectedAgent) {
    const agent = teamMembers.find(m => m.id === selectedAgent);
    return (
      <AgentWorkspace 
        agent={agent} 
        onClose={handleCloseWorkspace}
        isArabic={isArabic}
      />
    );
  }

  return (
    <div className={`space-y-6 ${isArabic ? 'rtl' : ''}`}>
      {/* Team Overview Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {isArabic ? 'فريق التسويق الذكي الخاص بك' : 'Your AI Marketing Team'}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {isArabic 
            ? 'فريق تسويق كامل مدعوم بالذكاء الاصطناعي - انقر على أي عضو للتفاعل معه'
            : 'A complete AI-powered marketing team - Click any member to interact'
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
                <p className="text-2xl font-bold text-purple-600">82%</p>
                <p className="text-sm text-gray-600">{isArabic ? 'متوسط الأداء' : 'Avg Performance'}</p>
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
          <Card 
            key={member.id} 
            className="hover:shadow-lg transition-all cursor-pointer transform hover:scale-105 duration-200"
            onClick={() => handleAgentClick(member.id)}
          >
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
                      {isArabic ? 'التقدم' : 'Progress'}
                    </span>
                    <span className="text-xs font-medium">{member.progress}%</span>
                  </div>
                  <Progress value={member.progress} className="h-2" />
                </div>

                {/* Quick Actions */}
                <div className={`flex gap-2 pt-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Button size="sm" variant="outline" className="flex-1">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    {isArabic ? 'محادثة' : 'Chat'}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>

                {/* Expertise Badge */}
                <Badge variant="secondary" className="text-xs w-full justify-center">
                  {member.expertise}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Team Collaboration Status */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Bot className="h-5 w-5" />
            {isArabic ? 'حالة التعاون بين الفريق' : 'Team Collaboration Status'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`text-center ${isArabic ? 'text-right' : ''}`}>
              <h3 className="font-semibold mb-2">{isArabic ? 'مشاريع نشطة' : 'Active Projects'}</h3>
              <p className="text-2xl font-bold text-blue-600 mb-1">12</p>
              <p className="text-sm text-gray-600">
                {isArabic 
                  ? 'مشاريع تسويقية قيد التنفيذ'
                  : 'Marketing projects in progress'
                }
              </p>
            </div>
            <div className={`text-center ${isArabic ? 'text-right' : ''}`}>
              <h3 className="font-semibold mb-2">{isArabic ? 'مهام منجزة اليوم' : 'Tasks Completed Today'}</h3>
              <p className="text-2xl font-bold text-green-600 mb-1">47</p>
              <p className="text-sm text-gray-600">
                {isArabic 
                  ? 'مهام تم إنجازها بنجاح'
                  : 'Successfully completed tasks'
                }
              </p>
            </div>
            <div className={`text-center ${isArabic ? 'text-right' : ''}`}>
              <h3 className="font-semibold mb-2">{isArabic ? 'كفاءة الفريق' : 'Team Efficiency'}</h3>
              <p className="text-2xl font-bold text-purple-600 mb-1">94%</p>
              <p className="text-sm text-gray-600">
                {isArabic 
                  ? 'معدل الكفاءة الإجمالي'
                  : 'Overall efficiency rate'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIMarketingTeamEnhanced;
