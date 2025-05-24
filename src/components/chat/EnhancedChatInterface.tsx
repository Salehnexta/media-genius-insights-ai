
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Brain, 
  Mic, 
  Paperclip, 
  Search, 
  Download,
  Smile,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Maximize2,
  Minimize2,
  X
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
  agentType?: string;
  reactions?: string[];
}

interface EnhancedChatInterfaceProps {
  isExpanded?: boolean;
  onToggleExpanded?: () => void;
  currentMetrics?: any;
}

const EnhancedChatInterface: React.FC<EnhancedChatInterfaceProps> = ({ 
  isExpanded = false, 
  onToggleExpanded,
  currentMetrics 
}) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('marketing-manager');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Voice recognition setup
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const quickActions = [
    {
      text: isArabic ? 'تحليل الأداء الحالي' : 'Analyze current performance',
      context: 'performance-analysis'
    },
    {
      text: isArabic ? 'اقتراح محتوى جديد' : 'Suggest new content',
      context: 'content-suggestion'
    },
    {
      text: isArabic ? 'إنشاء استراتيجية تسويقية' : 'Create marketing strategy',
      context: 'strategy-creation'
    },
    {
      text: isArabic ? 'تحسين الحملات' : 'Optimize campaigns',
      context: 'campaign-optimization'
    }
  ];

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage: Message = {
      id: '1',
      content: isArabic 
        ? `مرحباً! أنا مدير التسويق الذكي. يمكنني مساعدتك في تحليل أداء حملاتك الحالية وتقديم اقتراحات لتحسين النتائج. أرى أن لديك بيانات رائعة للعمل معها!`
        : `Hello! I'm your AI Marketing Manager. I can help you analyze your current campaign performance and provide suggestions for improvement. I see you have great data to work with!`,
      sender: 'ai',
      timestamp: new Date(),
      agentType: selectedAgent
    };
    setMessages([welcomeMessage]);
  }, [selectedAgent, isArabic]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = isArabic ? 'ar-SA' : 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, [isArabic]);

  const sendAIRequest = async (message: string, context: string = 'general') => {
    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { 
          message, 
          context,
          language,
          role: selectedAgent,
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
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: '',
      sender: 'ai',
      timestamp: new Date(),
      loading: true,
      agentType: selectedAgent
    };

    setMessages(prev => [...prev, loadingMessage]);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate typing
      const aiResponse = await sendAIRequest(textToSend, context);
      
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
      setIsTyping(false);
    }
  };

  const handleVoiceInput = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleFileUpload = () => {
    // Implement file upload logic
    toast({
      title: isArabic ? 'قريباً' : 'Coming Soon',
      description: isArabic ? 'ميزة رفع الملفات ستكون متاحة قريباً' : 'File upload feature coming soon',
    });
  };

  const addReaction = (messageId: string, reaction: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, reactions: [...(msg.reactions || []), reaction] }
        : msg
    ));
  };

  const filteredMessages = messages.filter(msg => 
    searchQuery === '' || msg.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ChatHeader = () => (
    <CardHeader className="pb-3">
      <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
        <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <Brain className="h-5 w-5 text-blue-500" />
          {isArabic ? 'مدير التسويق الذكي' : 'AI Marketing Manager'}
        </CardTitle>
        <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
          {isTyping && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <span className="text-xs text-gray-500 ml-2">
                {isArabic ? 'يكتب...' : 'typing...'}
              </span>
            </div>
          )}
          {onToggleExpanded && (
            <Button variant="ghost" size="sm" onClick={onToggleExpanded}>
              {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className={`flex items-center gap-2 mt-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <div className="relative flex-1">
          <Search className={`absolute top-2.5 h-4 w-4 text-gray-400 ${isArabic ? 'right-3' : 'left-3'}`} />
          <Input
            placeholder={isArabic ? 'البحث في المحادثات...' : 'Search conversations...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`${isArabic ? 'pr-10 text-right' : 'pl-10'}`}
          />
        </div>
        <Button variant="outline" size="sm" onClick={handleFileUpload}>
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
  );

  const MessageBubble = ({ message }: { message: Message }) => (
    <div className={`flex ${message.sender === 'ai' ? (isArabic ? 'justify-start' : 'justify-end') : (isArabic ? 'justify-end' : 'justify-start')} mb-4`}>
      <div className={`flex max-w-[80%] items-start ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
        {message.sender === 'ai' && !isArabic && (
          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            {message.loading ? <Loader2 size={16} className="animate-spin" /> : <Brain size={16} />}
          </div>
        )}
        
        <div className={`relative group ${message.sender === 'ai' ? 'bg-white dark:bg-gray-800 border' : 'bg-blue-500 text-white'} rounded-2xl px-4 py-3 shadow-sm`}>
          {message.loading ? (
            <div className="flex items-center space-x-2">
              <Loader2 size={16} className="animate-spin" />
              <span className="text-sm">{isArabic ? 'جاري التفكير...' : 'Thinking...'}</span>
            </div>
          ) : (
            <>
              <p className={`text-sm ${isArabic ? 'text-right leading-relaxed' : ''}`}>
                {message.content}
              </p>
              <div className={`flex items-center justify-between mt-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <p className={`text-xs ${message.sender === 'ai' ? 'text-gray-500 dark:text-gray-400' : 'text-blue-100'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                {message.sender === 'ai' && !message.loading && (
                  <div className={`flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => addReaction(message.id, '👍')}
                      className="h-6 w-6 p-0"
                    >
                      <ThumbsUp className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => addReaction(message.id, '👎')}
                      className="h-6 w-6 p-0"
                    >
                      <ThumbsDown className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => addReaction(message.id, '😊')}
                      className="h-6 w-6 p-0"
                    >
                      <Smile className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
              {message.reactions && message.reactions.length > 0 && (
                <div className={`flex gap-1 mt-2 ${isArabic ? 'justify-start' : 'justify-end'}`}>
                  {message.reactions.map((reaction, index) => (
                    <span key={index} className="text-sm">{reaction}</span>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {message.sender === 'user' && !isArabic && (
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <User size={16} />
          </div>
        )}
        {message.sender === 'ai' && isArabic && (
          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            {message.loading ? <Loader2 size={16} className="animate-spin" /> : <Brain size={16} />}
          </div>
        )}
        {message.sender === 'user' && isArabic && (
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <User size={16} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Card className={`h-full flex flex-col ${isArabic ? 'rtl' : ''}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <ChatHeader />
      
      <CardContent className="flex-1 flex flex-col p-4">
        {/* Quick Actions */}
        <div className="mb-4">
          <p className={`text-sm text-gray-600 dark:text-gray-400 mb-2 ${isArabic ? 'text-right' : ''}`}>
            {isArabic ? 'إجراءات سريعة:' : 'Quick actions:'}
          </p>
          <div className={`flex flex-wrap gap-2 ${isArabic ? 'justify-end' : ''}`}>
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSend(action.text, action.context)}
                disabled={isLoading}
                className="text-xs"
              >
                {action.text}
              </Button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 -mx-4 px-4">
          <div className="space-y-2">
            {filteredMessages.map(message => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className={`flex items-center gap-2 mt-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div className="flex-1 relative">
            <Input
              placeholder={isArabic ? 'اكتب رسالتك هنا...' : 'Type your message here...'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
              disabled={isLoading}
              className={`${isArabic ? 'text-right pr-20' : 'pl-4 pr-20'}`}
            />
            <div className={`absolute top-2 ${isArabic ? 'left-2' : 'right-2'} flex gap-1`}>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVoiceInput}
                disabled={isLoading || isListening}
                className="h-6 w-6 p-0"
              >
                <Mic className={`h-4 w-4 ${isListening ? 'text-red-500 animate-pulse' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFileUpload}
                disabled={isLoading}
                className="h-6 w-6 p-0"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button 
            onClick={() => handleSend()} 
            disabled={isLoading || !input.trim()}
            className={isArabic ? 'flex-row-reverse' : ''}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Context indicator */}
        {currentMetrics && (
          <div className={`mt-2 text-xs text-gray-500 ${isArabic ? 'text-right' : ''}`}>
            {isArabic ? 
              '💡 يمكنني الوصول إلى بيانات الأداء الحالية لتقديم نصائح مخصصة' : 
              '💡 I can access your current performance data for personalized advice'
            }
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedChatInterface;
