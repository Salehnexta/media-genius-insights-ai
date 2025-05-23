
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
    icon: <BarChart3 className="h-6 w-6" />,
    bgColor: "bg-gradient-to-br from-blue-500 to-blue-600"
  },
  {
    id: 2,
    title: "Create content strategy",
    subtitle: "Build engaging content plans",
    icon: <Target className="h-6 w-6" />,
    bgColor: "bg-gradient-to-br from-purple-500 to-purple-600"
  },
  {
    id: 3,
    title: "Audience insights",
    subtitle: "Understand your customers",
    icon: <Users className="h-6 w-6" />,
    bgColor: "bg-gradient-to-br from-green-500 to-green-600"
  },
  {
    id: 4,
    title: "Trend analysis",
    subtitle: "Track market trends",
    icon: <TrendingUp className="h-6 w-6" />,
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
    <div className="flex flex-col h-full border rounded-lg shadow-sm bg-white dark:bg-gray-900">
      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'ai' ? 'justify-start' : 'justify-end'} animate-fade-in`}
          >
            <div className={`flex max-w-[85%] items-start space-x-2`}>
              {message.sender === 'ai' && (
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Bot size={16} />
                </div>
              )}
              <div className={message.sender === 'ai' ? 'chat-bubble-ai' : 'chat-bubble-user'}>
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs ${message.sender === 'ai' ? 'text-gray-500 dark:text-gray-400' : 'text-blue-100'} mt-1`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {message.sender === 'user' && (
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                  <User size={16} />
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* Suggestion Cards */}
        {messages.length <= 2 && (
          <div className="mt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Here we are again, what are we chatting about today? Ask me literally anything related to marketing.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {suggestionCards.map(card => (
                <button
                  key={card.id}
                  onClick={() => handleSuggestionClick(card)}
                  className={`${card.bgColor} text-white p-4 rounded-2xl text-left hover:scale-105 transition-transform duration-200 shadow-lg`}
                >
                  <div className="flex items-center justify-between mb-2">
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
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            placeholder="Ask me anything about your marketing..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <Button onClick={handleSend} type="submit">
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
        <div className="flex justify-between mt-2">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Try: "Generate sentiment report" or "Create social posts"
          </div>
          <div className="text-xs text-blue-500">English ⟶ عربي</div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
