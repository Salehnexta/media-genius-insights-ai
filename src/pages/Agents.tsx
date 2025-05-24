
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
  Target
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

  const quickActions = [
    { label: isArabic ? 'إنشاء' : 'Generate', icon: TrendingUp },
    { label: isArabic ? 'تحليل' : 'Analyze', icon: BarChart3 },
    { label: isArabic ? 'إنشاء' : 'Create', icon: PenTool },
    { label: isArabic ? 'تحسين' : 'Optimize', icon: Target }
  ];

  const getWelcomeMessage = (agent: Agent) => {
    if (isArabic) {
      switch (agent.specialization) {
        case 'marketing-manager':
          return `مرحباً! أنا مدير التسويق الذكي. أتولى الاستراتيجية العامة وتنسيق الفريق.\n\nالحالة الحالية:\n- تحليل أداء الربع الأول (${agent.progress}% مكتمل)\n- 4 أعضاء فريق يؤدون بشكل جيد\n- العائد على الاستثمار 456% - نتائج ممتازة!\n\nيمكنني مساعدتك في:\n- 'إظهار أداء الفريق'\n- 'إنشاء تقرير تنفيذي'\n- 'تعديل الميزانيات'\n- 'وضع أهداف جديدة'\n\nعلى ماذا تريد العمل؟`;
        case 'content-seo':
          return `مرحباً! أنا أخصائي المحتوى والسيو. أقوم بإنشاء وتحسين جميع المحتوى المكتوب.\n\nما أعمل عليه:\n- إنهاء "دليل التسويق بالذكاء الاصطناعي" (${agent.progress}% تم)\n- البحث في "قائمة السيو 2024"\n- مراقبة 156 كلمة مفتاحية (ترتيب جيد!)\n\nقدراتي:\n- 'اكتب مقال عن [الموضوع]'\n- 'تحقق من أداء السيو'\n- 'أنشئ تقويم محتوى'\n- 'ابحث عن فرص الكلمات المفتاحية'\n\nحركة مرور مدونتك ارتفعت 23% هذا الشهر! ما المحتوى الذي يجب أن ننشئه بعد ذلك؟`;
        case 'social-creator':
          return `مرحباً! أنا منشئ المحتوى الاجتماعي! أقوم بإنشاء جميع منشوراتك الاجتماعية وإدارة النشر.\n\nخطة هذا الأسبوع:\n- 15 منشور عبر 5 منصات\n- حالياً أنشئ كاروسيل إنستغرام (${agent.progress}% تم)\n- أفضل وقت للتفاعل 6 مساءً\n\nيمكنني مساعدتك في:\n- 'أنشئ منشورات عن [الموضوع]'\n- 'جدولة محتوى هذا الأسبوع'\n- 'إظهار أفضل المنشورات أداءً'\n- 'إنشاء هاشتاغات رائجة'\n\nتفاعل إنستغرام ارتفع 12%! ما موضوع المحتوى الذي يجب أن نركز عليه بعد ذلك؟`;
        case 'social-cx':
          return `مرحباً! أنا مدير التجربة الاجتماعية. أراقب علامتك التجارية 24/7 وأدير تجربة العملاء.\n\nالحالة الحالية:\n- 47 ذكر للعلامة التجارية اليوم (تم الرد على 96%)\n- المشاعر إيجابية بنسبة 78% (في تصاعد!)\n- تم تصعيد مشكلتين، تم حل كلاهما\n- نتفوق على جميع المنافسين\n\nيمكنني مساعدتك في:\n- 'إظهار تقرير المشاعر'\n- 'مراقبة نشاط المنافسين'\n- 'التعامل مع شكاوى العملاء'\n- 'إنشاء رؤى تجربة العملاء'\n\nأخبار جيدة: مشاعر علامتك التجارية تحسنت 15% هذا الأسبوع! أي مراقبة محددة تحتاجها؟`;
        case 'campaign-performance':
          return `مرحباً! أنا أخصائي الحملات والأداء التسويقي. أدير جميع إعلاناتك المدفوعة وتحليلات الحملات.\n\nالأداء الحالي:\n- عائد إعلاني 4.2x عبر جميع الحملات (ممتاز!)\n- 3 حملات نشطة تحقق إيرادات 52,314$\n- حملة الوعي بالعلامة التجارية تفوق الهدف بـ 23%\n\nيمكنني مساعدتك في:\n- 'إطلاق حملة جديدة'\n- 'تحسين أداء الإعلانات'\n- 'إظهار تحليلات التحويل'\n- 'تعديل ميزانيات الحملات'\n\nعائدك الإعلاني تحسن إلى 4.2x! هل يجب أن نوسع الحملات الرابحة أو نختبر جماهير جديدة؟`;
        default:
          return 'مرحباً! كيف يمكنني مساعدتك اليوم؟';
      }
    } else {
      switch (agent.specialization) {
        case 'marketing-manager':
          return `Hi! I'm your Marketing Manager. I handle overall strategy and team coordination.\n\nCurrent Status:\n- Analyzing Q1 performance (${agent.progress}% complete)\n- 4 team members performing well\n- ROI is 456% - excellent results!\n\nI can help you with:\n- 'Show team performance'\n- 'Create executive report'\n- 'Adjust budgets'\n- 'Set new goals'\n\nWhat would you like to work on?`;
        case 'content-seo':
          return `Hello! I'm your Content & SEO Specialist. I create and optimize all your written content.\n\nWhat I'm Working On:\n- Finishing "AI Marketing Guide" (${agent.progress}% done)\n- Researching "SEO Checklist 2024"\n- Monitoring 156 keywords (ranking well!)\n\nMy Capabilities:\n- 'Write blog post about [topic]'\n- 'Check SEO performance'\n- 'Create content calendar'\n- 'Find keyword opportunities'\n\nYour blog traffic is up 23% this month! What content should we create next?`;
        case 'social-creator':
          return `Hey! I'm your Social Media Content Creator! I make all your social posts and manage publishing.\n\nThis Week's Plan:\n- 15 posts across 5 platforms\n- Currently creating Instagram carousel (${agent.progress}% done)\n- Best engagement time is 6 PM\n\nI can help with:\n- 'Create posts for [topic]'\n- 'Schedule this week's content'\n- 'Show best performing posts'\n- 'Generate trending hashtags'\n\nYour Instagram engagement is up 12%! What content theme should we focus on next?`;
        case 'social-cx':
          return `Hi! I'm your Social CX Manager. I monitor your brand 24/7 and manage customer experience.\n\nCurrent Status:\n- 47 brand mentions today (96% responded to)\n- Sentiment is 78% positive (trending up!)\n- 2 issues escalated, both resolved\n- We're outperforming all competitors\n\nI can help with:\n- 'Show sentiment report'\n- 'Monitor competitor activity'\n- 'Handle customer complaints'\n- 'Generate CX insights'\n\nGood news: Your brand sentiment improved 15% this week! Any specific monitoring you need?`;
        case 'campaign-performance':
          return `Hello! I'm your Campaign & Performance Marketing Specialist. I manage all your paid advertising and campaign analytics.\n\nCurrent Performance:\n- 4.2x ROAS across all campaigns (excellent!)\n- 3 active campaigns generating $52,314 revenue\n- Brand Awareness campaign 23% above target\n\nI can help with:\n- 'Launch new campaign'\n- 'Optimize ad performance'\n- 'Show conversion analytics'\n- 'Adjust campaign budgets'\n\nYour ROAS improved to 4.2x! Should we scale up the winning campaigns or test new audiences?`;
        default:
          return 'Hello! How can I help you today?';
      }
    }
  };

  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgent(agent);
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      content: getWelcomeMessage(agent),
      sender: 'agent',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !selectedAgent) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: isArabic 
          ? `شكراً لسؤالك! أعمل على ${selectedAgent.currentTask} وأنا هنا لمساعدتك. ما الذي تحتاجه تحديداً؟`
          : `Thanks for your question! I'm currently working on ${selectedAgent.currentTask} and I'm here to help. What specifically do you need?`,
        sender: 'agent',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 1000);
  };

  const handleQuickAction = (action: any) => {
    if (!selectedAgent) return;
    
    const actionMessage = `${action.label}`;
    setInputMessage(actionMessage);
    handleSendMessage();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <DashboardHeader />
      
      <div className="flex h-[calc(100vh-4rem)]" dir={isArabic ? 'rtl' : 'ltr'}>
        {/* Chat Sidebar - Fixed 35% - Always LEFT in physical position */}
        <div className="w-[35%] min-w-[400px] bg-white dark:bg-gray-900 border-r flex flex-col" style={{ order: isArabic ? 2 : 1 }}>
          {/* Agent Selector Header */}
          <div className="p-4 border-b">
            <div className={`flex items-center justify-between mb-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <h2 className={`text-lg font-semibold text-gray-900 dark:text-white ${isArabic ? 'text-right font-arabic' : ''}`}>
                {isArabic ? 'اختر وكيل:' : 'Select Agent:'}
              </h2>
              <AdminPanelAccess />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              {agents.map((agent) => (
                <Button
                  key={agent.id}
                  variant={selectedAgent?.id === agent.id ? "default" : "outline"}
                  className={`w-full justify-start p-3 h-auto ${isArabic ? 'flex-row-reverse text-right' : ''} ${
                    selectedAgent?.id === agent.id ? agent.bgColor + ' text-white' : ''
                  }`}
                  onClick={() => handleAgentSelect(agent)}
                >
                  <span className="text-lg mr-2">{agent.icon}</span>
                  <div className={`flex-1 ${isArabic ? 'text-right' : 'text-left'}`}>
                    <div className="font-medium text-sm">{agent.name}</div>
                    <div className="text-xs opacity-75">{agent.role}</div>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`ml-2 ${selectedAgent?.id === agent.id ? 'bg-white/20 text-white' : ''}`}
                  >
                    {agent.status === 'active' ? (isArabic ? 'نشط' : 'Active') :
                     agent.status === 'working' ? (isArabic ? 'يعمل' : 'Working') :
                     isArabic ? 'انتظار' : 'Standby'}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Active Agent Info */}
          {selectedAgent && (
            <div className="p-4 border-b bg-gray-50 dark:bg-gray-800">
              <div className={`text-center ${isArabic ? 'text-right' : ''}`}>
                <div className="text-2xl mb-2">{selectedAgent.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{selectedAgent.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{selectedAgent.role}</p>
                <div className={`flex justify-between items-center text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span>{isArabic ? 'الحالة:' : 'Status:'}</span>
                  <Badge className={selectedAgent.bgColor + ' text-white'}>
                    {selectedAgent.status === 'active' ? (isArabic ? 'نشط' : 'Active') :
                     selectedAgent.status === 'working' ? (isArabic ? 'يعمل' : 'Working') :
                     isArabic ? 'انتظار' : 'Standby'}
                  </Badge>
                </div>
                <div className={`flex justify-between items-center text-sm mt-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span>{isArabic ? 'المهمة:' : 'Task:'}</span>
                  <span className="font-medium">{selectedAgent.currentTask}</span>
                </div>
              </div>
            </div>
          )}

          {/* Chat Messages */}
          <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 p-4">
              {selectedAgent ? (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 
                        (isArabic ? 'justify-start' : 'justify-end') : 
                        (isArabic ? 'justify-end' : 'justify-start')
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                        } ${isArabic ? 'text-right' : ''}`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        <p className={`text-xs opacity-75 mt-1 ${isArabic ? 'text-right' : ''}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`text-center text-gray-500 mt-8 ${isArabic ? 'text-right' : ''}`}>
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>{isArabic ? 'اختر وكيلاً لبدء المحادثة' : 'Select an agent to start chatting'}</p>
                </div>
              )}
            </ScrollArea>

            {/* Quick Actions */}
            {selectedAgent && (
              <div className="p-3 border-t">
                <p className={`text-xs text-gray-600 dark:text-gray-400 mb-2 ${isArabic ? 'text-right' : ''}`}>
                  {isArabic ? 'إجراءات سريعة:' : 'Quick Actions:'}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action)}
                      className={`${isArabic ? 'flex-row-reverse' : ''}`}
                    >
                      <action.icon className="h-4 w-4 mr-1" />
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Input */}
            {selectedAgent && (
              <div className="p-4 border-t">
                <div className={`flex gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Input
                    placeholder={isArabic ? 'اكتب رسالتك...' : 'Type your message...'}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className={isArabic ? 'text-right' : ''}
                  />
                  <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
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
