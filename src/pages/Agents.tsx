
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import AIMarketingTeamEnhanced from '@/components/dashboard/AIMarketingTeamEnhanced';
import UnifiedChatSidebar from '@/components/chat/UnifiedChatSidebar';
import AgentWorkspace from '@/components/agents/AgentWorkspace';

const Agents: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [selectedAgentId, setSelectedAgentId] = useState('marketing-manager');

  // Mock current metrics for chat context
  const currentMetrics = {
    totalUsers: 24567,
    conversionRate: 3.24,
    monthlyRevenue: 123456,
    pageViews: 897654,
    performance: 92
  };

  const handleAgentSelect = (agent: any) => {
    setSelectedAgent(agent);
    setSelectedAgentId(agent.specialization || agent.id);
  };

  const handleAgentClose = () => {
    setSelectedAgent(null);
  };

  const handleChatAgentChange = (agentId: string) => {
    setSelectedAgentId(agentId);
  };

  if (selectedAgent) {
    return (
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl font-arabic' : ''}`} dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="grid grid-cols-1 lg:grid-cols-12 h-screen">
          {/* Fixed Chat Sidebar - 35% width */}
          <div className="lg:col-span-4 border-r bg-white dark:bg-gray-900">
            <div className="h-full p-4">
              <div className="mb-4">
                <h2 className={`text-lg font-bold text-gray-900 dark:text-white mb-2 ${isArabic ? 'text-right font-arabic' : ''}`}>
                  {isArabic ? 'محادثة مع الفريق' : 'Chat with Team'}
                </h2>
                <p className={`text-sm text-gray-600 dark:text-gray-300 ${isArabic ? 'text-right leading-relaxed' : ''}`}>
                  {isArabic ? 'تواصل مع أعضاء فريقك الذكي' : 'Communicate with your AI team members'}
                </p>
              </div>
              <div className="h-[calc(100vh-8rem)]">
                <UnifiedChatSidebar 
                  selectedAgentId={selectedAgentId}
                  onAgentChange={handleChatAgentChange}
                  currentMetrics={currentMetrics} 
                />
              </div>
            </div>
          </div>

          {/* Agent Workspace - 65% width */}
          <div className="lg:col-span-8">
            <AgentWorkspace 
              agent={selectedAgent} 
              onClose={handleAgentClose}
              isArabic={isArabic} 
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl font-arabic' : ''}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className={`text-3xl font-bold text-gray-900 dark:text-white mb-2 ${isArabic ? 'text-right font-arabic' : ''}`}>
              {isArabic ? 'فريق التسويق الذكي' : 'AI Marketing Team'}
            </h1>
            <p className={`text-gray-600 dark:text-gray-300 ${isArabic ? 'text-right leading-relaxed' : ''}`}>
              {isArabic ? 'تفاعل مع فريق التسويق الذكي الخاص بك' : 'Interact with your AI marketing specialists'}
            </p>
          </div>

          {/* Main Content Grid with Persistent Chat */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* AI Marketing Team - Takes majority of space */}
            <div className="lg:col-span-8">
              <AIMarketingTeamEnhanced onAgentSelect={handleAgentSelect} />
            </div>

            {/* Persistent Chat Sidebar - Takes remaining space */}
            <div className="lg:col-span-4">
              <div className="sticky top-8">
                <div className="mb-4">
                  <h2 className={`text-xl font-bold text-gray-900 dark:text-white mb-2 ${isArabic ? 'text-right font-arabic' : ''}`}>
                    {isArabic ? 'مساعد التسويق الذكي' : 'AI Marketing Assistant'}
                  </h2>
                  <p className={`text-sm text-gray-600 dark:text-gray-300 ${isArabic ? 'text-right leading-relaxed' : ''}`}>
                    {isArabic ? 'احصل على نصائح فورية ومخصصة' : 'Get instant personalized advice'}
                  </p>
                </div>
                <div className="h-[calc(100vh-12rem)]">
                  <UnifiedChatSidebar 
                    selectedAgentId={selectedAgentId}
                    onAgentChange={handleChatAgentChange}
                    currentMetrics={currentMetrics} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agents;
