
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import ChatInterface from '@/components/chat/ChatInterface';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatCards from '@/components/dashboard/StatCards';
import DashboardTabs from '@/components/dashboard/DashboardTabs';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
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

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        
        <div className="flex-1 overflow-auto p-6">
          <DashboardHeader />
          <StatCards />
          
          <div className="flex gap-6 h-[calc(100%-200px)]">
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
      </div>
    </div>
  );
};

export default Index;
