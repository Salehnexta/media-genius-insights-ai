
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, TrendingUp, BarChart3, Users, Target } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'ai' | 'user';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    content: "Welcome to MarketingGenius AI! I'm your marketing assistant. What would you like help with today?",
    sender: 'ai',
    timestamp: new Date(),
  },
  {
    id: '2',
    content: "I've detected a 27% increase in negative sentiment around your new product launch. Would you like me to generate a report?",
    sender: 'ai',
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
  }
];

const suggestionCards = [
  {
    id: 1,
    title: "Generate campaign analysis",
    subtitle: "Analyze performance metrics",
    icon: <BarChart3 className="h-5 w-5" />,
    bgColor: "bg-gradient-to-br from-blue-500 to-blue-600"
  },
  {
    id: 2,
    title: "Create content strategy",
    subtitle: "Build engaging content plans",
    icon: <Target className="h-5 w-5" />,
    bgColor: "bg-gradient-to-br from-purple-500 to-purple-600"
  },
  {
    id: 3,
    title: "Audience insights",
    subtitle: "Understand your customers",
    icon: <Users className="h-5 w-5" />,
    bgColor: "bg-gradient-to-br from-green-500 to-green-600"
  },
  {
    id: 4,
    title: "Trend analysis",
    subtitle: "Track market trends",
    icon: <TrendingUp className="h-5 w-5" />,
    bgColor: "bg-gradient-to-br from-orange-500 to-orange-600"
  }
];

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  
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

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'ai' ? 'justify-start' : 'justify-end'} animate-fade-in`}
          >
            <div className={`flex max-w-[85%] items-start space-x-2`}>
              {message.sender === 'ai' && (
                <div className="h-7 w-7 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                  <Bot size={14} />
                </div>
              )}
              <div className={message.sender === 'ai' ? 'chat-bubble-ai' : 'chat-bubble-user'}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs ${message.sender === 'ai' ? 'text-gray-500 dark:text-gray-400' : 'text-blue-100'} mt-1`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {message.sender === 'user' && (
                <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0">
                  <User size={14} />
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* Suggestion Cards */}
        {messages.length <= 2 && (
          <div className="mt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              What would you like to explore today?
            </p>
            <div className="grid grid-cols-1 gap-3">
              {suggestionCards.map(card => (
                <button
                  key={card.id}
                  onClick={() => handleSuggestionClick(card)}
                  className={`${card.bgColor} text-white p-3 rounded-xl text-left hover:scale-[1.02] transition-transform duration-200 shadow-md`}
                >
                  <div className="flex items-center space-x-3">
                    {card.icon}
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1">{card.title}</h3>
                      <p className="text-xs opacity-90">{card.subtitle}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex space-x-2">
          <Input
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 text-sm"
          />
          <Button onClick={handleSend} size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-between mt-2">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Try: "Generate sentiment report"
          </div>
          <div className="text-xs text-blue-500">EN ⟶ AR</div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
