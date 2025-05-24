
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Send, 
  User, 
  Loader2, 
  Brain, 
  Mic, 
  Paperclip, 
  MessageSquare,
  Target,
  BarChart3,
  Palette,
  Mail,
  Search,
  TrendingUp,
  Users
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  sender: 'ai' | 'user';
  timestamp: Date;
  loading?: boolean;
  agentId: string;
}

interface Agent {
  id: string;
  name: string;
  role: string;
  icon: React.ReactNode;
  bgColor: string;
  capabilities: string[];
}

interface UnifiedChatSidebarProps {
  selectedAgentId?: string;
  onAgentChange?: (agentId: string) => void;
  currentMetrics?: any;
}

const UnifiedChatSidebar: React.FC<UnifiedChatSidebarProps> = ({ 
  selectedAgentId = 'marketing-manager', 
  onAgentChange,
  currentMetrics 
}) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [messages, setMessages] = useState<{ [agentId: string]: Message[] }>({});
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentAgent, setCurrentAgent] = useState(selectedAgentId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const agents: Agent[] = [
    {
      id: 'marketing-manager',
      name: isArabic ? 'مدير التسويق' : 'Marketing Manager',
      role: isArabic ? 'استراتيجية شاملة' : 'Strategy & Coordination',
      icon: <Brain className="h-4 w-4" />,
      bgColor: 'bg-blue-500',
      capabilities: ['Strategy Planning', 'Campaign Coordination', 'ROI Analysis']
    },
    {
      id: 'content-strategist',
      name: isArabic ? 'استراتيجي المحتوى' : 'Content Strategist',
      role: isArabic ? 'إنشاء المحتوى' : 'Content Creation',
      icon: <MessageSquare className="h-4 w-4" />,
      bgColor: 'bg-purple-500',
      capabilities: ['Content Planning', 'SEO Optimization', 'Editorial Management']
    },
    {
      id: 'brand-manager',
      name: isArabic ? 'مدير العلامة التجارية' : 'Brand Manager',
      role: isArabic ? 'إدارة العلامة التجارية' : 'Brand Management',
      icon: <Target className="h-4 w-4" />,
      bgColor: 'bg-green-500',
      capabilities: ['Brand Guidelines', 'Visual Identity', 'Brand Positioning']
    },
    {
      id: 'social-media',
      name: isArabic ? 'مدير التواصل الاجتماعي' : 'Social Media Manager',
      role: isArabic ? 'التواصل الاجتماعي' : 'Social Engagement',
      icon: <Users className="h-4 w-4" />,
      bgColor: 'bg-pink-500',
      capabilities: ['Social Scheduling', 'Community Management', 'Engagement Strategy']
    },
    {
      id: 'analytics-expert',
      name: isArabic ? 'خبير التحليلات' : 'Analytics Expert',
      role: isArabic ? 'تحليل البيانات' : 'Data Analysis',
      icon: <BarChart3 className="h-4 w-4" />,
      bgColor: 'bg-orange-500',
      capabilities: ['Data Analysis', 'Performance Tracking', 'Predictive Analytics']
    },
    {
      id: 'graphic-designer',
      name: isArabic ? 'المصمم الجرافيكي' : 'Graphic Designer',
      role: isArabic ? 'التصميم المرئي' : 'Visual Design',
      icon: <Palette className="h-4 w-4" />,
      bgColor: 'bg-indigo-500',
      capabilities: ['Visual Design', 'Brand Assets', 'Creative Templates']
    },
    {
      id: 'email-marketing',
      name: isArabic ? 'مدير التسويق الإلكتروني' : 'Email Marketing',
      role: isArabic ? 'التسويق عبر البريد' : 'Email Campaigns',
      icon: <Mail className="h-4 w-4" />,
      bgColor: 'bg-teal-500',
      capabilities: ['Email Automation', 'List Management', 'Campaign Analytics']
    },
    {
      id: 'seo-expert',
      name: isArabic ? 'خبير السيو' : 'SEO Expert',
      role: isArabic ? 'تحسين محركات البحث' : 'Search Optimization',
      icon: <Search className="h-4 w-4" />,
      bgColor: 'bg-cyan-500',
      capabilities: ['Keyword Research', 'Technical SEO', 'Ranking Optimization']
    }
  ];

  const activeAgent = agents.find(agent => agent.id === currentAgent) || agents[0];

  const getQuickActions = (agentId: string) => {
    const actions: { [key: string]: { text: string; context: string }[] } = {
      'marketing-manager': [
        { text: isArabic ? 'تحليل الأداء' : 'Analyze Performance', context: 'performance-analysis' },
        { text: isArabic ? 'إنشاء استراتيجية' : 'Create Strategy', context: 'strategy-creation' },
        { text: isArabic ? 'مراجعة الميزانية' : 'Review Budget', context: 'budget-review' }
      ],
      'content-strategist': [
        { text: isArabic ? 'تقويم المحتوى' : 'Content Calendar', context: 'content-calendar' },
        { text: isArabic ? 'بحث الكلمات المفتاحية' : 'Keyword Research', context: 'keyword-research' },
        { text: isArabic ? 'تحليل المحتوى' : 'Content Analysis', context: 'content-analysis' }
      ],
      'brand-manager': [
        { text: isArabic ? 'هوية العلامة التجارية' : 'Brand Identity', context: 'brand-identity' },
        { text: isArabic ? 'تحليل المنافسين' : 'Competitor Analysis', context: 'competitor-analysis' },
        { text: isArabic ? 'خطوط إرشادية' : 'Brand Guidelines', context: 'brand-guidelines' }
      ],
      'social-media': [
        { text: isArabic ? 'جدولة المنشورات' : 'Schedule Posts', context: 'social-scheduling' },
        { text: isArabic ? 'تحليل التفاعل' : 'Engagement Analysis', context: 'engagement-analysis' },
        { text: isArabic ? 'إدارة المجتمع' : 'Community Management', context: 'community-management' }
      ]
    };
    
    return actions[agentId] || actions['marketing-manager'];
  };

  useEffect(() => {
    if (selectedAgentId && selectedAgentId !== currentAgent) {
      setCurrentAgent(selectedAgentId);
    }
  }, [selectedAgentId, currentAgent]);

  useEffect(() => {
    // Initialize conversation for new agents
    if (!messages[currentAgent]) {
      const welcomeMessage: Message = {
        id: `${currentAgent}-welcome`,
        content: getWelcomeMessage(currentAgent),
        sender: 'ai',
        timestamp: new Date(),
        agentId: currentAgent
      };
      setMessages(prev => ({ ...prev, [currentAgent]: [welcomeMessage] }));
    }
  }, [currentAgent, isArabic]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentAgent]);

  const getWelcomeMessage = (agentId: string) => {
    const welcomeMessages: { [key: string]: { ar: string; en: string } } = {
      'marketing-manager': {
        ar: 'مرحباً! أنا مدير التسويق الذكي، مستعد لمساعدتك في وضع الاستراتيجيات وتنسيق الحملات التسويقية.',
        en: 'Hello! I\'m your AI Marketing Manager, ready to help you with strategy development and campaign coordination.'
      },
      'content-strategist': {
        ar: 'أهلاً! أنا استراتيجي المحتوى، أساعدك في التخطيط وإنشاء محتوى فعال.',
        en: 'Welcome! I\'m your Content Strategist, here to help with planning and creating effective content.'
      },
      'brand-manager': {
        ar: 'مرحباً! أنا مدير العلامة التجارية، أساعدك في تطوير وإدارة هوية علامتك التجارية.',
        en: 'Hello! I\'m your Brand Manager, ready to help develop and manage your brand identity.'
      }
    };
    
    const message = welcomeMessages[agentId] || welcomeMessages['marketing-manager'];
    return isArabic ? message.ar : message.en;
  };

  const sendAIRequest = async (message: string, context: string = 'general') => {
    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { 
          message, 
          context,
          language,
          role: currentAgent,
          capabilities: activeAgent.capabilities,
          currentMetrics: currentMetrics
        }
      });

      if (error) throw error;
      return data.response || data.fallback;
    } catch (error) {
      console.error('AI request failed:', error);
      throw error;
    }
  };

  const handleSend = async (messageText?: string, context?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: textToSend,
      sender: 'user',
      timestamp: new Date(),
      agentId: currentAgent
    };
    
    setMessages(prev => ({
      ...prev,
      [currentAgent]: [...(prev[currentAgent] || []), userMessage]
    }));
    setInput('');
    setIsLoading(true);

    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: '',
      sender: 'ai',
      timestamp: new Date(),
      loading: true,
      agentId: currentAgent
    };

    setMessages(prev => ({
      ...prev,
      [currentAgent]: [...(prev[currentAgent] || []), loadingMessage]
    }));
    
    try {
      const aiResponse = await sendAIRequest(textToSend, context);
      
      setMessages(prev => ({
        ...prev,
        [currentAgent]: prev[currentAgent].map(msg => 
          msg.id === loadingMessage.id 
            ? { ...msg, content: aiResponse, loading: false }
            : msg
        )
      }));
    } catch (error) {
      const errorMessage = isArabic 
        ? 'عذراً، حدث خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى.'
        : 'Sorry, I encountered an error. Please try again.';
        
      setMessages(prev => ({
        ...prev,
        [currentAgent]: prev[currentAgent].map(msg => 
          msg.id === loadingMessage.id 
            ? { ...msg, content: errorMessage, loading: false }
            : msg
        )
      }));

      toast({
        title: isArabic ? 'خطأ' : 'Error',
        description: isArabic ? 'فشل في الاتصال بالذكاء الاصطناعي' : 'Failed to connect to AI service',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAgentChange = (agentId: string) => {
    setCurrentAgent(agentId);
    onAgentChange?.(agentId);
  };

  const currentMessages = messages[currentAgent] || [];

  return (
    <Card className={`h-full flex flex-col ${isArabic ? 'rtl' : ''}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <CardHeader className="pb-3">
        <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div className={`p-2 rounded-lg ${activeAgent.bgColor} text-white`}>
              {activeAgent.icon}
            </div>
            <div>
              <CardTitle className="text-sm">{activeAgent.name}</CardTitle>
              <p className="text-xs text-gray-600">{activeAgent.role}</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {isArabic ? 'متصل' : 'Online'}
          </Badge>
        </div>
        
        {/* Agent Selector */}
        <Select value={currentAgent} onValueChange={handleAgentChange}>
          <SelectTrigger className="mt-3">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {agents.map(agent => (
              <SelectItem key={agent.id} value={agent.id}>
                <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className={`p-1 rounded ${agent.bgColor} text-white`}>
                    {agent.icon}
                  </div>
                  <span>{agent.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-4">
        {/* Quick Actions */}
        <div className="mb-4">
          <p className={`text-xs text-gray-600 dark:text-gray-400 mb-2 ${isArabic ? 'text-right' : ''}`}>
            {isArabic ? 'إجراءات سريعة:' : 'Quick actions:'}
          </p>
          <div className={`flex flex-wrap gap-1 ${isArabic ? 'justify-end' : ''}`}>
            {getQuickActions(currentAgent).map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSend(action.text, action.context)}
                disabled={isLoading}
                className="text-xs h-7"
              >
                {action.text}
              </Button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 -mx-4 px-4">
          <div className="space-y-3">
            {currentMessages.map(message => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'ai' ? (isArabic ? 'justify-start' : 'justify-end') : (isArabic ? 'justify-end' : 'justify-start')} mb-3`}
              >
                <div className={`flex max-w-[85%] items-start ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                  {message.sender === 'ai' && !isArabic && (
                    <div className={`h-6 w-6 rounded-full ${activeAgent.bgColor} flex items-center justify-center text-white`}>
                      {message.loading ? <Loader2 size={12} className="animate-spin" /> : activeAgent.icon}
                    </div>
                  )}
                  
                  <div className={`${message.sender === 'ai' ? 'bg-white dark:bg-gray-800 border' : 'bg-blue-500 text-white'} rounded-lg px-3 py-2 text-sm`}>
                    {message.loading ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 size={12} className="animate-spin" />
                        <span className="text-xs">{isArabic ? 'يكتب...' : 'typing...'}</span>
                      </div>
                    ) : (
                      <>
                        <p className={`text-xs ${isArabic ? 'text-right leading-relaxed' : ''}`}>
                          {message.content}
                        </p>
                        <p className={`text-xs ${message.sender === 'ai' ? 'text-gray-500 dark:text-gray-400' : 'text-blue-100'} mt-1`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </>
                    )}
                  </div>

                  {message.sender === 'user' && !isArabic && (
                    <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      <User size={12} />
                    </div>
                  )}
                  {message.sender === 'ai' && isArabic && (
                    <div className={`h-6 w-6 rounded-full ${activeAgent.bgColor} flex items-center justify-center text-white`}>
                      {message.loading ? <Loader2 size={12} className="animate-spin" /> : activeAgent.icon}
                    </div>
                  )}
                  {message.sender === 'user' && isArabic && (
                    <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      <User size={12} />
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className={`flex items-center gap-2 mt-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div className="flex-1 relative">
            <Input
              placeholder={isArabic ? 'اكتب رسالتك...' : 'Type your message...'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
              disabled={isLoading}
              className={`text-sm ${isArabic ? 'text-right pr-16' : 'pl-4 pr-16'}`}
            />
            <div className={`absolute top-1.5 ${isArabic ? 'left-2' : 'right-2'} flex gap-1`}>
              <Button
                variant="ghost"
                size="sm"
                disabled={isLoading}
                className="h-6 w-6 p-0"
              >
                <Mic className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled={isLoading}
                className="h-6 w-6 p-0"
              >
                <Paperclip className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <Button 
            onClick={() => handleSend()} 
            disabled={isLoading || !input.trim()}
            size="sm"
            className={isArabic ? 'flex-row-reverse' : ''}
          >
            {isLoading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Send className="h-3 w-3" />
            )}
          </Button>
        </div>

        {/* Context indicator */}
        {currentMetrics && (
          <div className={`mt-2 text-xs text-gray-500 ${isArabic ? 'text-right' : ''}`}>
            💡 {isArabic ? 
              'يمكنني الوصول إلى بيانات الأداء الحالية' : 
              'I can access your current performance data'
            }
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UnifiedChatSidebar;
