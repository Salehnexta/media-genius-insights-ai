
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import AdminPanelAccess from '@/components/agents/AdminPanelAccess';
import AgentWorkspaceArea from '@/components/agents/AgentWorkspaceArea';
import EnhancedChatSection from '@/components/dashboard/EnhancedChatSection';
import RTLDashboardStats from '@/components/dashboard/RTLDashboardStats';
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
  Zap,
  Calendar,
  FileText,
  Settings,
  Star,
  CheckCircle,
  Clock,
  Plus,
  Minimize2,
  Maximize2
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
  const [isChatExpanded, setIsChatExpanded] = useState(false);

  // Mock current metrics for chat context
  const currentMetrics = {
    totalUsers: 24567,
    conversionRate: 3.24,
    monthlyRevenue: 123456,
    pageViews: 897654,
    performance: 92
  };

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
        {/* Main Dashboard Area */}
        <div className={`${isChatExpanded ? 'w-[50%]' : 'flex-1'} p-6 transition-all duration-300`}>
          <div className={`flex items-center justify-between mb-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <h1 className={`text-2xl font-bold text-gray-900 dark:text-white ${isArabic ? 'text-right font-arabic' : ''}`}>
              {isArabic ? 'لوحة التحكم الشاملة' : 'Unified Dashboard'}
            </h1>
            <div className={`flex items-center gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <AdminPanelAccess />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsChatExpanded(!isChatExpanded)}
                className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}
              >
                {isChatExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                {isArabic ? 'المحادثة' : 'Chat'}
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6" dir={isArabic ? 'rtl' : 'ltr'}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">{isArabic ? 'نظرة عامة' : 'Overview'}</TabsTrigger>
              <TabsTrigger value="campaigns">{isArabic ? 'الحملات' : 'Campaigns'}</TabsTrigger>
              <TabsTrigger value="content">{isArabic ? 'المحتوى' : 'Content'}</TabsTrigger>
              <TabsTrigger value="analytics">{isArabic ? 'التحليلات' : 'Analytics'}</TabsTrigger>
              <TabsTrigger value="agents">{isArabic ? 'الوكلاء' : 'AI Team'}</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Enhanced Metrics */}
              <RTLDashboardStats />

              {/* Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      {isArabic ? 'الإنجازات الأخيرة' : 'Recent Achievements'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className={`flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <span className={`text-sm font-medium text-green-800 dark:text-green-200 ${isArabic ? 'text-right' : ''}`}>
                          {isArabic ? 'تحسن معدل التحويل بنسبة 24%' : 'Conversion rate improved by 24%'}
                        </span>
                        <span className="text-green-600 font-bold">✓</span>
                      </div>
                      <div className={`flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <span className={`text-sm font-medium text-blue-800 dark:text-blue-200 ${isArabic ? 'text-right' : ''}`}>
                          {isArabic ? 'إطلاق 5 حملات تسويقية جديدة' : 'Launched 5 new marketing campaigns'}
                        </span>
                        <span className="text-blue-600 font-bold">✓</span>
                      </div>
                      <div className={`flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <span className={`text-sm font-medium text-purple-800 dark:text-purple-200 ${isArabic ? 'text-right' : ''}`}>
                          {isArabic ? 'زيادة المتابعين بنسبة 35%' : 'Social followers increased by 35%'}
                        </span>
                        <span className="text-purple-600 font-bold">✓</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
                      <Clock className="h-5 w-5 text-orange-500" />
                      {isArabic ? 'المهام القادمة' : 'Upcoming Tasks'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className={`flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <span className={`text-sm font-medium text-yellow-800 dark:text-yellow-200 ${isArabic ? 'text-right' : ''}`}>
                          {isArabic ? 'مراجعة محتوى الأسبوع القادم' : 'Review next week\'s content'}
                        </span>
                        <span className="text-yellow-600 font-bold">📋</span>
                      </div>
                      <div className={`flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <span className={`text-sm font-medium text-orange-800 dark:text-orange-200 ${isArabic ? 'text-right' : ''}`}>
                          {isArabic ? 'تحليل أداء الحملة الحالية' : 'Analyze current campaign performance'}
                        </span>
                        <span className="text-orange-600 font-bold">📊</span>
                      </div>
                      <div className={`flex items-center justify-between p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <span className={`text-sm font-medium text-pink-800 dark:text-pink-200 ${isArabic ? 'text-right' : ''}`}>
                          {isArabic ? 'جدولة منشورات وسائل التواصل' : 'Schedule social media posts'}
                        </span>
                        <span className="text-pink-600 font-bold">📱</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Team Performance Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className={isArabic ? 'text-right font-arabic' : ''}>{isArabic ? 'أداء الفريق' : 'Team Performance'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {agents.map((agent) => (
                      <div key={agent.id} className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-2">{agent.icon}</div>
                        <h4 className="font-medium text-sm mb-1">{agent.name}</h4>
                        <div className="space-y-2">
                          <Progress value={agent.progress} className="h-2" />
                          <p className="text-xs text-gray-600">{agent.progress}% {isArabic ? 'منجز' : 'complete'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="campaigns" className="space-y-6">
              {/* Campaign Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <CardContent className="p-6">
                    <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <div className={isArabic ? 'text-right' : ''}>
                        <p className="text-sm opacity-90">{isArabic ? 'الحملات النشطة' : 'Active Campaigns'}</p>
                        <p className="text-2xl font-bold">12</p>
                        <div className="flex items-center gap-1 text-sm">
                          <ArrowUp className="h-4 w-4" />
                          <span>+3</span>
                        </div>
                      </div>
                      <Target className="h-8 w-8 opacity-75" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                  <CardContent className="p-6">
                    <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <div className={isArabic ? 'text-right' : ''}>
                        <p className="text-sm opacity-90">{isArabic ? 'معدل النجاح' : 'Success Rate'}</p>
                        <p className="text-2xl font-bold">94%</p>
                        <div className="flex items-center gap-1 text-sm">
                          <ArrowUp className="h-4 w-4" />
                          <span>+4%</span>
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
                        <p className="text-sm opacity-90">{isArabic ? 'العائد على الاستثمار' : 'ROAS'}</p>
                        <p className="text-2xl font-bold">4.2x</p>
                        <div className="flex items-center gap-1 text-sm">
                          <ArrowUp className="h-4 w-4" />
                          <span>+0.3x</span>
                        </div>
                      </div>
                      <DollarSign className="h-8 w-8 opacity-75" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  <CardContent className="p-6">
                    <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <div className={isArabic ? 'text-right' : ''}>
                        <p className="text-sm opacity-90">{isArabic ? 'الميزانية المتبقية' : 'Budget Remaining'}</p>
                        <p className="text-2xl font-bold">$52K</p>
                        <div className="flex items-center gap-1 text-sm">
                          <span>68%</span>
                        </div>
                      </div>
                      <BarChart3 className="h-8 w-8 opacity-75" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Active Campaigns */}
              <Card>
                <CardHeader>
                  <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <CardTitle className={isArabic ? 'text-right font-arabic' : ''}>{isArabic ? 'الحملات النشطة' : 'Active Campaigns'}</CardTitle>
                    <Button className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <Plus className="h-4 w-4" />
                      {isArabic ? 'حملة جديدة' : 'New Campaign'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: isArabic ? 'حملة الوعي بالعلامة التجارية' : 'Brand Awareness Campaign', progress: 75, status: 'active', budget: '$15K' },
                      { name: isArabic ? 'إطلاق المنتج الجديد' : 'Product Launch', progress: 45, status: 'running', budget: '$25K' },
                      { name: isArabic ? 'توليد العملاء المحتملين' : 'Lead Generation', progress: 90, status: 'completing', budget: '$12K' }
                    ].map((campaign, index) => (
                      <div key={index} className={`flex items-center justify-between p-4 border rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <div className={isArabic ? 'text-right' : ''}>
                          <h4 className="font-medium">{campaign.name}</h4>
                          <p className="text-sm text-gray-600">
                            {campaign.status === 'active' ? (isArabic ? 'نشطة' : 'Active') : 
                             campaign.status === 'running' ? (isArabic ? 'قيد التشغيل' : 'Running') : 
                             (isArabic ? 'على وشك الانتهاء' : 'Completing')} • {campaign.budget}
                          </p>
                          <div className="w-48 mt-2">
                            <Progress value={campaign.progress} className="h-2" />
                          </div>
                        </div>
                        <Badge variant="secondary">{campaign.progress}%</Badge>
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
                    <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
                      <Calendar className="h-5 w-5" />
                      {isArabic ? 'تقويم المحتوى' : 'Content Calendar'}
                    </CardTitle>
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
                      <div className={`flex justify-between text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <span>{isArabic ? 'مجدولة' : 'Scheduled'}</span>
                        <Badge variant="secondary">15</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
                      <FileText className="h-5 w-5" />
                      {isArabic ? 'أداء المحتوى' : 'Content Performance'}
                    </CardTitle>
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
                      <div className={`flex justify-between text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <span>{isArabic ? 'معدل التحويل' : 'Conversion Rate'}</span>
                        <span>2.8%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Content Creation Tools */}
              <Card>
                <CardHeader>
                  <CardTitle className={isArabic ? 'text-right font-arabic' : ''}>{isArabic ? 'أدوات إنشاء المحتوى' : 'Content Creation Tools'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className={`h-20 flex flex-col gap-2 ${isArabic ? 'font-arabic' : ''}`}>
                      <PenTool className="h-6 w-6" />
                      {isArabic ? 'كاتب المحتوى الذكي' : 'AI Content Writer'}
                    </Button>
                    <Button variant="outline" className={`h-20 flex flex-col gap-2 ${isArabic ? 'font-arabic' : ''}`}>
                      <Eye className="h-6 w-6" />
                      {isArabic ? 'مولد الصور' : 'Image Generator'}
                    </Button>
                    <Button variant="outline" className={`h-20 flex flex-col gap-2 ${isArabic ? 'font-arabic' : ''}`}>
                      <Calendar className="h-6 w-6" />
                      {isArabic ? 'جدولة المنشورات' : 'Post Scheduler'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className={isArabic ? 'text-right font-arabic' : ''}>{isArabic ? 'عائد الاستثمار' : 'ROI'}</CardTitle>
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
                    <CardTitle className={isArabic ? 'text-right font-arabic' : ''}>{isArabic ? 'الإيرادات' : 'Revenue'}</CardTitle>
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
                    <CardTitle className={isArabic ? 'text-right font-arabic' : ''}>{isArabic ? 'العملاء الجدد' : 'New Customers'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">284</div>
                      <p className="text-sm text-gray-600">{isArabic ? 'هذا الأسبوع' : 'This Week'}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className={isArabic ? 'text-right font-arabic' : ''}>{isArabic ? 'اتجاهات الأداء' : 'Performance Trends'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center text-gray-500">
                      <BarChart3 className="h-16 w-16" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className={isArabic ? 'text-right font-arabic' : ''}>{isArabic ? 'تحليل المشاعر' : 'Sentiment Analysis'}</CardTitle>
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

        {/* Enhanced Chat Area */}
        <div className={`${isChatExpanded ? 'w-[50%]' : 'w-[35%]'} min-w-[400px] border-l bg-white dark:bg-gray-900 p-6 transition-all duration-300`}>
          <div className="h-full">
            <EnhancedChatSection currentMetrics={currentMetrics} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agents;
