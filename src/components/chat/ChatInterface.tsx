
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, TrendingUp, BarChart3, Users, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  content: string;
  sender: 'ai' | 'user';
  timestamp: Date;
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize messages with translations
  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: '1',
        content: t('chat.welcome'),
        sender: 'ai',
        timestamp: new Date(),
      },
      {
        id: '2',
        content: t('chat.alert'),
        sender: 'ai',
        timestamp: new Date(Date.now() - 1000 * 60 * 2),
      }
    ];
    setMessages(initialMessages);
  }, [t]);

  const suggestionCards = [
    {
      id: 1,
      title: t('suggestion.campaign.title'),
      subtitle: t('suggestion.campaign.subtitle'),
      icon: <BarChart3 className="h-6 w-6" />,
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: t('suggestion.content.title'),
      subtitle: t('suggestion.content.subtitle'),
      icon: <Target className="h-6 w-6" />,
      bgColor: "bg-gradient-to-br from-purple-500 to-purple-600"
    },
    {
      id: 3,
      title: t('suggestion.audience.title'),
      subtitle: t('suggestion.audience.subtitle'),
      icon: <Users className="h-6 w-6" />,
      bgColor: "bg-gradient-to-br from-green-500 to-green-600"
    },
    {
      id: 4,
      title: t('suggestion.trend.title'),
      subtitle: t('suggestion.trend.subtitle'),
      icon: <TrendingUp className="h-6 w-6" />,
      bgColor: "bg-gradient-to-br from-orange-500 to-orange-600"
    }
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isExpanded]);
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm analyzing your request. Based on your current campaign performance, I recommend adjusting your ad spend distribution to focus more on platforms showing higher engagement rates.",
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: typeof suggestionCards[0]) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: suggestion.title,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `I'll help you with ${suggestion.title.toLowerCase()}. Let me gather the relevant data and insights for you.`,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  // For mobile compact mode, just show the last message
  const displayMessages = isMobile && !isExpanded
    ? messages.slice(-1)
    : messages;

  return (
    <div className={`flex flex-col h-full border rounded-lg shadow-sm bg-white dark:bg-gray-900 ${isMobile ? 'border-0 shadow-none rounded-none' : ''} ${isArabic ? 'rtl' : ''}`}>
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
                  <Bot size={16} />
                </div>
              )}
              <div className={`${message.sender === 'ai' ? 'chat-bubble-ai' : 'chat-bubble-user'} ${isArabic ? 'text-right' : ''}`}>
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs ${message.sender === 'ai' ? 'text-gray-500 dark:text-gray-400' : 'text-blue-100'} mt-1`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {message.sender === 'user' && !isArabic && (
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                  <User size={16} />
                </div>
              )}
              {message.sender === 'ai' && isArabic && (
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Bot size={16} />
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
        
        {/* Suggestion Cards - Only show in full chat view */}
        {(!isMobile || isExpanded) && messages.length <= 2 && (
          <div className="mt-6">
            <p className={`text-sm text-gray-600 dark:text-gray-400 mb-4 ${isArabic ? 'text-right' : ''}`}>
              {t('chat.suggestion.today')}
            </p>
            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-3`}>
              {suggestionCards.map(card => (
                <button
                  key={card.id}
                  onClick={() => handleSuggestionClick(card)}
                  className={`${card.bgColor} text-white p-4 rounded-2xl ${isArabic ? 'text-right' : 'text-left'} hover:scale-105 transition-transform duration-200 shadow-lg`}
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
            placeholder={t('chat.placeholder')}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className={`flex-1 ${isArabic ? 'text-right' : ''}`}
          />
          <Button onClick={handleSend} type="submit" className={`${isMobile ? 'px-3' : ''} ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Send className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
            {!isMobile && t('chat.send')}
          </Button>
        </div>
        {(!isMobile || isExpanded) && (
          <div className={`flex ${isArabic ? 'flex-row-reverse' : ''} justify-between mt-2`}>
            <div className={`text-xs text-gray-500 dark:text-gray-400 ${isArabic ? 'text-right' : ''}`}>
              {t('chat.example')}
            </div>
            <div className="text-xs text-blue-500">{t('chat.language.indicator')}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
