
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import AdminPanelAccess from '@/components/agents/AdminPanelAccess';
import AgentWorkspaceArea from '@/components/agents/AgentWorkspaceArea';
import EnhancedChatSection from '@/components/dashboard/EnhancedChatSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Send, 
  Brain, 
  PenTool, 
  Smartphone, 
  Users, 
  BarChart3,
  MessageCircle,
  Activity,
  TrendingUp,
  Target,
  DollarSign,
  Eye,
  ThumbsUp,
  ArrowUp,
  Zap
} from 'lucide-react';

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
  chatColor: string;
}

const Agents: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

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
      bgColor: 'bg-blue-500',
      chatColor: 'text-blue-600'
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
      bgColor: 'bg-green-500',
      chatColor: 'text-green-600'
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
      bgColor: 'bg-purple-500',
      chatColor: 'text-purple-600'
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
      bgColor: 'bg-pink-500',
      chatColor: 'text-pink-600'
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
      bgColor: 'bg-orange-500',
      chatColor: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <DashboardHeader />
      
      <div className="flex h-[calc(100vh-4rem)]" dir={isArabic ? 'rtl' : 'ltr'}>
        {/* Main Dashboard Area - 65% */}
        <div className="flex-1 p-6">
          <div className={`flex items-center justify-between mb-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <h1 className={`text-2xl font-bold text-gray-900 dark:text-white ${isArabic ? 'text-right font-arabic' : ''}`}>
              {isArabic ? 'فريق التسويق الذكي' : 'AI Marketing Team'}
            </h1>
            <AdminPanelAccess />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6" dir={isArabic ? 'rtl' : 'ltr'}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">{isArabic ? 'نظرة عامة' : 'Overview'}</TabsTrigger>
              <TabsTrigger value="campaigns">{isArabic ? 'الحملات' : 'Campaigns'}</TabsTrigger>
              <TabsTrigger value="content">{isArabic ? 'المحتوى' : 'Content'}</TabsTrigger>
              <TabsTrigger value="analytics">{isArabic ? 'التحليلات' : 'Analytics'}</TabsTrigger>
              <TabsTrigger value="agents">{isArabic ? 'الوكلاء' : 'Agents'}</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <CardContent className="p-6">
                    <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <div className={isArabic ? 'text-right' : ''}>
                        <p className="text-sm opacity-90">{isArabic ? 'إجمالي المشاهدات' : 'Total Views'}</p>
                        <p className="text-2xl font-bold">2.4M</p>
                        <div className="flex items-center gap-1 text-sm">
                          <ArrowUp className="h-4 w-4" />
                          <span>+12.5%</span>
                        </div>
                      </div>
                      <Eye className="h-8 w-8 opacity-75" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                  <CardContent className="p-6">
                    <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <div className={isArabic ? 'text-right' : ''}>
                        <p className="text-sm opacity-90">{isArabic ? 'معدل التفاعل' : 'Engagement Rate'}</p>
                        <p className="text-2xl font-bold">3.2%</p>
                        <div className="flex items-center gap-1 text-sm">
                          <ArrowUp className="h-4 w-4" />
                          <span>+0.8%</span>
                        </div>
                      </div>
                      <TrendingUp className="h-8 w-8 opacity-75" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                  <CardContent className="p-6">
                    <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <div className={isArabic ? 'text-right' : ''}>
                        <p className="text-sm opacity-90">{isArabic ? 'الوصول' : 'Reach'}</p>
                        <p className="text-2xl font-bold">156K</p>
                        <div className="flex items-center gap-1 text-sm">
                          <ArrowUp className="h-4 w-4" />
                          <span>+8.3%</span>
                        </div>
                      </div>
                      <Users className="h-8 w-8 opacity-75" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  <CardContent className="p-6">
                    <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <div className={isArabic ? 'text-right' : ''}>
                        <p className="text-sm opacity-90">{isArabic ? 'التحويلات' : 'Conversions'}</p>
                        <p className="text-2xl font-bold">1.2K</p>
                        <div className="flex items-center gap-1 text-sm">
                          <ArrowUp className="h-4 w-4" />
                          <span>+15.2%</span>
                        </div>
                      </div>
                      <Target className="h-8 w-8 opacity-75" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className={isArabic ? 'text-right' : ''}>{isArabic ? 'اتجاهات الأداء' : 'Performance Trends'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center text-gray-500">
                      <BarChart3 className="h-16 w-16" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className={isArabic ? 'text-right' : ''}>{isArabic ? 'تحليل المشاعر' : 'Sentiment Analysis'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className={`flex justify-between text-sm mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                          <span className="text-green-600">{isArabic ? 'إيجابي' : 'Positive'}</span>
                          <span>78%</span>
                        </div>
                        <Progress value={78} className="h-3" />
                      </div>
                      <div>
                        <div className={`flex justify-between text-sm mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                          <span className="text-gray-600">{isArabic ? 'محايد' : 'Neutral'}</span>
                          <span>18%</span>
                        </div>
                        <Progress value={18} className="h-3" />
                      </div>
                      <div>
                        <div className={`flex justify-between text-sm mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                          <span className="text-red-600">{isArabic ? 'سلبي' : 'Negative'}</span>
                          <span>4%</span>
                        </div>
                        <Progress value={4} className="h-3" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="campaigns" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className={isArabic ? 'text-right' : ''}>{isArabic ? 'الحملات النشطة' : 'Active Campaigns'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Brand Awareness', 'Product Launch', 'Lead Generation'].map((campaign, index) => (
                      <div key={campaign} className={`flex items-center justify-between p-4 border rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <div className={isArabic ? 'text-right' : ''}>
                          <h4 className="font-medium">{campaign}</h4>
                          <p className="text-sm text-gray-600">
                            {isArabic ? 'جارية' : 'Running'} • {Math.floor(Math.random() * 30) + 1} {isArabic ? 'يوم' : 'days'}
                          </p>
                        </div>
                        <Badge variant="secondary">{[75, 45, 90][index]}%</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className={isArabic ? 'text-right' : ''}>{isArabic ? 'تقويم المحتوى' : 'Content Calendar'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className={`flex justify-between text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <span>{isArabic ? 'جاهز للنشر' : 'Ready to Publish'}</span>
                        <Badge variant="secondary">8</Badge>
                      </div>
                      <div className={`flex justify-between text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <span>{isArabic ? 'في المراجعة' : 'In Review'}</span>
                        <Badge variant="secondary">3</Badge>
                      </div>
                      <div className={`flex justify-between text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <span>{isArabic ? 'مسودات' : 'Drafts'}</span>
                        <Badge variant="secondary">12</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className={isArabic ? 'text-right' : ''}>{isArabic ? 'أداء المحتوى' : 'Content Performance'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className={`flex justify-between text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <span>{isArabic ? 'مشاهدات المدونة' : 'Blog Views'}</span>
                        <span>12,456</span>
                      </div>
                      <div className={`flex justify-between text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <span>{isArabic ? 'مشاركات اجتماعية' : 'Social Shares'}</span>
                        <span>2,341</span>
                      </div>
                      <div className={`flex justify-between text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <span>{isArabic ? 'التفاعل' : 'Engagement'}</span>
                        <span>4.2%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className={isArabic ? 'text-right' : ''}>{isArabic ? 'عائد الاستثمار' : 'ROI'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">4.2x</div>
                      <p className="text-sm text-gray-600">{isArabic ? 'عائد الإعلانات' : 'Return on Ad Spend'}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className={isArabic ? 'text-right' : ''}>{isArabic ? 'الإيرادات' : 'Revenue'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">$52K</div>
                      <p className="text-sm text-gray-600">{isArabic ? 'هذا الشهر' : 'This Month'}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className={isArabic ? 'text-right' : ''}>{isArabic ? 'العملاء الجدد' : 'New Customers'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">284</div>
                      <p className="text-sm text-gray-600">{isArabic ? 'هذا الأسبوع' : 'This Week'}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="agents" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map((agent) => (
                  <Card key={agent.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedAgent(agent)}>
                    <CardContent className="p-6">
                      <div className={`flex items-center gap-3 mb-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <div className="text-2xl">{agent.icon}</div>
                        <div className={isArabic ? 'text-right' : ''}>
                          <h3 className="font-semibold">{agent.name}</h3>
                          <p className="text-sm text-gray-600">{agent.role}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className={`flex justify-between text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
                          <span>{isArabic ? 'المهام المكتملة' : 'Tasks Completed'}</span>
                          <span>{agent.completedTasks}</span>
                        </div>
                        <div className={`flex justify-between text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
                          <span>{isArabic ? 'التقدم' : 'Progress'}</span>
                          <span>{agent.progress}%</span>
                        </div>
                        <Progress value={agent.progress} className="h-2" />
                        <Badge className={`${agent.bgColor} text-white`}>
                          {isArabic ? (agent.status === 'active' ? 'نشط' : agent.status === 'working' ? 'يعمل' : 'في الانتظار') : agent.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Chat Area - 35% */}
        <div className="w-[35%] min-w-[400px] border-l bg-white dark:bg-gray-900 p-6">
          <EnhancedChatSection />
        </div>
      </div>
    </div>
  );
};

export default Agents;
