
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Loader2, Zap, TrendingUp, Target, Lightbulb } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  sender: 'ai' | 'user';
  timestamp: Date;
  loading?: boolean;
}

interface Agent {
  id: string;
  name: string;
  specialization: string;
  capabilities: string[];
}

interface AgentChatInterfaceProps {
  agent: Agent;
  isArabic: boolean;
}

const AgentChatInterface: React.FC<AgentChatInterfaceProps> = ({ agent, isArabic }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Core 5 agent quick actions
  const getQuickActions = () => {
    const actions = {
      'marketing-manager': [
        { id: 1, text: isArabic ? 'وضع استراتيجية تسويقية' : 'Create marketing strategy', icon: <Target className="h-4 w-4" /> },
        { id: 2, text: isArabic ? 'تنسيق الفريق' : 'Coordinate team efforts', icon: <TrendingUp className="h-4 w-4" /> },
        { id: 3, text: isArabic ? 'تحليل الأداء' : 'Analyze performance', icon: <Zap className="h-4 w-4" /> }
      ],
      'content-seo': [
        { id: 1, text: isArabic ? 'إنشاء محتوى طويل' : 'Create long-form content', icon: <Lightbulb className="h-4 w-4" /> },
        { id: 2, text: isArabic ? 'تحسين SEO' : 'Optimize SEO', icon: <TrendingUp className="h-4 w-4" /> },
        { id: 3, text: isArabic ? 'تقويم تحريري' : 'Editorial calendar', icon: <Target className="h-4 w-4" /> }
      ],
      'social-creator': [
        { id: 1, text: isArabic ? 'إنشاء محتوى اجتماعي' : 'Create social content', icon: <Zap className="h-4 w-4" /> },
        { id: 2, text: isArabic ? 'جدولة منشورات' : 'Schedule posts', icon: <Target className="h-4 w-4" /> },
        { id: 3, text: isArabic ? 'تتبع الأداء' : 'Track performance', icon: <TrendingUp className="h-4 w-4" /> }
      ],
      'social-cx': [
        { id: 1, text: isArabic ? 'مراقبة المشاعر' : 'Monitor sentiment', icon: <Lightbulb className="h-4 w-4" /> },
        { id: 2, text: isArabic ? 'إدارة المجتمع' : 'Manage community', icon: <TrendingUp className="h-4 w-4" /> },
        { id: 3, text: isArabic ? 'كشف الأزمات' : 'Crisis detection', icon: <Target className="h-4 w-4" /> }
      ],
      'campaign-performance': [
        { id: 1, text: isArabic ? 'تخطيط الحملات' : 'Plan campaigns', icon: <Target className="h-4 w-4" /> },
        { id: 2, text: isArabic ? 'تحسين الأداء' : 'Optimize performance', icon: <TrendingUp className="h-4 w-4" /> },
        { id: 3, text: isArabic ? 'تتبع ROAS' : 'Track ROAS', icon: <Zap className="h-4 w-4" /> }
      ]
    };
    
    return actions[agent.specialization as keyof typeof actions] || actions['marketing-manager'];
  };

  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      content: getWelcomeMessage(),
      sender: 'ai',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, [agent, isArabic]);

  const getWelcomeMessage = () => {
    const messages = {
      'marketing-manager': isArabic 
        ? 'مرحباً! أنا مدير التسويق، قائد فريق التسويق المكون من 5 أعضاء. أساعدك في التخطيط الاستراتيجي وتنسيق الفريق.'
        : 'Hello! I\'m your Marketing Manager, leading our 5-person marketing team. I help with strategic planning and team coordination.',
      'content-seo': isArabic
        ? 'أهلاً! أنا أخصائي المحتوى و SEO، أقوم بإنشاء المحتوى طويل المدى وتحسين محركات البحث.'
        : 'Hi! I\'m your Content & SEO Specialist, creating long-form content and optimizing for search engines.',
      'social-creator': isArabic
        ? 'مرحباً! أنا منشئ المحتوى الاجتماعي، أتولى إنشاء ونشر المحتوى عبر جميع المنصات الاجتماعية.'
        : 'Hello! I\'m your Social Media Content Creator, handling content creation and publishing across all social platforms.',
      'social-cx': isArabic
        ? 'أهلاً! أنا مدير وسائل التواصل الاجتماعي وتجربة العملاء، أراقب التفاعلات وأدير علاقات العملاء.'
        : 'Hi! I\'m your Social Media & CX Manager, monitoring interactions and managing customer relationships.',
      'campaign-performance': isArabic
        ? 'مرحباً! أنا أخصائي الحملات والأداء، أخطط وأنفذ الحملات وأتتبع النتائج والعائد على الاستثمار.'
        : 'Hello! I\'m your Campaign & Performance Specialist, planning and executing campaigns while tracking results and ROAS.'
    };
    
    return messages[agent.specialization as keyof typeof messages] || messages['marketing-manager'];
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendAIRequest = async (message: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { 
          message, 
          context: agent.specialization,
          language: isArabic ? 'ar' : 'en',
          role: agent.specialization,
          capabilities: agent.capabilities
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
    if (!textToSend.trim() || isLoading) return;
    
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

  const handleQuickAction = (actionText: string) => {
    handleSend(actionText);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Bot className="h-5 w-5" />
              {isArabic ? 'محادثة مع' : 'Chat with'} {agent.name}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-4">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map(message => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'ai' ? (isArabic ? 'justify-end' : 'justify-start') : (isArabic ? 'justify-start' : 'justify-end')}`}
                >
                  <div className={`flex max-w-[80%] items-start ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                    {message.sender === 'ai' && !isArabic && (
                      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        {message.loading ? <Loader2 size={16} className="animate-spin" /> : <Bot size={16} />}
                      </div>
                    )}
                    <div className={`${message.sender === 'ai' ? 'bg-gray-100 dark:bg-gray-800' : 'bg-blue-500 text-white'} rounded-lg p-3`}>
                      {message.loading ? (
                        <div className="flex items-center space-x-2">
                          <Loader2 size={16} className="animate-spin" />
                          <span className="text-sm">{isArabic ? 'جاري التفكير...' : 'Thinking...'}</span>
                        </div>
                      ) : (
                        <p className="text-sm">{message.content}</p>
                      )}
                      {!message.loading && (
                        <p className={`text-xs ${message.sender === 'ai' ? 'text-gray-500 dark:text-gray-400' : 'text-blue-100'} mt-1`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      )}
                    </div>
                    {message.sender === 'user' && !isArabic && (
                      <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        <User size={16} />
                      </div>
                    )}
                    {message.sender === 'ai' && isArabic && (
                      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        {message.loading ? <Loader2 size={16} className="animate-spin" /> : <Bot size={16} />}
                      </div>
                    )}
                    {message.sender === 'user' && isArabic && (
                      <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        <User size={16} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={`flex ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <Input
                placeholder={isArabic ? 'اكتب رسالتك...' : 'Type your message...'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                disabled={isLoading}
                className={isArabic ? 'text-right' : ''}
              />
              <Button 
                onClick={() => handleSend()} 
                disabled={isLoading || !input.trim()}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Capabilities */}
      <div className="space-y-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              {isArabic ? 'إجراءات سريعة' : 'Quick Actions'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {getQuickActions().map(action => (
              <Button
                key={action.id}
                variant="outline"
                size="sm"
                className={`w-full justify-start ${isArabic ? 'flex-row-reverse' : ''}`}
                onClick={() => handleQuickAction(action.text)}
                disabled={isLoading}
              >
                {action.icon}
                <span className="ml-2">{action.text}</span>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Capabilities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              {isArabic ? 'القدرات' : 'Capabilities'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {agent.capabilities.map((capability, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {capability}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Agent Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              {isArabic ? 'حالة الوكيل' : 'Agent Status'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm">{isArabic ? 'الحالة:' : 'Status:'}</span>
              <Badge variant="secondary">{isArabic ? 'نشط' : 'Active'}</Badge>
            </div>
            <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm">{isArabic ? 'وقت الاستجابة:' : 'Response Time:'}</span>
              <span className="text-sm text-green-600">~2s</span>
            </div>
            <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm">{isArabic ? 'جزء من:' : 'Part of:'}</span>
              <span className="text-sm text-blue-600">{isArabic ? 'فريق من 5' : '5-Agent Team'}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentChatInterface;
