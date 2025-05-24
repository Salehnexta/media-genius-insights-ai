import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import AdminPanelAccess from '@/components/agents/AdminPanelAccess';
import AgentWorkspaceArea from '@/components/agents/AgentWorkspaceArea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  ThumbsUp
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

interface Message {
  id: string;
  content: string;
  sender: 'agent' | 'user';
  timestamp: Date;
}

const Agents: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

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
        {/* Left Sidebar with Tabs - Fixed 35% */}
        <div className="w-[35%] min-w-[400px] bg-white dark:bg-gray-900 border-r flex flex-col" style={{ order: isArabic ? 2 : 1 }}>
          
          <Tabs defaultValue="marketing-manager" className="flex-1 flex flex-col h-full" dir={isArabic ? 'rtl' : 'ltr'}>
            <div className="p-4 border-b">
              <div className={`flex items-center justify-between mb-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <h2 className={`text-lg font-semibold text-gray-900 dark:text-white ${isArabic ? 'text-right font-arabic' : ''}`}>
                  {isArabic ? 'فريق التسويق الذكي' : 'AI Marketing Team'}
                </h2>
                <AdminPanelAccess />
              </div>
              
              <TabsList className="grid w-full grid-cols-5 h-12" dir={isArabic ? 'rtl' : 'ltr'}>
                {agents.map((agent) => (
                  <TabsTrigger 
                    key={agent.id} 
                    value={agent.id}
                    className="text-xs p-2 flex flex-col items-center gap-1"
                    onClick={() => setSelectedAgent(agent)}
                  >
                    <span className="text-lg">{agent.icon}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Marketing Manager Tab */}
            <TabsContent value="marketing-manager" className="flex-1 p-4 space-y-4 overflow-auto">
              <div className="text-center">
                <div className="text-3xl mb-2">🧠</div>
                <h3 className={`font-semibold ${isArabic ? 'text-right' : ''}`}>{isArabic ? 'مدير التسويق الذكي' : 'Marketing Manager'}</h3>
                <p className={`text-sm text-gray-600 ${isArabic ? 'text-right' : ''}`}>{isArabic ? 'الاستراتيجية وتنسيق الحملات' : 'Strategy & Campaign Coordination'}</p>
                <Badge className="mt-2 bg-green-500">{isArabic ? 'نشط' : 'Active'}</Badge>
              </div>

              {/* Metric Cards Row */}
              <div className="grid grid-cols-2 gap-3">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <CardContent className="p-3">
                    <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <div className={isArabic ? 'text-right' : ''}>
                        <p className="text-xs opacity-90">{isArabic ? 'إجمالي المشاهدات' : 'Total Views'}</p>
                        <p className="text-lg font-bold">2.4M</p>
                        <div className="flex items-center gap-1 text-xs">
                          <ArrowUp className="h-3 w-3" />
                          <span>+12.5%</span>
                        </div>
                      </div>
                      <Eye className="h-6 w-6 opacity-75" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                  <CardContent className="p-3">
                    <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <div className={isArabic ? 'text-right' : ''}>
                        <p className="text-xs opacity-90">{isArabic ? 'معدل التفاعل' : 'Engagement Rate'}</p>
                        <p className="text-lg font-bold">3.2%</p>
                        <div className="flex items-center gap-1 text-xs">
                          <ArrowUp className="h-3 w-3" />
                          <span>+0.8%</span>
                        </div>
                      </div>
                      <TrendingUp className="h-6 w-6 opacity-75" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                  <CardContent className="p-3">
                    <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <div className={isArabic ? 'text-right' : ''}>
                        <p className="text-xs opacity-90">{isArabic ? 'الوصول' : 'Reach'}</p>
                        <p className="text-lg font-bold">156K</p>
                        <div className="flex items-center gap-1 text-xs">
                          <ArrowUp className="h-3 w-3" />
                          <span>+8.3%</span>
                        </div>
                      </div>
                      <Users className="h-6 w-6 opacity-75" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  <CardContent className="p-3">
                    <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <div className={isArabic ? 'text-right' : ''}>
                        <p className="text-xs opacity-90">{isArabic ? 'التحويلات' : 'Conversions'}</p>
                        <p className="text-lg font-bold">1.2K</p>
                        <div className="flex items-center gap-1 text-xs">
                          <ArrowUp className="h-3 w-3" />
                          <span>+15.2%</span>
                        </div>
                      </div>
                      <Target className="h-6 w-6 opacity-75" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Cards */}
              <div className="grid grid-cols-2 gap-3">
                <Card className="bg-gradient-to-br from-purple-500 to-purple-700 text-white cursor-pointer hover:scale-105 transition-transform">
                  <CardContent className="p-4">
                    <div className={`flex flex-col items-center text-center ${isArabic ? 'text-right' : ''}`}>
                      <Zap className="h-8 w-8 mb-2" />
                      <h4 className="font-semibold">{isArabic ? 'إنشاء الحملات' : 'Create Campaigns'}</h4>
                      <p className="text-xs opacity-90">{isArabic ? 'أفكار لحملات جديدة' : 'New campaign ideas'}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white cursor-pointer hover:scale-105 transition-transform">
                  <CardContent className="p-4">
                    <div className={`flex flex-col items-center text-center ${isArabic ? 'text-right' : ''}`}>
                      <BarChart className="h-8 w-8 mb-2" />
                      <h4 className="font-semibold">{isArabic ? 'تحليل الحملات' : 'Campaign Analytics'}</h4>
                      <p className="text-xs opacity-90">{isArabic ? 'تحليل أداء حملاتك التسويقية' : 'Analyze marketing performance'}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500 to-orange-700 text-white cursor-pointer hover:scale-105 transition-transform">
                  <CardContent className="p-4">
                    <div className={`flex flex-col items-center text-center ${isArabic ? 'text-right' : ''}`}>
                      <TrendingUp className="h-8 w-8 mb-2" />
                      <h4 className="font-semibold">{isArabic ? 'الاتجاهات' : 'Trends'}</h4>
                      <p className="text-xs opacity-90">{isArabic ? 'آخر الاتجاهات في السوق' : 'Latest market trends'}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500 to-green-700 text-white cursor-pointer hover:scale-105 transition-transform">
                  <CardContent className="p-4">
                    <div className={`flex flex-col items-center text-center ${isArabic ? 'text-right' : ''}`}>
                      <Users2 className="h-8 w-8 mb-2" />
                      <h4 className="font-semibold">{isArabic ? 'تحليل الجمهور' : 'Audience Analysis'}</h4>
                      <p className="text-xs opacity-90">{isArabic ? 'فهم جمهورك المستهدف' : 'Understand your audience'}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Section */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className={`text-sm ${isArabic ? 'text-right' : ''}`}>{isArabic ? 'بيانات الأداء الأسبوعي' : 'Weekly Performance'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className={`flex justify-between text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span>{isArabic ? 'المشاهدات' : 'Views'}</span>
                      <span>34.2K</span>
                    </div>
                    <div className={`flex justify-between text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span>{isArabic ? 'التفاعل' : 'Engagement'}</span>
                      <span>8.4%</span>
                    </div>
                    <div className={`flex justify-between text-sm text-green-600 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span>{isArabic ? 'النمو' : 'Growth'}</span>
                      <span>+23%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Best Campaigns */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className={`text-sm ${isArabic ? 'text-right' : ''}`}>{isArabic ? 'أفضل الحملات' : 'Best Campaigns'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className={`flex justify-between text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <span>{isArabic ? 'حملة الصيف 2024' : 'Summer 2024'}</span>
                    <Badge variant="secondary">94% CTR</Badge>
                  </div>
                  <div className={`flex justify-between text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <span>{isArabic ? 'منتج جديد' : 'New Product'}</span>
                    <Badge variant="secondary">87% CTR</Badge>
                  </div>
                  <div className={`flex justify-between text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <span>{isArabic ? 'عروض رمضان' : 'Ramadan Offers'}</span>
                    <Badge variant="secondary">92% CTR</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Chat Input */}
              <div className="border-t pt-3">
                <div className={`flex gap-2 ${isArabic ? 'space-x-reverse' : ''}`}>
                  <Input
                    placeholder={isArabic ? 'اكتب رسالتك هنا...' : 'Type your message...'}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className={`flex-1 text-sm ${isArabic ? 'text-right' : ''}`}
                  />
                  <Button size="sm" className="px-3">
                    <Send className="h-3 w-3" />
                  </Button>
                </div>
                <p className={`text-xs text-gray-500 mt-2 ${isArabic ? 'text-right' : ''}`}>
                  {isArabic ? 'مثال: "كيف يمكنني تحسين حملاتي الإعلانية؟"' : 'Example: "How can I improve my advertising campaigns?"'}
                </p>
              </div>
            </TabsContent>

            {/* Content & SEO Tab */}
            <TabsContent value="content-seo" className="flex-1 p-4 space-y-4 overflow-auto">
              <div className="text-center">
                <div className="text-3xl mb-2">📝</div>
                <h3 className={`font-semibold ${isArabic ? 'text-right' : ''}`}>{isArabic ? 'أخصائي المحتوى والسيو' : 'Content & SEO Specialist'}</h3>
                <p className={`text-sm text-gray-600 ${isArabic ? 'text-right' : ''}`}>{isArabic ? 'إنشاء المحتوى وتحسين محركات البحث' : 'Content Creation & SEO'}</p>
                <Badge className="mt-2 bg-green-500">{isArabic ? 'يعمل' : 'Working'}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-xs text-gray-600">{isArabic ? 'زوار المدونة' : 'Blog Traffic'}</p>
                        <p className="font-semibold">12,456</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="text-xs text-gray-600">{isArabic ? 'كلمات مفتاحية' : 'Keywords'}</p>
                        <p className="font-semibold">156</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className={`text-sm ${isArabic ? 'text-right' : ''}`}>{isArabic ? 'المحتوى الحالي' : 'Content Pipeline'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>{isArabic ? 'أفكار' : 'Ideas'}</span>
                    <Badge variant="secondary">12</Badge>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>{isArabic ? 'مسودات' : 'Drafts'}</span>
                    <Badge variant="secondary">5</Badge>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>{isArabic ? 'مراجعة' : 'Review'}</span>
                    <Badge variant="secondary">3</Badge>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>{isArabic ? 'منشور' : 'Live'}</span>
                    <Badge variant="secondary">2</Badge>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" variant="outline">{isArabic ? 'كتابة مقال' : 'Write Article'}</Button>
                <Button size="sm" variant="outline">{isArabic ? 'تحليل السيو' : 'SEO Analysis'}</Button>
              </div>
            </TabsContent>

            {/* Social Content Creator Tab */}
            <TabsContent value="social-creator" className="flex-1 p-4 space-y-4 overflow-auto">
              <div className="text-center">
                <div className="text-3xl mb-2">📱</div>
                <h3 className={`font-semibold ${isArabic ? 'text-right' : ''}`}>{isArabic ? 'منشئ المحتوى الاجتماعي' : 'Social Content Creator'}</h3>
                <p className={`text-sm text-gray-600 ${isArabic ? 'text-right' : ''}`}>{isArabic ? 'إنشاء ونشر المحتوى الاجتماعي' : 'Content Creation & Publishing'}</p>
                <Badge className="mt-2 bg-purple-500">{isArabic ? 'نشط' : 'Active'}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4 text-purple-500" />
                      <div>
                        <p className="text-xs text-gray-600">{isArabic ? 'التفاعل' : 'Engagement'}</p>
                        <p className="font-semibold">4.2%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="text-xs text-gray-600">{isArabic ? 'النمو' : 'Growth'}</p>
                        <p className="font-semibold">+12%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className={`text-sm ${isArabic ? 'text-right' : ''}`}>{isArabic ? 'تقويم المحتوى' : 'Content Calendar'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>{isArabic ? 'جاهز للنشر' : 'Ready'}</span>
                    <Badge variant="secondary">8</Badge>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>{isArabic ? 'في المراجعة' : 'Review'}</span>
                    <Badge variant="secondary">3</Badge>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>{isArabic ? 'مسودات' : 'Drafts'}</span>
                    <Badge variant="secondary">12</Badge>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>{isArabic ? 'أفكار' : 'Ideas'}</span>
                    <Badge variant="secondary">25</Badge>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" variant="outline">{isArabic ? 'إنشاء منشور' : 'Create Post'}</Button>
                <Button size="sm" variant="outline">{isArabic ? 'جدولة المحتوى' : 'Schedule Content'}</Button>
              </div>
            </TabsContent>

            {/* Social CX Manager Tab */}
            <TabsContent value="social-cx" className="flex-1 p-4 space-y-4 overflow-auto">
              <div className="text-center">
                <div className="text-3xl mb-2">👥</div>
                <h3 className={`font-semibold ${isArabic ? 'text-right' : ''}`}>{isArabic ? 'مدير التجربة الاجتماعية' : 'Social CX Manager'}</h3>
                <p className={`text-sm text-gray-600 ${isArabic ? 'text-right' : ''}`}>{isArabic ? 'المراقبة وتجربة العملاء' : 'Brand Monitoring & Customer Experience'}</p>
                <Badge className="mt-2 bg-pink-500">{isArabic ? 'نشط' : 'Active'}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-pink-500" />
                      <div>
                        <p className="text-xs text-gray-600">{isArabic ? 'ذكر العلامة' : 'Mentions'}</p>
                        <p className="font-semibold">47</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="text-xs text-gray-600">{isArabic ? 'المشاعر الإيجابية' : 'Positive'}</p>
                        <p className="font-semibold">78%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className={`text-sm ${isArabic ? 'text-right' : ''}`}>{isArabic ? 'تحليل المشاعر' : 'Sentiment Analysis'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <div className={`flex justify-between text-xs mb-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span className="text-green-600">{isArabic ? 'إيجابي' : 'Positive'}</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className={`flex justify-between text-xs mb-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span className="text-gray-600">{isArabic ? 'محايد' : 'Neutral'}</span>
                      <span>18%</span>
                    </div>
                    <Progress value={18} className="h-2" />
                  </div>
                  <div>
                    <div className={`flex justify-between text-xs mb-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span className="text-red-600">{isArabic ? 'سلبي' : 'Negative'}</span>
                      <span>4%</span>
                    </div>
                    <Progress value={4} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" variant="outline">{isArabic ? 'تقرير المشاعر' : 'Sentiment Report'}</Button>
                <Button size="sm" variant="outline">{isArabic ? 'مراقبة المنافسين' : 'Monitor Competitors'}</Button>
              </div>
            </TabsContent>

            {/* Campaign Performance Tab */}
            <TabsContent value="campaign-performance" className="flex-1 p-4 space-y-4 overflow-auto">
              <div className="text-center">
                <div className="text-3xl mb-2">📊</div>
                <h3 className={`font-semibold ${isArabic ? 'text-right' : ''}`}>{isArabic ? 'أخصائي الحملات والأداء' : 'Campaign & Performance Specialist'}</h3>
                <p className={`text-sm text-gray-600 ${isArabic ? 'text-right' : ''}`}>{isArabic ? 'إدارة الحملات وتحليل الأداء' : 'Campaign Management & Performance Analytics'}</p>
                <Badge className="mt-2 bg-orange-500">{isArabic ? 'نشط' : 'Active'}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-orange-500" />
                      <div>
                        <p className="text-xs text-gray-600">{isArabic ? 'عائد الإعلان' : 'ROAS'}</p>
                        <p className="font-semibold">4.2x</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="text-xs text-gray-600">{isArabic ? 'الإيرادات' : 'Revenue'}</p>
                        <p className="font-semibold">$52K</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className={`text-sm ${isArabic ? 'text-right' : ''}`}>{isArabic ? 'الحملات النشطة' : 'Active Campaigns'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <div className={`flex justify-between text-xs mb-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span>{isArabic ? 'حملة الوعي' : 'Brand Awareness'}</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className={`flex justify-between text-xs mb-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span>{isArabic ? 'إطلاق المنتج' : 'Product Launch'}</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className={`flex justify-between text-xs mb-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span>{isArabic ? 'جذب العملاء' : 'Lead Generation'}</span>
                      <span>90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" variant="outline">{isArabic ? 'حملة جديدة' : 'New Campaign'}</Button>
                <Button size="sm" variant="outline">{isArabic ? 'تحسين الأداء' : 'Optimize Performance'}</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Agent Workspace - 65% */}
        <div className="flex-1 bg-gray-50 dark:bg-gray-950" style={{ order: isArabic ? 1 : 2 }}>
          <AgentWorkspaceArea 
            selectedAgent={selectedAgent}
            isArabic={isArabic}
          />
        </div>
      </div>
    </div>
  );
};

export default Agents;
