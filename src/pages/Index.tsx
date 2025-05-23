
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import ChatInterface from '@/components/chat/ChatInterface';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import { MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Set up dark mode
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        
        <div className="flex-1 overflow-hidden relative">
          {/* Dashboard Content - takes full width when chat is closed, shared width when open */}
          <div className={`h-full transition-all duration-300 ease-in-out ${
            isChatOpen ? 'mr-96' : 'mr-0'
          }`}>
            <div className="h-full p-6">
              <DashboardTabs />
            </div>
          </div>

          {/* Chat Toggle Button - Always visible */}
          <Button
            onClick={toggleChat}
            className={`fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg transition-all duration-300 ${
              isChatOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            size="icon"
          >
            {isChatOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <MessageSquare className="h-6 w-6 text-white" />
            )}
          </Button>

          {/* Chat Panel - Slides in from the right */}
          <div className={`fixed top-16 right-0 h-[calc(100vh-4rem)] w-96 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out z-40 ${
            isChatOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Marketing Assistant
                </h2>
                <Button
                  onClick={toggleChat}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Chat Interface */}
              <div className="flex-1 overflow-hidden">
                <ChatInterface />
              </div>
            </div>
          </div>

          {/* Overlay for mobile */}
          {isChatOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-20 z-30 md:hidden"
              onClick={toggleChat}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
