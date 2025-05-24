
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import AgentChatSidebar from '@/components/agents/AgentChatSidebar';
import AdminPanelAccess from '@/components/agents/AdminPanelAccess';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Users, TrendingUp, Target, Activity, MessageCircle, Calendar, BarChart3, Settings, Play, Pause } from 'lucide-react';

export interface Agent {
  id: string;
  name: string;
  role: string;
  icon: string;
  status: 'active' | 'working' | 'standby';
  specialization: string;
  capabilities: string[];
  currentTask: string;
  completedTasks: number;
  progress: number;
  bgColor: string;
}

const Agents: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const agents: Agent[] = [
    {
      id: 'marketing-manager',
      name: isArabic ? 'مدير التسويق الذكي' : 'Marketing Manager',
      role: isArabic ? 'الاستراتيجية وتنسيق الحملات' : 'Strategy & Campaign Coordination',
      icon: '🧠',
      status: 'active',
      specialization: 'marketing-manager',
      capabilities: isArabic 
        ? ['التخطيط الاستراتيجي', 'إدارة الميزانية', 'تحليل العائد', 'تنسيق الفريق']
        : ['Strategic Planning', 'Budget Management', 'ROI Analysis', 'Team Coordination'],
      currentTask: isArabic ? 'تحليل أداء الربع الأول' : 'Analyzing Q1 performance',
      completedTasks: 24,
      progress: 85,
      bgColor: 'bg-blue-500'
    },
    {
      id: 'content-seo',
      name: isArabic ? 'أخصائي المحتوى والسيو' : 'Content & SEO Specialist',
      role: isArabic ? 'إنشاء المحتوى وتحسين محركات البحث' : 'Content Creation & SEO',
      icon: '📝',
      status: 'working',
      specialization: 'content-seo',
      capabilities: isArabic
        ? ['كتابة المحتوى', 'تحسين السيو', 'بحث الكلمات المفتاحية', 'التحليلات']
        : ['Content Writing', 'SEO Optimization', 'Keyword Research', 'Analytics'],
      currentTask: isArabic ? 'كتابة دليل التسويق بالذكاء الاصطناعي' : 'Writing AI Marketing Guide',
      completedTasks: 31,
      progress: 85,
      bgColor: 'bg-green-500'
    },
    {
      id: 'social-creator',
      name: isArabic ? 'منشئ المحتوى الاجتماعي' : 'Social Content Creator',
      role: isArabic ? 'إنشاء ونشر المحتوى الاجتماعي' : 'Content Creation & Publishing',
      icon: '📱',
      status: 'active',
      specialization: 'social-creator',
      capabilities: isArabic
        ? ['المنشورات الاجتماعية', 'المحتوى المرئي', 'النشر', 'التفاعل']
        : ['Social Posts', 'Visual Content', 'Publishing', 'Engagement'],
      currentTask: isArabic ? 'إنشاء محتوى الأسبوع' : 'Creating weekly content',
      completedTasks: 28,
      progress: 75,
      bgColor: 'bg-purple-500'
    },
    {
      id: 'social-cx',
      name: isArabic ? 'مدير التجربة الاجتماعية' : 'Social CX Manager',
      role: isArabic ? 'المراقبة وتجربة العملاء' : 'Brand Monitoring & Customer Experience',
      icon: '👥',
      status: 'active',
      specialization: 'social-cx',
      capabilities: isArabic
        ? ['مراقبة العلامة التجارية', 'تحليل المشاعر', 'دعم العملاء', 'إدارة الأزمات']
        : ['Brand Monitoring', 'Sentiment Analysis', 'Customer Support', 'Crisis Management'],
      currentTask: isArabic ? 'مراقبة المحادثات' : 'Monitoring conversations',
      completedTasks: 19,
      progress: 96,
      bgColor: 'bg-pink-500'
    },
    {
      id: 'campaign-performance',
      name: isArabic ? 'أخصائي الحملات والأداء' : 'Campaign & Performance Specialist',
      role: isArabic ? 'إدارة الحملات وتحليل الأداء' : 'Campaign Management & Performance Analytics',
      icon: '📊',
      status: 'active',
      specialization: 'campaign-performance',
      capabilities: isArabic
        ? ['إدارة الحملات', 'تحليلات الأداء', 'تحسين العائد', 'اختبار أ/ب']
        : ['Campaign Management', 'Performance Analytics', 'ROAS Optimization', 'A/B Testing'],
      currentTask: isArabic ? 'تحسين حملات الإعلانات' : 'Optimizing ad campaigns',
      completedTasks: 22,
      progress: 94,
      bgColor: 'bg-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <DashboardHeader />
      
      <div className="flex h-[calc(100vh-4rem)]" dir={isArabic ? 'rtl' : 'ltr'}>
        {/* AI Chat Sidebar - Fixed 35% - Always LEFT in physical position */}
        <div className="w-[35%] min-w-[400px] bg-white dark:bg-gray-900 border-r" style={{ order: isArabic ? 2 : 1 }}>
          <div className="p-4 border-b">
            <h2 className={`text-lg font-semibold text-gray-900 dark:text-white ${isArabic ? 'text-right font-arabic' : ''}`}>
              {isArabic ? 'مساعد التسويق الذكي' : 'AI Marketing Assistant'}
            </h2>
            <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'text-right' : ''}`}>
              {isArabic ? 'تحدث مع مساعد التسويق الذكي' : 'Chat with your AI marketing assistant'}
            </p>
          </div>
          <div className="h-[calc(100%-80px)]">
            <AgentChatSidebar 
              agents={agents}
              selectedAgent={selectedAgent}
              onAgentSelect={setSelectedAgent}
              isArabic={isArabic}
            />
          </div>
        </div>

        {/* Main Dashboard - 65% */}
        <div className="flex-1 bg-gray-50 dark:bg-gray-950 overflow-y-auto" style={{ order: isArabic ? 1 : 2 }}>
          <div className="p-6" dir={isArabic ? 'rtl' : 'ltr'}>
            {/* Header with Admin Access */}
            <div className={`mb-6 flex items-center justify-between ${isArabic ? 'text-right flex-row-reverse' : ''}`}>
              <div>
                <h1 className={`text-2xl font-bold text-gray-900 dark:text-white mb-2 ${isArabic ? 'font-arabic' : ''}`}>
                  {isArabic ? 'لوحة تحكم الوكلاء الأذكياء' : 'AI Agents Dashboard'}
                </h1>
                <p className={`text-gray-600 dark:text-gray-300 ${isArabic ? 'leading-relaxed' : ''}`}>
                  {isArabic ? 'إدارة ومراقبة فريق التسويق الذكي' : 'Manage and monitor your AI marketing team'}
                </p>
              </div>
              <AdminPanelAccess />
            </div>

            {/* Top Metrics Row */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {/* Views */}
              <Card className="bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className={isArabic ? 'text-right' : ''}>
                      <div className="flex items-center gap-2 mb-1">
                        <Eye className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">{isArabic ? 'إجمالي المشاهدات' : 'Total Views'}</span>
                      </div>
                      <div className="text-2xl font-bold">2.4M</div>
                      <div className="text-sm text-gray-500">
                        <span className="text-green-600">+12.5%</span> {isArabic ? 'من الشهر الماضي' : 'from last month'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Conversion Rate */}
              <Card className="bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className={isArabic ? 'text-right' : ''}>
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-600">{isArabic ? 'معدل التحويل' : 'Conversion Rate'}</span>
                      </div>
                      <div className="text-2xl font-bold">3.2%</div>
                      <div className="text-sm text-gray-500">
                        <span className="text-green-600">+0.8%</span> {isArabic ? 'من الشهر الماضي' : 'from last month'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reach */}
              <Card className="bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className={isArabic ? 'text-right' : ''}>
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="h-4 w-4 text-purple-600" />
                        <span className="text-sm text-gray-600">{isArabic ? 'الوصول' : 'Reach'}</span>
                      </div>
                      <div className="text-2xl font-bold">156K</div>
                      <div className="text-sm text-gray-500">
                        <span className="text-green-600">+8.3%</span> {isArabic ? 'من الشهر الماضي' : 'from last month'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Conversions */}
              <Card className="bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className={isArabic ? 'text-right' : ''}>
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="h-4 w-4 text-orange-600" />
                        <span className="text-sm text-gray-600">{isArabic ? 'التحويلات' : 'Conversions'}</span>
                      </div>
                      <div className="text-2xl font-bold">1.2K</div>
                      <div className="text-sm text-gray-500">
                        <span className="text-green-600">+15.2%</span> {isArabic ? 'من الشهر الماضي' : 'from last month'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Agents Grid */}
            <div className={`mb-6 ${isArabic ? 'text-right' : ''}`}>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {isArabic ? 'فريق الوكلاء الأذكياء' : 'AI Marketing Team'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {agents.map((agent) => (
                  <Card key={agent.id} className="bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className={`flex items-center gap-3 mb-4 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                        <div className={`p-3 rounded-lg ${agent.bgColor} text-white text-xl`}>
                          {agent.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{agent.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{agent.role}</p>
                        </div>
                      </div>
                      
                      <div className={`space-y-3 ${isArabic ? 'text-right' : ''}`}>
                        <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                          <span className="text-sm text-gray-600">{isArabic ? 'الحالة' : 'Status'}</span>
                          <Badge className={
                            agent.status === 'active' ? 'bg-green-100 text-green-800' :
                            agent.status === 'working' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {isArabic ? 
                              (agent.status === 'active' ? 'نشط' : agent.status === 'working' ? 'يعمل' : 'في الانتظار') :
                              agent.status.charAt(0).toUpperCase() + agent.status.slice(1)
                            }
                          </Badge>
                        </div>
                        
                        <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                          <span className="text-sm text-gray-600">{isArabic ? 'المهام المكتملة' : 'Completed Tasks'}</span>
                          <span className="font-semibold">{agent.completedTasks}</span>
                        </div>
                        
                        <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                          <span className="text-sm text-gray-600">{isArabic ? 'التقدم' : 'Progress'}</span>
                          <span className="font-semibold">{agent.progress}%</span>
                        </div>
                        
                        <div className={isArabic ? 'text-right' : ''}>
                          <p className="text-sm text-gray-600 mb-1">{isArabic ? 'المهمة الحالية:' : 'Current Task:'}</p>
                          <p className="text-sm font-medium">{agent.currentTask}</p>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center">
                            <MessageCircle className="h-4 w-4" />
                            {isArabic ? 'محادثة' : 'Chat'}
                          </button>
                          <button className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 justify-center">
                            <Settings className="h-4 w-4" />
                            {isArabic ? 'إعدادات' : 'Settings'}
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Weekly Performance & Best Campaigns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Performance */}
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className={`text-lg ${isArabic ? 'text-right' : ''}`}>
                    {isArabic ? 'أداء الأسبوع' : 'Weekly Performance'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span className="text-sm text-gray-600">{isArabic ? 'المشاهدات' : 'Views'}</span>
                      <div className={`text-right ${isArabic ? 'text-left' : ''}`}>
                        <div className="font-semibold">342K</div>
                      </div>
                    </div>
                    <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span className="text-sm text-gray-600">{isArabic ? 'التفاعل' : 'Engagement'}</span>
                      <div className={`text-right ${isArabic ? 'text-left' : ''}`}>
                        <div className="font-semibold">8.4%</div>
                      </div>
                    </div>
                    <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span className="text-sm text-gray-600">{isArabic ? 'النمو' : 'Growth'}</span>
                      <div className={`text-right ${isArabic ? 'text-left' : ''}`}>
                        <div className="font-semibold text-green-600">+23%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Best Campaigns */}
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className={`text-lg ${isArabic ? 'text-right' : ''}`}>
                    {isArabic ? 'أفضل الحملات' : 'Best Campaigns'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span className="text-sm">{isArabic ? 'حملة الصيف 2024' : 'Summer 2024 Campaign'}</span>
                      <Badge className="bg-green-100 text-green-800">94% CTR</Badge>
                    </div>
                    <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span className="text-sm">{isArabic ? 'منتج جديد' : 'New Product'}</span>
                      <Badge className="bg-blue-100 text-blue-800">87% CTR</Badge>
                    </div>
                    <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span className="text-sm">{isArabic ? 'عروض رمضان' : 'Ramadan Offers'}</span>
                      <Badge className="bg-purple-100 text-purple-800">92% CTR</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agents;
