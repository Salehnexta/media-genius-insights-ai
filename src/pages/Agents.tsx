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
  Maximize2,
  Globe,
  Lightbulb,
  Award,
  Rocket
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
      <DashboardHeader />
      
      <div className="flex h-[calc(100vh-4rem)]" dir={isArabic ? 'rtl' : 'ltr'}>
        {/* Main Dashboard Area */}
        <div className={`${isChatExpanded ? 'w-[50%]' : 'flex-1'} transition-all duration-300`}>
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
            <div className="px-8 py-16">
              <div className={`max-w-4xl mx-auto text-center ${isArabic ? 'font-arabic' : ''}`}>
                <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${isArabic ? 'leading-relaxed' : ''}`}>
                  {isArabic ? 'مستقبل التسويق الرقمي' : 'The Future of Digital Marketing'}
                </h1>
                <h2 className={`text-2xl md:text-3xl font-semibold mb-8 text-blue-100 ${isArabic ? 'leading-relaxed' : ''}`}>
                  {isArabic ? 'مدعوم بالذكاء الاصطناعي' : 'Powered by Artificial Intelligence'}
                </h2>
                <p className={`text-xl mb-8 text-blue-50 max-w-3xl mx-auto ${isArabic ? 'leading-relaxed' : ''}`}>
                  {isArabic 
                    ? 'حول أفكارك التسويقية إلى حملات ناجحة باستخدام فريق الذكاء الاصطناعي الأكثر تطوراً في السوق'
                    : 'Transform your marketing ideas into successful campaigns with the most advanced AI team in the market'
                  }
                </p>
                <div className={`flex items-center justify-center gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-full shadow-lg">
                    {isArabic ? 'ابدأ معنا' : 'Get Started'}
                  </Button>
                  <Button variant="ghost" size="lg" className="text-white border-white hover:bg-white/10 px-8 py-4 text-lg rounded-full">
                    {isArabic ? 'خطة الأسعار' : 'View Pricing'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="px-8 py-16 bg-white dark:bg-gray-900">
            <div className="max-w-6xl mx-auto">
              <div className={`text-center mb-16 ${isArabic ? 'font-arabic' : ''}`}>
                <h3 className={`text-3xl font-bold text-gray-900 dark:text-white mb-4 ${isArabic ? 'leading-relaxed' : ''}`}>
                  {isArabic ? 'ميزات متقدمة' : 'Advanced Features'}
                </h3>
                <p className={`text-xl text-gray-600 dark:text-gray-300 ${isArabic ? 'leading-relaxed' : ''}`}>
                  {isArabic 
                    ? 'اكتشف مجموعة شاملة من الأدوات المدعومة بالذكاء الاصطناعي'
                    : 'Discover a comprehensive suite of AI-powered marketing tools'
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Feature Cards */}
                <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
                  <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className={`text-xl font-semibold mb-4 text-gray-900 dark:text-white ${isArabic ? 'font-arabic' : ''}`}>
                    {isArabic ? 'ذكاء اصطناعي متقدم' : 'Advanced AI Intelligence'}
                  </h4>
                  <p className={`text-gray-600 dark:text-gray-300 ${isArabic ? 'leading-relaxed' : ''}`}>
                    {isArabic 
                      ? 'تقنيات ذكية تحلل السوق وتوجه قراراتك التسويقية'
                      : 'Intelligent technologies that analyze markets and guide your marketing decisions'
                    }
                  </p>
                </Card>

                <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                  <div className="w-16 h-16 mx-auto mb-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <Target className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className={`text-xl font-semibold mb-4 text-gray-900 dark:text-white ${isArabic ? 'font-arabic' : ''}`}>
                    {isArabic ? 'استهداف دقيق' : 'Precise Targeting'}
                  </h4>
                  <p className={`text-gray-600 dark:text-gray-300 ${isArabic ? 'leading-relaxed' : ''}`}>
                    {isArabic 
                      ? 'استهدف جمهورك المثالي بدقة عالية لتحقيق أفضل النتائج'
                      : 'Target your ideal audience with high precision for optimal results'
                    }
                  </p>
                </Card>

                <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                  <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h4 className={`text-xl font-semibold mb-4 text-gray-900 dark:text-white ${isArabic ? 'font-arabic' : ''}`}>
                    {isArabic ? 'تحليلات شاملة' : 'Comprehensive Analytics'}
                  </h4>
                  <p className={`text-gray-600 dark:text-gray-300 ${isArabic ? 'leading-relaxed' : ''}`}>
                    {isArabic 
                      ? 'تقارير مفصلة وتحليلات متقدمة لقياس أداء حملاتك'
                      : 'Detailed reports and advanced analytics to measure campaign performance'
                    }
                  </p>
                </Card>

                <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
                  <div className="w-16 h-16 mx-auto mb-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                    <Zap className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h4 className={`text-xl font-semibold mb-4 text-gray-900 dark:text-white ${isArabic ? 'font-arabic' : ''}`}>
                    {isArabic ? 'أتمتة ذكية' : 'Intelligent Automation'}
                  </h4>
                  <p className={`text-gray-600 dark:text-gray-300 ${isArabic ? 'leading-relaxed' : ''}`}>
                    {isArabic 
                      ? 'أتمت مهامك التسويقية ووفر الوقت والجهد'
                      : 'Automate your marketing tasks and save time and effort'
                    }
                  </p>
                </Card>
              </div>
            </div>
          </div>

          {/* Dashboard Tabs */}
          <div className="px-8 py-8">
            <div className="max-w-7xl mx-auto">
              <div className={`flex items-center justify-between mb-8 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <h2 className={`text-2xl font-bold text-gray-900 dark:text-white ${isArabic ? 'text-right font-arabic' : ''}`}>
                  {isArabic ? 'لوحة التحكم المتقدمة' : 'Advanced Dashboard'}
                </h2>
                <div className={`flex items-center gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <AdminPanelAccess />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsChatExpanded(!isChatExpanded)}
                    className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}
                  >
                    {isChatExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                    {isArabic ? 'المحادثة' : 'AI Chat'}
                  </Button>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8" dir={isArabic ? 'rtl' : 'ltr'}>
                <TabsList className="grid w-full grid-cols-5 bg-gray-100 dark:bg-gray-800 p-2 rounded-xl">
                  <TabsTrigger value="overview" className="rounded-lg">{isArabic ? 'نظرة عامة' : 'Overview'}</TabsTrigger>
                  <TabsTrigger value="campaigns" className="rounded-lg">{isArabic ? 'الحملات' : 'Campaigns'}</TabsTrigger>
                  <TabsTrigger value="content" className="rounded-lg">{isArabic ? 'المحتوى' : 'Content'}</TabsTrigger>
                  <TabsTrigger value="analytics" className="rounded-lg">{isArabic ? 'التحليلات' : 'Analytics'}</TabsTrigger>
                  <TabsTrigger value="agents" className="rounded-lg">{isArabic ? 'الوكلاء' : 'AI Team'}</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-8">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                      <CardContent className="p-6">
                        <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                          <div className={isArabic ? 'text-right' : ''}>
                            <p className="text-sm opacity-90">{isArabic ? 'إجمالي المستخدمين' : 'Total Users'}</p>
                            <p className="text-3xl font-bold">24,567</p>
                            <p className="text-sm opacity-75">+12% {isArabic ? 'هذا الشهر' : 'this month'}</p>
                          </div>
                          <Users className="h-10 w-10 opacity-75" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
                      <CardContent className="p-6">
                        <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                          <div className={isArabic ? 'text-right' : ''}>
                            <p className="text-sm opacity-90">{isArabic ? 'معدل التحويل' : 'Conversion Rate'}</p>
                            <p className="text-3xl font-bold">3.24%</p>
                            <p className="text-sm opacity-75">+0.4% {isArabic ? 'من الأسبوع الماضي' : 'from last week'}</p>
                          </div>
                          <TrendingUp className="h-10 w-10 opacity-75" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
                      <CardContent className="p-6">
                        <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                          <div className={isArabic ? 'text-right' : ''}>
                            <p className="text-sm opacity-90">{isArabic ? 'الإيرادات الشهرية' : 'Monthly Revenue'}</p>
                            <p className="text-3xl font-bold">$123K</p>
                            <p className="text-sm opacity-75">+8.2% {isArabic ? 'شهرياً' : 'monthly'}</p>
                          </div>
                          <DollarSign className="h-10 w-10 opacity-75" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
                      <CardContent className="p-6">
                        <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                          <div className={isArabic ? 'text-right' : ''}>
                            <p className="text-sm opacity-90">{isArabic ? 'تقييم الأداء' : 'Performance Score'}</p>
                            <p className="text-3xl font-bold">92/100</p>
                            <p className="text-sm opacity-75">+5 {isArabic ? 'نقاط' : 'points'}</p>
                          </div>
                          <Star className="h-10 w-10 opacity-75" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

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

                <TabsContent value="campaigns" className="space-y-8">
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

                <TabsContent value="content" className="space-y-8">
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

                <TabsContent value="analytics" className="space-y-8">
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

                <TabsContent value="agents" className="space-y-8">
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
          </div>
        </div>

        {/* Enhanced Chat Area */}
        <div className={`${isChatExpanded ? 'w-[50%]' : 'w-[35%]'} min-w-[400px] border-l bg-white dark:bg-gray-900 p-6 transition-all duration-300`}>
          <div className="h-full p-6">
            <EnhancedChatSection currentMetrics={currentMetrics} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agents;
