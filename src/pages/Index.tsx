
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import ChatInterface from '@/components/chat/ChatInterface';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import { ChevronUp, ChevronDown } from 'lucide-react';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Set up dark mode
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Check if mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
    setIsChatExpanded(!isChatExpanded);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        
        {/* Desktop Layout */}
        {!isMobile && (
          <div className="flex-1 overflow-auto p-6">
            <div className="flex gap-6 h-full">
              {/* Chat Interface (40% width) */}
              <div className="w-[40%] h-full">
                <ChatInterface />
              </div>
              
              {/* Dashboard Content (60% width) */}
              <div className="w-[60%] h-full overflow-hidden flex flex-col">
                <DashboardTabs />
              </div>
            </div>
          </div>
        )}
        
        {/* Mobile Layout */}
        {isMobile && (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Dashboard always shown at the top */}
            <div className={`flex-1 overflow-auto transition-all duration-300 ${isChatExpanded ? 'max-h-[40vh]' : 'max-h-[calc(100vh-120px)]'}`}>
              <div className="p-4">
                <DashboardTabs />
              </div>
            </div>
            
            {/* Chat bottom sheet */}
            <div 
              className={`
                bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 rounded-t-xl shadow-lg
                transition-all duration-300 ease-in-out
                ${isChatExpanded ? 'h-[60vh]' : 'h-[120px]'}
              `}
            >
              {/* Pull handle */}
              <div 
                className="h-10 flex items-center justify-center cursor-pointer border-b border-gray-200 dark:border-gray-800"
                onClick={toggleChat}
              >
                <div className="w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-full my-2"></div>
                {isChatExpanded ? 
                  <ChevronDown className="h-4 w-4 text-gray-500 absolute right-4" /> : 
                  <ChevronUp className="h-4 w-4 text-gray-500 absolute right-4" />
                }
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-4 absolute left-4">
                  💬 Chat with Insights
                </span>
              </div>
              
              {/* Chat Interface */}
              <div className={`h-[calc(100%-40px)] overflow-hidden`}>
                <ChatInterface isMobile={isMobile} isExpanded={isChatExpanded} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
