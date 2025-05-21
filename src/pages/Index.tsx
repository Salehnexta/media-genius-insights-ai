
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import ChatInterface from '@/components/chat/ChatInterface';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatCards from '@/components/dashboard/StatCards';
import DashboardTabs from '@/components/dashboard/DashboardTabs';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
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
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        
        <div className="flex-1 overflow-auto p-6">
          <DashboardHeader />
          <StatCards />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100%-200px)]">
            {/* Chat Interface (1/3 width on large screens) */}
            <div className="h-full">
              <ChatInterface />
            </div>
            
            {/* Dashboard Content (2/3 width on large screens) */}
            <div className="lg:col-span-2 h-full overflow-hidden flex flex-col">
              <DashboardTabs />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
