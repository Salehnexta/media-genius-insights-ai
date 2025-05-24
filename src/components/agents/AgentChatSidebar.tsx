
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, Bot, User, Loader2, ChevronDown } from 'lucide-react';
import { Agent } from './MarketingDashboard';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  sender: 'ai' | 'user';
  timestamp: Date;
  loading?: boolean;
}

interface MarketingChatSidebarProps {
  agents: Agent[];
  selectedAgent: Agent | null;
  onAgentSelect: (agent: Agent) => void;
  isArabic: boolean;
}

const MarketingChatSidebar: React.FC<MarketingChatSidebarProps> = ({
  agents,
  selectedAgent,
  onAgentSelect,
  isArabic
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getWelcomeMessage = (agent: Agent) => {
    const welcomeMessages = {
      'marketing-manager': isArabic 
        ? `مرحباً! أنا مدير التسويق الذكي. أدير الاستراتيجية العامة وتنسيق الفريق.

الحالة الحالية:
- تحليل أداء الربع الأول (85% مكتمل)
- 4 أعضاء فريق يعملون بكفاءة
- عائد الاستثمار 456% - نتائج ممتازة!

يمكنني مساعدتك في:
• "أظهر أداء الفريق"
• "إنشاء تقرير تنفيذي"
• "تعديل الميزانيات"
• "وضع أهداف جديدة"

ما الذي تريد العمل عليه؟`
        : `Hello! I'm your Marketing Manager. I handle overall strategy and team coordination.

Current Status:
- Analyzing Q1 performance (85% complete)
- 4 team members performing well
- ROI is 456% - excellent results!

I can help you with:
• "Show team performance"
• "Create executive report"
• "Adjust budgets"
• "Set new goals"

What would you like to work on?`,
      
      'content-seo': isArabic
        ? `مرحباً! أنا أخصائي المحتوى والسيو. أنشئ وأحسن جميع المحتوى المكتوب.

ما أعمل عليه:
- إنهاء "دليل التسويق بالذكاء الاصطناعي" (85% مكتمل)
- بحث "قائمة السيو 2024"
- مراقبة 156 كلمة مفتاحية (ترتيب جيد!)

قدراتي:
• "إنشاء مقال جديد"
• "فحص أداء السيو"
• "إنشاء تقويم المحتوى"
• "البحث عن فرص الكلمات المفتاحية"

حركة المدونة ارتفعت 23% هذا الشهر! ما المحتوى الذي يجب إنشاؤه بعد ذلك؟`
        : `Hello! I'm your Content & SEO Specialist. I create and optimize all your written content.

What I'm Working On:
- Finishing "AI Marketing Guide" (85% done)
- Researching "SEO Checklist 2024"
- Monitoring 156 keywords (ranking well!)

My Capabilities:
• "Create new article"
• "Check SEO performance"
• "Schedule content"
• "Find keyword opportunities"

Your blog traffic is up 23% this month! What content should we create next?`,
      
      'social-creator': isArabic
        ? `أهلاً! أنا منشئ المحتوى الاجتماعي! أنشئ جميع منشوراتك الاجتماعية وأدير النشر.

خطة هذا الأسبوع:
- 15 منشور عبر 5 منصات
- حالياً أنشئ كاروسيل انستغرام (85% مكتمل)
- أفضل وقت للتفاعل 6 مساءً

يمكنني مساعدتك في:
• "إنشاء منشورات اجتماعية"
• "جدولة النشر"
• "إظهار التفاعل"
• "إنشاء هاشتاغات رائجة"

تفاعل انستغرام ارتفع 12%! ما موضوع المحتوى الذي يجب التركيز عليه بعد ذلك؟`
        : `Hey! I'm your Social Media Content Creator! I make all your social posts and manage publishing.

This Week's Plan:
- 15 posts across 5 platforms
- Currently creating Instagram carousel (85% done)
- Best engagement time is 6 PM

I can help with:
• "Create social posts"
• "Schedule publishing"
• "Show engagement"
• "Generate trending hashtags"

Your Instagram engagement is up 12%! What content theme should we focus on next?`,
      
      'social-cx': isArabic
        ? `مرحباً! أنا مدير التجربة الاجتماعية. أراقب علامتك التجارية 24/7 وأدير تجربة العملاء.

الحالة الحالية:
- 47 إشارة للعلامة التجارية اليوم (تم الرد على 96%)
- المشاعر 78% إيجابية (في تحسن!)
- تم تصعيد مشكلتين، وتم حلهما
- نتفوق على جميع المنافسين

يمكنني مساعدتك في:
• "مراقبة ذكر العلامة التجارية"
• "تحليل المشاعر"
• "تقرير العملاء"
• "إظهار تحليلات العملاء"

خبر جيد: مشاعر علامتك التجارية تحسنت 15% هذا الأسبوع! هل تحتاج مراقبة محددة؟`
        : `Hi! I'm your Social CX Manager. I monitor your brand 24/7 and manage customer experience.

Current Status:
- 47 brand mentions today (96% responded to)
- Sentiment is 78% positive (trending up!)
- 2 issues escalated, both resolved
- We're outperforming all competitors

I can help with:
• "Monitor brand mentions"
• "Analyze sentiment"
• "Customer report"
• "Generate CX insights"

Good news: Your brand sentiment improved 15% this week! Any specific monitoring you need?`,
      
      'campaign-performance': isArabic
        ? `مرحباً! أنا أخصائي الحملات والأداء التسويقي. أدير جميع إعلاناتك المدفوعة وتحليلات الحملات.

الأداء الحالي:
- عائد استثمار إعلاني 4.2x عبر جميع الحملات (ممتاز!)
- 3 حملات نشطة تولد 52,314$ عائد
- حملة الوعي بالعلامة التجارية تتفوق بـ 23%

يمكنني مساعدتك في:
• "إطلاق حملة"
• "تحسين الأداء"
• "تحليل التحويل"
• "إدارة الحملات"

عائد الاستثمار الإعلاني تحسن إلى 4.2x! هل يجب توسيع الحملات الرابحة أم اختبار جماهير جديدة؟`
        : `Hello! I'm your Campaign & Performance Marketing Specialist. I manage all your paid advertising and campaign analytics.

Current Performance:
- 4.2x ROAS across all campaigns (excellent!)
- 3 active campaigns generating $52,314 revenue
- Brand Awareness campaign 23% above target

I can help with:
• "Launch campaign"
• "Optimize performance"
• "Conversion analysis"
• "Campaign management"

Your ROAS improved to 4.2x! Should we scale up the winning campaigns or test new audiences?`
    };
    
    return welcomeMessages[agent.specialization as keyof typeof welcomeMessages] || welcomeMessages['marketing-manager'];
  };

  // Initialize conversation when agent changes
  useEffect(() => {
    if (selectedAgent) {
      const welcomeMessage: Message = {
        id: '1',
        content: getWelcomeMessage(selectedAgent),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [selectedAgent, isArabic]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendAIRequest = async (message: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { 
          message, 
          context: selectedAgent?.specialization,
          language: isArabic ? 'ar' : 'en',
          role: selectedAgent?.specialization,
          capabilities: selectedAgent?.capabilities
        }
      });

      if (error) throw error;
      return data.response || data.fallback;
    } catch (error) {
      console.error('AI request failed:', error);
      throw error;
    }
  };

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading || !selectedAgent) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: textToSend,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: '',
      sender: 'ai',
      timestamp: new Date(),
      loading: true
    };

    setMessages(prev => [...prev, loadingMessage]);
    
    try {
      const aiResponse = await sendAIRequest(textToSend);
      
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessage.id 
          ? { ...msg, content: aiResponse, loading: false }
          : msg
      ));
    } catch (error) {
      const errorMessage = isArabic 
        ? 'عذراً، حدث خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى.'
        : 'Sorry, I encountered an error. Please try again.';
        
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessage.id 
          ? { ...msg, content: errorMessage, loading: false }
          : msg
      ));

      toast({
        title: isArabic ? 'خطأ' : 'Error',
        description: isArabic ? 'فشل في الاتصال بالذكاء الاصطناعي' : 'Failed to connect to AI service',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getQuickActions = () => {
    if (!selectedAgent) return [];
    
    const actions = {
      'marketing-manager': [
        { text: isArabic ? 'أظهر أداء الفريق' : 'Show team performance' },
        { text: isArabic ? 'إنشاء تقرير تنفيذي' : 'Create executive report' },
        { text: isArabic ? 'تعديل الميزانيات' : 'Adjust budgets' },
        { text: isArabic ? 'وضع أهداف جديدة' : 'Set new goals' }
      ],
      'content-seo': [
        { text: isArabic ? 'إنشاء مقال جديد' : 'Create new article' },
        { text: isArabic ? 'فحص أداء السيو' : 'Check SEO performance' },
        { text: isArabic ? 'جدولة المحتوى' : 'Schedule content' },
        { text: isArabic ? 'بحث الكلمات المفتاحية' : 'Keyword research' }
      ],
      'social-creator': [
        { text: isArabic ? 'إنشاء منشورات اجتماعية' : 'Create social posts' },
        { text: isArabic ? 'جدولة النشر' : 'Schedule publishing' },
        { text: isArabic ? 'إظهار التفاعل' : 'Show engagement' },
        { text: isArabic ? 'هاشتاغات رائجة' : 'Trending hashtags' }
      ],
      'social-cx': [
        { text: isArabic ? 'مراقبة ذكر العلامة التجارية' : 'Monitor brand mentions' },
        { text: isArabic ? 'تحليل المشاعر' : 'Analyze sentiment' },
        { text: isArabic ? 'تقرير العملاء' : 'Customer report' },
        { text: isArabic ? 'رؤى العملاء' : 'Customer insights' }
      ],
      'campaign-performance': [
        { text: isArabic ? 'إطلاق حملة' : 'Launch campaign' },
        { text: isArabic ? 'تحسين الأداء' : 'Optimize performance' },
        { text: isArabic ? 'تحليل التحويل' : 'Conversion analysis' },
        { text: isArabic ? 'إدارة الحملات' : 'Campaign management' }
      ]
    };
    
    return actions[selectedAgent.specialization as keyof typeof actions] || [];
  };

  const handleQuickAction = (actionText: string) => {
    handleSend(actionText);
  };

  return (
    <div className="h-full flex flex-col" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Agent Selector */}
      <Card className="border-0 border-b rounded-none">
        <CardHeader className="pb-3">
          <CardTitle className={`text-sm ${isArabic ? 'text-right' : ''}`}>
            {isArabic ? 'اختر الوكيل:' : 'Select Agent:'}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Select
            value={selectedAgent?.id || ''}
            onValueChange={(value) => {
              const agent = agents.find(a => a.id === value);
              if (agent) onAgentSelect(agent);
            }}
          >
            <SelectTrigger className={`w-full ${isArabic ? 'text-right' : ''}`}>
              <SelectValue placeholder={isArabic ? 'اختر وكيلاً...' : 'Choose an agent...'} />
            </SelectTrigger>
            <SelectContent>
              {agents.map((agent) => (
                <SelectItem key={agent.id} value={agent.id}>
                  <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <span>{agent.icon}</span>
                    <span>{agent.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Active Agent Info */}
      {selectedAgent && (
        <Card className="border-0 border-b rounded-none">
          <CardContent className="p-4">
            <div className={`flex items-center gap-3 mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-2xl">{selectedAgent.icon}</span>
              <div className={isArabic ? 'text-right' : ''}>
                <h3 className="font-semibold text-sm">{selectedAgent.name}</h3>
                <p className="text-xs text-gray-600">{selectedAgent.role}</p>
              </div>
            </div>
            <div className="space-y-1">
              <div className={`flex justify-between text-xs ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span>{isArabic ? 'الحالة:' : 'Status:'}</span>
                <Badge variant="secondary" className="h-4 text-xs">
                  {selectedAgent.status === 'active' ? (isArabic ? 'نشط' : 'Active') :
                   selectedAgent.status === 'working' ? (isArabic ? 'يعمل' : 'Working') :
                   (isArabic ? 'انتظار' : 'Standby')}
                </Badge>
              </div>
              <div className={`text-xs ${isArabic ? 'text-right' : ''}`}>
                <span className="text-gray-600">{isArabic ? 'المهمة:' : 'Task:'}</span>
                <p className="mt-1">{selectedAgent.currentTask}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'ai' ? (isArabic ? 'justify-end' : 'justify-start') : (isArabic ? 'justify-start' : 'justify-end')}`}
          >
            <div className={`flex max-w-[85%] items-start ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              {message.sender === 'ai' && !isArabic && (
                <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                  {message.loading ? <Loader2 size={12} className="animate-spin" /> : <Bot size={12} />}
                </div>
              )}
              <div className={`${message.sender === 'ai' ? 'bg-gray-100 dark:bg-gray-800' : 'bg-blue-500 text-white'} rounded-lg p-2 max-w-full`}>
                {message.loading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 size={12} className="animate-spin" />
                    <span className="text-xs">{isArabic ? 'جاري التفكير...' : 'Thinking...'}</span>
                  </div>
                ) : (
                  <p className={`text-xs break-words whitespace-pre-wrap ${isArabic ? 'text-right leading-relaxed' : ''}`}>
                    {message.content}
                  </p>
                )}
                {!message.loading && (
                  <p className={`text-xs ${message.sender === 'ai' ? 'text-gray-500 dark:text-gray-400' : 'text-blue-100'} mt-1`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                )}
              </div>
              {message.sender === 'user' && !isArabic && (
                <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
                  <User size={12} />
                </div>
              )}
              {message.sender === 'ai' && isArabic && (
                <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                  {message.loading ? <Loader2 size={12} className="animate-spin" /> : <Bot size={12} />}
                </div>
              )}
              {message.sender === 'user' && isArabic && (
                <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
                  <User size={12} />
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {selectedAgent && (
        <Card className="border-0 border-t rounded-none">
          <CardContent className="p-3">
            <p className={`text-xs font-medium mb-2 ${isArabic ? 'text-right' : ''}`}>
              {isArabic ? 'إجراءات سريعة:' : 'Quick Actions:'}
            </p>
            <div className="space-y-1">
              {getQuickActions().map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className={`w-full text-xs h-7 ${isArabic ? 'justify-end' : 'justify-start'}`}
                  onClick={() => handleQuickAction(action.text)}
                  disabled={isLoading}
                >
                  ○ {action.text}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chat Input */}
      <div className="border-t p-3 bg-white dark:bg-gray-900">
        <div className={`flex gap-2 ${isArabic ? 'space-x-reverse' : ''}`}>
          <Input
            placeholder={isArabic ? 'اكتب رسالتك...' : 'Type your message...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
            disabled={isLoading || !selectedAgent}
            className={`flex-1 text-sm ${isArabic ? 'text-right' : ''}`}
          />
          <Button 
            onClick={() => handleSend()} 
            disabled={isLoading || !input.trim() || !selectedAgent}
            size="sm"
            className="px-3"
          >
            {isLoading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Send className="h-3 w-3" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MarketingChatSidebar;
