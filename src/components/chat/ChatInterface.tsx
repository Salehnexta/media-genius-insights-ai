
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, AlertCircle, BellRing, Bot, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Message {
  id: string;
  content: string;
  sender: 'ai' | 'user';
  timestamp: Date;
  type?: 'alert' | 'normal';
  alertLevel?: 'info' | 'warning' | 'danger';
}

const initialMessages: Message[] = [
  {
    id: '1',
    content: "Welcome to MarketingGenius AI! I'm your marketing assistant. What would you like help with today?",
    sender: 'ai',
    timestamp: new Date(),
    type: 'normal'
  },
  {
    id: '2',
    content: "I've detected a 27% increase in negative sentiment around your new product launch. Would you like me to generate a report?",
    sender: 'ai',
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    type: 'alert',
    alertLevel: 'warning'
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

  return (
    <div className="flex flex-col h-full border rounded-lg shadow-sm bg-white dark:bg-gray-900">
      <Tabs defaultValue="chat" className="w-full">
        <div className="border-b px-4 py-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="chat" className="flex-1 flex flex-col h-full p-0 m-0">
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'ai' ? 'justify-start' : 'justify-end'} animate-fade-in`}
              >
                {message.type === 'alert' ? (
                  <div className={`flex max-w-[85%] items-start space-x-2 alert-${message.alertLevel}`}>
                    <AlertCircle className="h-5 w-5 mt-1" />
                    <div>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ) : (
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
                )}
              </div>
            ))}
          </div>
          
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
        </TabsContent>
        
        <TabsContent value="alerts" className="flex-1 flex flex-col h-full">
          <div className="p-4 space-y-3 overflow-y-auto">
            <div className="alert-danger animate-fade-in">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <div className="font-medium">Critical Media Alert</div>
              </div>
              <p className="ml-7 text-sm mt-1">Negative coverage about your product on TechCrunch (12 min ago)</p>
              <div className="ml-7 mt-2 flex space-x-2">
                <Button size="sm" variant="outline">View Details</Button>
                <Button size="sm">Generate Response</Button>
              </div>
            </div>
            
            <div className="alert-warning animate-fade-in">
              <div className="flex items-center">
                <BellRing className="h-5 w-5 mr-2" />
                <div className="font-medium">Competitor Alert</div>
              </div>
              <p className="ml-7 text-sm mt-1">Competitor X launched a similar feature to yours (1 hour ago)</p>
            </div>
            
            <div className="alert-info animate-fade-in">
              <div className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                <div className="font-medium">AI Recommendation</div>
              </div>
              <p className="ml-7 text-sm mt-1">Positive sentiment increased 15% after your latest campaign</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatInterface;
