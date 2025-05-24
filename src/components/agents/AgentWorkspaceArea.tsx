
import React from 'react';
import { Agent } from './MarketingDashboard';
import MarketingManagerWorkspace from './workspaces/MarketingManagerWorkspace';
import ContentSEOWorkspace from './workspaces/ContentSEOWorkspace';
import SocialCreatorWorkspace from './workspaces/SocialCreatorWorkspace';
import SocialCXWorkspace from './workspaces/SocialCXWorkspace';
import CampaignPerformanceWorkspace from './workspaces/CampaignPerformanceWorkspace';

interface AgentWorkspaceAreaProps {
  selectedAgent: Agent | null;
  isArabic: boolean;
}

const AgentWorkspaceArea: React.FC<AgentWorkspaceAreaProps> = ({ selectedAgent, isArabic }) => {
  if (!selectedAgent) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🤖</div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {isArabic ? 'اختر وكيلاً للبدء' : 'Select an Agent to Start'}
          </h3>
          <p className="text-gray-500">
            {isArabic ? 'اختر وكيلاً من الشريط الجانبي لعرض مساحة العمل' : 'Choose an agent from the sidebar to view their workspace'}
          </p>
        </div>
      </div>
    );
  }

  const renderWorkspace = () => {
    switch (selectedAgent.specialization) {
      case 'marketing-manager':
        return <MarketingManagerWorkspace agent={selectedAgent} isArabic={isArabic} />;
      case 'content-seo':
        return <ContentSEOWorkspace agent={selectedAgent} isArabic={isArabic} />;
      case 'social-creator':
        return <SocialCreatorWorkspace agent={selectedAgent} isArabic={isArabic} />;
      case 'social-cx':
        return <SocialCXWorkspace agent={selectedAgent} isArabic={isArabic} />;
      case 'campaign-performance':
        return <CampaignPerformanceWorkspace agent={selectedAgent} isArabic={isArabic} />;
      default:
        return <MarketingManagerWorkspace agent={selectedAgent} isArabic={isArabic} />;
    }
  };

  return (
    <div className="h-full">
      {renderWorkspace()}
    </div>
  );
};

export default AgentWorkspaceArea;
