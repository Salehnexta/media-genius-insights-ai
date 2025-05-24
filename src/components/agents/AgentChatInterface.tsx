
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Loader2, Zap, TrendingUp, Target, Lightbulb, Search, Users } from 'lucide-react';
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

  // Agent-specific quick actions for the 5 core agents
  const getQuickActions = () => {
    const actions = {
      'marketing-manager': [
        { id: 1, text: isArabic ? 'وضع استراتيجية تسويقية' : 'Create marketing strategy', icon: <Target className="h-4 w-4" /> },
        { id: 2, text: isArabic ? 'تحليل الأداء العام' : 'Analyze overall performance', icon: <TrendingUp className="h-4 w-4" /> },
        { id: 3, text: isArabic ? 'إدارة الميزانية' : 'Budget management', icon: <Zap className="h-4 w-4" /> }
      ],
      'content-seo': [
        { id: 1, text: isArabic ? 'إنشاء محتوى المدونة' : 'Create blog content', icon: <Lightbulb className="h-4 w-4" /> },
        { id: 2, text: isArabic ? 'تحسين السيو' : 'SEO optimization', icon: <Search className="h-4 w-4" /> },
        { id: 3, text: isArabic ? 'بحث الكلمات المفتاحية' : 'Keyword research', icon: <Target className="h-4 w-4" /> }
      ],
      'social-creator': [
        { id: 1, text: isArabic ? 'إنشاء منشورات اجتماعية' : 'Create social posts', icon: <Zap className="h-4 w-4" /> },
        { id: 2, text: isArabic ? 'جدولة المحتوى' : 'Schedule content', icon: <Target className="h-4 w-4" /> },
        { id: 3, text: isArabic ? 'تحليل الأداء' : 'Performance analysis', icon: <TrendingUp className="h-4 w-4" /> }
      ],
      'social-cx': [
        { id: 1, text: isArabic ? 'مراقبة المحادثات' : 'Monitor conversations', icon: <Users className="h-4 w-4" /> },
        { id: 2, text: isArabic ? 'تحليل المشاعر' : 'Sentiment analysis', icon: <TrendingUp className="h-4 w-4" /> },
        { id: 3, text: isArabic ? 'إدارة الأزمات' : 'Crisis management', icon: <Target className="h-4 w-4" /> }
      ],
      'campaign-performance': [
        { id: 1, text: isArabic ? 'تخطيط الحملات' : 'Campaign planning', icon: <Target className="h-4 w-4" /> },
        { id: 2, text: isArabic ? 'إدارة الإعلانات المدفوعة' : 'Manage paid ads', icon: <Zap className="h-4 w-4" /> },
        { id: 3, text: isArabic ? 'تحليل الأداء' : 'Performance analytics', icon: <TrendingUp className="h-4 w-4" /> }
      ]
    };
    
    return actions[agent.specialization as keyof typeof actions] || actions['marketing-manager'];
  };

  // Initialize conversation
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
        ? 'مرحباً! أنا مدير التسويق الذكي، مسؤول عن التخطيط الاستراتيجي وتنسيق الفريق. كيف يمكنني مساعدتك في تطوير استراتيجية تسويقية فعالة؟'
        : 'Hello! I\'m your AI Marketing Manager, responsible for strategic planning and team coordination. How can I help you develop an effective marketing strategy?',
      'content-seo': isArabic
        ? 'مرحباً! أنا أخصائي المحتوى والسيو، أساعدك في إنشاء محتوى عالي الجودة وتحسين ظهورك في محركات البحث. بماذا تريد أن نبدأ؟'
        : 'Hi! I\'m your Content & SEO Specialist, here to help you create high-quality content and improve your search visibility. What should we start with?',
      'social-creator': isArabic
        ? 'أهلاً! أنا منشئ المحتوى الاجتماعي، أساعدك في إنشاء محتوى جذاب للمنصات الاجتماعية وجدولة النشر. ما هي احتياجاتك؟'
        : 'Welcome! I\'m your Social Media Content Creator, here to help you create engaging social content and manage publishing schedules. What do you need?',
      'social-cx': isArabic
        ? 'مرحباً! أنا مدير التجربة الاجتماعية، أقوم بمراقبة المحادثات وتحليل المشاعر وإدارة العلاقات مع العملاء. كيف يمكنني المساعدة؟'
        : 'Hello! I\'m your Social Media & CX Manager, responsible for monitoring conversations, analyzing sentiment, and managing customer relationships. How can I help?',
      'campaign-performance': isArabic
        ? 'مرحباً! أنا أخصائي الحملات والأداء، أساعدك في تخطيط وتنفيذ الحملات التسويقية وتحسين العائد على الاستثمار. بماذا تريد أن نبدأ؟'
        : 'Hello! I\'m your Campaign & Performance Specialist, here to help you plan and execute marketing campaigns while optimizing ROI. What should we start with?'
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
      {/* Chat Interface */}
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
              <span className="text-sm">{isArabic ? 'معدل النجاح:' : 'Success Rate:'}</span>
              <span className="text-sm text-green-600">98%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentChatInterface;
