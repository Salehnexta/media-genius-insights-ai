
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, TrendingUp, BarChart3, Users, Target, Loader2, Brain } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import AIMarketingManagerIntro from './AIMarketingManagerIntro';

interface Message {
  id: string;
  content: string;
  sender: 'ai' | 'user';
  timestamp: Date;
  loading?: boolean;
}

interface ChatInterfaceProps {
  isMobile?: boolean;
  isExpanded?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isMobile = false, isExpanded = false }) => {
  const { t, language } = useLanguage();
  const isArabic = language === 'ar';
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize messages with AI Marketing Manager introduction
  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: '1',
        content: isArabic 
          ? 'مرحباً! أنا مدير التسويق الذكي، وأنا هنا لقيادة فريق التسويق الذكي الخاص بك. فريقنا يتكون من 8 خبراء تسويق ذكيين مستعدين للعمل 24/7 لنجاح عملك. كيف يمكنني مساعدتك اليوم؟'
          : 'Hello! I\'m your AI Marketing Manager, here to lead your complete AI Marketing Team. Our team consists of 8 AI marketing experts ready to work 24/7 for your business success. How can I help you today?',
        sender: 'ai',
        timestamp: new Date(),
      }
    ];
    setMessages(initialMessages);
  }, [isArabic]);

  const suggestionCards = [
    {
      id: 1,
      title: isArabic ? 'استراتيجية التسويق' : 'Marketing Strategy',
      subtitle: isArabic ? 'تطوير خطة تسويقية شاملة' : 'Develop comprehensive marketing plan',
      icon: <Brain className="h-6 w-6" />,
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
      context: "strategy"
    },
    {
      id: 2,
      title: isArabic ? 'تعيين مهام الفريق' : 'Assign Team Tasks',
      subtitle: isArabic ? 'توزيع المهام على أعضاء الفريق' : 'Distribute tasks to team members',
      icon: <Users className="h-6 w-6" />,
      bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
      context: "team-management"
    },
    {
      id: 3,
      title: isArabic ? 'تحليل الأداء' : 'Performance Analysis',
      subtitle: isArabic ? 'مراجعة نتائج الحملات الحالية' : 'Review current campaign results',
      icon: <BarChart3 className="h-6 w-6" />,
      bgColor: "bg-gradient-to-br from-green-500 to-green-600",
      context: "analytics"
    },
    {
      id: 4,
      title: isArabic ? 'تحسين العلامة التجارية' : 'Brand Optimization',
      subtitle: isArabic ? 'تحسين هوية ورسائل العلامة التجارية' : 'Improve brand identity and messaging',
      icon: <Target className="h-6 w-6" />,
      bgColor: "bg-gradient-to-br from-orange-500 to-orange-600",
      context: "branding"
    }
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isExpanded]);

  const sendAIRequest = async (message: string, context: string = 'general') => {
    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { 
          message, 
          context,
          language,
          role: 'marketing-manager' // Specify that this is the marketing manager
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
    
    // Hide intro when user starts chatting
    if (showIntro) {
      setShowIntro(false);
    }
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: textToSend,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Add loading message
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: '',
      sender: 'ai',
      timestamp: new Date(),
      loading: true
    };

    setMessages(prev => [...prev, loadingMessage]);
    
    try {
      const aiResponse = await sendAIRequest(textToSend, context);
      
      // Replace loading message with actual response
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessage.id 
          ? { ...msg, content: aiResponse, loading: false }
          : msg
      ));
    } catch (error) {
      // Replace loading message with error message
      const errorMessage = isArabic 
        ? 'عذراً، حدث خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى.'
        : 'Sorry, I encountered an error processing your request. Please try again.';
        
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

  const handleSuggestionClick = (suggestion: typeof suggestionCards[0]) => {
    handleSend(suggestion.title, suggestion.context);
  };

  // For mobile compact mode, just show the last message
  const displayMessages = isMobile && !isExpanded
    ? messages.slice(-1)
    : messages;

  return (
    <div className={`flex flex-col h-full border rounded-lg shadow-sm bg-white dark:bg-gray-900 ${isMobile ? 'border-0 shadow-none rounded-none' : ''} ${isArabic ? 'rtl' : ''}`}>
      {/* Show intro only when chat is empty and expanded */}
      {showIntro && (!isMobile || isExpanded) && messages.length <= 1 && (
        <div className="p-4 border-b">
          <AIMarketingManagerIntro />
        </div>
      )}

      {/* Messages Area */}
      <div className={`flex-1 p-4 ${isMobile ? 'px-3' : ''} overflow-y-auto space-y-4`}>
        {displayMessages.map(message => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'ai' ? (isArabic ? 'justify-end' : 'justify-start') : (isArabic ? 'justify-start' : 'justify-end')} animate-fade-in`}
          >
            <div className={`flex max-w-[85%] items-start ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              {message.sender === 'ai' && !isArabic && (
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  {message.loading ? <Loader2 size={16} className="animate-spin" /> : <Brain size={16} />}
                </div>
              )}
              <div className={`${message.sender === 'ai' ? 'chat-bubble-ai' : 'chat-bubble-user'} ${isArabic ? 'text-right' : ''}`}>
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
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                  <User size={16} />
                </div>
              )}
              {message.sender === 'ai' && isArabic && (
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  {message.loading ? <Loader2 size={16} className="animate-spin" /> : <Brain size={16} />}
                </div>
              )}
              {message.sender === 'user' && isArabic && (
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                  <User size={16} />
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
        
        {/* Suggestion Cards - Only show in full chat view and after intro */}
        {(!isMobile || isExpanded) && !showIntro && messages.length <= 1 && (
          <div className="mt-6">
            <p className={`text-sm text-gray-600 dark:text-gray-400 mb-4 ${isArabic ? 'text-right' : ''}`}>
              {isArabic ? 'اقتراحات للبدء:' : 'Quick actions to get started:'}
            </p>
            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-3`}>
              {suggestionCards.map(card => (
                <button
                  key={card.id}
                  onClick={() => handleSuggestionClick(card)}
                  disabled={isLoading}
                  className={`${card.bgColor} text-white p-4 rounded-2xl ${isArabic ? 'text-right' : 'text-left'} hover:scale-105 transition-transform duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <div className={`flex items-center ${isArabic ? 'justify-start' : 'justify-between'} mb-2`}>
                    {card.icon}
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{card.title}</h3>
                  <p className="text-xs opacity-90">{card.subtitle}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Input Area */}
      <div className="p-3 border-t">
        <div className={`flex ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
          <Input
            placeholder={isArabic ? 'تحدث مع مدير التسويق الذكي...' : 'Chat with your AI Marketing Manager...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
            disabled={isLoading}
            className={`flex-1 ${isArabic ? 'text-right' : ''}`}
          />
          <Button 
            onClick={() => handleSend()} 
            disabled={isLoading || !input.trim()}
            type="submit" 
            className={`${isMobile ? 'px-3' : ''} ${isArabic ? 'flex-row-reverse' : ''}`}
          >
            {isLoading ? (
              <Loader2 className={`h-4 w-4 animate-spin ${isArabic ? 'ml-2' : 'mr-2'}`} />
            ) : (
              <Send className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
            )}
            {!isMobile && (isLoading ? (isArabic ? 'جاري الإرسال...' : 'Sending...') : (isArabic ? 'إرسال' : 'Send'))}
          </Button>
        </div>
        {(!isMobile || isExpanded) && (
          <div className={`flex ${isArabic ? 'flex-row-reverse' : ''} justify-between mt-2`}>
            <div className={`text-xs text-gray-500 dark:text-gray-400 ${isArabic ? 'text-right' : ''}`}>
              {isArabic ? 'مثال: "أريد استراتيجية تسويقية جديدة"' : 'Example: "I need a new marketing strategy"'}
            </div>
            <div className="text-xs text-blue-500">{isArabic ? 'مدعوم بـ GPT-4' : 'Powered by GPT-4'}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
