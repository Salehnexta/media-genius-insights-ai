
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Bot, Brain, Palette, Share2, Search, Mail, Image, BarChart3, Clock, CheckCircle, AlertCircle, MessageCircle, Settings, Play, Pause, TrendingUp, Users, Target } from 'lucide-react';
import AgentWorkspace from '@/components/agents/AgentWorkspace';

const AIMarketingTeamEnhanced: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const teamMembers = [
    {
      id: 'marketing-manager',
      name: isArabic ? 'مدير التسويق الذكي' : 'Marketing Manager AI',
      role: isArabic ? 'القيادة والاستراتيجية' : 'Team Leader & Strategy',
      icon: <Brain className="h-6 w-6" />,
      status: 'active',
      currentTask: isArabic ? 'تطوير استراتيجية الربع الجديد وتحليل الأداء' : 'Developing Q1 strategy and performance analysis',
      completedTasks: 24,
      bgColor: 'bg-blue-500',
      expertise: isArabic ? 'القيادة الاستراتيجية' : 'Strategic Leadership',
      capabilities: ['Strategic Planning', 'Budget Management', 'ROI Analysis', 'Team Coordination', 'Executive Reporting'],
      progress: 92,
      specialization: 'marketing-strategy'
    },
    {
      id: 'content-seo',
      name: isArabic ? 'أخصائي المحتوى والسيو' : 'Content & SEO Specialist',
      role: isArabic ? 'المحتوى وتحسين محركات البحث' : 'Content Creation & SEO',
      icon: <Search className="h-6 w-6" />,
      status: 'working',
      currentTask: isArabic ? 'إنشاء محتوى المدونة وتحليل الكلمات المفتاحية' : 'Creating blog content and keyword analysis',
      completedTasks: 31,
      bgColor: 'bg-green-500',
      expertise: isArabic ? 'المحتوى والسيو' : 'Content & SEO',
      capabilities: ['Long-form Content', 'SEO Optimization', 'Keyword Research', 'Content Analytics', 'Editorial Management'],
      progress: 84,
      specialization: 'content-seo'
    },
    {
      id: 'social-creator',
      name: isArabic ? 'منشئ المحتوى الاجتماعي' : 'Social Media Content Creator',
      role: isArabic ? 'إنشاء ونشر المحتوى الاجتماعي' : 'Social Content & Publishing',
      icon: <Image className="h-6 w-6" />,
      status: 'active',
      currentTask: isArabic ? 'تصميم منشورات الأسبوع وجدولة النشر' : 'Creating weekly posts and scheduling',
      completedTasks: 28,
      bgColor: 'bg-purple-500',
      expertise: isArabic ? 'المحتوى الاجتماعي' : 'Social Content',
      capabilities: ['Social Media Posts', 'Visual Content', 'Publishing Automation', 'Content Calendar', 'Performance Tracking'],
      progress: 89,
      specialization: 'social-creator'
    },
    {
      id: 'social-cx',
      name: isArabic ? 'مدير التجربة الاجتماعية' : 'Social Media & CX Manager',
      role: isArabic ? 'المراقبة وتجربة العملاء' : 'Social Monitoring & CX',
      icon: <Users className="h-6 w-6" />,
      status: 'active',
      currentTask: isArabic ? 'مراقبة المحادثات وتحليل المشاعر' : 'Monitoring conversations and sentiment analysis',
      completedTasks: 19,
      bgColor: 'bg-pink-500',
      expertise: isArabic ? 'تجربة العملاء' : 'Customer Experience',
      capabilities: ['Social Monitoring', 'Sentiment Analysis', 'Community Management', 'Crisis Detection', 'Competitive Intelligence'],
      progress: 76,
      specialization: 'social-cx'
    },
    {
      id: 'campaign-performance',
      name: isArabic ? 'أخصائي الحملات والأداء' : 'Campaign & Performance Specialist',
      role: isArabic ? 'الحملات وتحليل الأداء' : 'Campaigns & Performance',
      icon: <Target className="h-6 w-6" />,
      status: 'active',
      currentTask: isArabic ? 'تحسين حملات الإعلانات المدفوعة' : 'Optimizing paid advertising campaigns',
      completedTasks: 22,
      bgColor: 'bg-orange-500',
      expertise: isArabic ? 'الحملات التسويقية' : 'Campaign Marketing',
      capabilities: ['Campaign Planning', 'Paid Advertising', 'Performance Analytics', 'ROAS Optimization', 'Email Marketing'],
      progress: 87,
      specialization: 'campaign-performance'
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
            ? 'فريق تسويق كامل مدعوم بالذكاء الاصطناعي من 5 أعضاء - انقر على أي عضو للتفاعل معه'
            : 'A complete 5-member AI-powered marketing team - Click any member to interact'
          }
        </p>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div>
                <p className="text-2xl font-bold text-green-600">5</p>
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
                <p className="text-2xl font-bold text-blue-600">124</p>
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
                <p className="text-2xl font-bold text-purple-600">86%</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
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
                  <p className="text-sm line-clamp-2">{member.currentTask}</p>
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
              <p className="text-2xl font-bold text-blue-600 mb-1">8</p>
              <p className="text-sm text-gray-600">
                {isArabic 
                  ? 'مشاريع تسويقية قيد التنفيذ'
                  : 'Marketing projects in progress'
                }
              </p>
            </div>
            <div className={`text-center ${isArabic ? 'text-right' : ''}`}>
              <h3 className="font-semibold mb-2">{isArabic ? 'مهام منجزة اليوم' : 'Tasks Completed Today'}</h3>
              <p className="text-2xl font-bold text-green-600 mb-1">23</p>
              <p className="text-sm text-gray-600">
                {isArabic 
                  ? 'مهام تم إنجازها بنجاح'
                  : 'Successfully completed tasks'
                }
              </p>
            </div>
            <div className={`text-center ${isArabic ? 'text-right' : ''}`}>
              <h3 className="font-semibold mb-2">{isArabic ? 'كفاءة الفريق' : 'Team Efficiency'}</h3>
              <p className="text-2xl font-bold text-purple-600 mb-1">86%</p>
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
